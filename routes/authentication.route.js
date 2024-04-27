const Controllers = require('../controllers');
const Middlewares = require('../middlewares');
const router = require('express').Router();

router.post(
  '/login',
  Middlewares.authentication().checkifUserExists,
  Middlewares.authentication().authenticateUserByPassword,
  Middlewares.authentication().checkIfUserAlreadyLoggedIn,
  Controllers.authentication().login
);
router.post(
  '/logout',
  Middlewares.authentication().checkifUserExists,
  Middlewares.authentication().checkIfUserAlreadyLoggedOut,
  Controllers.authentication().logout
);
router.post('/check', Controllers.authentication().isUserLoggedIn);

module.exports = router;
