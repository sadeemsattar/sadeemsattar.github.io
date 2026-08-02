---
title: Session Video Intelligence
kicker: Applied AI · DisruptLab
num: "05"
metricValue: Video → theme
metricLabel: vision models read session recordings; themes cluster in vector space
outcome: >-
  Reads recorded product sessions the way a UX researcher would — at a volume
  no researcher could watch — and clusters what it finds into recurring themes.
desc: >-
  A pipeline that analyzes session recordings with vision-language models,
  extracts UX friction signals, and groups them into themes via pgvector
  embeddings. Built as a layered DAG package — pluggable analysis tools behind
  a strategy interface, so a new signal source is a new tool, not a rewrite.
tags: [Vision-Language Models, pgvector, ClickHouse, Airflow, Embeddings]
order: 5
---

## The problem

Session recordings are the richest UX signal a product has and the least used,
because watching them doesn't scale. A researcher can watch twenty; a product
generates thousands. The friction is all there, unread.

## The approach

A layered analysis pipeline that watches them instead.

- **Tools behind a strategy interface** — one tool combines event data with the
  recording; another works from keyframes alone when no event stream exists.
  Both sit behind the same interface and are selected per session, so adding a
  new analysis mode means registering a new tool rather than editing the
  orchestrator.
- **Vision-language analysis** — keyframe extraction feeds a VLM that reads what
  the user was actually trying to do and where it went wrong.
- **Theme clustering** — findings are embedded and grouped in **pgvector**, then
  back-filled across sessions, so an issue seen once and an issue seen four
  hundred times are visibly different.
- **Per-tenant warehousing** — results land in tenant-isolated **ClickHouse**
  tables, with the schema managed by the pipeline itself.

Domain, application, handler, and DAG layers are strictly separated — the domain
logic has no idea it's running inside a scheduler.

## The stack

- **Orchestration** — Airflow, as a self-contained DAG package
- **Vision** — a vision-language model over extracted keyframes, reached
  through LiteLLM
- **Embeddings** — sentence-transformers, stored and clustered in pgvector
- **Warehouse** — per-tenant ClickHouse tables, schema managed by the pipeline
- **Storage** — S3 for the source recordings
- **Runtime** — Python, Docker

## Outcome

Unwatched recordings become a ranked, deduplicated list of what's confusing
users — at a volume no human review process could reach.
