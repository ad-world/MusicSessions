const Queue = require('../../models/queue');
const uniqid = require('uniqid');

async function check_host (host_id, queue_id) {
	let queue = await Queue.findOne({ id: queue_id }).lean().exec();

	if (!queue) {
		return {
			status  : 'failure',
			message : 'Queue does not exist'
		};
	}

	const host = queue.host_id;
	if (host != host_id) {
		return {
			status  : 'failure',
			message : 'Host does not match up'
		};
	}

	return {
		status  : 'success',
		message : 'Validated'
	};
}

async function join_session (data) {
	const { name, join_id } = data;

	let queue = await Queue.findOne({ join_id: join_id }).lean().exec();
	if (!queue) {
		return {
			status  : 'failure',
			message : 'The session code is invalid.'
		};
	}

	const user = {
		id   : uniqid(),
		name : name
	};

	const updates = {
		$push : {
			ragers : user
		},
		$inc  : {
			size : 1
		}
	};

	await Queue.updateOne({ join_id: join_id }, updates).lean().exec();

	return {
		status   : 'success',
		message  : 'Session has been joined.',
		id       : user.id,
		queue_id : queue.id
	};
}

async function remove_from_queues (connected_id) {
	let queues = await Queue.find({ 'rager.id': connected_id }).lean().exec();

	if (queues.length) {
		const updates = {
			$pull : {
				ragers : {
					id : connected_id
				}
			},
			$inc  : {
				size : -1
			}
		};

		await Queue.updateMany({ 'rager.id': connected_id }, updates).lean().exec();
	}
}

async function check_connected (session_id, connected_id) {
	let queue = await Queue.findOne({ id: session_id }).lean().exec();

	if (!queue) {
		return {
			status  : 'failure',
			message : 'Queue not found'
		};
	}

	let ragers = queue.ragers;

	let connected = ragers ? ragers.filter((item) => item.id == connected_id) : false;

	if (connected.length) {
		return {
			status  : 'success',
			message : 'User is connected to this session'
		};
	} else {
		return {
			status  : 'failure',
			message : 'User is not connected to this session.'
		};
	}
}

module.exports = { check_host, join_session, remove_from_queues, check_connected };
