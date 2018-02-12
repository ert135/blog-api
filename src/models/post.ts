import { Model, Column, Table, BelongsTo, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import Comment from './Comment';
import User from './User';
import { DataType } from 'sequelize-typescript';

@Table
export default class Posts extends Model<Posts> {
    @Column
    title: string;

    @Column
    subtitle: Date;

    @Column
    pictureUrl: String;

    @Column
    top: Boolean;

    @Column(DataType.TEXT)
    body: string;

    @HasMany(() => Comment)
    comments: Comment[];

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column
    userId: number;
}
