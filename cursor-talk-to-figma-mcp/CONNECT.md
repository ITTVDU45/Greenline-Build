# Talk to Figma verbinden

Wenn du **„Disconnected from server“** oder **„Run this in your terminal, then connect“** siehst:

## Schritte

### 1. WebSocket-Server starten

In einem **Terminal** (Cursor oder System-Terminal):

```bash
bunx cursor-talk-to-figma-socket
```

**Nicht schließen** – das Fenster muss offen bleiben.

### 2. Erfolgreicher Start

Du solltest sehen:

```
WebSocket Server Port
3055
```

### 3. In Figma verbinden

- In Figma das Plugin **„Talk to Figma“** öffnen.
- Auf **Connect** klicken.
- Die Verbindung sollte stehen (kein „Disconnected from server“ mehr).

### 4. Cursor nutzen

- Cursor ist bereits mit dem MCP-Server TalkToFigma verbunden (wenn konfiguriert).
- Der MCP-Server spricht mit dem WebSocket auf Port 3055.
- So kannst du aus Cursor heraus Figma steuern.

## Kurzfassung

| Schritt | Aktion |
|--------|--------|
| 1 | Terminal: `bunx cursor-talk-to-figma-socket` ausführen |
| 2 | Terminal offen lassen (Port 3055) |
| 3 | In Figma: Talk to Figma → Connect |

Wenn es wieder „Disconnected“ zeigt: Terminal prüfen, ob der Befehl noch läuft, und ggf. erneut `bunx cursor-talk-to-figma-socket` starten.
