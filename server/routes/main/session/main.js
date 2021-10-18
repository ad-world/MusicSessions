const router = require('express').Router();
const util = require('../../util/auth');
const queue_logic = require('../../../controllers/queue/logic');
const queue_actions = require('../../../controllers/queue/actions');

router.get('/session/:session_id', util.view_auth, async (req, res) => {
	const session_id = req.params.session_id;
	const user_id = req.session.user_id;

	const validation = await queue_logic.check_host(user_id, session_id);

	if (validation.status == 'success') {
		const queue = await queue_actions.get_queue(session_id);
		const join_id = queue.data.join_id;

		const connected = queue.data.ragers;

		res.render('home/session', { join_id: join_id, connected: connected, layout: 'home/session' });
	} else {
		res.render('error/error', { layout: 'home/main' });
	}
});

router.get('/session/user/:session_id', async (req, res) => {
	try {
		const session_id = req.params.session_id;
		const connected_id = req.session.connected_id;

		const connected = await queue_logic.check_connected(session_id, connected_id);

		if (connected.status == 'success') {
			const queue = await queue_actions.get_queue(session_id);
			var join_id = queue.data.join_id;
			var host_name = queue.data.host_name;

			return res.render('session/user_session', { join_id: join_id, host_name: host_name, layout: 'home/session' });
		} else {
			return res.render('error/error', { layout: 'home/main' });
		}
	} catch (err) {
		console.log(err);
		return res.render('error/error', { layout: 'home/main' });
	}
});

module.exports = router;
