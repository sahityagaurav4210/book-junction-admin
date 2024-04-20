class WelcomeController {
  static pong(request, response) {
    return response.status(200).json({
      message: 'Pong',
      status: true,
      data: {},
      code: 200,
    });
  }
}

module.exports = WelcomeController;
