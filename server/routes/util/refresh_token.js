const request = require('request');
const querystring = require('querystring');

// async function refresh (req, res, next) {
// 	console.log(token);

// 	const headers = {
// 		Authorization  : 'Basic ' + token,
// 		'Content-Type' : 'application/x-www-form-urlencoded'
// 	};

// 	const refreshBody = {
// 		grant_type    : 'refresh_token',
// 		refresh_token : refresh_token
// 	};

// 	axios.post('https://accounts.spotify.com/api/token', refreshBody, headers).then((res) => console.log(res));

// 	// console.log(token);
// 	// var current = Date.now();
// 	// const options = {
// 	// 	hostname: 'accounts.spotify.com',
// 	// 	path: '/api/token',
// 	// 	method: 'POST'
// 	// }

// 	// var new_token = await axios.post('https://accounts.spotify.com/api/token', refreshBody, {
// 	// 	headers : {
// 	// 		Authorization : 'Basic ' + token
// 	// 	}
// 	// });

// 	// console.log(new_token);

// 	next();

// 	// let new = await axios
// 	// if (current - started_at < expires_in) {
// 	// 	if (expires_in - (current - started_at) < 300000) {
// 	// 		// 5 mins

// 	// 	}
// 	// }
// }

function refresh (req, res, next) {
	var { expires_in, started_at, refresh_token } = req.session;

	const token = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');

	const refreshBody = querystring.stringify({
		grant_type    : 'refresh_token',
		refresh_token : refresh_token
	});
	const boom = request(
		{
			// Assuming you have this setup as: https://accounts.spotify.com/api/token
			url     : 'https://accounts.spotify.com/api/token',
			method  : 'POST',
			headers : {
				// Authorization: Basic <base64 encoded client_id:client_secret>
				Authorization    : 'Basic ' + token,
				'Content-Type'   : 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(refreshBody)
			}
		},
		(err, res) => {
			if (res) {
				const resData = JSON.parse(res.body);
				console.log(resData);
				// Set new access tokens
				// access_token = resData.access_token;
				// // setup your Authorization token, e.g.
				// token = btoa(access_token);
				// callback();
				next();
			} else if (err) {
				// Handle error...
				console.log(err);
			}
		}
	);
	boom.write(refreshBody);
}

module.exports = { refresh };
