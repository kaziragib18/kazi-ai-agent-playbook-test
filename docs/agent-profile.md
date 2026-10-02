commit:    1b1cfae            verified: 2026-10-02      method: + tests run | + browser | + gg
level:     L2
type:      frontend
flags:     ui
stack:     single static page: index.html + app.js, vanilla JS, localStorage; no host (opened locally)
src dirs:  . (index.html, app.js, test.js)
project rules that override level: dependency-free, no build step; user text rendered via textContent only

## Routing: changed path → modules
| Path glob | Modules (and item ranges) |
|---|---|
| app.js, index.html | ux perf(07,08) qa(10) |
| release candidate | all items with Lvl ≤ L2 |
| .github/workflows | ops (CI runs node --check and node test.js on pull_request) |

## Check translations (non-JS stacks)
none yet

## Accepted exceptions
none

## Decisions (do not re-ask)
- 2026-10-02: Level raised L1 -> L2 for the readiness test (still single user, no real deploy).
- 2026-10-02: Level L1, single user, flags `ui` only. Brief and stack (ADR 0001) approved. Delete is in the MVP.
- 2026-10-02: No deploy; the developer opens it locally.
- 2026-10-02: No new skills to install; the workflow pack and code-review are already available.
