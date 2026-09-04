/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Search, Users, Activity, FileText, Shield, ArrowRight, Phone, Lock, CheckCircle2, UserCheck, Globe, AlertTriangle, Calendar } from 'lucide-react';

const PatientsDirectory = ({ doctorData, onSelectPatient }) => {
    const [directoryTab, setDirectoryTab] = useState('assigned'); // 'assigned' | 'network'
    const [assignedPatients, setAssignedPatients] = useState([]);
    const [allPatients, setAllPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [accessDeniedPatient, setAccessDeniedPatient] = useState(null); // Patient object when locked
    const [networkAccessMap, setNetworkAccessMap] = useState({});

    const doctorWallet = doctorData?.wallet_address;

    const fetchDirectories = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch assigned patients
            if (doctorWallet) {
                const assignedRes = await axios.get(`${API_BASE_URL}/api/patients/doctor/${doctorWallet}`);
                const assigned = assignedRes.data.assigned_patients || [];
                setAssignedPatients(assigned);

                // Pre-map active access
                const map = {};
                assigned.forEach(p => {
                    map[p.email] = p.access_granted !== false;
                });
                setNetworkAccessMap(map);
            }

            // 2. Fetch all hospital patients
            const allRes = await axios.get(`${API_BASE_URL}/api/patients`);
            setAllPatients(allRes.data.patients || []);
        } catch (error) {
            console.error("Error fetching directories:", error);
        } finally {
            setLoading(false);
        }
    }, [doctorWallet]);

    useEffect(() => {
        fetchDirectories();
    }, [fetchDirectories]);

    // Check permission then navigate to patient chart
    const checkAndOpenPatient = async (patient) => {
        if (!doctorWallet) {
            onSelectPatient && onSelectPatient(patient);
            return;
        }
        try {
            const res = await axios.get(`${API_BASE_URL}/care-team/check-access/${patient.email}/${doctorWallet}`);
            if (res.data.access_granted === false) {
                setAccessDeniedPatient(patient);
            } else {
                setAccessDeniedPatient(null);
                onSelectPatient && onSelectPatient(patient);
            }
        } catch {
            setAccessDeniedPatient(patient);
        }
    };

    const currentList = directoryTab === 'assigned' ? assignedPatients : allPatients;

    // Real-time Search Logic
    const filteredPatients = currentList.filter(patient => 
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.includes(searchTerm)
    );

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Loading Patient Directory & Access Rules...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Access Denied Modal / Banner */}
            {accessDeniedPatient && (
                <div className="bg-rose-950/80 border-2 border-rose-500/60 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400 shrink-0">
                            <Lock size={28} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    Zero-Trust Consent Required
                                </h3>
                                <button 
                                    onClick={() => setAccessDeniedPatient(null)} 
                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-xl transition"
                                >
                                    Dismiss
                                </button>
                            </div>
                            <p className="text-sm text-rose-200/90 mt-1">
                                <span className="font-semibold text-white">{accessDeniedPatient.name}</span> has not scheduled an appointment with you or granted cryptographic access to their medical records.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="text-xs bg-rose-900/50 border border-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl font-mono">
                                    Patient Consent: Revoked / Not Granted
                                </div>
                                <span className="text-xs text-slate-400">EHR Vault remains encrypted on IPFS/Blockchain</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header & Mode Switcher */}
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Users className="text-blue-500" size={28} /> Patient Directory & Access
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">Manage clinical charts with Web3 Zero-Trust patient consent.</p>
                    </div>
                    
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search Name, Email, Phone..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0b0e14] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:border-blue-500 outline-none transition shadow-inner"
                        />
                    </div>
                </div>

                {/* Tab Controls */}
                <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
                    <button 
                        onClick={() => { setDirectoryTab('assigned'); setAccessDeniedPatient(null); }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                            directoryTab === 'assigned'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30'
                                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <UserCheck size={16} /> My Assigned Patients ({assignedPatients.length})
                    </button>

                    <button 
                        onClick={() => { setDirectoryTab('network'); setAccessDeniedPatient(null); }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                            directoryTab === 'network'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30'
                                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <Globe size={16} /> Hospital Network Directory ({allPatients.length})
                    </button>
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-[#121620] rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0b0e14] border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                                <th className="py-4 px-6 font-bold">Patient</th>
                                <th className="py-4 px-6 font-bold">Contact Info</th>
                                <th className="py-4 px-6 font-bold">Medical Overview</th>
                                <th className="py-4 px-6 font-bold text-center">Consent Status</th>
                                <th className="py-4 px-6 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-800/50">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient, index) => {
                                    const hasActiveAccess = directoryTab === 'assigned' 
                                        ? patient.access_granted !== false 
                                        : !!networkAccessMap[patient.email];

                                    return (
                                        <tr key={index} className="hover:bg-slate-800/30 transition group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
                                                        {patient.name?.substring(0, 2).toUpperCase() || 'PT'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white flex items-center gap-2">
                                                            {patient.name}
                                                            {patient.appointment_status && (
                                                                <span className="text-[10px] font-normal bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-1">
                                                                    <Calendar size={10} /> {patient.appointment_status}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                                                            <Shield size={10} className="text-emerald-500"/> ID: {patient.idHash ? patient.idHash.substring(0,10) + '...' : 'Verified'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-slate-300">{patient.email}</p>
                                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Phone size={10}/> {patient.phone}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2">
                                                    <span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded text-[10px] font-bold border border-rose-500/20">
                                                        {patient.bloodGroup || 'N/A'}
                                                    </span>
                                                    <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-[10px] font-bold border border-yellow-500/20 max-w-[100px] truncate">
                                                        {patient.allergies || 'None'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                {hasActiveAccess ? (
                                                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-500/20">
                                                        <CheckCircle2 size={12} className="text-emerald-400" /> Active Consent
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-500/20">
                                                        <Lock size={12} className="text-amber-400" /> Consent Required
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button 
                                                    onClick={() => checkAndOpenPatient(patient)}
                                                    className={`p-2.5 rounded-xl transition flex items-center justify-center w-full max-w-[130px] ml-auto gap-2 text-xs font-bold shadow-lg ${
                                                        hasActiveAccess
                                                            ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                                            : 'bg-slate-800 hover:bg-amber-600/80 text-slate-300 hover:text-white border border-slate-700'
                                                    }`}
                                                >
                                                    {hasActiveAccess ? (
                                                        <>Open Chart <ArrowRight size={14} /></>
                                                    ) : (
                                                        <><Lock size={13} /> View Locked</>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-16 text-center text-slate-500">
                                        {directoryTab === 'assigned' ? (
                                            <div className="max-w-md mx-auto space-y-3">
                                                <UserCheck className="mx-auto text-slate-600" size={40} />
                                                <p className="text-base font-bold text-slate-400">No Assigned Patients Yet</p>
                                                <p className="text-xs text-slate-500">When patients book appointments with you, they will automatically be mapped here with full cryptographic chart access.</p>
                                                <button 
                                                    onClick={() => setDirectoryTab('network')}
                                                    className="mt-2 inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                                                >
                                                    <Globe size={14} /> Browse Hospital Network Directory →
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Search className="mx-auto text-slate-600" size={32} />
                                                <p>No patients found matching "{searchTerm}"</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientsDirectory;
