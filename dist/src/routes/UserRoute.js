var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jwt = require('jsonwebtoken');
var express = require('express');
var user_js_1 = require('../models/user.js');
var extractToken_1 = require('../utils/extractToken');
var Route_1 = require('./Route');
var UserRoute = (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        _super.call(this);
        this.router = express.Router();
    }
    UserRoute.prototype.registerRoute = function () {
        var _this = this;
        return this.router.get('/', function (req, res, next) {
            jwt.verify(extractToken_1.extractToken(req), _this.secret, function (err, decoded) {
                if (err) {
                    return next(err);
                }
                else {
                    user_js_1.User.find({}, null, { sort: { id: -1 } }, function (err, posts) {
                        if (err)
                            return next(err);
                        res.json(posts);
                    });
                }
            });
        });
    };
    return UserRoute;
})(Route_1.Route);
exports.UserRoute = UserRoute;
