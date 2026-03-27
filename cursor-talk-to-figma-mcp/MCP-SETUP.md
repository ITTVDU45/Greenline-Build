# TalkToFigma MCP Setup für Cursor

## 🔌 Mit Talk to Figma verbinden (wenn „Disconnected from server“)

Damit das Figma-Plugin sich verbinden kann, muss der **WebSocket-Server** laufen:

1. **Terminal öffnen** (Cursor-Terminal oder macOS Terminal).
2. **Befehl ausführen und laufen lassen:**
   ```bash
   bunx cursor-talk-to-figma-socket
   ```
3. Wenn es startet, siehst du z. B.:
   ```
   WebSocket Server Port
   3055
   ```
4. **Figma:** Plugin „Talk to Figma“ öffnen und auf **Connect** klicken.

Der WebSocket-Server muss **durchgehend laufen**, solange du mit Figma arbeiten willst. Terminal nicht schließen.

---

## ✅ Aktuelle Konfiguration (installiert)

Die MCP-Konfiguration wurde bereits in Cursor integriert:

**Datei:** `~/Library/Application Support/Cursor/User/settings.json`

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

## 🔄 Neustart erforderlich

Nach der Installation:
1. **Cursor komplett beenden** (Cmd+Q)
2. **Cursor neu starten**
3. Der MCP-Server sollte jetzt verfügbar sein

## 🧪 Testen

Nach dem Neustart kannst du testen, ob der MCP-Server läuft:
- Öffne Cursor
- Der TalkToFigma-Server sollte automatisch starten
- Prüfe in den Cursor-Logs auf Fehler

## 📋 Alternative Konfigurationen

### Option 1: Via NPM Package (empfohlen für Produktion)

Wenn das Paket global installiert ist:

```json
{
    "mcpServers": {
        "TalkToFigma": {
            "command": "bunx",
            "args": ["cursor-talk-to-figma-mcp"]
        }
    }
}
```

### Option 2: Via Project Script

Über das package.json Script:

```json
{
    "mcpServers": {
        "TalkToFigma": {
            "command": "bun",
            "args": [
                "run",
                "--cwd",
                "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp",
                "start"
            ]
        }
    }
}
```

### Option 3: Via TypeScript direkt (mit tsx)

Falls du den TypeScript-Code direkt ausführen möchtest:

```json
{
    "mcpServers": {
        "TalkToFigma": {
            "command": "bunx",
            "args": [
                "tsx",
                "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/src/talk_to_figma_mcp/server.ts"
            ]
        }
    }
}
```

## 🔧 Troubleshooting

### Build neu erstellen

Falls Änderungen am Code gemacht wurden:

```bash
cd "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp"
bun run build
```

### Dependencies neu installieren

```bash
cd "/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp"
rm -rf node_modules
bun install
bun run build
```

### Logs prüfen

Cursor-Logs findest du hier:
- Menü → Help → Toggle Developer Tools → Console

### WebSocket Server separat testen

Der WebSocket-Server (Port 3055) läuft separat:

```bash
bunx cursor-talk-to-figma-socket
```

## 📦 Projekt-Struktur

```
cursor-talk-to-figma-mcp/
├── src/
│   ├── talk_to_figma_mcp/
│   │   └── server.ts          # MCP Server (wird von Cursor gestartet)
│   └── socket.ts               # WebSocket Server (separate Instanz)
├── dist/
│   └── server.js               # Kompilierter MCP Server
└── package.json
```

## 🎯 Warum diese Konfiguration?

**Problem:** `bunx run /pfad/server.ts` funktioniert nicht
- `bunx run` erwartet ein npm-Script, keine direkte .ts-Datei

**Lösung:** `bun run /pfad/dist/server.js`
- Nutzt den bereits kompilierten Code aus `dist/`
- Keine zusätzlichen Loader nötig
- Schneller Start
- Stabile Dependencies aus node_modules

## 🚀 Verwendung

Nach dem Neustart von Cursor kannst du in deinen Prompts direkt mit Figma interagieren:

```
"Erstelle einen Button in Figma mit..."
"Analysiere das aktuelle Figma-Design..."
"Füge dem Screen XYZ hinzu..."
```

Der MCP-Server verbindet sich mit dem WebSocket-Server (Port 3055) und kommuniziert mit dem Figma-Plugin.
