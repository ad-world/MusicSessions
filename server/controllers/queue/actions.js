// server/controllers/queue/actions.js

const Queue = require('../../models/queue');
const User = require('../../models/user');
const uniqid = require('uniqid');

async function create_queue (host_id) {
	const id = uniqid();

	const duplicate = await Queue.findOne({ host_id: host_id }).lean().exec();

	if (duplicate) {
		await Queue.updateOne({ host_id: host_id }, { size: 0, queue: [], id: id });
		return {
			status  : 'success',
			message : 'Queue was created',
			id      : id
		};
	}

	const queue = await Queue.create({
		id      : id,
		host_id : host_id,
		queue   : [],
		size    : 0
	});

	await User.updateOne({ id: host_id }, { online: true });

	return {
		status  : 'success',
		message : 'Queue was created',
		id      : id
	};
}

module.exports = { create_user };
