import BaseRepository from './BaseRepository';
import Post from '../models/Post';
import Users from '../models/User';
import IPost from '../models/Post'

export default class PostRepository extends BaseRepository {
    constructor() {
        super(<any>Post);
    }

    getAllPosts(): Promise<IPost> {
        return this.model.findAll({
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
}