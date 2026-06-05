import { fetchProducts } from './shop.js';

document.getElementById('grid').innerHTML = '<div class="spinner"></div>';

const all = await fetchProducts();

const urlCategory = new URLSearchParams(location.search).get('category');
const validCategories = [...new Set(all.map(p => p.category).filter(Boolean))];
let active = validCategories.includes(urlCategory) ? urlCategory : 'Alla';
let sortOrder = 'default';

const categories = ['Alla', ...validCategories];

function getSorted(products) {
  const arr = [...products];
  if (sortOrder === 'price-asc')  arr.sort((a, b) => a.price - b.price);
  if (sortOrder === 'price-desc') arr.sort((a, b) => b.price - a.price);
  if (sortOrder === 'name-asc')   arr.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
  return arr;
}

function renderButtons() {
  document.getElementById('category-filters').innerHTML = categories.map(c => `
    <button type="button" class="filter-btn${c === active ? ' filter-btn-active' : ''}" data-category="${c}">${c}</button>
  `).join('');
}

function render() {
  const filtered = active === 'Alla' ? all : all.filter(p => p.category === active);
  const sorted = getSorted(filtered);
  document.getElementById('product-count').textContent = `${sorted.length} produkter`;
  document.getElementById('grid').innerHTML = sorted.map(p => `
    <a class="card" href="product.html?id=${p.id}">
      <div class="card-img">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="card-body">
        <h2>${p.name}</h2>
        <p class="price">${p.price.toFixed(2)} kr</p>
      </div>
    </a>
  `).join('');
}

renderButtons();
render();

document.getElementById('category-filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  active = btn.dataset.category;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('filter-btn-active', b === btn));
  render();
});

document.getElementById('sort-select').addEventListener('change', e => {
  sortOrder = e.target.value;
  render();
});
