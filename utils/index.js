const db = require('utils/db');

class Utilities {
  static get $DB() {
    return db;
  }
}

module.exports = Utilities;
