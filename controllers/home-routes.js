const router = require('express').Router();
const { Album, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth.js');

// GET all Albums for homepage
router.get('/', async (req, res) => {
  try {
    const dbAlbumData = await Album.findAll({
      include: [
        {
          model: Painting,
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
          model: Painting,
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

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
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
