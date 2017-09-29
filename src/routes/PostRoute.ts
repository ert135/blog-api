import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { comment, CommentSchema } from '../models/comment.js';
import { Post } from '../models/posts.js';
import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { Route } from './Route';
import { extractToken } from '../utils/extractToken';

export class PostRoute extends Route {

    constructor() {
        super();
    }

    registerRoute(router: express.Router): express.Router {
        //get post listing
        router.get('/', function(req, res, next) {
            Post.find({}, null, {
                sort: {
                    id: -1
                }
            }, function(err, posts) {
                if (err) return next(err);
                var transformedPosts = posts.map(function(post, array, posts) {
                    return {
                        id: post._id,
                        title: post.title,
                        pictureUrl: post.pictureUrl,
                        postedOn: post.postedOn,
                        postedBy: post.postedBy,
                        subtitle: post.subtitle,
                        top: post.top,
                        comments: post.comments.length ? post.comments.length : 0
                    }
                })
                res.json(transformedPosts);
            })
        });

        //POST new post
        router.post('/', function(req, res, next) {

            if (
                req.body.title && 
                req.body.pictureUrl &&
                req.body.postedBy &&
                req.body.postBody &&
                req.body.subtitle 
            ) {} 
            else {
                var err = new Error("Not All required fields present");
                return next(err);
            }

            const token = extractToken(req);

            if (token) {
                jwt.verify(token, this.secret, function(err, decoded) {
                    if (err) {
                        return next(err);
                    } else {
                        Post.create({
                            type: "normal",
                            title: req.body.title,
                            pictureUrl: req.body.pictureUrl,
                            postedOn: req.body.postedOn || null,
                            postedBy: req.body.postedBy,
                            postBody: req.body.postBody,
                            subtitle: req.body.subtitle,
                            top: false
                        }, function(err, newPost) {
                            if (err) return next(err)
                            res.status(201);
                            res.json(newPost);
                        })
                    }
                });
            } else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });

        //PUT(upsert) post
        router.put('/:id', function(req, res, next) {

            var token = extractToken(req);

            if (token) {
                jwt.verify(token, this.secret, (err, decoded) => {
                    if (err) {
                        return next(err);
                    } else {
                        var query = {
                        id: req.params.id
                        };

                        Post.findOne(query, function (err, doc){
                            if(err) return next(err)
                            if (doc) {
                                Post.findOneAndUpdate(query, {
                                    title: req.body.newData.title ? req.body.newData.title : doc.title,
                                    pictureUrl: req.body.newData.pictureUrl ? req.body.newData.pictureUrl : doc.pictureUrl,
                                    postBody: req.body.newData.postBody ? req.body.newData.postBody : doc.postBody,
                                    subtitle: req.body.newData.subtitle ? req.body.newData.subtitle :  doc.subtitle
                                }, {upsert: true, 'new': true}, function(err, doc){
                                    if (err) return next(err);
                                    return res.send(doc);
                                });
                            }
                        });
                    }
                });
            } else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });

        //get one post
        router.get('/:id', function(req, res, next) {
            Post.find({
                id: req.params.id
            }, function(err, post) {
                if (err) return next(err)
                if (!post || post.length == 0) {
                    var error: any = new Error("Post Not found");
                    error.status = 404;
                    return next(error);
                }
                res.json(post);
            })
        });

        //post a comment
        router.post('/:id/comment', function(req, res, next) {
            if (isNaN(req.params.id)) {
                var err = new Error("Id must be a number");
                return next(err);
            }

            if (req.body.text &&
                req.body.user &&
                req.body.userName) {} else {
                var err = new Error("All Fields required");
                return next(err);
            }

            var newComment = {
                text: req.body.text,
                user: req.body.user,
                userName: req.body.userName
            }

            const token = extractToken(req);

            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, this.secret, function(err, decoded) {
                    if (err) {
                        return next(err);
                    } else {
                        //update logic to go here
                        Post.findOne({
                            id: req.params.id
                        }, function(err, post : any) {
                            if (err) return err;
                            if (!post || post.length == 0) {
                                var error: any = new Error("Post Not found");
                                error.status = 404;
                                return next(error);
                            }
                            post.comments.push(newComment);
                            post.save(post);
                            res.json(post);
                        });
                    }
                });
            }
        });

        router.delete('/:id/comment/:commentId', (req, res, next) => {
            if (isNaN(req.params.id)) {
                var err = new Error("Id must be a number");
                return next(err);
            }

            const token = extractToken(req)
            if (!token) {
                var err = new Error("No Token Provied");
                return next(err);
            }

            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, this.secret, (err, decoded: any) => {
                    if (decoded.type === "admin") {
                        if (err) {
                            return next(err);
                        } else {
                            //update logic to go here
                            Post.findOne({
                                id: req.params.id
                            }, function(err, post: any) {
                                if (err) return err;
                                if (!post || post.length == 0) {
                                    var error: any = new Error("Post Not found");
                                    error.status = 404;
                                    return next(error);
                                }
                                post.comments.pull({_id : req.params.commentId});
                                post.save();
                                res.json(post);
                            });
                        }
                    } else {
                        let err = new Error("Need admin permissions to delete comments");
                        return next(err);
                    }

                });
            }

        })

        return router;

    }
}
