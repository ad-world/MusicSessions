function authenticated (req, res, next) {
	if (req.session.token && req.session.refresh_token && req.session.user_id) {
		next();
	} else {
		res.status(401).send({
			status  : 'failure',
			message : 'Unauthenticated request'
		});
	}
}

module.exports = { authenticated };
