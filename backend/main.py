from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from eth_account import Account
from eth_account.messages import encode_defunct
from pymongo import MongoClient
from passlib.context import CryptContext
import random

# IMPORT your existing blockchain functions
from app.models import PatientSignup
from app.blockchain import register_patient_on_chain, get_hospital_details, fetch_patient_data

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

# Password Hashing Logic
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# In-memory storage for pending OTPs (Temporary)
OTP_STORAGE = {}

# ==========================================
# 2. DATA MODELS
# ==========================================
class PatientLogin(BaseModel):
    email: str
    password: str

class DoctorLogin(BaseModel):
    wallet_address: str
    signature: str
    message: str 

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

        # 3. Save to MongoDB with the newly generated idHash and hashed password
        new_user = {
            "name": patient.name,
            "email": patient.email,
            "phone": patient.phone,
            "address": patient.address,
            "password": get_password_hash(patient.password), 
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
    email = payload.get("email")
    user_otp = payload.get("otp")
    
    if OTP_STORAGE.get(email) == user_otp:
        user = patients_collection.find_one({"email": email})
        
        # Cleanup OTP
        del OTP_STORAGE[email]
        
        return {
            "status": "Success", 
            "role": "PATIENT", 
            "name": user.get("name"), 
            "idHash": user.get("idHash"),
            "profile": {
                "phone": user.get("phone"),
                "address": user.get("address")
            }
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

    return {"status": "Success", "role": "DOCTOR", "name": doctor.get('name')}