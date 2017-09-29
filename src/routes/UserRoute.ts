import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { User, UserSchema } from '../models/user.js';
import { IUser } from '../interfaces/IUserDocument';
import { extractToken } from '../utils/extractToken';
import { getSecret } from '../utils/getSecret';
import { Route } from './Route';

export class UserRoute extends Route {

    constructor() {
        super();
    }

    public registerRoute(router: express.Router): express.Router {
        return router.get('/', (req, res, next) => {
            jwt.verify(extractToken(req), this.secret, (err, decoded) => {      
                if (err) {
                    return next(err);
                } else {
                    User.find({}, null, {sort: {id: -1}}, (err, posts) => {
                    if(err) return next(err);
                        res.json(posts);
                    })
                }
            });
        });
    }

}


