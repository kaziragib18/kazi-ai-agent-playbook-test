commit:    none (not a git repo yet)            verified: 2026-10-02      method: + tests run | + browser
level:     L1
type:      frontend
flags:     ui
stack:     single static page: index.html + app.js, vanilla JS, localStorage; no host (opened locally)
src dirs:  . (index.html, app.js, test.js)
project rules that override level: dependency-free, no build step; user text rendered via textContent only

## Routing: changed path → modules
| Path glob | Modules (and item ranges) |
|---|---|
| app.js, index.html | ux perf(07,08) qa(10) |
| release candidate | all items with Lvl ≤ L1 |

## Check translations (non-JS stacks)
none yet

## Accepted exceptions
none

## Decisions (do not re-ask)
- 2026-10-02: Level L1, single user, flags `ui` only. Brief and stack (ADR 0001) approved. Delete is in the MVP.
- 2026-10-02: No deploy; the developer opens it locally.
- 2026-10-02: No new skills to install; the workflow pack and code-review are already available.
