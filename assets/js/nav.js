const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', open);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.site-nav')) {
    navLinks?.classList.remove('nav-open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});
