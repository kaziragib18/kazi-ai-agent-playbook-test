# Reading List

For every task in this repo, use the `agent-playbook` skill: follow its gates, task router and rules card, and ask me before installing anything.

- App: open `index.html` in a browser. No build, no dependencies.
- Code: `app.js` (pure data functions on top, DOM wiring below). Styles inline in `index.html`.
- Test: `node test.js` (must print `all checks passed`). Syntax check: `node --check app.js`.
- Data: `localStorage` key `reading-list` (JSON array of Book). Unreadable data is copied to `reading-list.corrupt` before being replaced.
- Render user text with `textContent` only, never `innerHTML`.
