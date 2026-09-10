# Setup

Two ways to configure this project: the guided interview (recommended) or manual editing.

## Option A: Guided interview (recommended)

1. Open this project folder in Claude Code.
2. Run `/setup-cos`.
3. Answer its questions: your identity, your org (manager, peers, direct reports, key
   channels), and your writing voice (it will ask you to paste a couple of real
   emails/messages so it can match your actual style, not a generic one).
4. It writes `config.yaml` and `voice.md` for you and shows you the result before saving.
5. It then asks, separately, whether to:
   - Install the slash commands globally (`~/.claude/commands/`) so `/cos`, `/cos-brief`,
     etc. work from any project on your machine, not just this folder.
   - Register the five scheduled routines as cloud triggers so they run unattended.

Nothing in steps 5 happens without you explicitly confirming it, since both actions have
real effects (files outside this repo, recurring automated jobs against your real accounts).

Re-run `/setup-cos reconfigure` any time to redo the interview, or `/setup-cos` again later
to just add cloud triggers or (re)install the global commands.

## Option B: Manual setup

If you'd rather not run the interview:

1. Connect your tools in Claude Code: Gmail, Google Calendar, and Slack MCP connectors at
   minimum. Ramp and Jira/Atlassian are optional; only add them if you'll use `/cos-spend`
   or the Jira ticket step in `/cos-delegate`.
2. Copy `config.yaml.example` to `config.yaml`. Fill in:
   - Your name, role, company, timezone, email, Slack member ID.
   - `email.priority_senders`: everyone whose email should get triaged and drafted a reply.
     Split by tone: your manager and board/parent-company contacts go in
     `executive_senders`/`executive_domains`, everyone else in `priority_senders`.
   - `slack.priority_channels`: channel IDs for the channels worth monitoring. Get an ID by
     opening the channel, "View channel details," scrolling to the bottom.
   - Remove the `ramp` and/or `jira` blocks if you don't use them.
3. Copy `voice.md.example` to `voice.md`. This is the file that matters most for output
   quality. Don't leave it generic: replace the example email/Slack outputs with real
   examples of things you've actually written, and be specific about your hard rules (tone,
   banned phrases, sign-off style).
4. (Optional) Set up the ledger for cross-run memory and the weekly pattern report: create
   an empty Slack canvas, put its ID in `config.yaml` `logbook.slack_canvas_id`. See
   [docs/LEDGER.md](docs/LEDGER.md), including the no-Slack fallback.
5. (Optional) Install commands globally: copy everything in `.claude/commands/` to
   `~/.claude/commands/`, then edit the copies so any reference to "the project root"
   points at this folder's absolute path (global commands can run from any working
   directory, so they need an explicit path back to your config).
6. (Optional) Schedule the triggers: each file in `triggers/` is a full instruction set
   meant to run unattended. Use whatever scheduled-agent or cron capability your Claude Code
   environment provides to run, on the schedule you want:
   `claude -p "Follow the instructions in triggers/cos-morning.md" ` (from this project's
   directory, or with an absolute path in the prompt if running from elsewhere). Repeat for
   `cos-composer.md` (hourly pulse), `cos-eod.md`, `cos-urgent.md`, and `cos-patterns.md`
   (weekly). Match the times in `config.yaml`'s `schedule` block, in your configured
   timezone.

## Verifying it works

Run `/cos scan` (or just `/cos` with no arguments). It should read your calendar, triage
unread priority email, and summarize Slack activity in under 50 lines. If it can't find
`config.yaml` or `voice.md`, setup didn't finish; re-run `/setup-cos`.

## What each file is for, if you're customizing further

| File | Edit this when... |
|---|---|
| `config.yaml` | People, channels, or thresholds change |
| `voice.md` | Your writing style changes, or drafts don't sound like you |
| `triggers/*.md` | You want to change what a scheduled routine does or how it's formatted |
| `.claude/commands/*.md` | You want to add a new on-demand command or change an existing one |
| `docs/LEDGER.md` | You're adapting the ledger to a non-Slack backend |
