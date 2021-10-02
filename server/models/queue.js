// models/queue.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
	id      : String,
	queue   : [ String ],
	host_id : String,
	size    : Number
});

const Queue = mongoose.model('Queue', QueueSchema);

module.exports = Queue;
