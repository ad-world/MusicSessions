const router = require('express').Router();
const util = require('../../util/auth');
const queue_logic = require('../../../controllers/queue/logic');
const queue_actions = require('../../../controllers/queue/actions');
const spotify_actions = require('../../../controllers/spotify/actions');
const refresh = require('../../util/refresh_token');

router.get('/session/:session_id', util.view_auth, refresh.refresh, async (req, res) => {
	const session_id = req.params.session_id;
	const user_id = req.session.user_id;
	const token = req.session.token;

	console.log(token);

	const validation = await queue_logic.check_host(user_id, session_id);

	if (validation.status == 'success') {
		const queue = await queue_actions.get_queue(session_id);
		const join_id = queue.data.join_id;
		const size = queue.data.size;
		const connected = queue.data.ragers;
		const songs = queue.data.queue.length ? queue.data.queue : [];

		const now_playing = await spotify_actions.currently_playing(token);

		console.log(now_playing);

		res.render('session/session', {
			join_id   : join_id,
			connected : connected,
			size      : size,
			songs     : songs,
			layout    : 'session/session'
		});
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
			const songs = queue.data.queue.length ? queue.data.queue : [];

			return res.render('session/user_session', {
				join_id   : join_id,
				host_name : host_name,
				songs     : songs,
				layout    : 'session/user_session'
			});
		} else {
			return res.render('error/error', { layout: 'home/main' });
		}
	} catch (err) {
		console.log(err);
		return res.render('error/error', { layout: 'home/main' });
	}
});

module.exports = router;
