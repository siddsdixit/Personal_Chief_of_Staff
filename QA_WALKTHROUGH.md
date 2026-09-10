# /setup-cos QA Walkthrough

Before pushing to GitHub, manually test `/setup-cos` with this walkthrough. It simulates a
real user going through the setup for the first time.

## Prerequisite

Open the `Personal_Chief_of_Staff` folder in Claude Code:

```bash
claude-code /Users/sdixit/Documents/Personal_Chief_of_Staff/
```

## Test Scenario: Fresh Setup, All Features

Run: `/setup-cos`

The command should detect that `config.yaml` and `voice.md` don't exist (they're templates
only) and proceed with the interview.

### Phase 1: Identity and org basics

Expected: asks for name, role, company, timezone, email, Slack preference.

Answers to provide:
```
Name & role: Alex Morgan, Director of Engineering
Company: TechCorp Inc
Timezone: America/New_York
Email: amorgan@techcorp.example
Slack: yes
Slack member ID: U12345678
Slack output channel: U12345678 (DM to self)
```

✓ Check: all answers are simple, one question at a time (not a giant form)

### Phase 2: People who matter

Expected: asks for manager, peers, direct reports, channels, keywords.

Answers to provide:
```
Manager: Sarah Chen, schen@techcorp.example
Executive domain: techcorp.example (so anything from techcorp gets exec tone)
Peers: Pat Lee (CPO), pat@techcorp.example | Alex Patel (CFO), apatel@techcorp.example
Direct reports: Jordan Kim, jkim@techcorp.example | Casey Rodriguez, crodriguez@techcorp.example
Cross-functional: Morgan Taylor (Head of Sales), mtaylor@techcorp.example
Slack channels: leadership | engineering | product-collab (let it look up IDs if possible)
Urgent keywords: keep defaults (outage, blocker, urgent, escalation)
```

✓ Check: all emails have a domain, no malformed entries

### Phase 3: Voice

Expected: asks for writing samples, hard rules, tone description.

Answers to provide:
```
Email sample:
"We need to lock down the Q4 roadmap by EOW. Jordan to consolidate feedback from each
team and send a summary by Wednesday. Let me know if you hit blockers."

Slack sample:
"Quick update on the incident. Platform team has a fix in staging, QA testing it now,
production rollout EOD."

Hard rules: no exclamation points, no em dashes, always sign emails with initials only

Tone: direct operator, faster for exec, more context for team, diplomatic for external
```

✓ Check: voice.md uses the ACTUAL samples (not paraphrased into something generic)

### Phase 4: Optional integrations

Expected: asks about finance, Jira, ledger.

Answers to provide:
```
Finance: yes
  Auto-approve threshold: 500
  Alert threshold: 10000

Jira: yes
  Project key: ENG

Ledger: yes (Slack canvas)
  If it can create one: let it
  If it needs a manual ID: provide a fake one or skip
```

✓ Check: config.yaml includes ramp and jira blocks (not removed)

### Phase 5: Write the files

Expected: displays both config.yaml and voice.md in full, asks "does this look right?"

✓ Check all of:
- config.yaml is valid YAML (no syntax errors)
- All priority_senders have valid emails
- voice.md includes the actual email/Slack samples you provided
- voice.md has the specific hard rules (no exclamation points, etc.)
- No placeholder text like "[Your Name]" remains
- Slack channel names are present (leadership, engineering, product-collab)
- ramp: { auto_approve_below: 500, alert_threshold: 10000 }
- jira: { project_keys: ["ENG"] }

Say: "confirm"

✓ Check: both files are written to disk and .git status shows them as untracked (gitignore working)

### Phase 6: Install commands globally

Expected: explains the global install, asks for confirmation.

Say: "yes, install"

✓ Check all of:
- `~/.claude/commands/` exists (it should create it if missing)
- All 9 command files are copied: cos.md, cos-brief.md, cos-delegate.md, cos-find-time.md,
  cos-focus.md, cos-followup.md, cos-thread.md, cos-spend.md, setup-cos.md
- The copied files have the absolute path to this project folder rewritten in them
  (search for "/Users/sdixit/Documents/Personal_Chief_of_Staff" in the copies)
- It tries `/cos scan` to verify; should return a brief summary (calendar + email + Slack)

### Phase 7: Cloud triggers

Expected: lists the five triggers with default times, asks which to schedule.

Say: "all five" (or just confirm if it defaults to all)

✓ Check one of:
- If a `schedule` skill is available: confirms trigger names ("CoS: Morning Briefing", etc.)
  and lists how to manage them (pause, delete, etc.)
- If NO scheduler is available: explicitly states "no scheduler available" and gives cron/
  GitHub Actions fallback instructions. Does NOT silently skip.

### Phase 8: Done

Expected: detailed summary with next steps.

✓ Check:
- Lists identity (name, role, company, email, timezone, Slack status)
- Lists # of people configured
- Lists tools (finance thresholds, Jira project, ledger status)
- Lists installation status (global commands yes/no)
- Lists triggers (which ones scheduled, or "none, manual")
- Gives three clear next steps (try `/cos scan`, check logbook tomorrow, verify morning brief)

## Test Scenario: Reconfigure existing setup

Run: `/setup-cos reconfigure`

Expected: detects config.yaml and voice.md exist, asks to overwrite.

Say: "yes, reconfigure"

Then:
- Provide different data (e.g., different timezone, different manager)
- Confirm Phase 5 shows the new data
- Files should be updated

✓ Check: git diff shows both config.yaml and voice.md changed with new values

## Test Scenario: Minimal setup (no optional integrations)

Run: `/setup-cos` (fresh, or `/setup-cos reconfigure`)

In Phase 4, answer:
```
Finance: no
Jira: no
Ledger: no
```

✓ Check:
- config.yaml omits `ramp` block entirely (not present, not empty)
- config.yaml omits `jira` block entirely
- config.yaml `logbook.slack_canvas_id` is left blank
- Phase 8 summary correctly reports these as "not configured"

## Test Scenario: Minimal voice examples (should be rejected)

In Phase 3, provide:
```
Email sample: "OK"
Slack sample: "got it"
```

Expected: setup should reject these as too generic/short and ask for better examples
(at least 100 chars of real writing, with some personality).

✓ Check: it doesn't accept one-word answers; loops back to Phase 3

## Test Scenario: Global commands work from different directory

After Phase 6 (global install):

```bash
cd /tmp  # Different directory, nowhere near the project
claude-code -p "/cos scan"
```

Expected: `/cos scan` still works, reads from the installed project's config.yaml and voice.md

✓ Check: the scan output uses the real data (manager name, company, etc.) not defaults

## Test Scenario: Config.yaml has invalid data

During Phase 5, if the setup script generated:

```yaml
user:
  timezone: "EST"  # Invalid IANA format
  email: "amorgan@"  # Missing domain
```

Expected: setup should reject this and ask you to fix it, or loop back to ask the question again.

✓ Check: it validates before writing; doesn't silently write bad config

## Sign-off

Once all scenarios pass:

- [ ] Fresh setup completes without errors
- [ ] config.yaml is valid YAML, readable by the project
- [ ] voice.md uses real examples, not placeholders
- [ ] Global commands are installed and work from different directories
- [ ] Cloud triggers are scheduled (or fallback instructions given clearly)
- [ ] Minimal setup omits optional blocks
- [ ] Reconfigure detects existing setup and updates correctly
- [ ] Generic voice examples are rejected
- [ ] Invalid config data is caught

Then it's safe to push to GitHub.
