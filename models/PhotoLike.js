const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PhotoLike extends Model {}

PhotoLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    photoid: {
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
    modelName: 'photolike',
  }
);

module.exports = PhotoLike;