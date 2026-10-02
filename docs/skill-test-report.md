# agent-playbook v4.0.0: test report

Date: 2026-10-02 · Target: Reading List repo (L1, flag `ui`, not a git repo) · Tested in a scratch copy; this project's code was not modified.

## Verdict

**The skill's core flow works. Its tooling assumes a git repo, so in this repo the check scripts do not run.** The gates are clear and cheap to follow, but two of the three scripts a check run depends on break here.

## Results

| # | Test | Result | Evidence |
|---|---|---|---|
| 1 | Skill installs and loads | PASS | `kazi-ai-agent-playbook:agent-playbook` listed and loaded from plugin cache v4.0.0 |
| 2 | Router: opened only the files the task needed | PASS | B3, skill-registry §Preflight, B10, B6, ux/perf/qa grep. No other modules read |
| 3 | G1 Done-when written before the first edit | PASS | 3-part check stated, then edit made |
| 4 | G5 Evidence before claims | PASS | `node --check` + `node test.js` printed `all checks passed`; browser showed `2 books, 1 read, 1 to read` |
| 5 | Preflight profile freshness check (B3 step 0) | FAIL (tooling) | Rule uses `git diff <commit>..HEAD`; profile commit is `none`, so it cannot be evaluated |
| 6 | `scripts/recon.sh` | FAIL (tooling) | Prints `fatal: not a git repository`; detects no flags, source dirs or tests for this app |
| 7 | `scripts/gg.sh` (all Checks run through it) | FAIL (tooling) | Wraps `git grep`; exits 128 in a non-git folder, so no Check runs verbatim |
| 8 | Check translation to this stack | PARTIAL | Plain `grep` fallback worked. UX-01 globs (`*.tsx`, `*.vue`...) never match `.html`/`.js`; profile says "Check translations: none yet" |
| 9 | Level filtering | PASS | Profile routes `perf(07,08) qa(10)`, but PERF-08 and QA-10 are L3, so they drop out at L1 as designed |
| 10 | G3 spec-before-code (dry run) | PASS | Brief's Won'ts list search/edit/sort; a request for any of them means align, then spec, then approval. No code written |
| 11 | G4 ask before installs (dry run) | PASS | Nothing installed. The only side process was a local Python static server, stopped afterwards |
| 12 | Browser verification of UI | PASS with workaround | Playwright MCP blocks `file:` URLs; used `localhost` static server |

## Checks run (L1, routed to app.js)

PASS 1 · FAIL 1 · N/A: all L2+ items · UNKNOWN 0

- UX-02 PASS: change reuses the existing `createElement` rendering pattern; no new component.
- UX-01 FAIL (pre-existing, not from this change): `index.html:18` raw colour `#c00`; there is no token file. Ledger it, do not fix inside this diff (B3 step 4).

## Issues found in the skill

1. **Non-git projects are unsupported.** `recon.sh`, `gg.sh` and the freshness check all need git. Suggested fix: fall back to `grep -rnIE` when `git rev-parse` fails, and treat profile commit `none` as "stale, re-run recon".
2. **Checks are written for React/Next stacks.** UX-01 only globs `tsx/jsx/vue/svelte`. Suggested fix: add `*.html *.css *.js` to the globs or ship a vanilla-JS translation row.
3. **Profile routing lists items above the project level** (PERF-08, QA-10 at L1). Harmless, but it invites wasted reads.
4. **No ledger was created.** B6 makes `docs/readiness-ledger.md` the only status store; the UX-01 finding has no home until one exists. Create it only on your say-so.

## Limits of this test

- I loaded the skill by hand. I did not confirm that it auto-triggers on a normal prompt.
- G3 and G4 were dry runs on hypothetical requests. They are not proven under a real request from you.
- Not exercised: Phase 0 (new product), launch, handoff (B7), hooks/CI (B12), and the L2+ modules.
- Context7 is unauthenticated, so the "library docs" capability falls back to the skill's stated fallback.

## Retest: v4.0.1 ("Make playbook scripts work without git")

The remote repo is at commit `1025627` (v4.0.1). The copy installed in Claude Code is still v4.0.0 (`ce47aba`), so I ran the v4.0.1 scripts straight from a scratch clone. They only read files.

| Earlier failure | v4.0.1 result |
|---|---|
| 5. Freshness check needs `git diff` | FIXED: B3 now has a non-git rule (`find ... -newer docs/agent-profile.md`) and a non-git routing rule |
| 6. `recon.sh` errors, finds nothing | FIXED: no error, detects flag `ui`, source dir `.`, 1 test file, and says "not a git repo (fine)" |
| 7. `gg.sh` exits 128 | FIXED: falls back to `grep -rnIE`, skips node_modules/.git/dist etc., turns `'*.ext'` args into `--include` filters |
| 8. UX-01 globs miss html/js | FIXED: now includes `*.js *.ts *.html *.astro`; it found `index.html:18 #c00` as expected |
| 3. Profile lists L3 items at L1 | FIXED in the template note only; this project's `agent-profile.md` still lists them |

Not yet verified: installing v4.0.1 through the plugin manager. It needs a local plugin update (`/plugin` → update, or reinstall), then a restart so the session picks it up.

New observations: `gg` with no match exits 1 (normal grep behaviour, so a "no hits" result reads as a non-zero exit); `.claude` and `.playwright-mcp` are excluded from non-git searches, which is correct.

Correction to my earlier note: the browser test left `.playwright-mcp/` (4 snapshot files) in this project. I removed it. Nothing else outside `docs/skill-test-report.md` was added by the test.

## Full test: v4.0.1 (from the repo clone), all areas

Installed in Claude Code is still v4.0.0; everything below ran against the v4.0.1 clone. Tested on a scratch copy, once as a non-git folder and once as a git repo.

| Area | Result | Evidence / gap |
|---|---|---|
| Install / version | PARTIAL | v4.0.0 active; v4.0.1 needs `/plugin` update + restart |
| Skill selection | PASS (config) with 2 gaps | Registry resolves against this session: workflow pack, `code-review`, `security-review`, `simplify`, ponytail, codebase-memory, Explore, Playwright, `claude-api`, `impeccable`, `ui-ux-pro-max`, `dataviz` are all listed. Missing, each with a stated fallback: `grill-me`, `to-spec`, `domain-modeling`, `handoff`, `retro`, `research`, `improve-codebase-architecture`, `gh` CLI; context7 and Figma need authorization. **Gap A:** the budget says at most ONE style preset, but this session has six installed (design-taste-frontend, minimalist-ui, high-end-visual-design, industrial-brutalist-ui, gpt-taste, stitch-design-taste) and the playbook has no step that flags over-installation. **Gap B:** registry does not mention that Playwright MCP blocks `file:` URLs |
| Token optimization | PASS (docs + scripts) | SKILL.md is 7.3 KB (~1.8k tokens); a task loads SKILL.md + 1-3 references, never all 73 KB. `gg` excludes dependency/build/cache dirs. Not exercised: Explore-agent sweeps (rule 7), ledger skip rule (rule 13) |
| Security module | PASS | Clean app: no real hits (one doc mention of `innerHTML` in CLAUDE.md, so scope `$SRC` to source). Planted `sk_live_` key, `.env`, `innerHTML`, `eval`, token in localStorage: **5 of 5 caught** (SEC-01, 02, 15, 32) |
| Code review | PARTIAL | Applied the B10 step 8 procedure by hand to the planted diff: 5 findings mapped to module IDs, and the spec axis found no matching requirement. I did not run the `code-review` or `security-review` skills |
| Grill-me | UNTESTED | Not installed. Config verified: registry lists `superpowers:brainstorming` as an alternative, fallback is a numbered question list in one batch (B5/B10). Not run on a live request |
| Plan / spec | PARTIAL | `superpowers:brainstorming` and `writing-plans` are listed; B10 steps 1-4 and B2 are clear. Existing docs (brief, ADR 0001, profile, glossary, CLAUDE.md pointer) match B2 steps 1-3. No live spec flow run |
| Design | PARTIAL | `ux.md` §D providers all resolve to listed skills; Figma is unavailable until authorized. No real UI task run |
| All 9 modules, structure | PASS | 161 items (matches the skill's claim), no duplicate IDs, every level valid. ai/pay/seo/ux have no Tag column but declare their tag in the intro line |
| All `gg` Checks run | PASS with 1 defect | 43 `gg` checks: 38 ran clean, 4 need agent-filled placeholders (LEG-01, SEC-02, SEC-11, SEC-30), 1 errors (LEG-04: missing `package.json` gives grep exit 2 in non-git mode, silent no-match in git mode) |
| Git mode | PASS | `recon.sh` and `gg.sh` behave the same in a git repo |
| Stack fit | GAP | QA-01 / QA-02 (L1) expect `package.json` scripts; this static app has none, so they need a recorded translation (profile says "none yet"). SEC-01 calls `git ls-files` directly, outside `gg`, so it will not work without git (expected from how `git ls-files` behaves; not run) |
| Gates | PASS / UNTESTED | G1 and G5 worked on a real change; G2, G3, G4 dry runs only |

### Bottom line
Works as intended: loading and routing, the scripts (git and non-git), all 161 checks being well-formed, security detection, provider resolution with fallbacks. Not proven: the live flows for grill-me, planning, review skills and design, sub-agent sweeps, and installing v4.0.1. The four defects worth fixing: Gap A, Gap B, LEG-04 (non-git missing path), and the stack-translation gap for static apps (QA-01/02, SEC-01).

## Retest: v4.0.2 ("Fix four defects from the live skill test")

**Install status: NOT ACTIVE.** The marketplace clone is at v4.0.2 (`d55290d`), but the installed plugin (scope: project) is still v4.0.0 (`ce47aba`). Only the marketplace refreshed; the plugin itself needs updating, then a restart. Fixes below were tested from the repo clone.

| Defect | v4.0.2 fix | Result |
|---|---|---|
| A. Too many style presets, no flag | New preflight step 3 "Check for overlap" + rules-card line: pick one, record it in Decisions, add one line to the batched question, never uninstall | PASS (doc). This session has **7** presets (I said 6 earlier: design-taste-frontend, -v1, gpt-taste, high-end-visual-design, industrial-brutalist-ui, minimalist-ui, stitch-design-taste), so the new step would fire. Not exercised live: needs v4.0.2 installed |
| B. Playwright blocks `file:` | Registry row + ux step 5: serve on localhost, stop the server, delete `.playwright-mcp/` | PASS (doc); matches what I had to do and clean up |
| C. LEG-04 errors on missing path (non-git) | `gg.sh` skips missing paths | PASS: missing path exit 1, no error text; missing + existing path still searches the existing one (exit 0); a real bad regex still errors (exit 2) |
| D. QA-01/02 and SEC-01 assume package.json / git | QA-01/02 accept README or `CLAUDE.md` commands and `node --check`; SEC-01 has a non-git `find` branch | PASS: this project's CLAUDE.md already lists `index.html`, `node test.js`, `node --check app.js`; both run green. SEC-01 non-git: `find` lists `.env` in the planted copy, secret scan clean on the real app |

Regression: 43 `gg` checks, 0 errors (was 1); planted secret, `innerHTML`, `eval`, token-in-storage and `.env` all still caught in a non-git copy. Note: the check hit count rose from 4 to 8 only because this report now sits in `docs/` and quotes the patterns, so scope `$SRC` to source dirs, not `.`.

New observation: SEC-01's non-git branch tells you to confirm `.gitignore` lists `.env`, and this project has no `.gitignore` yet. That is correct behaviour (it will matter at `git init`), not a skill defect.

## Suggested next tests

1. Give a real feature request (for example "add search") and confirm it stops at a spec.
2. `git init` the repo and re-run recon and gg to confirm issue 1 is the only blocker.
3. Run a full L1 readiness check (B3 + B6) and confirm it produces a ledger and a one-line PASS/FAIL summary.

## Round 3: v4.0.2 live, git mode (2026-10-02)

Plugin v4.0.2 is now **active** (skill loaded from the 4.0.2 cache path), so the "NOT ACTIVE" note above is resolved. Repo pushed to `kaziragib18/kazi-ai-agent-playbook-test` after the dev approved (G4).

| Test | Result | Evidence |
|---|---|---|
| G4 ask before git init / commit / push | PASS | one batched question, then acted only on the yes |
| G3 live ("add search") | PASS | stopped at align questions, then drafted `docs/specs/search.md`; no code written |
| Sub-agent sweep (rule 7) | PASS | Explore agent returned DOM-write and localStorage sites; matched own grep |
| L1 readiness check (B3+B6) | PASS | ledger created; PASS 4 / FAIL 2 / N/A 3 / UNKNOWN 0 |
| `recon.sh` / `gg.sh`, git repo with no commit | **FAIL (new defect)** | untracked files: recon prints `fatal: ... HEAD`, finds no flags and 0 tests; `gg 'localStorage' app.js` exits 1 although grep finds 3 hits, a silent false PASS |
| `recon.sh` / `gg.sh`, after first commit | PASS | flag `ui`, 1 test file, `gg` finds the 3 localStorage lines |
| UX-01 `gg` check in git mode | **FAIL (new defect)** | the Check uses `\b`; `git grep -E` on macOS does not support it, so `index.html:18 #c00` is missed (exit 1). Without `\b` it is found. Suggested fix: drop `\b` or use `[^0-9a-fA-F]` |
| `code-review` skill | PASS | no diff, so it reviewed `app.js` in full: 4 robustness findings (below) |
| `security-review` skill | PASS | no diff, so empty report, as designed |
| B12 hooks/CI | N/A | L1 needs only editor lint and a test script; hooks and CI start at L2 |
| B7 handoff | PASS | note below, 10 lines |
| Phase 0, launch (B11) | NOT RUN | project already past Phase 0; no deploy at L1 |

Code-review findings (robustness, not security): `app.js:14` `[null]` in storage blanks the page; `:17` second corruption overwrites the first `.corrupt` backup; `:42` duplicate/missing ids make one click toggle or delete several books; `:57` two tabs overwrite each other.

Open skill issues: (1) `gg`/`recon` need tracked files, so a new repo gives false PASS; fix with `git grep --untracked` or a no-commit fallback. (2) `\b` in UX-01. (3) Profile still says commit `none`.

### Handoff (B7)
- Changed: `docs/readiness-ledger.md` (SEC-01 PASS), `docs/specs/search.md` (new draft), this report.
- Checks: node --check + node test.js pass; 43-check set not re-run.
- Left: FAIL UX-01 (#c00 index.html:18), FAIL OPS-01 (no README).
- Decisions for dev: approve or change search spec (4 questions); fix review findings?
- Gotchas: gg false-negatives on untracked files; `\b` unsupported by git grep on macOS.

### Round 3 addendum
- **43 `gg` checks, git vs non-git copy:** 36 clean, 6 skipped (placeholders: LEG-01, SEC-11, SEC-30, PERF-09, PERF-12, UX-10), 6 hits that are harmless (this report quoting patterns; SEC-12 is L2 `auth db` and hits `update(` in app.js). No errors. Only difference between modes: UX-01 (`\b`, see defect above). Scope `$SRC` to source files, not `.`.
- **Phase 0 / G2 (scratch folder, "build me a habit tracker"): PASS.** Stopped at a draft brief awaiting approval; no stack decision, no code.
- **Not run:** B12 hooks/CI (N/A at L1), B11 launch (no deploy), Phase 0 steps 3-7.
