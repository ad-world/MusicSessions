const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('home/landing', { layout: 'home/main' });
});

router.get('/create', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

router.get('/join', (req, res) => {
	res.render('home/session_selection', { layout: 'home/main' });
});

module.exports = router;
