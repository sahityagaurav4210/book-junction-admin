let xhr = new XMLHttpRequest();
let formData = new FormData();
let username = new URLSearchParams(window.location.search).get('username');
let container = document.querySelector('.con-container');
let bookData = [];

xhr.open('POST', '/updates', true);

formData.append('username', username);

xhr.responseType = 'json';

xhr.onload = function () {

    let element, item_header, item_body, bookName, bookAuthor, span, bookPrice, pubName;
    let item_content, item_badge, category, item_notify;
    let update;

    for (let i = 0; i < xhr.response.length; i++) {

        element = document.createElement('div');
        item_header = document.createElement('div');
        item_body = document.createElement('div');
        bookName = document.createElement('p');
        bookAuthor = document.createElement('p');
        bookPrice = document.createElement('p');
        span = document.createElement('span');
        pubName = document.createElement('p');
        item_content = document.createElement('div');
        item_badge = document.createElement('div');
        category = document.createElement('p');
        item_notify = document.createElement('div');
        update = document.createElement('a');

        element.classList.add('container');
        element.classList.add('align');
        element.classList.add('align-ver');

        item_header.classList.add('item-header');
        item_header.classList.add('align-sec');

        item_notify.classList.add('item-notify');
        item_notify.classList.add('align-sec');

        update.setAttribute('onclick', "load('" + xhr.response[i].bookName + "')");

        update.innerText = "Go to action centre";

        item_notify.appendChild(update);

        item_content.classList.add('item-content');
        item_content.classList.add('align');

        item_badge.classList.add('item-badge');
        item_badge.classList.add('align');

        item_body.classList.add('item-body');
        item_body.classList.add('align');
        item_body.classList.add('align-ver');

        span.innerText = "By : ";

        bookAuthor.appendChild(span);

        bookName.innerText = xhr.response[i].bookName;
        category.innerText = xhr.response[i].category;
        bookAuthor.innerHTML += xhr.response[i].bookAuthor;

        span.innerText = "Price : ";

        bookPrice.appendChild(span);

        bookPrice.innerHTML += xhr.response[i].price + ' INR';

        span.innerText = "Publisher Name : ";

        pubName.appendChild(span);

        pubName.innerHTML += xhr.response[i].pubName;

        item_content.append(bookName);
        item_badge.append(category);

        item_header.appendChild(item_content);
        item_header.appendChild(item_badge);
        item_body.append(bookAuthor);
        item_body.appendChild(bookPrice);
        item_body.appendChild(pubName);

        element.appendChild(item_header);
        element.appendChild(item_body);
        element.appendChild(item_notify);

        container.appendChild(element);
        bookData.push(xhr.response[i]);

    }

}

xhr.send(formData);


function load(data) {

    let found = false;
    let index = 0;

    for (let i = 0; i < bookData.length; i++) {

        if (bookData[i].bookName == data) {

            found = true;
            index = i;
            break;

        }
        else {
            found = false;
        }

    }

    if (found) {
        sessionStorage.setItem('bookData', JSON.stringify(bookData[index]));
        window.open('/view','_blank');
    }

}