---
description: how to start the complete BioChainAI ecosystem
---

### Prerequisites
- Node.js installed
- Python 3.x installed
- MetaMask extension in browser

### Steps to Start

1. **Start Blockchain Node**
   Open a terminal and navigate to the `blockchain` directory:
   ```powershell
   cd blockchain
   npx hardhat node
   ```

2. **Deploy Smart Contracts**
   Open a second terminal and navigate to the `blockchain` directory:
   ```powershell
   cd blockchain
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Start Backend API**
   Open a third terminal and navigate to the `backend` directory:
   ```powershell
   cd backend
   # Ensure venv is active if using one
   python -m uvicorn main:app --reload
   ```

4. **Start Frontend App**
   Open a fourth terminal and navigate to the `frontend` directory:
   ```powershell
   cd frontend
   npm run dev
   ```

5. **Access Application**
   - Frontend: `http://localhost:3000`
   - Backend Docs: `http://localhost:8000/docs`
