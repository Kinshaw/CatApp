const User = require('./User');
const Photo = require('./Photo');
const PhotoLike = require('./PhotoLike');
const PollComment = require('./PollComment');

// Define relationships
User.hasMany(PhotoLike, {
  foreignKey: 'user_id', // Updated to match the model
  onDelete: 'CASCADE',
});

PhotoLike.belongsTo(User, {
  foreignKey: 'user_id', // Updated to match the model
});

Photo.hasMany(PhotoLike, {
  foreignKey: 'photo_id', // Updated to match the model
  onDelete: 'CASCADE',
});

PhotoLike.belongsTo(Photo, {
  foreignKey: 'photo_id', // Updated to match the model
});

User.hasMany(PollComment, {
  foreignKey: 'user_id', // Updated to match the model
  onDelete: 'CASCADE',
});

PollComment.belongsTo(User, {
  foreignKey: 'user_id', // Updated to match the model
});

Photo.hasMany(PollComment, {
  foreignKey: 'photo_id', // Updated to match the model
  onDelete: 'CASCADE',
});

PollComment.belongsTo(Photo, {
  foreignKey: 'photo_id', // Updated to match the model
});

module.exports = { User, Photo, PhotoLike, PollComment };