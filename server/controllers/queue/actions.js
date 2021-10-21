// server/controllers/queue/actions.js

const Queue = require('../../models/queue');
const User = require('../../models/user');
const uniqid = require('uniqid');
const short = require('short-unique-id');

const uid = new short({ length: 7 });

async function create_queue (host_id, host_name) {
	const id = uniqid();
	const join_id = uid();
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
		id        : id,
		join_id   : join_id,
		host_id   : host_id,
		host_name : host_name,
		queue     : [],
		size      : 0,
		ragers    : []
	});

	await User.updateOne({ id: host_id }, { online: true });

	return {
		status  : 'success',
		message : 'Queue was created',
		id      : id
	};
}

async function delete_queue (host_id) {
	const check = await Queue.findOne({ host_id: host_id }).lean().exec();

	if (!check) {
		return {
			status  : 'failure',
			message : 'Queue does not exist'
		};
	}

	await Queue.deleteOne({ host_id: host_id }).lean().exec();

	return {
		status  : 'success',
		message : 'Queue was deleted successfully'
	};
}

async function get_queue (session_id) {
	const check = await Queue.findOne({ id: session_id }).lean().exec();

	if (!check) {
		return {
			status  : 'failure',
			message : 'Queue does not exist'
		};
	}

	return {
		status : 'success',
		data   : check
	};
}

async function get_queue_join_id (join_id) {
	const check = await Queue.findOne({ join_id: join_id }).lean().exec();

	if (!check) {
		return {
			status  : 'failure',
			message : 'Queue does not exists'
		};
	}

	return {
		status : 'success',
		data   : check
	};
}

async function check_online (host_id) {
	const check = await Queue.findOne({ host_id: host_id }).lean().exec();

	return check ? { online: true, id: check.id } : { online: false };
}

module.exports = { create_queue, delete_queue, check_online, get_queue, get_queue_join_id };
