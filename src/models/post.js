'use strict';
module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('Post', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        pictureUrl: DataTypes.STRING,
        postedOnDate: DataTypes.DATE,
        top: DataTypes.BOOLEAN,
        body: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
            // associations can be defined here
            }
        }
    });
    return Post;
};