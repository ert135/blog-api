var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

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
