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

      // added the following 4 lines

        req.session.user_id = dbUserData.id;
        // testing these two lines
        console.log(req.session.loggedIn + "kim's test");
        console.log(req.session.user_id + "kim's test");
   


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
    const dbUserData = data.get({ plain: true });

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
      console.log(req.session.user_id + "kim's test");
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

router.post('/like', async (req, res) => {
  console.log('like process starting')
  console.log(req.body, req.session)
  try {
    const { photoId } = req.body;
    const userId = req.session.user_id; 
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


// Update user bio
router.put('/update', async (req, res) => {
  try {
    const { bio } = req.body;

    // Assuming you have a way to get the currently logged-in user
    const userId = req.session.user_id; 
console.log(userId + "bio updated")
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio;
    await user.save();

    res.status(200).json({ message: 'Bio updated successfully' });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
