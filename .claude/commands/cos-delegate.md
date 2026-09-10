---
description: "Delegate a task: Slack message + calendar invite + optional Jira ticket"
---

Read `config.yaml` and `voice.md` from the project root. If missing, tell the user to run
`/setup-cos` first and stop.

$ARGUMENTS should describe: what task, to whom, and by when.

1. Draft a Slack message to the person, following `voice.md` Team Mode. Clear ask, clear
   deadline, one line of context. Use the Slack draft tool if available; otherwise present
   the draft text for the user to send manually.
2. If a Jira/Atlassian connector is configured and the task warrants a ticket (not a quick
   ask), create a Jira issue with the task, assignee, and due date.
3. Add the item to `logbook/active.yaml` under `delegated`, with a sequential ID (DEL-NNN),
   the owner, the due date, and status `open`. Create the file with an empty structure first
   if it doesn't exist yet.
4. If `config.yaml` has `logbook.slack_canvas_id` set, sync the ledger DELEGATED table per
   `docs/LEDGER.md`.

Report back:

```
**Delegated:** [task] to [person], due [date]
- Slack draft: [created / sent]
- Jira ticket: [created, ID] or "not created, quick ask"
- Logged: DEL-NNN
```
