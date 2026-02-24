---
description: blockchain operations for BioChainAI
---

### Deploying/Updating Contracts

1. Modify contracts in `blockchain/contracts/`.
2. Compile and deploy:
   ```powershell
   cd blockchain
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. Copy the new contract address and update it in:
   - `backend/.env` (CONTRACT_ADDRESS)
   - `frontend/src/config.js` (If applicable)

### Managing the Local Node
- To reset the node state, stop the `npx hardhat node` process and restart it.
- Remember to import the local Hardhat accounts into MetaMask using their private keys (displayed in the terminal when starting the node).
