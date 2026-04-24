/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { FileText, Upload, X, ShieldCheck } from 'lucide-react';

const IssueRecordModal = ({ isOpen, onClose, patient, doctorData, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [files, setFiles] = useState([]); // Support multiple files
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let ipfsHashes = [];

        try {
            if (files.length > 0) {
                setMessage(`⏳ 1/2: Uploading ${files.length} document(s) to Pinata IPFS...`);
                // STEP 1: Upload Files to IPFS via FastAPI
                const formData = new FormData();
                files.forEach(file => {
                    formData.append("files", file); // Ensure backend accepts 'files'
                });
                
                const uploadRes = await axios.post(`${API_BASE_URL}/upload/ipfs`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                ipfsHashes = uploadRes.data.ipfs_hashes;
                setMessage(`✅ Files Pinned!`);
            }
            
            setMessage(files.length > 0 ? "⏳ 2/2: Anchoring record to BioChain DB..." : "⏳ Anchoring record to BioChain DB...");

            // STEP 2: Save the Record details + IPFS Hash to DB
            const recordData = {
                patient_id: patient.email || patient.id || "Unknown_Patient", // Use email as consistent patient ID
                doctor_wallet: doctorData.wallet_address || doctorData.wallet || "Unknown_Doc",
                doctor_name: doctorData.name || "Unknown Doctor", // Pass the doctor's name
                hospital_name: doctorData.hospital_name || "BioChain Node",
                title: title,
                diagnosis: diagnosis,
                ipfs_hashes: ipfsHashes // Send the array of hashes (empty if no files)
            };

            await axios.post(`${API_BASE_URL}/record/issue`, recordData);

            setMessage("🎉 Success! Medical Record Secured on Web3.");
            
            // Close modal after 2 seconds
            setTimeout(() => {
                if (onSuccess) onSuccess(); // <--- NEW: Call the callback to refresh standard table
                onClose();
                setMessage('');
                setTitle('');
                setDiagnosis('');
                setFiles([]);
            }, 2000);

        } catch (error) {
            console.error(error);
            setMessage("❌ Error: " + (error.response?.data?.detail || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#121620] border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="text-blue-400" /> Issue Medical Record
                </h2>
                <p className="text-sm text-slate-400 mb-6">Patient: <span className="text-emerald-400 font-bold">{patient?.name || 'Selected Patient'}</span></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Record Title</label>
                        <input type="text" required placeholder="e.g. Viral Fever Prescription" className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none" 
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Diagnosis / Notes</label>
                        <textarea required placeholder="Clinical notes here..." rows="3" className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none"
                            value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}></textarea>
                    </div>

                    <div className="border-2 border-dashed border-slate-700 p-4 rounded-xl text-center hover:border-blue-500 transition cursor-pointer relative">
                        <input 
                            type="file" 
                            multiple 
                            required={files.length === 0} 
                            onChange={(e) => {
                                const newFiles = Array.from(e.target.files);
                                setFiles(prev => [...prev, ...newFiles]);
                                // Reset input so same file can be selected again if removed
                                e.target.value = null; 
                            }} 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <Upload className="mx-auto text-slate-500 mb-2" size={24} />
                        <p className="text-sm text-slate-300 font-bold">Click or Drag to upload PDF/X-Ray</p>
                        <p className="text-xs text-slate-500 mb-2">Secured via Pinata IPFS</p>
                        
                        {/* Display selected files */}
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2 relative z-20">
                                {files.map((f, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg text-xs text-slate-300">
                                        <span className="truncate pr-2">{f.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFiles(files.filter((_, i) => i !== index));
                                            }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${loading ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'}`}>
                        {loading ? "Anchoring to Blockchain..." : <><ShieldCheck size={20} /> Anchor Medical Record</>}
                    </button>
                    
                    {message && <p className="text-center text-sm font-bold mt-2 text-emerald-400">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default IssueRecordModal;
