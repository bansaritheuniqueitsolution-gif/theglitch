# Copy generated menu imagery to the assets directory
$sourceDir = "C:\Users\marub\.gemini\antigravity-ide\brain\38525f4a-0fe5-4636-a48a-36d8db17c579"
$destDir = "c:\Users\marub\Downloads\theglitch\assets"

$mapping = @{
    "menu_brunch_1789014576288.jpg"       = "menu-brunch.jpg"
    "menu_burger_1789014443271.jpg"       = "menu-burger.jpg"
    "menu_pizza_1789014462923.jpg"        = "menu-pizza.jpg"
    "menu_wings_1789014485205.jpg"        = "menu-wings.jpg"
    "menu_curry_1789014510913.jpg"        = "menu-curry.jpg"
    "menu_mocktails_1789014530754.jpg"    = "menu-mocktails.jpg"
    "menu_dessert_1789014555978.jpg"      = "menu-dessert.jpg"
    "menu_kinoko_bowl_1789012481070.jpg"  = "menu-kinoko-bowl.jpg"
    "menu_shareables_1789012501431.jpg"   = "menu-shareables.jpg"
    "menu_salad_1789012523371.jpg"        = "menu-salad.jpg"
    "menu_taproom_1789012558664.jpg"      = "menu-taproom.jpg"
    "menu_parlor_1789012577315.jpg"       = "menu-parlor.jpg"
}

foreach ($src in $mapping.Keys) {
    $srcPath = Join-Path $sourceDir $src
    $dstPath = Join-Path $destDir $mapping[$src]
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "Copied $src -> $($mapping[$src])"
    } else {
        Write-Warning "Source not found: $srcPath"
    }
}
Write-Host "All assets copied successfully!"
