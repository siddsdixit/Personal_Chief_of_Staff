<div align="center">

# `personal-chief-of-staff`

### trust velocity, not busier

**An AI chief of staff that closes your open loops before they cost you the room.**

Five scheduled routines. Nine on-demand commands. One ledger that never lets an old problem look new.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/siddsdixit/Personal_Chief_of_Staff?style=social)](https://github.com/siddsdixit/Personal_Chief_of_Staff)
[![Built with](https://img.shields.io/badge/built_with-Claude_Code-4fc3f7)](https://claude.com/claude-code)

> **The cost was never inbox zero. It was trust velocity.**
>
> A small ask sat past a day. A counterpart learned about a call after the thinking had
> already closed. Separately, each one was easy to forgive. Together they are how people
> stop believing you will close the loop.
>
> Run it on your calendar, email, Slack, and spend. It drafts in your voice, never sends
> without you, and asks one honest question every Sunday: is your loop-closing getting
> better or worse, and with whom.

![Personal Chief of Staff demo](docs/cos-explainer.gif)

</div>

---

An AI chief of staff built on [Claude Code](https://claude.com/claude-code) that runs your
calendar, email, Slack, and spend triage on a schedule, drafts replies in your own writing
voice, and tracks a specific failure mode most operators have: dropped stakeholder loops.

It is not a chatbot you talk to. It is a set of scheduled routines and on-demand commands,
defined as plain Markdown instruction files, that read a config file describing your world
(who matters, what tone to use, what to watch) and act inside your real tools: Gmail, Google
Calendar, Slack, and optionally Ramp (finance) and Jira.

This repo is a **template**. It ships with zero real people, companies, or credentials.
Every example uses an obviously fake company ("Acme Corp") and fake names. You seed it with
your own org chart, priority senders, and voice before it does anything useful. See
[SETUP.md](SETUP.md).

## What it does

- **Morning briefing** — calendar, email triage with drafted replies, Slack highlights,
  pending approvals, carried-over open loops, ranked top actions.
- **Hourly pulse** (weekdays) — meeting prep for what's starting soon, fresh email/Slack
  drafts, a compact status DM.
- **End-of-day summary** — what happened today, what closed, what's still open and aging.
- **Evening urgent check** — a high-bar, mostly-silent sweep for anything that truly can't
  wait until morning.
- **Weekly pattern report** — not a task list. Answers one question: is your loop-closing
  behavior improving or getting worse, and with whom. See [docs/LEDGER.md](docs/LEDGER.md).
- **On-demand commands** — `/cos-brief`, `/cos-delegate`, `/cos-find-time`, `/cos-followup`,
  `/cos-thread`, `/cos-spend`, and a catch-all `/cos` for anything in plain English.

## How it's built

| Piece | Purpose |
|---|---|
| `config.yaml` | Your world: name, role, priority senders, org chart/tone mapping, channels to watch, thresholds, schedule. The only file most users need to edit. |
| `voice.md` | Your writing style, made explicit, so every draft sounds like you wrote it. |
| `triggers/*.md` | The five scheduled routines, each a self-contained instruction file. |
| `.claude/commands/*.md` | Slash commands for one-off asks. |
| `docs/LEDGER.md` | The spec for the shared "open loops" ledger that gives the system memory across runs. |

Nothing here is application code. Every routine is instructions a model follows, which means
you can open any file and change the logic yourself without a build step.

## Requirements

- [Claude Code](https://claude.com/claude-code)
- MCP connectors for the tools you want to use: Gmail, Google Calendar, Slack are the core
  three. Ramp (finance) and Jira/Atlassian are optional.
- A Slack workspace, if you want the ledger (persistent open-loop tracking) and scheduled
  cloud triggers. Without Slack, the system still works locally as on-demand commands with
  briefings printed to your terminal instead of DM'd.

## Guardrails baked into every trigger

- **Drafts, never sends.** Every email or Slack message goes to Drafts. You are always the
  approval gate on anything that leaves the system.
- **Tone matched by sender.** Executive/board senders get one register, internal peers
  another, external contacts a third, all defined in your own `config.yaml`.
- **Honest aging.** The ledger never lets an old problem look new. See
  [docs/LEDGER.md](docs/LEDGER.md) for the rule that enforces this.
- **High bar for interruption.** The evening check and pulse routines are tuned to stay quiet
  by default. A false "urgent" ping is worse than a missed one.

## Getting started

Read [SETUP.md](SETUP.md) for the full seeding walkthrough: connecting your tools, filling in
your own org chart and priority people, writing your voice profile, and turning on the
schedule.

## License

MIT. See [LICENSE](LICENSE).

## Contributing

This is a personal-productivity template, not a product. Issues and PRs for genuinely
reusable improvements (new trigger ideas, clearer setup docs, bug fixes in the instruction
logic) are welcome. PRs that add anything company- or person-specific will not be merged.
