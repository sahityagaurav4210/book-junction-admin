import NotifyType from '../helpers/notification_type.helpers.js';
import Utilities from '../utils/index.js';

let username = new URLSearchParams(window?.location?.search).get('username');
const logoutBtn = document.getElementById('logout');

async function logoutHandler(event) {
  if (event.ctrlKey)
    if (event.altKey)
      if (event.key === 'l') {
        try {
          const url = '/auth/logout';
          await Utilities.logout(url, username);
        } catch (error) {
          Utilities.showNotification(NotifyType.DANGER, error.message);
        }
      }
}

window.addEventListener('keydown', logoutHandler);

window.addEventListener('beforeunload', function () {
  window.removeEventListener('keydown', logoutHandler);
  logoutBtn.children[1].innerHTML = 'Log out';
  logoutBtn.children[1].disabled = false;
});

logoutBtn.addEventListener('click', async function () {
  logoutBtn.children[1].innerHTML = 'Logging out';
  logoutBtn.children[1].disabled = true;

  const url = '/auth/logout';
  await Utilities.logout(url, username);
});

(async () => {
  await Utilities.authenticateUser(username);
})();
