module.exports = {
    up: (queryInterface, Sequelize) => {
        console.log('datatypes are ', Sequelize.DataTypes)
        return queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            body: Sequelize.Text,
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            postId: {
                type: Sequelize.DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'post',
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
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Comments');
    }
};
