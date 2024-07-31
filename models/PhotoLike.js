const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PhotoLike extends Model {}

PhotoLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    photo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'photo',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'photo_like',
  }
);

module.exports = PhotoLike;
