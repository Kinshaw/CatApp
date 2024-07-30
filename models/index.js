const User = require('./User');
const Photo = require('./Photo');
const Poll = require('./Poll');
const Vote = require('./Vote');
const PhotoLike = require('./PhotoLike');
const PollComment = require('./PollComment');
const Album = require('./Album');

// One-to-Many Relationship between User and PhotoLike
User.hasMany(PhotoLike, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

PhotoLike.belongsTo(User, {
  foreignKey: 'userid'
});

// One-to-Many Relationship between Photo and PhotoLike
Photo.hasMany(PhotoLike, {
  foreignKey: 'photoid',
  onDelete: 'CASCADE'
});

PhotoLike.belongsTo(Photo, {
  foreignKey: 'photoid'
});

// One-to-Many Relationship between User and Vote
User.hasMany(Vote, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Vote.belongsTo(User, {
  foreignKey: 'userid'
});

// One-to-Many Relationship between Poll and Vote
Poll.hasMany(Vote, {
  foreignKey: 'pollid',
  onDelete: 'CASCADE'
});

Vote.belongsTo(Poll, {
  foreignKey: 'pollid'
});

// One-to-Many Relationship between User and PollComment
User.hasMany(PollComment, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

PollComment.belongsTo(User, {
  foreignKey: 'userid'
});

// One-to-Many Relationship between Poll and PollComment
Poll.hasMany(PollComment, {
  foreignKey: 'pollid',
  onDelete: 'CASCADE'
});

PollComment.belongsTo(Poll, {
  foreignKey: 'pollid'
});

Album.hasMany(Photo, {
  foreignKey: 'album_id',
  onDelete: 'CASCADE'
});

Photo.belongsTo(Album, {
  foreignKey: 'album_id'
});

module.exports = { User, Photo, Poll, Vote, PhotoLike, PollComment, Album};