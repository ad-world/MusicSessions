const router = require('express').Router();
const util = require('../../util/auth');

router.get('/session/:session_id', util.view_auth, (req, res) => {
	const session_id = req.params.session_id;
	const user_id = req.session.user_id;


	res.render('home/session', { layout: 'home/session' });
});

module.exports = router;
