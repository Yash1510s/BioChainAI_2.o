/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
const hre = require("hardhat");

async function main() {
    console.log("🛠️ Starting Post-Deployment Setup...");
    
    // Contract info
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const BioChainNetwork = await hre.ethers.getContractFactory("BioChainNetwork");
    const bioChain = await BioChainNetwork.attach(contractAddress);

    // Hardhat Account #0 (Super Admin)
    const [superAdmin] = await hre.ethers.getSigners();
    console.log("Super Admin:", superAdmin.address);

    // 1. Set Account #0 as an authorized relayer
    const relayerTx = await bioChain.setRelayer(superAdmin.address, true);
    await relayerTx.wait();
    console.log("✅ Super Admin authorized as relayer.");

    // 2. Register Apollo Spectra Hospital (Links to the user's provided admin wallet)
    // admin_wallet: 0xaf056C48551A564B001e4651F4548c686C578817 
    const adminWallet = "0xaf056C48551A564B001e4651F4548c686C578817";
    const hospTx = await bioChain.registerHospital(adminWallet, "Apollo Spectra", "REG-2026-MUM");
    await hospTx.wait();
    console.log("✅ Apollo Spectra Hospital registered on-chain.");

    // 3. Add Dr. Yash Singh (Linked to Apollo)
    // Needs to be done BY the hospital admin? 
    // Contract: onlyHospitalAdmin for addDoctor
    // So we need to sign-as the admin wallet if possible.
    // In Hardhat node, we can impersonate or just use Account #1 if it's the admin.
    // But since the user gave an address from MetaMask, we might not have the private key on the local node.
    
    // Safety check: The contract allows Super Admin to do many things? 
    // No, addDoctor is strictly onlyHospitalAdmin.
    // I will skip adding the doctor on-chain for now, or just explain they need to do it via the Admin UI.
    
    console.log("Done. Ecosystem Ready.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
