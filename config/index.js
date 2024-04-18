const express = require('express');
const LoadENV = require('@book-junction/env-loader');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const AppNotInitializedException = require('../exceptions/AppNotInitializedException');

class ServerConfiguration {
  static $App;
  static $ENV;

  static init() {
    const app = express();
    ServerConfiguration.$App = app;
    ServerConfiguration.$ENV = LoadENV(['.env.development']);
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
}

module.exports = ServerConfiguration;
