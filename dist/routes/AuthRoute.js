"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_js_1 = require("../models/user.js");
const jwt = require("jsonwebtoken");
const Route_1 = require("./Route");
class AuthRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
    }
    registerRoute() {
        return this.router.post("/", (req, res, next) => {
            if (req.body.email && req.body.password) {
                user_js_1.User.authenticate(req.body.email, req.body.password)
                    .then((user) => {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        type: user.type
                    }, this.secret, {
                        expiresIn: '60m'
                    });
                    res.json({
                        success: true,
                        message: 'Log In Successful',
                        username: user.name,
                        type: user.type,
                        token: token
                    });
                    next();
                })
                    .catch((e) => {
                    const error = new Error("Wrong email or password");
                    error.status = 401;
                    return next(error);
                });
            }
            else {
                var err = new Error('Email and password are required');
                err.status = 401;
                next(err);
            }
        });
    }
}
exports.AuthRoute = AuthRoute;
