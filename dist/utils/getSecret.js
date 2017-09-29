"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSecret = () => {
    console.log('callling get secret', process.env['jwt_secret']);
    return process.env['jwt_secret'];
};
exports.getSecret = getSecret;
