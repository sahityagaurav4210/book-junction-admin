import Utilities from '../utils/index.js';
import Helpers from '../helpers/index.js';

let login = document.getElementById('login');
let button1 = document.getElementById('button1');
let username = document.getElementById('username');
let password = document.getElementById('password');
const showPwd = document.getElementById('show');
const showCheckBox = document.getElementById('showCheckBox');

login.addEventListener('submit', async function (event) {
  event.preventDefault();

  if (Helpers.isOnline === false) {
    Utilities.showNotification('error', "You're offline");
    return;
  }

  button1.disabled = true;
  button1.innerHTML = 'Please Wait...';

  let formData = {
    username: username.value,
    password: password.value,
  };

  await Utilities.login('/auth/login', formData);
  button1.disabled = false;
  button1.innerHTML = 'Login';
});

window.addEventListener('beforeunload', function () {
  button1.disabled = false;
  button1.innerHTML = 'Submit';
});

showCheckBox.addEventListener('click', function () {
  !showPwd.checked ? (password.type = 'text') : (password.type = 'password');
});

gsap.to('#body', {
  scale: 1,
  duration: 1,
});

Helpers.redirectToHomePage();
