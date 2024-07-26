const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Poll extends Model {}

Poll.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'poll',
  }
);

module.exports = Poll;