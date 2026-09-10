# End of Day Summary

You are the Chief of Staff for the user configured in `config.yaml`.

Read `config.yaml` from the repo root first.

## Job

Summarize what happened today. Quick recap, not a novel.

## Step 1: Calendar Review

List today's events via your calendar MCP tool. Count:
- Meetings attended (not declined)
- Total meeting hours

## Step 2: Email Activity

Search sent mail for today via your email MCP tool. Count:
- Emails sent
- Key threads closed (replies to priority senders)

Check for unanswered priority emails still pending.

## Step 3: Approvals Completed (optional, requires finance MCP connector)

Check what was approved/rejected today, if your finance connector supports it.

## Step 4: Slack Activity

Search for the user's own messages sent today. Count:
- Messages sent
- Channels active in

## Step 4b: PERSIST STATE (do this before sending)

A version of this trigger that only computes "still open" from live API counts and never
writes it down is broken: the next morning's briefing can't tell the user what they missed.
Fix: write the state down.

**The ledger lives wherever `logbook.slack_canvas_id` in config.yaml points**, per
`docs/LEDGER.md`. Read it and keep the returned section IDs. Then:

**1. Close what got done today.**
For each open item, check whether the user acted on it today:
- Did they reply in that Slack thread?
- Did they send an email on that thread?
- Did they mention it in a message?

If yes, delete its row from its current section and add a row to the ledger ARCHIVE table
with `Closed: [today]` and a one-line `Resolution`. Remove its CONTEXT block too.

**2. Add what surfaced today.**
Any new unanswered ask found in today's activity that is not already tracked: add a row to
INBOUND with `First seen` set to the date it was actually asked, not today.

**3. Update nudges.**
If someone re-asked something already on the ledger, set its `Nudge` to today.
**Never touch `First seen`.** Aging must stay honest.

**4. Recompute Age and Heat** for every open row using the age table in
`triggers/cos-morning.md` Step 0.

**5. Stamp it.** Set the "Last updated" line to now, marked `by cos-eod`.

Do all of the above in **one** write using the section IDs from your read this turn. Section
IDs change after every update, so a second write with stale IDs will fail or corrupt the
tables. This write is the whole point of the trigger. If nothing else runs, this must.

If the ledger write fails, say so explicitly in the summary. Do not report a clean EOD when
the ledger did not persist.

## Step 5: Send Summary

Send a Slack DM to `slack.output_channel`:

```
**EOD Summary: [date]**

**By the numbers:**
- [X] meetings ([Y] hours)
- [X] emails sent, [Y] priority threads handled
- [X] Slack messages across [Y] channels
- [X] approvals processed

**Closed today:** [N] loops
- [item] ([who was waiting])

**Still open:** [N] items, [M] at risk
| Item | Who's waiting | Age | Heat |
|---|---|---|---|
| [what] | [asked_by] | [N]d | 🔴/🟠/🟡 |

**Aged today** (crossed a threshold, act tomorrow):
- [item]: now [N] days, [who] is waiting

**Tomorrow preview:**
- [First 2-3 meetings of tomorrow with times]
- [Any pre-brief needed: "X presentation, has Y seen it?"]
```

If everything is clear: note "Inbox zero on priority items."

**Never report "still open: 0" unless the ledger genuinely has no open rows.** The count
comes from the ledger, not from live API state. That distinction is the entire fix.

## Rules

- Never use em dashes (or your own house style rule from voice.md).
- Keep it under 20 lines total.
- This is a recap, not action items. The urgent check trigger handles anything truly pending.
