const axios = require('axios');

async function search (keywords, token) {
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
		console.error(err.response);
	}

	return data;
}

async function currently_playing (token) {
	var data = {};
	var response = {};
	try {
		const options = {
			method  : 'GET',
			headers : {
				Authorization  : 'Bearer ' + token,
				'Content-Type' : 'application/json',
				Accept         : 'application/json'
			},
			url     : `${process.env.SPOTIFY_API}/me/player/currently-playing`
		};

		await axios(options).then((res) => {
			if (res.status == 204) {
				response = {
					status  : 'failure',
					message : 'Player is not active.'
				};
			} else {
				data = res.data.item;
				response = {
					name    : data.name,
					artists : data.artists.map((item) => item.name),
					image   : data.album.images[0]
				};
			}
		});
	} catch (err) {
		console.error(err);
	}

	return response;
}

async function add_to_queue (uri, token) {
	try {
		const options = {
			method  : 'post',
			headers : {
				Authorization  : 'Bearer ' + token,
				'Content-Type' : 'application/json',
				Accept         : 'application/json'
			},
			url     : `${process.env.SPOTIFY_API}/me/player/queue?uri=${uri}`
		};

		const response = await axios(options);

		return {
			status  : 'success',
			message : 'Song added.'
		};
	} catch (err) {
		return {
			status  : 'failure',
			message : 'Please start playback on your device before accepting songs.'
		};
	}
}

async function skip_song (token, next) {
	try {
		const action = next ? 'next' : 'previous';
		const options = {
			method  : 'post',
			headers : {
				Authorization  : 'Bearer ' + token,
				'Content-Type' : 'application/json',
				Accept         : 'application/json'
			},
			url     : `${process.env.SPOTIFY_API}/me/player/${action}`
		};

		const response = await axios(options);

		return {
			status  : 'success',
			message : 'Song skipped'
		};
	} catch (err) {
		console.log(err);
		return {
			status  : 'failure',
			message : 'Undefined error'
		};
	}
}

async function pause_song (token) {
	try {
		const options = {
			method  : 'put',
			headers : {
				Authorization  : 'Bearer ' + token,
				'Content-Type' : 'application/json',
				Accept         : 'application/json'
			},
			url     : `${process.env.SPOTIFY_API}/me/player/pause`
		};

		const response = await axios(options);

		return {
			status  : 'success',
			message : 'Song paused'
		};
	} catch (err) {
		console.log(err);
		return {
			status  : 'failure',
			message : 'Undefined error'
		};
	}
}

module.exports = { search, currently_playing, add_to_queue, skip_song, pause_song };
