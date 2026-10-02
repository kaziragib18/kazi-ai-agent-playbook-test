# Product brief: Reading List

**Status:** draft, awaiting approval (Phase 0, step 1) · 2026-10-02

## Persona
One person (the developer) keeping track of books they want to read and have read.

## Problem and today's workaround
Book titles get lost in notes apps, chats and screenshots. Today's workaround is a notes file with no "read" state.

## Core value loop
Open the page → add a book (title + author) → later, tick it as read. The list is still there next time.

## MVP must-haves
1. Add a book with a title and an author (both required, whitespace trimmed).
2. See all books, newest first.
3. Mark a book as read, and unmark it (a checkbox).
4. The list persists in this browser (`localStorage`) across reloads and restarts.

## Won'ts (MVP)
- Accounts, sync, sharing, or a server.
- Edit, search, sort options, tags, ratings, notes, cover images, ISBN lookup.
- Import/export.
- Any build step or dependency.

## Success metric
The developer uses it for 2 weeks to track every book they start or finish, with zero lost entries.

## Constraints
- Dependency-free: plain HTML, CSS and JavaScript, no build step.
- Must work in a current desktop browser opened from a local file or any static host.
- Data lives only in that one browser profile; clearing site data clears the list (accepted at L1).

## Monetization
None.

## Level and flags
- **Level:** L1 (prototype, single user, no real user data beyond the developer's own).
- **Flags:** `ui`. Not `public`, `auth`, `db` or `api`.

## Open questions
- Delete a book: in or out of the MVP? (Default: **in**, one button per row, since a typo otherwise lives forever.)
