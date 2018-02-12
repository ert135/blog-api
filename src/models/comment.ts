import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from './User';
import Post from './Post';
import { DataType } from 'sequelize-typescript';

@Table
export default class Comments extends Model<Comments> {
    @Column(DataType.TEXT)
    body: string;

    @BelongsTo(() => Post)
    post: Post;

    @ForeignKey(() => Post)
    @Column
    postid: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column
    userId: number;
}