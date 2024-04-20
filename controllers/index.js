const WelcomeController = require('./welcome.controller');
const AuthController = require('./authentication.controller');

class Controllers {
  static welcome() {
    return WelcomeController;
  }

  static authentication() {
    return AuthController;
  }
}

module.exports = Controllers;
