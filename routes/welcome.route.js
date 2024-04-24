const Controllers = require('../controllers');

const router = require('express').Router();

router.get('/', Controllers.welcome().home);
router.get('/ping', Controllers.welcome().pong);

module.exports = router;
