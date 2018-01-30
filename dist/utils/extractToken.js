"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let extractToken = (req) => {
    return req.body.token || req.query.token || req.headers['authorization'];
};
exports.extractToken = extractToken;
