const router = require('express').Router();

router.get('/home', (req, res) => {
	res.render('home/main', { layout: 'home/main' });
});

module.exports = router;
