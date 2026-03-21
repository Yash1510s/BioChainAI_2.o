import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Calendar, Clock, User, Building, FileText, Plus, X, Activity, CheckCircle, Clock3 } from 'lucide-react';

const PatientAppointments = ({ userData }) => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');

    // Form State (No Date/Time anymore!)
    const [formData, setFormData] = useState({
        doctor_wallet: '',
        reason: ''
    });

    useEffect(() => {
        fetchData();
    }, [userData.email]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const appRes = await axios.get(`${API_BASE_URL}/appointments/patient/${userData.email}`);
            setAppointments(appRes.data.appointments || []);

            const docRes = await axios.get(`${API_BASE_URL}/api/doctors/active`);
            setDoctors(docRes.data.doctors || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        setBookingMessage("⏳ Sending request to doctor...");

        const selectedDoc = doctors.find(d => d.wallet_address === formData.doctor_wallet);

        if (!selectedDoc) {
            setBookingMessage("❌ Please select a valid doctor.");
            return;
        }

        // Clean up "Dr. Dr." if it exists in DB
        const cleanDoctorName = selectedDoc.name.replace(/^Dr\.\s*/i, '');

        const payload = {
            patient_email: userData.email,
            patient_name: userData.name || "Unknown Patient",
            doctor_wallet: selectedDoc.wallet_address,
            doctor_name: cleanDoctorName,
            hospital_name: selectedDoc.hospital_name || "Private",
            reason: formData.reason
        };

        try {
            await axios.post(`${API_BASE_URL}/appointments/book`, payload);
            setBookingMessage("🎉 Request sent! Awaiting Doctor's approval.");
            
            fetchData();
            setTimeout(() => {
                setIsBookingModalOpen(false);
                setFormData({ doctor_wallet: '', reason: '' });
                setBookingMessage('');
            }, 2500);
            
        } catch (error) {
            console.error(error);
            setBookingMessage("❌ Failed to send request.");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2">
            <Activity className="animate-spin" /> Syncing Medical Schedule...
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
            
            <div className="bg-[#121620] rounded-3xl p-6 border border-slate-800 shadow-xl flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Calendar className="text-emerald-500" size={28} /> My Appointments
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Manage your clinical visits across the BioChain network.</p>
                </div>
                <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="relative z-10 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                    <Plus size={20} /> Request Consult
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children animate-fade-in-up">
                {appointments.length > 0 ? (
                    appointments.map((app, index) => {
                        const isPending = app.status === "Pending";
                        return (
                            <div key={index} className={`bg-[#121620] rounded-3xl p-6 border shadow-xl transition-all group card-hover relative overflow-hidden ${isPending ? 'border-yellow-500/30 hover:border-yellow-500/50' : 'border-slate-800 hover:border-emerald-500/30'}`}>
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 ${isPending ? 'bg-yellow-500/5 group-hover:bg-yellow-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}`}></div>
                                
                                {/* Status Badge */}
                                <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-lg ${isPending ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                    {isPending ? <Clock3 size={12} /> : <CheckCircle size={12} />} 
                                    {app.status}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-4 pr-24 line-clamp-1 relative z-10 group-hover:text-emerald-400 transition-colors">Dr. {app.doctor_name}</h3>
                                
                                <div className="space-y-4 mb-2 relative z-10">
                                    <p className="text-sm text-slate-400 flex items-center gap-3">
                                        <Building size={16} className="text-slate-500"/> {app.hospital_name}
                                    </p>
                                    
                                    {/* Show Time ONLY if scheduled, else show waiting message */}
                                    {isPending ? (
                                        <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10 text-xs text-yellow-500 font-medium">
                                            Awaiting doctor to assign date & time...
                                        </div>
                                    ) : (
                                        <div className="flex gap-6">
                                            <p className="text-sm text-emerald-400 flex items-center gap-2 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                                <Calendar size={14} /> {app.appointment_date}
                                            </p>
                                            <p className="text-sm text-emerald-400 flex items-center gap-2 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                                <Clock size={14} /> {app.appointment_time}
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-[#0b0e14] p-3 rounded-xl border border-slate-800/50 mt-2">
                                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Reason / Symptoms</p>
                                        <p className="text-sm text-slate-300 italic">"{app.reason}"</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full bg-[#121620] border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
                        <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">No Consultations Yet</h3>
                        <p>Request an appointment with a network doctor to get started.</p>
                    </div>
                )}
            </div>

            {/* REQUEST MODAL */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121620] border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
                        <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition">
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Plus className="text-emerald-400" /> Request Consult
                        </h2>
                        <p className="text-sm text-slate-400 mb-6">Send your symptoms to a doctor. They will assign a time slot.</p>

                        <form onSubmit={handleBookAppointment} className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <User size={14} /> Select Doctor & Network
                                </label>
                                <select 
                                    required
                                    value={formData.doctor_wallet}
                                    onChange={(e) => setFormData({...formData, doctor_wallet: e.target.value})}
                                    className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none transition appearance-none"
                                >
                                    <option value="" disabled>-- Search & Choose Doctor --</option>
                                    {doctors.map(doc => {
                                        const cleanName = doc.name.replace(/^Dr\.\s*/i, '');
                                        return (
                                            <option key={doc.wallet_address} value={doc.wallet_address}>
                                                Dr. {cleanName} ({doc.specialization || 'Gen. Physician'}) - {doc.hospital_name || 'Private'}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText size={14} /> Details / Symptoms
                                </label>
                                <textarea 
                                    required
                                    rows="4"
                                    placeholder="Briefly describe what you are feeling... e.g., 'Mild fever since 2 days'"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-900/20"
                            >
                                Send Request to Doctor
                            </button>

                            {bookingMessage && (
                                <div className={`p-4 rounded-xl text-center font-bold text-sm border ${bookingMessage.includes('❌') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
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

export default PatientAppointments;
