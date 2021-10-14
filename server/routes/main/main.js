const router = require('express').Router();

const home = require('./home/main');
const session = require('./session/main');
router.use('/', home);
router.use('/', session);

module.exports = router;
