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
var AuthRoute = /** @class */ (function (_super) {
    __extends(AuthRoute, _super);
    function AuthRoute() {
        var _this = _super.call(this) || this;
        _this.router = express.Router();
        return _this;
    }
    AuthRoute.prototype.registerRoute = function () {
        return this.router.post("/", function (req, res, next) {
            if (req.body.email && req.body.password) {
            }
            else {
                var err = new Error('Email and password are required');
                err.status = 401;
                next(err);
            }
        });
    };
    return AuthRoute;
}(Route_1.Route));
exports.AuthRoute = AuthRoute;
