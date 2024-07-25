const sequelize = require('../config/connection');
const seedAlbum = require('./albumData');
const seedPhotos = require('./photoData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedAlbum();

  await seedPhotos();

  process.exit(0);
};

seedAll();
