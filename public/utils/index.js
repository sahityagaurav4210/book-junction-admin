import NotifyType from '../helpers/notification_type.helpers.js';
import Helpers from '../helpers/index.js';
import API from '../api/index.js';
import FailedResponseException from '../exceptions/FailedResponseException.js';

class Utilities {
  static showNotification(notificationType = NotifyType.SUCCESS, message = '') {
    const notify = new Notyf();
    notify[notificationType]({
      duration: 1500,
      dismissible: true,
      message: message,
      position: { x: 'right', y: 'top' },
    });
  }

  static async authenticateUser(username) {
    let unauthorizedAccessDetected = false;

    if (!Helpers.Store.retrieveAnEntryFromStorage('username')) {
      try {
        if (username) {
          await API.makePOSTRequest('/auth/check', { username });
          unauthorizedAccessDetected = false;
          Helpers.Store.createAnEntryInStorage('username', username);
        } else {
          unauthorizedAccessDetected = true;
        }
      } catch (error) {
        if (error instanceof FailedResponseException) {
          const { code, message } = error.data;

          if (code !== Helpers.HttpStatusCode.SERV_ERR) {
            Utilities.showNotification(NotifyType.DANGER, message);
            unauthorizedAccessDetected = true;
          } else window.location.href = `/error?name=FailedResponseException&message=${message}`;
        } else {
          const { message } = error;
          const name = 'An error occured';
          window.location.href = `/error?name=${name}&message=${message}`;
        }
      }
    }

    if (unauthorizedAccessDetected) window.location.href = 'http://localhost:3000';
  }

  static async logout(url, username) {
    try {
      const payload = { username };

      await API.makePOSTRequest(url, payload);
      Helpers.Store.removeAnEntryFromStorage('username');
      window.location.href = 'http://localhost:3000';
    } catch (error) {
      if (error instanceof FailedResponseException) {
        const { code, message } = error.data;

        if (code !== Helpers.HttpStatusCode.SERV_ERR) Utilities.showNotification(NotifyType.DANGER, message);
        else window.location.href = `/error?name=FailedResponseException&message=${message}`;
      } else {
        const { message } = error;
        const name = 'An error occured';
        window.location.href = `/error?name=${name}&message=${message}`;
      }
    }
  }

  static async login(url, payload) {
    const { username, password } = payload;
    let isLoggedIn = false;

    if (!username || !password) isLoggedIn = false;
    else {
      try {
        await API.makePOSTRequest(url, payload);
        isLoggedIn = true;
      } catch (error) {
        isLoggedIn = false;

        if (error instanceof FailedResponseException) {
          const { code, message } = error.data;

          if (code !== Helpers.HttpStatusCode.SERV_ERR) Utilities.showNotification(NotifyType.DANGER, message);
          else window.location.href = `/error?name=FailedResponseException&message=${message}`;
        } else {
          const { message } = error;
          const name = 'An error occured';
          window.location.href = `/error?name=${name}&message=${message}`;
        }
      }
    }

    if (isLoggedIn) window.location.href = `/?request=cp&username=${username}`;
  }
}

export default Utilities;
