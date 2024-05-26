const WelcomeController = require('controllers/welcome.controller');
const AuthController = require('controllers/authentication.controller');

class Controllers {
  static welcome() {
    return WelcomeController;
  }

  static authentication() {
    return AuthController;
  }
}

module.exports = Controllers;
