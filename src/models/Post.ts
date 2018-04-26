import { Model, Column, Table, BelongsTo, CreatedAt, UpdatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import Comment from './Comment';
import User from './User';
import { DataType } from 'sequelize-typescript';

export interface IPost {
    userId: any,
    id: any
}

@Table
export default class Post extends Model<Post> {
    @Column
    title: string;

    @Column
    subtitle: Date;

    @Column
    pictureUrl: String;

    @Column(DataType.DATE)
    postedOnDate: {
        type: Date
    };

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
