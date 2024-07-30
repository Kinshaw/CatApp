const router = require('express').Router();
const { Photo, User, PhotoLike } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  console.log('Route / POST hit');
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      // testing these two lines
      console.log(req.session.loggedIn + "kim's test");
      console.log(dbUserData);

      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const dbUserData = data.get({plain: true});

    console.log(dbUserData);
    
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await data.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
  // testing these two lines
  console.log(req.session.loggedIn + "kim's test");
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// This is the post to add a photo to the user database when the user clicks the like button. It is on the swiper feature
// with help of ChatGPT need to finalize this section...
router.post('/like', async (req, res) => {
  console.log('like process starting')
  console.log(req.body, req.session)
  try {
    const { photoId } = req.body;
    const userId = req.session.user_id; // Assuming you have user sessions set up
console.log(userId);
    // Find the photo and user
    const photo = await Photo.findByPk(photoId);
    const user = await User.findByPk(userId);

    if (!photo || !user) {
      return res.status(404).json({ message: 'Photo or user not found' });
    }

    // Create an entry in the PhotoLike table
    await PhotoLike.create({ userid: userId, photoid: photoId });

    res.status(200).json({ message: 'Photo liked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

module.exports = router;
