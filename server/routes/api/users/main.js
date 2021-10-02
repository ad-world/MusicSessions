const router = require('express').Router();

router.get('/login', (req, res) => {
	let params = req.query;
	res.send(params);
});

module.exports = router;
