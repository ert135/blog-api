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
    private saltRounds: number;

    constructor() {
        super();
        this.userRepo = new UserRepository();
        this.saltRounds = 12;
    }
    
    public registerRoute(): express.Router {
        return this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
            this.userRepo.findUserWithLoginDetails(req.body.email).then(user => {
                this.checkPassword(req.body.password, user.password).then((check) => {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        type: user.admin,
                        username: user.username
                    }, this.secret, {
                        expiresIn : '60m'
                    })
                    res.json({
                        token: token
                    })
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

    private getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }
}