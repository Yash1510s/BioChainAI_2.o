import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { User, Mail, Phone, MapPin, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const Register = ({ role }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        blood_type: 'O+',
        allergies: 'None',
        emergency_contact: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This matches your existing backend endpoint in main.py
            const response = await axios.post(`${API_BASE_URL}/register`, formData);
            alert("Identity Created! You can now log in.");
            window.location.reload(); // Quick way to return to login
        } catch (error) {
            alert("Registration Failed: " + (error.response?.data?.detail || "Error"));
        }
    };

    return (
        <div className="w-full max-w-md bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <ShieldCheck size={32} />
                <h2 className="text-2xl font-bold text-white">New Identity</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="text" placeholder="Full Name" required className="w-full bg-[#0b0e14] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="email" placeholder="Email Address" required className="w-full bg-[#0b0e14] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>

                <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="text" placeholder="Phone Number (for 2FA)" required className="w-full bg-[#0b0e14] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="text" placeholder="Residential Address" required className="w-full bg-[#0b0e14] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <select
                            required
                            className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none appearance-none cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                        >
                            <option value="">Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Emergency Phone (e.g. 9876543210)" required className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                            onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })} />
                    </div>
                </div>

                <div className="relative">
                    <input type="text" placeholder="Allergies (e.g. Peanuts, Aspirin)" className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Set Password"
                        required
                        className="w-full bg-[#0b0e14] p-3 pl-10 pr-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all duration-300 active:scale-95"
                >
                    Securely Register on BioChain
                </button>
            </form>
        </div>
    );
};

export default Register;