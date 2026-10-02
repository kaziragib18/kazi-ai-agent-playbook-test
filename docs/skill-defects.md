# agent-playbook v4.0.2: defects found in testing (2026-10-02)

Ready to paste into issues for the skill's maintainers. Environment: macOS (Darwin), git repo, vanilla JS app.

## 1. `gg.sh` and `recon.sh` miss untracked files (false PASS)

**Where:** `scripts/gg.sh` line 10 (`git grep` on tracked files only); `scripts/recon.sh` (uses tracked files).

**Repro:** `git init` in a project with files but no commits, then `gg -n 'localStorage' app.js`.

**Actual:** exit 1, no output, although `grep -c localStorage app.js` prints 3. `recon.sh` prints `fatal: ambiguous argument 'HEAD'`, detects no flags (expected `ui`) and counts 0 test files (expected 1).

**Impact:** every Check reports "no match", which reads as PASS. Silent in a brand-new repo, the exact moment Phase 0 runs recon.

**Suggested fix:** use `git grep --untracked` (or `--cached --others --exclude-standard`), or fall back to the non-git `grep -r` branch when `git rev-parse HEAD` fails. Fix the `HEAD` call in recon the same way.

**Verified:** after the first commit both scripts behave correctly.

## 2. UX-01 Check uses `\b`, unsupported by `git grep -E` on macOS

**Where:** `references/modules/ux.md`, UX-01: `gg '#[0-9a-fA-F]{3,8}\b\|rgba?\(' ...`

**Repro:** `index.html` contains `#status { color: #c00; }`. In a git repo, `gg '#[0-9a-fA-F]{3,8}\b' '*.html'` exits 1. Without `\b` it finds `index.html:18`. In a non-git folder (plain `grep`) it is found, so results differ by mode.

**Impact:** the design-token check silently passes in git mode on macOS.

**Suggested fix:** drop `\b`, or use a portable boundary such as `([^0-9a-fA-F]|$)`.

**Verified:** the only mismatch between git and non-git runs of all 43 `gg` Checks.

## Minor
- Profile template's `commit:` stays `none` after `git init`, so the freshness rule cannot evaluate until the profile is updated.
- Checks hit documentation that quotes their patterns; the docs say to scope `$SRC` to source dirs, but `recon.sh` reports `.` as the source dir for flat projects.
- `gg` passes an unescaped `(` straight to `git grep -E`, which aborts with `fatal: ... empty (sub)expression` (exit 128, not the usual 1). Repro: `gg 'fetch(' app.js`. Checks must write `\(`; the exit code is easy to misread as "no hits". Same portability family as the `\b` defect.
