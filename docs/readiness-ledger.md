2026-10-02 | UX-01 | PASS | L1 | only raw colour is the --error token at index.html:9; #status uses var(--error) | paths: index.html | verified
2026-10-02 | OPS-01 | PASS | L1 | README.md documents run, test, data, deploy in 7 lines | paths: README.md | verified
2026-10-02 | SEC-01 | PASS | L1 | .gitignore:1-2 lists .env; `git ls-files '.env*'` empty; secret regex finds none in app.js, index.html, test.js | paths: .gitignore, app.js, index.html | verified
2026-10-02 | QA-01 | PASS | L1 | CLAUDE.md:5-6 documents "open index.html" and "node test.js" | paths: CLAUDE.md | verified
2026-10-02 | QA-02 | PASS | L1 | `node --check app.js` ok; `node test.js` prints all checks passed | paths: app.js, test.js | verified
2026-10-02 | UX-02 | PASS | L1 | app.js:65-68 reuses the createElement rendering pattern | paths: app.js | verified
2026-10-02 | PERF-01 | N/A | L1 | no build step (profile project rule) | paths: - | -
2026-10-02 | SEC-02 | N/A | L1 | no server and no env vars; static page | paths: - | -
2026-10-02 | SEC-30 | N/A | L1 | no request handlers | paths: - | -
2026-10-02 | SEC-32 | PASS | L2 | `gg 'innerHTML|eval(' app.js index.html test.js` no hits; user text via textContent (app.js render) | paths: app.js, index.html | verified
2026-10-02 | SEC-39 | PASS | L2 | no console.* calls in app.js, index.html | paths: app.js | verified
2026-10-02 | QA-03 | PASS | L2 | pure functions covered in test.js; fixes 2631a73 and 1b1cfae each shipped a test that failed first | paths: test.js | verified
2026-10-02 | PERF-07 | PASS | L2 | query write debounced 200ms, render stays immediate (app.js:133-138); was FAIL, fixed same day | paths: app.js | verified
2026-10-02 | QA-06 | N/A | L2 | no fetch/XHR/WebSocket, no external services | paths: - | -
2026-10-02 | SEC-37 | N/A | L2 | no server, no CORS headers | paths: - | -
2026-10-02 | SEC-38 | N/A | L2 | no server responses; no err.stack usage | paths: - | -
2026-10-02 | SEC-03 | N/A | L2 | no env vars | paths: - | -
2026-10-02 | OPS-02 | N/A | L2 | no deploy by decision (profile); README says local use only | paths: README.md | -
2026-10-02 | OPS-04 | N/A | L2 | no host, no quotas | paths: - | -
2026-10-02 | OPS-05 | N/A | L2 | no backend or DB | paths: - | -
2026-10-02 | LEG-02 | N/A | L2 | titles and authors stay in the browser; nothing collected or sent | paths: - | -
