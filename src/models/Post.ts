import { Model, Column, Table, BelongsTo, Scopes, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
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
}

let UserModel = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      username: DataTypes.STRING
    });
  
    User.associate = function(models) {
      models.User.hasMany(models.Task);
    };
  
    return User;
  };