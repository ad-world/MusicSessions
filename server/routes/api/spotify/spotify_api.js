const router = require('express').Router();
const url = require('url');
const spotify_actions = require('../../../controllers/spotify/actions');
const queue_logic = require('../../../controllers/queue/logic');
const util = require('../../util/auth');
const refresh = require('../../util/refresh_token');

router.get('/search', util.authenticated, refresh.refresh, async (req, res) => {
	try {
		const keywords = req.query.keywords;
		const token = req.session.token;

		var data = await spotify_actions.search(keywords, token);

		if (data) {
			data = data.tracks.items;
			data = data.map((item) => {
				return {
					id      : item.id,
					uri     : item.uri,
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
	} catch (err) {
		console.error(err);
	}
});

router.get('/user/search', util.user_auth, async (req, res) => {
	try {
		const queue_id = req.session.queue_id;
		const keywords = req.query.keywords;
		const token = await queue_logic.get_token_from_queue(queue_id);

		var data = await spotify_actions.search(keywords, token);

		if (data) {
			data = data.tracks.items;
			data = data.map((item) => {
				return {
					id      : item.id,
					uri     : item.uri,
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
	} catch (err) {
		console.error(err);
	}
});

router.get('/song/add', util.authenticated, refresh.refresh, async (req, res) => {
	try {
		const token = req.session.token;
		const uri = req.query.uri;

		let response = await spotify_actions.add_to_queue(uri, token);

		res.send(response);
	} catch (err) {
		console.error(err);
	}
});

router.get('/song/skip', util.authenticated, refresh.refresh, async (req, res) => {
	try {
		const token = req.session.token;
		const next = req.query.action == 'next' ? true : false;

		let response = await spotify_actions.skip_song(token, next);
		res.send(response);
	} catch (err) {
		console.error(err);
	}
});

router.get('/song/pause', util.authenticated, refresh.refresh, async (req, res) => {
	try {
		const token = req.session.token;

		let response = await spotify_actions.pause_song(token);

		res.send(response);
	} catch (err) {
		console.error(err)
	}
})

module.exports = router;
