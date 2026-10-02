# Spec: search (DRAFT, awaiting approval)

**Gate G3 test.** No code until approved. Conflict: PRODUCT-BRIEF.md lists search under Won'ts, so approving this spec also means amending the brief.

## Problem
With many books, finding one means scrolling the whole list.

## Users
The developer only (L1, single user).

## Proposed defaults (answer the open questions to change them)
- Filter as you type, one text box above the list.
- Case-insensitive match on title OR author.
- Not persisted: the box is empty after reload.
- Delete and read-toggle keep working on the filtered view (they act on the book's id).

## Acceptance criteria
1. Typing "dune" shows only books whose title or author contains "dune"; clearing the box shows all.
2. A query with no match shows a "No books match" line, not a blank list.
3. Search text is never written with innerHTML (textContent only).
4. `node test.js` has a case for the pure filter function and prints `all checks passed`.

## Non-goals
Sorting, tags, highlighting, fuzzy match, saved searches.

## Risks
Brief amendment needed. Existing review finding app.js:42 (duplicate ids) would make toggle/delete in a filtered view hit extra rows; fix or accept first.

## Open questions
1. Filter as you type, or on submit?  2. Title only, or title and author?  3. Persist the query?  4. Approve amending the brief?
