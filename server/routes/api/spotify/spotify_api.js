const router = require('express').Router();
const url = require('url');
const spotify_actions = require('../../../controllers/spotify/actions');
const util = require('../../util/auth');

router.get('/search', util.authenticated, async (req, res) => {
	const keywords = req.query.keywords;
	const token = req.session.token;

	var data = await spotify_actions.host_search(keywords, token);

	if (data) {
		data = data.tracks.items;
		data = data.map((item) => {
			return {
				id      : item.id,
				uri     : item.url,
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
