Add-Type -AssemblyName System.Drawing

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcPath = Join-Path $dir "assets\logo.png"
$backupPath = Join-Path $dir "assets\logo-with-bg.png"

# Ensure backup exists
if (-not (Test-Path $backupPath)) {
    Copy-Item $srcPath $backupPath
}

# Read bytes into memory stream to prevent file locking
$bytes = [System.IO.File]::ReadAllBytes($backupPath)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$src = [System.Drawing.Bitmap]::FromStream($ms)

$w = $src.Width
$h = $src.Height
$dest = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dest)

# ColorMatrix that converts black background into transparency while preserving vibrant neon & crisp text
# R, G, B channels remain unattenuated; Alpha is driven by color luminance with a noise threshold offset
$cm = New-Object System.Drawing.Imaging.ColorMatrix
$cm.Matrix00 = 1.0   # Red -> Red
$cm.Matrix11 = 1.0   # Green -> Green
$cm.Matrix22 = 1.0   # Blue -> Blue
$cm.Matrix33 = 0.0   # Original Alpha ignored
$cm.Matrix44 = 1.0   # Identity scale

# Alpha channel weights: sum of colors drives opacity
$cm.Matrix03 = 0.85  # Red contribution to Alpha
$cm.Matrix13 = 0.90  # Green contribution to Alpha
$cm.Matrix23 = 0.90  # Blue contribution to Alpha
$cm.Matrix43 = -0.06 # Threshold offset: cuts out dark background noise completely

$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$g.DrawImage($src, $rect, 0, 0, $w, $h, [System.Drawing.GraphicsUnit]::Pixel, $ia)

$g.Dispose()
$src.Dispose()
$ms.Dispose()

# Save transparent PNG
$dest.Save($srcPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()

Write-Host "Logo background successfully removed and saved to assets\logo.png"
