'use strict';
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    postedBy: String,
    pictureUrl: String,
    body: String,
    postedOn: { type: Date, default: Date.now },
});
postSchema.pre("save", function (next) {
    this.questions.sort();
    next();
});
var post = mongoose.model("post", postSchema);
module.exports.post = post;
