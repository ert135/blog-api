"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSecret = () => {
    return process.env['JWT_SECRET'];
};
exports.getSecret = getSecret;
