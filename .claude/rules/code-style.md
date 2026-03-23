# 1. Responsive behavior

- Design mobile-first: start at 375px, scale up
- Test layout at 375px, 768px, 1024px, 1440px breakpoints
- Touch targets minimum 44×44px
- Hero section must be fully visible above the fold on mobile without scrolling
- Navigation collapses gracefully on small screens

---

# 2. Code quality standards

- Use CSS custom properties for all colors, spacing, and typography values
- Be mindful of CSS specificity, target elements rather than classes, and use layers where needed
  - never split CSS classes and define them in multiple places
  - use nested CSS selectors but don't nest more than 3 levels deep
- Group and comment CSS by section
- Avoid inline styles unless dynamically set via JS
- Keep JS minimal and unobtrusive; no framework dependency unless specified
- Structure HTML semantically: `<header>`, `<main>`, `<section>`, `<footer>`
- Use BEM or clear class naming conventions for maintainability

---

# 3. Performance and accessibility standards

- Images use `loading="lazy"` (when not above the fold) and have descriptive `alt` attributes
- Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- All interactive elements are keyboard-navigable
- CTA buttons have clear `:focus-visible` styles
- Fonts are loaded efficiently (preconnect, font-display: swap)
- Animations respect `prefers-reduced-motion`
- Headings follow a logical H1 → H2 → H3 hierarchy
- Meta title and description are included if generating a full HTML file