import Utilities from '../utils/index.js';
import Helpers from '../helpers/index.js';

let button1 = document.getElementById('button1');
let username = document.getElementById('username');
let password = document.getElementById('password');

button1.addEventListener('click', async function () {
  button1.disabled = true;
  button1.innerHTML = 'Please Wait...';

  let formData = {
    username: username.value,
    password: password.value,
  };

  await Utilities.login('/auth/login', formData);
  button1.disabled = false;
  button1.innerHTML = 'Submit';
});

window.addEventListener('beforeunload', function () {
  button1.disabled = false;
  button1.innerHTML = 'Submit';
});

Helpers.redirectToHomePage();
