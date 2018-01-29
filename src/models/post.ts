import { Model, Column, Table, BelongsTo, Scopes, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import { Comment } from './comment';
import { User } from './user';
import { DataType } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
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
}