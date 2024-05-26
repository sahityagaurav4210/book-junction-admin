const Controllers = require('controllers');
const router = require('express').Router();

router.get('/', Controllers.welcome().home);
router.get('/ping', Controllers.welcome().pong);
router.get('/error', Controllers.welcome().error);
router.get('/offline', Controllers.welcome().offline);
router.get('*', Controllers.welcome().notfound);

module.exports = router;
