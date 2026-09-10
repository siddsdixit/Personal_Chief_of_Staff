---
description: "Spending overview: recent transactions, pending approvals, anomalies"
---

Read `config.yaml` from the project root. Requires a finance MCP connector (e.g. Ramp). If
not configured, tell the user this command needs the `ramp` block in config.yaml and a
finance MCP connector, and stop.

1. Pull recent transactions (last 30 days) and pending approvals/reimbursements/bills.
2. Flag anything over `ramp.alert_threshold`.
3. Flag anything in `ramp.flag_categories` for a closer look.
4. Note anything under `ramp.auto_approve_below` as low-risk.

Present:

```
**Spend overview: last 30 days**

**Pending approvals:** [count], $[total]
| Type | From | Amount | Category | Flag |
|---|---|---|---|---|

**Recent activity:** [1-2 line summary, notable transactions only]
```
