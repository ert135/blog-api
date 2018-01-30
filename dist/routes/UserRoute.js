"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const express = require("express");
const extractToken_1 = require("../utils/extractToken");
const Route_1 = require("./Route");
class UserRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
    }
    registerRoute() {
        return this.router.get('/', (req, res, next) => {
            jwt.verify(extractToken_1.extractToken(req), this.secret, (err, decoded) => {
            });
        });
    }
}
exports.UserRoute = UserRoute;
