import { clearCart } from './cart.js';

clearCart();

const name = decodeURIComponent(new URLSearchParams(location.search).get('name') ?? '');
document.getElementById('heading').textContent = `Tack, ${name}!`;
document.getElementById('order-no').textContent =
  `LUNA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
