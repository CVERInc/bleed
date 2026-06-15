#!/usr/bin/env bash
# Single entry point — the SAME deterministic checks .github/workflows/ci.yml runs.
# Runs anywhere (no browser needed): the pure + unit decision-logic suites and the
# shared release-readiness gate. The integration suite (test:auto) drives real
# Chrome over CDP and is bound to `prepublishOnly`, so it runs at publish time on a
# machine that has Chrome — it is intentionally NOT part of this pre-push gate.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ deterministic decision-logic suites (pure + units)"
npm run test:ci

echo "→ release readiness"
node scripts/check-release-readiness.mjs

echo "✅ ALL GREEN"
