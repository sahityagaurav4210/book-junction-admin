const Controllers = require('../controllers');
const router = require('express').Router();

router.post('/login', Controllers.authentication().login);

module.exports = router;
