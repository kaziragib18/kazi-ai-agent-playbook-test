2026-10-02 | UX-01 | FAIL | L1 | raw colour #c00 at index.html:18, no token file | paths: index.html | owner: -
2026-10-02 | OPS-01 | FAIL | L1 | no README; setup/run/test live only in CLAUDE.md | paths: README.md | owner: -
2026-10-02 | SEC-01 | PASS | L1 | .gitignore:1-2 lists .env; `git ls-files '.env*'` empty; secret regex finds none in app.js, index.html, test.js | paths: .gitignore, app.js, index.html | verified
2026-10-02 | QA-01 | PASS | L1 | CLAUDE.md:5-6 documents "open index.html" and "node test.js" | paths: CLAUDE.md | verified
2026-10-02 | QA-02 | PASS | L1 | `node --check app.js` ok; `node test.js` prints all checks passed | paths: app.js, test.js | verified
2026-10-02 | UX-02 | PASS | L1 | app.js:65-68 reuses the createElement rendering pattern | paths: app.js | verified
2026-10-02 | PERF-01 | N/A | L1 | no build step (profile project rule) | paths: - | -
2026-10-02 | SEC-02 | N/A | L1 | no server and no env vars; static page | paths: - | -
2026-10-02 | SEC-30 | N/A | L1 | no request handlers | paths: - | -
