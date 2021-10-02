const router = require('express').Router();

router.get('/login', (req, res) => {
	let params = req.query;

	let session = req.session;
	session.user_id = params.id;
	session.token = params.token;
	session.name = params.name;
	session.refresh_token = params.refresh_token;

	res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
