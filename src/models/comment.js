var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

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