const Controllers = require('../controllers');
const router = require('express').Router();

router.post('/login', Controllers.authentication().login);
router.post('/logout', Controllers.authentication().logout);
router.post('/check', Controllers.authentication().isUserLoggedIn);

module.exports = router;
