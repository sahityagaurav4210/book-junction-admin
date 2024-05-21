const username = document.currentScript?.getAttribute('data-username');
const cpHeading = document.getElementById('cpHeading');

function openPage(url) {
  if (url) window.open(url, '_blank');
}

function greet() {
  const currentHour = new Date().getHours();
  let greetString = '';
  const properCaseUsername = username[0].toUpperCase() + username.slice(1);

  if (currentHour >= 0 && currentHour < 12) greetString += `Good morning, ${properCaseUsername}`;
  else if (currentHour >= 12 && currentHour < 18) greetString += `Good afternoon, ${properCaseUsername}`;
  else if (currentHour >= 18 && currentHour <= 23) greetString += `Good evening, ${properCaseUsername}`;

  cpHeading.innerText = greetString;
}

username && greet();
