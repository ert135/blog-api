import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from './User';
import Post from './Post';
import { DataType } from 'sequelize-typescript';

@Table
export default class Comment extends Model<Comment> {
    @Column(DataType.TEXT)
    body: string;

    //Post association
    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    //User association
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column
    userId: number;
}
