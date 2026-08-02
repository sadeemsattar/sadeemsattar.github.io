---
title: Synapse — Venture OS
kicker: Venture OS · Platform
num: "03"
metricValue: 5 modules
metricLabel: Intelligence · Analytics · Actions · Konnect · Build, across a 7-app monorepo
outcome: >-
  A Venture Operating System that connects product intelligence with GTM
  execution — so what you learn from selling shapes what you build next.
desc: >-
  Replaces the scattered stack (analytics here, CRM there, research elsewhere)
  with one system built on a living knowledge graph that compounds with every
  interaction. Built on Next.js, Supabase, tRPC, and Inngest.
tags: [Next.js, Supabase, tRPC, Inngest, Vector Search]
order: 3
---

## The problem

Ventures run on a scattered stack: analytics in one tool, CRM in another,
research in a third. The loop between *what you learn from selling* and *what you
build next* is broken because the data never lives in one place long enough to
compound.

## The approach

A Venture Operating System with five modules — **Intelligence, Analytics,
Actions, Konnect, and Build** — across a 7-app monorepo. Underneath sits a living
knowledge graph that gets richer with every interaction, so product intelligence
and go-to-market execution feed each other instead of drifting apart.

## What I built inside it

- **Guided venture onboarding** — a multi-step flow that crawls a company's
  public web presence, infers a venture profile from it, lets the founder accept
  or reject each inference, and provisions the venture's whole data substrate on
  confirmation. Ideation ends at a reviewed dossier; nothing is provisioned
  behind the user's back.
- **Opportunity discovery with semantic dedup** — an authenticated ingest path
  where an upstream pipeline posts discovered opportunities; each is embedded and
  cosine-matched against what's already known, so a near-duplicate increments a
  counter instead of creating noise. A bad item in a batch fails loudly on its
  own without aborting the rest.
- **Lifecycle-managed actions** — a discovery gets promoted into a tracked action
  with phases, measurement, and outcome, so a recommendation is followed through
  rather than just displayed.
- **Integration catalog** — one shared, curated source for what a venture can
  connect, so the onboarding flow and the settings hub can never disagree about
  what's available or what's already connected.


## The stack

- **Web** — Next.js, React, TypeScript in a pnpm + Turborepo monorepo
- **Data** — Supabase (Postgres + pgvector) for the transactional store,
  ClickHouse for analytics
- **API** — tRPC end to end, with Hono for the standalone services
- **Background work** — Inngest for durable, retryable jobs
- **Realtime** — PartyKit for live collaboration
- **AI** — the Vercel AI SDK across multiple providers, Mastra for agents,
  the MCP SDK for tool access
- **Embeddings** — OpenAI `text-embedding-3-small` for cosine dedup

## Outcome

One system where selling informs building — what a venture learns from selling
shapes what it builds next, because both read from the same graph.
