var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var express = require('express');
var user_js_1 = require('../models/user.js');
var jwt = require('jsonwebtoken');
var Route_1 = require('./Route');
var AuthRoute = (function (_super) {
    __extends(AuthRoute, _super);
    function AuthRoute() {
        _super.call(this);
        this.router = express.Router();
    }
    AuthRoute.prototype.registerRoute = function () {
        var _this = this;
        return this.router.post("/", function (req, res, next) {
            if (req.body.email && req.body.password) {
                user_js_1.User.authenticate(req.body.email, req.body.password)
                    .then(function (user) {
                    var token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        type: user.type
                    }, _this.secret, {
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
                    .catch(function (e) {
                    var error = new Error("Wrong email or password");
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
    };
    return AuthRoute;
})(Route_1.Route);
exports.AuthRoute = AuthRoute;
