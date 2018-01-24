'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: DataTypes.INTEGER,
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
    return User;
};