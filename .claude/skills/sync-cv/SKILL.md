---
name: sync-cv
description: >-
  Keep this Astro portfolio's content in sync with the resume. When the CV
  changes, read it, update the content collections and static data to match,
  verify with a build, and open a pull request for review. Never edits main
  directly; never touches design, layout, or config.
when_to_use: >-
  Run whenever the resume changes: a new role, a new project, added skills, a
  new metric or award, or a title change. Trigger phrases: "update the
  portfolio from my CV", "sync my resume", "I updated my CV", "add this new
  project/experience to the site", "my CV changed".
argument-hint: "[path-to-cv]"
allowed-tools: Read Edit Write Glob Grep Bash(git *) Bash(gh *) Bash(npm run build) Bash(npm install) Bash(ls *)
---

# sync-cv

**Responsibility:** keep the portfolio's content matching the resume. When the CV
changes, propose the matching content changes as a **reviewed pull request** —
never commit to `main` directly, and never touch design, layout, or config.

## Flow (the GitOps loop this repo uses)

1. **Start clean from main:**
   `git fetch origin && git checkout main && git pull --ff-only`
2. **Branch:** `git checkout -b sync-cv/<short-topic>` (e.g. `sync-cv/new-role`).
3. **Resolve + read the CV** (see "Input" below). State the source: "Reading <path> …".
4. **Diff** the CV against the current content; show the user a summary of what's
   new / changed / removed and **get a go-ahead before writing.**
5. **Apply** the changes (see "What maps to what").
6. **Verify:** `npm run build` — it must pass. The content schema fails the build
   on any missing/mistyped field. Fix and rebuild until green.
7. **Commit** (file-wise, clear messages) and **push** the branch.
8. **Open a PR to `main`:** `gh pr create --base main …`.
   - `gh` must be authenticated as the repo owner (`sadeemsattar`). If it errors
     with "must be a collaborator", the branch is already pushed — print the
     compare URL instead:
     `https://github.com/sadeemsattar/sadeemsattar.github.io/compare/main...<branch>?expand=1`
9. **Human reviews + merges.** Merging to `main` triggers GitHub Actions, which
   rebuilds and redeploys to Pages automatically. The skill's job ends at the PR.

## Input: where the CV comes from

Never assume a fixed filename — the resume file can be renamed. Resolve it:

1. If the user passed a path as `$1` / `[path-to-cv]`, use that.
2. Otherwise discover the shipped resume — the PDF the site links to:
   - `grep -rho 'resources/[^" )]*\.pdf' src/components` → the linked filename(s).
   - Map to `public/resources/<that-file>`.
   - Fallback: if exactly one `public/resources/*.pdf` exists, use it; if several
     and none is clearly linked, ask which.
3. Read it with the Read tool (it reads PDFs). For `.docx` or pasted text, use that.

## What maps to what

Change ONLY these. Never touch `src/styles/`, `src/layouts/`, the client script,
`astro.config.mjs`, or the deploy workflow.

| Resume section | Target | Notes |
|---|---|---|
| Work history | `src/content/experience/NN-<slug>.md` | one file per role |
| Projects / key work | `src/content/projects/<slug>.md` | one file per project |
| Skills / tools | `src/components/Skills.astro` (`columns`) | static array |
| Headline metrics | `src/components/Numbers.astro` (`stats`) | e.g. "6 systems", "90%" |
| Title / summary | `src/components/Hero.astro` (lede) + `About.astro` | keep concise |
| Facts (now/education/honors) | `src/components/About.astro` (`facts`) | |
| Rotating tech list | `src/components/Marquee.astro` (`items`) | headline tools only |

### experience schema (frontmatter only, no body)

```yaml
role: string
org: string
orgDetail: string   # optional accented suffix (project/context)
period: string      # e.g. "Jul 2025 — Present"
order: number       # 1 = newest, ascending = older
points: [ "…" ]     # present-tense impact bullets
```
Filename `NN-<slug>.md`, `NN` matches `order` (`01-…` = newest). Inserting a new
current role means bumping everyone else's `order` down and renaming files.

### projects schema (frontmatter + markdown body)

```yaml
title: string
kicker: string       # e.g. "Flagship · DisruptLab" or "Voice AI"
num: "01"            # display index string, matches order
metricValue: string  # the big terracotta number/phrase
metricLabel: string  # caption beside the metric
outcome: string      # one sentence: why it matters (also the OG description)
desc: string         # 2–3 sentence card summary
tags: [ string ]     # 3–5 tools/concepts
wide: boolean        # optional; true = spans both columns (flagship only)
order: number        # 1 = first/flagship
```
The markdown **body** becomes the `/projects/<slug>/` case-study page. Structure
it `## The problem`, `## The approach`, `## Outcome` (short, prose only). Match
the altitude of the existing files.

## Hard rules

- **Content only.** Never change styles, layout, the client script, or config.
  If the CV implies a design change, say so and stop — separate task.
- **Never commit to `main` directly.** Always branch → build → PR → human merge.
- **Confidentiality.** Outcomes + tech stack only. No proprietary code, client
  data, or internal secrets. The case study is the artifact.
- **Schema is law.** Every field present and correctly typed, or the build fails.
- **Ordering stays coherent.** `order`, the `NN-` filename prefix, and the card
  `num` must agree. Newest experience first; flagship project first.
- **Don't invent.** If the CV is ambiguous, ask rather than fabricate metrics.
- **Never finish on a red build**, and never merge — that's the human's call.
