// const Sequelize = require('sequelize');
// require('dotenv').config();

// // const sequelize = process.env.DB_URL
// //   ? new Sequelize(process.env.DB_URL)
// //   : new Sequelize(
// //     process.env.DB_NAME,
// //     process.env.DB_USER,
// //     process.env.DB_PASSWORD,
// //     {
// //       host: 'localhost',
// //       dialect: 'postgres',
// //     }
// //   );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new instance of Sequelize using the DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;