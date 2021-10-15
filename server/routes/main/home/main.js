const router = require('express').Router();
const axios = require('axios');
const queue_actions = require('../../../controllers/queue/actions');

router.get('/', async (req, res) => {
	if (req.session.token && req.session.refresh_token) {
		const user_id = req.session.user_id;
		const name = req.session.name;

		const online = await queue_actions.check_online(user_id);

		res.render('home/dashboard', { name: name, online: online, layout: 'home/main' });
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
	res.render('home/session_selection', { layout: 'home/session_selection' });
});

module.exports = router;
