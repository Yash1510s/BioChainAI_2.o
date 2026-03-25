import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { UploadCloud, FileText, Calendar, Activity, ShieldCheck, Clock } from 'lucide-react';

const UploadData = ({ userData }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        ampm: 'AM',
        summary: '',
        notes: '',
        vitals: ''
    });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSetCurrentDateTime = () => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');

        setFormData({
            ...formData,
            date: `${yyyy}-${mm}-${dd}`,
            time: `${String(hours).padStart(2, '0')}:${minutes}`,
            ampm: ampm
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        let ipfsHashes = [];

        try {
            if (files.length > 0) {
                setMessage(`⏳ 1/2: Uploading ${files.length} document(s) to Pinata IPFS...`);
                // STEP 1: Upload Files to IPFS
                const uploadData = new FormData();
                files.forEach(file => {
                    uploadData.append("files", file);
                });
                
                const uploadRes = await axios.post(`${API_BASE_URL}/upload/ipfs`, uploadData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                ipfsHashes = uploadRes.data.ipfs_hashes;
                setMessage(`✅ Files Pinned! Anchoring to Vault...`);
            } else {
                setMessage("⏳ Anchoring record to BioChain DB...");
            }

            // STEP 2: Save to Database (Self-Uploaded Record)
            const recordData = {
                patient_id: userData.email || userData.wallet_address || "Unknown",
                doctor_wallet: "Self-Uploaded (Patient)",
                doctor_name: userData.name || "Patient",
                hospital_name: "External / Personal Record",
                title: formData.summary,
                diagnosis: `Date: ${formData.date} ${formData.time} ${formData.ampm}\nNotes: ${formData.notes}\nVitals: ${formData.vitals}`,
                ipfs_hashes: ipfsHashes // Array of hashes
            };

            await axios.post(`${API_BASE_URL}/record/issue`, recordData);

            setMessage("🎉 Success! Record securely added to your Vault.");
            
            // Reset Form
            setTimeout(() => {
                setFormData({ date: '', time: '', ampm: 'AM', summary: '', notes: '', vitals: '' });
                setFiles([]);
                setMessage('');
            }, 3000);

        } catch (error) {
            console.error(error);
            setMessage("❌ Error: " + (error.response?.data?.detail || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="bg-[#121620] rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <div className="mb-8 border-b border-slate-800 pb-6 relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <UploadCloud className="text-blue-500" size={28} /> Upload Medical Data
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">Securely store your personal medical records, lab reports, and external prescriptions on IPFS.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Top Row Header with Auto-fill button */}
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-bold text-slate-300">Record Details</h3>
                        <button 
                            type="button"
                            onClick={handleSetCurrentDateTime}
                            className="bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"
                        >
                            <Clock size={14} /> Set Current Time
                        </button>
                    </div>

                    {/* Top Row: Date, Time & Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. DATE PICKER (Opens Calendar) */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Calendar size={14} /> Date
                            </label>
                            <input 
                                type="date" 
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition cursor-pointer [color-scheme:dark]" 
                            />
                        </div>

                        {/* 2. TIME PICKER (Number Type + AM/PM Toggle) */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Activity size={14} /> Time
                            </label>
                            <div className="flex bg-[#0b0e14] border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition">
                                <input 
                                    type="text" 
                                    name="time"
                                    required
                                    placeholder="10:30"
                                    maxLength="5"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        // Simple auto-formatting for HH:MM
                                        if (val.length === 2 && !val.includes(':') && formData.time.length < val.length) {
                                            val += ':';
                                        }
                                        setFormData({...formData, time: val});
                                    }}
                                    value={formData.time || ""}
                                    className="w-full bg-transparent p-4 text-white outline-none" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, ampm: formData.ampm === 'AM' ? 'PM' : 'AM'})}
                                    className="px-4 font-bold text-sm bg-slate-800 text-blue-400 hover:bg-slate-700 transition"
                                >
                                    {formData.ampm || 'AM'}
                                </button>
                            </div>
                        </div>

                        {/* 3. SUMMARY */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <FileText size={14} /> Summary / Diagnosis
                            </label>
                            <input 
                                type="text" 
                                name="summary"
                                required
                                placeholder="e.g. Annual Blood Test"
                                value={formData.summary}
                                onChange={handleChange}
                                className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition" 
                            />
                        </div>
                    </div>

                    {/* Detailed Notes */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                            Detailed Notes
                        </label>
                        <textarea 
                            name="notes"
                            required
                            placeholder="Add your observations or doctor's comments here..." 
                            rows="4" 
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition resize-none"
                        ></textarea>
                    </div>

                    {/* Vitals */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Activity size={14} /> Vitals (Optional)
                        </label>
                        <input 
                            type="text" 
                            name="vitals"
                            placeholder="e.g. BP: 120/80, HR: 72 bpm"
                            value={formData.vitals}
                            onChange={handleChange}
                            className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition" 
                        />
                    </div>

                    {/* Drag & Drop Attachment Zone */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                            Attachments (Optional)
                        </label>
                        <div className="border-2 border-dashed border-slate-700 bg-[#0b0e14] p-10 rounded-2xl text-center hover:border-blue-500 transition cursor-pointer relative group">
                            <input 
                                type="file" 
                                multiple
                                onChange={(e) => setFiles(Array.from(e.target.files))} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <UploadCloud className="mx-auto text-slate-500 mb-4 group-hover:text-blue-400 transition" size={48} />
                            <p className="text-lg font-bold text-slate-300">
                                {files.length > 0 ? `${files.length} file(s) selected` : "Drag & Drop files here or click to browse"}
                            </p>
                            <p className="text-sm text-slate-500 mt-2">Supports PDF, JPG, PNG (Max 10MB per file)</p>
                            {/* Document Preview Tags */}
                            {files.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                    {files.map((f, idx) => (
                                        <div key={idx} className="bg-slate-800 text-xs text-white px-3 py-1 rounded-full border border-slate-700 relative z-20">
                                            {f.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button & Message */}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'}`}
                    >
                        {loading ? "Anchoring Data..." : <><ShieldCheck size={20} /> Upload to BioChain</>}
                    </button>

                    {message && (
                        <div className={`p-4 rounded-xl text-center font-bold text-sm border ${message.includes('❌') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                            {message}
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
};

export default UploadData;
