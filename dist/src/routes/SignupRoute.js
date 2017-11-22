var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var express = require('express');
var jwt = require('jsonwebtoken');
var user_js_1 = require('../models/user.js');
var Route_1 = require('./Route');
var SignupRoute = (function (_super) {
    __extends(SignupRoute, _super);
    function SignupRoute() {
        _super.call(this);
        this.router = express.Router();
    }
    SignupRoute.prototype.registerRoute = function () {
        var _this = this;
        return this.router.post('/', function (req, res, next) {
            if (req.body.name &&
                req.body.email &&
                req.body.password &&
                req.body.confirmpassword) {
                if (req.body.password !== req.body.confirmpassword) {
                    var err = new Error('Passwords do not match');
                    err.status = 400;
                    return next(err);
                }
                var userData = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    type: 'user'
                };
                user_js_1.User.create(userData, function (error, user) {
                    if (error) {
                        return next(error);
                    }
                    else {
                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            id: user._id
                        }, _this.secret, {
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
                var err = new Error('All Fields required');
                err.status = 400;
                return next(err);
            }
        });
    };
    return SignupRoute;
})(Route_1.Route);
exports.SignupRoute = SignupRoute;
