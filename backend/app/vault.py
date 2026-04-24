# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
import os
from typing import Optional

class KeyVault:
    """
    BioChain KeyVault Abstraction Layer
    In Dev: Fetches from environment variables
    In Prod: Should be updated to use AWS Secrets Manager or HashiCorp Vault.
    """
    
    def get_admin_key(self) -> str:
        # Never log, print, or return this key in any API response.
        admin_key = os.getenv("ADMIN_PRIVATE_KEY") or os.getenv("PRIVATE_KEY")
        if not admin_key:
            # Fallback to default Hardhat Account #0 for local dev if env is missing
            return "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" 
        return admin_key

    def get_admin_address(self) -> str:
        admin_address = os.getenv("ADMIN_WALLET_ADDRESS") or os.getenv("ACCOUNT_ADDRESS")
        if not admin_address:
            # Fallback to default Hardhat Account #0 address
            return "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        return admin_address
