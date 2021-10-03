const router = require('express').Router();
const auth = require('./auth');
const spotify_api = require('./spotify_api');

router.use('/', auth);
router.use('/', spotify_api);

module.exports = router;
