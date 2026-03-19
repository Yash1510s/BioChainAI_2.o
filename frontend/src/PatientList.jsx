import { useState } from 'react';
import { Search, Filter, MoreHorizontal, FileText, Activity, Shield } from 'lucide-react';

const PatientList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // --- MOCK DATABASE (Simulating the Blockchain) ---
    const allPatients = [
        { id: "0xe94...2266", name: "Yash Vijay Singh", age: 24, blood: "B+", status: "Active", lastVisit: "Today" },
        { id: "0x42a...9912", name: "John Smith", age: 32, blood: "O-", status: "Critical", lastVisit: "2 days ago" },
        { id: "0x12c...8841", name: "Sarah Connor", age: 35, blood: "A+", status: "Discharged", lastVisit: "1 month ago" },
        { id: "0x77b...1120", name: "Tony Stark", age: 48, blood: "AB+", status: "Active", lastVisit: "Yesterday" },
        { id: "0x99a...3311", name: "Steve Rogers", age: 98, blood: "O+", status: "In-Patient", lastVisit: "Ongoing" },
        { id: "0x88c...2214", name: "Bruce Banner", age: 42, blood: "O+", status: "Active", lastVisit: "1 week ago" },
    ];

    // Filter Logic
    const filteredPatients = allPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-white">
            {/* --- SEARCH HEADER --- */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Patient Directory</h2>
                    <p className="text-slate-400 text-sm">Total Registered: {allPatients.length}</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search Name or Wallet ID..."
                            className="bg-[#121620] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 w-72 text-sm focus:border-emerald-500 outline-none text-slate-200"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#121620] border border-slate-700 p-2.5 rounded-xl hover:bg-slate-800 text-slate-400">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* --- PATIENT GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                    <div key={patient.id} className="bg-[#121620] p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition group cursor-pointer relative overflow-hidden">

                        {/* Status Badge */}
                        <div className={`absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded uppercase font-bold border ${patient.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                patient.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                    'bg-slate-700/30 text-slate-400 border-slate-600'
                            }`}>
                            {patient.status}
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-bold border border-slate-600 shadow-inner">
                                {patient.name.charAt(0)}{patient.name.split(' ')[1]?.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight group-hover:text-emerald-400 transition">{patient.name}</h3>
                                <p className="text-xs text-slate-500 font-mono">{patient.id.substring(0, 10)}...</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black/20 p-2 rounded-lg">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Age</p>
                                <p className="text-sm font-semibold">{patient.age} yrs</p>
                            </div>
                            <div className="bg-black/20 p-2 rounded-lg">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Blood</p>
                                <p className="text-sm font-semibold">{patient.blood}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-slate-800 hover:bg-emerald-600 hover:text-white py-2 rounded-lg text-xs font-bold text-slate-300 transition flex items-center justify-center gap-2">
                                <FileText size={14} /> View Record
                            </button>
                            <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-400">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;