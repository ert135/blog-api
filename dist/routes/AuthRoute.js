"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Route_1 = require("./Route");
const UserRepository_1 = require("../repositories/UserRepository");
class AuthRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
        this.userRepo = new UserRepository_1.default();
    }
    registerRoute() {
        return this.router.post("/", (req, res, next) => {
            console.log('body is ', req.body);
            console.log('email is ', req.body.email);
            console.log('password is ', req.body.password);
            this.userRepo.findUserWithLoginDetails(req.body.email, req.body.password).then((data) => {
                res.json({
                    response: data
                });
            }).catch((err) => {
                return next(err);
            });
        });
    }
}
exports.AuthRoute = AuthRoute;
