"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSecret = () => {
    return process.env['jwt_secret'];
};
exports.getSecret = getSecret;
