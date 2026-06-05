import { fetchProducts } from './shop.js';
import { updateBadge } from './cart.js';
import { updateBadge as updateWishlistBadge } from './wishlist.js';
updateBadge();
updateWishlistBadge();

// Inject overlay into DOM
document.body.insertAdjacentHTML('beforeend', `
  <div id="search-overlay" class="search-overlay" hidden aria-modal="true" role="dialog" aria-label="Sök">
    <div class="search-box">
      <div class="search-input-wrap">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input id="search-input" type="search" placeholder="Sök produkter..." autocomplete="off" spellcheck="false">
      </div>
      <button type="button" id="search-close" aria-label="Stäng sökning">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <div id="search-results" class="search-results"></div>
  </div>
`);

const overlay  = document.getElementById('search-overlay');
const input    = document.getElementById('search-input');
const results  = document.getElementById('search-results');
const closeBtn = document.getElementById('search-close');

let allProducts = null;

async function getProducts() {
  if (!allProducts) allProducts = await fetchProducts();
  return allProducts;
}

function renderResults(query) {
  if (!query.trim()) {
    results.innerHTML = '';
    return;
  }
  const q = query.toLowerCase();
  const matches = allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.category && p.category.toLowerCase().includes(q))
  ).slice(0, 8);

  if (!matches.length) {
    results.innerHTML = `<p class="search-empty">Inga produkter hittades för "<strong>${query}</strong>".</p>`;
    return;
  }

  results.innerHTML = matches.map(p => `
    <a class="search-result-item" href="product.html?id=${p.id}">
      <div class="search-result-img">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="search-result-info">
        <span class="search-result-category">${p.category ?? ''}</span>
        <span class="search-result-name">${p.name}</span>
        <span class="search-result-price">${p.price.toFixed(2)} kr</span>
      </div>
    </a>
  `).join('');
}

let searchTrigger = null;

async function openSearch(trigger) {
  searchTrigger = trigger ?? null;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  await getProducts();
  input.focus();
}

function closeSearch() {
  overlay.hidden = true;
  document.body.style.overflow = '';
  input.value = '';
  results.innerHTML = '';
  searchTrigger?.focus();
}

// Open on search button click
document.querySelector('.nav-icons button[aria-label="Sök"]')
  ?.addEventListener('click', function() { openSearch(this); });

// Close on button / backdrop click
closeBtn.addEventListener('click', closeSearch);
overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

// Live filter
input.addEventListener('input', () => renderResults(input.value));
