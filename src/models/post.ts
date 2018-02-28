import { Model, Column, Table, BelongsTo, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, AllowNull } from "sequelize-typescript";
import Comment from './Comment';
import IComment from './Comment'
import User from './User';
import { DataType } from 'sequelize-typescript';

export interface IPost {
    title: string,
    subtitle: string,
    pictureUrl: string,
    top: boolean,
    createdAt: Date,
    body: string,
    comments: Array<IComment>
}

@Table
export default class Posts extends Model<Posts> {
    @AllowNull(false)
    @Column
    title: string;

    @Column
    subtitle: String;

    @Column
    pictureUrl: String;

    @Column
    top: Boolean;

    @Column(DataType.DATE)
    createdAt: Boolean;

    @Column(DataType.TEXT)
    body: string;

    @HasMany(() => Comment)
    comments: Comment[];

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;
}
