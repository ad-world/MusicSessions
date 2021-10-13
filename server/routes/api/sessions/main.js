const router = require('express').Router();
const util = require('../util/auth');
const queue_actions = require('../../../controllers/queue/actions');

router.post('/session/create', util.authenticated, async (req, res) => {
	const id = req.session.user_id;
	const queue = await queue_actions.create_queue(id);
    
	return res.send(queue);
});


module.exports = router;
