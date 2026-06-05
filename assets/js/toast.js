export function showToast(message, duration = 3000) {
  document.getElementById('luna-toast')?.remove();

  const toast = document.createElement('div');
  toast.id = 'luna-toast';
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-check" aria-hidden="true"></i>
    ${message}
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}
