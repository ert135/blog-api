import * as express from 'express'
// import { User, UserSchema } from '../models/user.js';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { getSecret } from '../utils/getSecret';
import { Route } from './Route';
import UserRepository from '../repositories/UserRepository'

export class AuthRoute extends Route {
    private router = express.Router();
    private userRepo: UserRepository;

    constructor() {
        super();
        this.userRepo = new UserRepository();
    }
    
    public registerRoute(): express.Router {
        return this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
            console.log('body is ', req.body)
            console.log('email is ', req.body.email);
            console.log('password is ', req.body.password);
            this.userRepo.findUserWithLoginDetails(req.body.email, req.body.password).then((data) => {
                res.json({
                    response: data
                })
            }).catch((err) => {
                return next(err);
            });
        });
    }
}