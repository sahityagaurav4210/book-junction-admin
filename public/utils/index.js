import NotifyType from '../helpers/notification_type.helpers.js';
import Helpers from '../helpers/index.js';
import API from '../api/index.js';

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
        unauthorizedAccessDetected = true;
      }
    }

    if (unauthorizedAccessDetected) window.location.href = 'http://localhost:3000';
  }

  static async logout(url, username) {
    const payload = { username };

    await API.makePOSTRequest(url, payload);
    Helpers.Store.removeAnEntryFromStorage('username');
    window.location.href = 'http://localhost:3000';
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
        Utilities.showNotification(NotifyType.DANGER, error.message);
      }
    }

    if (isLoggedIn) window.location.href = `/?request=cp&username=${username}`;
  }
}

export default Utilities;
