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
    console.log("🏥 Deploying BioChainNetwork...");

    // 1. Get the Contract Factory (The Blueprint)
    // FIX 1: Look for the new Enterprise contract name
    const BioChainNetwork = await hre.ethers.getContractFactory("BioChainNetwork");

    // 2. Deploy it 
    // FIX 2: The new contract doesn't take a hospital name in the constructor anymore.
    // The network starts empty, and the Super Admin registers hospitals later!
    const bioChain = await BioChainNetwork.deploy();

    // 3. Wait for the transaction to finish
    await bioChain.waitForDeployment();

    // 4. Print the result
    console.log("----------------------------------------------------");
    console.log("✅ Contract deployed successfully!");
    console.log("📍 Address:", await bioChain.getAddress());
    console.log("----------------------------------------------------");
}

// Standard error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});