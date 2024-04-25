const AuthenticationMiddleware = require('./authentication.middleware');

class Middlewares {
  static authentication() {
    return AuthenticationMiddleware;
  }
}

module.exports = Middlewares;
