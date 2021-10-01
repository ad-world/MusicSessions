// server/controllers/users/actions.js

'use strict';
const User = require('../../models/user');
const uniqid = require('uniqid');

async function create_user (info) {
	const id = uniqid();
	const spotify_id = data.spotify_id;
	const email = data.email;
	const token = data.token;
	const refresh_token = data.refresh_token;

	const duplicate = await User.findOne({ email: email }).lean().exec();

	if (duplicate) {
		await User.updateOne({ email: email }, { token: token, refresh_token: refresh_token }).lean().exec();

		return {
			id            : duplicate.id,
			token,
			refresh_token
		};
	}

	const user = await User.create({
		id            : id,
		email         : email,
		spotify_id    : spotify_id,
		token         : token,
		refresh_token : refresh_token
	});

	return {
		id,
		token,
		refresh_token
	};
}

module.exports = { create_user };
