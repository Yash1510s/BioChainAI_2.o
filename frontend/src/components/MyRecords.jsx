import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { FileText, Download, Printer, ShieldCheck, Calendar, Building, User, Activity, X, Plus, UploadCloud } from 'lucide-react';

const MyRecords = ({ userData }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Fetch records from backend
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const pid = userData?.email || userData?.wallet_address || userData?.id;
                if (!pid) return;
                
                const res = await axios.get(`${API_BASE_URL}/record/patient/${pid}`);
                if (res.data.status === "Success") {
                    setRecords(res.data.records);
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [userData]);

    const handlePrint = () => window.print();

    if (loading) return <div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2"><Activity className="animate-spin" /> Syncing Vault from BioChain...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex justify-between items-center print:hidden">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck size={24} className="text-emerald-500" /> Clinical Vault
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Your decentralized medical history, securely anchored on IPFS.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right pr-6">
                        <p className="text-3xl font-bold text-white">{records.length}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Records</p>
                    </div>
                </div>
            </div>

            {/* RECORDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:hidden">
                {records.map((record) => (
                    <div key={record._id} className={`bg-[#121620] rounded-2xl p-6 border transition-all shadow-lg group ${record.isSelfUploaded ? 'border-slate-800 hover:border-blue-500/30' : 'border-slate-800 hover:border-emerald-500/30'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${record.isSelfUploaded ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                <FileText size={24} />
                            </div>
                            
                            {/* DYNAMIC BADGE: Web3 Verified vs Self-Uploaded */}
                            {record.isSelfUploaded ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md border border-blue-500/20">
                                    <UploadCloud size={12} /> Self-Added
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                                    <ShieldCheck size={12} /> Web3 Verified
                                </span>
                            )}
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">{record.title}</h4>
                        
                        <div className="space-y-2 mb-6">
                            <p className="text-sm text-slate-400 flex items-center gap-2 line-clamp-1"><Building size={14} className="text-slate-500"/> {record.hospital_name}</p>
                            <p className="text-sm text-slate-400 flex items-center gap-2 line-clamp-1">
                                <User size={14} className="text-slate-500"/> 
                                {record.doctor_name 
                                    ? (record.doctor_name.includes('Dr.') ? record.doctor_name : `Dr. ${record.doctor_name}`) 
                                    : `Dr. ${record.doctor_wallet?.substring(0, 6)}...`}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-2"><Calendar size={14} /> {new Date(record.timestamp).toLocaleDateString()}</p>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-800">
                            <button 
                                onClick={() => setSelectedRecord(record)}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
                            >
                                <FileText size={16} /> Details
                            </button>
                            <a 
                                href={`https://ipfs.io/ipfs/${record.ipfs_hash}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-sm font-bold transition flex items-center justify-center"
                            >
                                <Download size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* PRINT / VIEW MODAL (Same as before) */}
            {selectedRecord && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-8 print:static print:overflow-visible print:bg-white print:p-0">
                    <div className="flex min-h-full items-start justify-center print:block print:min-h-0">
                        <div className="bg-[#121620] print:bg-white border border-slate-700 print:border-none w-full max-w-3xl rounded-3xl p-8 shadow-2xl print:p-0 print:shadow-none relative mt-4 mb-10 print:m-0">
                            <button onClick={() => setSelectedRecord(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition print:hidden">
                                <X size={24} />
                            </button>
                            <div className="print:text-black">
                                <div className="flex justify-between items-start border-b border-slate-800 print:border-gray-300 pb-6 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white print:text-black flex items-center gap-2">
                                            <Activity className="text-emerald-500 print:text-black" /> BioChain Medical Record
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white print:text-black">{selectedRecord.hospital_name}</p>
                                        <p className="text-xs text-slate-500 print:text-gray-500">{new Date(selectedRecord.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-1">Record Title</h4>
                                    <p className="text-lg font-bold text-white print:text-black">{selectedRecord.title}</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-2">Clinical Notes</h4>
                                    <div className="bg-[#0b0e14] print:bg-gray-50 p-4 rounded-xl border border-slate-800 text-slate-300 print:text-black leading-relaxed whitespace-pre-wrap">
                                        {selectedRecord.diagnosis}
                                    </div>
                                </div>

                                {/* ATTACHED DOCUMENTS SECTION */}
                                {(selectedRecord.ipfs_hashes && selectedRecord.ipfs_hashes.length > 0 || selectedRecord.ipfs_hash) && (() => {
                                    // Normalize backwards compatibility for older records with single string `ipfs_hash`
                                    const hashes = selectedRecord.ipfs_hashes && selectedRecord.ipfs_hashes.length > 0 
                                        ? selectedRecord.ipfs_hashes 
                                        : [selectedRecord.ipfs_hash];

                                    return (
                                        <div className="mb-8 border-t border-slate-800 pt-6 print:border-gray-300">
                                            <h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <FileText size={16} className="text-emerald-400 print:text-gray-500"/> Attached Documents ({hashes.length})
                                            </h4>
                                            <div className="space-y-6">
                                                {hashes.map((hash, idx) => (
                                                <div key={idx} className="border border-slate-700 print:border-none rounded-xl overflow-hidden bg-slate-900/50 print:bg-transparent print:break-before-page print:mt-10">
                                                    <div className="bg-slate-800/80 print:hidden px-4 py-2 flex justify-between items-center border-b border-slate-700">
                                                        <span className="text-xs font-bold text-slate-400">Document {idx + 1}</span>
                                                        <a 
                                                            href={`https://ipfs.io/ipfs/${hash}`}
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
                                                        >
                                                            Open Full Screen
                                                        </a>
                                                    </div>
                                                    <div className="h-96 print:h-[1000px] print:w-full relative group bg-[#0b0e14] print:bg-transparent">
                                                        {/* Loading/Fallback Layer */}
                                                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2 z-0 print:hidden">
                                                            <Activity className="animate-spin text-emerald-500" />
                                                            <span className="text-xs font-bold">Loading from IPFS...</span>
                                                        </div>
                                                        
                                                        {/* Attempt to load as an image first. If it fails (e.g., PDF), the onError handler hides it,
                                                            and the iframe behind it becomes visible. We use object-cover/contain to fit the image perfectly. */}
                                                        <div className="absolute inset-0 z-10 flex items-center justify-center p-2 print:p-0">
                                                            <iframe 
                                                                src={`https://ipfs.io/ipfs/${hash}`}
                                                                className="w-full h-full border-none print:w-full print:h-full"
                                                                style={{ backgroundColor: 'transparent' }}
                                                                title={`Medical Document ${idx + 1} Fallback`}
                                                            />
                                                            {/* We place the img on top. If it's a valid image, it covers the iframe. If not, it's hidden. */}
                                                            <img 
                                                                src={`https://ipfs.io/ipfs/${hash}`}
                                                                alt={`Medical Document ${idx + 1}`}
                                                                className="absolute inset-0 w-full h-full object-contain bg-[#0b0e14] print:bg-transparent z-20"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none'; // Hide img if it's a PDF/unsupported
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    );
                                })()}

                                <div className="flex justify-between items-end border-t border-slate-800 print:border-gray-300 pt-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-1">Source</h4>
                                        <p className="text-sm font-bold text-white print:text-black">
                                            {selectedRecord.isSelfUploaded 
                                                ? "Self-Added" 
                                                : (selectedRecord.doctor_name 
                                                    ? (selectedRecord.doctor_name.includes('Dr.') ? selectedRecord.doctor_name : `Dr. ${selectedRecord.doctor_name}`) 
                                                    : `Dr. ${selectedRecord.doctor_wallet?.substring(0, 6)}...`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-4 print:hidden">
                                <button onClick={handlePrint} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold flex justify-center gap-2"><Printer size={20} /> Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyRecords;
