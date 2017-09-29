"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_js_1 = require("../models/user.js");
const extractToken_1 = require("../utils/extractToken");
const Route_1 = require("./Route");
class UserRoute extends Route_1.Route {
    constructor() {
        super();
    }
    registerRoute(router) {
        return router.get('/', (req, res, next) => {
            jwt.verify(extractToken_1.extractToken(req), this.secret, (err, decoded) => {
                if (err) {
                    return next(err);
                }
                else {
                    user_js_1.User.find({}, null, { sort: { id: -1 } }, (err, posts) => {
                        if (err)
                            return next(err);
                        res.json(posts);
                    });
                }
            });
        });
    }
}
exports.UserRoute = UserRoute;
