const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
	if (req.session.token && req.session.refresh_token) {
		const name = req.session.name;

		try {
			const options = {
				method  : 'GET',
				headers : {
					Authorization  : 'Bearer ' + req.session.token,
					'Content-Type' : 'application/json',
					Accept         : 'application/json'
				},
				url     : `${process.env.SPOTIFY_API}/me`
			};
		} catch (err) {
			console.error('here');
		}

		res.render('home/dashboard', { name: name, layout: 'home/main' });
	} else {
		let error = req.query.error ? 'You must have a premium account to use this service' : '';
		if (error) {
			res.render('home/landing', { layout: 'home/main', errors: error });
		} else {
			res.render('home/landing', { layout: 'home/main' });
		}
	}
});

router.get('/create', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

router.get('/join', (req, res) => {
	res.render('home/session_selection', { layout: 'home/main' });
});



module.exports = router;
