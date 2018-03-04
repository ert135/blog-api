import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from './user';
import Post from './post';
import { DataType } from 'sequelize-typescript';

@Table
export default class Comment extends Model<Comment> {
    @Column(DataType.TEXT)
    body: string;

    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
