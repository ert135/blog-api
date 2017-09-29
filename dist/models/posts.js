"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comment_js_1 = require("../models/comment.js");
let PostSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    top: {
        type: Boolean,
        required: true
    },
    comments: [comment_js_1.CommentSchema]
});
exports.PostSchema = PostSchema;
const Post = mongoose_1.model('Post', PostSchema);
exports.Post = Post;
