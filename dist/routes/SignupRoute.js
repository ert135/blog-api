"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Route_1 = require("./Route");
class SignupRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
    }
    registerRoute() {
        return this.router.post('/', (req, res, next) => {
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
