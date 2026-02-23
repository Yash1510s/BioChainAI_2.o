import { useState } from 'react';
import {
  Home, FileText, Users, User, Settings, Activity,
  LogOut, Wallet, Mail, ArrowRight, ShieldCheck, ArrowLeft,
  Stethoscope, HeartPulse
} from 'lucide-react';
import Register from './Register';
import Dashboard from './Dashboard';
import PatientList from './PatientList';
import './index.css';

// --- COMPONENT: THE LOGIN GATE ---
const LoginGate = ({ onLogin, onCreateIdentity }) => {
  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* OPTION 1: PATIENT */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition duration-300 group flex flex-col">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition"><Mail size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Patient Portal</h2>
          <p className="text-slate-400 mb-8 text-sm flex-1">Login with your Email ID. We manage the blockchain keys for you secure and gasless.</p>
          <button onClick={() => onLogin('PATIENT')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition mb-4">Continue with Email <ArrowRight size={18} /></button>
          <button onClick={onCreateIdentity} className="text-xs text-slate-500 hover:text-emerald-400 transition flex items-center justify-center gap-1">New to BioChain? <span className="underline">Create Identity</span></button>
        </div>

        {/* OPTION 2: DOCTOR */}
        <div className="bg-[#121620]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition duration-300 group flex flex-col">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition"><Wallet size={24} /></div>
          <h2 className="text-2xl font-bold text-white mb-2">Doctor Access</h2>
          <p className="text-slate-400 mb-8 text-sm flex-1">Connect your professional Hardware Wallet or MetaMask to sign medical records directly.</p>
          <button onClick={() => onLogin('DOCTOR')} className="w-full py-4 bg-[#1a1f2e] border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 rounded-xl font-bold flex items-center justify-center gap-2 transition"><Wallet size={18} /> Connect Wallet</button>
        </div>

      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [view, setView] = useState('login');
  const [activeTab, setActiveTab] = useState('Home');
  const [role, setRole] = useState('PATIENT');
  const [wallet, setWallet] = useState("0x...");

  const handleLogin = async (selectedRole) => {
    if (selectedRole === 'DOCTOR') {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWallet(accounts[0]);
          setRole('DOCTOR');
          setView('dashboard');
        } catch (error) { alert("Connection Failed!"); }
      } else { alert("Please install MetaMask!"); }
    } else {
      setRole('PATIENT');
      setWallet("0xf39F...2266");
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setView('login');
    setRole(null);
    setActiveTab('Home');
  };

  // --- DYNAMIC MENU ITEMS (DOCTOR NOW HAS PERSONAL HEALTH TABS TOO) ---
  const menuItems = role === 'DOCTOR' ? [
    { name: 'Home', icon: Home },
    { name: 'Patients', icon: Users },
    { name: 'Appointments', icon: Activity },
    { name: 'My Record', icon: FileText },      // Doctor's personal records
    { name: 'Care Team', icon: HeartPulse },    // Doctor's personal care team
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ] : [
    { name: 'Home', icon: Home },
    { name: 'My Record', icon: FileText },
    { name: 'Care Team', icon: Users },
    { name: 'My Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ];

  if (view === 'login') return <LoginGate onLogin={handleLogin} onCreateIdentity={() => setView('register')} />;

  if (view === 'register') return (
    <div className="min-h-screen bg-[#0b0e14] p-6">
      <button onClick={() => setView('login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"><ArrowLeft size={20} /> Back to Login</button>
      <div className="flex justify-center"><Register role={role} /></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-300 font-sans selection:bg-emerald-500/30">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#121620] border-r border-slate-800 p-6 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 text-white">
          <Activity className="text-emerald-500" size={28} />
          <span className="text-xl font-bold tracking-tight">BioChainAI</span>
        </div>

        <div className="bg-[#1a1f2e] p-4 rounded-xl mb-8 flex items-center gap-3 border border-slate-700/50 shadow-inner">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${role === 'DOCTOR' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>{role === 'DOCTOR' ? 'DR' : 'YV'}</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{role === 'DOCTOR' ? 'Dr. Strange' : 'Yash Singh'}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase font-bold tracking-wider mt-1 inline-block border ${role === 'DOCTOR' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{role}</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.name ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}>
              <item.icon size={20} className={activeTab === item.name ? 'text-emerald-400' : 'group-hover:text-emerald-400'} />
              <span className="text-sm font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
          <div className="bg-slate-800/30 p-3 rounded-lg"><p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Network Status</p><div className="flex items-center gap-2 text-[10px] text-emerald-400"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>Hardhat Local Node</div></div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 text-sm font-medium transition-colors px-4 py-2"><LogOut size={18} /> Disconnect</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{activeTab}</h2>
            <p className="text-slate-500 text-sm mt-1">{role === 'DOCTOR' ? 'Manage patients and clinical records.' : 'Manage your decentralized health ecosystem.'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connected Wallet</p><p className="text-xs font-mono text-emerald-400/80">{wallet.slice(0, 6)}...{wallet.slice(-4)}</p></div>
            <button className="p-2.5 bg-[#1a1f2e] border border-slate-700 rounded-xl hover:bg-slate-800 transition shadow-lg"><Settings size={20} className="text-slate-400" /></button>
          </div>
        </header>

        <div className="max-w-7xl">
          {activeTab === 'Home' && <Dashboard role={role} />}
          {activeTab === 'My Profile' && <Register role={role} />}
          {activeTab === 'Patients' && <PatientList />}

          {/* Placeholder for tabs we haven't built yet */}
          {['My Record', 'Care Team', 'Settings', 'Appointments'].includes(activeTab) && (
            <div className="bg-[#121620] p-12 rounded-3xl border border-slate-800 border-dashed text-center">
              <ShieldCheck size={48} className="mx-auto text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-400">Section Encrypted</h3>
              <p className="text-slate-600 max-w-xs mx-auto mt-2">This module is currently locked on the mainnet. (Phase 2 Feature)</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

export default App;