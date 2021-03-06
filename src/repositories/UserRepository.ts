import BaseRepository from './BaseRepository';
import Post from '../models/Post';
import User from '../models/User';

export default class UserRepository extends BaseRepository {
    private User: any
    constructor() {
        super(<any>User);
        this.User = User;
    }

    findUserWithLoginDetails(email: string): any {
        return this.model.findOne({
            where: {
                email: email
            }
        });
    }
}