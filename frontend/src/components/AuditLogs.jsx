import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ShieldAlert, Activity, Search, Hash, Clock, User, AlertTriangle, Link, Copy, Check, ExternalLink } from 'lucide-react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEvent, setFilterEvent] = useState('ALL');
    const [filterTime, setFilterTime] = useState('ALL');
    const [selectedTx, setSelectedTx] = useState(null);
    const [copiedHash, setCopiedHash] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/admin/audit-logs`);
            setLogs(res.data.logs || []);
        } catch (error) {
            console.error("Failed to fetch Audit Logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (hash) => {
        navigator.clipboard.writeText(hash);
        setCopiedHash(hash);
        setTimeout(() => setCopiedHash(null), 2000);
    };

    // Advanced Multi-level Filtering
    const filteredLogs = logs.filter(log => {
        const nameMatch = log.actor_name ? log.actor_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const hashMatch = log.tx_hash ? log.tx_hash.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const matchesSearch = nameMatch || hashMatch;
        const matchesEvent = filterEvent === 'ALL' || log.action_type === filterEvent;
        let matchesTime = true;
        if (filterTime === 'TODAY') {
            matchesTime = log.timestamp.includes('2026-03-20') || log.timestamp.includes('2026-03-19');
        } else if (filterTime === 'WEEK') {
            matchesTime = log.timestamp.includes('2026-03-20') || log.timestamp.includes('2026-03-19') || log.timestamp.includes('2026-03-18');
        }
        return matchesSearch && matchesEvent && matchesTime;
    });

    const getEventBadge = (log) => {
        const colors = {
            emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        };
        return colors[log.color] || 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-purple-400 animate-pulse gap-3">
            <Activity className="animate-spin" size={24} /> Decrypting On-Chain Audit Trail...
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            
            {/* Header + Filters */}
            <div className="bg-[#121620] rounded-2xl p-5 border border-slate-800 shadow-xl">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 border border-emerald-500/20">
                            <ShieldAlert size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Immutable Audit Logs</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Cryptographic record of all network events</p>
                        </div>
                    </div>
                    <div className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">
                        {filteredLogs.length} of {logs.length} events
                    </div>
                </div>
                
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                        <input 
                            type="text" 
                            placeholder="Search by name or tx hash..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0b0e14] text-sm text-white pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition"
                        />
                    </div>
                    <select 
                        value={filterEvent} 
                        onChange={(e) => setFilterEvent(e.target.value)}
                        className="bg-[#0b0e14] text-sm text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition appearance-none cursor-pointer"
                    >
                        <option value="ALL">All Events</option>
                        <option value="EMERGENCY_OVERRIDE">🚨 Emergency</option>
                        <option value="RECORD_SIGNED">📝 Records Signed</option>
                        <option value="ACCESS_GRANTED">✅ Access Granted</option>
                        <option value="ACCESS_REVOKED">❌ Access Revoked</option>
                        <option value="STAFF_ONBOARD">👤 Staff Onboard</option>
                        <option value="CONSENT_GRANTED">🔑 Consent</option>
                    </select>
                    <select 
                        value={filterTime} 
                        onChange={(e) => setFilterTime(e.target.value)}
                        className="bg-[#0b0e14] text-sm text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition appearance-none cursor-pointer"
                    >
                        <option value="ALL">All Time</option>
                        <option value="TODAY">Last 24h</option>
                        <option value="WEEK">This Week</option>
                    </select>
                </div>
            </div>

            {/* Event Cards List */}
            <div className="space-y-3">
                {filteredLogs.map((log) => (
                    <div 
                        key={log.id} 
                        onClick={() => setSelectedTx(log)}
                        className="bg-[#121620] rounded-2xl border border-slate-800 hover:border-slate-700 p-4 transition-all duration-200 cursor-pointer group card-hover"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            
                            {/* Left: Event indicator + Actor */}
                            <div className="flex items-center gap-3 md:w-[240px] flex-shrink-0">
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                    log.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                    log.color === 'rose' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                                    log.color === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                                    log.color === 'blue' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                    'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                                }`}></div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{log.actor_name}</p>
                                    <p className="text-[10px] text-slate-600 font-mono truncate">{log.actor_wallet?.substring(0, 10)}...{log.actor_wallet?.slice(-6)}</p>
                                </div>
                            </div>

                            {/* Center: Event badge + Description */}
                            <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border w-fit flex-shrink-0 ${getEventBadge(log)}`}>
                                    {log.action_type === 'EMERGENCY_OVERRIDE' && <AlertTriangle size={10} />}
                                    {log.action_type?.replace('_', ' ')}
                                </span>
                                <p className="text-xs text-slate-400 truncate">{log.description}</p>
                            </div>

                            {/* Right: Timestamp + Hash */}
                            <div className="flex items-center gap-4 md:flex-shrink-0 text-right">
                                <div className="hidden md:block">
                                    <p className="text-[10px] text-slate-600 font-mono">{log.timestamp?.split(' ')[0]}</p>
                                    <p className="text-[10px] text-slate-500 font-mono">{log.timestamp?.split(' ')[1]}</p>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleCopy(log.tx_hash); }}
                                    className="flex items-center gap-1.5 text-[10px] font-mono text-blue-500 hover:text-blue-400 transition bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-blue-500/10 hover:border-blue-500/30 flex-shrink-0"
                                >
                                    {copiedHash === log.tx_hash ? (
                                        <><Check size={10} className="text-emerald-400" /> Copied</>
                                    ) : (
                                        <><Copy size={10} /> {log.tx_hash?.substring(0, 6)}...{log.tx_hash?.slice(-4)}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredLogs.length === 0 && (
                    <div className="bg-[#121620] rounded-2xl border border-slate-800 py-16 text-center">
                        <div className="bg-slate-800/30 p-4 rounded-full mb-4 inline-block">
                            <Search size={32} className="text-slate-500 opacity-40" />
                        </div>
                        <p className="font-bold text-white mb-1">No Events Found</p>
                        <p className="text-sm text-slate-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
            
            {/* Transaction Receipt Modal */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSelectedTx(null)}>
                    <div className="bg-[#121620] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        
                        {/* Modal Header */}
                        <div className="bg-[#0b0e14] p-5 border-b border-slate-700 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Activity className="text-emerald-500" size={20} /> Transaction Receipt
                                </h3>
                                <p className="text-[10px] text-slate-500 mt-1 font-mono">Status: Confirmed on Mainnet</p>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white p-2 bg-slate-800/50 rounded-full transition">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            
                            <div>
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Transaction Hash</span>
                                <div className="bg-[#0b0e14] border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                                    <span className="text-emerald-400 font-mono text-xs break-all flex-1">{selectedTx.tx_hash}</span>
                                    <button onClick={() => handleCopy(selectedTx.tx_hash)} className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition flex-shrink-0">
                                        {copiedHash === selectedTx.tx_hash ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Timestamp</span>
                                    <div className="bg-[#0b0e14] border border-slate-800 p-3 rounded-xl text-slate-300 font-mono text-xs">
                                        {selectedTx.timestamp}
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Network</span>
                                    <div className="bg-[#0b0e14] border border-slate-800 p-3 rounded-xl text-slate-300 font-mono text-xs flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-500"></span> BioChain L2 (Polygon)
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">From (Actor)</span>
                                <div className="bg-[#0b0e14] border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <User size={14} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white">{selectedTx.actor_name}</p>
                                        <p className="text-[10px] text-slate-500 font-mono truncate">{selectedTx.actor_wallet}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Event Payload</span>
                                <div className="bg-[#0b0e14] border border-slate-800 p-4 rounded-xl">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border mb-2 ${getEventBadge(selectedTx)}`}>
                                        {selectedTx.action_type}
                                    </span>
                                    <p className="text-sm text-slate-300">{selectedTx.description}</p>
                                    <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                                        <p>Gas: <span className="text-slate-400">0.00045 ETH (Sponsored)</span></p>
                                        <p>Relayer: <span className="text-emerald-500">Active</span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditLogs;
