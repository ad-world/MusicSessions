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

async function delete_queue (host_id) {
	const check = await Queue.findOne({ id: queue_id, host_id: host_id }).lean().exec();

	if (!check) {
		return {
			status  : 'failure',
			message : 'Queue does not exist'
		};
	}

	await Queue.deleteOne({ id: queue_id, host_id: host_id }).lean().exec();

	return {
		status  : 'success',
		message : 'Queue was deleted successfully'
	};
}

module.exports = { create_queue, delete_queue };
