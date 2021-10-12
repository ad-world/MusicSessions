const router = require('express').Router();

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

	return res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	return res.redirect('/');
});

module.exports = router;
