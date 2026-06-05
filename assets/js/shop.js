let _cache = null;

async function loadAll() {
  if (!_cache) _cache = await fetchJSON('/data/products.json');
  return _cache;
}

export async function fetchProducts() {
  return loadAll();
}

export async function fetchProduct(id) {
  const all = await loadAll();
  const p = all.find(p => p.id === Number(id));
  if (!p) throw new Error('Product not found');
  return p;
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
