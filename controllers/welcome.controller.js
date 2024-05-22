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
    const { request, username } = req.query;
    const code = Helpers.HttpResponseStatusCode.OK;

    if (request != 'cp') {
      res.status(code).render('login', {
        linkedinUrl: global.$ENV.LINKEDIN_URL,
        instaUrl: global.$ENV.INSTA_URL,
        gmailUrl: global.$ENV.GMAIL_URL,
        linkedin: '/public/images/social_media/linkedin.png',
        insta: '/public/images/social_media/instagram.png',
        gmail: '/public/images/social_media/email.png',
      });
    } else
      res.status(code).render('cp', {
        username,
        linkedinUrl: global.$ENV.LINKEDIN_URL,
        instaUrl: global.$ENV.INSTA_URL,
        gmailUrl: global.$ENV.GMAIL_URL,
        linkedin: '/public/images/social_media/linkedin.png',
        insta: '/public/images/social_media/instagram.png',
        gmail: '/public/images/social_media/email.png',
      });
  }

  static offline(req, res) {
    return res.render('503', {
      heading: 'Service is unavailable right now',
      imageUrl: '/public/images/pages/503.png',
      title: `You're offline`,
      linkedin: global.$ENV.LINKEDIN_URL,
      instagram: global.$ENV.INSTA_URL,
      gmail: global.$ENV.GMAIL_URL,
    });
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

  static error(req, res) {
    const { name, message } = req.query;
    const code = Helpers.HttpResponseStatusCode.OK;
    return res.status(code).render('error', {
      name,
      message,
      linkedin: '/public/images/social_media/linkedin.png',
      insta: '/public/images/social_media/instagram.png',
      gmail: '/public/images/social_media/email.png',
      linkedinUrl: global.$ENV.LINKEDIN_URL,
      instaUrl: global.$ENV.INSTA_URL,
      gmailUrl: global.$ENV.GMAIL_URL,
    });
  }
}

module.exports = WelcomeController;
