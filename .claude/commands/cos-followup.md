---
description: "Follow up on something someone owes you or you promised"
---

Read `config.yaml` and `voice.md` from the project root. If missing, tell the user to run
`/setup-cos` first and stop.

$ARGUMENTS describes the topic or person.

1. Check `logbook/active.yaml` for a matching delegated or committed item.
2. If found and overdue, draft a follow-up message (Slack or email, matching the original
   channel) in `voice.md` tone appropriate to that person (check executive_senders/domains).
   Keep it light for a first nudge, more direct if `Nudge` is already set once.
3. If not found in the logbook, search email/Slack for the original ask to reconstruct
   context before drafting.
4. Update the logbook item's `Nudge` date, or add a new item if this is the first time it's
   being tracked.

Report:

```
**Follow-up drafted:** [person], re: [topic]
Last touched: [date] ([N] days ago)
Draft: [where it was created]
```
