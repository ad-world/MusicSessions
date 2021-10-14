function authenticated (req, res, next) {
	if (req.session.token && req.session.refresh_token && req.session.user_id) {
		next();
	} else {
		req.session.destroy();
		res.status(401).send({
			status  : 'failure',
			message : 'Unauthenticated request'
		});
	}
}

function view_auth (req, res, next) {
	if (req.session.token && req.session.refresh_token && req.session.user_id) {
		next();
	} else {
		req.session.destroy();
		res.render('error/error', { layout: 'home/main' });
	}
}

module.exports = { authenticated, view_auth };
