# =============================================================================
# BioChainAI 2.0 — Copyright Header Injection Script
# Run once from project root to stamp all source files
# =============================================================================

$PY_HEADER = @"
# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================

"@

$JS_HEADER = @"
/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */

"@

$SOL_HEADER = @"
// =============================================================================
// Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
// Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
// License  : Proprietary — See LICENSE file in project root for full terms.
// Repo     : https://github.com/Yash1510s/BioChainAI_2.o
// WARNING  : Unauthorized copying, modification, or distribution is prohibited.
// =============================================================================

"@

$MARKER = "Copyright (c) 2025-2026 BioChainAI"

function Add-Header {
    param($FilePath, $Header)
    $content = Get-Content $FilePath -Raw
    if ($content -notmatch [regex]::Escape($MARKER)) {
        Set-Content $FilePath -Value ($Header + $content) -NoNewline
        Write-Host "  [+] $FilePath"
    } else {
        Write-Host "  [=] Already has header: $FilePath"
    }
}

Write-Host "`n=== Stamping Python files ===" -ForegroundColor Cyan
Get-ChildItem -Path "backend" -Filter "*.py" -Recurse | ForEach-Object {
    Add-Header $_.FullName $PY_HEADER
}

Write-Host "`n=== Stamping JavaScript / JSX files ===" -ForegroundColor Cyan
$jsFiles = @(
    "frontend\src\App.jsx",
    "frontend\src\Dashboard.jsx",
    "frontend\src\PatientList.jsx",
    "frontend\src\Register.jsx",
    "frontend\src\main.jsx",
    "frontend\src\config.js"
)
foreach ($f in $jsFiles) {
    if (Test-Path $f) { Add-Header $f $JS_HEADER }
}

Get-ChildItem -Path "frontend\src\components" -Filter "*.jsx" | ForEach-Object {
    Add-Header $_.FullName $JS_HEADER
}
Get-ChildItem -Path "frontend\src\config" -Filter "*.js" | ForEach-Object {
    Add-Header $_.FullName $JS_HEADER
}
Get-ChildItem -Path "frontend\src\hooks" -Filter "*.js" | ForEach-Object {
    Add-Header $_.FullName $JS_HEADER
}

Write-Host "`n=== Stamping Blockchain / Hardhat files ===" -ForegroundColor Cyan
Get-ChildItem -Path "blockchain\scripts" -Filter "*.js" | ForEach-Object {
    Add-Header $_.FullName $JS_HEADER
}
Add-Header "blockchain\hardhat.config.js" $JS_HEADER

Write-Host "`n=== Stamping Solidity contract ===" -ForegroundColor Cyan
Add-Header "blockchain\contracts\BioChaincontract.sol" $SOL_HEADER

Write-Host "`n✅ All source files stamped with copyright headers." -ForegroundColor Green
