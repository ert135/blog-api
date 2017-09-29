import * as mongoose from "mongoose";
import { Document, Schema, Model, model } from 'mongoose';
import { ICommentDocument, IComment, ICommentModel } from '../interfaces/ICommentDocument';

let CommentSchema = new Schema({
    text: String,
    user: String,
    userName: String,
    postedOn: {
        type: Date,
        default: Date.now
    }
});

const comment = model<IComment, ICommentModel>('Comment', CommentSchema);

export {
    comment,
    CommentSchema
}