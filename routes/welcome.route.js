const Controllers = require('../controllers');

const router = require('express').Router();

router.get('/', Controllers.welcome().home);
router.get('/ping', Controllers.welcome().pong);
<<<<<<< HEAD
router.get('/error', Controllers.welcome().error);
=======
router.get('/offline', Controllers.welcome().offline);
>>>>>>> d2e5e67 (partial commit)
router.get('*', Controllers.welcome().notfound);

module.exports = router;
