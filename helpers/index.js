class Helpers {
  static get HttpResponseStatusCode() {
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
}

module.exports = Helpers;
