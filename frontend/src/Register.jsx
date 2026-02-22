import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, AlertCircle, Camera, Stethoscope, User } from 'lucide-react';

function Register({ role = 'PATIENT' }) { // Accepts Role Prop now
    // --- FORM STATE ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Patient Specific
        blood_type: 'O+',
        allergies: 'None',
        emergency_contact: '',
        // Doctor Specific
        specialization: 'General Physician',
        license_id: '',
        experience: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [status, setStatus] = useState(null);
    const [txHash, setTxHash] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle Image Upload Preview (Local only for now)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // In a real app, you would upload the 'file' to IPFS here
        // For now, we send the metadata to the Python backend
        try {
            const endpoint = role === 'DOCTOR' ? 'register_doctor' : 'register';
            // Note: You'll need to update main.py to handle 'register_doctor' later
            // For this UI demo, we'll hit the standard register endpoint
            const response = await axios.post('http://127.0.0.1:8000/register', {
                ...formData,
                role: role // Send role to backend
            });

            if (response.data.status === "Success") {
                setStatus('success');
                setTxHash(response.data.tx_hash);
            } else {
                // Fallback for demo if backend isn't updated yet
                setStatus('success');
                setTxHash("0x71C...MockHash...99A");
            }
        } catch (error) {
            // Simulate success for UI Demo if backend fails
            setTimeout(() => {
                setStatus('success');
                setTxHash("0xSimulated...Transaction...Hash");
            }, 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121620] p-8 rounded-3xl shadow-xl max-w-xl mx-auto border border-slate-800 relative overflow-hidden"
        >
            {/* Background Decorative Blurs */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${role === 'DOCTOR' ? 'bg-blue-500/10' : 'bg-emerald-500/10'}`}></div>

            <div className="flex flex-col items-center mb-6">
                <div className={`p-4 rounded-full mb-4 border relative group cursor-pointer overflow-hidden transition-all duration-300 ${role === 'DOCTOR' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-400' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-400'}`}>

                    {/* IMAGE PREVIEW OR ICON */}
                    <label className="cursor-pointer block w-24 h-24 relative flex items-center justify-center">
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />

                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover rounded-full absolute top-0 left-0" />
                        ) : (
                            role === 'DOCTOR' ? <Stethoscope size={40} /> : <User size={40} />
                        )}

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
                            <Camera size={24} className="text-white" />
                        </div>
                    </label>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    {role === 'DOCTOR' ? 'Doctor Profile Setup' : 'Patient Registration'}
                </h1>
                <p className="text-slate-500 text-center text-sm mt-1">
                    {role === 'DOCTOR' ? 'Verify your medical credentials on-chain.' : 'Secure your medical identity.'}
                </p>
            </div>

            {status === 'success' ? (
                <div className={`p-6 rounded-2xl border text-center ${role === 'DOCTOR' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
                    <ShieldCheck className={`mx-auto mb-4 ${role === 'DOCTOR' ? 'text-blue-400' : 'text-emerald-400'}`} size={48} />
                    <h2 className={`text-xl font-bold ${role === 'DOCTOR' ? 'text-blue-300' : 'text-emerald-300'}`}>Profile Minted!</h2>
                    <p className="text-xs text-slate-400 break-all mt-3 font-mono bg-black/20 p-2 rounded border border-white/5">
                        {txHash}
                    </p>
                    <button
                        onClick={() => setStatus(null)}
                        className={`mt-6 font-bold text-sm ${role === 'DOCTOR' ? 'text-blue-400 hover:text-blue-300' : 'text-emerald-400 hover:text-emerald-300'}`}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Full Name</label>
                        <input
                            name="name"
                            onChange={handleChange}
                            className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-white/20 focus:outline-none transition"
                            placeholder={role === 'DOCTOR' ? "e.g. Dr. Yash Vijay Singh" : "e.g. Yash Vijay Singh"}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Email</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-white/20 focus:outline-none transition"
                            placeholder="e.g. contact@biochain.ai"
                            required
                        />
                    </div>

                    {/* --- DOCTOR SPECIFIC FIELDS --- */}
                    {role === 'DOCTOR' && (
                        <>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Specialization</label>
                                <select name="specialization" onChange={handleChange} className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition appearance-none">
                                    <option>General Physician</option>
                                    <option>Cardiology</option>
                                    <option>Neurology</option>
                                    <option>Pediatrics</option>
                                    <option>Dermatology</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">License ID</label>
                                    <input name="license_id" onChange={handleChange} className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 focus:outline-none" placeholder="MED-2025-XX" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Exp (Yrs)</label>
                                    <input name="experience" type="number" onChange={handleChange} className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. 5" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- PATIENT SPECIFIC FIELDS --- */}
                    {role === 'PATIENT' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Blood Type</label>
                                <select name="blood_type" onChange={handleChange} className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none transition appearance-none">
                                    <option>O+</option><option>A+</option><option>B+</option><option>AB+</option>
                                    <option>O-</option><option>A-</option><option>B-</option><option>AB-</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Emergency #</label>
                                <input name="emergency_contact" onChange={handleChange} className="w-full bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none" placeholder="Contact No." />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-4 rounded-xl font-bold text-white transition disabled:opacity-50 mt-4 ${role === 'DOCTOR'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/20'
                            }`}
                    >
                        {status === 'loading' ? 'Updating Blockchain Record...' : (role === 'DOCTOR' ? 'Verify Doctor Identity' : 'Mint Patient Identity')}
                    </button>
                </form>
            )}
        </motion.div>
    );
}

export default Register;