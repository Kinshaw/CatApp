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

    const usersData = userData.get({ plain: true });
    // const usersData = userData.map((photo) =>
    //   photo.get({ plain: true })
    // );
    
    //res.json(usersData);
    res.render('update', {
      usersData,
      loggedIn: req.session.loggedIn,
      user: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/', withAuth, async (req, res) => {
  try {
    const dbPhotoData = await Photo.findAll({
      attributes: ['title', 'caption', 'filename', 'id'],
    });

    const photos = dbPhotoData.map((photo) =>
      photo.get({ plain: true })
    );

    console.log("LoggedIn:", req.session.loggedIn);
    console.log("User ID:", req.session.user_id);
    // res.render('swiper', { photos });


    res.render('swiper', {
      photos,
      loggedIn: req.session.loggedIn,
      user: req.session.user_id
    });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





// Route to handle login page rendering
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    console.log("you are logged in")
    // Redirect logged-in users to the homepage or dashboard
    res.redirect('/');
    return;
  }

  // Render the login page for users who are not logged in
  res.render('login');
});

module.exports = router;
