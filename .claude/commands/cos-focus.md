---
description: "Find and book focus time blocks on your calendar"
---

Read `config.yaml` from the project root. If missing, tell the user to run `/setup-cos`
first and stop.

Scan the next 5 business days for gaps of at least `calendar.focus_time.min_block_hours`
(config.yaml), preferring `preferred_times` and `preferred_days`.

Present candidates:

```
**Focus time candidates:**
| Day | Time | Length |
|---|---|---|
```

If $ARGUMENTS specifies a day or asks to book directly, create a calendar event titled
"Focus Time" (or a title the user specifies) for the best matching slot. Otherwise, ask
which slot to book.
