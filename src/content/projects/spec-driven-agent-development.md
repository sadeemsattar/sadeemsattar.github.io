---
title: Spec-Driven Development for AI Agents
kicker: Methodology · R&D
num: "07"
metricValue: Build ⇄ judge
metricLabel: one model implements, a second independently rules on the evidence
outcome: >-
  A discipline for shipping agent-written code that's actually reviewable —
  every change starts as a spec and ends with an independent verdict on
  whether the evidence supports it.
desc: >-
  An authoring standard and command suite for building software with coding
  agents: each unit of work is a spec, a failing test, an implementation, and
  an archived record. A separate adversarial reviewer — a different model, run
  in a read-only sandbox — issues the pass/fail verdict, and fails closed if
  it can't run at all.
tags: [Agentic Workflows, Spec-Driven Development, Evaluation, Tooling]
order: 7
---

## The problem

Coding agents write plausible code quickly, which is exactly the danger: the
failure mode isn't a crash, it's a confident change nobody specified and nobody
verified. Volume without a discipline around it produces a codebase no one can
review and no one trusts.

## The approach

Make every change carry its own evidence, and never let the author grade its own
work.

- **A change is a cycle, not a commit** — start a cycle, write the spec delta,
  write the tests that would fail, implement, merge the spec into canon, archive
  the cycle. The archive is the audit trail: you can read why any line exists.
- **Two models, separated roles** — one agent implements; a *different* model,
  running read-only, adversarially reviews the result and issues the verdict.
  The builder never marks its own homework.
- **Fail closed** — if the reviewer isn't installed or can't run, the verdict is
  a failure, not a pass. A missing check is never a silent green.
- **The ledger is mandatory** — a cycle isn't done until its verdict, coverage,
  and outcome are written down. Nothing is "done" on an agent's say-so.
- **Autonomous backlog draining** — the loop pulls the next item and runs the
  full cycle unattended, so the discipline holds without a human sequencing it.

## Research grounding

The **Kitchen Loop** (Roy, [arXiv:2603.25697](https://arxiv.org/abs/2603.25697))
is an independent, production-tested system that converged on nearly this
architecture from a different starting point. Seven of its mechanisms were
folded in: usage-driven verification, the sealed test card, an anti-cheat check
on the evaluator, the weak-and-independent evaluator split, deterministic-first
safety gates, drain-mode and starvation handling, and drift metrics from day
one. The deliberate divergence is that here the loop may never edit its own gate
files — the Kitchen Loop's can.

## The stack

- **Builder** — Claude Code as the implementing agent
- **Reviewer** — a separate model in a read-only sandbox, invoked as a plugin
  so the verdict step can never be skipped silently
- **Isolation** — git worktrees per cycle, so parallel work can't collide
- **Artifacts** — specs, task lists, and verdict ledgers as plain markdown and
  YAML in the repo, versioned with the code they describe

## Outcome

A repeatable way to build with agents at volume without losing reviewability.
It's the method behind the other systems on this page — each of them landed as
a sequence of specs, failing tests, and independently judged verdicts rather
than as a stream of unreviewed commits.
