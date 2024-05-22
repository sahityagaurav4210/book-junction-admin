import Utilities from '../utils/index.js';

function handleOfflineEvent() {
  let internet = false;
  Utilities.showNotification('error', "You're offline");
  window.internet = internet;
}

function handleOnlineEvent() {
  let internet = true;
  Utilities.showNotification('success', "You're back online.");
  window.internet = internet;
}

window.addEventListener('offline', handleOfflineEvent);
window.addEventListener('online', handleOnlineEvent);
