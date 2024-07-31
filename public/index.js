const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(userRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (if using handlebars, for example)
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve the create-account page (this can be adjusted as needed)
app.get('/create-account', (req, res) => {
  res.render('create-account');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
