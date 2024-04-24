const express = require('express');
const LoadENV = require('@book-junction/env-loader');
const fileUpload = require('express-fileupload');

const path = require('path');
const cors = require('cors');

const AppNotInitializedException = require('../exceptions/AppNotInitializedException');
const EnvNotLoadedException = require('../exceptions/EnvNotLoadedException');
const Utilities = require('../utils');

class ServerConfiguration {
  static $App;
  static $ENV;
  static $DB;

  static init() {
    const app = express();
    ServerConfiguration.$App = app;
    ServerConfiguration.$ENV = LoadENV(['.env.development']);
    global.$ENV = ServerConfiguration.$ENV;
  }

  static configure() {
    if (!ServerConfiguration.$App || !ServerConfiguration.$ENV)
      throw new AppNotInitializedException('Please initialize the app first, before configuring it.');

    //Setting up the payload limit
    ServerConfiguration.$App.use(express.json({ limit: ServerConfiguration.$ENV.EXPRESS_JSON_LIMIT }));
    ServerConfiguration.$App.use(
      express.urlencoded({ extended: true, limit: ServerConfiguration.$ENV.EXPRESS_URL_ENCODED_LIMIT })
    );

    //Setting up the publicly accessible routes
    ServerConfiguration.$App.use('/static', express.static(path.resolve(__dirname, '../static')));
    ServerConfiguration.$App.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

    //Configuring CORS
    ServerConfiguration.$App.use(
      cors({
        origin: '*',
      })
    );

    //Configuring file uploads
    ServerConfiguration.$App.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: path.resolve(__dirname, '../tmp'),
        createParentPath: true,
      })
    );

    //Configuring view engines
    ServerConfiguration.$App.set('view engine', 'pug');
    ServerConfiguration.$App.set('views', path.resolve(__dirname, '../views'));
  }

  static checkSystemVariables(requiredVars = [], optionalVars = []) {
    let loaded = true;

    for (let variable in ServerConfiguration.$ENV) {
      if (requiredVars.includes(variable)) continue;
      else if (optionalVars.includes(variable)) continue;
      else {
        loaded = false;
        break;
      }
    }

    if (!loaded) throw new EnvNotLoadedException('Missing required environment variables.');
  }

  static async connectDb(url) {
    ServerConfiguration.$DB = await Utilities.$DB.connect(url);
    global.$DB = ServerConfiguration.$DB;
  }

  static start(PORT, HOST) {
    if (!ServerConfiguration.$App)
      throw new AppNotInitializedException('Please initiate the app before starting the server');

    ServerConfiguration.$App.listen(PORT, HOST, () => {
      console.log(`Server started at port ${PORT} 🚀🚀🚀🚀`);
    });
  }
}

module.exports = ServerConfiguration;
