import API from '../api/index.js';
import NotifyType from '../helpers/notification_type.helpers.js';
import Utilities from '../utils/index.js';

let dialogs = document.querySelectorAll('dialog');
let buttons = document.querySelectorAll('button');
let bookName = document.getElementById('bookName');
let bookAuthor = document.getElementById('authorName');
let pubYear = document.getElementById('pubYear');
let pubName = document.getElementById('pubName');
let edition = document.getElementById('edition');
let price = document.getElementById('price');
let message = document.getElementById('message');
let form = document.querySelectorAll('form');
let category = document.getElementById('category');
let phone = document.getElementById('phone');
let image = document.getElementById('image');
let data = document.getElementById('data');
let deletionMsg = document.getElementById('deletionMsg');
let unauthorizedAccessDetected = false;
let username = new URLSearchParams(window?.location?.search).get('username');

dialogs[0].style.display = 'none';
dialogs[1].style.display = 'none';
buttons[0].disabled = true;
dialogs[2].style.display = 'none';
dialogs[3].style.display = 'none';

for (let i = 0; i < buttons.length; i++) {
  buttons[i].disabled = true;
}

async function isLoggedIn() {
  try {
    if (username) {
      await API.makePOSTRequest('/auth/check', { username });
      unauthorizedAccessDetected = false;
    } else {
      unauthorizedAccessDetected = true;
    }
  } catch (error) {
    unauthorizedAccessDetected = true;
  }
}

(async () => {
  await isLoggedIn();
  if (unauthorizedAccessDetected) {
    window.location.href = 'http://localhost:3000';
  }
})();

window.addEventListener('keydown', async function (event) {
  if (event.ctrlKey)
    if (event.altKey)
      if (event.key === 'l') {
        try {
          const url = '/auth/logout';
          const payload = { username };

          await API.makePOSTRequest(url, payload);
          window.location.href = 'http://localhost:3000';
        } catch (error) {
          Utilities.showNotification(NotifyType.DANGER, error.message);
        }
      }
});

buttons[6].addEventListener('click', function () {
  dialogs[0].style.display = 'flex';
  dialogs[0].showModal();
});

buttons[2].addEventListener('click', function () {
  dialogs[0].style.display = 'none';
  dialogs[0].close();
});

buttons[7].addEventListener('click', function () {
  dialogs[2].style.display = 'flex';
  dialogs[2].showModal();
});

buttons[5].addEventListener('click', function () {
  dialogs[2].style.display = 'none';
  dialogs[2].close();
});

image.addEventListener('change', function () {
  if (image.files.length == 2) {
    let formData = new FormData();

    formData.append('bookPicFront', image.files[0]);
    formData.append('bookPicRear', image.files[1]);

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/upload', true);

    xhr.onload = function () {
      if (xhr.responseText == 'ok') {
        message.style.display = 'flex';
        message.innerText = 'Image Uploaded';
        message.show();

        image.disabled = true;
        buttons[0].disabled = false;

        setTimeout(() => {
          message.innerText = '';
          message.close();
          message.style.display = 'none';
        }, 2000);
      } else if (xhr.responseText == 'file exists') {
        message.style.display = 'flex';
        message.innerText = 'This image is already uploaded, please change the image.';
        message.show();

        setTimeout(() => {
          message.style.display = 'none';
          message.innerText = '';
          message.close();
        }, 2000);
      } else {
        message.style.display = 'flex';
        message.innerText = 'An error occured...';
        message.show();

        setTimeout(() => {
          message.style.display = 'none';
          message.innerText = '';
          message.close();
        }, 2000);
      }
    };

    xhr.send(formData);
  } else {
    alert('Only two images are allowed..');
  }
});

form[0].addEventListener('submit', function (e) {
  e.preventDefault();
  buttons[0].disabled = true;

  let now = new Date();
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  console.log(now);

  let formData = {
    bookName: bookName.value,
    bookAuthor: bookAuthor.value,
    pubName: pubName.value,
    pubYear: pubYear.value,
    edition: edition.value,
    price: price.value,
    category: category.value,
    phone: phone.value,
    sold: false,
    addedBy: username,
    addedOn:
      now.getDate() +
      ' - ' +
      (now.getMonth() + 1) +
      ' - ' +
      now.getFullYear() +
      ' ' +
      now.getHours() +
      ' - ' +
      now.getMinutes() +
      ' - ' +
      now.getSeconds(),
  };

  message.style.display = 'flex';
  message.innerText = "We're adding up the book details, please wait...";
  message.show();

  xhr.onload = function () {
    buttons[0].disabled = false;

    if (xhr.responseText == 'ok') {
      image.disabled = false;
      message.innerText = 'Book Added Successfully!!!';
    } else if (xhr.responseText == 'Invalid data') {
      message.innerText = 'Please provide the details in proper format...';
    } else {
      message.innerText = 'An error occured, please try again...';
    }

    setTimeout(() => {
      message.innerText = '';
      message.close();
    }, 2000);
  };

  xhr.send(JSON.stringify(formData));
});

form[1].addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    confirm(
      'This will delete all of your books whose name contains ' +
        data.value +
        ' in it. Are you sure that you want to delete all of those books?'
    )
  ) {
    buttons[3].disabled = true;

    let formData = {
      booktoDelete: data.value,
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/delete', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    deletionMsg.innerText = "We're deleting the book of yours, please wait...";
    deletionMsg.style.display = 'flex';

    xhr.onload = function () {
      buttons[3].disabled = false;

      if (xhr.responseText == 'deleted') {
        deletionMsg.innerText = 'Your book has been deleted...';

        setTimeout(() => {
          deletionMsg.innerText = '';
          deletionMsg.style.display = 'none';
        }, 2000);
      } else if (xhr.responseText == 'invalid data') {
        deletionMsg.innerText = 'Please enter the data in a valid format...';

        setTimeout(() => {
          deletionMsg.innerText = '';
          deletionMsg.style.display = 'none';
        }, 2000);
      } else if (xhr.responseText == "book doesn't exists") {
        deletionMsg.innerText =
          'This book does not exists in our database, please check the spellings of your book name and try again...';

        setTimeout(() => {
          deletionMsg.innerText = '';
          deletionMsg.style.display = 'none';
        }, 2000);
      } else {
        deletionMsg.innerText = 'An error occured...';

        setTimeout(() => {
          deletionMsg.innerText = '';
          deletionMsg.style.display = 'none';
        }, 2000);
      }
    };

    xhr.send(JSON.stringify(formData));
  }
});

buttons[8].addEventListener('click', function () {
  window.open('/updates?username=' + username, '_blank');
});
