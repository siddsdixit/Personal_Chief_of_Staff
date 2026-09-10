---
description: "Find mutual availability with people"
---

Read `config.yaml` from the project root. If missing, tell the user to run `/setup-cos`
first and stop.

$ARGUMENTS names one or more people and, optionally, a timeframe (default: next 5 business
days) and duration (default: `calendar.meeting_duration_preference` from config.yaml).

1. Look up the user's own calendar for busy blocks in the timeframe.
2. If your calendar MCP tool supports free/busy lookup for other calendars (internal
   colleagues on the same Google Workspace/Microsoft 365 tenant), use it. Otherwise, ask the
   user for the other person's availability or suggest times and let them confirm.
3. Prefer `calendar.preferred_times` / `preferred_days` from config.yaml when multiple slots
   work equally well.

Present:

```
**Mutual availability: [people]**
| Day | Time | Duration |
|---|---|---|

Suggested: [best option and why]
```

If the user confirms a slot, create the calendar event with a clear, outcome-oriented title
per `voice.md` Calendar Meeting Style.
