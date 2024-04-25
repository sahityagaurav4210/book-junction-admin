let heading = document.getElementById('heading');
let root_content = document.getElementById('content');
let bookName, container, content;
let frontPic, rearPic;
let updateForm, deletionForm;
let updateBtn, deletionBtn;
let price;
let authorName, pubName, pubYear, addedOn, edition, category;

let bookData = JSON.parse(sessionStorage.getItem('bookData'));


bookName = document.createElement('h1');
container = document.createElement('div');
frontPic = document.createElement('img');
rearPic = document.createElement('img');

container.classList.add('container');
container.classList.add('align-sec');

frontPic.setAttribute('src', bookData.bookPicFront);
frontPic.setAttribute('alt', 'Book');

rearPic.setAttribute('src', bookData.bookPicRear);
rearPic.setAttribute('alt', 'Book');

container.appendChild(frontPic);
container.appendChild(rearPic);

bookName.innerText = bookData.bookName;

heading.appendChild(bookName);
heading.appendChild(container);

container = '';
content = '';
container = document.createElement('div');
content = document.createElement('div');
price = document.createElement('h2');

content.classList.add('content');
content.classList.add('align-sec');
container.classList.add('container');
container.classList.add('align');
container.classList.add('align-ver');
container.classList.add('panel');

price.innerText = "INR " + bookData.price;

content.appendChild(price);
container.appendChild(content);

content = '';
content = document.createElement('div');
updateForm = document.createElement('form');
deletionForm = document.createElement('form');
updateBtn = document.createElement('button');
deletionBtn = document.createElement('button');

content.classList.add('content');
content.classList.add('align-sec');

updateForm.setAttribute('action', '');
updateForm.setAttribute('method', 'post');
updateForm.classList.add('align-sec');

deletionForm.setAttribute('action', '');
deletionForm.setAttribute('method', 'post');
deletionForm.classList.add('align-sec');

updateBtn.setAttribute('type', 'submit');
deletionBtn.setAttribute('type', 'submit');

deletionBtn.classList.add('cn-btn');

updateBtn.innerText = "Update";
deletionBtn.innerText = 'Delete';

deletionForm.appendChild(deletionBtn);
updateForm.appendChild(updateBtn);

content.appendChild(updateForm);
content.appendChild(deletionForm);

container.appendChild(content);
root_content.appendChild(container);

container = '';

container = document.createElement('div');
authorName = document.createElement('h2');
pubName = document.createElement('p');
pubYear = document.createElement('p');
edition = document.createElement('p');
category = document.createElement('p');
addedOn = document.createElement('p');

container.classList.add('container');
container.classList.add('align');
container.classList.add('align-ver');

authorName.innerText = "By : " + bookData.bookAuthor;
pubYear.innerText = "Publication Year : " + bookData.pubYear;
pubName.innerText = "Publication Company : " + bookData.pubName;
edition.innerText = "Edition : " + bookData.edition;
category.innerText = "Book of : " + bookData.category;
addedOn.innerText = "Added on : " + bookData.addedOn;

container.appendChild(authorName);
container.appendChild(pubName);
container.appendChild(pubYear);
container.appendChild(edition);
container.appendChild(category);
container.appendChild(addedOn);

root_content.appendChild(container);