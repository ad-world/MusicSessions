const router = require('express').Router();
const queue_actions = require('../../../controllers/queue/actions');

router.get('/login', (req, res) => {
	let params = req.query;

	if (params.product !== 'premium') {
		return res.redirect('/?error=not_premium');
	}
	let session = req.session;
	session.user_id = params.id;
	session.token = params.token;
	session.name = params.name;
	session.refresh_token = params.refresh_token;
	session.expires_in = params.expires_in * 1000;
	session.started_at = Date.now();


	return res.redirect('/');
});

router.get('/logout', async (req, res) => {
	const user_id = req.session.user_id;
	await queue_actions.delete_queue(user_id);

	req.session.destroy();
	return res.redirect('/');
});

module.exports = router;
