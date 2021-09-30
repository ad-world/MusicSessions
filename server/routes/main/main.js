const router = require('express').Router();

const home = require('./home/main');

router.use('/', home);

module.exports = router;
