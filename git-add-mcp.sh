#!/usr/bin/env bash
# Fügt alle Dateien unter cursor-talk-to-figma-mcp hinzu (ohne node_modules, dist).
# Lokal im Terminal ausführen, falls `git add cursor-talk-to-figma-mcp/` hängen bleibt:
#   chmod +x git-add-mcp.sh && ./git-add-mcp.sh

set -euo pipefail
cd "$(dirname "$0")"

find cursor-talk-to-figma-mcp \
  \( -path '*/node_modules/*' -o -path '*/dist/*' -o -path '*/.cursor/*' \) -prune -o \
  -type f -print0 |
  while IFS= read -r -d '' f; do
    git add "$f"
  done

echo "OK: cursor-talk-to-figma-mcp (ohne node_modules/dist) gestaged."
git diff --cached --name-only | grep '^cursor-talk-to-figma-mcp/' | wc -l
