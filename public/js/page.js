function openPage(url) {
  if (url) window.open(url, '_blank');
}

function openHomePage() {
  const username = localStorage.getItem('username') ?? 'test';
  window.location.href = `/?request=cp&username=${username}`;
}
