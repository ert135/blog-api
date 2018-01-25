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
var jwt = require("jsonwebtoken");
var Route_1 = require("./Route");
var extractToken_1 = require("../utils/extractToken");
var PostRoute = /** @class */ (function (_super) {
    __extends(PostRoute, _super);
    function PostRoute() {
        var _this = _super.call(this) || this;
        _this.router = express.Router();
        return _this;
    }
    PostRoute.prototype.registerRoute = function () {
        var _this = this;
        //get post listing
        this.router.get('/', function (req, res, next) {
        });
        //POST new post
        this.router.post('/', function (req, res, next) {
            if (req.body.title &&
                req.body.pictureUrl &&
                req.body.postedBy &&
                req.body.postBody &&
                req.body.subtitle) { }
            else {
                var err = new Error("Not All required fields present");
                return next(err);
            }
            var token = extractToken_1.extractToken(req).substring(7);
            if (token) {
                jwt.verify(token, this.secret, function (err, decoded) {
                });
            }
            else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });
        //PUT(upsert) post
        this.router.put('/:id', function (req, res, next) {
            var token = extractToken_1.extractToken(req).substring(7);
            if (token) {
                jwt.verify(token, _this.secret, function (err, decoded) {
                });
            }
            else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });
        //get one post
        this.router.get('/:id', function (req, res, next) {
        });
        //post a comment
        this.router.post('/:id/comment', function (req, res, next) {
            if (req.body.text &&
                req.body.user &&
                req.body.userName) { }
            else {
                var err = new Error("All Fields required");
                return next(err);
            }
            var newComment = {
                text: req.body.text,
                user: req.body.user,
                userName: req.body.userName
            };
            var token = extractToken_1.extractToken(req).substring(7);
            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, _this.secret, function (err, decoded) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        //update logic to go here
                    }
                });
            }
        });
        this.router.delete('/:id/comment/:commentId', function (req, res, next) {
            var token = extractToken_1.extractToken(req).substring(7);
            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, _this.secret, function (err, decoded) {
                    if (decoded.type === "admin") {
                        if (err) {
                            return next(err);
                        }
                        else {
                            //update logic to go here
                        }
                    }
                    else {
                        var err_1 = new Error("Need admin permissions to delete comments");
                        return next(err_1);
                    }
                });
            }
        });
        return this.router;
    };
    return PostRoute;
}(Route_1.Route));
exports.PostRoute = PostRoute;
