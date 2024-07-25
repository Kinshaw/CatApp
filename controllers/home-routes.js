const router = require('express').Router();
const { Album, Photo } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth.js');

// GET all Albums for homepage
router.get('/', async (req, res) => {
  try {
    const dbAlbumData = await Album.findAll({
      include: [
        {
          model: Photo,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const Albums = dbAlbumData.map((Album) =>
      Album.get({ plain: true })
    );

    res.render('homepage', {
      Albums,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Album
// Use the custom middleware before allowing the user to access the Album
router.get('/Album/:id', withAuth, async (req, res) => {
  try {
    const dbAlbumData = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Photo,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const Album = dbAlbumData.get({ plain: true });
    res.render('Album', { Album, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Photo
// Use the custom middleware before allowing the user to access the Photo
router.get('/Photo/:id', withAuth, async (req, res) => {
  try {
    const dbPhotoData = await Photo.findByPk(req.params.id);

    const Photo = dbPhotoData.get({ plain: true });

    res.render('Photo', { Photo, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
