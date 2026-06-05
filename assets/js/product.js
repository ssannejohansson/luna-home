import { fetchProducts, fetchProduct } from './shop.js';
import { addItem, updateBadge } from './cart.js';
import { toggleItem, isInWishlist, updateBadge as updateWishlistBadge } from './wishlist.js';
import { showToast } from './toast.js';

document.getElementById('product-info').innerHTML = '<div class="spinner"></div>';
document.getElementById('related-grid').innerHTML = '<div class="spinner"></div>';

updateBadge();
updateWishlistBadge();

const id = new URLSearchParams(location.search).get('id');
const p  = await fetchProduct(id);

document.title = `${p.name} — LUNA`;
document.getElementById('breadcrumb-name').textContent = p.name;

const img = document.getElementById('main-img');
img.src = p.image;
img.alt = p.name;

const saved = isInWishlist(p.id);

document.getElementById('product-info').innerHTML = `
  <p class="product-category">${p.category ?? 'Hem &amp; Inredning'}</p>
  <h1 class="product-name">${p.name}</h1>
  <p class="product-price-display">${p.price.toFixed(2)} kr</p>

  <div class="product-stars">
    <span class="stars">★★★★★</span>
    <span class="star-label">4.8 · 12 omdömen</span>
  </div>

  <p class="product-desc">${p.description}</p>

  <div class="product-actions">
    <button type="button" class="btn-cart" id="add-to-cart">LÄGG I VARUKORG</button>
    <a class="btn-wishlist btn-go-cart" href="/checkout.html" id="go-to-cart" hidden>
      <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
      GÅ TILL KASSAN
    </a>
    <button type="button" class="btn-wishlist" id="save-to-list" data-saved="${saved}">
      <i class="${saved ? 'fa-solid' : 'fa-regular'} fa-heart" aria-hidden="true"></i>
      ${saved ? 'Sparad' : 'Spara till lista'}
    </button>
  </div>

  <div class="product-shipping">
    <div class="shipping-row">
      <i class="fa-solid fa-truck" aria-hidden="true"></i>
      <div>
        <strong>Snabb frakt</strong>
        <span>Leverans 1–3 vardagar</span>
      </div>
    </div>
    <div class="shipping-row">
      <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
      <div>
        <strong>Fri retur</strong>
        <span>30 dagars returrätt</span>
      </div>
    </div>
  </div>
`;

document.getElementById('add-to-cart').addEventListener('click', () => {
  addItem(p);
  const btn = document.getElementById('add-to-cart');
  btn.textContent = 'TILLAGD ✓';
  btn.disabled = true;
  btn.style.background = 'var(--light-plum)';
  document.getElementById('go-to-cart').hidden = false;
  showToast(`${p.name} tillagd i varukorgen`);
});

document.getElementById('save-to-list').addEventListener('click', () => {
  const btn = document.getElementById('save-to-list');
  const isNowSaved = toggleItem(p);
  btn.innerHTML = `
    <i class="${isNowSaved ? 'fa-solid' : 'fa-regular'} fa-heart" aria-hidden="true"></i>
    ${isNowSaved ? 'Sparad' : 'Spara till lista'}
  `;
  showToast(isNowSaved ? `${p.name} sparad till listan` : `${p.name} borttagen från listan`);
});

// Related products
const all = await fetchProducts();
const related = all.filter(r => r.id !== p.id).slice(0, 4);
document.getElementById('related-grid').innerHTML = related.map(r => `
  <a class="card" href="/product.html?id=${r.id}">
    <div class="card-img">
      <img src="${r.image}" alt="${r.name}">
    </div>
    <div class="card-body">
      <h2>${r.name}</h2>
      <p class="price">${r.price.toFixed(2)} kr</p>
    </div>
  </a>
`).join('');
