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
	console.log(token);
	var data;
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

		await axios(options).then((res) => (data = res.data));
	} catch (err) {
		console.error(err);
	}

	console.log(data);
	return data;
}
module.exports = { search, currently_playing };
