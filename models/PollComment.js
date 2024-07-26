const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PollComment extends Model {}

PollComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Model name should be in lowercase
        key: 'id',
      },
      allowNull: false,
    },
    pollid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'poll', // Model name should be in lowercase
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true, // Ensures table name is exactly as defined
    underscored: true,      // Use snake_case for column names
    modelName: 'pollcomment', // Consistent naming
  }
);

module.exports = PollComment;