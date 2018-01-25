'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        postedOn: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
        body: DataTypes.Text,
        postedBy: DataTypes.INTEGER,
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    Comment.associate = (models) => {
        Comment.hasMany(models.User, {
            foreignKey: 'id',
            as: 'postId'
        });
        Comment.hasMany(models.Post, {
            foreignKey: 'id',
            as: 'commentId'
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    };

    return Comment;
};