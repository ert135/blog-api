var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
    up: (queryInterface, Sequelize) => {
        console.log('Migration happening')
        return queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER
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
            }
        })
        .then(function(results) {
            console.log('results are ', results);
            // results will be the result of the first query
        });;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Posts');
    }
};
