require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Adjust path as needed

const app = express();
const PORT = process.env.PORT || 3001;

// Configure session
const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply session middleware
app.use(session(sess));

// Configure Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials'),
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.render('homepage', {
    year: new Date().getFullYear()
  });
});

// Sync sequelize and start server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });
