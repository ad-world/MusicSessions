const router = require('express').Router();

router.get('/login', (req, res) => {
	let params = req.query;

	let session = req.session;
	session.token = params.token;
	session.name = params.name;
	session.refresh_token = params.refresh_token;

	res.send(req.session);
});

module.exports = router;
