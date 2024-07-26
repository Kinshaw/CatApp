const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {  // Changed to match the association
        type: DataTypes.INTEGER,
        references: {
            model: 'user',  // Ensure this matches the model name in associations
            key: 'id',
        },
        allowNull: false,
    },
    poll_id: {  // Changed to match the association
        type: DataTypes.INTEGER,
        references: {
            model: 'poll',  // Ensure this matches the model name in associations
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'vote',
    freezeTableName: true,  // Optional: Ensures table name is exactly 'vote'
    underscored: true,      // Optional: Converts camelCase to snake_case
});

module.exports = Vote;