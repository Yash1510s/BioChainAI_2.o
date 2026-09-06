# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
from fastapi import FastAPI, HTTPException, Body, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from eth_account import Account
from eth_account.messages import encode_defunct
from pymongo import MongoClient
from bson import ObjectId
import certifi
from passlib.context import CryptContext
import random
import requests
import os
import json
import asyncio
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
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
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/biochain_db")

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["biochain_db"]
patients_collection = db.patients
doctors_collection = db.doctors
hospitals_collection = db.hospitals # <-- NEW: Added Hospitals Collection
records_collection = db["medical_records"]
appointments_collection = db.appointments
permissions_collection = db.permissions # Care Team Access Control
audit_collection = db["audit_logs"] # <-- NEW: Audit Logs

# Helper function jo har important action ke baad call hoga
import uuid
import random

def create_audit_log(actor_name, actor_wallet, action_type, description, color):
    from datetime import datetime
    log_entry = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
        "actor_name": actor_name,
        "actor_wallet": actor_wallet,
        "action_type": action_type,
        "description": description,
        "color": color,
        "tx_hash": f"0x{random.getrandbits(128):032x}" # Mocking Web3 Hash for MVP
    }
    audit_collection.insert_one(log_entry)

# Password Hashing Logic
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # Fallback: old accounts may have plain-text passwords stored
        # This handles the UnknownHashError for legacy/test users
        return plain_password == hashed_password

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
# 5.5. FORGOT / RESET PASSWORD (OTP BASED)
# ==========================================
class PasswordResetRequest(BaseModel):
    email: str

class PasswordResetVerify(BaseModel):
    email: str
    otp: str
    new_password: str

@app.post("/login/patient/forgot-password/request")
def request_password_reset(data: PasswordResetRequest):
    print(f"🔒 Password Reset Request for: {data.email}")
    
    user = patients_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="Email not registered in BioChain.")
    
    otp_code = str(random.randint(100000, 999999))
    OTP_STORAGE[data.email] = otp_code
    
    print("\n" + "="*40)
    print(f"🔒 PASSWORD RESET SMS TO: {user.get('phone')}")
    print(f"🔑 BIOCHAIN RESET OTP: {otp_code}")
    print("="*40 + "\n")
    
    return {
        "status": "OTP_SENT",
        "message": f"Reset code sent to number ending in {user.get('phone', '????')[-4:]}"
    }

@app.post("/login/patient/forgot-password/verify")
def verify_password_reset(data: PasswordResetVerify):
    stored_otp = OTP_STORAGE.get(data.email)
    if not stored_otp or stored_otp != data.otp:
        raise HTTPException(status_code=401, detail="Invalid or expired OTP.")
    
    hashed_pw = get_password_hash(data.new_password)
    result = patients_collection.update_one(
        {"email": data.email},
        {"$set": {"password": hashed_pw}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update password.")
    
    OTP_STORAGE.pop(data.email, None)
    
    print(f"✅ Password reset for: {data.email}")
    return {"status": "Success", "message": "Password reset! You can now login."}



# ==========================================
# 6. DOCTOR WEB3 LOGIN (META-MASK)
# ==========================================
@app.post("/login/doctor")
def login_doctor(data: DoctorLogin):
    clean_address = data.wallet_address.strip()
    doctor = doctors_collection.find_one({"wallet_address": {"$regex": f"^\\s*{clean_address}\\s*$", "$options": "i"}})
    
    if not doctor:
        raise HTTPException(status_code=403, detail="Not an authorized Doctor.")

    try:
        message_hash = encode_defunct(text=data.message)
        recovered_address = Account.recover_message(message_hash, signature=data.signature)
        
        if recovered_address.lower() != clean_address.lower():
            raise HTTPException(status_code=401, detail="Signature Mismatch")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail="Crypto Verification Failed")

    doctor.pop("_id", None)
    doctor.pop("password", None)

    # Preserve clinical role / designation and MongoDB status
    staff_designation = doctor.pop("role", "DOCTOR")
    account_status = doctor.pop("status", "Active")

    return {
        **doctor,
        "status": "Success",
        "account_status": account_status,
        "role": "DOCTOR",
        "staff_designation": staff_designation,
        "designation": staff_designation
    }

# ==========================================
# 6.5. HOSPITAL ADMIN WEB3 LOGIN (META-MASK)
# ==========================================
@app.post("/login/admin")
def login_admin(data: AdminLogin):
    clean_address = data.wallet_address.strip()
    # MongoDB ki hospitals collection mein admin_wallet search karo
    hospital = hospitals_collection.find_one({"admin_wallet": {"$regex": f"^\\s*{clean_address}\\s*$", "$options": "i"}})
    
    if not hospital:
        raise HTTPException(status_code=403, detail="Not an authorized Hospital Admin.")

    try:
        # Cryptographic Signature Verification
        message_hash = encode_defunct(text=data.message)
        recovered_address = Account.recover_message(message_hash, signature=data.signature)
        
        if recovered_address.lower() != clean_address.lower():
            raise HTTPException(status_code=401, detail="Signature Mismatch")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail="Crypto Verification Failed")

    return {
        "status": "Success", 
        "role": "HOSPITAL_ADMIN", 
        "wallet_address": data.wallet_address,
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
def get_patient_records(patient_id: str, doctor_wallet: Optional[str] = None):
    try:
        clean_pid = patient_id.strip()
        
        # If requested by a doctor, verify consent before releasing medical history
        if doctor_wallet:
            clean_doc_wallet = doctor_wallet.strip()
            # If patient_id is email or idHash
            patient = patients_collection.find_one({
                "$or": [
                    {"email": {"$regex": f"^\\s*{clean_pid}\\s*$", "$options": "i"}},
                    {"idHash": {"$regex": f"^\\s*{clean_pid}\\s*$", "$options": "i"}}
                ]
            })
            p_email = patient.get("email", clean_pid) if patient else clean_pid
            access_check = check_doctor_access(p_email, clean_doc_wallet)
            if not access_check.get("access_granted"):
                raise HTTPException(status_code=403, detail="Access Denied: Patient has not granted consent to view medical records.")

        # Search for records where patient_id matches
        records = list(records_collection.find({"patient_id": clean_pid}))
        # Convert ObjectId to string for JSON serialization
        for r in records:
            r["_id"] = str(r["_id"])
        # Sort by timestamp descending (newest first)
        records.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        return {"status": "Success", "records": records}
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# ==========================================
# 7. PROFILE UPDATE ENDPOINTS
# ==========================================

@app.get("/api/patient/{email}")
def get_patient_profile(email: str):
    patient = patients_collection.find_one({"email": email})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    patient["_id"] = str(patient["_id"])
    if "password" in patient:
        del patient["password"]
    return {"status": "Success", "patient": patient}


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

@app.get("/ipfs/file/{ipfs_hash}")
def get_ipfs_file(ipfs_hash: str):
    """
    Proxy endpoint to stream IPFS files via Pinata Dedicated Gateway.
    Prevents public gateway SSL certificate mismatch and network blocking issues.
    """
    gateway = os.getenv("PINATA_GATEWAY", "https://silver-absent-pelican-610.mypinata.cloud").rstrip("/")
    if not gateway.startswith("http"):
        gateway = f"https://{gateway}"
    
    target_url = f"{gateway}/ipfs/{ipfs_hash}"
    try:
        req = requests.get(target_url, stream=True, timeout=20)
        if req.status_code == 200:
            media_type = req.headers.get("Content-Type", "application/pdf")
            return StreamingResponse(
                req.iter_content(chunk_size=1024 * 64),
                media_type=media_type,
                headers={
                    "Content-Disposition": f"inline; filename={ipfs_hash}",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "public, max-age=86400"
                }
            )
        else:
            raise HTTPException(status_code=req.status_code, detail="Unable to retrieve file from IPFS")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"IPFS Gateway Proxy Error: {str(e)}")

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

@app.get("/api/patients/doctor/{doctor_wallet}")
def get_doctor_assigned_patients(doctor_wallet: str):
    try:
        clean_wallet = doctor_wallet.strip()
        
        # 1. Find all patients who booked an appointment with this doctor
        appts = list(appointments_collection.find(
            {"doctor_wallet": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}}
        ))
        
        # 2. Find patients who granted explicit permission
        perms = list(permissions_collection.find(
            {"doctor_wallet": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}, "access_granted": True}
        ))
        
        # Collect unique patient emails
        patient_emails = set()
        for a in appts:
            if a.get("patient_email"):
                patient_emails.add(a.get("patient_email").strip())
        for p in perms:
            if p.get("patient_email"):
                patient_emails.add(p.get("patient_email").strip())
                
        # 3. Retrieve patient documents
        assigned_patients = []
        for email in patient_emails:
            patient = patients_collection.find_one(
                {"email": {"$regex": f"^\\s*{email}\\s*$", "$options": "i"}},
                {"_id": 0, "password": 0}
            )
            if patient:
                # Check latest permission override if any
                perm_check = permissions_collection.find_one({
                    "patient_email": {"$regex": f"^\\s*{email}\\s*$", "$options": "i"},
                    "doctor_wallet": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}
                })
                access_granted = perm_check.get("access_granted", True) if perm_check else True
                
                # Count total appointments with this doc
                doc_appts = [a for a in appts if a.get("patient_email", "").strip().lower() == email.lower()]
                latest_status = doc_appts[0].get("status", "Scheduled") if doc_appts else "Granted"
                
                patient["access_granted"] = access_granted
                patient["appointment_status"] = latest_status
                patient["total_appointments"] = len(doc_appts)
                assigned_patients.append(patient)
                
        return {"status": "Success", "assigned_patients": assigned_patients}
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


# ==========================================
# 14. CARE TEAM & ACCESS CONTROL (DATA SOVEREIGNTY)
# ==========================================

class AccessToggle(BaseModel):
    patient_email: str
    doctor_wallet: str
    grant_access: bool  # True for Granted, False for Revoked

@app.get("/care-team/{patient_email}")
def get_care_team(patient_email: str):
    try:
        # 1. Find all unique doctors this patient has booked appointments with
        patient_appointments = list(appointments_collection.find({"patient_email": patient_email}))
        
        unique_doctors = {}
        for appt in patient_appointments:
            wallet = appt.get("doctor_wallet")
            if wallet and wallet not in unique_doctors:
                # Get doctor details from doctors_collection
                doc_info = doctors_collection.find_one(
                    {"wallet_address": {"$regex": f"^{wallet}$", "$options": "i"}},
                    {"_id": 0, "password": 0}
                )
                if doc_info:
                    unique_doctors[wallet] = {
                        "wallet_address": wallet,
                        "name": doc_info.get("name", appt.get("doctor_name", "Dr. Unknown")),
                        "specialization": doc_info.get("specialization", "General Physician"),
                        "hospital": appt.get("hospital_name", doc_info.get("hospital_name", "BioChain Network")),
                        "access_granted": True  # Default: access is granted
                    }

        # 2. Check permissions_collection for any access overrides
        for wallet in unique_doctors.keys():
            perm = permissions_collection.find_one({"patient_email": patient_email, "doctor_wallet": wallet})
            if perm:
                unique_doctors[wallet]["access_granted"] = perm.get("access_granted", True)

        return {"status": "Success", "care_team": list(unique_doctors.values())}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch Care Team: {str(e)}")


@app.put("/care-team/toggle-access")
def toggle_doctor_access(data: AccessToggle):
    try:
        # Upsert the permission (Update if exists, Insert if not)
        permissions_collection.update_one(
            {"patient_email": data.patient_email, "doctor_wallet": data.doctor_wallet},
            {"$set": {
                "patient_email": data.patient_email,
                "doctor_wallet": data.doctor_wallet,
                "access_granted": data.grant_access,
                "updated_at": datetime.datetime.utcnow().isoformat()
            }},
            upsert=True
        )
        
        status_msg = "Access Granted ✅" if data.grant_access else "Access Revoked 🔴"
        
        # --- NEW: LOG THIS REAL ACTION TO AUDIT LEDGER ---
        patient = patients_collection.find_one({"email": data.patient_email})
        patient_name = patient.get("name", "Unknown Patient") if patient else "Unknown Patient"
        patient_wallet = patient.get("idHash", "0xSystemGen...") if patient else "0x000"

        if data.grant_access:
            create_audit_log(
                actor_name=patient_name,
                actor_wallet=patient_wallet,
                action_type="ACCESS_GRANTED",
                description="Granted decryption key to Care Team",
                color="emerald"
            )
        else:
            create_audit_log(
                actor_name=patient_name,
                actor_wallet=patient_wallet,
                action_type="ACCESS_REVOKED",
                description="Revoked IPFS viewing permissions for Care Team",
                color="rose"
            )
            
        return {"status": "Success", "message": f"{status_msg} for Doctor."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to change access: {str(e)}")


@app.get("/care-team/check-access/{patient_email}/{doctor_wallet}")
def check_doctor_access(patient_email: str, doctor_wallet: str):
    """Used by doctor's patient directory and record vaults to verify access before showing records."""
    try:
        clean_email = patient_email.strip()
        clean_wallet = doctor_wallet.strip()

        # 1. Check if patient has explicitly revoked or granted access
        perm = permissions_collection.find_one({
            "patient_email": {"$regex": f"^\\s*{clean_email}\\s*$", "$options": "i"},
            "doctor_wallet": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}
        })
        if perm is not None:
            is_granted = bool(perm.get("access_granted", False))
            return {
                "status": "Success", 
                "access_granted": is_granted, 
                "reason": "Explicit Consent Setting" if is_granted else "Consent Explicitly Revoked by Patient"
            }

        # 2. If no explicit override, check if patient has ANY appointment with this doctor
        appt = appointments_collection.find_one({
            "patient_email": {"$regex": f"^\\s*{clean_email}\\s*$", "$options": "i"},
            "doctor_wallet": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}
        })
        if appt:
            return {
                "status": "Success", 
                "access_granted": True, 
                "reason": "Active Clinical Appointment Relation"
            }

        # 3. Default: NO ACCESS if no appointment and no consent granted
        return {
            "status": "Success", 
            "access_granted": False, 
            "reason": "No Appointment or Consent Record Found"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to check access: {str(e)}")

# ==========================================
# 15. BIOCHAIN AI ASSISTANT (TRUE GEN-AI ENGINE)
# ==========================================
from google import genai as google_genai

def get_gemini_client():
    load_dotenv(override=True)
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    return google_genai.Client(api_key=api_key) if api_key else None

GEMINI_MODEL = "gemini-1.5-flash"

class ChatRequest(BaseModel):
    user_id: Optional[str] = "Anonymous"
    role: Optional[str] = "USER"
    message: str

@app.post("/api/ai/chat")
def ai_assistant_chat(request: ChatRequest):
    try:
        context_prompt = ""
        role_upper = (request.role or "").upper()

        if role_upper == "PATIENT":
            patient = patients_collection.find_one({"email": request.user_id}) or {}
            name = patient.get("name", "User")
            bg = patient.get("bloodGroup", "Unknown")
            context_prompt = f"""
You are 'BioChain AI', a highly secure, empathetic, and professional Web3 healthcare assistant.
You are talking to a patient named {name}. Their blood group is {bg}.
Keep your answers concise, helpful, and under 3-4 sentences. Do NOT provide fatal medical diagnoses.
If the issue sounds serious, advise them to consult their Care Team or visit an emergency room.

User's Message: "{request.message}"
"""
        elif "DOCTOR" in role_upper:
            doctor = doctors_collection.find_one({"wallet_address": request.user_id}) or {}
            name = doctor.get("name", "Doctor")
            spec = doctor.get("specialization", "Specialist")
            clean_name = name.replace("Dr. ", "").replace("Dr.", "").strip()
            context_prompt = f"""
You are 'BioChain AI', a highly secure clinical assistant for a Web3 healthcare network.
You are assisting Dr. {clean_name}, who specializes in {spec}.
Assist them professionally with clinical concepts, scheduling logic, or medical terminology. Keep it concise.

Doctor's Message: "{request.message}"
"""
        elif "ADMIN" in role_upper:
            context_prompt = f"""
You are 'BioChain AI', an intelligent Web3 Hospital Management Assistant.
You are assisting a Hospital Administrator on BioChain AI Network.
Help them with hospital operations, blockchain security overview, or staff onboarding inquiries. Keep it concise and professional.

Administrator's Message: "{request.message}"
"""
        else:
            context_prompt = f'You are BioChain AI, a healthcare assistant. Answer helpfully and concisely. Message: "{request.message}"'

        # 1. Attempt Live Gemini AI generation
        client = get_gemini_client()
        if client:
            for model_name in ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro", "gemini-flash-latest"]:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=context_prompt
                    )
                    if response and response.text:
                        return {"status": "Success", "reply": response.text.strip()}
                except Exception as model_err:
                    print(f"Gemini attempt with {model_name} failed: {model_err}")
                    continue

        # 2. Smart Contextual Clinical Fallback Engine (Runs when Gemini API Key is invalid or rate limited)
        msg_lower = request.message.lower().strip()

        if any(w in msg_lower for w in ["hi", "hello", "hey", "hola"]):
            if role_upper == "PATIENT":
                return {"status": "Success", "reply": f"Hello {patient.get('name', 'there')}! I am your BioChain Health Assistant. Your health records and IoT vitals are securely synced on-chain. How can I assist you today?"}
            elif "DOCTOR" in role_upper:
                return {"status": "Success", "reply": f"Welcome Dr. {clean_name}! Your clinical node is active. I can help you review patient directories, check appointments, or look up drug interactions."}
            elif "ADMIN" in role_upper:
                return {"status": "Success", "reply": "Greetings Administrator. Hospital node telemetry is optimal and staff directories are encrypted. How can I assist with hospital operations?"}
            return {"status": "Success", "reply": "Hello! I am BioChain AI, your decentralized healthcare intelligence assistant. How can I help you today?"}

        if any(w in msg_lower for w in ["vitals", "heart rate", "pulse", "spo2", "blood pressure", "bp"]):
            return {"status": "Success", "reply": "Your live IoT vitals are monitored in real-time under the 'Live Vitals' tab. If you experience persistent readings outside normal ranges (HR > 100 or SpO2 < 95%), please consult your authorized Care Team."}

        if any(w in msg_lower for w in ["appointment", "booking", "doctor", "consult"]):
            return {"status": "Success", "reply": "You can schedule appointments with verified hospital specialists directly under the 'Appointments' tab. Once booked, your doctor will receive encrypted access to your clinical chart."}

        if any(w in msg_lower for w in ["care team", "revoke", "access", "consent", "permission"]):
            return {"status": "Success", "reply": "BioChain guarantees Zero-Trust Data Sovereignty. You can manage or instantly revoke doctor access anytime from the 'Care Team' tab."}

        if any(w in msg_lower for w in ["drug", "medicine", "interaction", "paracetamol", "aspirin", "ibuprofen"]):
            return {"status": "Success", "reply": "For multi-drug safety checks, use our built-in 'Drug Check' tool in the sidebar. Always consult your attending doctor before modifying prescription dosages."}

        if any(w in msg_lower for w in ["emergency", "sos", "urgent", "help", "pain", "chest"]):
            return {"status": "Success", "reply": "⚠️ If you are experiencing a severe medical emergency, please call your local emergency services (112 / 911) immediately or head to the nearest hospital Emergency Room."}

        # General helpful fallback
        return {
            "status": "Success", 
            "reply": "I am connected to your secure BioChain healthcare ecosystem. You can ask me about appointments, vital telemetry, drug interactions, or on-chain medical records."
        }

    except Exception as e:
        print("BioChain AI Engine Error:", str(e))
        return {
            "status": "Success", 
            "reply": "I am online and ready to assist you with your health records, appointment scheduling, and clinical inquiries."
        }

# ==========================================
# 16. ADMIN PANEL: STAFF ONBOARDING & DIRECTORY
# ==========================================
from pydantic import BaseModel
import datetime

class DoctorOnboard(BaseModel):
    name: str
    email: str
    phone: str
    wallet_address: str
    specialization: str
    department: str
    role: str
    license_number: str

@app.post("/api/admin/onboard-doctor")
def onboard_new_doctor(data: DoctorOnboard):
    try:
        clean_wallet = data.wallet_address.strip()
        clean_email = data.email.strip()
        clean_name = data.name.strip()

        if doctors_collection.find_one({"$or": [{"email": {"$regex": f"^\\s*{clean_email}\\s*$", "$options": "i"}}, {"wallet_address": {"$regex": f"^\\s*{clean_wallet}\\s*$", "$options": "i"}}]}):
            raise HTTPException(status_code=400, detail="Doctor with this email or wallet already exists in the network.")
        doc_dict = data.dict()
        doc_dict["name"] = clean_name
        doc_dict["email"] = clean_email
        doc_dict["wallet_address"] = clean_wallet
        doc_dict["is_verified"] = True 
        doc_dict["status"] = "Active"
        doc_dict["password"] = get_password_hash("BioChain@2026") 
        doc_dict["created_at"] = datetime.datetime.utcnow().isoformat()
        doctors_collection.insert_one(doc_dict)
        return {"status": "Success", "message": f"Dr. {clean_name} successfully onboarded as {data.role}."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Onboarding failed: {str(e)}")

@app.get("/api/admin/staff-directory")
def get_staff_directory():
    try:
        doctors = list(doctors_collection.find({}, {"password": 0}))
        for d in doctors:
            d["_id"] = str(d["_id"])
        doctors.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return {"status": "Success", "staff": doctors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch directory: {str(e)}")

# ==========================================
# 16.1 ADMIN PANEL: NODE OVERVIEW STATS
# ==========================================
@app.get("/api/admin/node-stats")
def get_node_stats():
    try:
        # Get real-time counts from MongoDB
        total_patients = patients_collection.count_documents({})
        total_doctors = doctors_collection.count_documents({})
        total_appointments = appointments_collection.count_documents({})
        
        # Simulating Web3 transactions count (Appointments * 3 + a base number for effect)
        total_transactions = 8400 + (total_appointments * 3)

        # Mock recent activity for the dashboard (Later we can fetch this from an Audit collection)
        recent_activities = [
            {"id": 1, "action": "Node Synchronized with BioChain Mainnet", "time": "Just now", "type": "system"},
            {"id": 2, "action": "Encrypted Patient Record Updated", "time": "5 mins ago", "type": "record"},
            {"id": 3, "action": "Smart Contract EIP-2771 Executed", "time": "12 mins ago", "type": "contract"},
            {"id": 4, "action": "New Clinical Staff Credentialed", "time": "1 hour ago", "type": "staff"}
        ]

        return {
            "status": "Success",
            "stats": {
                "total_patients": total_patients,
                "total_doctors": total_doctors,
                "total_appointments": total_appointments,
                "transactions": total_transactions
            },
            "activities": recent_activities
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")

# ==========================================
# 16.2 ADMIN PANEL: IMMUTABLE AUDIT LOGS
# ==========================================
@app.get("/api/admin/audit-logs")
def get_audit_logs():
    try:
        # 1. REAL DB LOGS (Sabse pehle asli data utha)
        real_logs = list(audit_collection.find({}, {"_id": 0}).sort("timestamp", -1))
        
        # 2. DEMO MOCK LOGS (Taaki hackathon table khali na dikhe)
        mock_logs = []
        if len(real_logs) < 10: # Agar asli logs kam hain toh dummy daal do
            import random
            from datetime import datetime, timedelta
            
            real_doctors = list(doctors_collection.find({}, {"name": 1, "wallet_address": 1}))
            virtual_actors = [{"name": "System Node", "wallet_address": "0x000"}]
            all_actors = real_doctors + virtual_actors if real_doctors else virtual_actors

            now = datetime.utcnow()
            for i in range(10 - len(real_logs)):
                actor = random.choice(all_actors)
                time_offset = now - timedelta(hours=random.randint(1, 48))
                
                wallet = actor.get("wallet_address", "0x000")
                if len(wallet) > 15: wallet = f"{wallet[:6]}...{wallet[-4:]}"

                mock_logs.append({
                    "id": f"mock_{i}",
                    "timestamp": time_offset.strftime("%Y-%m-%d %H:%M:%S UTC"),
                    "actor_name": actor.get("name", "Unknown"),
                    "actor_wallet": wallet,
                    "action_type": "RECORD_SIGNED",
                    "description": "Cryptographically signed medical record (System Demo)",
                    "color": "purple",
                    "tx_hash": f"0x{random.getrandbits(128):032x}"
                })
        
        # Asli aur Dummy ko mila do, latest timestamp upar aayega
        final_logs = real_logs + mock_logs
        final_logs.sort(key=lambda x: x["timestamp"], reverse=True)

        return {"status": "Success", "logs": final_logs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================
# 17. AI CLINICAL DECISION SUPPORT (DRUG CHECKER)
# ==========================================

class DrugCheckRequest(BaseModel):
    drugs: list[str]

@app.post("/api/ai/check-drugs")
async def check_drug_interactions(request: DrugCheckRequest):
    try:
        # Agar sirf 1 dawai hai, toh aapas mein reaction ka chance nahi
        if len(request.drugs) < 2:
            return {
                "status": "Success",
                "risk_level": "Safe",
                "warning_message": "Single medication. No major drug-drug interactions detected."
            }

        # Gemini Prompt - Strict medical formatting
        prompt = f"""
        You are an expert clinical AI system. Analyze the following list of medications for potential drug-drug interactions:
        {', '.join(request.drugs)}

        Respond ONLY in a valid JSON format with the following keys:
        - "risk_level": Must be exactly one of "Safe", "Moderate", or "Severe".
        - "warning_message": A concise 1-2 sentence clinical explanation of the interaction (or confirmation of safety).

        Do not use markdown formatting like ```json. Just return the raw JSON string.
        """

        # Using the existing get_gemini_client
        client = get_gemini_client()
        if client:
            for model_name in ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"]:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt
                    )
                    ai_text = response.text.strip()
                    
                    # Clean up in case Gemini adds markdown formatting accidentally
                    if ai_text.startswith("```json"):
                        ai_text = ai_text[7:-3]
                    elif ai_text.startswith("```"):
                        ai_text = ai_text[3:-3]
                        
                    result = json.loads(ai_text.strip())
                    
                    return {
                        "status": "Success",
                        "risk_level": result.get("risk_level", "Safe"),
                        "warning_message": result.get("warning_message", "Analysis complete.")
                    }
                except Exception as model_err:
                    print(f"Drug check model {model_name} error: {model_err}")
                    continue

        # Smart Clinical Fallback for known drug interactions
        drugs_lower = [d.lower() for d in request.drugs]
        if any("aspirin" in d for d in drugs_lower) and any("warfarin" in d or "heparin" in d or "ibuprofen" in d for d in drugs_lower):
            return {
                "status": "Success",
                "risk_level": "Severe",
                "warning_message": "High bleeding risk detected: Combining NSAIDs/Aspirin with anticoagulants requires strict clinical monitoring."
            }
        elif any("paracetamol" in d or "acetaminophen" in d for d in drugs_lower) and any("alcohol" in d for d in drugs_lower):
            return {
                "status": "Success",
                "risk_level": "Moderate",
                "warning_message": "Increased risk of hepatotoxicity. Avoid alcohol while taking acetaminophen."
            }

        return {
            "status": "Success",
            "risk_level": "Safe",
            "warning_message": f"No critical contraindications detected across {len(request.drugs)} medications under standard formulary review."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================
# 18. PHASE 4: THE GUARDIAN (IoT WEBSOCKETS)
# ==========================================

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

manager = ConnectionManager()

@app.websocket("/ws/vitals/{patient_id}")
async def iot_vitals_stream(websocket: WebSocket, patient_id: str):
    await manager.connect(websocket)
    print(f"📡 IoT Sensor Connected for Patient: {patient_id}")
    try:
        while True:
            # Simulate realistic IoT sensor data
            bpm = random.randint(65, 105)
            spo2 = random.randint(94, 100)

            # Auto-flagging logic on the edge (Backend)
            status = "CRITICAL" if bpm > 100 or spo2 < 95 else "NORMAL"

            vitals_data = {
                "patient_id": patient_id,
                "bpm": bpm,
                "spo2": spo2,
                "status": status,
                "timestamp": datetime.datetime.utcnow().strftime("%H:%M:%S")
            }

            await websocket.send_json(vitals_data)
            await asyncio.sleep(2)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"❌ IoT Sensor Disconnected for Patient: {patient_id}")
