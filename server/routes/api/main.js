const router = require('express').Router();

const spotify = require('./spotify/main');
const users = require('./users/main');
const sessions = require('./sessions/main');

router.use('/api', spotify);
router.use('/api', users);
router.use('/api', sessions);

module.exports = router;
