import FailedResponseException from '../exceptions/FailedResponseException.js';
import Helpers from '../helpers/index.js';

class API {
  static async makePOSTRequest(url = '', payload = {}) {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      if (!url) return reject('Please provide a valid url');

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.onload = function () {
        const reply = xhr.response;
        const jsonReply = JSON.parse(reply);
        if (Helpers.isReqSucceeded(xhr.status)) {
          return resolve(jsonReply);
        } else {
          return reject(new FailedResponseException('Api returned unsuccessful response', jsonReply));
        }
      };

      xhr.send(JSON.stringify(payload));
    });
  }
}

export default API;
