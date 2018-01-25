var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

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
                Post.hasMany(models.Comment, {
                    foreignKey: 'id',
                    as: 'comments'
                });
                Post.belongsTo(models.User, {
                    foreignKey: 'id',
                    onDelete: 'CASCADE',
                });
            }
        }
    });
    
    return Post;
};