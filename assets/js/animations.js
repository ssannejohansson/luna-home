const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.section-wrap, .trust-badges, .value-card, .number-item, .about-story-text, .about-story-img, .cat-card, .contact-form-col, .contact-info-col, .service-promise-inner, .confirm-card, .not-found-inner'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
