# Erzeugt Platzhalter-PNGs wenn kein FIGMA_ACCESS_TOKEN (npm run figma:pull-capture ersetzt sie).
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$outDir = (Resolve-Path (Join-Path (Join-Path $PSScriptRoot '..') 'public\app-assets')).Path
$arPath = Join-Path $outDir 'capture-frame59-ar.png'
$upPath = Join-Path $outDir 'capture-frame59-upload.png'

$w = 224
$h = 232
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::FromArgb(255, 232, 237, 233))
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 47, 125, 87))
$g.FillEllipse($brush, 28, 48, 168, 118)
$g.FillRectangle($brush, 92, 130, 40, 72)
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 26, 60, 52), 2)
for ($i = 0; $i -lt 6; $i++) {
  $x = 24 + $i * 36
  $g.DrawLine($pen, $x, 206, $x + 18, 214)
}
$g.Dispose()
$bmp.Save($arPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$w2 = 54
$h2 = 54
$bmp2 = New-Object System.Drawing.Bitmap $w2, $h2
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = 'AntiAlias'
$g2.Clear([System.Drawing.Color]::Transparent)
$white = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), 3.2
$g2.DrawArc($white, 6, 14, 42, 30, 160, 220)
$g2.DrawArc($white, 18, 8, 28, 22, 200, 160)
$g2.Dispose()
$bmp2.Save($upPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()

Write-Host "Wrote $arPath"
Write-Host "Wrote $upPath"
