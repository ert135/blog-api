import { Document, Schema, Model, model } from 'mongoose';
import { CommentSchema } from '../models/comment.js';
import { IPostDocument, IPost, IPostModel } from '../interfaces/IPostDocument';

let PostSchema = new Schema({
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
    top:{
        type: Boolean,
        required: true
    },
    comments: [CommentSchema]
});

const Post = model<IPost, IPostModel>('Post', PostSchema);

export {
    Post,
    PostSchema
}