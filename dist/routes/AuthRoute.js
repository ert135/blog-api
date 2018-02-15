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
        this.saltRounds = 12;
    }
    registerRoute() {
        return this.router.post("/", (req, res, next) => {
            this.userRepo.findUserWithLoginDetails(req.body.email).then(user => {
                this.checkPassword(req.body.password, user.password).then((check) => {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        type: user.admin,
                        username: user.username
                    }, this.secret, {
                        expiresIn: '60m'
                    });
                    res.json({
                        token: token
                    });
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
    getHash(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
}
exports.AuthRoute = AuthRoute;
