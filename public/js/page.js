function openPage(url) {
  if (window.internet === false) return;
  if (url) window.open(url, '_blank');
}

function openHomePage() {
  if (window.internet === false) return;
  const username = localStorage.getItem('username') ?? 'test';
  window.location.href = `/?request=cp&username=${username}`;
}
