# =====================================================
#  BioChainAI 2.0 - Master Launcher (PowerShell)
#  Usage: Open terminal in project root, run: .\start_biochain.ps1
# =====================================================

Write-Host ""
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host "   BioChainAI 2.0 - Ecosystem Master Launcher" -ForegroundColor Cyan
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host ""

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Check for Python Virtual Environment in root or backend
# Python Environment: Using active Python with all requirements installed
$VenvActivate = ""

# --- Step 1: Start Hardhat Blockchain Node ---
Write-Host "  [1/4] Starting Hardhat Blockchain Node..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\blockchain'; Write-Host '=== [1/4] HARDHAT BLOCKCHAIN NODE ===' -ForegroundColor Cyan; npx hardhat node`""

Write-Host "  Waiting for Blockchain RPC (http://127.0.0.1:8545) to be ready..." -ForegroundColor Gray
$nodeReady = $false
for ($i = 1; $i -le 15; $i++) {
    Start-Sleep -Seconds 1
    try {
        $tcp = Test-NetConnection -ComputerName 127.0.0.1 -Port 8545 -WarningAction SilentlyContinue
        if ($tcp.TcpTestSucceeded) {
            $nodeReady = $true
            break
        }
    }
    catch { }
}

if ($nodeReady) {
    Write-Host "  [OK] Hardhat RPC is online and responding." -ForegroundColor Green
}
else {
    Write-Host "  [!] Node initialization taking longer, proceeding with deploy..." -ForegroundColor Yellow
}

# --- Step 2: Deploy Smart Contracts ---
Write-Host "  [2/4] Deploying Smart Contracts to Localhost..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\blockchain'; Write-Host '=== [2/4] CONTRACT DEPLOYMENT ===' -ForegroundColor Cyan; npx hardhat run scripts/deploy.js --network localhost; Write-Host ''; Write-Host 'Contracts Deployed! You can close this window.' -ForegroundColor Green`""

Write-Host "  Waiting 6 seconds for contract deployment..." -ForegroundColor Gray
Start-Sleep -Seconds 6

# --- Step 3: Start FastAPI Backend ---
Write-Host "  [3/4] Starting FastAPI Backend (AI + Database + Web3)..." -ForegroundColor Green
$BackendCmd = "cd '$ProjectRoot\backend'; $VenvActivate Write-Host '=== [3/4] FASTAPI BACKEND ===' -ForegroundColor Cyan; python -m uvicorn main:app --reload --reload-exclude 'venv' --reload-exclude '.venv'"
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"$BackendCmd`""

Write-Host "  Waiting 3 seconds for Backend API initialization..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# --- Step 4: Start Vite Frontend ---
Write-Host "  [4/4] Starting Vite React Frontend..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\frontend'; Write-Host '=== [4/4] VITE REACT FRONTEND ===' -ForegroundColor Cyan; npm run dev`""

Write-Host ""
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host "   BioChainAI 2.0 is now LIVE:" -ForegroundColor Cyan
Write-Host "   Frontend App:   http://localhost:3000" -ForegroundColor Green
Write-Host "   Backend API:    http://localhost:8000" -ForegroundColor Green
Write-Host "   API Docs:       http://localhost:8000/docs" -ForegroundColor Green
Write-Host "   Blockchain RPC: http://127.0.0.1:8545" -ForegroundColor Green
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Tips:" -ForegroundColor Yellow
Write-Host "  - Keep the Node, Backend, and Frontend windows open." -ForegroundColor Gray
Write-Host "  - Close the individual windows to stop the services." -ForegroundColor Gray
Write-Host ""
