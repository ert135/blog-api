import * as express from 'express'
import { User, UserSchema } from '../models/user.js';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { getSecret } from '../utils/getSecret';
import { Route } from './Route';

export class AuthRoute extends Route {

    constructor() {
        super();
    }
    
    public registerRoute(router: Router): express.Router {
        return router.post("/", (req: Request, res: Response, next: NextFunction) => {
            if (req.body.email && req.body.password) {
                User.authenticate(req.body.email, req.body.password)
                .then((user: IUser) => {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        type: user.type
                    }, this.secret, {
                        expiresIn : '60m'
                    })
                    res.json({
                        success: true,
                        message: 'Log In Successful',
                        username: user.name,
                        type: user.type,
                        token: token
                    })
                    next();
                })
                .catch((e) => {
                    const error: any = new Error("Wrong email or password");
                    error.status = 401;
                    return next(error);
                })
            } else {
                var err: any = new Error('Email and password are required');
                err.status = 401
                next(err);
            }
        });
    }
}


