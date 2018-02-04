var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                username: 'RobertSmith',
                password: 'password123',
                email: 'ert135@gmail.com',
                admin: true
            }], {})
            .then(() => {
            return queryInterface.bulkInsert('Post', [{
                    title: 'SeedPost1',
                    subtitle: 'subtitle',
                    pictureUrl: 'http://i32.photobucket.com/albums/d34/robert_smith47/astar_zpsx4vrkozp.png',
                    top: true,
                    body: '<h1>title</h1>',
                    userId: 1
                },
                {
                    title: 'SeedPost2',
                    subtitle: 'subtitle2',
                    pictureUrl: 'http://i32.photobucket.com/albums/d34/robert_smith47/astar_zpsx4vrkozp.png',
                    top: true,
                    body: '<h1>title</h1>',
                    userId: 1
                },
                {
                    title: 'SeedPost3',
                    subtitle: 'subtitle3',
                    pictureUrl: 'http://i32.photobucket.com/albums/d34/robert_smith47/astar_zpsx4vrkozp.png',
                    top: true,
                    body: '<h1>title3</h1>',
                    userId: 1
                },
                {
                    title: 'SeedPost4',
                    subtitle: 'subtitle4',
                    pictureUrl: 'http://i32.photobucket.com/albums/d34/robert_smith47/astar_zpsx4vrkozp.png',
                    top: true,
                    body: '<h1>title4</h1>',
                    userId: 1
                }], {})
                .then(() => {
                return queryInterface.bulkInsert('Comments', [{
                        body: '<sadfsdfdsfdsf',
                        userId: 1,
                        postId: 1
                    }], {});
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
