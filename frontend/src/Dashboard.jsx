import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, FileText, User, Heart, Phone, Clock,
    Shield, Thermometer, Droplet, Weight, Users,
    ClipboardPlus, Stethoscope, AlertOctagon, Search,
    Zap, ArrowLeft, X, ChevronRight, Filter, AlertCircle,
    CheckCircle2, CheckCircle, Plus, Calendar, Briefcase, MapPin, Building, Server, BadgeCheck
} from 'lucide-react';
import IssueRecordModal from './components/IssueRecordModal';

const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');


function Dashboard({ role, userData, selectedPatient, setSelectedPatient, setActiveTab }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- NEW STATE: TRACK WHICH PATIENT IS OPEN ---
    // const [selectedPatient, setSelectedPatient] = useState(null); // Managed by App.jsx
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [selectedHistoryRecord, setSelectedHistoryRecord] = useState(null);
    const [patientRecords, setPatientRecords] = useState([]); // <-- NEW STATE FOR REAL RECORDS
    const [patientProfile, setPatientProfile] = useState(null); // <-- NEW STATE FOR FULL PROFILE
    const [appointments, setAppointments] = useState([]);
    const [approvalInputs, setApprovalInputs] = useState({}); // To store date/time for approval
    const [liveVitals, setLiveVitals] = useState(null); // <-- NEW STATE FOR LIVE VITALS

    // Doctor ki asli appointments fetch karne ka logic
    useEffect(() => {
        if (role?.includes('DOCTOR') && userData?.wallet_address) {
            const fetchAppointments = async () => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/appointments/doctor/${userData.wallet_address}`);
                    setAppointments(res.data.appointments || []);
                } catch (error) {
                    console.error("Failed to fetch appointments:", error);
                }
            };
            fetchAppointments();
        }
    }, [role, userData]);

    const handleApprove = async (appId) => {
        const data = approvalInputs[appId];
        if (!data?.date || !data?.time) {
            alert("⚠️ Please select both Date and Time to approve this appointment.");
            return;
        }
        
        try {
            await axios.put(`${API_BASE_URL}/appointments/approve/${appId}`, {
                appointment_date: data.date,
                appointment_time: data.time
            });
            // Refresh the list after approval
            const res = await axios.get(`${API_BASE_URL}/appointments/doctor/${userData.wallet_address}`);
            setAppointments(res.data.appointments || []);
        } catch (error) {
            console.error("Approval failed:", error);
            alert("Failed to approve appointment.");
        }
    };

    // --- NEW: Function to manually fetch patient records & profile ---
    const fetchPatientRecords = async () => {
        if (!selectedPatient) return;
        try {
            const pid = selectedPatient.email || selectedPatient.id;
            const res = await axios.get(`${API_BASE_URL}/record/patient/${pid}`);
            if (res.data.status === "Success") {
                setPatientRecords(res.data.records);
            }

            // Fetch full profile for doctor if they only got '{name, email}' via appointments tab
            if (role?.includes('DOCTOR')) {
                const profileRes = await axios.get(`${API_BASE_URL}/api/patient/${pid}`);
                if (profileRes.data.status === "Success") {
                    setPatientProfile(profileRes.data.patient);
                }
            }
        } catch (err) {
            console.error("Error fetching patient details:", err);
        }
    };

    // Fetch records when a patient is selected
    useEffect(() => {
        if (selectedPatient) {
            fetchPatientRecords();
        }
    }, [selectedPatient]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Admin dashboard requires specific health telemetry stats
                const endpoint = role === 'HOSPITAL_ADMIN' ? `${API_BASE_URL}/api/admin/node-stats` : `${API_BASE_URL}/dashboard`;
                const res = await axios.get(endpoint);
                setData(res.data);
            } catch (err) {
                console.error("Dashboard data fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [role]);

    // --- NEW: WEB SOCKET FOR LIVE DASHBOARD CARDS ---
    useEffect(() => {
        // Only fetch vitals if we are a patient, or a doctor viewing themselves/a patient
        if (role === 'HOSPITAL_ADMIN') return;

        const patientId = selectedPatient?.wallet_address || selectedPatient?.email || userData?.wallet_address || userData?.email || 'demo-patient';
        
        let ws;
        let reconnectTimer;

        const connectWebSocket = () => {
            const encodedId = encodeURIComponent(patientId);
            const wsUrl = `${WS_BASE_URL}/ws/vitals/${encodedId}`;
            ws = new WebSocket(wsUrl);

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setLiveVitals({ hr: data.bpm, spo2: data.spo2, _status: data.status });
                } catch (e) {
                    console.error("Dashboard WebSocket error:", e);
                }
            };

            ws.onclose = () => {
                reconnectTimer = setTimeout(connectWebSocket, 3000); // Reconnect
            };
        };

        connectWebSocket();

        return () => {
            clearTimeout(reconnectTimer);
            if (ws) {
                ws.onclose = null; // Prevent infinite reconnect loop on unmount
                ws.close();
            }
        };
    }, [selectedPatient, userData, role]);

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Loading BioChain Node...
        </div>
    );

    // --- COMPONENT: VITALS CARD (Reusable) ---
    const VitalsWidget = ({ title, values }) => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`bg-[#121620] p-5 rounded-2xl border ${values._status === 'CRITICAL' && values.hr > 100 ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : 'border-slate-800'} shadow-lg relative overflow-hidden group transition-all duration-300`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-rose-500"><Heart size={60} /></div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-rose-500">
                        <Heart size={20} className={values._status === 'CRITICAL' && values.hr > 100 ? "animate-ping absolute opacity-75" : "animate-pulse"} />
                        <Heart size={20} className="relative" />
                        <span className="text-xs font-bold uppercase tracking-wider">{title} Heart Rate</span>
                    </div>
                    {values._status === 'CRITICAL' && values.hr > 100 && <span className="text-[9px] bg-rose-500/20 text-rose-400 px-2 rounded-full font-bold uppercase animate-pulse">HIGH</span>}
                </div>
                <h3 className={`text-3xl font-bold ${values._status === 'CRITICAL' && values.hr > 100 ? 'text-rose-400' : 'text-white'}`}>{values.hr} <span className="text-sm text-slate-500 font-normal">bpm</span></h3>
            </div>

            <div className={`bg-[#121620] p-5 rounded-2xl border ${values._status === 'CRITICAL' && values.spo2 < 95 ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'border-slate-800'} shadow-lg relative overflow-hidden group transition-all duration-300`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-blue-500"><Activity size={60} /></div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-blue-500">
                        <Activity size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">{title} SpO2</span>
                    </div>
                    {values._status === 'CRITICAL' && values.spo2 < 95 && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 rounded-full font-bold uppercase animate-pulse">LOW</span>}
                </div>
                <h3 className={`text-3xl font-bold ${values._status === 'CRITICAL' && values.spo2 < 95 ? 'text-amber-400' : 'text-white'}`}>{values.spo2} <span className="text-sm text-slate-500 font-normal">%</span></h3>
            </div>

            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-cyan-500"><Droplet size={60} /></div>
                <div className="flex items-center gap-2 text-cyan-500 mb-2">
                    <Droplet size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">{title} BP</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{values.bp}</h3>
            </div>

            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-500"><Weight size={60} /></div>
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                    <Weight size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">{title} Weight</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{values.weight} <span className="text-sm text-slate-500 font-normal">kg</span></h3>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen text-white">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6 print:hidden">
                    <div className="flex items-center gap-4">
                        {selectedPatient ? (
                            <button onClick={() => setSelectedPatient(null)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition">
                                <ArrowLeft size={24} className="text-slate-200" />
                            </button>
                        ) : (
                            <div className={`p-3 rounded-2xl ${role === 'DOCTOR' ? 'bg-blue-600/20 text-blue-400' : role === 'HOSPITAL_ADMIN' ? 'bg-purple-600/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {role === 'DOCTOR' ? <Stethoscope size={32} /> : role === 'HOSPITAL_ADMIN' ? <Building size={32} /> : <Activity size={32} />}
                            </div>
                        )}

                        <div>
                            {/* DYNAMIC TITLE BASED ON ROLE */}
                            {role?.includes('DOCTOR') && !selectedPatient ? (
                                <>
                                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                        Welcome back, {userData?.name?.replace(/^Dr\.\s*/i, '') || 'Doctor'} 
                                        {userData?.is_verified && (
                                            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                                                <BadgeCheck className="text-blue-400" size={16} />
                                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Verified Identity</span>
                                            </div>
                                        )}
                                    </h1>
                                    <p className="text-slate-400 text-sm mt-2">
                                        Your medical node is fully synced and secured on-chain.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        {selectedPatient ? `Patient: ${selectedPatient.name}` : 
                                         role === 'HOSPITAL_ADMIN' ? `${userData?.hospital_name || 'Hospital Network'}` : 
                                         userData?.name || "Patient Profile"}
                                    </h1>
                                    <p className="text-slate-400 text-sm">
                                        {selectedPatient ? 'Viewing Live Clinical Data' : 
                                         role === 'HOSPITAL_ADMIN' ? 'Enterprise Node Control Center' : 
                                         'Manage your decentralized health ecosystem.'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
 
                    {role?.includes('DOCTOR') && !selectedPatient && (
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                                <input placeholder="Search Patient ID..." className="bg-[#121620] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 w-64 text-sm focus:border-blue-500 outline-none transition focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-blue-900/20">
                                <ClipboardPlus size={18} /> New Record
                            </button>
                        </div>
                    )}
                </div>

                {/* =========================================================
                    1. ADMIN DASHBOARD (Only visible to HOSPITAL_ADMIN)
                   ========================================================= */}
                {role === 'HOSPITAL_ADMIN' && (
                    <div className="space-y-8 print:hidden animate-fade-in-up">
                        {/* --- ADMIN STAT CARDS (4-Grid) --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
                            <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-purple-500/30">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/5 rounded-full group-hover:bg-purple-500/10 transition-all duration-500"></div>
                                <div className="flex justify-between mb-4 relative z-10">
                                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"><Stethoscope size={22} /></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Clinical Staff</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white relative z-10">{data?.stats?.total_doctors || '—'}</h3>
                                <p className="text-xs text-purple-400 mt-2 font-medium">Registered doctors</p>
                            </div>
                            <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-blue-500/30">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-all duration-500"></div>
                                <div className="flex justify-between mb-4 relative z-10">
                                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"><Users size={22} /></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Patients</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white relative z-10">{data?.stats?.total_patients || '—'}</h3>
                                <p className="text-xs text-blue-400 mt-2 font-medium">Mapped to your node</p>
                            </div>
                            <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-emerald-500/30">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                                <div className="flex justify-between mb-4 relative z-10">
                                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400"><Server size={22} /></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Node Status</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2 relative z-10">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                    <h3 className="text-xl font-bold text-emerald-400">Synced to Mainnet</h3>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 font-medium">All systems operational</p>
                            </div>
                            <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-amber-500/30">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/5 rounded-full group-hover:bg-amber-500/10 transition-all duration-500"></div>
                                <div className="flex justify-between mb-4 relative z-10">
                                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"><Shield size={22} /></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Smart Contracts</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white relative z-10">{(data?.stats?.transactions || 0).toLocaleString()}</h3>
                                <p className="text-xs text-amber-400 mt-2 font-medium">Records on chain</p>
                            </div>
                        </div>

                        {/* --- QUICK ACTIONS + RECENT ACTIVITY (2-Col) --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Quick Actions */}
                            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                                <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                                    <Stethoscope size={18} className="text-purple-400" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setActiveTab('Staff Directory')}
                                        className="w-full bg-[#0b0e14] hover:bg-purple-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-purple-500/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-purple-500/15 p-2.5 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200"><User size={18} /></div>
                                            Register New Doctor
                                        </div>
                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('Audit Logs')}
                                        className="w-full bg-[#0b0e14] hover:bg-blue-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-blue-500/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-500/15 p-2.5 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200"><FileText size={18} /></div>
                                            View Audit Logs
                                        </div>
                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('Node Overview')}
                                        className="w-full bg-[#0b0e14] hover:bg-emerald-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-emerald-500/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-500/15 p-2.5 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200"><Shield size={18} /></div>
                                            Manage Smart Contracts
                                        </div>
                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                </div>
                            </div>

                            {/* Recent Network Activity */}
                            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                                <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                                    <Activity size={18} className="text-emerald-400" /> Network Activity
                                </h3>
                                <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                                    {data?.activities?.map((act, idx) => (
                                        <div key={idx} className="relative">
                                            <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-[#121620] shadow-lg ${
                                                act.type === 'system' ? 'bg-emerald-500 shadow-emerald-500/20' :
                                                act.type === 'record' ? 'bg-blue-500 shadow-blue-500/20' :
                                                act.type === 'contract' ? 'bg-amber-500 shadow-amber-500/20' :
                                                'bg-purple-500 shadow-purple-500/20'
                                            }`}></div>
                                            <h4 className="text-sm font-bold text-white">{act.action}</h4>
                                            <p className="text-xs text-slate-500 mt-1">Network: BioChain Protocol</p>
                                            <p className="text-[10px] text-slate-600 font-mono mt-1">{act.time}</p>
                                        </div>
                                    ))}
                                    {!data?.activities && (
                                        <div className="relative">
                                            <div className="absolute -left-[25px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121620]"></div>
                                            <h4 className="text-sm font-bold text-white">Node Sync Completed</h4>
                                            <p className="text-xs text-slate-500 mt-1">All blockchain data synchronized</p>
                                            <p className="text-[10px] text-slate-600 font-mono mt-1">Just now</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================
                    2. VITALS SECTION (Visible to Patient or when Doctor is viewing a Patient)
                   ========================================================= */}
                {role !== 'HOSPITAL_ADMIN' && (
                    <div className="mb-8 print:hidden">
                        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <Activity size={16} /> {selectedPatient ? "Patient Live Monitor" : "Live Personal Health Monitor"}
                        </h3>

                        {/* Logic to determine WHICH vitals to show */}
                         <VitalsWidget
                            title={selectedPatient ? "Patient" : "My"}
                            values={liveVitals ? { ...liveVitals, bp: "120/80", weight: 70 } : (
                                selectedPatient || role === 'PATIENT' ?
                                { hr: 72, spo2: 98, bp: "120/80", weight: 70 } : 
                                { hr: 65, spo2: 99, bp: "118/76", weight: 75 }  
                            )}
                        />
                    </div>
                )}

                {/* =========================================================
            DOCTOR'S MAIN DASHBOARD (When NO patient is selected)
           ========================================================= */}
                {role?.includes('DOCTOR') && !selectedPatient && (
                    <div className="space-y-8 border-t border-slate-800 pt-8 print:hidden">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Shield size={24} className="text-blue-400" /> Clinical Workspace
                        </h3>

                        {/* HOSPITAL STATS */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                                <div className="flex justify-between mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Patients</span>
                                </div>
                                <h3 className="text-3xl font-bold">1,248</h3>
                            </div>
                            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                                <div className="flex justify-between mb-4">
                                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 animate-pulse"><AlertOctagon size={20} /></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Critical Alerts</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">3</h3>
                            </div>
                            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                                <div className="flex justify-between mb-4">
                                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><ClipboardPlus size={20} /></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Reports</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">14</h3>
                            </div>
                            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                                <div className="flex justify-between mb-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Zap size={20} /></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Node Status</span>
                                </div>
                                <h3 className="text-lg font-bold text-emerald-400">Synced</h3>
                            </div>
                        </div>

                        {/* --- 3. DOCTOR'S QUEUE (Dynamic Appointments) --- */}
                        <div className="space-y-8 mt-8">
                            
                            {/* Section A: Pending Requests (Needs Action) */}
                            <div className="bg-[#121620] rounded-3xl p-6 border border-yellow-500/30 shadow-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                                    <Clock size={18} className="text-yellow-400" /> Pending Consultation Requests
                                </h3>
                                
                                <div className="space-y-4">
                                    {appointments.filter(a => a.status === 'Pending').length > 0 ? (
                                        appointments.filter(a => a.status === 'Pending').map((app) => (
                                            <div key={app._id} className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-500/20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition hover:bg-yellow-500/10">
                                                <div>
                                                    <h4 className="font-bold text-white text-lg">{app.patient_name}</h4>
                                                    <p className="text-sm text-slate-400 mt-1">Reason: <span className="italic text-slate-300">"{app.reason}"</span></p>
                                                </div>
                                                
                                                {/* Approval Controls */}
                                                <div className="flex flex-wrap items-center gap-3 bg-[#0b0e14] p-2 rounded-xl border border-slate-800">
                                                    <input 
                                                        type="date" 
                                                        className="bg-transparent text-sm text-white outline-none border-r border-slate-700 pr-3 cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                                        onChange={(e) => setApprovalInputs({...approvalInputs, [app._id]: {...approvalInputs[app._id], date: e.target.value}})}
                                                    />
                                                    <input 
                                                        type="time" 
                                                        className="bg-transparent text-sm text-white outline-none border-r border-slate-700 pr-3 cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                                        onChange={(e) => setApprovalInputs({...approvalInputs, [app._id]: {...approvalInputs[app._id], time: e.target.value}})}
                                                    />
                                                    <button 
                                                        onClick={() => handleApprove(app._id)}
                                                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 italic p-4 text-center">No pending requests right now.</p>
                                    )}
                                </div>
                            </div>

                            {/* Section B: Scheduled Appointments (Approved) */}
                            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                                    <CheckCircle size={18} className="text-emerald-400" /> Scheduled Appointments
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {appointments.filter(a => a.status === 'Scheduled').length > 0 ? (
                                        appointments.filter(a => a.status === 'Scheduled').map((app) => (
                                            <div key={app._id} className="bg-[#0b0e14] p-5 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-blue-500/30 transition">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center font-bold border border-blue-500/20">
                                                        {app.patient_name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white">{app.patient_name}</h4>
                                                        <p className="text-xs text-emerald-400 font-medium mt-1">
                                                            {app.appointment_date} at {app.appointment_time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedPatient({ name: app.patient_name, email: app.patient_email })}
                                                    className="bg-slate-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition opacity-0 group-hover:opacity-100 shadow-lg"
                                                >
                                                    Open Profile
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center p-8 border border-slate-800 border-dashed rounded-2xl">
                                            <p className="text-sm text-slate-500">You don't have any scheduled appointments.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* =========================================================
            PATIENT DETAIL VIEW (MAIN CARD) - FOR PATIENTS ONLY
           ========================================================= */}
                {role === 'PATIENT' && data && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 border-t border-slate-800 pt-8 print:hidden">
                        <motion.div className="lg:col-span-2 bg-[#121620] rounded-3xl p-8 border border-slate-800 shadow-xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{userData?.name || "Patient"}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono bg-black/20 px-2 py-1 rounded w-fit border border-slate-800/50">
                                        <Shield size={12} className="text-emerald-500" />
                                        {userData?.idHash ? (
                                            <span className="text-[10px] tracking-tight">
                                                {userData.idHash.substring(0, 10)}...{userData.idHash.substring(userData.idHash.length - 8)}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] opacity-50 underline decoration-dotted">PENDING_SYNC</span>
                                        )}
                                    </div>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                    MY HEALTH PROFILE
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                                    <div className="text-rose-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"><Heart size={12} /> Blood</div>
                                    <p className="text-xl font-black text-white">{userData?.bloodGroup || "N/A"}</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                                    <div className="text-amber-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"><FileText size={12} /> Allergies</div>
                                    <p className="text-sm font-bold text-white truncate">{userData?.allergies || "None"}</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                                    <div className="text-emerald-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"><Phone size={12} /> Mobile</div>
                                    <p className="text-sm font-bold text-white tracking-tighter">{userData?.phone || "N/A"}</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                                    <div className="text-blue-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"><Phone size={12} /> Emergency</div>
                                    <p className="text-sm font-bold text-white tracking-tighter break-all">{userData?.emergencyContact || "N/A"}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                            <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2">
                                <Activity size={16} className="text-emerald-500" /> Recent Activity
                            </h3>
                            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-slate-800">
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#121620]"></div>
                                    <p className="text-sm font-bold text-white">Vitals Synced</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Automated IoT Check via BioHub</p>
                                    <p className="text-[10px] text-slate-600 font-mono mt-1">2 mins ago</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                
                {/* --- 4. DOCTOR VIEWING PATIENT (The Missing Grid!) --- */}
                {role?.includes('DOCTOR') && selectedPatient && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 border-t border-slate-800 pt-8 print:hidden">
                        
                        {/* Profile Info */}
                        <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                            <h3 className="text-2xl font-bold text-white mb-1">{selectedPatient.name}</h3>
                            <p className="text-xs text-emerald-500 font-mono mb-6 flex items-center gap-1">
                                <Shield size={12}/> ACTIVE PATIENT
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#0b0e14] p-3 rounded-xl border border-slate-800">
                                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Heart size={12}/> Blood Type</p>
                                    <p className="font-bold text-white">{patientProfile?.bloodGroup || selectedPatient?.bloodGroup || "N/A"}</p>
                                </div>
                                <div className="bg-[#0b0e14] p-3 rounded-xl border border-slate-800">
                                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><AlertOctagon size={12}/> Allergies</p>
                                    <p className="font-bold text-white">{patientProfile?.allergies || selectedPatient?.allergies || "None"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions (Issue Rx) */}
                        <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-xl">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                                <Zap size={18} className="text-yellow-400" /> Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => setIsRecordModalOpen(true)} 
                                    className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-xl flex items-center gap-3 text-sm font-bold text-white transition shadow-lg shadow-blue-900/20 group"
                                >
                                    <FileText size={20} className="group-hover:scale-110 transition-transform" /> 
                                    Issue Medical Record (Rx)
                                </button>
                                
                                <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-400 cursor-not-allowed border border-slate-700">
                                    <Stethoscope size={20} /> Request Lab Test
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#121620] p-6 rounded-2xl border border-slate-800 shadow-xl">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity size={16} /> Recent Activity
                            </h3>
                            <div className="relative pl-4 border-l-2 border-slate-800 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121620]"></div>
                                    <h4 className="text-sm font-bold text-white">Vitals Synced</h4>
                                    <p className="text-xs text-slate-500 mt-1">Automated IoT Check via BioHub</p>
                                    <p className="text-[10px] text-slate-600 mt-1">Just now</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* --- 5. PATIENT CLINICAL HISTORY (NEW) --- */}
                {role?.includes('DOCTOR') && selectedPatient && (
                    <div className="mt-8 bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl print:hidden">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-blue-400" /> Patient Clinical History
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                                        <th className="pb-3 px-4">Date</th>
                                        <th className="pb-3 px-4">Record Title</th>
                                        <th className="pb-3 px-4">Source / Issued By</th>
                                        <th className="pb-3 px-4 text-center">Web3 Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {patientRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-8 text-center text-slate-500">
                                                No clinical history found for this patient.
                                            </td>
                                        </tr>
                                    ) : (
                                        patientRecords.map((record) => (
                                            <tr key={record._id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition">
                                                <td className="py-4 px-4 text-slate-300">
                                                    {new Date(record.timestamp).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-4 font-bold text-white">{record.title}</td>
                                                <td className="py-4 px-4 text-slate-400">
                                                    {record.isSelfUploaded ? (
                                                        <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                            Self-Added
                                                        </span>
                                                    ) : (
                                                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                                            <Shield size={10}/> {record.doctor_name 
                                                                ? (record.doctor_name.includes('Dr.') ? record.doctor_name : `Dr. ${record.doctor_name}`) 
                                                                : `Dr. ${record.doctor_wallet?.substring(0, 6)}...`}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button 
                                                        onClick={() => setSelectedHistoryRecord({
                                                            title: record.title,
                                                            date: new Date(record.timestamp).toLocaleDateString(),
                                                            source: record.isSelfUploaded 
                                                                ? "Self-Added" 
                                                                : (record.doctor_name 
                                                                    ? (record.doctor_name.includes('Dr.') ? record.doctor_name : `Dr. ${record.doctor_name}`) 
                                                                    : `Dr. ${record.doctor_wallet?.substring(0, 6)}...`),
                                                            hospital: record.hospital_name,
                                                            diagnosis: record.diagnosis,
                                                            ipfs_hashes: record.ipfs_hashes || (record.ipfs_hash ? [record.ipfs_hash] : []) // Handle both new array and old single string
                                                        })} 
                                                        className="text-slate-300 hover:text-white font-bold text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- ISSUE RX MODAL --- */}
                {role?.includes('DOCTOR') && selectedPatient && (
                    <IssueRecordModal 
                        isOpen={isRecordModalOpen} 
                        onClose={() => setIsRecordModalOpen(false)} 
                        patient={selectedPatient} 
                        doctorData={userData} 
                        onSuccess={fetchPatientRecords}
                    />
                )}

                {/* --- EXTENDED RECORD VIEW MODAL --- */}
                {selectedHistoryRecord && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-8 print:static print:overflow-visible print:bg-white print:p-0">
                        <div className="flex min-h-full items-start justify-center print:block print:min-h-0">
                            <div className="bg-[#121620] print:bg-white border border-slate-700 print:border-none w-full max-w-3xl rounded-3xl p-8 shadow-2xl print:p-0 print:shadow-none relative mt-4 mb-10 print:m-0">
                            <button onClick={() => setSelectedHistoryRecord(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition">
                                <X size={24} />
                            </button>
                            <div>
                                <div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <Activity className="text-emerald-500" /> BioChain Medical Record
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">{selectedHistoryRecord.hospital}</p>
                                        <p className="text-xs text-slate-500">{selectedHistoryRecord.date}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Record Title</h4>
                                    <p className="text-lg font-bold text-white">{selectedHistoryRecord.title}</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Clinical Notes</h4>
                                    <div className="bg-[#0b0e14] p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedHistoryRecord.diagnosis}
                                    </div>
                                </div>
                                
                                {/* ATTACHED DOCUMENTS SECTION */}
                                {selectedHistoryRecord.ipfs_hashes && selectedHistoryRecord.ipfs_hashes.length > 0 && (
                                    <div className="mb-8 border-t border-slate-800 pt-6">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <FileText size={16} className="text-blue-400"/> Attached Documents ({selectedHistoryRecord.ipfs_hashes.length})
                                        </h4>
                                        <div className="space-y-6">
                                            {selectedHistoryRecord.ipfs_hashes.map((hash, idx) => (
                                                <div key={idx} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900/50">
                                                    <div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                                                        <span className="text-xs font-bold text-slate-400">Document {idx + 1}</span>
                                                        <a 
                                                            href={`https://ipfs.io/ipfs/${hash}`}
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
                                                        >
                                                            Open Full Screen <ChevronRight size={14} />
                                                        </a>
                                                    </div>
                                                    <div className="h-96 w-full relative group bg-[#0b0e14]">
                                                        {/* Loading/Fallback Layer */}
                                                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2 z-0">
                                                            <Activity className="animate-spin text-blue-500" />
                                                            <span className="text-xs font-bold">Loading from IPFS...</span>
                                                        </div>
                                                        
                                                        {/* Attempt to load as an image first. If it fails (e.g., PDF), the onError handler hides it,
                                                            and the iframe behind it becomes visible. We use object-cover/contain to fit the image perfectly. */}
                                                        <div className="absolute inset-0 z-10 flex items-center justify-center p-2">
                                                            <iframe 
                                                                src={`https://ipfs.io/ipfs/${hash}`}
                                                                className="w-full h-full border-none"
                                                                style={{ backgroundColor: 'transparent' }}
                                                                title={`Medical Document ${idx + 1} Fallback`}
                                                            />
                                                            {/* We place the img on top. If it's a valid image, it covers the iframe. If not, it's hidden. */}
                                                            <img 
                                                                src={`https://ipfs.io/ipfs/${hash}`}
                                                                alt={`Medical Document ${idx + 1}`}
                                                                className="absolute inset-0 w-full h-full object-contain bg-[#0b0e14] z-20"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none'; // Hide img if it's a PDF/unsupported
                                                                }}
                                                            />
                                                        </div>
                                                        
                                                        {/* Full Screen View Button Overlay */}
                                                        <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition shadow-lg z-30 flex items-center gap-2">
                                                            Open Full Screen <ChevronRight size={16} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-end border-t border-slate-800 pt-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Source</h4>
                                        <p className="text-sm font-bold text-white">{selectedHistoryRecord.source}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    );
}

export default Dashboard;