import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpload = ({ userEmail }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAndSave = async () => {
    if (!file) {
      alert("Pehle ek file select karo bhai!");
      return;
    }

    setLoading(true);
    setMessage("⏳ Uploading to IPFS via FastAPI...");

    try {
      // Step 1: Form Data create karo file bhejne ke liye
      const formData = new FormData();
      formData.append("file", file);

      // Step 2: FastAPI ke naye IPFS endpoint par file bhejo
      // Make sure 8000 tumhara backend port hai
      const uploadRes = await axios.post("http://localhost:8000/upload/ipfs", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const ipfsHash = uploadRes.data.ipfs_hash;
      setMessage(`📦 IPFS Hash Milya: ${ipfsHash} ... Profile update ho rahi hai!`);

      // Step 3: Naye Hash ko MongoDB mein User Profile ke sath link karo
      const updateRes = await axios.put(`http://localhost:8000/update/patient/${userEmail}`, {
        profile_photo_hash: ipfsHash
      });

      if (updateRes.data.status === "Success") {
         setMessage("✅ Boom! Profile Successfully Updated with Web3 Hash!");
      }
      
    } catch (error) {
      console.error(error);
      setMessage("❌ Error: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #00ffcc", borderRadius: "10px", marginTop: "20px", backgroundColor: "#1a1a2e", color: "white" }}>
      <h3>Upload Medical Doc / Photo</h3>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
      <br />
      <button 
        onClick={handleUploadAndSave} 
        disabled={loading} 
        style={{ padding: "10px 20px", backgroundColor: "#00ffcc", color: "black", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        {loading ? "Uploading to Web3..." : "Secure Upload"}
      </button>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#a8b2d1" }}>{message}</p>
    </div>
  );
};

export default ProfileUpload;
