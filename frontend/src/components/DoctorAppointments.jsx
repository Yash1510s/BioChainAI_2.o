import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Calendar, Clock, User, Building, FileText, Plus, X, Activity, CheckCircle, Stethoscope, HeartPulse } from 'lucide-react';

const DoctorAppointments = ({ userData }) => {
    // UI States
    const [viewMode, setViewMode] = useState('CLINICAL'); // 'CLINICAL' or 'PERSONAL'
    const [loading, setLoading] = useState(true);
    
    // Data States
    const [clinicalAppointments, setClinicalAppointments] = useState([]);
    const [personalAppointments, setPersonalAppointments] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [approvalInputs, setApprovalInputs] = useState({});
    
    // Booking Modal States
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');
    const [formData, setFormData] = useState({ doctor_wallet: '', reason: '' });

    useEffect(() => {
        fetchAllData();
    }, [userData]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Patients waiting for this Doctor (Clinical)
            if (userData?.wallet_address) {
                const clinRes = await axios.get(`${API_BASE_URL}/appointments/doctor/${userData.wallet_address}`);
                setClinicalAppointments(clinRes.data.appointments || []);
            }

            // 2. Fetch Doctor's own appointments as a Patient (Personal)
            // Fallback to wallet if email is missing for Web3 doctors
            const personalId = userData?.email || userData?.wallet_address;
            if (personalId) {
                const persRes = await axios.get(`${API_BASE_URL}/appointments/patient/${personalId}`);
                setPersonalAppointments(persRes.data.appointments || []);
            }

            // 3. Fetch all active doctors for personal booking
            const docRes = await axios.get(`${API_BASE_URL}/api/doctors/active`);
            setDoctorsList(docRes.data.doctors || []);

        } catch (error) {
            console.error("Error fetching scheduling data:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- DOCTOR APPROVING PATIENT REQUEST ---
    const handleApprove = async (appId) => {
        const data = approvalInputs[appId];
        if (!data?.date || !data?.time) {
            alert("⚠️ Please select both Date and Time to approve.");
            return;
        }
        try {
            await axios.put(`${API_BASE_URL}/appointments/approve/${appId}`, {
                appointment_date: data.date,
                appointment_time: data.time
            });
            fetchAllData(); // Refresh list
        } catch (error) {
            alert("Failed to approve appointment.");
        }
    };

    // --- DOCTOR BOOKING PERSONAL APPOINTMENT ---
    const handleBookPersonal = async (e) => {
        e.preventDefault();
        setBookingMessage("⏳ Sending request...");

        const selectedDoc = doctorsList.find(d => d.wallet_address === formData.doctor_wallet);
        if (!selectedDoc) return setBookingMessage("❌ Please select a doctor.");

        const cleanDoctorName = selectedDoc.name.replace(/^Dr\.\s*/i, '');
        const personalId = userData?.email || userData?.wallet_address;

        const payload = {
            patient_email: personalId,
            patient_name: `Dr. ${userData.name || "Unknown"}`, // Tagging as Doctor
            doctor_wallet: selectedDoc.wallet_address,
            doctor_name: cleanDoctorName,
            hospital_name: selectedDoc.affiliated_hospital_id || "BioChain Network",
            reason: formData.reason
        };

        try {
            await axios.post(`${API_BASE_URL}/appointments/book`, payload);
            setBookingMessage("🎉 Request sent successfully!");
            fetchAllData();
            setTimeout(() => {
                setIsBookingModalOpen(false);
                setFormData({ doctor_wallet: '', reason: '' });
                setBookingMessage('');
                setViewMode('PERSONAL'); // Switch to personal tab to see it
            }, 2000);
        } catch (error) {
            setBookingMessage("❌ Failed to send request.");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Syncing Master Schedule...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header & Toggle */}
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Calendar className="text-blue-500" size={28} /> Master Schedule
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Manage your clinic queue and your personal health consultations.</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#0b0e14] p-1.5 rounded-2xl border border-slate-800 flex">
                        <button 
                            onClick={() => setViewMode('CLINICAL')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${viewMode === 'CLINICAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Stethoscope size={16} /> Clinical Queue
                        </button>
                        <button 
                            onClick={() => setViewMode('PERSONAL')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${viewMode === 'PERSONAL' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <HeartPulse size={16} /> My Personal Health
                        </button>
                    </div>

                    {/* ONLY SHOW BOOK BUTTON IN PERSONAL MODE */}
                    {viewMode === 'PERSONAL' && (
                        <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                        >
                            <Plus size={18} /> Book Consult
                        </button>
                    )}
                </div>
            </div>

            {/* ==============================================
                MODE 1: CLINICAL QUEUE (Patients waiting for Doctor)
            ============================================== */}
            {viewMode === 'CLINICAL' && (
                <div className="space-y-6">
                    {/* Pending Approvals */}
                    <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                        <Clock className="text-yellow-400" size={20} /> Action Required (Pending Requests)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {clinicalAppointments.filter(a => a.status === 'Pending').length > 0 ? (
                            clinicalAppointments.filter(a => a.status === 'Pending').map((app) => (
                                <div key={app._id} className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-500/20 shadow-lg">
                                    <h4 className="font-bold text-white text-lg">{app.patient_name}</h4>
                                    <p className="text-sm text-slate-400 mt-1 mb-4">Reason: <span className="italic">"{app.reason}"</span></p>
                                    
                                    <div className="flex flex-wrap items-center gap-3 bg-[#0b0e14] p-3 rounded-xl border border-slate-800">
                                        <input 
                                            type="date" 
                                            className="bg-transparent text-sm text-white outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                            onChange={(e) => setApprovalInputs({...approvalInputs, [app._id]: {...approvalInputs[app._id], date: e.target.value}})}
                                        />
                                        <input 
                                            type="time" 
                                            className="bg-transparent text-sm text-white outline-none border-l border-slate-700 pl-3 ml-1 cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                            onChange={(e) => setApprovalInputs({...approvalInputs, [app._id]: {...approvalInputs[app._id], time: e.target.value}})}
                                        />
                                        <button 
                                            onClick={() => handleApprove(app._id)}
                                            className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-lg flex items-center gap-1.5"
                                        >
                                            <CheckCircle size={14} /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-sm italic col-span-full">No pending requests.</p>
                        )}
                    </div>

                    {/* Scheduled & Past */}
                    <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2 mt-8">
                        <CheckCircle className="text-emerald-400" size={20} /> Scheduled & Completed
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {clinicalAppointments.filter(a => a.status !== 'Pending').length > 0 ? (
                            clinicalAppointments.filter(a => a.status !== 'Pending').map((app) => (
                                <div key={app._id} className="bg-[#121620] p-5 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition shadow-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white">{app.patient_name}</h4>
                                        <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">{app.status}</span>
                                    </div>
                                    <p className="text-sm text-blue-400 font-bold mb-2">{app.appointment_date} | {app.appointment_time}</p>
                                    <p className="text-xs text-slate-500 line-clamp-2">"{app.reason}"</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-sm italic col-span-full">No scheduled appointments.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ==============================================
                MODE 2: PERSONAL HEALTH (Doctor acting as Patient)
            ============================================== */}
            {viewMode === 'PERSONAL' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {personalAppointments.length > 0 ? (
                        personalAppointments.map((app, index) => {
                            const isPending = app.status === "Pending";
                            return (
                                <div key={index} className={`bg-[#121620] rounded-2xl p-6 border shadow-lg ${isPending ? 'border-yellow-500/30' : 'border-slate-800'}`}>
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${isPending ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                        {app.status}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-4">Dr. {app.doctor_name}</h3>
                                    
                                    <div className="space-y-3">
                                        {isPending ? (
                                            <p className="text-xs text-yellow-500 font-medium">Awaiting doctor to assign date & time...</p>
                                        ) : (
                                            <p className="text-sm text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 inline-block">
                                                {app.appointment_date} at {app.appointment_time}
                                            </p>
                                        )}
                                        <div className="bg-[#0b0e14] p-3 rounded-xl border border-slate-800/50 mt-2">
                                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Reason</p>
                                            <p className="text-sm text-slate-300 italic">"{app.reason}"</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center p-12 border border-slate-800 rounded-3xl text-slate-500">
                            <HeartPulse size={48} className="mx-auto mb-4 opacity-50 text-emerald-500" />
                            <h3 className="text-xl font-bold text-white mb-2">No Personal Consultations</h3>
                            <p>You haven't requested any checkups for yourself yet.</p>
                        </div>
                    )}
                </div>
            )}

            {/* --- PERSONAL BOOKING MODAL --- */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121620] border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
                        <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition">
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Plus className="text-emerald-400" /> Book Personal Consult
                        </h2>
                        <p className="text-sm text-slate-400 mb-6">Request an appointment with a fellow specialist.</p>

                        <form onSubmit={handleBookPersonal} className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <User size={14} /> Select Specialist
                                </label>
                                <select 
                                    required
                                    value={formData.doctor_wallet}
                                    onChange={(e) => setFormData({...formData, doctor_wallet: e.target.value})}
                                    className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none"
                                >
                                    <option value="" disabled>-- Choose a Colleague/Doctor --</option>
                                    {doctorsList.map(doc => {
                                        const cleanName = doc.name.replace(/^Dr\.\s*/i, '');
                                        // Don't let the doctor book themselves!
                                        if(doc.wallet_address === userData.wallet_address) return null; 
                                        return (
                                            <option key={doc.wallet_address} value={doc.wallet_address}>
                                                Dr. {cleanName} ({doc.specialization || 'Specialist'})
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText size={14} /> Reason for Consult
                                </label>
                                <textarea 
                                    required rows="3" placeholder="Describe your symptoms..."
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition">
                                Send Request
                            </button>
                            {bookingMessage && (
                                <div className="p-4 rounded-xl text-center font-bold text-sm bg-slate-800 text-white mt-2 border border-slate-700">
                                    {bookingMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;
