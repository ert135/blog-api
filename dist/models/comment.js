"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let CommentSchema = new mongoose_1.Schema({
    text: String,
    user: String,
    userName: String,
    postedOn: {
        type: Date,
        default: Date.now
    }
});
exports.CommentSchema = CommentSchema;
const comment = mongoose_1.model('Comment', CommentSchema);
exports.comment = comment;
