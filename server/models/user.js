// models/user.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id            : String,
	email         : { type: String, required: true },
	spotify_id    : String,
	access_token  : { type: String, required: true },
	refresh_token : { type: String, required: true },
	online        : { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
