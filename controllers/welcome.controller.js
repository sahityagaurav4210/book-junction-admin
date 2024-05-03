const Helpers = require('../helpers');

class WelcomeController {
  static pong(request, response) {
    const code = Helpers.HttpResponseStatusCode.OK;
    return response.status(code).json({
      message: 'Pong',
      status: true,
      data: {},
      code,
    });
  }

  static home(req, res) {
    const { request } = req.query;
    const code = Helpers.HttpResponseStatusCode.OK;

    if (request != 'cp') res.status(code).render('login');
    else res.status(code).render('cp');
  }

  static notfound(req, res) {
    const code = Helpers.HttpResponseStatusCode.OK;
    return res.status(code).render('page', {
      heading: `The page you are trying to access is not present.`,
      linkedin: global.$ENV.LINKEDIN_URL,
      instagram: global.$ENV.INSTA_URL,
      gmail: global.$ENV.GMAIL_URL,
      title: '404 - Not Found',
      imageUrl: '/public/images/pages/404.avif',
    });
  }
}

module.exports = WelcomeController;
