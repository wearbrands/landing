#!/usr/bin/env pwsh

# Script to generate various web icons from a source SVG file using qlmanage
# Requires macOS with qlmanage command

# Configuration
$sourceFile = "icon.svg"
$tempOutputDir = "./temp_icons"
$finalOutputDir = "./"
$iconSizes = @{
    "apple-touch-icon.png" = 180
    "favicon-32x32.png" = 32
    "favicon-16x16.png" = 16
    "mstile-150x150.png" = 150
    "android-chrome-192x192.png" = 192
    "android-chrome-512x512.png" = 512
}

# Create temporary and final output directories if they don't exist
New-Item -ItemType Directory -Force -Path $tempOutputDir | Out-Null
New-Item -ItemType Directory -Force -Path $finalOutputDir | Out-Null

# Check if source file exists
if (-not (Test-Path $sourceFile)) {
    Write-Error "Source file not found: $sourceFile"
    exit 1
}

# Generate PNG icons using qlmanage with specific sizes
foreach ($icon in $iconSizes.GetEnumerator()) {
    $iconName = $icon.Key
    $iconSize = $icon.Value
    
    Write-Host "Generating $iconName ($iconSize x $iconSize)..."
    
    # Use qlmanage with -s option to specify the max width (and height)
    & qlmanage -t -s $iconSize -o $tempOutputDir $sourceFile
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to generate icon: $iconName"
        continue
    }
    
    # The output file will be named something like icon.svg.png
    $generatedFile = Join-Path $tempOutputDir "$sourceFile.png"
    $destinationFile = Join-Path $finalOutputDir $iconName
    
    # Move the file to the final location with the correct name
    Move-Item -Force $generatedFile $destinationFile
    
    # Verify the file was created
    if (Test-Path $destinationFile) {
        Write-Host "  → Created $iconName"
    } else {
        Write-Error "  → Failed to create $iconName"
    }
}

# For the safari-pinned-tab.svg, we'll just copy the original SVG
Write-Host "Copying SVG for safari-pinned-tab.svg..."
Copy-Item $sourceFile (Join-Path $finalOutputDir "safari-pinned-tab.svg")

# Generate ico file using ImageMagick
Write-Host "Generating favicon.ico..."
& convert $sourceFile -define icon:auto-resize=64,48,32,16 favicon.ico
Copy-Item -Force favicon.ico $finalOutputDir

# Clean up temporary files
Write-Host "Cleaning up temporary directory..."
Remove-Item -Recurse -Force $tempOutputDir

Write-Host "`nIcon generation complete. Files saved to $finalOutputDir"
Write-Host "Generated icons:"
Get-ChildItem $finalOutputDir | ForEach-Object { Write-Host " - $($_.Name)" }