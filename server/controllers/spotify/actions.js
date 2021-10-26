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
			url     : `${process.env.SPOTIFY_API}/me/player`
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
module.exports = { search, currently_playing };
