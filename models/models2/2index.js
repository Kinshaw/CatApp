const User = require('./User');
const Album = require('./Album');
const Photo = require('./Photo');

Album.hasMany(Photo, {
  foreignKey: 'Album_id',
});

Photo.belongsTo(Album, {
  foreignKey: 'Album_id',
});

module.exports = { User, Album, Photo };
