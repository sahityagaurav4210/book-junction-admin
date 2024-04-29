import Helpers from '../helpers/index.js';

const homeButton = document.getElementById('home');
const footerImages = document.querySelectorAll('#footer img');

homeButton.addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = '/?request=cp&username=admin';
});

for (let index = 0; index < footerImages.length; index++) {
  footerImages[index].addEventListener('click', function (event) {
    event.preventDefault();

    switch (footerImages[index].attributes.getNamedItem('alt').nodeValue) {
      case Helpers.FooterImagesTypes.LINKEDIN:
        window.open('https://www.linkedin.com/in/sahityagaurav4210', '_blank');
        break;
      case Helpers.FooterImagesTypes.INSTA:
        window.open('https://www.instagram.com/gaurav.sahitya/', '_blank');
        break;
      case Helpers.FooterImagesTypes.GMAIL:
        window.open(`mailto:dev.ac.9879@gmail.com?subject=Message from admin`, '_blank');
        break;

      default:
        alert('Invalid footer icon');
        break;
    }
  });
}
