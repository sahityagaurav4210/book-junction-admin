function openPage(url) {
  if (url) window.open(url, '_blank');
}

function openHomePage() {
  window.location.href = `/?request=cp&username=admin`;
}
