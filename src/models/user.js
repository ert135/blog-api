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
    
    return User;
};