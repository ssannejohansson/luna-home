import { getWishlist, toggleItem, updateBadge } from './wishlist.js';
import { addItem, updateBadge as updateCartBadge } from './cart.js';
import { showToast } from './toast.js';

updateBadge();
updateCartBadge();

function render() {
  const list = getWishlist();
  const container = document.getElementById('wishlist-content');

  if (!list.length) {
    container.innerHTML = `
      <ul class="order-items">
        <li class="cart-empty-msg">
          <p>Din lista är tom.</p>
          <a href="/products.html">Utforska produkter</a>
        </li>
      </ul>`;
    return;
  }

  container.innerHTML = `
    <ul class="order-items wishlist-items" id="wishlist-items">
      ${list.map(item => `
        <li class="order-item wishlist-item" data-id="${item.id}">
          <a class="order-item-img wishlist-item-img" href="/product.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}">
          </a>
          <div class="order-item-info">
            <a class="order-item-name" href="/product.html?id=${item.id}">${item.name}</a>
            <span class="order-item-price">${item.price.toFixed(2)} kr</span>
          </div>
          <button type="button" class="btn-cart wishlist-add-btn" data-id="${item.id}">
            LÄGG I VARUKORG
          </button>
          <button type="button" class="cart-remove-btn" data-id="${item.id}" aria-label="Ta bort från lista">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </li>
      `).join('')}
    </ul>`;
}

render();

document.getElementById('wishlist-content').addEventListener('click', e => {
  const removeBtn = e.target.closest('.cart-remove-btn');
  if (removeBtn) {
    const id = Number(removeBtn.dataset.id);
    const item = getWishlist().find(i => i.id === id);
    toggleItem(item);
    render();
    if (item) showToast(`${item.name} borttagen från listan`);
    return;
  }

  const addBtn = e.target.closest('.wishlist-add-btn');
  if (addBtn) {
    const id = Number(addBtn.dataset.id);
    const item = getWishlist().find(i => i.id === id);
    if (item) {
      addItem(item);
      addBtn.textContent = 'TILLAGD ✓';
      addBtn.disabled = true;
      addBtn.style.background = 'var(--light-plum)';
      showToast(`${item.name} tillagd i varukorgen`);
    }
  }
});
