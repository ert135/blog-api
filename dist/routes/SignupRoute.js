"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Route_1 = require("./Route");
var SignupRoute = /** @class */ (function (_super) {
    __extends(SignupRoute, _super);
    function SignupRoute() {
        var _this = _super.call(this) || this;
        _this.router = express.Router();
        return _this;
    }
    SignupRoute.prototype.registerRoute = function () {
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
            }
            else {
                var err = new Error('All Fields required');
                err.status = 400;
                return next(err);
            }
        });
    };
    return SignupRoute;
}(Route_1.Route));
exports.SignupRoute = SignupRoute;
