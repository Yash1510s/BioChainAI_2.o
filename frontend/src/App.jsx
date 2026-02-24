import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import {
  Eye, EyeOff, Mail, Wallet, ArrowRight, ArrowLeft, Activity,
  Home, Users, FileText, User, Settings, LogOut, Heart, Clock, Shield
} from 'lucide-react';
import Register from './Register';
import Dashboard from './Dashboard';
import PatientList from './PatientList';
import './index.css';

const EncryptedSection = ({ title }) => (
  <div className="bg-[#121620] h-[500px] rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center p-8">
    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-500 mb-6 border border-slate-700">
      <Shield size={32} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Section Encrypted</h3>
    <p className="text-slate-500 text-sm max-w-xs">
      This module is currently locked on the mainnet. {title} will be available once the node synchronization is complete.
    </p>
  </div>
);

// --- COMPONENT: THE LOGIN GATE ---
const LoginGate = ({ onLogin, onCreateIdentity, showOtp, otpEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (!showOtp) {
      onLogin('PATIENT', { email, password });
    } else {
      onLogin('PATIENT_VERIFY', { email: otpEmail, otp });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PATIENT PORTAL */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition duration-300 flex flex-col">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6"><Mail size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Patient Portal</h2>

          {!showOtp ? (
            <>
              <p className="text-slate-400 mb-6 text-sm flex-1">Secure login with 2FA protection for your medical records.</p>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="group w-full py-4 bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-emerald-500/10 active:scale-[0.98] mb-4 border border-emerald-400/20"
                >
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  Continue with Email
                </button>
              ) : (
                <form onSubmit={handlePatientSubmit} className="space-y-3 mb-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                      onChange={(e) => setPassword(e.target.value)}
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
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    Get OTP
                  </button>
                </form>
              )}
            </>
          ) : (
            <form onSubmit={handlePatientSubmit} className="space-y-4 mb-4">
              <div className="text-center">
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Verify Identity</p>
                <p className="text-slate-500 text-xs mb-4">Enter the code sent to your terminal</p>
              </div>
              <input
                type="text"
                placeholder="000000"
                maxLength="6"
                required
                className="w-full bg-[#0b0e14] p-4 rounded-xl border-2 border-emerald-500/50 text-white text-center text-2xl tracking-[0.5em] font-mono focus:border-emerald-500 focus:outline-none"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Verify & Login
              </button>
            </form>
          )}
          <button onClick={onCreateIdentity} className="text-xs text-slate-500 hover:text-emerald-400 transition mt-auto">New to BioChain? <span className="underline">Create Identity</span></button>
        </div>

        {/* DOCTOR ACCESS */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition flex flex-col">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6"><Wallet size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Doctor Access</h2>
          <p className="text-slate-400 mb-8 text-sm flex-1">Connect MetaMask to sign medical records directly on the blockchain.</p>
          <button
            onClick={() => onLogin('DOCTOR')}
            className="group w-full py-4 bg-gradient-to-br from-blue-600 to-indigo-800 hover:from-blue-500 hover:to-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-500/10 active:scale-[0.98] border border-blue-400/20"
          >
            <Wallet size={20} className="group-hover:scale-110 transition-transform" />
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [view, setView] = useState('login');
  const [activeTab, setActiveTab] = useState('Home');
  const [role, setRole] = useState(null);
  const [wallet, setWallet] = useState("0x...");
  const [showOtp, setShowOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async (selectedRole, credentials = null) => {
    try {
      if (selectedRole === 'PATIENT') {
        const res = await axios.post(`${API_BASE_URL}/login/patient/step1`, credentials);
        if (res.data.status === "OTP_SENT") {
          setOtpEmail(credentials.email);
          setShowOtp(true);
        }
      }
      else if (selectedRole === 'PATIENT_VERIFY') {
        const res = await axios.post(`${API_BASE_URL}/login/patient/verify`, credentials);
        if (res.data.status === "Success") {
          setRole('PATIENT');
          setWallet(res.data.idHash);
          setUserData(res.data); // Stores profile, name, phone, etc.
          setView('dashboard');
        }
      }
      else if (selectedRole === 'DOCTOR') {
        let provider = window.ethereum;
        // Support for multiple providers (like MetaMask + Brave/Coinbase)
        if (provider?.providers) {
          provider = provider.providers.find(p => p.isMetaMask) || provider.providers[0];
        }

        if (!provider) return alert("MetaMask not detected! Please ensure the extension is enabled and refresh the page.");

        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const msg = `BioChain Login: ${Date.now()}`;
        const signature = await provider.request({
          method: 'personal_sign',
          params: [msg, accounts[0]],
        });

        const res = await axios.post(`${API_BASE_URL}/login/doctor`, {
          wallet_address: accounts[0],
          signature: signature,
          message: msg
        });

        if (res.data.status === "Success") {
          setRole('DOCTOR');
          setWallet(accounts[0]);
          setUserData(res.data);
          setView('dashboard');
        }
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login Failed");
    }
  };

  const handleLogout = () => {
    setView('login');
    setRole(null);
    setShowOtp(false);
    setUserData(null);
  };

  const menuItems = role === 'DOCTOR' ? [
    { name: 'Home', icon: Home },
    { name: 'Patients', icon: Users },
    { name: 'Appointments', icon: Clock },
    { name: 'My Record', icon: FileText },
    { name: 'Care Team', icon: Heart },
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ] : [
    { name: 'Home', icon: Home },
    { name: 'My Record', icon: FileText },
    { name: 'Appointments', icon: Clock },
    { name: 'Care Team', icon: Heart },
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ];

  if (view === 'login') return <LoginGate onLogin={handleLogin} onCreateIdentity={() => setView('register')} showOtp={showOtp} otpEmail={otpEmail} />;

  if (view === 'register') return (
    <div className="min-h-screen bg-[#0b0e14] p-6">
      <button onClick={() => setView('login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"><ArrowLeft size={20} /> Back to Login</button>
      <div className="flex justify-center"><Register role={role} /></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-300 font-sans">
      <aside className="w-64 bg-[#121620] border-r border-slate-800 p-6 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 text-white">
          <Activity className="text-emerald-500" size={28} />
          <span className="text-xl font-bold tracking-tight">BioChainAI</span>
        </div>

        <div className="bg-[#1a1f2e] p-4 rounded-xl mb-8 flex items-center gap-3 border border-slate-700/50">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${role === 'DOCTOR' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
            {userData?.name?.substring(0, 2).toUpperCase() || '??'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{userData?.name || 'User'}</p>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{role}</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === item.name ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' : 'hover:bg-slate-800/50 text-slate-400'}`}>
              <item.icon size={20} />
              <span className="text-sm font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 text-sm px-4 py-2"><LogOut size={18} /> Disconnect</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">{activeTab}</h2>
            <p className="text-slate-500 text-sm">Welcome back, {userData?.name}.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Identity ID</p>
            <p className="text-xs font-mono text-emerald-400/80">{wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
          </div>
        </header>

        <div className="max-w-7xl">
          {activeTab === 'Home' && <Dashboard role={role} userData={userData} />}

          {activeTab === 'Patients' && <PatientList />}

          {activeTab === 'My Record' && (
            role === 'PATIENT' ? <Dashboard role={role} userData={userData} /> : <EncryptedSection title="Personal Records" />
          )}

          {(activeTab === 'Appointments' || activeTab === 'Care Team' || activeTab === 'Settings') && (
            <EncryptedSection title={activeTab} />
          )}

          {activeTab === 'My Profile' && (
            <div className="bg-[#121620] p-8 rounded-3xl border border-slate-800 max-w-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <User size={40} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{userData?.name || "BioChain User"}</h4>
                    <p className="text-slate-500 text-sm">Role: {role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Email Address</label>
                    <p className="text-white font-medium">{userData?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Phone Number</label>
                    <p className="text-white font-medium">{userData?.phone || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Resident Address</label>
                    <p className="text-white font-medium">{userData?.address || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Identity Hash</label>
                    <p className="text-slate-400 font-mono text-xs break-all bg-black/20 p-2 rounded-lg mt-1 border border-slate-800">
                      {userData?.idHash || "PENDING_BLOCKCHAIN_SYNC"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Add other tab components as needed */}
        </div>
      </main>
    </div>
  );
}

export default App;