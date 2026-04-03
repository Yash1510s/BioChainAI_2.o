import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import {
  Eye, EyeOff, Mail, Wallet, ArrowRight, ArrowLeft, Activity,
  Home, Users, FileText, User, Settings, LogOut, Heart, Clock, Shield,
  Building, UploadCloud, BadgeCheck, Pill // <-- Added Pill icon for Drug Check
} from 'lucide-react';
import Register from './Register';
import Dashboard from './Dashboard';
import StaffDirectory from './components/StaffDirectory';
import NodeOverview from './components/NodeOverview';
import AuditLogs from './components/AuditLogs';
import PatientList from './PatientList';
import PatientsDirectory from './components/PatientsDirectory';
import MyProfile from './components/MyProfile';
import MyRecords from './components/MyRecords';
import DoctorAppointments from './components/DoctorAppointments';
import UploadData from './components/UploadData';
import PatientAppointments from './components/PatientAppointments';
import CareTeam from './components/CareTeam';
import LiveVitals from './components/LiveVitals';
import DrugInteractionChecker from './components/DrugInteractionChecker';
import AIAssistantWidget from './components/AIAssistantWidget';
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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);


  // --- FORGOT PASSWORD STATE ---
  const [forgotMode, setForgotMode] = useState(false);       // Shows forgot UI
  const [forgotStep, setForgotStep] = useState(1);           // 1=email, 2=otp+newpw, 3=success
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/login/patient/forgot-password/request`, { email: forgotEmail });
      if (res.data.status === 'OTP_SENT') {
        setForgotMsg(res.data.message);
        setForgotStep(2);
      }
    } catch (err) {
      setForgotMsg(err.response?.data?.detail || 'Something went wrong.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotVerify = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/login/patient/forgot-password/verify`, {
        email: forgotEmail,
        otp: forgotOtp,
        new_password: newPassword
      });
      if (res.data.status === 'Success') {
        setForgotStep(3);
      }
    } catch (err) {
      setForgotMsg(err.response?.data?.detail || 'OTP Invalid or Expired.');
    } finally {
      setForgotLoading(false);
    }
  };

  const resetForgotState = () => {
    setForgotMode(false);
    setForgotStep(1);
    setForgotEmail('');
    setForgotOtp('');
    setNewPassword('');
    setForgotMsg('');
  };

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
      {/* UPDATE: Changed max-w-4xl to max-w-6xl and md:grid-cols-2 to lg:grid-cols-3 to fit 3 cards */}
      <div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* 1. PATIENT PORTAL (Web 2.5) */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition duration-300 flex flex-col">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6"><Mail size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Patient Portal</h2>

          {/* ---- FORGOT PASSWORD MODE ---- */}
          {forgotMode ? (
            <div className="flex-1 flex flex-col">
              {forgotStep === 1 && (
                <form onSubmit={handleForgotRequest} className="space-y-3 flex-1 flex flex-col">
                  <p className="text-slate-400 text-sm mb-2">Enter your registered email to receive a reset OTP.</p>
                  <input
                    type="email" required placeholder="Registered Email"
                    value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-amber-500 focus:outline-none"
                  />
                  {forgotMsg && <p className="text-xs text-red-400">{forgotMsg}</p>}
                  <button type="submit" disabled={forgotLoading}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold transition disabled:opacity-50">
                    {forgotLoading ? 'Sending OTP...' : 'Send Reset OTP 🔒'}
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleForgotVerify} className="space-y-3 flex-1 flex flex-col">
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Reset Password</p>
                  <p className="text-slate-400 text-xs mb-1">{forgotMsg}</p>
                  <input
                    type="text" required placeholder="Enter OTP" maxLength="6"
                    value={forgotOtp} onChange={e => setForgotOtp(e.target.value)}
                    className="w-full bg-[#0b0e14] p-3 rounded-xl border border-amber-500/50 text-white text-center text-xl tracking-[0.4em] font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"} required placeholder="New Password" minLength="6"
                      value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-amber-500 focus:outline-none pr-10"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-white transition">
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {forgotMsg && forgotStep === 2 && <p className="text-xs text-red-400">{forgotMsg}</p>}
                  <button type="submit" disabled={forgotLoading}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold transition disabled:opacity-50">
                    {forgotLoading ? 'Verifying...' : 'Reset Password ✅'}
                  </button>
                </form>
              )}

              {forgotStep === 3 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-2xl">✅</div>
                  <h3 className="text-lg font-bold text-white">Password Reset!</h3>
                  <p className="text-slate-400 text-sm">Your new password is active. You can now login.</p>
                  <button onClick={resetForgotState}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition">
                    Back to Login
                  </button>
                </div>
              )}

              {forgotStep < 3 && (
                <button onClick={resetForgotState} className="text-xs text-slate-500 hover:text-slate-300 transition mt-4 text-center">
                  ← Back to Login
                </button>
              )}
            </div>

          ) : (
          /* ---- NORMAL LOGIN MODE ---- */
          <>
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
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="w-full text-xs text-amber-500 hover:text-amber-400 transition text-right pr-1"
                  >
                    Forgot Password?
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
                Verify &amp; Login
              </button>
            </form>
          )}
          <button onClick={onCreateIdentity} className="text-xs text-slate-500 hover:text-emerald-400 transition mt-auto">New to BioChain? <span className="underline">Create Identity</span></button>
          </>
          )}
        </div>

        {/* 2. DOCTOR ACCESS (Web3 Native) */}
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

        {/* 3. NEW: ENTERPRISE ADMIN ACCESS (Web3 Native) */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition flex flex-col">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6"><Building size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Enterprise Admin</h2>
          <p className="text-slate-400 mb-8 text-sm flex-1">Authenticate as a Hospital Node Administrator to manage clinical staff access.</p>
          <button
            onClick={() => onLogin('ADMIN')}
            className="group w-full py-4 bg-gradient-to-br from-purple-600 to-fuchsia-800 hover:from-purple-500 hover:to-fuchsia-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-purple-500/10 active:scale-[0.98] border border-purple-400/20"
          >
            <Shield size={20} className="group-hover:scale-110 transition-transform" />
            Node Access
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
  const [selectedPatient, setSelectedPatient] = useState(null);

  const onLogin = async (selectedRole, credentials = null) => {
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
          setUserData({ ...res.data, email: otpEmail });
          setView('dashboard');
        }
      }
      // UPDATE: Handle both Doctor AND Admin Web3 Logins
      else if (selectedRole === 'DOCTOR' || selectedRole === 'ADMIN') {
        let provider = window.ethereum;
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

        // Determine which backend API to hit based on the button clicked
        const apiEndpoint = selectedRole === 'DOCTOR' ? '/login/doctor' : '/login/admin';

        const res = await axios.post(`${API_BASE_URL}${apiEndpoint}`, {
          wallet_address: accounts[0],
          signature: signature,
          message: msg
        });

        if (res.data.status === "Success") {
          setRole(res.data.role); // 'DOCTOR' or 'HOSPITAL_ADMIN'
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
    setSelectedPatient(null);
    setActiveTab('Home');
  };

  // UPDATE: Added menu items specifically for the Hospital Admin
  const menuItems = role === 'HOSPITAL_ADMIN' ? [
    { name: 'Home', icon: Home },
    { name: 'Node Overview', icon: Activity },
    { name: 'Staff Directory', icon: Users },
    { name: 'Audit Logs', icon: FileText },
    { name: 'Settings', icon: Settings },
  ] : role?.includes('DOCTOR') ? [
    { name: 'Home', icon: Home },
    { name: 'Live Vitals', icon: Activity },
    { name: 'Patients', icon: Users },
    { name: 'Appointments', icon: Clock },
    { name: 'Drug Check', icon: Pill },
    { name: 'My Record', icon: FileText },
    { name: 'Upload Data', icon: UploadCloud },
    { name: 'Care Team', icon: Heart },
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ] : [
    { name: 'Home', icon: Home },
    { name: 'Live Vitals', icon: Activity },
    { name: 'My Record', icon: FileText },
    { name: 'Upload Data', icon: UploadCloud },
    { name: 'Drug Check', icon: Pill },
    { name: 'Appointments', icon: Clock },
    { name: 'Care Team', icon: Heart },
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ];

  if (view === 'login') return <LoginGate onLogin={onLogin} onCreateIdentity={() => setView('register')} showOtp={showOtp} otpEmail={otpEmail} />;

  if (view === 'register') return (
    <div className="min-h-screen bg-[#0b0e14] p-6">
      <button onClick={() => setView('login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"><ArrowLeft size={20} /> Back to Login</button>
      <div className="flex justify-center"><Register role={role} /></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-300 font-sans print:bg-white">
      <aside className="w-64 bg-[#121620] border-r border-slate-800 p-6 flex flex-col fixed h-full z-20 overflow-y-auto overflow-x-hidden print:hidden">
        <div className="flex items-center gap-3 mb-10 text-white flex-shrink-0">
          <Activity className={role === 'HOSPITAL_ADMIN' ? 'text-purple-500' : role?.includes('DOCTOR') ? 'text-blue-500' : 'text-emerald-500'} size={28} />
          <span className="text-xl font-bold tracking-tight">BioChainAI</span>
          {role === 'HOSPITAL_ADMIN' && <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-purple-500/20">Admin</span>}
        </div>

        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 border transition-all duration-300 flex-shrink-0 ${
          role === 'HOSPITAL_ADMIN' ? 'bg-purple-500/5 border-purple-500/20' :
          role?.includes('DOCTOR') ? 'bg-blue-500/5 border-blue-500/20' :
          'bg-[#1a1f2e] border-slate-700/50'
        }`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0 ${role?.includes('DOCTOR') ? 'bg-blue-600' : role === 'HOSPITAL_ADMIN' ? 'bg-purple-600' : 'bg-emerald-600'}`}>
            {userData?.profile_photo_hash ? (
              <img
                src={`https://ipfs.io/ipfs/${userData.profile_photo_hash}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              (userData?.name || userData?.hospital_name || '??').substring(0, 2).toUpperCase()
            )}
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-sm font-bold text-white truncate">{userData?.name || userData?.hospital_name || 'User'}</p>
            <span className={`text-[10px] uppercase font-bold tracking-widest ${
              role === 'HOSPITAL_ADMIN' ? 'text-purple-400' :
              role?.includes('DOCTOR') ? 'text-blue-400' :
              'text-slate-500'
            }`}>{role?.replace('_', ' ')}</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            const activeClasses = role === 'HOSPITAL_ADMIN'
              ? 'bg-purple-500/10 text-purple-400 border-l-4 border-purple-500'
              : role?.includes('DOCTOR')
              ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500'
              : 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500';
            return (
              <button key={item.name} onClick={() => setActiveTab(item.name)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? activeClasses : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}>
                <item.icon size={20} className="flex-shrink-0" />
                <span className="text-sm font-semibold truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 text-sm px-4 py-2 transition-colors duration-200"><LogOut size={18} className="flex-shrink-0" /> Disconnect</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-x-hidden print:ml-0 print:p-0">
        <header className="flex justify-between items-center mb-10 print:hidden">
          <div>
            <h2 className="text-3xl font-bold text-white">{activeTab}</h2>
            <p className="text-slate-500 text-sm">Welcome back, {userData?.name || userData?.hospital_name}.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Identity ID</p>
            <p className={`text-xs font-mono ${
              role === 'HOSPITAL_ADMIN' ? 'text-purple-400/80' :
              role?.includes('DOCTOR') ? 'text-blue-400/80' :
              'text-emerald-400/80'
            }`}>{wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
          </div>
        </header>

        <div className="max-w-7xl">
          {activeTab === 'Home' && role !== 'HOSPITAL_ADMIN' && <Dashboard role={role} userData={userData} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setActiveTab={setActiveTab} />}
          {activeTab === 'Home' && role === 'HOSPITAL_ADMIN' && <Dashboard role={role} userData={userData} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setActiveTab={setActiveTab} />}

          {/* Admin Specific Tabs */}
          {activeTab === 'Node Overview' && role === 'HOSPITAL_ADMIN' && <NodeOverview setActiveTab={setActiveTab} />}
          {activeTab === 'Staff Directory' && role === 'HOSPITAL_ADMIN' && <StaffDirectory />}
          {activeTab === 'Audit Logs' && role === 'HOSPITAL_ADMIN' && <AuditLogs />}

          {activeTab === 'Patients' && <PatientsDirectory doctorData={userData} onSelectPatient={(p) => { 
              setSelectedPatient(p); 
              setActiveTab('Home'); 
          }} />}

          {activeTab === 'My Record' && (
            (role === 'PATIENT' || role?.includes('DOCTOR')) ? <MyRecords userData={userData} /> : <EncryptedSection title="Personal Records" />
          )}

          {activeTab === 'Upload Data' && <UploadData userData={userData} />}

          {/* LIVE VITALS TAB — Full IoT Monitor with Canvas Charts & Threshold Alerts */}
          {activeTab === 'Live Vitals' && (role === 'PATIENT' || role?.includes('DOCTOR')) && (
            <LiveVitals userData={userData} />
          )}

          {/* Appointments Tab Rendering Logic */}
          {activeTab === 'Appointments' && role === 'PATIENT' && <PatientAppointments userData={userData} />}
          {activeTab === 'Appointments' && role?.includes('DOCTOR') && <DoctorAppointments userData={userData} />}
          {activeTab === 'Appointments' && role === 'HOSPITAL_ADMIN' && <EncryptedSection title={activeTab} />}

          {/* CARE TEAM TAB */}
          {activeTab === 'Care Team' && (role === 'PATIENT' || role?.includes('DOCTOR')) && (
            <CareTeam userData={userData} role={role} />
          )}
          {activeTab === 'Care Team' && role === 'HOSPITAL_ADMIN' && (
            <EncryptedSection title={activeTab} />
          )}
          {activeTab === 'Drug Check' && (role === 'PATIENT' || role?.includes('DOCTOR')) && <DrugInteractionChecker />}
          {activeTab === 'Settings' && <EncryptedSection title={activeTab} />}

          {activeTab === 'My Profile' && (
            <MyProfile
              userRole={role}
              userId={role?.includes('DOCTOR') ? wallet : userData?.email}
              userData={userData}
              onProfileUpdate={(updatedFields) => setUserData({ ...userData, ...updatedFields })}
            />
          )}

          {/* JARVIS: Floating AI Widget — visible on all pages when logged in */}
          <AIAssistantWidget userData={userData} role={role} />
        </div>
      </main>
    </div>
  );
}

export default App;