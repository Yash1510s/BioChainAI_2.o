import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Search, Users, Activity, FileText, Shield, ArrowRight, Phone } from 'lucide-react';

const PatientsDirectory = ({ doctorData, onSelectPatient }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/patients`);
                setPatients(response.data.patients);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patients:", error);
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    // Real-time Search Logic
    const filteredPatients = patients.filter(patient => 
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.includes(searchTerm)
    );

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Fetching Global Patient Directory...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header & Search Bar */}
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Users className="text-blue-500" size={28} /> Global Patient Directory
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Search and manage patients across the BioChain network.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by Name, Email or Phone..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0b0e14] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition shadow-inner"
                    />
                </div>
            </div>

            {/* Patients Grid */}
            <div className="bg-[#121620] rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0b0e14] border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                                <th className="py-4 px-6 font-bold">Patient Details</th>
                                <th className="py-4 px-6 font-bold">Contact Info</th>
                                <th className="py-4 px-6 font-bold">Vitals Base</th>
                                <th className="py-4 px-6 font-bold text-center">Web3 Status</th>
                                <th className="py-4 px-6 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-800/50">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient, index) => (
                                    <tr key={index} className="hover:bg-slate-800/30 transition group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
                                                    {patient.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{patient.name}</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <Shield size={10} className="text-emerald-500"/> ID: {patient.idHash ? patient.idHash.substring(0,10) + '...' : 'Pending'}
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
                                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Network Active
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => onSelectPatient && onSelectPatient(patient)}
                                                className="bg-slate-800 hover:bg-blue-600 text-white p-2.5 rounded-xl transition flex items-center justify-center w-full max-w-[120px] ml-auto gap-2 text-xs font-bold shadow-lg"
                                            >
                                                Open Chart <ArrowRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500">
                                        <Search className="mx-auto mb-3 opacity-50" size={32} />
                                        <p>No patients found matching "{searchTerm}"</p>
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
