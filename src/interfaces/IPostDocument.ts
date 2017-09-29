import { Document, Model } from 'mongoose';

interface IPostDocument extends Document {
    id: any,
    type: string,
    title: string,
    pictureUrl: string,
    postedOn: string,
    postedBy: string,
    postBody: string,
    subtitle: string,
    top: boolean,
    comments: [any]
}

interface IPost extends IPostDocument {
    //put document specific functions here
}

interface IPostModel extends Model<IPost> {

}

export {
    IPostDocument,
    IPost,
    IPostModel
}
