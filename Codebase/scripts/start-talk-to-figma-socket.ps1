# WebSocket-Server fuer Cursor "Talk to Figma" (Standard-Port 3055).
# MCP ersetzt diesen Schritt nicht - das Plugin verbindet sich mit diesem lokalen Server.
# Unter Windows: statt bunx -> bun x (bunx existiert oft nicht als eigenes Kommando).
#
# Wenn Port 3055 belegt ist: alter Socket laeuft meist schon - im Figma-Plugin verbinden.
# Neu starten: npm run figma:socket:restart

param(
  [switch] $KillExisting
)

$ErrorActionPreference = 'Stop'

function Get-ListenerPidOnPort {
  param([int] $Port)
  try {
    $c = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
      Select-Object -First 1 -ExpandProperty OwningProcess
    if ($c) { return [int]$c }
  } catch { }
  return $null
}

$bunExe = $null
$cmd = Get-Command bun -ErrorAction SilentlyContinue
if ($cmd) {
  $bunExe = $cmd.Source
}

if (-not $bunExe) {
  $wingetBun = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages\Oven-sh.Bun_Microsoft.Winget.Source_8wekyb3d8bbwe\bun-windows-x64\bun.exe'
  if (Test-Path $wingetBun) {
    $bunExe = $wingetBun
  }
}

if (-not $bunExe) {
  $userBun = Join-Path $env:USERPROFILE '.bun\bin\bun.exe'
  if (Test-Path $userBun) {
    $bunExe = $userBun
  }
}

if (-not $bunExe) {
  Write-Host 'Bun wurde nicht gefunden. Installieren z. B. mit: winget install Oven-sh.Bun' -ForegroundColor Red
  Write-Host 'Danach PowerShell neu starten oder PATH pruefen.' -ForegroundColor Yellow
  exit 1
}

Write-Host "Nutze Bun: $bunExe" -ForegroundColor DarkGray

$port = 3055
$existingPid = Get-ListenerPidOnPort -Port $port
if ($existingPid) {
  try {
    $p = Get-Process -Id $existingPid -ErrorAction Stop
    $name = $p.ProcessName
  } catch {
    $name = '?'
  }

  if ($KillExisting) {
    Write-Host "Port $port wird von PID $existingPid ($name) belegt - beende Prozess ..." -ForegroundColor Yellow
    Stop-Process -Id $existingPid -Force -ErrorAction Stop
    Start-Sleep -Milliseconds 400
  } else {
    Write-Host "Port $port ist bereits belegt (PID $existingPid, $name)." -ForegroundColor Green
    Write-Host 'Der Talk-to-Figma-Socket laeuft vermutlich schon - im Figma-Plugin nur noch verbinden.' -ForegroundColor Green
    Write-Host 'Falls du neu starten willst: npm run figma:socket:restart' -ForegroundColor DarkGray
    exit 0
  }
}

Write-Host "Starte cursor-talk-to-figma-socket (Port $port) ..." -ForegroundColor Cyan
& $bunExe x cursor-talk-to-figma-socket
