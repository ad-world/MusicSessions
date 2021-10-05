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

			await axios(options).then((result) => console.log(result.data));
		} catch (err) {
			console.error('here');
		}

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

router.get('/session', (req, res) => {
	res.render('home/session', { layout: 'home/session' });
});

module.exports = router;
