import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Activity, FileText, User, Heart, Phone, Clock,
    Shield, Thermometer, Droplet, Weight, Users,
    ClipboardPlus, Stethoscope, AlertOctagon, Search,
    Zap, ArrowLeft, X
} from 'lucide-react';

function Dashboard({ role }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- NEW STATE: TRACK WHICH PATIENT IS OPEN ---
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/dashboard');
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Loading BioChain Node...
        </div>
    );

    // --- COMPONENT: VITALS CARD (Reusable) ---
    const VitalsWidget = ({ title, values }) => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-rose-500"><Heart size={60} /></div>
                <div className="flex items-center gap-2 text-rose-500 mb-2">
                    <Heart size={20} className="animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">{title} Heart Rate</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{values.hr} <span className="text-sm text-slate-500 font-normal">bpm</span></h3>
            </div>

            <div className="bg-[#121620] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-blue-500"><Activity size={60} /></div>
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Activity size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">{title} SpO2</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{values.spo2} <span className="text-sm text-slate-500 font-normal">%</span></h3>
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
                <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        {selectedPatient ? (
                            // IF VIEWING PATIENT: Show Back Button
                            <button onClick={() => setSelectedPatient(null)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition">
                                <ArrowLeft size={24} className="text-slate-200" />
                            </button>
                        ) : (
                            // DEFAULT ICON
                            <div className={`p-3 rounded-2xl ${role === 'DOCTOR' ? 'bg-blue-600/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {role === 'DOCTOR' ? <Stethoscope size={32} /> : <Activity size={32} />}
                            </div>
                        )}

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {selectedPatient ? `Patient: ${selectedPatient.name}` : (role === 'DOCTOR' ? "Dr. Strange" : "Yash Vijay Singh")}
                            </h1>
                            <p className="text-slate-400 text-sm">
                                {selectedPatient ? 'Viewing Live Clinical Data' : (role === 'DOCTOR' ? 'Cardiology Dept • BioChain Hospital' : 'Personal Health Dashboard')}
                            </p>
                        </div>
                    </div>

                    {role === 'DOCTOR' && !selectedPatient && (
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
            LOGIC BRANCHING:
            1. If Patient -> Show OWN Vitals
            2. If Doctor & NO Patient Selected -> Show DOCTOR Vitals
            3. If Doctor & PATIENT Selected -> Show PATIENT Vitals
           ========================================================= */}

                {/* 1. VITALS SECTION */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Activity size={16} /> {selectedPatient ? "Patient Live Monitor" : "Live Personal Health Monitor"}
                    </h3>

                    {/* Logic to determine WHICH vitals to show */}
                    <VitalsWidget
                        title={selectedPatient ? "Patient" : "My"}
                        values={selectedPatient ?
                            { hr: 72, spo2: 98, bp: "120/80", weight: 70 } : // Mock Patient Data (Yash)
                            { hr: 65, spo2: 99, bp: "118/76", weight: 75 }   // Mock Doctor Data (Dr. Strange)
                        }
                    />
                </div>

                {/* =========================================================
            DOCTOR'S MAIN DASHBOARD (When NO patient is selected)
           ========================================================= */}
                {role === 'DOCTOR' && !selectedPatient && (
                    <div className="space-y-8 border-t border-slate-800 pt-8">
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

                        {/* TODAY'S QUEUE */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl lg:col-span-2">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-blue-400" /> Today's Appointments
                                </h3>
                                <div className="space-y-3">

                                    {/* --- THE PATIENT ITEM WITH WORKING BUTTON --- */}
                                    <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-500/20 flex items-center justify-between cursor-pointer transition">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">YV</div>
                                            <div>
                                                <h4 className="font-bold text-white">Yash Vijay Singh</h4>
                                                <p className="text-xs text-slate-500">Check-up • 10:00 AM</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedPatient({ name: "Yash Vijay Singh", id: "0xe94...2266" })}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold transition"
                                        >
                                            Open Profile
                                        </button>
                                    </div>

                                    {/* Mock Item 2 */}
                                    <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between opacity-60">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold">AJ</div>
                                            <div>
                                                <h4 className="font-bold text-white">Adonis Jeswin</h4>
                                                <p className="text-xs text-slate-500">Follow-up • 10:30 AM</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">Waiting</span>
                                    </div>
                                </div>
                            </div>

                            {/* QUICK ACTIONS */}
                            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Zap size={18} className="text-amber-400" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-slate-800 hover:bg-slate-700 p-3 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-300 transition">
                                        <div className="bg-blue-500 p-2 rounded-lg text-white"><FileText size={16} /></div> Issue Rx
                                    </button>
                                    <button className="w-full bg-slate-800 hover:bg-slate-700 p-3 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-300 transition">
                                        <div className="bg-purple-500 p-2 rounded-lg text-white"><Stethoscope size={16} /></div> Lab Test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================
            PATIENT DETAIL VIEW (Shown when Doctor clicks a patient OR if role is Patient)
           ========================================================= */}
                {(selectedPatient || role === 'PATIENT') && data && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 border-t border-slate-800 pt-8">
                        <motion.div className="lg:col-span-2 bg-[#121620] rounded-3xl p-8 border border-slate-800 shadow-xl">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{selectedPatient ? selectedPatient.name : data.name}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono bg-black/20 px-2 py-1 rounded w-fit">
                                        <Shield size={12} className="text-emerald-500" />
                                        {data.email_hash.substring(0, 40)}...
                                    </div>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                    ACTIVE PATIENT
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <div className="text-rose-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><Heart size={14} /> Blood Type</div>
                                    <p className="text-2xl font-bold">{data.blood_type}</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <div className="text-amber-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FileText size={14} /> Allergies</div>
                                    <p className="text-lg">{data.allergies}</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <div className="text-blue-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><Phone size={14} /> Emergency</div>
                                    <p className="text-lg">{data.emergency_contact}</p>
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

            </div>
        </div>
    );
}

export default Dashboard;