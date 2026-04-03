@echo off
title BioChainAI 2.0 — Master Launcher
color 0A

echo.
echo  =====================================================
echo   ____  _        ____ _           _          _    ___
echo  ^| __ ^)(_) ___  ^/ ___^| |__   __ _(_)_ __    / \  ^|_ _^|
echo  ^|  _ \^| ^|/ _ \^| ^|   ^| '_ \ / _` ^| ^| '_ \  / _ \  ^| ^|
echo  ^| ^|_) ^| ^| (_) ^| ^|___^| ^| ^| ^| (_^| ^| ^| ^| ^| ^|/ ___ \ ^| ^|
echo  ^|____/^|_^|\___/ \____^|_^| ^|_^|\__,_^|_^|_^| ^|_/_/   \_\___|
echo.
echo            Decentralized Healthcare Platform
echo  =====================================================
echo.

:: Get the directory where this batch file is located
set "PROJECT_ROOT=%~dp0"

echo  [Step 1/4] Starting Hardhat Blockchain Node...
echo  -----------------------------------------------
start "BioChain - Hardhat Node" cmd /k "cd /d "%PROJECT_ROOT%blockchain" && npx hardhat node"

:: Wait for the node to spin up before deploying contracts
echo.
echo  Waiting 8 seconds for Hardhat Node to initialize...
timeout /t 8 /nobreak >nul

echo.
echo  [Step 2/4] Deploying Smart Contracts...
echo  -----------------------------------------------
start "BioChain - Contract Deploy" cmd /k "cd /d "%PROJECT_ROOT%blockchain" && npx hardhat run scripts/deploy.js --network localhost && echo. && echo  === Contracts Deployed Successfully === && echo  You can close this window now."

:: Wait for deployment to complete
echo.
echo  Waiting 10 seconds for contract deployment...
timeout /t 10 /nobreak >nul

echo.
echo  [Step 3/4] Starting FastAPI Backend Server...
echo  -----------------------------------------------
start "BioChain - Backend (FastAPI)" cmd /k "cd /d "%PROJECT_ROOT%backend" && python -m uvicorn main:app --reload"

:: Small delay before frontend
timeout /t 3 /nobreak >nul

echo.
echo  [Step 4/4] Starting Vite Frontend Dev Server...
echo  -----------------------------------------------
start "BioChain - Frontend (Vite)" cmd /k "cd /d "%PROJECT_ROOT%frontend" && npm run dev"

echo.
echo  =====================================================
echo.
echo   All services launching! Access points:
echo.
echo   Frontend:      http://localhost:3000
echo   Backend API:   http://localhost:8000
echo   Backend Docs:  http://localhost:8000/docs
echo   Blockchain:    http://127.0.0.1:8545
echo.
echo  =====================================================
echo.
echo  TIP: Each service runs in its own terminal window.
echo       Close this window anytime - services will keep running.
echo.
pause
