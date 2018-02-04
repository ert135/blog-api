"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./BaseRepository");
const post_1 = require("../models/post");
class PostRepository extends BaseRepository_1.default {
    constructor() {
        super(post_1.default);
    }
}
exports.default = PostRepository;
