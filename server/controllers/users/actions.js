// server/controllers/users/actions.js

'use strict';
const User = require('../../models/user');
const uniqid = require('uniqid');

async function create_user (data) {
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
		refresh_token : refresh_token,
		online        : false
	});

	return {
		id,
		token,
		refresh_token
	};
}

async function update_user (user_id, data) {
	const check = await User.findOne({ id: user_id }).lean().exec();

	if (!check) {
		return {
			status  : 'failure',
			message : 'User not found'
		};
	}

	var keys = Object.keys(data);
	var set = {};

	for (var i = 0; i < keys.length; i++) {
		set[keys[i]] = data[keys[i]];
	}

	var updates = {
		$set : set
	};

	await User.updateOne({ id: user_id }, updates).lean().exec();

	return {
		status  : 'success',
		message : 'User updated'
	};
}

module.exports = { create_user, update_user };
