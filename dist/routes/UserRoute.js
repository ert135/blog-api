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
var jwt = require("jsonwebtoken");
var express = require("express");
var extractToken_1 = require("../utils/extractToken");
var Route_1 = require("./Route");
var UserRoute = /** @class */ (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        var _this = _super.call(this) || this;
        _this.router = express.Router();
        return _this;
    }
    UserRoute.prototype.registerRoute = function () {
        var _this = this;
        return this.router.get('/', function (req, res, next) {
            jwt.verify(extractToken_1.extractToken(req), _this.secret, function (err, decoded) {
            });
        });
    };
    return UserRoute;
}(Route_1.Route));
exports.UserRoute = UserRoute;
