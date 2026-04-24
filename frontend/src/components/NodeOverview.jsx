/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Stethoscope, Users, Server, Shield, ArrowRight, Activity, Database, FileText, Clock, Wifi, HardDrive, Cpu } from 'lucide-react';

const NodeOverview = ({ setActiveTab }) => {
    const [stats, setStats] = useState({ total_patients: 0, total_doctors: 0, total_appointments: 0, transactions: 0 });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/admin/node-stats`);
            setStats(res.data.stats);
            setActivities(res.data.activities);
        } catch (error) {
            console.error("Failed to fetch Node Stats:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-purple-400 animate-pulse gap-3">
            <Server className="animate-spin" size={24} /> Fetching Mainnet Telemetry...
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500 border border-purple-500/20">
                            <Server size={28} />
                        </div>
                        Enterprise Node Control Center
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm ml-[52px]">Monitor network telemetry, clinical staff deployment, and active smart contracts.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Network Online</span>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                {/* Doctors Stat */}
                <div className="bg-[#121620] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-blue-500/30 relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-all duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"><Stethoscope size={24} /></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Clinical Staff</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white">{stats.total_doctors}</h2>
                        <p className="text-xs text-blue-400 mt-1 font-medium">Mapped to your node</p>
                    </div>
                </div>

                {/* Patients Stat */}
                <div className="bg-[#121620] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-emerald-500/30 relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"><Users size={24} /></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Patients</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white">{stats.total_patients}</h2>
                        <p className="text-xs text-emerald-400 mt-1 font-medium">Secured on Web3</p>
                    </div>
                </div>

                {/* Node Status */}
                <div className="bg-[#121620] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-purple-500/30 relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500/5 rounded-full group-hover:bg-purple-500/10 transition-all duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="bg-purple-500/10 p-3 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"><Server size={24} /></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Node Status</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span> Synced
                        </h2>
                        <p className="text-xs text-slate-400 mt-2 font-mono">Mainnet Connection: Active</p>
                    </div>
                </div>

                {/* Transactions Stat */}
                <div className="bg-[#121620] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-amber-500/30 relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-amber-500/5 rounded-full group-hover:bg-amber-500/10 transition-all duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"><Shield size={24} /></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Smart Contracts</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white">{stats.transactions.toLocaleString()}</h2>
                        <p className="text-xs text-amber-400 mt-1 font-medium">Transactions Executed</p>
                    </div>
                </div>
            </div>

            {/* System Health + Quick Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#121620] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-emerald-500/20 transition">
                    <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400"><Wifi size={22} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</p>
                        <p className="text-lg font-bold text-white">99.97%</p>
                    </div>
                </div>
                <div className="bg-[#121620] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-blue-500/20 transition">
                    <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400"><HardDrive size={22} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">IPFS Storage</p>
                        <p className="text-lg font-bold text-white">2.4 GB <span className="text-xs text-slate-500 font-normal">used</span></p>
                    </div>
                </div>
                <div className="bg-[#121620] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-purple-500/20 transition">
                    <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400"><Cpu size={22} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gas (Sponsored)</p>
                        <p className="text-lg font-bold text-white">0.045 ETH</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Quick Actions */}
                <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="text-purple-400" size={20} /> Quick Actions
                    </h3>
                    
                    <div className="space-y-4">
                        <button 
                            onClick={() => setActiveTab('Staff Directory')}
                            className="w-full bg-[#0b0e14] hover:bg-purple-900/15 border border-slate-800 hover:border-purple-500/30 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-500/10 p-2.5 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200"><Stethoscope size={20} /></div>
                                <div className="text-left">
                                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition">Register New Doctor</span>
                                    <p className="text-[10px] text-slate-600 mt-0.5">Onboard clinical staff with Web3 identity</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-600 group-hover:text-purple-400 transition transform group-hover:translate-x-1" />
                        </button>

                        <button 
                            onClick={() => setActiveTab('Audit Logs')}
                            className="w-full bg-[#0b0e14] hover:bg-emerald-900/15 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-500/10 p-2.5 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200"><FileText size={20} /></div>
                                <div className="text-left">
                                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition">View Audit Logs</span>
                                    <p className="text-[10px] text-slate-600 mt-0.5">Cryptographic record of all events</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-600 group-hover:text-emerald-400 transition transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Right: Network Activity */}
                <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Database className="text-slate-400" size={20} /> Network Activity Log
                    </h3>
                    
                    <div className="space-y-4 custom-scrollbar max-h-[300px] overflow-y-auto pr-2">
                        {activities.length > 0 ? (
                            activities.map((act) => (
                                <div key={act.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#0b0e14] transition border border-transparent hover:border-slate-800 group">
                                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                        act.type === 'system' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]' :
                                        act.type === 'contract' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                                        act.type === 'staff' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' :
                                        'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-300 group-hover:text-white transition">{act.action}</p>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Clock size={10} /> {act.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <Database size={32} className="mx-auto mb-3 opacity-40" />
                                <p className="text-sm">No recent network activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NodeOverview;
