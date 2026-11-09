# Deploying Reza Esmkhani's Portfolio to GitHub Pages

This site is a **static single-page application** built with Vite + React + TypeScript. It uses a **relative base path (`./`)**, so the same build works for both GitHub Pages setup types:

| Setup | Repository name | Live URL |
|-------|----------------|----------|
| User / Organization site | `<your-username>.github.io` | `https://<your-username>.github.io/` |
| Project site | any repo name | `https://<your-username>.github.io/<repo-name>/` |

---

## Step 1 — Prepare the repository locally

Open a terminal in the project folder (where `package.json` lives):

```bash
git init
git add .
git commit -m "Initial portfolio commit"
```

## Step 2 — Create the repository on GitHub

1. Go to https://github.com/new
2. Create a new repository:
   - For a **user site**: name it `YOUR_USERNAME.github.io`
   - For a **project site**: any name (e.g. `portfolio`)
3. Do **not** initialize it with a README (we already have one).
4. Copy the remote URL GitHub shows you (e.g. `https://github.com/YOUR_USERNAME/REPO.git`).

## Step 3 — Connect local to GitHub and push

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `REPO` with your actual values.

## Step 4 — Enable GitHub Pages

1. On GitHub, open your repository → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Save.

The workflow file `.github/workflows/deploy.yml` already exists. On every push to `main`, GitHub Actions will:
1. Install dependencies (`npm ci`)
2. Type-check (`npm run typecheck`)
3. Build the static site (`npm run build` → `dist/`)
4. Deploy to GitHub Pages

Your site will be live within a minute or two at the URL shown on the Pages settings page.

## Step 5 — Add your personal photo (optional but recommended)

1. Save your portrait as `public/images/profile.jpg`
   (`.jpeg`, `.webp`, and `.png` also work).
2. Commit and push:

```bash
git add public/images/profile.jpg
git commit -m "Add profile portrait"
git push origin main
```

The site picks it up automatically — no code changes. Until a photo exists, an elegant editorial monogram plate is shown instead.

## Step 6 — Fill in your contact links

Edit `src/data/profile.ts` and replace the empty strings:

```ts
export const contact = {
  email: 'you@example.com',
  github: 'https://github.com/YOUR_USERNAME',
  scholar: 'https://scholar.google.com/citations?user=DBgq5vUAAAAJ&hl=en',
  linkedin: 'https://www.linkedin.com/in/YOUR_HANDLE',
};
```

Any link left empty renders as a calm "pending" label — there are never broken links.

---

## Local development

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run typecheck    # TypeScript check
npm run build        # static build → dist/
npm run preview      # preview the production build locally
```

---

## What's already included in this download

- `src/data/profile.ts` — all content (bio, projects, publications, experience, education, skills, contacts)
- `src/sections/` — all page sections (Hero, About, Research, Publications, Projects, Experience, Education, Skills, Contact)
- `.github/workflows/deploy.yml` — GitHub Actions deployment workflow
- `public/images/` — drop your `profile.jpg` here
- `vite.config.ts` — static build config (relative base path for GitHub Pages)

---

## Troubleshooting

**404 on reload / deep links?**  
The site uses hash-based in-page navigation (all sections on one `index.html`), so there are no deep routes to break. GitHub Pages serves `index.html` correctly.

**Build fails on typecheck?**  
Run `npm run typecheck` locally first and fix any errors before pushing.

**Old version showing after push?**  
GitHub Pages can take 1–2 minutes to deploy after the workflow finishes. Refresh the Pages settings page for the latest URL.
