#!/usr/bin/env bash
# Fügt alle Dateien unter cursor-talk-to-figma-mcp hinzu (ohne node_modules, dist).
#
# Im normalen Terminal (nicht in der IDE) ausführen, falls git add dort hängen bleibt:
#   chmod +x git-add-mcp.sh && ./git-add-mcp.sh
# Anschließend:
#   git commit -m "chore: cursor-talk-to-figma-mcp vollständig"
#   git push origin main

set -euo pipefail
cd "$(dirname "$0")"

if [[ ! -d cursor-talk-to-figma-mcp ]]; then
  echo "Ordner cursor-talk-to-figma-mcp nicht gefunden." >&2
  exit 1
fi

find cursor-talk-to-figma-mcp \
  \( -path '*/node_modules/*' -o -path '*/dist/*' -o -path '*/.cursor/*' \) -prune -o \
  -type f -print0 |
  while IFS= read -r -d '' f; do
    git add "$f"
  done

echo "OK: cursor-talk-to-figma-mcp (ohne node_modules/dist) gestaged."
git diff --cached --name-only | grep -c '^cursor-talk-to-figma-mcp/' || true
