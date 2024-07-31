const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PollComment extends Model {}

PollComment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'photo', // Ensure this model name matches
      key: 'id',
    },
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user', // Ensure this model name matches
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'poll_comment',
  timestamps: true,
});

module.exports = PollComment;
