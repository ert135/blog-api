import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Comment from '../models/comment.js';
import Post from '../models/post.js';

import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { Route } from './Route';
import { extractToken } from '../utils/extractToken';
import PostRepository from '../repositories/PostRepository';

export class PostRoute extends Route {

    private router = express.Router();
    private postRepo: PostRepository;

    constructor() {
        super();
        this.postRepo = new PostRepository();
    }

    registerRoute(): express.Router {
        this.router.get('/', (req, res, next) => {
            this.postRepo.getAllPosts().then(data => {
                res.json({
                    posts: data
                });
            }).catch(err => {
                return next(err);
            });
        });

        //POST new post
        this.router.post('/', (req, res, next) => {
            const token = extractToken(req).substring(7);
            if (token) {
                jwt.verify(token, this.secret, (err, decoded: any) => {
                    this.postRepo.createPost(req.body, decoded.id).then(data => {
                        console.log('data is ', data);
                        res.json({
                            post: data
                        });
                    }).catch(err => {
                        return next(err);
                    });
                });
            } else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });

        //PUT(upsert) post
        this.router.put('/:id', (req, res, next) => {
            const token = extractToken(req).substring(7);
            if (token) {
                jwt.verify(token, this.secret, (err, decoded) => {
                   
                });
            } else {
                var err = new Error("No Token provided");
                return next(err);
            }
        });

        //get one post
        this.router.get('/:id', (req, res, next) => {
            this.postRepo.findById(req.params.id).then(data => {
                res.json({
                    post: data
                });
            }).catch(err => {
                return next(err);
            });
        });

        //post a comment
        this.router.post('/:id/comment', (req, res, next) => {

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

            const token = extractToken(req).substring(7);

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
                    }
                });
            }
        });

        this.router.delete('/:id/comment/:commentId', (req, res, next) => {

            const token = extractToken(req).substring(7);

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
                         
                        }
                    } else {
                        let err = new Error("Need admin permissions to delete comments");
                        return next(err);
                    }

                });
            }
        });

        return this.router;
    }
}
