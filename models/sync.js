const sequelize = require('../config/connection');
const { User, Photo, PhotoLike, PollComment } = require('./index');

const syncDatabase = async () => {
    try {
        // Sync with { alter: true } to adjust tables based on models
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();
