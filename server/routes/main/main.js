const router = require('express').Router();

const home = require('./home/main');
const session = require('./session/main');
const error = require('./error');
router.use('/', home);
router.use('/', session);
router.use('*', error);


module.exports = router;
