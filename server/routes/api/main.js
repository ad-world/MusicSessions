const router = require('express').Router();

const spotify = require('./spotify/main');

router.use('/api', spotify);

module.exports = router;
