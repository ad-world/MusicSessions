const router = require('express').Router();

const spotify = require('./spotify/main');
const users = require('./users/main');

router.use('/api', spotify);
router.use('/api', users);

module.exports = router;
