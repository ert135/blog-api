'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        pictureUrl: DataTypes.STRING,
        postedOnDate: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
        top: DataTypes.BOOLEAN,
        body: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    Post.associate = (models) => {
        Post.hasMany(models.User, {
            foreignKey: 'id',
            as: 'user'
        });
    };

    return Post;
};