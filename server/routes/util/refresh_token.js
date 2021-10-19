const request = require('request');
const querystring = require('querystring');
const user_actions = require('../../controllers/users/actions');

function refresh (req, res, next) {
	var { expires_in, started_at, refresh_token, user_id } = req.session;

	let current = Date.now();

	if (current - started_at > expires_in || expires_in - (current - started_at) < 300000) {
		console.log('Current time: ', current);
		console.log('Started at: ', started_at);
		console.log('Expires in: ', expires_in);

		const token = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');

		const refreshBody = querystring.stringify({
			grant_type    : 'refresh_token',
			refresh_token : refresh_token
		});
		const boom = request(
			{
				url     : 'https://accounts.spotify.com/api/token',
				method  : 'POST',
				headers : {
					Authorization    : 'Basic ' + token,
					'Content-Type'   : 'application/x-www-form-urlencoded',
					'Content-Length' : Buffer.byteLength(refreshBody)
				}
			},
			async (err, data) => {
				if (data) {
					const resData = JSON.parse(data.body);
					const updates = {
						token : resData.access_token
					};

					await user_actions.update_user(user_id, updates);

					req.session.token = resData.access_token;
					req.session.expires_in = (resData.expires_in * 1000);
					req.session.started_at = Date.now();

					next();
				} else if (err) {
					console.log(err);
					res.send(err);
					next();
				}
			}
		);
		boom.write(refreshBody);
	} else {
		next();
	}
}

module.exports = { refresh };
