import Storage from './storage.helpers.js';

class Helpers {
  static get HttpStatusCode() {
    return Object.freeze({
      OK: 200,
      CREATED: 201,
      UPDATED: 202,
      BAD_REQ: 400,
      UNAUTHORISED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      TOO_LARGE_REQ: 413,
      INV_PAYLOAD: 422,
      SERV_ERR: 500,
      UNAVAILABLE: 503,
    });
  }

  static isReqSucceeded(replyCode) {
    if (!replyCode) {
      return false;
    } else if (replyCode >= 200 && replyCode < 400) {
      return true;
    }

    return false;
  }

  static get FooterImagesTypes() {
    return Object.freeze({
      LINKEDIN: 'linkedin',
      INSTA: 'instagram',
      GMAIL: 'email',
    });
  }

  static get Store() {
    return Storage;
  }

  static redirectToHomePage() {
    const username = Helpers.Store.retrieveAnEntryFromStorage('username');
    if (username) window.location.href = `/?request=cp&username=${username}`;
  }
}

export default Helpers;
