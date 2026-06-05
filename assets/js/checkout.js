import { fetchProducts } from './shop.js';
import { getCart, removeItem, updateQuantity, clearCart, getTotal, updateBadge } from './cart.js';

updateBadge();

function renderOrderSummary() {
  const cart = getCart();
  document.getElementById('item-count').textContent = cart.length;

  if (!cart.length) {
    document.getElementById('order-items').innerHTML = `
      <li class="cart-empty-msg">
        <p>Din varukorg är tom.</p>
        <a href="/products.html">Fortsätt handla</a>
      </li>`;
    document.getElementById('subtotal').textContent = '0.00 kr';
    document.getElementById('total').textContent = '0.00 kr';
    return;
  }

  document.getElementById('order-items').innerHTML = cart.map(item => `
    <li class="order-item">
      <div class="order-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="order-item-info">
        <span class="order-item-name">${item.name}</span>
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button type="button" class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
        </div>
      </div>
      <span class="order-item-price">${(item.price * item.quantity).toFixed(2)} kr</span>
      <button type="button" class="cart-remove-btn" data-id="${item.id}" aria-label="Ta bort">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </li>
  `).join('');

  const total = getTotal();
  document.getElementById('subtotal').textContent = `${total.toFixed(2)} kr`;
  document.getElementById('total').textContent = `${total.toFixed(2)} kr`;
}

renderOrderSummary();

document.getElementById('order-items').addEventListener('click', e => {
  const removeBtn = e.target.closest('.cart-remove-btn');
  if (removeBtn) {
    removeItem(Number(removeBtn.dataset.id));
    renderOrderSummary();
    return;
  }
  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) {
    updateQuantity(Number(qtyBtn.dataset.id), Number(qtyBtn.dataset.delta));
    renderOrderSummary();
  }
});

// Upsell — products not in cart
const allProducts = await fetchProducts();
const cartIds = new Set(getCart().map(i => i.id));
const upsell = allProducts.filter(p => !cartIds.has(p.id)).slice(0, 4);
document.getElementById('upsell-grid').innerHTML = upsell.map(p => `
  <a class="card" href="/product.html?id=${p.id}">
    <div class="card-img">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="card-body">
      <h2>${p.name}</h2>
      <p class="price">${p.price.toFixed(2)} kr</p>
    </div>
  </a>
`).join('');

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const name = `${data.first_name} ${data.last_name}`.trim();
  clearCart();
  location.href = `/confirm.html?name=${encodeURIComponent(name)}`;
});
