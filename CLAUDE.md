# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## What this is

The personal portfolio of **Sadeem Sattar** — Staff Engineer, AI Systems.
Built with **Astro** (static output), hosted on **GitHub Pages** at
`https://sadeemsattar.github.io` from the repo `sadeemsattar/sadeemsattar.github.io`.

Structure: a single-page home (`/`) plus one generated deep-dive page per
project (`/projects/<slug>/`). Content lives in typed markdown collections, not
in the components.

## Commands

```bash
npm install        # install dependencies (Node 18.20+, 20.3+, or 22+)
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # serve the built ./dist locally
npm run check      # astro check — type-checks components + content schema
```

Always run `npm run build` before pushing a change that touches structure — the
build is the real test that content frontmatter still matches the schema.

## Architecture

```
src/
├── layouts/Base.astro          # <head>, meta/OG/Twitter tags, fonts, Nav, Footer, client script
├── components/                 # one section = one component
│   ├── Nav.astro   Hero.astro   Marquee.astro   About.astro   Numbers.astro
│   ├── Timeline.astro          # reads the `experience` collection
│   ├── Projects.astro          # reads the `projects` collection, renders ProjectCard
│   ├── ProjectCard.astro       # one card; links to /projects/<slug>/
│   └── Skills.astro   Contact.astro   Footer.astro
├── content.config.ts           # Zod schemas for both collections (build-time validation)
├── content/
│   ├── projects/*.md           # frontmatter → card; body → deep-dive page
│   └── experience/NN-*.md       # frontmatter only; NN prefix + `order` field sort the timeline
├── pages/
│   ├── index.astro             # composes the home page from components
│   └── projects/[slug].astro   # getStaticPaths over projects → one page each
├── scripts/main.js             # progressive enhancement: scroll progress, nav, reveal, burger
└── styles/
    ├── tokens.css              # design tokens — the ONLY place colors/spacing/fonts are defined
    └── global.css              # all component styles, using the tokens

public/resources/               # AI_Engineer.pdf (résumé), profile.png — served at site root
.github/workflows/deploy.yml    # build + deploy to Pages on push to main
astro.config.mjs                # `site` (absolute URLs) + directory build format
```

## Coding principles (keep these true)

- **Tokens are the single source of truth.** Never hardcode a color, radius,
  easing, or font family in a component or in `global.css` — reference a
  `var(--*)` from `tokens.css`. Change the look in one place.
- **Content is separate from presentation.** Projects and experience are
  markdown with a typed schema (`content.config.ts`). To add or edit a project,
  add/edit a file in `src/content/projects/` — do **not** hardcode it into a
  component. The schema fails the build if a field is missing or mistyped.
- **One component, one section.** Each homepage section is its own `.astro` file.
  Compose them in `pages/index.astro`; don't inline section markup there.
- **Zero JS by default.** Astro ships no client JS unless asked. `main.js` is the
  only client script and is pure progressive enhancement — the page is fully
  readable and navigable without it. Guard every DOM lookup so it's safe on both
  the home page and project pages.
- **Absolute URLs come from `Astro.site`.** Canonical + OG tags in `Base.astro`
  derive from `astro.config.mjs`; don't paste the domain elsewhere.
- **Nav links are root-anchored** (`/#about`) so they work from project pages too.

## Adding content

- **New project:** create `src/content/projects/<slug>.md` with the frontmatter
  fields from the schema (`title, kicker, num, metricValue, metricLabel,
  outcome, desc, tags, order`, plus optional `wide`). The markdown body becomes
  the case-study page. The card and the page `/projects/<slug>/` are generated
  automatically.
- **New role:** create `src/content/experience/NN-<slug>.md` (NN = order prefix)
  with `role, org, orgDetail?, period, points[], order`.
- **New résumé:** replace `public/resources/AI_Engineer.pdf` (keep the filename,
  or update the links in `Nav.astro` and `Contact.astro`).

## Deploy

- Deploy is automatic: **push to `main`** → `.github/workflows/deploy.yml` builds
  and publishes to GitHub Pages.
- **One-time setup:** the repo's **Settings → Pages → Source** must be set to
  **GitHub Actions** (not "Deploy from a branch") for this workflow to publish.
- Active development happens on a feature branch (e.g. `redesign-astro`); merge to
  `main` to ship. Verify locally with `npm run build && npm run preview` first.
