# sadeemsattar.github.io

Personal portfolio of **Sadeem Sattar** — Staff Engineer, AI Systems.
Live at **https://sadeemsattar.github.io**.

Built with [Astro](https://astro.build) (static output), hosted on GitHub Pages.
A single-page home plus a generated deep-dive page per project. All
résumé-derived content lives in typed markdown collections, so updating the site
is editing data files — not touching layout or styles.

## Run it locally

Requires Node 18.20+, 20.3+, or 22+.

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # serve the built ./dist locally
npm run check      # type-check components + content schema
```

`npm run build` is the real test — the content schema fails the build if any
project or experience file has a missing or mistyped field.

## Structure

```
src/
├── layouts/Base.astro          # <head>, meta/OG tags, fonts, Nav, Footer, client script
├── components/                 # one section = one component (Hero, About, Timeline, …)
├── content.config.ts           # Zod schemas for the collections (build-time validation)
├── content/
│   ├── projects/*.md           # frontmatter → card; body → /projects/<slug>/ page
│   └── experience/NN-*.md       # frontmatter only; NN prefix + `order` sort the timeline
├── pages/
│   ├── index.astro             # composes the home page
│   └── projects/[slug].astro   # one static page per project
├── scripts/main.js             # progressive enhancement (scroll progress, nav, reveal)
└── styles/
    ├── tokens.css              # design tokens — the single source of truth
    └── global.css              # component styles, using the tokens

public/resources/               # AI_Engineer.pdf (résumé), profile.png
.github/workflows/deploy.yml    # build + deploy to Pages on push to main
```

See [`CLAUDE.md`](./CLAUDE.md) for the architecture and coding principles in full.

## Editing content

- **New project:** add `src/content/projects/<slug>.md` with the schema fields
  (`title, kicker, num, metricValue, metricLabel, outcome, desc, tags, order`,
  optional `wide`). The markdown body becomes the case-study page.
- **New role:** add `src/content/experience/NN-<slug>.md` (`NN` = order prefix).
- **New résumé:** replace `public/resources/AI_Engineer.pdf`.

## Deploy

Automatic: **push to `main`** → GitHub Actions builds and publishes to Pages.

**One-time setup:** in the repo, set **Settings → Pages → Source → GitHub Actions**
(not "Deploy from a branch"), or the deploy job cannot publish.
