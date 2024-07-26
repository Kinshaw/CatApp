const sequelize = require('../config/connection');
const { User, Photo, Poll, Vote, PhotoLike, PollComment } = require('./index');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

