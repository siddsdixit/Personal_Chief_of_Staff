---
description: "Interview-driven setup: generates your config.yaml and voice.md, installs commands globally, and offers to schedule cloud triggers"
---

You are running the guided setup for Personal Chief of Staff. Do not skip ahead or assume
answers. This command exists so the user never has to hand-edit YAML.

$ARGUMENTS may contain shortcuts like "reconfigure" (re-run the interview and overwrite) or
"triggers only" (skip straight to Phase 4). Otherwise, run all phases in order.

## Before you start

Check whether `config.yaml` and `voice.md` already exist in the project root.
- If both exist and $ARGUMENTS doesn't say "reconfigure", tell the user they're already set
  up, summarize what's configured (name, role, company, number of priority senders, number
  of channels), and ask if they want to reconfigure, add cloud triggers, or install/update
  the global commands.
- Otherwise, proceed with the interview.

## Phase 1: Identity and org basics

Ask, one question (or small group) at a time, don't dump a giant form:

1. Your name, role/title, and company name.
2. Your timezone (offer common options: America/Los_Angeles, America/New_York,
   Europe/London, Asia/Kolkata, etc., or let them type their IANA timezone).
3. Your work email address.
4. Do you want Slack briefings? If yes: ask them to get their Slack member ID (Slack profile
   → the "..." menu → Copy member ID) and, if they know it, the ID of the channel/DM where
   briefings should land (default: DM to self).

## Phase 2: People who matter

Ask:

1. "Who's your manager or the person whose messages should always get executive-tone
   treatment? Name + email." (maps to `email.executive_senders`)
2. "Any company/domain that should always get executive tone (e.g. your board, a parent
   company)?" (maps to `email.executive_domains`)
3. "Who are your peers, C-suite or otherwise, whose emails should get drafted replies in
   team tone? List name + email for each." (maps to `email.priority_senders`)
4. "Who are your direct reports or people you regularly delegate to?" (also
   `email.priority_senders`, team tone)
5. "Anyone else whose emails should always get a drafted reply (EA, key cross-functional
   partner, key external partner)?"
6. If Slack is enabled: "Which Slack channels do you want monitored for priority activity?
   Give channel names, and IDs if you know them (right-click channel → View channel details
   → scroll to bottom), otherwise I'll look them up if a Slack MCP connector is available."
   If a Slack search tool is available, look up channel IDs by name instead of asking the
   user to find them manually.
7. "Any keywords that should always get flagged as urgent in Slack? Defaults: outage,
   blocker, urgent, escalation."

## Phase 3: Voice

Do not accept "just make something up." A generic voice file defeats the purpose of this
project.

Ask:

1. "Paste 1-2 real emails or Slack messages you've actually sent (redact anything
   sensitive). I'll reverse-engineer your style from them: sentence length, structure,
   how you open and close, how direct you are."
2. "Any hard style rules? E.g. never use exclamation points, never use em dashes, always
   sign with initials, no greetings in Slack."
3. "How would you describe your tone in one line: e.g. 'direct operator,' 'warm but
   efficient,' 'formal and precise'?"
4. "Do you use a different tone for external partners/vendors vs. internal team vs.
   executives? If not, I'll default to: shorter/decision-focused for execs, more context for
   team, more polished for external."

From the pasted examples, extract concrete patterns (typical opening line, how asks are
phrased, sign-off style) and write them into `voice.md`'s Email/Slack examples, replacing
the placeholder examples in `voice.md.example`. Don't paraphrase their real writing away
into something generic; keep the actual phrasing patterns you observed.

## Phase 4: Optional integrations

Ask, don't assume:

1. "Do you want finance/spend tracking? (Requires a Ramp MCP connector.)" If yes, ask for
   auto-approve threshold and alert threshold (defaults: $500 / $5000). If no, remove the
   `ramp` block from their config.yaml entirely, and note that `/cos-spend` won't work.
2. "Do you want Jira integration for delegated tasks?" If yes, ask for project key(s). If
   no, remove the `jira` block.
3. "Do you want the open-loop ledger (tracks who's waiting on you, ages issues, and runs the
   weekly pattern report)? This needs a Slack canvas." If yes and a Slack MCP connector with
   canvas support is available, create an empty canvas now and save its ID into
   `logbook.slack_canvas_id`. If no Slack canvas support is available, tell them to see
   "Without Slack" in `docs/LEDGER.md` for the local-file fallback, and leave
   `logbook.slack_canvas_id` blank.

## Phase 5: Write the files

1. Copy `config.yaml.example` to `config.yaml` and fill in every value from the interview.
   Remove `ramp`/`jira` blocks the user declined. Leave `email.smart_labels` blank unless
   they mentioned a specific tool (e.g. Superhuman) and gave label IDs.
2. Copy `voice.md.example` to `voice.md`, replacing every placeholder with what you learned
   in Phase 3. Do not leave "[Your Name]" or generic example text in the final file.
3. Show the user both files and ask them to confirm before moving on. This is their real
   data; get explicit confirmation, don't just proceed silently.

## Phase 6: Install commands globally

Explain: "Right now these commands only work inside this project folder. I can install them
to `~/.claude/commands/` so `/cos`, `/cos-brief`, `/cos-delegate`, etc. work from any
directory, the same way your own tools do." Ask for confirmation before touching anything
outside this project folder.

If confirmed:
1. Copy every file in this project's `.claude/commands/` to `~/.claude/commands/`, keeping
   filenames identical, EXCEPT do not copy `setup-cos.md` itself again if it's already
   there (avoid clobbering an in-progress run) — actually, do copy it too, so `/setup-cos`
   itself is globally available for reconfiguration later.
2. Each copied command reads `config.yaml`/`voice.md`/`logbook/` via a path relative to
   "the project root." Since global commands can run from any directory, rewrite the
   "project root" references in the copied versions to the absolute path of THIS project
   folder (the one containing this `config.yaml`), so they always find the right config
   regardless of the user's current working directory. Do this with the Edit tool on the
   copied files only, never on the originals in this repo.
3. Confirm: "Installed. `/cos`, `/cos-brief`, `/cos-delegate`, `/cos-find-time`,
   `/cos-focus`, `/cos-followup`, `/cos-thread`, `/cos-spend`, and `/setup-cos` now work
   from any Claude Code session on this machine, pointed at this config."

If the user declines, skip this phase and note the commands still work when run from inside
this project folder.

## Phase 7: Cloud triggers

Explain: "The five scheduled routines (morning briefing, hourly pulse, end-of-day summary,
evening urgent check, weekly pattern report) are designed to run unattended on a schedule.
I can register them as scheduled cloud agents now if you want." Ask which ones they want
(list all five with their default times from `config.yaml` `schedule`), and confirm before
scheduling anything, since this creates recurring automated jobs that will act on their
real accounts.

For each trigger the user wants:
1. Confirm the schedule time/day against `config.yaml` `schedule` (adjust if they want
   something different, and update config.yaml to match).
2. Use the scheduling capability available in this Claude Code environment (the `schedule`
   skill, if present, or equivalent cron/scheduled-agent tooling) to create a recurring job
   whose prompt is: "Follow the instructions in triggers/[trigger-file].md in
   [absolute path to this project]." Use the cron expression matching the confirmed time in
   the user's configured timezone.
3. Name each scheduled job clearly, e.g. "CoS: Morning Briefing", "CoS: EOD Summary", "CoS:
   Weekly Pattern Report", so they're identifiable later in whatever scheduling UI/list the
   environment provides.
4. After creating each one, tell the user its name/ID and how to list, pause, or delete it
   later (whatever the scheduling tool's mechanism is, e.g. "run `/cos` reconfigure" or the
   platform's own schedule management command).

If no scheduling capability is available in this environment, tell the user explicitly:
"This environment doesn't expose a scheduler I can use directly. Set up an external cron job
or scheduled task that opens Claude Code and runs: claude -p 'Follow the instructions in
triggers/[trigger-file].md' from this project directory." Do not silently skip this step
without explanation.

## Phase 8: Done

Summarize what was configured:

```
**Chief of Staff setup complete**

- Identity: [name], [role] at [company]
- Priority senders: [N] configured
- Slack channels watched: [N]
- Ledger: [enabled via canvas [id] / not enabled, see docs/LEDGER.md]
- Finance tracking: [enabled / not configured]
- Jira: [enabled / not configured]
- Global commands: [installed to ~/.claude/commands/ / project-local only]
- Cloud triggers scheduled: [list, or "none, run manually via /cos"]

Try it now: run `/cos scan` for a full status check.
```

## Rules

- Never fabricate a person, email address, or channel ID. If the user doesn't know a Slack
  channel ID and no lookup tool is available, leave it blank in config.yaml with a comment
  and tell them where to find it.
- Never write config.yaml or voice.md without showing the user the result first.
- Never install anything to `~/.claude/commands/` or schedule a cloud job without explicit
  confirmation in that phase, even if the user approved earlier phases.
- If the user stops mid-interview, save nothing incomplete: don't write partial config.yaml
  or voice.md files. Ask if they want to resume or abandon.
