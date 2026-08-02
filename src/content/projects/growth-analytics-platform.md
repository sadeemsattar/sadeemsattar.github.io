---
title: Growth Analytics Platform
kicker: Data Platform · DisruptLab
num: "06"
metricValue: Events → actions
metricLabel: Airflow + ClickHouse, multi-tenant, one clean-architecture service
outcome: >-
  Turns raw product, billing, and support events into ranked, explainable
  growth actions — so retention and activation work becomes proactive instead
  of a post-mortem.
desc: >-
  A multi-tenant analytics platform: Airflow pipeline packages over a ClickHouse
  warehouse, an MLflow-tracked churn model, BERTopic themes mined from support
  conversations, funnel-path discovery, and activation/retention/revenue syncs —
  all served from one dependency-injected FastAPI service.
tags: [Airflow, ClickHouse, MLflow, BERTopic, FastAPI, Multi-tenant]
wide: true
order: 6
---

## The problem

Product-led growth teams drown in events but starve for answers. The churn
signal, the drop-off point, and the recurring support complaint all exist in the
data — but assembling them by hand is slow enough that every retention decision
arrives as a post-mortem.

## The approach

A platform, not a notebook. A family of pipeline packages on **Airflow**, each
one a self-contained domain module with its own tests, migrations, and DAG layer,
writing into a per-tenant **ClickHouse** warehouse.

- **Churn prediction** — a full training and inference pipeline over behavioral
  and billing features, with feature selection and preprocessing as first-class
  stages and **MLflow** tracking every run, so a model in production is always
  traceable to the data that produced it.
- **Path discovery** — reconstructs the routes users actually take through the
  product, so drop-off is located rather than guessed at.
- **Theme modeling** — **BERTopic** over sentence-transformer embeddings turns
  unstructured support and feedback conversations into ranked recurring themes.
- **Opportunity detection** — retention and activation pipelines that surface
  the specific cohorts and moments worth acting on.
- **Reporting syncs** — activation, retention, and revenue pipelines that keep
  the product surface reading fresh numbers.

Underneath sits a **FastAPI** service on a strict clean-architecture split — API,
application, domain, handlers — wired entirely through a YAML inversion-of-control
container. Nothing is instantiated in Python; adding an endpoint never touches
the entry point. Two ClickHouse client surfaces are deliberately kept apart: a
sync client for the Airflow workers, an async one for the request path, and they
never import each other.

## The stack

- **Orchestration** — Airflow
- **Warehouse** — ClickHouse, with dbt for transforms
- **ML** — scikit-learn and TensorFlow for the churn model, MLflow for run
  tracking and the model registry
- **NLP** — BERTopic over sentence-transformer (SBERT) embeddings
- **Vectors** — pgvector on Postgres, via asyncpg
- **Model access** — LiteLLM, multiplexing Bedrock and OpenAI behind one interface
- **Service** — FastAPI, Pydantic, SQLAlchemy 2.0, uvicorn, and a YAML IoC container
- **Data** — pandas, NumPy, SciPy
- **Runtime** — Python 3.12, Docker

## Outcome

Raw events become a ranked, explainable list of where growth is leaking — and a
new pipeline is a new package with its own tests, not a new fork of an old DAG.
