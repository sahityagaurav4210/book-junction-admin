const Utilities = require('../utils');

class AuthController {
  static async login(req, res) {
    try {
      const { $DB } = global;
      const { authenticatedUser } = req;

      const { matchedCount } = await Utilities.$DB.update(
        $DB,
        'users',
        { _id: authenticatedUser._id },
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occured',
        data: {
          name: error?.name,
          message: error.message,
        },
        status: false,
        code: 500,
      });
    }
  }

  static async logout(req, res) {
    try {
      const { $DB } = global;
      const { username } = req.body;
      const updatedDoc = await Utilities.$DB.findAndUpdate($DB, 'users', { username }, { $set: { isLoggedIn: false } });

      if (updatedDoc && !updatedDoc.isLoggedIn) {
        return res.status(200).json({
          message: 'Logout successfull',
          status: true,
          code: 200,
        });
      } else {
        return res.status(503).json({
          message: "We're unable to log you out, please try again",
          status: false,
          code: 503,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured',
        data: {
          name: error?.name,
          message: error.message,
        },
        status: false,
        code: 500,
      });
    }
  }

  static async isUserLoggedIn(req, res) {
    try {
      const { $DB } = global;
      const { username } = req.body;

      const record = await Utilities.$DB.findOne($DB, 'users', { username });

      if (record?.isLoggedIn) {
        return res.status(200).json({
          message: 'User is logged in',
          code: 200,
          status: true,
        });
      } else {
        return res.status(401).json({
          message: 'User is not logged in',
          code: 401,
          status: false,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured',
        code: 500,
        data: {
          name: error?.name,
          message: error.message,
        },
        status: false,
      });
    }
  }
}

module.exports = AuthController;
