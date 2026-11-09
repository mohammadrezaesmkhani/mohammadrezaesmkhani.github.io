# Reza Esmkhani — Research & Engineering Portfolio

A single-page editorial portfolio built with **Vite + React + TypeScript + Framer Motion**, styled with a hand-written design system (paper / charcoal / electric lime, Swiss grid). It's a fully static site, set up to deploy to **GitHub Pages**.

```
npm install
npm run dev        # local development
npm run typecheck  # TypeScript check
npm run build      # static build → dist/
npm run preview    # serve the production build
```

---

## Updating content — one file

All text, links, projects, publications, experience and skills live in **`src/data/profile.ts`**.

### Contact & social links (placeholders)

```ts
export const contact = {
  email: '',     // 'you@example.com'
  github: '',    // 'https://github.com/<user>'
  scholar: '',   // 'https://scholar.google.com/citations?user=<id>'
  linkedin: '',  // 'https://www.linkedin.com/in/<handle>'
};
```

An empty string shows a calm "To be added" or "forthcoming" label instead of a link, so the site never has broken links.

### Project links

Each project has `links: { github: '', demo: '', paper?: '' }`. Fill these in when the repos or demos are public.

---

## Portrait

1. Save your photo as **`public/images/profile.jpg`** (`.jpeg`, `.webp` and `.png` also work).
2. Rebuild, or restart `npm run dev`.

The build checks for the file automatically (`vite.config.ts` → `__PORTRAIT__`), so you don't need to change any code. Until a photo exists, an editorial monogram plate is shown, and the browser never requests a missing image (so there's no 404 in the console).
Recommended: 4:5 portrait, about 1200 × 1500 px, under 300 KB. The photo is shown in grayscale and warms to colour on hover.

---

## Deploying to GitHub Pages

This folder was not a Git repository when the site was built, so no repository name was assumed.
The site uses a **relative base path (`./`)**, so the same build works for both:

- **User site:** repository `<username>.github.io` → `https://<username>.github.io/`
- **Project site:** any repository name → `https://<username>.github.io/<repo>/`

Steps:

1. `git init && git add . && git commit -m "Portfolio"`
2. Create the repository on GitHub, then `git remote add origin … && git push -u origin main`
3. On GitHub, open **Settings → Pages → Source: GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml` (install → typecheck → build → deploy).

If you ever need an absolute base path, build with `BASE_PATH=/my-repo/ npm run build`.

### SEO note
`index.html` includes meta, Open Graph and JSON-LD (`Person` + `ScholarlyArticle`) tags. When the final URL is known, you can add `<link rel="canonical">`, `og:url` and a `sitemap.xml`.

---

## Structure

```
src/
  data/profile.ts        ← all content
  components/            Nav, Footer, Portrait, shared primitives
  sections/              Hero, About, Research, Publications, Projects,
                         Experience, Education, Skills, Contact
  visuals/               Manifold (hero canvas), SwinGrid, ProjectVisuals
  styles/global.css      design tokens + all styles
public/
  images/                ← put profile.jpg here
  favicon.svg, robots.txt, .nojekyll
```

## Accessibility & performance

- Semantic landmarks, skip link, visible focus states, labelled controls, and a keyboard-friendly mobile menu that closes with Esc.
- `prefers-reduced-motion` is respected. Framer Motion uses `reducedMotion="user"`, CSS animations are disabled, and the hero canvas renders one still frame.
- The hero canvas pauses when it's off-screen or the tab is hidden, and caps the device pixel ratio at 2.
- Fonts are self-hosted through `@fontsource`, so the page makes no third-party requests.
