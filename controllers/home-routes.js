const router = require('express').Router();
const { Album, Photo } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth.js');

// GET all photos for homepage (Kim: this works and displays the carousel)
router.get('/', async (req, res) => {
  try {
    const dbPhotoData = await Photo.findAll({
      attributes: ['title', 'caption', 'filename'],
    });

    const photos = dbPhotoData.map((photo) =>
      photo.get({ plain: true })
    );

    //res.json(photos);  // Return JSON data
   
    res.render('album', { photos });
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
  


// GET one Photo
// Use the custom middleware before allowing the user to access the Photo
//router.get('/Photo/:id', withAuth, async (req, res) => {
  router.get('/Photo/:id', async (req, res) => {
    try {
      const dbPhotoData = await Photo.findByPk(req.params.id);
  
      if (!dbPhotoData) {
        return res.status(404).json({ message: 'No photo found with this id' });
      }
  
      const Photo1 = dbPhotoData.get({ plain: true });
      res.render('photo', { Photo1 });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
   

  router.get('/swiper', async (req, res) => {
    try {
      const dbPhotoData = await Photo.findAll({
        attributes: ['title', 'caption', 'filename', 'id'],
      });
  
      const photos = dbPhotoData.map((photo) =>
        photo.get({ plain: true })
      );
  
      res.render('swiper', { photos });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
 
// this is not working yet
router.get('/login', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('login');
});

module.exports = router;
