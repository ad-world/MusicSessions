const router = require('express').Router();
const util = require('../../util/auth');
const queue_logic = require('../../../controllers/queue/logic');
const queue_actions = require('../../../controllers/queue/actions');

router.get('/session/:session_id', util.view_auth, async (req, res) => {
	const session_id = req.params.session_id;
	const user_id = req.session.user_id;

	const validation = await queue_logic.check_host(user_id, session_id);

	if (validation.status == 'success') {
		const queue = await queue_actions.get_queue(user_id);
		const join_id = queue.data.join_id;

		res.render('home/session', { join_id: join_id, layout: 'home/session' });
	} else {
		res.render('error/error', { layout: 'home/main' });
	}
});

module.exports = router;
