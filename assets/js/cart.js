const KEY = 'luna-cart';

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY) ?? '[]');
}

export function addItem({ id, name, price, image }) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  save(cart);
}

export function removeItem(id) {
  save(getCart().filter(i => i.id !== id));
}

export function updateQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    save(cart.filter(i => i.id !== id));
  } else {
    save(cart);
  }
}

export function clearCart() {
  localStorage.removeItem(KEY);
  updateBadge();
}

export function getCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function getTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function save(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  updateBadge();
}

export function updateBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}
