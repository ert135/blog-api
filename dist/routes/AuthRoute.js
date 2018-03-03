"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const Route_1 = require("./Route");
const UserRepository_1 = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
class AuthRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
        this.userRepo = new UserRepository_1.default();
    }
    registerRoute() {
        return this.router.post("/", (req, res, next) => {
            this.userRepo.findUserWithLoginDetails(req.body.email).then(user => {
                if (!user) {
                    return next('Incorrect username or password');
                }
                ;
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
            });
        });
    }
    checkPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    generateToken(user) {
        return jwt.sign({
            email: user.email,
            id: user.id,
            admin: user.admin,
            username: user.username
        }, this.secret, {
            expiresIn: '48h'
        });
    }
}
exports.AuthRoute = AuthRoute;
