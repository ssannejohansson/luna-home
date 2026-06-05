# LUNA HOME

A static e-commerce webshop for home décor and lifestyle products. Built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage — hero, trust badges, category cards, featured products, newsletter |
| `products.html` | Full product listing with category filters and sort |
| `product.html` | Single product page with image, details, add to cart / save to list |
| `checkout.html` | Checkout form with order summary |
| `confirm.html` | Order confirmation |
| `wishlist.html` | Saved products list |
| `about.html` | Brand story and values |
| `contact.html` | Contact form and info |
| `404.html` | Not found page |

## Project structure

```
sample-webshop/
├── assets/
│   ├── css/
│   │   └── styles.css        # All styles
│   ├── images/               # Product and hero images
│   └── js/
│       ├── shop.js           # Fetches product data
│       ├── cart.js           # Cart state (localStorage)
│       ├── wishlist.js       # Wishlist state (localStorage)
│       ├── search.js         # Search overlay
│       ├── nav.js            # Mobile hamburger menu
│       ├── animations.js     # Scroll fade-in animations
│       ├── toast.js          # Toast notifications
│       ├── index.js          # Homepage rendering
│       ├── products.js       # Products page rendering
│       ├── product.js        # Product page rendering
│       ├── checkout.js       # Checkout rendering
│       ├── wishlist-page.js  # Wishlist page rendering
│       └── confirm.js        # Order confirmation
├── data/
│   └── products.json         # Product catalogue
└── *.html
```

## Running locally

No install needed. Serve from the project root with any static server, for example:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

> Opening HTML files directly via `file://` won't work — the JS modules use fetch to load `products.json`, which requires an HTTP server.

## Tech

- **HTML5** — semantic landmarks, ARIA attributes, WCAG AA contrast
- **CSS** — custom properties, CSS Grid, Flexbox, scroll snap
- **JavaScript** — ES modules, no dependencies
- **Font Awesome 6** — all icons
- **Bodoni Moda** — Google Fonts
- **Data** — `products.json` acts as a lightweight mock API
