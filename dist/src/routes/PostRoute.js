"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const post_js_1 = require("../models/post.js");
const Route_1 = require("./Route");
const extractToken_1 = require("../utils/extractToken");
class PostRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = express.Router();
    }
    registerRoute() {
        //get post listing
        this.router.get('/', function (req, res, next) {
            console.log('Get called!!');
            try {
                let thing = post_js_1.default.create({
                    title: 'bob',
                    subtitle: 'subtitle',
                    pictureUrl: 'url',
                    postedOnDate: '2018-01-01',
                    top: true,
                    body: '<h1>Body</h1>'
                });
                console.log('post is ', thing);
                res.json({
                    response: thing
                });
            }
            catch (e) {
                return next(e);
            }
            // try {
            //     Post.create({
            //       actorId: req.params['id'], movieId: req.params['movieId']
            //     });
            //     res.sendStatus(200);
            //   } catch (e) {
            //     next(e);
            //   }
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
            const token = extractToken_1.extractToken(req).substring(7);
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
        this.router.put('/:id', (req, res, next) => {
            const token = extractToken_1.extractToken(req).substring(7);
            if (token) {
                jwt.verify(token, this.secret, (err, decoded) => {
                });
            }
            else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });
        //get one post
        this.router.get('/:id', function (req, res, next) {
            res.json({
                bob: 'bob'
            });
        });
        //post a comment
        this.router.post('/:id/comment', (req, res, next) => {
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
            const token = extractToken_1.extractToken(req).substring(7);
            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, this.secret, function (err, decoded) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        //update logic to go here
                    }
                });
            }
        });
        this.router.delete('/:id/comment/:commentId', (req, res, next) => {
            const token = extractToken_1.extractToken(req).substring(7);
            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, this.secret, (err, decoded) => {
                    if (decoded.type === "admin") {
                        if (err) {
                            return next(err);
                        }
                        else {
                            //update logic to go here
                        }
                    }
                    else {
                        let err = new Error("Need admin permissions to delete comments");
                        return next(err);
                    }
                });
            }
        });
        return this.router;
    }
}
exports.PostRoute = PostRoute;
