# Frontend design — CLAUDE.md

## Mandatory skill

Before writing any code or making design decisions, always read and follow the skill file at:

```
/mnt/skills/public/frontend-design/SKILL.md
```

This skill defines the design thinking process, aesthetic guidelines, and code quality standards that must be applied to every frontend task.

---

## Environment setup

This workflow is for **plain HTML/CSS/JS with Vite** — no frameworks, but npm packages are available via the build step.

**Starting a new project**
```bash
npm create vite@latest . -- --template vanilla
npm install
npm run dev
```
Default dev URL: `http://localhost:5173`

**Adding to an existing project**
```bash
npm init -y
npm install --save-dev vite
```
Add to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```
Then run `npm run dev`.

**Installing dependencies**
```bash
npm install gsap        # example: animation library
npm install swiper      # example: slider
```
Import in JS using ES modules — do not use CDN links:
```js
import gsap from 'gsap'
import Swiper from 'swiper'
```

Brand assets (logo, fonts, images, brand guide) are always located in the `brand_assets/` folder. Always check this folder before making assumptions about colours, typography, or imagery.

The Tech Stack is always HTML/CSS/JS.

---

## Landing page workflow

### 1. Clarify before building

Before starting, confirm:
- What is the primary conversion goal? (sign-up, purchase, waitlist, contact)
- Who is the target audience?
- Are there brand assets, colors, or fonts to use? Check the `brand_assets/` folder first — brand files are always stored there.
- Is there existing copy, or does it need to be generated?
- Which language should the copy be in?

---

### 2. Define the page structure

Plan the section order before coding:

| Section | Purpose |
|---|---|
| Hero | Hook — state the value proposition immediately |
| Social proof | Trust signals — logos, testimonials, review counts |
| Features / benefits | Show what it does and why it matters |
| How it works | Reduce friction — simple steps or visual walkthrough |
| Pricing (if applicable) | Clear tiers, highlight recommended option |
| FAQ | Handle objections without a sales call |
| Final CTA | Close — repeat the primary action |

---

### 3. Apply the frontend-design skill

Follow the skill's design thinking steps:

- **Purpose**: Define the problem this page solves and who it's for
- **Tone**: Commit to a clear aesthetic direction — do not default to generic
- **Differentiation**: Identify the one memorable design choice
- **Typography**: Choose distinctive, contextually appropriate font pairs
- **Color**: Pick a dominant palette with sharp accents using CSS variables
- **Motion**: Plan one well-orchestrated page load with staggered reveals; add scroll-triggered and hover states
- **Layout**: Use asymmetry, overlap, or diagonal flow to break predictable grids

---

### 4. Copywriting principles for landing pages

- Lead with the outcome, not the feature ("Get more clients" not "CRM software")
- Use the word "you" more than "we"
- Keep headlines under 10 words
- Subheadlines should expand on — not repeat — the headline
- CTA button text should describe the action ("Start free trial", not "Submit")
- Use numbers and specifics wherever possible ("3 steps", "saves 2 hours/week")

---

### 5. Performance and accessibility checklist

- [ ] Images use `loading="lazy"` (when not above the fold) and have descriptive `alt` attributes
- [ ] Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] All interactive elements are keyboard-navigable
- [ ] CTA buttons have clear `:focus-visible` styles
- [ ] Fonts are loaded efficiently (preconnect, font-display: swap)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Headings follow a logical H1 → H2 → H3 hierarchy
- [ ] Meta title and description are included if generating a full HTML file

---

### 6. Responsive behavior

- Design mobile-first: start at 375px, scale up
- Test layout at 375px, 768px, 1024px, 1440px breakpoints
- Touch targets minimum 44×44px
- Hero section must be fully visible above the fold on mobile without scrolling
- Navigation collapses gracefully on small screens

---

### 7. Code quality standards

- Use CSS custom properties for all colors, spacing, and typography values
- Be mindful of CSS specificity and use layers where needed
- Group and comment CSS by section
- Avoid inline styles unless dynamically set via JS
- Keep JS minimal and unobtrusive; no framework dependency unless specified
- Structure HTML semantically: `<header>`, `<main>`, `<section>`, `<footer>`
- Use BEM or clear class naming conventions for maintainability

---

### 8. Deliverable checklist

Before presenting the output:

- [ ] Skill file has been read and applied
- [ ] Design direction is intentional and non-generic
- [ ] All planned sections are present
- [ ] Copy is outcome-focused
- [ ] Responsive behavior is implemented
- [ ] Accessibility basics are covered
- [ ] Code is clean and well-structured
- [ ] Animations respect reduced-motion preference

---

### 9. Delivery automation

Run these commands after the build is complete.

**Build for production**
```bash
npm run build
```
Vite outputs minified HTML, CSS, and JS to `dist/` automatically. No separate minification step needed.

**Preview the production build**
```bash
npm run preview
```
Default preview URL: `http://localhost:4173`

**Accessibility audit** (run against the preview server)
```bash
npx pa11y http://localhost:4173 --standard WCAG2AA
```

**Performance, SEO & best practices (Lighthouse)**
```bash
npx lighthouse http://localhost:4173 --output html --output-path ./lighthouse-report.html --chrome-flags="--headless"
```

**Screenshots for feedback**
```bash
mkdir -p screenshots
npx capture-website-cli http://localhost:4173 --output screenshots/desktop.png --width 1440 --height 900 --full-page
npx capture-website-cli http://localhost:4173 --output screenshots/tablet.png --width 768 --height 1024 --full-page
npx capture-website-cli http://localhost:4173 --output screenshots/mobile.png --width 375 --height 812 --full-page
```

**Package for handoff**
```bash
zip -r delivery.zip dist/ screenshots/
```

> If pa11y or Lighthouse flag issues, fix them before packaging. Do not deliver with known WCAG AA violations.