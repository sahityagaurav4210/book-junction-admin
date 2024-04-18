const Types = require('./Types');

class AppNotInitializedException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = Types.APP_NOT_INITIALIZED;
  }
}

module.exports = AppNotInitializedException;
