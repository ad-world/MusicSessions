const Queue = require('../../models/queue');

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

module.exports = { check_host };
