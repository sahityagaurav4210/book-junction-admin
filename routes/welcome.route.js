const Controllers = require('../controllers');

const router = require('express').Router();

router.get('/', Controllers.welcome().pong);

module.exports = router;
