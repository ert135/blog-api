"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_js_1 = require("../models/user.js");
const Route_1 = require("./Route");
class SignupRoute extends Route_1.Route {
    constructor() {
        super();
    }
    registerRoute(router) {
        return router.post('/', (req, res, next) => {
            if (req.body.name &&
                req.body.email &&
                req.body.password &&
                req.body.confirmpassword) {
                if (req.body.password !== req.body.confirmpassword) {
                    let err = new Error('Passwords do not match');
                    err.status = 400;
                    return next(err);
                }
                let userData = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    type: 'user'
                };
                user_js_1.User.create(userData, (error, user) => {
                    if (error) {
                        return next(error);
                    }
                    else {
                        const token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            id: user._id
                        }, this.secret, {
                            expiresIn: '1440m'
                        });
                        res.json({
                            success: true,
                            message: 'Success',
                            token: token
                        });
                    }
                });
            }
            else {
                let err = new Error('All Fields required');
                err.status = 400;
                return next(err);
            }
        });
    }
}
exports.SignupRoute = SignupRoute;
