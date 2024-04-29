const Controllers = require('../controllers');

const router = require('express').Router();

router.get('/', Controllers.welcome().home);
router.get('/ping', Controllers.welcome().pong);
router.get('*', Controllers.welcome().notfound);

module.exports = router;
