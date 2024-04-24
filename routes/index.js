const AppNotInitializedException = require('../exceptions/AppNotInitializedException');

const welcomeRoutes = require('./welcome.route');
const authRoutes = require('./authentication.route');

class Routes {
  static init(app) {
    if (!app) throw new AppNotInitializedException('Please initialize the app first before initializing the routes.');

    app.use('/', welcomeRoutes);
    app.use('/auth', authRoutes);
  }
}

module.exports = Routes;
