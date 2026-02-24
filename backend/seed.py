from pymongo import MongoClient

# Connect to Local MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client.biochain_db 

print("🌱 Seeding the BioChain Database with Extended Profiles...")

# 1. Insert Patient with 2FA Info
db.patients.delete_many({}) 
db.patients.insert_one({
    "email": "yash@biochain.ai",
    "password": "securepassword123",
    "name": "Yash Singh",
    "phone": "+919876543210", # Required for OTP
    "address": "Mumbai, Maharashtra", # Real-world contact info
    "idHash": "0xabc123456789...YashIdentity"
})
print("✅ Inserted Patient: Yash Singh (Profile + Phone set)")

# 2. Insert Doctor
db.doctors.delete_many({}) 
db.doctors.insert_one({
    "wallet_address": "0x94072243e3344AE3d80509F6Db2e0cb212AdEe79", # Make sure this matches your MetaMask!
    "name": "Dr. Adonis",
    "specialization": "Cardiology",
    "hospital_id": "Apollo-001"
})
print("✅ Inserted Doctor: Dr. Adonis")

print("🎉 Seeding Complete!")