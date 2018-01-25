import * as express from 'express'
// import { User, UserSchema } from '../models/user.js';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { getSecret } from '../utils/getSecret';
import { Route } from './Route';

export class AuthRoute extends Route {

    private router = express.Router();

    constructor() {
        super();
    }
    
    public registerRoute(): express.Router {
        return this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
            if (req.body.email && req.body.password) {

            } else {
                var err: any = new Error('Email and password are required');
                err.status = 401
                next(err);
            }
        });
    }
}


