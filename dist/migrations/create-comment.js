var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(() => {
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
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
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
            });
        }).then(() => {
            return queryInterface.createTable('Comments', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.DataTypes.INTEGER
                },
                body: Sequelize.DataTypes.TEXT,
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DataTypes.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DataTypes.DATE
                },
                postId: {
                    type: Sequelize.DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'Post',
                        key: 'id',
                        as: 'postId'
                    }
                },
                userId: {
                    type: Sequelize.DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'Users',
                        key: 'id',
                        as: 'userId'
                    }
                }
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Comments');
    }
};
