import BaseRepository from './BaseRepository';
import Post from '../models/Post';
import Users from '../models/User';
import IPost from '../models/Post';

export default class PostRepository extends BaseRepository {
    private Post: any;

    constructor() {
        super(<any>Post);
        this.Post = Post;
    }

    public getAllPosts(): Promise<IPost> {
        return this.Post.findAll({
            where: {
                id: {
                    gt:0
                }
            },
            include: [{
                model: Users,
                attributes: ['username', 'id']
            }]
        });
    }

    public createPost(postData: IPost, userId: number): Promise<IPost> {
        return this.Post.create({
            title: postData.title,
            subtitle: postData.subtitle,
            pictureUrl: postData.pictureUrl,
            top: postData.top,
            body: postData.body,
            userId: userId
        });
    }

    public editPost(postData: IPost, postId: number): Promise<IPost> {
        return this.Post.update({
            title: postData.title,
            subtitle: postData.subtitle,
            pictureUrl: postData.pictureUrl,
            top: postData.top,
            body: postData.body
        }, {
            where: {
                id: postId
            }
        });
    }
}
