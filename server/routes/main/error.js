const router = require('express').Router();

router.get('*', async (req, res) => {
    return res.render('error/error', { layout: 'home/main' });
})

module.exports = router;