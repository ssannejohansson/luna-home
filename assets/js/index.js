import { fetchProducts } from './shop.js';

document.getElementById('category-cards').innerHTML = '<div class="spinner"></div>';
document.getElementById('grid').innerHTML = '<div class="spinner"></div>';

const products = await fetchProducts();

// Category cards — one representative image per category
const seen = new Set();
const categories = products.filter(p => p.category && !seen.has(p.category) && seen.add(p.category));

document.getElementById('category-cards').innerHTML = categories.map(p => `
  <a class="cat-card" href="/products.html?category=${encodeURIComponent(p.category)}">
    <img src="${p.image}" alt="${p.category}">
    <div class="cat-card-overlay">
      <span>${p.category}</span>
    </div>
  </a>
`).join('');

// Nyheter grid
document.getElementById('grid').innerHTML = products.slice(0, 4).map(p => `
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
