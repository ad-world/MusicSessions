const router = require('express').Router();
const util = require('../../util/auth');
const queue_actions = require('../../../controllers/queue/actions');
const queue_logic = require('../../../controllers/queue/logic');
const refresh = require('../../util/refresh_token');

router.post('/create', util.authenticated, refresh.refresh, async (req, res) => {
	const id = req.session.user_id;
	const name = req.session.name;
	const queue = await queue_actions.create_queue(id, name);

	return res.send(queue);
});

router.post('/join', async (req, res) => {
	const { name, join_id } = req.body;

	if (req.session.connected_id) {
		await queue_logic.remove_from_queues(req.session.connected_id);
	}

	const data = {
		name    : name,
		join_id : join_id
	};

	const response = await queue_logic.join_session(data);
	if (response.id) {
		req.session.name = name;
		req.session.connected_id = response.id;
		req.session.queue_id = response.queue_id;
	}
	return res.send(response);
});
module.exports = router;

router.post('/remove', util.authenticated, refresh.refresh, async (req, res) => {
	const { connected_id } = req.body;
	console.log(req.body);

	let response = await queue_logic.remove_from_queues(connected_id);

	return res.send(response);
});

router.post('/add/user/song', util.user_auth, async (req, res) => {
	const { song } = req.body;
	const { name, queue_id } = req.session;

	const data = {
		requested_by : name,
		...song
	};

	let response = await queue_logic.add_to_queue(data, queue_id);

	return res.send(response);
});
