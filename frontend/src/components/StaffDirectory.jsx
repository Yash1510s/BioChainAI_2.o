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
import { UserPlus, ShieldCheck, Stethoscope, BadgeCheck, Activity, Users, FileText, Mail, Search, Copy, Check } from 'lucide-react';

const StaffDirectory = () => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedWallet, setCopiedWallet] = useState(null);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', wallet_address: '',
        specialization: '', department: '', role: '', license_number: ''
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/admin/staff-directory`);
            setStaffList(res.data.staff || []);
        } catch (error) {
            console.error("Failed to fetch staff:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOnboard = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("⏳ Registering identity on BioChain...");

        try {
            const finalName = formData.name.toLowerCase().startsWith('dr.') ? formData.name : `Dr. ${formData.name}`;
            
            await axios.post(`${API_BASE_URL}/api/admin/onboard-doctor`, { ...formData, name: finalName });
            
            setMessage("✅ Doctor successfully onboarded & verified!");
            setFormData({ name: '', email: '', phone: '', wallet_address: '', specialization: '', department: '', role: '', license_number: '' });
            fetchStaff();
            
            setTimeout(() => setMessage(''), 4000);
        } catch (error) {
            setMessage(`❌ Error: ${error.response?.data?.detail || "Failed to onboard doctor"}`);
            setTimeout(() => setMessage(''), 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyWallet = (wallet) => {
        navigator.clipboard.writeText(wallet);
        setCopiedWallet(wallet);
        setTimeout(() => setCopiedWallet(null), 2000);
    };

    // Filter staff based on search
    const filteredStaff = staffList.filter(doc => {
        const query = searchQuery.toLowerCase();
        return (
            doc.name?.toLowerCase().includes(query) ||
            doc.specialization?.toLowerCase().includes(query) ||
            doc.department?.toLowerCase().includes(query) ||
            doc.role?.toLowerCase().includes(query) ||
            doc.email?.toLowerCase().includes(query)
        );
    });

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Syncing Global Staff Directory...
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
            
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                            <Users size={24} />
                        </div>
                        Hospital Staff Directory
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 ml-[44px]">Manage network access, hierarchical roles, and Web3 credentials.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20 text-purple-400 font-bold text-xs flex items-center gap-2">
                        <ShieldCheck size={16} /> Admin Access Level
                    </div>
                    <div className="bg-slate-800 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                        {staffList.length} Members
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: ONBOARDING FORM */}
                <div className="lg:col-span-1 bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl h-fit">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                        <UserPlus className="text-emerald-400" size={20} /> Onboard New Staff
                    </h3>
                    
                    <form onSubmit={handleOnboard} className="space-y-4">
                        <div className="space-y-3">
                            <input required type="text" placeholder="Full Name (e.g. Yash)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" />
                            <input required type="email" placeholder="Official Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" />
                            <input type="text" placeholder="Phone Number (Optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" />
                            <input required type="text" placeholder="Web3 Wallet Address (0x...)" value={formData.wallet_address} onChange={e => setFormData({...formData, wallet_address: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 font-mono transition" />
                            <input required type="text" placeholder="Medical License Registration No." value={formData.license_number} onChange={e => setFormData({...formData, license_number: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-slate-300 px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer transition">
                                <option value="" disabled>Select Role...</option>
                                <option value="Chief Medical Officer">Chief Medical Officer</option>
                                <option value="Senior Consultant">Senior Consultant</option>
                                <option value="Attending Physician">Attending Physician</option>
                                <option value="Junior Resident">Junior Resident</option>
                            </select>
                            <select required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-slate-300 px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer transition">
                                <option value="" disabled>Department...</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Emergency">Emergency</option>
                                <option value="General Medicine">General Medicine</option>
                            </select>
                        </div>
                        
                        <input required type="text" placeholder="Specialization (e.g. Interventional Cardiology)" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} className="w-full bg-[#0b0e14] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" />

                        <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 active:scale-[0.98]">
                            {isSubmitting ? <Activity className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                            {isSubmitting ? 'Verifying & Saving...' : 'Grant Network Access'}
                        </button>

                        {message && (
                            <div className={`p-3 rounded-xl text-center text-xs font-bold border transition-all duration-300 ${message.includes('✅') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : message.includes('⏳') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>

                {/* RIGHT: STAFF DIRECTORY LIST */}
                <div className="lg:col-span-2 bg-[#121620] rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[650px]">
                    {/* Search Bar + Header */}
                    <div className="bg-[#0b0e14] px-6 py-4 border-b border-slate-800 space-y-3 sticky top-0 z-10">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Stethoscope size={16} className="text-slate-400" /> Verified Clinical Staff
                            </h3>
                            <span className="bg-blue-500/10 text-xs font-bold px-3 py-1 rounded-full text-blue-400 border border-blue-500/20">{filteredStaff.length} of {staffList.length}</span>
                        </div>
                        
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name, specialization, department..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#121620] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar flex-1">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((doc, idx) => (
                                <div key={idx} className="bg-[#0b0e14] border border-slate-800 hover:border-blue-500/30 transition-all duration-200 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center font-bold border border-blue-500/20 group-hover:border-blue-500/40 transition flex-shrink-0">
                                            {doc.name.replace('Dr. ', '').substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                {doc.name}
                                                {doc.is_verified && <BadgeCheck size={14} className="text-blue-400" title="Verified by Admin" />}
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-0.5">{doc.specialization} • {doc.department}</p>
                                            {doc.email && (
                                                <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                                    <Mail size={10} /> {doc.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-start md:items-end gap-1.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                                            doc.role === 'Chief Medical Officer' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                            doc.role === 'Senior Consultant' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            doc.role === 'Attending Physician' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                        }`}>
                                            {doc.role}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] text-slate-500 font-mono">Lic: {doc.license_number || 'N/A'}</p>
                                            {doc.wallet_address && (
                                                <button 
                                                    onClick={() => handleCopyWallet(doc.wallet_address)}
                                                    className="text-[10px] text-slate-600 hover:text-blue-400 font-mono flex items-center gap-1 transition"
                                                    title="Copy wallet address"
                                                >
                                                    {copiedWallet === doc.wallet_address ? (
                                                        <><Check size={10} className="text-emerald-400" /> Copied</>
                                                    ) : (
                                                        <><Copy size={10} /> {doc.wallet_address.substring(0, 6)}...{doc.wallet_address.slice(-4)}</>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60 py-12">
                                {searchQuery ? (
                                    <>
                                        <Search size={48} className="mb-4 opacity-40" />
                                        <p className="font-bold text-white mb-1">No Results Found</p>
                                        <p className="text-sm">Try a different search term</p>
                                    </>
                                ) : (
                                    <>
                                        <Users size={48} className="mb-4" />
                                        <p>No staff members onboarded yet.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StaffDirectory;
