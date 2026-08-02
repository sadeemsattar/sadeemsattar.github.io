---
title: AlphaMem / AlphaMemX
kicker: Knowledge Graph · DisruptLab · R&D
num: "02"
metricValue: 46 → 0
metricLabel: hardcoded schema types made self-learning; zero deploys per vertical
outcome: >-
  The organizational "brain" for the autonomous enterprise — it catches the
  composite risks (a competitor mention + a usage drop + open escalations) that
  no single tool ever sees on its own.
desc: >-
  Ingests every business signal, resolves entities across sources, correlates
  patterns across tools and time, and flags contradictions before agents act on
  stale data. AlphaMemX makes the schema itself self-learning — types live as
  graph nodes and evolve from the data, so new verticals emerge instead of
  waiting on an engineering deploy.
tags: [FalkorDB, Multi-tenant, Ontology, Next.js]
order: 2
---

## The problem

The signals that matter most are composite. A churn risk isn't one event — it's a
competitor mention *plus* a usage drop *plus* a pile of open escalations, spread
across three tools that never talk to each other. No single dashboard sees it,
and by the time a human stitches it together, it's a post-mortem.

## The approach

An organizational brain that ingests every business signal, resolves entities
across sources so "Acme Corp" in the CRM is the same node as "acme.com" in the
logs, and correlates patterns across tools and across time. It flags
contradictions *before* downstream agents act on stale data.

**AlphaMemX** takes it further: the schema itself is self-learning. Instead of 46
hardcoded types maintained by engineers, types live as nodes in the graph and
evolve from the data. New verticals *emerge* from what's ingested rather than
waiting on an engineering deploy per vertical.

## The stack

- **Graph** — FalkorDB, one graph per tenant, with the ontology stored as nodes
- **Retrieval** — hybrid search: vector similarity alongside BM25 ranking
- **Chunking** — Chonkie for document segmentation
- **Models** — Anthropic and OpenAI for classification and correlation
- **Transports** — FastAPI for HTTP and SSE, an MCP server for agents
- **Surface** — Next.js dashboard, live over server-sent events
- **Runtime** — Python, Docker

## Outcome

Multi-tenant, with a living ontology instead of a fixed one. The headline:
**46 → 0** hardcoded schema types, and zero deploys to onboard a new vertical.
