const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.session.token && req.session.refresh_token) {
		const name = req.session.name;
		res.render('home/dashboard', { name: name, layout: 'home/main' });
	} else {
		res.render('home/landing', { layout: 'home/main' });
	}
});

router.get('/create', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

router.get('/join', (req, res) => {
	res.render('home/session_selection', { layout: 'home/main' });
});

module.exports = router;
