const router = require('express').Router();
const photoRoutes = require('./photoRoutes');
const albumRoutes = require('./albumRoutes');

router.use('/Photo', photoRoutes);
router.use('/Album', albumRoutes);

module.exports = router;