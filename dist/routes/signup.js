"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_js_1 = require("../models/user.js");
const jwt = require("jsonwebtoken");
const router = express.Router();
exports.router = router;
//Need to use app.settings.env to get enviroment varaibles for shared secret, using the string below is bad practice 
router.post('/', (req, res, next) => {
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
                }, 'shhhhhhared-secret', {
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
