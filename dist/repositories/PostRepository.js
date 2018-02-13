"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./BaseRepository");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
class PostRepository extends BaseRepository_1.default {
    constructor() {
        super(Post_1.default);
    }
    getAllPosts() {
        return this.model.findAll({
            where: {
                id: {
                    gt: 0
                }
            },
            include: [{
                    model: User_1.default
                }]
        });
    }
}
exports.default = PostRepository;
