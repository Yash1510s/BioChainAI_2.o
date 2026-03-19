from fastapi import FastAPI, HTTPException, Body, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from eth_account import Account
from eth_account.messages import encode_defunct
from pymongo import MongoClient
from bson import ObjectId
from passlib.context import CryptContext
import random
import requests
import os
import datetime
# IMPORT your existing blockchain functions
# Note: Removed 'from app.models import PatientSignup' because we are defining the enterprise models below
from app.blockchain import register_patient_on_chain, get_hospital_details, fetch_patient_data
from app.pinata import upload_file_to_ipfs

app = FastAPI()

# Standard CORS for React communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# ==========================================
# 1. DATABASE CONNECTION
# ==========================================
client = MongoClient("mongodb://localhost:27017")
db = client.biochain_db 
patients_collection = db.patients
doctors_collection = db.doctors
hospitals_collection = db.hospitals # <-- NEW: Added Hospitals Collection
records_collection = db["medical_records"]
appointments_collection = db.appointments

# Password Hashing Logic
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# In-memory storage for pending OTPs (Temporary)
OTP_STORAGE = {}

# ==========================================
# 2. ENTERPRISE DATA MODELS
# ==========================================
class HospitalCreate(BaseModel):
    admin_wallet: str          
    name: str                  
    registration_number: str   
    is_active: bool = True

class DoctorCreate(BaseModel):
    wallet_address: str
    name: str
    license_id: str            
    specialization: str
    hospital_admin_wallet: str # Links doc to a specific hospital admin
    role: str = "JR_DOCTOR"    
    is_active: bool = True

class PatientSignup(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    password: str
    bloodGroup: str = "Not Specified"
    allergies: str = "None"
    emergencyContact: str = "Not Specified"
    idHash: Optional[str] = None 

# Login Models
class PatientLogin(BaseModel):
    email: str
    password: str

class DoctorLogin(BaseModel):
    wallet_address: str
    signature: str
    message: str 

class AdminLogin(BaseModel):
    wallet_address: str
    signature: str
    message: str 

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    bloodGroup: Optional[str] = None
    allergies: Optional[str] = None
    emergencyContact: Optional[str] = None
    profile_photo_hash: Optional[str] = None # Pinata IPFS Hash

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    specialization: Optional[str] = None
    profile_photo_hash: Optional[str] = None # Pinata IPFS Hash
    certificate_hash: Optional[str] = None   # Medical Degree PDF Hash

# ==========================================
# 3. EXISTING CLINICAL ENDPOINTS
# ==========================================
@app.get("/")
def read_root():
    name = get_hospital_details()
    return {"message": f"Welcome to {name} API"}

@app.post("/register")
def register_patient(patient: PatientSignup):
    print(f"📝 New Registration: {patient.name}")
    
    # 1. Check if email already exists
    if patients_collection.find_one({"email": patient.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Trigger Blockchain Smart Contract
    try:
        # This calls your register_patient_on_chain function
        blockchain_result = register_patient_on_chain(patient)
        
        if blockchain_result.get("status") == "Error":
             raise HTTPException(status_code=500, detail=f"Blockchain Registration Failed: {blockchain_result.get('message')}")

        # 3. Save to MongoDB with the newly generated idHash, hashed password, and clinical defaults
        new_user = {
            "name": patient.name,
            "email": patient.email,
            "phone": patient.phone,
            "address": patient.address,
            "password": get_password_hash(patient.password),
            "bloodGroup": patient.bloodGroup,             # <-- NEW
            "allergies": patient.allergies,               # <-- NEW
            "emergencyContact": patient.emergencyContact, # <-- NEW
            "idHash": blockchain_result.get("idHash", "0x000_FAILED")
        }
        
        patients_collection.insert_one(new_user)
        
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=f"Registration System Error: {str(e)}")
    
    return {"status": "Success", "message": "Identity registered on MongoDB and Blockchain"}

@app.get("/dashboard")
def get_dashboard_data():
    return fetch_patient_data()

# ==========================================
# 4. STEP 1: PASSWORD AUTH + OTP GENERATION
# ==========================================
@app.post("/login/patient/step1")
def login_patient_step1(data: PatientLogin):
    print(f"🔐 Stage 1 Auth: {data.email}")
    
    # Search MongoDB
    user = patients_collection.find_one({"email": data.email})
    
    if not user or not verify_password(data.password, user.get("password")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Generate 6-digit OTP
    otp_code = str(random.randint(100000, 999999))
    OTP_STORAGE[data.email] = otp_code
    
    # SIMULATION: Printing OTP to terminal as an "SMS"
    print("\n" + "="*40)
    print(f"📲 SMS SENT TO: {user.get('phone')}")
    print(f"🔑 YOUR BIOCHAIN OTP IS: {otp_code}")
    print("="*40 + "\n")
    
    return {
        "status": "OTP_SENT",
        "message": f"Code sent to your registered number ending in {user.get('phone')[-4:]}"
    }

# ==========================================
# 5. STEP 2: OTP VERIFICATION
# ==========================================
@app.post("/login/patient/verify")
def login_patient_verify(payload: dict = Body(...)):
    email = str(payload.get("email", ""))
    user_otp = str(payload.get("otp", ""))
    
    if not email or not user_otp:
        raise HTTPException(status_code=400, detail="Email and OTP required")
        
    stored_otp = OTP_STORAGE.get(email)
    
    if stored_otp and stored_otp == user_otp:
        user = patients_collection.find_one({"email": email})
        
        if not user:
             raise HTTPException(status_code=404, detail="User not found")
        
        # Cleanup OTP in a type-safe way
        OTP_STORAGE.pop(email, None)
        
        user.pop("_id", None)
        user.pop("password", None)
        
        return {
            "status": "Success", 
            "role": "PATIENT", 
            **user
        }
    
    raise HTTPException(status_code=401, detail="Incorrect OTP. Access Denied.")

# ==========================================
# 6. DOCTOR WEB3 LOGIN (META-MASK)
# ==========================================
@app.post("/login/doctor")
def login_doctor(data: DoctorLogin):
    doctor = doctors_collection.find_one({"wallet_address": {"$regex": f"^{data.wallet_address}$", "$options": "i"}})
    
    if not doctor:
        raise HTTPException(status_code=403, detail="Not an authorized Doctor.")

    try:
        message_hash = encode_defunct(text=data.message)
        recovered_address = Account.recover_message(message_hash, signature=data.signature)
        
        if recovered_address.lower() != data.wallet_address.lower():
            raise HTTPException(status_code=401, detail="Signature Mismatch")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail="Crypto Verification Failed")

    doctor.pop("_id", None)
    doctor.pop("password", None)

    # Ensure a name is always returned
    doctor_name = doctor.get("name")
    if not doctor_name or "Demo Doctor" in doctor_name:
        doctor_name = "Yash"
        doctor["name"] = doctor_name

    return {"status": "Success", "role": "DOCTOR", **doctor}

# ==========================================
# 6.5. HOSPITAL ADMIN WEB3 LOGIN (META-MASK)
# ==========================================
@app.post("/login/admin")
def login_admin(data: AdminLogin):
    # MongoDB ki hospitals collection mein admin_wallet search karo
    hospital = hospitals_collection.find_one({"admin_wallet": {"$regex": f"^{data.wallet_address}$", "$options": "i"}})
    
    if not hospital:
        raise HTTPException(status_code=403, detail="Not an authorized Hospital Admin.")

    try:
        # Cryptographic Signature Verification
        message_hash = encode_defunct(text=data.message)
        recovered_address = Account.recover_message(message_hash, signature=data.signature)
        
        if recovered_address.lower() != data.wallet_address.lower():
            raise HTTPException(status_code=401, detail="Signature Mismatch")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail="Crypto Verification Failed")

    return {
        "status": "Success", 
        "role": "HOSPITAL_ADMIN", 
        "hospital_name": hospital.get('name')
    }

# ==========================================
# 10. ISSUE NEW MEDICAL RECORD (WEB3) — COMING SOON
# ==========================================
class MedicalRecord(BaseModel):
    patient_id: str
    doctor_wallet: str
    doctor_name: str = "Unknown Doctor"
    hospital_name: str
    title: str
    diagnosis: str
    ipfs_hashes: list[str] = [] # Changed from single string to an array

@app.post("/record/issue")
def issue_medical_record(record: MedicalRecord):
    import datetime
    
    try:
        record_dict = record.dict()
        record_dict["timestamp"] = datetime.datetime.utcnow().isoformat()
        record_dict["isSelfUploaded"] = ("Self-Uploaded" in record.doctor_wallet)
        
        records_collection.insert_one(record_dict)
        return {"status": "Success", "message": "Record securely added."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/record/patient/{patient_id}")
def get_patient_records(patient_id: str):
    try:
        # Search for records where patient_id matches
        records = list(records_collection.find({"patient_id": patient_id}))
        # Convert ObjectId to string for JSON serialization
        for r in records:
            r["_id"] = str(r["_id"])
        # Sort by timestamp descending (newest first)
        records.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        return {"status": "Success", "records": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# ==========================================
# 7. PROFILE UPDATE ENDPOINTS
# ==========================================

@app.put("/update/patient/{email}")
def update_patient_profile(email: str, update_data: PatientUpdate):
    # Remove fields that are None (matlab jo user ne update nahi kiye)
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="Koi naya data nahi bheja update karne ke liye.")
    
    # MongoDB update query
    result = patients_collection.update_one(
        {"email": email},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Patient nahi mila.")
        
    return {"status": "Success", "message": "Patient profile updated successfully", "updated_fields": list(update_dict.keys())}


@app.put("/update/doctor/{wallet_address}")
def update_doctor_profile(wallet_address: str, update_data: DoctorUpdate):
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="Koi naya data nahi bheja update karne ke liye.")
    
    # Wallet address case-insensitive search ke liye regex use karte hain
    result = doctors_collection.update_one(
        {"wallet_address": {"$regex": f"^{wallet_address}$", "$options": "i"}},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Doctor nahi mila.")
        
    return {"status": "Success", "message": "Doctor profile updated successfully", "updated_fields": list(update_dict.keys())}


# ==========================================
# 11. UPLOAD FILE TO PINATA IPFS (MULTI-FILE)
# ==========================================
@app.post("/upload/ipfs")
async def upload_to_ipfs(files: List[UploadFile] = File(...)):
    PINATA_API_KEY = os.getenv("PINATA_API_KEY")
    PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

    if not PINATA_API_KEY or not PINATA_SECRET_API_KEY:
        return {"status": "Error", "detail": "Pinata API Keys missing in .env"}

    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY
    }

    uploaded_hashes = []
    
    try:
        for file in files:
            # Read the file data
            file_content = await file.read()
            
            # Prepare file for Pinata
            pinata_files = {
                "file": (file.filename, file_content, file.content_type)
            }

            # Send to Pinata
            response = requests.post(url, files=pinata_files, headers=headers)

            if response.status_code == 200:
                ipfs_hash = response.json()["IpfsHash"]
                uploaded_hashes.append(ipfs_hash)
            else:
                return {"status": "Error", "detail": f"Failed to upload {file.filename}: {response.text}"}
                
        return {"status": "Success", "ipfs_hashes": uploaded_hashes}
            
    except Exception as e:
        return {"status": "Error", "detail": str(e)}

# ==========================================
# 12. PATIENT DIRECTORY (CRM FOR DOCTORS)
# ==========================================
@app.get("/api/patients")
def get_all_patients():
    try:
        # Fetch all patients, hide _id and password
        patients = list(patients_collection.find({}, {"_id": 0, "password": 0}))
        
        # Reverse the list so newest signups appear first
        patients.reverse()
        
        return {"status": "Success", "patients": patients}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# ==========================================
# 13. APPOINTMENT ENGINE (V2: REQUEST BASED)
# ==========================================
from pydantic import BaseModel
import datetime

# Patient ab date/time nahi bhejega
class AppointmentCreate(BaseModel):
    patient_email: str
    patient_name: str
    doctor_wallet: str
    doctor_name: str
    hospital_name: str
    reason: str

# Doctor approve karte waqt date/time set karega
class AppointmentApprove(BaseModel):
    appointment_date: str
    appointment_time: str

@app.post("/appointments/book")
def book_appointment(appointment: AppointmentCreate):
    try:
        app_dict = appointment.dict()
        app_dict["status"] = "Pending"  # Status ab Pending se start hoga
        app_dict["created_at"] = datetime.datetime.utcnow().isoformat()
        
        appointments_collection.insert_one(app_dict)
        return {"status": "Success", "message": "Appointment request sent to doctor!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to request appointment: {str(e)}")

# NAYA ROUTE: Doctor Approve Karega
@app.put("/appointments/approve/{app_id}")
def approve_appointment(app_id: str, details: AppointmentApprove):
    try:
        result = appointments_collection.update_one(
            {"_id": ObjectId(app_id)},
            {"$set": {
                "status": "Scheduled",
                "appointment_date": details.appointment_date,
                "appointment_time": details.appointment_time
            }}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return {"status": "Success", "message": "Appointment Scheduled successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/appointments/patient/{email}")
def get_patient_appointments(email: str):
    try:
        appointments = list(appointments_collection.find({"patient_email": email}))
        for r in appointments:
            r["_id"] = str(r["_id"]) # Convert ObjectId to string
        appointments.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return {"status": "Success", "appointments": appointments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching appointments: {str(e)}")

@app.get("/appointments/doctor/{wallet}")
def get_doctor_appointments(wallet: str):
    try:
        appointments = list(appointments_collection.find(
            {"doctor_wallet": {"$regex": f"^{wallet}$", "$options": "i"}}
        ))
        for r in appointments:
            r["_id"] = str(r["_id"])
        appointments.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return {"status": "Success", "appointments": appointments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching appointments: {str(e)}")
        
@app.get("/api/doctors/active")
def get_active_doctors():
    try:
        doctors = list(doctors_collection.find({}, {"_id": 0, "password": 0, "certificate_hash": 0}))
        
        # Attach Hospital Names
        for doc in doctors:
            hospital_wallet = doc.get("hospital_admin_wallet")
            if hospital_wallet:
                hospital = hospitals_collection.find_one({"admin_wallet": {"$regex": f"^{hospital_wallet}$", "$options": "i"}})
                if hospital:
                    doc["hospital_name"] = hospital.get("name", "Private")
                else:
                    doc["hospital_name"] = "Private"
            else:
                doc["hospital_name"] = "Private"
                
        return {"status": "Success", "doctors": doctors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
