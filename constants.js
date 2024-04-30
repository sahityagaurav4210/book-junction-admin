class Constants {
  static get OPT_ENV_VARS() {
    return ['HOST', 'PORT'];
  }

  static get REQ_ENV_VARS() {
    return [
      'DATABASE_URI',
      'DATABASE_NAME',
      'EXPRESS_JSON_LIMIT',
      'EXPRESS_URL_ENCODED_LIMIT',
      'LINKEDIN_URL',
      'INSTA_URL',
      'GMAIL_URL',
    ];
  }
}

module.exports = Constants;
