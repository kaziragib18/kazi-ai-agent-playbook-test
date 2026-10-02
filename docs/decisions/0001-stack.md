# 0001. Stack

**Status:** proposed, awaiting approval · 2026-10-02

## Context
Single-user L1 reading list (see `docs/PRODUCT-BRIEF.md`). Hard constraint: no dependencies. Data must persist in the browser.

## Options
| | Option | For | Against |
|---|---|---|---|
| A | **One `index.html`**: inline CSS + vanilla JS, `localStorage` | Zero dependencies, zero build, opens by double-click, trivially hostable | Everything in one file; fine at this size |
| B | Vanilla JS with a Vite dev server | Hot reload, ES module split | Adds a dependency and a build step, against the constraint |
| C | Framework (React/Svelte) | Component model | Dependencies and tooling for a ~100-line app |

Storage: `localStorage` (one JSON array under one key) over IndexedDB. A few hundred books is a few KB, well inside the ~5 MB limit, and the API is synchronous and simple.

## Decision
**Option A.** One `index.html` with native `<form>` validation (`required`), `<input type="checkbox">` for read state, and `localStorage` for persistence. Self-check: a small `test.html` with `console.assert`-style checks for the load/save logic, opened in the browser.

## Consequences
- No install, no lockfile, no CI needed at L1.
- Data is tied to one browser profile and origin; `file://` and a hosted URL hold separate lists.
- Corrupt or missing storage must fall back to an empty list, not crash.

## Exit path
If sync or multiple devices are needed later, the data is already a plain JSON array: move the save/load functions to a small backend or a hosted store without touching the UI code. If the file grows past ~300 lines, split JS and CSS into separate files (still no build step).

## Amendment, 2026-10-02
During setup the JS moved from inline in `index.html` to `app.js` (still no build step), so `test.js` can load the same functions. The self-check is `node test.js` instead of `test.html`: the developer already has Node, and that gives a one-command check.
