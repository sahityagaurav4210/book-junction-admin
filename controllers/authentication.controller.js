const Helpers = require('../helpers');
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
        const code = Helpers.HttpResponseStatusCode.OK;
        return res.status(code).json({
          message: 'Login Successfull',
          status: true,
          code,
        });
      } else {
        const code = Helpers.HttpResponseStatusCode.UNAVAILABLE;
        return res.status(code).json({
          message: "We're unable to log you in right now, please try again...",
          status: false,
          code,
        });
      }
    } catch (error) {
      const code = Helpers.HttpResponseStatusCode.SERV_ERR;
      return res.status(code).json({
        message: 'An error occured',
        data: {
          name: error?.name,
          message: error.message,
        },
        status: false,
        code,
      });
    }
  }

  static async logout(req, res) {
    try {
      const { $DB } = global;
      const { username } = req.body;
      const updatedDoc = await Utilities.$DB.findAndUpdate($DB, 'users', { username }, { $set: { isLoggedIn: false } });

      if (updatedDoc && !updatedDoc.isLoggedIn) {
        const code = Helpers.HttpResponseStatusCode.OK;
        return res.status(code).json({
          message: 'Logout successfull',
          status: true,
          code,
        });
      } else {
        const code = Helpers.HttpResponseStatusCode.UNAVAILABLE;
        return res.status(code).json({
          message: "We're unable to log you out, please try again",
          status: false,
          code,
        });
      }
    } catch (error) {
      const code = Helpers.HttpResponseStatusCode.SERV_ERR;
      return res.status(code).json({
        message: 'An error occured',
        data: {
          name: error?.name,
          message: error.message,
        },
        status: false,
        code,
      });
    }
  }

  static async isUserLoggedIn(req, res) {
    try {
      const { user } = req;

      if (user?.isLoggedIn) {
        const code = Helpers.HttpResponseStatusCode.OK;
        return res.status(code).json({
          message: 'User is logged in',
          code,
          status: true,
        });
      } else {
        const code = Helpers.HttpResponseStatusCode.UNAUTHORISED;
        return res.status(code).json({
          message: 'User is not logged in',
          code,
          status: false,
        });
      }
    } catch (error) {
      const code = Helpers.HttpResponseStatusCode.SERV_ERR;
      return res.status(code).json({
        message: 'An error occured',
        code,
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
