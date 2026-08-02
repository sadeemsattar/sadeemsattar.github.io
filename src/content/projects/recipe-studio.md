---
title: Recipe Studio — Visual Workflow Authoring
kicker: Platform · DisruptLab
num: "04"
metricValue: Canvas → run
metricLabel: non-engineers compose and ship executable AI playbooks
outcome: >-
  Lets non-engineers author, run, and iterate on executable AI playbooks —
  without writing YAML or waiting on an engineer.
desc: >-
  An authoring and execution environment layered over a workflow engine: a
  React Flow canvas for building multi-step playbooks from AI agent steps,
  deterministic tools, human approval gates, and control flow — plus a prompt
  studio for A/B testing prompt variants against real upstream data before
  they ship. Next.js 16, React 19, TypeScript, Monaco, TanStack.
tags: [Next.js, React Flow, Monaco, Workflow Engine, TypeScript]
order: 4
---

## The problem

The people who know *what* a growth playbook should do — analysts, growth leads,
operators — are rarely the people who can express it in workflow YAML. So every
experiment queues behind an engineer, and the loop between having an idea and
seeing it run is measured in sprints.

## The approach

An experience layer over a production workflow engine, not a replacement for it.
The engine stays the source of truth for every execution; the studio makes it
usable by people who don't want to see it.

- **Visual canvas** — build a playbook from AI agent steps, deterministic tool
  steps, human approval checkpoints, and control flow, on a React Flow graph
  that round-trips losslessly to the engine's own format.
- **Prompt studio** — version prompt variants, run them against real upstream
  data from a previous execution, and compare outputs side by side before any
  of it reaches production.
- **Approval gates** — a workflow can pause and wait for a human, so an operator
  stays in the loop on the steps that warrant it.
- **Full operational surface** — executions, logs, triggers, namespaces, and
  dashboards, so the studio is where the work happens end to end.

## The stack

- **Framework** — Next.js 16, React 19, TypeScript, Tailwind 4
- **Canvas** — @xyflow/react (React Flow) with Dagre for graph layout
- **Editors** — Monaco with monaco-yaml for schema-aware YAML editing
- **State & data** — TanStack Query, Table and Virtual; Zustand; Zod
- **UI** — shadcn/ui on Radix primitives, Highcharts for dashboards
- **Engine** — Kestra, driven entirely through its REST API
- **Testing** — Vitest

## Outcome

An operator can go from an idea to a running, versioned playbook without opening
an editor or filing a ticket — and the engine underneath still sees a workflow it
fully understands.
