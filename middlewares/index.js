const AuthenticationMiddleware = require('middlewares/authentication.middleware');

class Middlewares {
  static authentication() {
    return AuthenticationMiddleware;
  }
}

module.exports = Middlewares;
