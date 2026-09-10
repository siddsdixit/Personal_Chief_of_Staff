# Ledger Spec (shared by all Chief of Staff triggers)

The ledger is what gives this system memory across scheduled runs. Without it, your 9am
briefing and your 5pm summary don't share any state, and "what did I miss" has no honest
answer.

## Default: a Slack canvas

If you use Slack, the ledger lives in a Slack canvas. Cloud-scheduled triggers cannot reach
your local filesystem, so the canvas is the single source of truth, not any local YAML file.

Set `logbook.slack_canvas_id` in `config.yaml` once you've created the canvas (create an
empty canvas in Slack, copy its ID from the canvas URL or the Slack API).

Read with your Slack MCP connector's canvas-read tool. Write with its canvas-update tool,
using a "replace" action; canvases don't support partial patches, so every write reads first,
merges your changes, and writes the whole document back.

## Without Slack

If you don't use Slack, point `logbook.slack_canvas_id` at a local file instead (e.g.
`logbook/ledger.md`) and adjust the "read with / write with" instructions in each trigger
file (`triggers/cos-morning.md`, `triggers/cos-eod.md`) to use Read/Edit on that file instead
of canvas tools. The rest of the spec below is unchanged. The tradeoff: local-only triggers
can't run from a cloud scheduler, only from commands you run yourself in Claude Code.

## Rules that make aging honest

- **`First seen` is never edited.** Age is computed from it. If you rewrite it, the ledger
  lies to you.
- **`Nudge`** = last time the asker followed up. Blank if never. If Nudge is later than First
  Seen, the item is displayed with "(asked twice)".
- **Nothing is deleted without a resolution.** Move it to ARCHIVE with a one-line reason.
  "Deprioritized, told them" is a valid resolution. Silence is not.
- **Always read before writing.** A replace-style write overwrites everything. Read, merge
  your changes, write the whole thing back, in one call. Two separate writes in the same
  trigger run risk the second write using stale section state and corrupting the document.
- Heat from age: 0-2d = ok, 3-6d = warm, 7-13d = hot, 14+d = at risk.

## Canonical format

Reproduce this structure. Keep the ID prefixes (IN/CMP/SYS/DEL/CMT/DEC).

```
# CHIEF OF STAFF LEDGER
Last updated: [YYYY-MM-DD HH:MM] by [trigger name]

## INBOUND — someone is waiting on you
| ID | What | Who | First seen | Nudge | Age | Heat |
|---|---|---|---|---|---|---|

## COMPLIANCE — process items, low effort, high optics
| ID | What | First seen | Nudge | Age | Heat |
|---|---|---|---|---|---|

## SYSTEMIC — recurring, needs a structural fix not a daily nag
| ID | What | First seen | Age | Heat |
|---|---|---|---|---|

## DELEGATED — you're waiting on others
| ID | What | Owner | Due | Status |
|---|---|---|---|---|

## COMMITTED — you owe someone
| ID | What | For whom | Due | Status |
|---|---|---|---|---|

## DECISIONS — durable record
| ID | What | Date | Who |
|---|---|---|---|

## ARCHIVE — closed, with resolution
| ID | What | Who | Closed | Resolution |
|---|---|---|---|---|

## CONTEXT
Longer background for open items. One block per ID.

**IN-001** — one or two sentences of background on why this item matters and what closes it.
```

## Which triggers touch this

| Trigger | Reads | Writes |
|---|---|---|
| cos-morning | yes (Step 0) | yes (heat refresh, new asks from unanswered-ask detection) |
| cos-eod | yes | yes (close done items, add new, update nudges, recompute heat) |
| cos-patterns (weekly) | yes | no, writes its report as a DM only |
| cos-week | yes | no |

Only morning and end-of-day write. If both somehow run at once, last writer wins, which is
why each reads immediately before writing.
