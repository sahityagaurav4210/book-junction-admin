import Utilities from '../utils/index.js';
import Helpers from '../helpers/index.js';

let username = new URLSearchParams(window?.location?.search).get('username');
const logoutBtn = document.getElementById('logout');

async function logoutHandler(event) {
  if (Helpers.isOnline === false) {
    Utilities.showNotification('error', "You're offline");
    return;
  }

  if (event.ctrlKey)
    if (event.altKey)
      if (event.key === 'l') {
        logoutBtn.children[1].innerHTML = 'Logging out';
        logoutBtn.children[1].disabled = true;

        const url = '/auth/logout';
        await Utilities.logout(url, username);

        logoutBtn.children[1].innerHTML = 'Log out';
        logoutBtn.children[1].disabled = false;
      }
}

window.addEventListener('keydown', logoutHandler);

window.addEventListener('beforeunload', function () {
  window.removeEventListener('keydown', logoutHandler);
  logoutBtn.children[1].innerHTML = 'Log out';
  logoutBtn.children[1].disabled = false;
});

logoutBtn.addEventListener('click', async function () {
  if (Helpers.isOnline === false) {
    Utilities.showNotification('error', "You're offline");
    return;
  }

  logoutBtn.children[1].innerHTML = 'Logging out';
  logoutBtn.children[1].disabled = true;

  const url = '/auth/logout';
  await Utilities.logout(url, username);

  logoutBtn.children[1].innerHTML = 'Log out';
  logoutBtn.children[1].disabled = false;
});

(async () => {
  if (Helpers.isOnline === false) {
    Utilities.showNotification('error', "You're offline");
    return;
  }

  await Utilities.authenticateUser(username);
})();
