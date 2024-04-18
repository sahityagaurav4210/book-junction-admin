const Types = require('./Types');

class EnvNotLoadedException extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.name = Types.ENV_NOT_LOADED;
  }
}

module.exports = EnvNotLoadedException;
