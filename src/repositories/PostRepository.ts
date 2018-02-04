import BaseRepository from './BaseRepository';
import Post from '../models/post';

export default class PostRepository extends BaseRepository {
    constructor() {
        super(<any>Post);
    }
}