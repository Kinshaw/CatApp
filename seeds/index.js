const sequelize = require('../config/connection');
const { User, Photo, Poll, Vote, PhotoLike, PollComment, Album } = require('../models');

const userData = [
  { username: 'kim', bio: 'I love cats!', email: 'desveaux.kim@gmail.com', password: 'password123' },
  { username: 'meowmaster', bio: 'Master of meows.', email: 'meowmaster@example.com', password: 'password123' },
  { username: 'purrfect', bio: 'All cats are purrfect!', email: 'purrfect@example.com', password: 'password123' },
  { username: 'felinefan', bio: 'Cats are the best pets.', email: 'felinefan@example.com', password: 'password123' },
  { username: 'kittykat', bio: 'Crazy about kitties!', email: 'kittykat@example.com', password: 'password123' }
];


const photoData = [
  { title: 'Sleepy Cat', caption: 'A very sleepy cat.', filename: 'cat1.jpg', created_at: new Date(), updated_at: new Date() },
  { title: 'Playful Kitten', caption: 'A kitten playing with a toy.', filename: 'cat2.jpg', created_at: new Date(), updated_at: new Date() },
  { title: 'Grumpy Cat', caption: 'A cat looking grumpy.', filename: 'cat3.jpg', created_at: new Date(), updated_at: new Date() },
  { title: 'Curious Cat', caption: 'A cat curiously exploring.', filename: 'cat4.jpg', created_at: new Date(), updated_at: new Date() },
  { title: 'Happy Cat', caption: 'A happy cat.', filename: 'cat5.jpeg', created_at: new Date(), updated_at: new Date() },
  { title: 'Cool Cat', caption: 'A cool cat.', filename: 'cat6.jpeg', created_at: new Date(), updated_at: new Date() }
];

const pollData = [
  { question: 'What is your cat\'s favorite toy?', created_at: new Date(), updated_at: new Date() },
  { question: 'How often do you feed your cat?', created_at: new Date(), updated_at: new Date() },
  { question: 'Do you let your cat go outside?', created_at: new Date(), updated_at: new Date() },
  { question: 'What is your cat\'s favorite sleeping spot?', created_at: new Date(), updated_at: new Date() },
  { question: 'How old is your cat?', created_at: new Date(), updated_at: new Date() }
];


const voteData = [
  { user_id: 1, poll_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 2, poll_id: 2, created_at: new Date(), updated_at: new Date() },
  { user_id: 3, poll_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 4, poll_id: 4, created_at: new Date(), updated_at: new Date() },
  { user_id: 5, poll_id: 5, created_at: new Date(), updated_at: new Date() }
];


const photoLikeData = [
  { userid: 1, photoid: 1, created_at: new Date(), updated_at: new Date() },
  { userid: 2, photoid: 2, created_at: new Date(), updated_at: new Date() },
  { userid: 3, photoid: 3, created_at: new Date(), updated_at: new Date() },
  { userid: 4, photoid: 4, created_at: new Date(), updated_at: new Date() },
  { userid: 5, photoid: 5, created_at: new Date(), updated_at: new Date() }
];


const pollCommentData = [
  { content: 'My cat loves playing with balls!', userid: 1, pollid: 1, created_at: new Date(), updated_at: new Date() },
  { content: 'I feed my cat twice a day.', userid: 2, pollid: 2, created_at: new Date(), updated_at: new Date() },
  { content: 'Yes, I let my cat go outside.', userid: 3, pollid: 3, created_at: new Date(), updated_at: new Date() },
  { content: 'My cat sleeps on my bed.', userid: 4, pollid: 4, created_at: new Date(), updated_at: new Date() },
  { content: 'My cat is 3 years old.', userid: 5, pollid: 5, created_at: new Date(), updated_at: new Date() }
];


const albumData = [
  { title: 'Vacation Cats', caption: 'Cats during our vacation.', created_at: new Date(), updated_at: new Date() },
  { title: 'Christmas Cats', caption: 'Cats during Christmas.', created_at: new Date(), updated_at: new Date() },
  { title: 'Birthday Cats', caption: 'Cats during birthdays.', created_at: new Date(), updated_at: new Date() },
  { title: 'Playtime Cats', caption: 'Cats playing around.', created_at: new Date(), updated_at: new Date() },
  { title: 'Sleeping Cats', caption: 'Cats sleeping in various places.', created_at: new Date(), updated_at: new Date() }
];


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Photo.bulkCreate(photoData);
  await Poll.bulkCreate(pollData);
  await Vote.bulkCreate(voteData);
  await PhotoLike.bulkCreate(photoLikeData);
  await PollComment.bulkCreate(pollCommentData);
  await Album.bulkCreate(albumData);

  process.exit(0);
};

seedDatabase();