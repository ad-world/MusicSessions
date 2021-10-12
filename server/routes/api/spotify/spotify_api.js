const router = require('express').Router();
const url = require('url');
const axios = require('axios');
const util = require('../util/auth');

router.get('/search', util.authenticated, async (req, res) => {
	const keywords = req.query.keywords;
	const token = req.session.token;

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

		await axios(options).then((result) => (data = result.data ? result.data : false));
	} catch (err) {
		console.error(err);
	}

	if (data) {
		data = data.tracks.items;
		data = data.map((item) => {
			return {
				name    : item.name,
				artists : item.artists.map((item) => item.name),
				image   : item.album.images[2].url
			};
		});

		const response = {
			items : data
		};

		res.send(response);
	} else {
		res.send({
			status  : 'failure',
			message : 'No songs found.'
		});
	}
});

module.exports = router;
