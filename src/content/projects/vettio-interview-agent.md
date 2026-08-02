---
title: Vettio Interview Agent
kicker: Voice AI · Vettio
num: "08"
metricValue: 5-stage
metricLabel: "real-time voice pipeline: STT · TTS · LLM · VAD · turn detection"
outcome: >-
  Runs full candidate interviews on its own — joining live meetings and adapting
  questions in real time instead of following a fixed script.
desc: >-
  Built on a LiveKit voice pipeline: Deepgram STT, OpenAI TTS, a custom LLM, VAD,
  and turn detection for natural, low-latency speaker management.
tags: [LiveKit, Deepgram, Voice Pipeline, Real-time]
order: 8
---

## The problem

Scripted phone-screens don't adapt. A good interviewer follows up on what the
candidate actually said — a fixed decision tree can't, and stitching STT, an LLM,
and TTS together naively produces awkward, high-latency turns that feel like
talking to a kiosk.

## The approach

A five-stage real-time voice pipeline on **LiveKit**, injected live into meetings:

- **STT** — Deepgram for streaming transcription
- **TTS** — OpenAI voices for the reply
- **LLM** — a custom model driving context-aware questioning
- **VAD** — voice-activity detection to know when the candidate is speaking
- **Turn detection** — natural, low-latency speaker management so the agent
  doesn't talk over people

## The stack

- **Realtime transport** — LiveKit, for joining and holding the live call
- **STT** — Deepgram streaming transcription
- **TTS** — OpenAI voices
- **Reasoning** — a custom LLM driving context-aware questioning
- **Turn-taking** — voice-activity detection plus turn detection for low-latency
  speaker management

## Outcome

An agent that joins a live interview and conducts it end-to-end, adapting its
questions to the conversation instead of reading from a script.
