// var Sequelize = require('sequelize');
// var DataTypes = require('sequelize/lib/data-types');
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('Users', {
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: Sequelize.INTEGER
//             },
//             username: DataTypes.STRING,
//             password: DataTypes.STRING,
//             email: DataTypes.STRING,
//             admin: DataTypes.BOOLEAN,
//             createdAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE
//             },
//             updatedAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE
//             }
//         });
//     },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('Users');
//     }
// };
