const hre = require("hardhat");

async function main() {
    console.log("🏥 Deploying BioChainHospital...");

    // 1. Get the Contract Factory (The Blueprint)
    const BioChainHospital = await hre.ethers.getContractFactory("BioChainHospital");

    // 2. Deploy it (We pass the Hospital Name to the constructor here)
    const bioChain = await BioChainHospital.deploy("BioChain General Hospital");

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