#!/usr/bin/env bash
set -euo pipefail
# ripgrep helpers to locate refactor hotspots
rg -n "switch\s*\(" -g "**/*.{ts,tsx,js,jsx}"
rg -n "else if\s*\(" -g "**/*.{ts,tsx,js,jsx}"
rg -n "throw new Error\(.*not implemented" -g "**/*.{ts,tsx,js,jsx}"
rg -n "console\." -g "**/*.{ts,tsx,js,jsx}"
