# =====================================================
#  BioChainAI 2.0 - Master Launcher (PowerShell)
#  Usage: Open terminal in project root, run: .\start_biochain.ps1
# =====================================================

Write-Host ""
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host "   BioChainAI 2.0 - Launching All Services..." -ForegroundColor Cyan
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host ""

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

# --- Step 1: Start Hardhat Blockchain Node ---
Write-Host "  [1/4] Starting Hardhat Blockchain Node..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\blockchain'; Write-Host '=== HARDHAT NODE ===' -ForegroundColor Yellow; npx hardhat node`""

Write-Host "  Waiting 8 seconds for node to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# --- Step 2: Deploy Smart Contracts ---
Write-Host "  [2/4] Deploying Smart Contracts..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\blockchain'; Write-Host '=== CONTRACT DEPLOY ===' -ForegroundColor Yellow; npx hardhat run scripts/deploy.js --network localhost; Write-Host ''; Write-Host 'Contracts Deployed! You can close this window.' -ForegroundColor Green`""

Write-Host "  Waiting 10 seconds for deployment..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# --- Step 3: Start FastAPI Backend ---
Write-Host "  [3/4] Starting FastAPI Backend..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\backend'; Write-Host '=== BACKEND (FastAPI) ===' -ForegroundColor Yellow; python -m uvicorn main:app --reload`""

Start-Sleep -Seconds 3

# --- Step 4: Start Vite Frontend ---
Write-Host "  [4/4] Starting Vite Frontend..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit -Command `"cd '$ProjectRoot\frontend'; Write-Host '=== FRONTEND (Vite) ===' -ForegroundColor Yellow; npm run dev`""

Write-Host ""
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host "   Frontend:      http://localhost:3000" -ForegroundColor Green
Write-Host "   Backend API:   http://localhost:8000" -ForegroundColor Green
Write-Host "   Backend Docs:  http://localhost:8000/docs" -ForegroundColor Green
Write-Host "   Blockchain:    http://127.0.0.1:8545" -ForegroundColor Green
Write-Host "  =====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Close the newly opened windows to stop the services." -ForegroundColor Gray
Write-Host ""
