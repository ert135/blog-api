import BaseRepository from './BaseRepository';
import Post from '../models/Post';

export default class PostRepository extends BaseRepository {
    constructor() {
        super(<any>Post);
    }
}