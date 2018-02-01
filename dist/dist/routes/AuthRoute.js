"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Route_1 = require("./Route");
class AuthRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
    }
    registerRoute() {
        return this.router.post("/", (req, res, next) => {
            if (req.body.email && req.body.password) {
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
