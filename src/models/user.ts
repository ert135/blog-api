import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import Post from './Post'
import Comment from './Comment'

@Table
export default class User extends Model<User> {
    @Column
    username: string;

    @Column
    password: Date;

    @Column
    email: String;

    @Column
    admin: Boolean;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Post)
    posts: Post[];
}