import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import Post from './Post'
import Comment from './Comment'

export interface IUser {

}

@Table
export default class Users extends Model<Users> {
    @Column
    username: String;

    @Column
    password: String;

    @Column
    email: String;

    @Column
    admin: Boolean;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Post)
    posts: Post[];
}
