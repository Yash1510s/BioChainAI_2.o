import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { 
    Pill, Plus, X, Zap, AlertTriangle, ShieldCheck, AlertCircle, 
    Activity, Trash2, FlaskConical, Sparkles 
} from 'lucide-react';

const DrugInteractionChecker = () => {
    const [drugs, setDrugs] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const addDrug = () => {
        const raw = inputValue.trim();
        if (!raw) return;

        // Split by comma, plus, or pipe to support multi-drug input
        const newDrugs = raw
            .split(/[,+|]/)
            .map(d => d.trim())
            .filter(d => d.length > 0 && !drugs.includes(d));

        if (newDrugs.length > 0) {
            setDrugs([...drugs, ...newDrugs]);
            setInputValue('');
            setResult(null);
        }
    };

    const removeDrug = (drugToRemove) => {
        setDrugs(drugs.filter(d => d !== drugToRemove));
        setResult(null);
    };

    // Auto-split: when user types a comma, plus, or pipe, immediately add the drug
    const handleInputChange = (e) => {
        const val = e.target.value;
        const lastChar = val.slice(-1);

        if ([',', '+', '|'].includes(lastChar)) {
            const drugName = val.slice(0, -1).trim();
            if (drugName && !drugs.includes(drugName)) {
                setDrugs(prev => [...prev, drugName]);
                setResult(null);
            }
            setInputValue('');
        } else {
            setInputValue(val);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDrug();
        }
    };

    const analyzeInteractions = async () => {
        if (drugs.length === 0) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/ai/check-drugs`, { drugs });
            setResult(res.data);
        } catch (error) {
            console.error("Drug check failed:", error);
            setResult({
                status: "Error",
                risk_level: "Unknown",
                warning_message: "Network error. Could not reach the AI analysis engine."
            });
        } finally {
            setLoading(false);
        }
    };

    const getRiskConfig = (level) => {
        switch (level) {
            case 'Safe':
                return {
                    icon: ShieldCheck,
                    color: 'emerald',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/30',
                    text: 'text-emerald-400',
                    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
                    label: 'No Interactions Detected'
                };
            case 'Moderate':
                return {
                    icon: AlertCircle,
                    color: 'amber',
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/30',
                    text: 'text-amber-400',
                    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
                    label: 'Moderate Risk — Monitor Required'
                };
            case 'Severe':
                return {
                    icon: AlertTriangle,
                    color: 'rose',
                    bg: 'bg-rose-500/10',
                    border: 'border-rose-500/30',
                    text: 'text-rose-400',
                    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
                    label: 'Severe Risk — Contraindication Alert'
                };
            default:
                return {
                    icon: AlertCircle,
                    color: 'slate',
                    bg: 'bg-slate-500/10',
                    border: 'border-slate-500/30',
                    text: 'text-slate-400',
                    glow: '',
                    label: 'Analysis Unavailable'
                };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up max-w-4xl">

            {/* Header Card */}
            <div className="bg-[#121620] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-4 mb-2 relative z-10">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl text-purple-400 border border-purple-500/20">
                        <FlaskConical size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            AI Drug Interaction Checker
                            <span className="text-[9px] bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Gemini AI
                            </span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">Enter medications to analyze potential drug-drug interactions using clinical AI</p>
                    </div>
                </div>
            </div>

            {/* Drug Input Section */}
            <div className="bg-[#121620] rounded-2xl p-6 border border-slate-800 shadow-xl">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Pill size={14} /> Current Medications
                </h3>

                {/* Drug Pills */}
                <div className="flex flex-wrap gap-2 mb-4 min-h-[44px]">
                    {drugs.length === 0 && (
                        <p className="text-xs text-slate-600 italic py-2">No medications added yet. Type a drug name below and press Enter.</p>
                    )}
                    {drugs.map((drug) => (
                        <span 
                            key={drug}
                            className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-lg text-sm font-bold group hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200"
                        >
                            <Pill size={12} />
                            {drug}
                            <button 
                                onClick={() => removeDrug(drug)}
                                className="opacity-50 group-hover:opacity-100 hover:text-rose-400 transition"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>

                {/* Input Row */}
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Pill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input
                            type="text"
                            placeholder="e.g. Aspirin, Warfarin, Metformin..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-[#0b0e14] text-sm text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition placeholder:text-slate-600"
                        />
                    </div>
                    <button
                        onClick={addDrug}
                        disabled={!inputValue.trim()}
                        className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-200 shadow-lg shadow-purple-900/20 disabled:shadow-none"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>

                {/* Analyze Button */}
                <button
                    onClick={analyzeInteractions}
                    disabled={drugs.length === 0 || loading}
                    className="w-full mt-5 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:via-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-purple-900/20 disabled:shadow-none active:scale-[0.98] group"
                >
                    {loading ? (
                        <>
                            <Activity className="animate-spin" size={18} />
                            Analyzing {drugs.length} Medication{drugs.length !== 1 ? 's' : ''} with Gemini AI...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                            Analyze Drug Interactions ({drugs.length} Drug{drugs.length !== 1 ? 's' : ''})
                        </>
                    )}
                </button>

                {drugs.length > 0 && (
                    <button
                        onClick={() => { setDrugs([]); setResult(null); }}
                        className="w-full mt-2 py-2 text-xs text-slate-600 hover:text-rose-400 transition flex items-center justify-center gap-1"
                    >
                        <Trash2 size={12} /> Clear all medications
                    </button>
                )}
            </div>

            {/* Result Card */}
            {result && !loading && (
                <div className={`bg-[#121620] rounded-2xl border ${getRiskConfig(result.risk_level).border} ${getRiskConfig(result.risk_level).glow} overflow-hidden animate-fade-in-up`}>
                    {/* Result Header */}
                    <div className={`${getRiskConfig(result.risk_level).bg} p-5 border-b ${getRiskConfig(result.risk_level).border} flex items-center gap-4`}>
                        <div className={`p-3 rounded-xl ${getRiskConfig(result.risk_level).bg} ${getRiskConfig(result.risk_level).text} border ${getRiskConfig(result.risk_level).border}`}>
                            {React.createElement(getRiskConfig(result.risk_level).icon, { size: 24 })}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Risk Assessment</p>
                            <h3 className={`text-lg font-bold ${getRiskConfig(result.risk_level).text}`}>
                                {getRiskConfig(result.risk_level).label}
                            </h3>
                        </div>
                        <div className="ml-auto">
                            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider ${getRiskConfig(result.risk_level).bg} ${getRiskConfig(result.risk_level).text} border ${getRiskConfig(result.risk_level).border}`}>
                                {result.risk_level === 'Severe' && <AlertTriangle size={12} />}
                                {result.risk_level}
                            </span>
                        </div>
                    </div>

                    {/* Result Body */}
                    <div className="p-6">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Clinical Analysis</p>
                        <div className="bg-[#0b0e14] rounded-xl border border-slate-800 p-4">
                            <p className="text-sm text-slate-300 leading-relaxed">{result.warning_message}</p>
                        </div>

                        {/* Analyzed Drugs Summary */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mr-2 self-center">Analyzed:</span>
                            {drugs.map((drug) => (
                                <span key={drug} className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md font-bold border border-slate-700">
                                    {drug}
                                </span>
                            ))}
                        </div>
                        
                        {/* Disclaimer */}
                        <div className="mt-5 pt-4 border-t border-slate-800">
                            <p className="text-[10px] text-slate-600 flex items-center gap-1.5">
                                <ShieldCheck size={10} className="text-slate-700" />
                                AI-powered analysis via BioChain Clinical Engine. Always verify with your prescribing physician.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrugInteractionChecker;
