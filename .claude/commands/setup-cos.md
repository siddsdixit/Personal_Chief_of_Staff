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
   - Validate: all email addresses have a domain, all timezones are real IANA names, all Slack
     IDs look like U-prefixed strings (or channel IDs C-prefixed).
2. Copy `voice.md.example` to `voice.md`, replacing every placeholder with what you learned
   in Phase 3. Do not leave "[Your Name]" or generic example text in the final file.
   - Use the actual email/Slack examples they provided in Phase 3 for the Email/Slack Example
     sections. Keep their real phrasing; don't paraphrase it generic.
3. Display both files in full to the user (print to terminal/chat). Then ask explicitly:
   "Does this look right? Confirm to save, or type 'edit [section]' to fix something."
   - If they say "edit X", go back to the relevant phase and re-ask those questions
   - Don't proceed until they confirm, or they choose to abandon setup

## Phase 6: Install commands globally

Explain: "Right now these commands only work inside this project folder. I can install them
to `~/.claude/commands/` so `/cos`, `/cos-brief`, `/cos-delegate`, etc. work from any
project, the same way your own tools do. The copies will always point back to this setup."
Ask for explicit confirmation before touching anything outside this project folder.

If confirmed:
1. Ensure `~/.claude/commands/` exists. If not, create it.
2. Copy every file in this project's `.claude/commands/` to `~/.claude/commands/`, keeping
   filenames identical. Do include `setup-cos.md` so `/setup-cos reconfigure` works globally.
3. For each copied command file, rewrite any reference to "the project root" or
   "config.yaml from the repo root" to the absolute path of THIS project folder
   (e.g., `/Users/[username]/Documents/Personal_Chief_of_Staff`), so the commands always
   find the right config regardless of working directory. Use the Edit tool on the copies
   only, never on the originals in this repo.
4. Test one command manually: the setup script tries `/cos scan` as the user and reports the
   result. If it works, confirm success.
5. Confirm: "Installed. `/cos`, `/cos-brief`, `/cos-delegate`, `/cos-find-time`,
   `/cos-focus`, `/cos-followup`, `/cos-thread`, `/cos-spend`, and `/setup-cos` now work
   from any Claude Code session on this machine, always pointed at
   `/Users/[username]/Documents/Personal_Chief_of_Staff`."

If the user declines global install, skip this phase and note the commands still work when
run from inside this project folder (e.g., `claude -p 'code /cos scan'` from the project directory).

## Phase 7: Cloud triggers

Explain: "The five scheduled routines (morning briefing, hourly pulse, end-of-day summary,
evening urgent check, weekly pattern report) are designed to run unattended on a schedule.
I can register them as scheduled cloud agents now if you want." List all five with their
default times from `config.yaml` `schedule`. Ask which ones they want, and confirm before
scheduling anything, since this creates recurring automated jobs that act on their real
accounts.

For each trigger the user selects:
1. Confirm the schedule time/day against `config.yaml` `schedule`. If they want a different
   time, ask them to update it in config.yaml and re-run `/setup-cos triggers`.
2. Check if this Claude Code environment has a scheduling capability available (e.g. the
   `schedule` skill, or a cloud-agent runner). If not, skip to the "no scheduler" fallback
   below.
3. Use the scheduling tool to create a recurring job. The job should run the following
   prompt at the confirmed time in the user's timezone:
   "Follow the instructions in [absolute path to this project]/triggers/[trigger-file].md"
4. Name each job clearly: "CoS: Morning Briefing", "CoS: Hourly Pulse", "CoS: EOD Summary",
   "CoS: Evening Urgent Check", "CoS: Weekly Pattern Report", so the user can identify and
   manage them later.
5. After creating each job successfully, report its name and ID.

If a scheduling capability is available, list all created jobs and how to manage them
(pause, delete, edit time) using that tool's commands. Then skip the fallback below.

**If no scheduling capability is available:** Tell the user explicitly:
"This Claude Code environment doesn't have a scheduler I can access directly. To run these
triggers unattended, you'll need to set them up via an external tool:

- **macOS/Linux cron**: Add entries to your crontab:
  ```
  0 7 * * * claude -p 'Follow the instructions in /Users/[your-user]/Documents/Personal_Chief_of_Staff/triggers/cos-morning.md'
  47 17 * * * claude -p 'Follow the instructions in /Users/[your-user]/Documents/Personal_Chief_of_Staff/triggers/cos-eod.md'
  ```

- **GitHub Actions**: Fork this repo and create workflows in `.github/workflows/` that
  trigger at the times you want and run the Claude Code commands

- **Other CI/CD**: Deploy to Jenkins, CircleCI, etc., using similar patterns

- **Manually for now**: Run `/cos` from the project folder yourself until you set up a
  scheduler

See SETUP.md 'Cloud Triggers' section for more details."

Do not silently skip this step. The user should know whether triggers are scheduled or not.

## Phase 8: Done

Summarize what was configured:

```
**Chief of Staff setup complete**

Identity: [name], [role] at [company]
- Email: [email]
- Timezone: [timezone]
- Slack: [enabled, [N] channels / not enabled]

People & org:
- Manager: [name + email] (executive tone)
- Peers: [N] configured (team tone)
- Direct reports: [N] configured

Tools:
- Finance tracking: [enabled (Ramp, thresholds: $X / $Y) / not configured]
- Jira: [enabled (project: [KEY]) / not configured]
- Ledger: [enabled (Slack canvas [ID]) / not configured, see docs/LEDGER.md for local fallback]

Installation:
- Global commands: [installed to ~/.claude/commands/ / project-local only]
- Cloud triggers: [list: "Morning Briefing (7:00 AM)", "EOD Summary (5:45 PM)", etc. / none scheduled, set up manually or via cron/GitHub Actions]

Next steps:
1. Try it now: `/cos scan` (reads your calendar, email, Slack for a status check)
2. Let it run for a few days, then check: `/cos check logbook` (any overdue items?)
3. If cloud triggers are scheduled: check that the morning briefing DM arrives tomorrow at 7:00 AM
4. If not scheduled: you can run `/cos` manually, or set up cron/GitHub Actions per Phase 7 instructions

Questions? See SETUP.md or README.md.
```

## Rules

- Never fabricate a person, email address, or channel ID. If the user doesn't know a Slack
  channel ID and no lookup tool is available, leave it blank in config.yaml with a comment
  and tell them where to find it.
- Never write config.yaml or voice.md without showing the user the full result first and
  asking for explicit confirmation.
- Never install anything to `~/.claude/commands/` or schedule a cloud job without explicit
  confirmation in that phase, even if the user approved earlier phases. These have
  side-effects outside this project.
- If the user stops mid-interview, save nothing incomplete: don't write partial config.yaml
  or voice.md files. Ask if they want to resume, edit a specific section, or abandon setup.
- Validate data before writing: email addresses should have a domain, timezones should be
  IANA format (e.g. "America/New_York", not "EST"), Slack IDs should be U- or C-prefixed.
- If Phase 5 generation produces generic or empty voice.md sections, reject it and ask the
  user for better examples (at least 100 chars of real writing, with some personality).
