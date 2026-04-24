# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
from pymongo import MongoClient
from passlib.context import CryptContext

# Database Connection
client = MongoClient("mongodb://localhost:27017")
db = client.biochain_db

# Password Hasher for the Patient
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed_database():
    print("🌱 Clearing old database records...")
    db.hospitals.delete_many({})
    db.doctors.delete_many({})
    db.patients.delete_many({})

    # ==========================================
    # 1. CREATE A HOSPITAL (The Organization)
    # ==========================================
    hospital_admin_wallet = "0xAdminWalletAddressHere1234567890" # Placeholder Admin Wallet
    
    hospital = {
        "admin_wallet": hospital_admin_wallet,
        "name": "Apollo Spectra",
        "registration_number": "REG-2026-MUM",
        "is_active": True
    }
    db.hospitals.insert_one(hospital)
    print(f"🏥 Hospital Created: {hospital['name']}")

    # ==========================================
    # 2. HIRE A DOCTOR (Linked to the Hospital)
    # ==========================================
    # ⚠️ IMPORTANT: Replace this with your ACTUAL MetaMask Wallet Address so you can log in!
    doctor_wallet = "0x94072243e3344AE3d80509F6Db2e0cb212AdEe79" 
    
    doctor = {
        "wallet_address": doctor_wallet,
        "name": "Dr. Yash",
        "license_id": "MD-84758",
        "specialization": "Neurology",
        "hospital_admin_wallet": hospital_admin_wallet, # Links Dr. Strange to Apollo
        "role": "SR_DOCTOR",
        "is_active": True
    }
    db.doctors.insert_one(doctor)
    print(f"🩺 Doctor Hired: {doctor['name']} (Assigned to {hospital['name']})")

    # ==========================================
    # 3. REGISTER A PATIENT (Web 2.5 Auth)
    # ==========================================
    patient = {
        "name": "Yash",
        "email": "yash@biochain.ai",
        "phone": "+91 9876543210",
        "address": "Mumbai, Maharashtra, India",
        "password": get_password_hash("password123"), # Hashed for security
        "bloodGroup": "O+",
        "allergies": "Penicillin",
        "emergencyContact": "+91 9999999999",
        "idHash": "0xPendingBlockchainHash..." # Will be updated when actually registered on-chain
    }
    db.patients.insert_one(patient)
    print(f"👤 Patient Registered: {patient['name']}")

    print("\n✅ Enterprise Database Seeding Complete!")

if __name__ == "__main__":
    seed_database()