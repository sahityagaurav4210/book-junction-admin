const Utilities = require('../utils');

class AuthenticationMiddleware {
  static async checkifUserExists(request, response, next) {
    try {
      const { $DB } = global;
      const { username } = request.body;

      const userRecord = await Utilities.$DB.findOne($DB, 'users', { username });

      if (userRecord) {
        request.user = userRecord;
        return next();
      } else {
        const code = 404;
        return response.status(code).json({
          message: 'This user does not exists in our databases',
          code: code,
          status: false,
        });
      }
    } catch (error) {
      const code = 500;
      return response.status(code).json({
        message: 'An error occured',
        data: {
          name: error.name,
          message: error.message,
        },
        code: code,
        status: false,
      });
    }
  }

  static async authenticateUserByPassword(request, response, next) {
    try {
      const { $DB } = global;
      const { user } = request;
      const { username, password } = request.body;

      if (user) {
        if (user.password === password) {
          request.authenticatedUser = user;
          request.user = null;
          return next();
        } else {
          const code = 401;
          return response.status(code).json({
            message: 'Invalid credentials',
            code: code,
            status: false,
          });
        }
      }

      const userRecord = await Utilities.$DB.findOne($DB, 'users', { $and: [{ username }, { password }] });

      if (userRecord) {
        request.authenticatedUser = userRecord;
        return next();
      } else {
        const code = 401;
        return response.status(code).json({
          message: 'Invalid credentials',
          code: code,
          status: false,
        });
      }
    } catch (error) {
      console.log(error);
      const code = 500;
      return response.status(code).json({
        message: 'An error occured',
        data: {
          name: error.name,
          message: error.message,
        },
        code: code,
        status: false,
      });
    }
  }

  static async checkIfUserAlreadyLoggedIn(request, response, next) {
    try {
      const { authenticatedUser } = request;
      const { username, password } = request.body;
      const { $DB } = global;

      if (authenticatedUser) {
        if (!authenticatedUser.isLoggedIn) return next();
        else {
          const code = 409;
          return response.status(code).json({
            message: 'This user is already logged in his account',
            code,
            status: false,
          });
        }
      } else {
        const userRecord = await Utilities.$DB.findOne($DB, 'users', { $and: [{ username }, { password }] });

        if (!userRecord?.isLoggedIn) return next();
        else {
          const code = 409;
          return response.status(code).json({
            message: 'This user is already logged in his account',
            code,
            status: false,
          });
        }
      }
    } catch (error) {
      const code = 500;
      return response.status(code).json({
        message: 'An error occured',
        code,
        status: false,
        data: { name: error.name, message: error.message },
      });
    }
  }
}

module.exports = AuthenticationMiddleware;
