const router = require('express').Router();
const util = require('../../util/auth');
const queue_logic = require('../../../controllers/queue/logic');

router.get('/session/:session_id', util.view_auth, async (req, res) => {
	const session_id = req.params.session_id;
	const user_id = req.session.user_id;

	const validation = await queue_logic.check_host(user_id, session_id);

	if (validation.status == 'success') {
		res.render('home/session', { layout: 'home/session' });
	} else {
		res.render('error/error', { layout: 'home/main' });
	}
});

module.exports = router;
