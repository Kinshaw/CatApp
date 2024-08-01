const router = require('express').Router();
const { Album, Photo, PhotoLike, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth.js');

// GET all photos for homepage (Kim: this works and displays the carousel)
router.get('/profile', async (req, res) => {
  try {


    const userId = req.session.user_id; // current logged in user

    const likedPhotos = await Photo.findAll({
      attributes: ['title', 'caption', 'filename'],
      include: [
        {
          model: PhotoLike,
          attributes: [], // No need to select attributes from PhotoLike
          where: { userid: userId }, // Filter by the user's ID
        },
      ],
    });


    const profilePhotos = likedPhotos.map((likedPhotos) =>
      likedPhotos.get({ plain: true })
    );
    console.log(profilePhotos);

    //res.json(photos);  // Return JSON data

    // res.render('album', { photos });
    res.render('album', {
      profilePhotos, loggedIn: req.session.loggedIn,
      user: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Album (kim: this works renders json to route)
// Use the custom middleware before allowing the user to access the Album
//router.get('/Album/:id', withAuth, async (req, res) => {
// GET one Album
router.get('/Photo/:id', async (req, res) => {
  try {
    const dbAlbumData = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Photo,
          attributes: [
            'id',
            'title',
            'caption',
          ],
        },
      ],
    });

    if (!dbAlbumData) {
      res.status(404).json({ message: 'No album found with this id' });
      return;
    }

    const album = dbAlbumData.get({ plain: true });
    res.json(album);
    // res.render('Album', { album, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// GET one User with the goal of updating their bio
// Use the custom middleware before allowing the user to access the Photo
//router.get('/Photo/:id', withAuth, async (req, res) => {
router.get('/update', async (req, res) => {
  try {
    console.log("my user id is logged in as " + req.session.user_id);

    const userData = await User.findByPk(req.session.user_id);

    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id' });
    }


