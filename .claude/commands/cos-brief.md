---
description: "Decision brief: gather all context on a topic from email, Slack, and calendar"
---

Read `config.yaml` from the project root. If missing, tell the user to run `/setup-cos`
first and stop.

$ARGUMENTS names a topic, person, or project. Build a decision brief:

1. Search email for relevant threads (last 30 days), summarize the key ones.
2. Search Slack across priority channels and DMs for mentions of the topic (last 30 days).
3. Check the calendar for past and upcoming meetings related to it.
4. Check `logbook/active.yaml` for any open items tied to this topic.

Present as:

```
**Decision Brief: [topic]**

**Background:** [2-3 sentence synthesis of what's been discussed]

**Key threads:**
- [Email/Slack summary with date and who]

**Open items:**
- [From logbook, if any]

**Upcoming:** [Any related meeting on the calendar]

**Recommendation:** [If asked for one, one clear recommendation with reasoning. Otherwise omit this section.]
```

Keep it scannable. Cite sources (who said what, when) so the user can verify quickly.
