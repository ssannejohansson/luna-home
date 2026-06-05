const KEY = 'luna-wishlist';

export function getWishlist() {
  return JSON.parse(localStorage.getItem(KEY) ?? '[]');
}

export function toggleItem({ id, name, price, image }) {
  const list = getWishlist();
  const idx = list.findIndex(i => i.id === id);
  if (idx !== -1) {
    list.splice(idx, 1);
    save(list);
    return false;
  } else {
    list.push({ id, name, price, image });
    save(list);
    return true;
  }
}

export function isInWishlist(id) {
  return getWishlist().some(i => i.id === id);
}

export function getCount() {
  return getWishlist().length;
}

function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  updateBadge();
}

export function updateBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (!badge) return;
  const count = getCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}
