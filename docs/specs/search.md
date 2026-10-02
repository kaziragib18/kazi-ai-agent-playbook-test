# Spec: search (answers recorded 2026-10-02, awaiting approval to build)

**Gate G3 test.** No code until approved. Conflict: PRODUCT-BRIEF.md lists search under Won'ts, so approving this spec also means amending the brief.

## Problem
With many books, finding one means scrolling the whole list.

## Users
The developer only (L1, single user).

## Decisions (from the dev)
- Filter as you type, one text box above the list.
- Case-insensitive match on **title only**.
- The query **persists** across reloads (localStorage key `reading-list.query`, same try/catch handling as the list).
- Brief amendment approved: search moves out of the Won'ts.
- Delete and read-toggle keep working on the filtered view (they act on the book's id).

## Acceptance criteria
1. Typing "dune" shows only books whose title contains "dune"; clearing the box shows all.
2. A query with no match shows a "No books match" line, not a blank list.
3. Search text is never written with innerHTML (textContent only).
4. After reload the box still holds the last query and the list is filtered by it.
5. `node test.js` has a case for the pure filter function and prints `all checks passed`.

## Non-goals
Author search, sorting, tags, highlighting, fuzzy match, saved searches.

## Risks
Brief amendment needed. Existing review finding app.js:42 (duplicate ids) would make toggle/delete in a filtered view hit extra rows; fix or accept first.

## Open questions
None. Waiting for the dev's go-ahead to build.
