/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import { Component } from "react";
import { ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  
  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#121620] m-4 rounded-3xl border border-rose-500/20 shadow-2xl shadow-rose-500/5">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-6 border border-rose-500/20">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md">
            The BioChain interface encountered an unexpected error. This may be due to a blockchain connection timeout or a data mismatch.
          </p>
          <div className="bg-[#0b0e14] p-4 rounded-xl mb-8 w-full border border-slate-800">
             <code className="text-xs text-rose-400 block break-all">{this.state.error.message}</code>
          </div>
          <button 
            onClick={() => {
                this.setState({ error: null });
                window.location.reload();
            }}
            className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20"
          >
            Retry Connection
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
