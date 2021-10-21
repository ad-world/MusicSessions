const router = require('express').Router();
const axios = require('axios');
const queue_actions = require('../../../controllers/queue/actions');

router.get('/', async (req, res) => {
	if (req.session.token && req.session.refresh_token) {
		const user_id = req.session.user_id;
		const name = req.session.name;

		const online = await queue_actions.check_online(user_id);

		return res.render('home/dashboard', { name: name, online: online, layout: 'home/main' });
	} else {
		let error = req.query.error ? 'You must have a premium account to use this service' : '';
		if (error) {
			return res.render('home/landing', { layout: 'home/main', errors: error });
		} else {
			return res.render('home/landing', { layout: 'home/main' });
		}
	}
});

router.get('/create', (req, res) => {
	res.render('signin/signin', { layout: 'home/main' });
});

router.get('/join/:join_id', async (req, res) => {
	try {
		const { join_id } = req.params;

		const queue = await queue_actions.get_queue_join_id(join_id);

		const name = queue.data.host_name;

		return res.render('home/join_qr', { layout: 'home/join_qr', name: name, join_id: join_id });
	} catch (err) {
		return res.render('error/error', { layout: 'home/main' });
	}
});

router.get('/join', (req, res) => {
	return res.render('home/session_selection', { layout: 'home/session_selection' });
});

module.exports = router;
