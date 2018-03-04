import * as express from 'express'
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { getSecret } from '../utils/getSecret';
import { Route } from './Route';
import UserRepository from '../repositories/UserRepository'
import * as bcrypt from 'bcryptjs';

export class AuthRoute extends Route {
    private router = express.Router();
    private userRepo: UserRepository;

    constructor() {
        super();
        this.userRepo = new UserRepository();
    }
    
    public registerRoute(): express.Router {
        return this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
            this.userRepo.findUserWithLoginDetails(req.body.email).then(user => {
                if (!user) {
                    return next('Incorrect username or password');
                };
                this.checkPassword(req.body.password, user.password).then((check) => {
                    if (check === true) {
                        return res.json({
                            token: this.generateToken(user)
                        });
                    }
                    return next('Incorrect username or password');
                }).catch((err) => {
                    return next(err);
                });
            }).catch((err) => {
                return next(err);
            })
        });
    }

    private checkPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
    
    private generateToken(user): any {
        return jwt.sign({
            email: user.email,
            id: user.id,
            admin: user.admin,
            username: user.username
        }, this.secret, {
            expiresIn : '48h'
        });
    }
}