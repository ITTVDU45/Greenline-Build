# Änderungen am TalkToFigma MCP Setup

## Was wurde gemacht?

### 1. ✅ Dependencies repariert
```bash
cd "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp"
rm -rf node_modules
bun install
```

**Problem:** Korrupte `node_modules/tsup/package.json`  
**Lösung:** Komplette Neuinstallation aller Dependencies

---

### 2. ✅ Projekt gebaut
```bash
bun run build
```

**Ergebnis:** 
- `dist/server.js` (ESM, 75.25 KB)
- `dist/server.cjs` (CommonJS, 78.02 KB)
- Type definitions (`.d.ts`)

---

### 3. ✅ MCP-Konfiguration in Cursor installiert

**Datei:** `~/Library/Application Support/Cursor/User/settings.json`

**Vorher:**
```json
{
    "window.commandCenter": true
}
```

**Nachher:**
```json
{
    "window.commandCenter": true,
    "mcpServers": {
        "TalkToFigma": {
            "command": "bun",
            "args": [
                "run",
                "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js"
            ],
            "env": {
                "NODE_ENV": "production"
            }
        }
    }
}
```

---

## Warum diese Konfiguration?

### ❌ Falsch (funktioniert nicht):
```json
{
    "command": "bunx",
    "args": ["run", "/pfad/server.ts"]
}
```

**Problem:** `bunx run` erwartet ein npm-Script (z.B. `dev`, `start`), keine direkte .ts-Datei.

---

### ✅ Richtig (aktuelle Lösung):
```json
{
    "command": "bun",
    "args": ["run", "/pfad/dist/server.js"]
}
```

**Vorteile:**
- Nutzt kompilierten Code aus `dist/`
- Keine TypeScript-Loader nötig (tsx, ts-node)
- Schneller Start
- Dependencies werden korrekt aus `node_modules/` geladen
- Pfad mit Leerzeichen funktioniert (Array-Syntax)

---

## Alternative Optionen

### Option A: Via npm-Script (auch gut)
```json
{
    "command": "bun",
    "args": ["run", "--cwd", "/pfad/zum/projekt", "start"]
}
```

Benötigt `"start": "bun run dist/server.js"` in package.json (✅ bereits vorhanden)

### Option B: TypeScript direkt (langsamer)
```json
{
    "command": "bunx",
    "args": ["tsx", "/pfad/src/talk_to_figma_mcp/server.ts"]
}
```

Benötigt `tsx` Paket und ist langsamer beim Start.

---

## Nächste Schritte

1. **Cursor neu starten** (Cmd+Q, dann wieder öffnen)
2. **Testen:** Nach dem Start sollte TalkToFigma als MCP-Server verfügbar sein
3. **WebSocket Server starten** (falls noch nicht):
   ```bash
   bunx cursor-talk-to-figma-socket
   ```
   Sollte auf Port 3055 laufen

4. **Figma Plugin öffnen** und mit Cursor kommunizieren

---

## Architektur

```
┌─────────────────┐
│  Cursor IDE     │
│  (MCP Client)   │
└────────┬────────┘
         │
         │ stdio
         ▼
┌─────────────────┐
│  MCP Server     │
│  dist/server.js │
└────────┬────────┘
         │
         │ WebSocket (Port 3055)
         ▼
┌─────────────────┐
│  Socket Server  │
│  src/socket.ts  │
└────────┬────────┘
         │
         │ WebSocket
         ▼
┌─────────────────┐
│  Figma Plugin   │
│  (im Browser)   │
└─────────────────┘
```

---

## Debugging

### MCP Server läuft nicht?
1. Cursor Developer Tools öffnen: Help → Toggle Developer Tools
2. Console nach Fehlern durchsuchen
3. Prüfen ob `dist/server.js` existiert

### WebSocket funktioniert nicht?
```bash
# Socket Server manuell starten
bunx cursor-talk-to-figma-socket

# Sollte ausgeben:
# WebSocket Server Port
# 3055
```

### Build Fehler?
```bash
cd "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp"
rm -rf node_modules
bun install
bun run build
```

---

## Dokumentation

Siehe `MCP-SETUP.md` für vollständige Anleitung und Troubleshooting.
