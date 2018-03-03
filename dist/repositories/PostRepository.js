"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./BaseRepository");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
class PostRepository extends BaseRepository_1.default {
    constructor() {
        super(Post_1.default);
        this.Post = Post_1.default;
        console.log('Post is ', this.Post);
    }
    getAllPosts() {
        return this.Post.findAll({
            where: {
                id: {
                    gt: 0
                }
            },
            include: [{
                    model: User_1.default,
                    attributes: ['username', 'id']
                }]
        });
    }
    createPost(postData, userId) {
        return this.Post.create({
            title: postData.title,
            subtitle: postData.subtitle,
            pictureUrl: postData.pictureUrl,
            top: postData.top,
            body: postData.body,
            userId: userId
        });
    }
    editPost(postData, userId) {
        // let post = this.Post.find({
        //     where: {
        //         id: postData.id,
        //         userId: userId
        //     }
        // }).then((data) => {
        //     console.log('Found data is ', data);
        // });
        // return post.update({
        //     title: postData.title,
        //     subtitle: postData.subtitle,
        //     pictureUrl: postData.pictureUrl,
        //     top: postData.top,
        //     body: postData.body
        // });
    }
}
exports.default = PostRepository;
