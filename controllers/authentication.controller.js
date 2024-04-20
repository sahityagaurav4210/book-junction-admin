const Utilities = require('../utils');

class AuthController {
  static async login(req, res) {
    const { $DB } = global;
    const document = await Utilities.$DB.findOne($DB, 'users', {
      $and: [{ username: req.body.username }, { password: req.body.password }],
    });

    if (document) {
      const { matchedCount } = await Utilities.$DB.update(
        $DB,
        'users',
        { _id: document._id },
        { $set: { isLoggedIn: true } }
      );

      if (matchedCount === 1) {
        return res.status(200).json({
          message: 'Login Successfull',
          status: true,
          code: 200,
        });
      } else {
        return res.status(503).json({
          message: "We're unable to log you in right now, please try again...",
          status: false,
          code: 503,
        });
      }
    } else {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: false,
        code: 401,
      });
    }
  }
}

module.exports = AuthController;
