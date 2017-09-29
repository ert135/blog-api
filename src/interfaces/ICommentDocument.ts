import { Document, Model } from 'mongoose';

interface ICommentDocument extends Document {
    id: any,
    text: String,
    user: String,
    userName: String,
    postedOn: any
}

interface IComment extends ICommentDocument {
    //put document specific functions here
}

interface ICommentModel extends Model<IComment> {

}

export {
    ICommentDocument,
    IComment,
    ICommentModel
}
