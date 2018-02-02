var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
    up: (queryInterface, Sequelize) => {
        console.log('thing is here');
        return queryInterface.createTable('Post', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: DataTypes.STRING,
            subtitle: DataTypes.STRING,
            pictureUrl: DataTypes.STRING,
            postedOnDate: {
                type: DataTypes.DATE,
                defaultValue: Date.now()
            },
            top: DataTypes.BOOLEAN,
            body: DataTypes.TEXT,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId'
                }
            }
        }).then((thing) => {
            console.log('thing is ', thing);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Posts');
    }
};
