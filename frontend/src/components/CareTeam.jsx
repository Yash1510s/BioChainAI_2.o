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
import { Shield, ShieldOff, User, Building, Activity, Lock, Unlock, Users, CheckCircle, XCircle, BadgeCheck } from 'lucide-react';

const CareTeam = ({ userData, role }) => {
    const [careTeam, setCareTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        fetchCareTeam();
    }, [userData]);

    const fetchCareTeam = async () => {
        setLoading(true);
        const userId = userData?.email || userData?.wallet_address;
        
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`${API_BASE_URL}/care-team/${userId}`);
            setCareTeam(res.data.care_team || []);
        } catch (error) {
            console.error("Failed to fetch Care Team:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAccess = async (doctorWallet, currentAccess) => {
        const userId = userData?.email || userData?.wallet_address;
        const newAccessState = !currentAccess;
        
        setCareTeam(prev => prev.map(doc => 
            doc.wallet_address === doctorWallet ? { ...doc, access_granted: newAccessState } : doc
        ));

        try {
            await axios.put(`${API_BASE_URL}/care-team/toggle-access`, {
                patient_email: userId,
                doctor_wallet: doctorWallet,
                grant_access: newAccessState
            });
            
            setActionMessage(newAccessState ? "🟢 Access Granted to Doctor" : "🔴 Access Revoked from Doctor");
            setTimeout(() => setActionMessage(''), 3000);
            
        } catch (error) {
            console.error("Failed to toggle access:", error);
            setCareTeam(prev => prev.map(doc => 
                doc.wallet_address === doctorWallet ? { ...doc, access_granted: currentAccess } : doc
            ));
            setActionMessage("❌ Failed to update blockchain permissions.");
            setTimeout(() => setActionMessage(''), 3000);
        }
    };

    // --- COMPUTED STATS ---
    const totalDoctors = careTeam.length;
    const grantedCount = careTeam.filter(doc => doc.access_granted).length;
    const revokedCount = totalDoctors - grantedCount;

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Verifying Blockchain Permissions...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up">
            
            {/* Header Section */}
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Shield className="text-blue-500" size={28} /> My Care Team
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {role === 'DOCTOR' 
                            ? "Manage doctors who have access to your personal health records." 
                            : "Control which doctors can decrypt and view your medical history."}
                    </p>
                </div>
                <div className="bg-[#0b0e14] px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2 relative z-10 shadow-lg">
                    <Lock size={16} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-300 tracking-wider">WEB3 SECURED VAULT</span>
                </div>
            </div>

            {/* Notification Toast */}
            {actionMessage && (
                <div className="bg-[#0b0e14] border border-slate-700 p-4 rounded-xl text-center font-bold text-sm text-white shadow-lg">
                    {actionMessage}
                </div>
            )}

            {careTeam.length > 0 ? (
                <>
                    {/* STATS WIDGETS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#121620] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500"><Users size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase">Total Doctors</p>
                                <p className="text-2xl font-bold text-white">{totalDoctors}</p>
                            </div>
                        </div>
                        <div className="bg-[#121620] border border-emerald-500/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500"><CheckCircle size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-emerald-500/70 uppercase">Access Granted</p>
                                <p className="text-2xl font-bold text-emerald-400">{grantedCount}</p>
                            </div>
                        </div>
                        <div className="bg-[#121620] border border-rose-500/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                            <div className="bg-rose-500/10 p-3 rounded-xl text-rose-500"><XCircle size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-rose-500/70 uppercase">Access Revoked</p>
                                <p className="text-2xl font-bold text-rose-400">{revokedCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* DOCTORS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children animate-fade-in-up mt-8">
                        {careTeam.map((doc, index) => (
                            <div key={index} className={`bg-[#121620] rounded-3xl p-6 border transition-all shadow-xl relative overflow-hidden group card-hover ${doc.access_granted ? 'border-emerald-500/30' : 'border-rose-500/30 opacity-80'}`}>
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 ${doc.access_granted ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' : 'bg-rose-500/5 group-hover:bg-rose-500/10'}`}></div>
                                
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-slate-700 shadow-lg group-hover:shadow-xl transition-all">
                                        {doc.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border ${doc.access_granted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                        {doc.access_granted ? <Unlock size={10} /> : <Lock size={10} />}
                                        {doc.access_granted ? 'Active' : 'Blocked'}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 relative z-10 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                    Dr. {doc.name.replace(/^Dr\.\s*/i, '')}
                                    {doc.is_verified && (
                                        <BadgeCheck 
                                            className="text-blue-500 flex-shrink-0" 
                                            size={18} 
                                            title="Verified & Credentialed by BioChain Node Admin" 
                                        />
                                    )}
                                </h3>
                                <p className="text-xs text-blue-400 font-medium mb-4 relative z-10">{doc.specialization}</p>
                                <div className="space-y-2 mb-6">
                                    <p className="text-sm text-slate-400 flex items-center gap-2"><Building size={14} className="text-slate-500"/> {doc.hospital}</p>
                                </div>
                                <button 
                                    onClick={() => handleToggleAccess(doc.wallet_address, doc.access_granted)}
                                    className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg ${doc.access_granted ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'}`}
                                >
                                    {doc.access_granted ? <><ShieldOff size={18} /> Revoke Access</> : <><Shield size={18} /> Grant Access</>}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* PERMISSION AUDIT LOG TABLE */}
                    <div className="bg-[#121620] rounded-3xl border border-slate-800 shadow-xl overflow-hidden mt-8">
                        <div className="bg-[#0b0e14] px-6 py-4 border-b border-slate-800">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Permission Audit Log</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#0b0e14]/50 border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                                        <th className="py-3 px-6 font-bold">Doctor Name</th>
                                        <th className="py-3 px-6 font-bold">Specialization</th>
                                        <th className="py-3 px-6 font-bold">Wallet ID</th>
                                        <th className="py-3 px-6 font-bold text-right">Current Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-800/50">
                                    {careTeam.map((doc, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/30 transition">
                                            <td className="py-4 px-6 font-bold text-white">Dr. {doc.name.replace(/^Dr\.\s*/i, '')}</td>
                                            <td className="py-4 px-6 text-slate-400">{doc.specialization}</td>
                                            <td className="py-4 px-6 text-slate-500 font-mono text-xs">{doc.wallet_address}</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${doc.access_granted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                                    {doc.access_granted ? 'Granted' : 'Revoked'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="col-span-full bg-[#121620] border border-slate-800 rounded-3xl p-12 text-center text-slate-500 shadow-xl">
                    <Shield size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-white mb-2">No Authorized Doctors Yet</h3>
                    <p>When you book an appointment, the treating doctor will appear here for you to manage their access.</p>
                </div>
            )}
        </div>
    );
};

export default CareTeam;
