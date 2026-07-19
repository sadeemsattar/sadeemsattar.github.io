---
title: Product Memory Engine
kicker: Flagship · DisruptLab
num: "01"
metricValue: 5-layer
metricLabel: active-memory substrate · FastAPI + MCP
outcome: >-
  Solves the "amnesia problem" in LLM agents — instead of restarting from zero
  each session, an agent's understanding of product behavior accumulates and
  stays queryable as-of any moment in time.
desc: >-
  Not retrieval-over-docs — an active-memory substrate: a typed ingestion router,
  a bi-temporal knowledge graph, two-arm pattern detection, natural-language
  perceptions, and an active reasoner that hypothesizes and tests causal
  relationships. Makes evidence-grounded reasoning a property of the data, not
  the prompt. Served to analysts over FastAPI and to agents over MCP.
tags: [Knowledge Graph, MCP, FastAPI, Bi-temporal, Active Reasoning]
wide: true
order: 1
---

## The problem

LLM agents forget. Every session starts from zero, so an agent's understanding
of a product never compounds — the same context gets re-derived, the same
conclusions get re-litigated, and nothing learned yesterday survives to today.
Retrieval-over-documents papers over this, but it only fetches text; it doesn't
give the agent a *model* of how the product behaves over time.

## The approach

A five-layer active-memory substrate, not a vector store bolted onto a prompt:

- **Typed ingestion router** — every incoming signal is classified and routed to
  the right memory structure instead of dumped into one undifferentiated index.
- **Bi-temporal knowledge graph** — facts carry both when they were true and when
  they were recorded, so the system can answer "what did we believe as of last
  month?" not just "what is true now."
- **Two-arm pattern detection** — surfaces recurring structures across entities
  and across time.
- **Natural-language perceptions** — machine observations rendered as readable
  claims an analyst or agent can reason over.
- **Active reasoner** — hypothesizes causal relationships and tests them against
  the graph, so reasoning is grounded in evidence in the data rather than in the
  phrasing of a prompt.

## Outcome

Evidence-grounded reasoning becomes a property of the data itself. The same
substrate is served two ways: to analysts over a **FastAPI** surface, and to
autonomous agents over **MCP**, so both humans and agents query one shared,
time-aware memory.
