class WelcomeController {
  static pong(request, response) {
    return response.status(200).json({
      message: 'Pong',
      status: true,
      data: {},
      code: 200,
    });
  }

  static home(req, res) {
    const { request } = req.query;

    if (request != 'cp') res.render('login');
    else res.render('cp');
  }

  static notfound(req, res) {
    return res.render('page', {
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
