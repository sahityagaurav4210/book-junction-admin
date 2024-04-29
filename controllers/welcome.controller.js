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
    return res.render('404');
  }
}

module.exports = WelcomeController;
