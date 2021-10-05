const router = require('express').Router();
const url = require('url');
const axios = require('axios');
const util = require('../util/auth');

router.get('/search', util.authenticated, async (req, res) => {
	const keywords = req.query.keywords;
	const token = req.session.token;
	console.log(keywords);
	var data;
	try {
		const options = {
			method  : 'GET',
			headers : {
				Authorization  : 'Bearer ' + token,
				'Content-Type' : 'application/json',
				Accept         : 'application/json'
			},
			url     : `${process.env.SPOTIFY_API}/search?q=` + encodeURIComponent(keywords) + '&type=track'
		};

		await axios(options).then((result) => (data = result.data));
	} catch (err) {
		console.error(err);
	}
	data = data.tracks.items;
	data = data.map((item) => {
		return {
			name : item.name
		};
	});

	const response = {
		items : data
	};

	res.send(response);
});

module.exports = router;
