var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        body: DataTypes.Text
    }, {
        classMethods: {
            associate: function(models) {
                Comment.belongsTo(models.Post, {
                    foreignKey: 'id',
                    onDelete: 'CASCADE',
                });
                Comment.belongsTo(models.User, {
                    foreignKey: 'id',
                    onDelete: 'CASCADE',
                });
            }
        }
    });

    return Comment;
};