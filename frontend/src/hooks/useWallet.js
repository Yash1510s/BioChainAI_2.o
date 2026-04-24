/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not found!");
      return null;
    }
    
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const network = await window.ethereum.request({ method: 'eth_chainId' });
      
      setWallet(accounts[0]);
      setChainId(network);
      
      // Check if on Hardhat (31337 / 0x7a69)
      if (network !== '0x7a69') {
        toast.error("Please switch to the BioChain Network (Hardhat Localhost)");
      }
      
      return accounts[0];
    } catch (err) {
      toast.error("User rejected connection");
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWallet(accounts.length > 0 ? accounts[0] : null);
      });
      window.ethereum.on('chainChanged', (hexChainId) => {
        setChainId(hexChainId);
        window.location.reload();
      });
    }
  }, []);

  return { wallet, chainId, isConnecting, connectWallet };
};
