//#region Introduction
// Author : Gaurav Sahitya
// Subject : Online Book Selling Portal
//#endregion

// Module declaractions

const Server = require('./config');
const Routes = require('./routes');
const LoadENV = require('@book-junction/env-loader');
const Constants = require('./constants');

const $ENV = LoadENV(['.env.development']);
const PORT = $ENV.PORT ?? 3000;
const HOST = $ENV.HOST ?? 'localhost';

(function () {
  try {
    const url = `${$ENV.DATABASE_URI}${$ENV.DATABASE_NAME}`;

    Server.init();
    Server.checkSystemVariables(Constants.REQ_ENV_VARS, Constants.OPT_ENV_VARS);
    Server.configure();
    Server.connectDb(url);

    Routes.init(Server.$App);

    Server.start(PORT, HOST);
  } catch (error) {
    console.log('An error occurred');
    console.log('Error name - ', error.name);
    console.log('Error message - ', error.message);

    process.exit(-1);
  }
})();
