import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Comment from '../models/comment.js';
import Post from '../models/post.js';

import { IUser } from '../interfaces/IUserDocument';
import { NextFunction, Request, Response, Router } from "express";
import { Route } from './Route';
import { extractToken } from '../utils/extractToken';

export class PostRoute extends Route {

    private router = express.Router();

    constructor() {
        super();
    }

    registerRoute(): express.Router {
        //get post listing
        this.router.get('/', function(req, res, next) {
            console.log('Get called!!');
            try {
                let thing = new Post({
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
                })
            } catch (e) {
                return next(e)
            } 
        });

        //POST new post
        this.router.post('/', function(req, res, next) {
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

            const token = extractToken(req).substring(7);

            if (token) {
                jwt.verify(token, this.secret, function(err, decoded) {

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
        this.router.get('/:id', function(req, res, next) {
            res.json({
                bob: 'bob'
            })
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

        })

        return this.router;
    }
}
