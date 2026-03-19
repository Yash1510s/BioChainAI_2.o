import React, { useState } from 'react';
import axios from 'axios';
import { User, Phone, MapPin, Edit2, Check, X, UploadCloud, FileText, Activity, ShieldAlert } from 'lucide-react';

const InputField = ({ label, name, value, placeholder, type="text", onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</label>
    <input 
      type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full bg-[#0b0e14] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none transition active:outline-none"
    />
  </div>
);

const DisplayField = ({ label, value }) => (
  <div>
    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</label>
    <p className="text-white font-medium break-all">{value || "N/A"}</p>
  </div>
);

const MyProfile = ({ userRole, userId, userData, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    bloodGroup: userData?.bloodGroup || "",
    allergies: userData?.allergies || "",
    emergencyContact: userData?.emergencyContact || "",
    specialization: userData?.specialization || "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadToIPFS = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await axios.post("http://localhost:8000/upload/ipfs", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.ipfs_hash;
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(userRole?.includes('DOCTOR') ? "Securing Credentials on Web3..." : "Securing Profile on Web3...");
    
    try {
      let photoHash = null;
      let certHash = null;

      if (profilePhoto) photoHash = await uploadToIPFS(profilePhoto);
      if (userRole?.includes("DOCTOR") && certificate) certHash = await uploadToIPFS(certificate);

      let updatePayload = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== "") updatePayload[key] = formData[key];
      });

      if (photoHash) updatePayload.profile_photo_hash = photoHash;

      if (userRole === "PATIENT") {
        await axios.put(`http://localhost:8000/update/patient/${userId}`, updatePayload);
      } else if (userRole?.includes("DOCTOR")) {
        if (certHash) updatePayload.certificate_hash = certHash;
        await axios.put(`http://localhost:8000/update/doctor/${userId}`, updatePayload);
      }

      // Propagate changes to the parent (App.jsx) to trigger a fresh render of the UI instantly
      if (onProfileUpdate) {
        onProfileUpdate(updatePayload);
      }

      setMessage("✅ Profile Successfully Updated!");
      setTimeout(() => {
          setIsEditing(false);
          setMessage("");
      }, 3000);
      
    } catch (error) {
       console.error(error);
       setMessage("❌ Error: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121620] p-8 rounded-3xl border border-slate-800 max-w-3xl">
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white border-2 border-slate-700 overflow-hidden ${userRole?.includes('DOCTOR') ? 'bg-blue-600/20 text-blue-500 border-blue-500/30' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'}`}>
              {userData?.profile_photo_hash ? (
                <img 
                  src={`https://ipfs.io/ipfs/${userData.profile_photo_hash}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">{ (userData?.name || "??").substring(0, 2).toUpperCase() }</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{userData?.name || "BioChain User"}</h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${userRole?.includes('DOCTOR') ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              Role: {userRole}
            </span>
          </div>
        </div>
        
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition active:scale-95 shadow-md">
            <Edit2 size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
             <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition active:scale-95">Cancel</button>
             <button onClick={handleSave} disabled={loading} className={`flex items-center gap-2 px-6 py-2.5 ${userRole?.includes('DOCTOR') ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'} text-white rounded-xl font-bold transition shadow-lg active:scale-95`}>
               {loading ? <span className="animate-pulse">{message || "Saving..."}</span> : <><Check size={18} /> Save Changes</>}
             </button>
          </div>
        )}
      </div>

      {message && !loading && (
          <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message.includes("❌") ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
             {message.includes("❌") ? <X size={20} /> : <Check size={20} />}
             <p className="font-medium text-sm">{message}</p>
          </div>
      )}

      {/* VIEW MODE */}
      {!isEditing ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DisplayField label="Email Address" value={userData?.email} />
            <DisplayField label="Phone Number" value={userData?.phone} />
            
            {userRole === 'PATIENT' && (
              <>
                <DisplayField label="Blood Group" value={userData?.bloodGroup} />
                <DisplayField label="Allergies" value={userData?.allergies} />
              </>
            )}
            
            {userRole?.includes('DOCTOR') && (
              <DisplayField label="Specialization" value={userData?.specialization} />
            )}

            <div className="md:col-span-2">
              <DisplayField label="Resident Address" value={userData?.address} />
            </div>
            
            <div className="md:col-span-2 p-5 bg-black/30 rounded-2xl border border-slate-800 border-dashed">
              <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Blockchain Identity Hash</label>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400"><Activity size={18} /></div>
                  <p className="font-mono text-emerald-500/80 text-sm break-all">
                   {userRole?.includes('DOCTOR') ? userId : (userData?.idHash || "PENDING_BLOCKCHAIN_SYNC")}
                  </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* EDIT MODE */
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
           <div className="p-6 border border-slate-800 rounded-3xl bg-black/20 shadow-inner">
              <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4"><User size={18} className="text-slate-400" /> General Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InputField label="Full Name" name="name" value={formData.name} placeholder="John Doe" onChange={handleInputChange} />
                 <InputField label="Email Address" name="email" value={formData.email} placeholder="doctor@biochain.ai" onChange={handleInputChange} />
                 <InputField label="Phone Number" name="phone" value={formData.phone} placeholder="+1 234 567 890" onChange={handleInputChange} />
                 {userRole === "PATIENT" && <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} placeholder="O+, A-, etc." onChange={handleInputChange} />}
                 {userRole === "PATIENT" && <InputField label="Allergies" name="allergies" value={formData.allergies} placeholder="Peanuts, Penicillin..." onChange={handleInputChange} />}
                 {userRole?.includes("DOCTOR") && <InputField label="Specialization" name="specialization" value={formData.specialization} placeholder="Cardiologist, Neurologist..." onChange={handleInputChange} />}
              </div>
              <div className="mt-6">
                 <InputField label="Resident Address" name="address" value={formData.address} placeholder="123 Web3 Street, Crypto City" onChange={handleInputChange} />
              </div>
           </div>

           <div className="p-6 border border-slate-800 rounded-3xl bg-black/20 shadow-inner">
              <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4"><UploadCloud size={18} className="text-slate-400" /> Secure Documents (IPFS Node)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Profile Photo Upload */}
                 <div className="relative group rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/5 bg-[#0b0e14] p-8 text-center transition cursor-pointer">
                    <input type="file" accept="image/*" onChange={(e)=>setProfilePhoto(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <UploadCloud className="mx-auto text-slate-500 mb-3 group-hover:text-emerald-500 transition group-hover:-translate-y-1" size={32} />
                    <p className="text-sm font-bold text-white mb-1 tracking-wide">{profilePhoto ? profilePhoto.name : "Upload Profile Photo"}</p>
                    <p className="text-[11px] text-slate-500 uppercase font-medium">PNG, JPG up to 5MB</p>
                 </div>

                 {/* Doctor's Certificate Upload */}
                 {userRole?.includes("DOCTOR") && (
                   <div className="relative group rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 bg-[#0b0e14] p-8 text-center transition cursor-pointer">
                      <input type="file" accept="application/pdf" onChange={(e)=>setCertificate(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <FileText className="mx-auto text-slate-500 mb-3 group-hover:text-blue-500 transition group-hover:-translate-y-1" size={32} />
                      <p className="text-sm font-bold text-white mb-1 tracking-wide">{certificate ? certificate.name : "Upload Medical Certificate"}</p>
                      <p className="text-[11px] text-slate-500 uppercase font-medium">PDF documents only</p>
                   </div>
                 )}
              </div>
           </div>
           
           <div className="flex items-center gap-2 justify-center text-xs text-slate-500 pt-4">
              <ShieldAlert size={14} className="text-emerald-500" />
              All documents are encrypted and pinned directly to the decentralized IPFS network.
           </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
