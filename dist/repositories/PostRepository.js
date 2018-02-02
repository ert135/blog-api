"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./BaseRepository");
const Post_1 = require("../models/Post");
class PostRepository extends BaseRepository_1.default {
    constructor() {
        super(Post_1.default);
    }
}
exports.default = PostRepository;
