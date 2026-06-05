---
name: project-hero-original
description: Original hero CSS values before June 2026 redesign — use these to revert if the new design doesn't feel right
metadata:
  type: project
---

Original hero section values in assets/css/styles.css (as of 2026-06-05, before redesign):

```css
.hero {
    position: relative;
    min-height: 480px;
    background: url("/assets/images/hero.png") center / cover no-repeat;
}

.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(75, 63, 75, 0.55);
}

.hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 5vw;
    gap: 1.25rem;
    max-width: 750px;
}

.hero-heading {
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 700;
    color: #fafafa;
    line-height: 1.15;
    margin: 0;
}

.hero-heading em {
    font-style: italic;
    color: var(--dusty-pink);
}

.hero-sub {
    font-size: 0.95rem;
    color: var(--powder-pink);  /* NOTE: var was undefined — fell back to inherited color */
    max-width: 43ch;
    line-height: 1.7;
}

.btn-hero {
    display: inline-block;
    padding: 0.75rem 1.75rem;
    background: var(--dusty-pink);
    color: #fafafa;
    text-decoration: none;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    font-weight: 600;
    width: fit-content;
    transition: background 0.15s;
}

.btn-hero:hover {
    background: var(--dusty-pink-hover);
}
```

**Why:** User wanted to try hero improvements (taller, lighter overlay, centered content, bigger heading, outlined button) but wanted a safe fallback.

**How to apply:** If the user says the new hero doesn't feel right, replace the above blocks in assets/css/styles.css with these exact values.
