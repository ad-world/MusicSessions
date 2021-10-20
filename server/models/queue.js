// models/queue.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
	id        : String,
	join_id   : String,
	queue     : [
		{
			id           : String,
			uri          : String,
			name         : String,
			artists      : [ String ],
			image        : String,
			requested_by : String
		}
	],
	host_id   : String,
	host_name : String,
	size      : Number,
	ragers    : [
		{
			id   : String,
			name : String
		}
	]
});

const Queue = mongoose.model('Queue', QueueSchema);

module.exports = Queue;
