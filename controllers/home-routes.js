const router = require('express').Router();
const { Photo, PollComment } = require('../models');
const withAuth = require('../middleware/authenticateJWT'); // Correct path to authentication middleware

// GET all photos for homepage
router.get('/', async (req, res) => {
  try {
    const dbPhotoData = await Photo.findAll({
      attributes: ['title', 'caption', 'fileName'], // Updated to use fileName
    });

    const photos = dbPhotoData.map(photo => photo.get({ plain: true }));

    res.render('album', { photos, loggedIn: req.user ? true : false }); // Check for loggedIn status
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one Photo
router.get('/photo/:id', async (req, res) => {
  try {
    const dbPhotoData = await Photo.findByPk(req.params.id, {
      include: [
        {
          model: PollComment,
          attributes: ['id', 'content', 'userId'], // Include comments
        },
      ],
    });

    if (!dbPhotoData) {
      return res.status(404).json({ message: 'No photo found with this id' });
    }

    const photo = dbPhotoData.get({ plain: true });
    res.render('photo', { photo, loggedIn: req.user ? true : false }); // Pass loggedIn status
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET all photos for swiper component
router.get('/swiper', async (req, res) => {
  try {
    const dbPhotoData = await Photo.findAll({
      attributes: ['title', 'caption', 'fileName', 'id'],
    });

    const photos = dbPhotoData.map(photo => photo.get({ plain: true }));

    res.render('swiper', { photos, loggedIn: req.user ? true : false }); // Pass loggedIn status
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/'); // Redirect to home if already logged in
    return;
  }
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  if (req.user) {
    res.redirect('/'); // Redirect to home if already logged in
    return;
  }
  res.render('create-account');
});

// Render photo upload page
router.get('/upload', withAuth, (req, res) => {
  res.render('upload-photo', { loggedIn: req.user ? true : false });
});

module.exports = router;
