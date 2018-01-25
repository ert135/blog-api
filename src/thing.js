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
        Post.hasMany(models.Comment, {
            foreignKey: 'id',
            as: 'comments'
        });
    };
    
    return Post;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        admin: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'id',
            as: 'posts'
        });
        User.hasMany(models.Comment, {
            foreignKey: 'id',
            as: 'comments'
        });
    };
    
    return User;
};

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
        Comment.belongsTo(models.Post, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
        });
    };

    return Comment;
};