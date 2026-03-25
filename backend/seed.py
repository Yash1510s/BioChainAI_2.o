from pymongo import MongoClient
from passlib.context import CryptContext

# Connect to Local MongoDB
MONGO_URI = "mongodb+srv://yash82040_db_user:YgU2spnJUDxYnrpZ@cluster0.j6ox3sl.mongodb.net/biochain_db?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["biochain_db"]

# Password Hashing Logic
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed_database():
    print("🌱 Clearing old database records for Enterprise Upgrade...")
    db.hospitals.delete_many({})
    db.doctors.delete_many({})
    db.patients.delete_many({})

    # ==========================================
    # 1. CREATE A HOSPITAL (The Organization)
    # ==========================================
    hospital_admin_wallet = "0xe4b363aBE49C8580010dEEdDF888362c556DBfbc" # Placeholder Admin
    
    hospital = {
        "admin_wallet": hospital_admin_wallet,
        "name": "Apollo Spectra",
        "registration_number": "REG-2026-MUM",
        "is_active": True
    }
    db.hospitals.insert_one(hospital)
    print(f"🏥 Hospital Created: {hospital['name']}")

    # ==========================================
    # 2. HIRE A DOCTOR (Linked to Apollo)
    # ==========================================
    # This is YOUR actual MetaMask wallet from your old seed!
    doctor_wallet = "0x94072243e3344AE3d80509F6Db2e0cb212AdEe79" 
    
    doctor = {
        "wallet_address": doctor_wallet,
        "name": "Dr. Yash",
        "email": "dr.yash@biochain.ai",
        "phone": "+91 98765 43210",
        "address": "Apollo Spectra Hospitals, Mumbai, Maharashtra",
        "license_id": "MD-84758",
        "specialization": "Cardiology",
        "hospital_admin_wallet": hospital_admin_wallet, # Links Dr. Adonis to Apollo
        "role": "SR_DOCTOR",
        "is_active": True
    }
    db.doctors.insert_one(doctor)
    print(f"🩺 Doctor Hired: {doctor['name']} (Assigned to {hospital['name']})")

    # ==========================================
    # 3. REGISTER A PATIENT (Web 2.5 Auth)
    # ==========================================
    patient = {
        "name": "Yash Singh",
        "email": "yash@biochain.ai",
        "phone": "+919876543210",
        "address": "Mumbai, Maharashtra",
        "password": get_password_hash("securepassword123"), 
        # --- NEW ENTERPRISE CLINICAL FIELDS ---
        "bloodGroup": "O+",
        "allergies": "None",
        "emergencyContact": "+919999999999",
        "idHash": "0xabc123456789...YashIdentity" 
    }
    db.patients.insert_one(patient)
    print(f"👤 Patient Registered: {patient['name']} (Enterprise Profile Set)")

    print("\n✅ Enterprise Database Seeding Complete!")

if __name__ == "__main__":
    seed_database()