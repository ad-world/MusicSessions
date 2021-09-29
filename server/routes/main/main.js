const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

router.get('/home', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

module.exports = router;
