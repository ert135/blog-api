import BaseRepository from './BaseRepository';
import Post from '../models/Post';
import Users from '../models/User';
import IPost from '../models/Post'

export default class PostRepository extends BaseRepository {
    private Post: any
    constructor() {
        super(<any>Post);
        this.Post = Post
        console.log('Post is ', this.Post);
    }

    getAllPosts(): Promise<IPost> {
        return this.Post.findAll({
            where: {
                id: {
                    gt:0
                }
            },
            include: [{
                model: Users
            }]
        });
    }

    createPost(): Promise<IPost> {
        return this.model.create({ 
            title: 'foo', 
            description: 'bar', 
            deadline: new Date() 
        })
    }
}