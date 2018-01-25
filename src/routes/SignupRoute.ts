import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { User, UserSchema } from '../models/user.js';
// import { Post } from '../models/posts.js'
import { IUser } from '../interfaces/IUserDocument';
import { Route } from './Route'

export class SignupRoute extends Route {

    private router = express.Router();

    constructor() {
        super();
    }

    registerRoute(): express.Router {
        return this.router.post('/', (req, res, next) => {
            if(
                req.body.name &&
                req.body.email &&
                req.body.password &&
                req.body.confirmpassword
            ) {
                if (req.body.password !== req.body.confirmpassword) {
                    let err: any = new Error('Passwords do not match');
                    err.status = 400;
                    return next(err);
                }
                let userData = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    type: 'user'
                };
            } else {
                let err: any = new Error('All Fields required');
                err.status = 400;
                return next(err);
            }
        });
    }
}
