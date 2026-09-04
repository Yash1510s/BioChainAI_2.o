**SOURCE CODE DOCUMENT**

|                    |                                                                    |
|--------------------|--------------------------------------------------------------------|
| **Title:**         | Smart Blockchain and AI-based Healthcare System                    |
| **Class of work:** | Software                                                           |
| **Authors:**       | Yash Vijay Singh, Adonis Jeswin, Nimish Arekar, Romit Singh        |
| **Organization:**  | Xavier Institute of Engineering, Mahim, Mumbai, Maharashtra, India |

# Table of Contents

# Project Folder Structure

The "Smart Blockchain and AI-Based Healthcare System" project root consists of the following directories and files:

## 1. "backend" Folder:

- Contains the FastAPI (Python) server that acts as the RESTful API backend for the application.

- The main application logic resides in main.py (1006 lines), handling all API endpoints, authentication, WebSocket streaming, and database operations.

- Subfolder "app" contains the blockchain integration module (blockchain.py), Pinata IPFS upload utility (pinata.py), data models (models.py), and the smart contract ABI (biochain_abi.json).

- Contains requirements.txt for Python dependency management and .env.example for environment variable configuration.

- Contains development/debugging/testing scripts: seed.py (database seeding), test_connect.py (connection testing), view_db.py (database viewer), check_db.py (data export), reset_pwd.py (password reset), simulator.py (IoT simulator), and various migration utilities.

## 2. "frontend" Folder:

- Contains the React 19 + Vite 7 frontend application.

- Subfolder "src" contains all React components (JSX), styling (CSS), and configuration files.

- Core files: App.jsx (548 lines — Login Gate and application router), Dashboard.jsx (849 lines — role-based dashboard), Register.jsx (patient registration), PatientList.jsx (patient listing).

- Subfolder "src/components" holds all 15 modular UI components:

- LiveVitals.jsx — Real-time ECG waveform and vital sign monitoring

- PatientAppointments.jsx — Patient appointment booking interface

- DoctorAppointments.jsx — Doctor's scheduling hub

- CareTeam.jsx — Patient-controlled access management

- DrugInteractionChecker.jsx — AI-powered drug interaction analysis

- AIAssistantWidget.jsx — Floating Gemini AI chatbot

- MyRecords.jsx — Medical records viewer

- UploadData.jsx — IPFS document upload

- MyProfile.jsx — Profile editor

- PatientsDirectory.jsx — Doctor's patient directory

- IssueRecordModal.jsx — Record issuance dialog

- ProfileUpload.jsx — Profile photo upload

- NodeOverview.jsx — Enterprise system metrics

- StaffDirectory.jsx — Staff management and onboarding

- AuditLogs.jsx — Immutable audit trail viewer

## 3. "blockchain" Folder:

- Subfolder "contracts" contains the Solidity smart contract BioChaincontract.sol (308 lines).

- Subfolder "scripts" contains the deployment script deploy.js.

- Contains hardhat.config.js for Hardhat network configuration and package.json for Node.js dependencies.

## 4. "start_biochain.ps1" file:

- Custom PowerShell automation script that orchestrates the concurrent startup of all four system services (Hardhat node, contract deployment, FastAPI backend, Vite frontend), providing a one-click launch mechanism.

# Functions / Modules Used in the Application

## Backend (FastAPI — main.py)

- create_audit_log(actor_name, actor_wallet, action_type, description, color)

- get_password_hash(password)

- verify_password(plain_password, hashed_password)

- register_patient(patient: PatientSignup)

- login_patient_step1(data: PatientLogin)

- login_patient_verify(payload: dict)

- forgot_password_send_otp(data: dict)

- forgot_password_verify_otp(data: dict)

- login_doctor(data: DoctorLogin)

- login_admin(data: AdminLogin)

- issue_medical_record(record: MedicalRecord)

- upload_to_ipfs(files: List\[UploadFile\])

- get_care_team(patient_email: str)

- toggle_doctor_access(data: AccessToggle)

- ai_assistant_chat(request: ChatRequest)

- check_drug_interactions(request: DrugCheckRequest)

- iot_vitals_stream(websocket: WebSocket, patient_id: str)

- get_patients_list()

- get_doctors_list()

- create_appointment(data: dict)

- get_patient_appointments(email: str)

- get_doctor_appointments(wallet: str)

- approve_appointment(data: dict)

- get_patient_records(patient_id: str)

- update_profile(data: dict)

- update_profile_photo(data: dict)

- get_audit_logs()

- get_node_overview()

- register_doctor(data: dict)

## Backend (blockchain.py)

- generate_identity_hash(email: str)

- register_patient_on_chain(data)

- get_hospital_details()

- fetch_patient_data()

- upload_file_to_ipfs(file_bytes, filename) (pinata.py)

## Smart Contract (BioChainNetwork.sol)

- registerHospital(\_adminWallet, \_name, \_regNumber)

- addDoctor(\_wallet, \_name, \_license, \_spec)

- registerPatient(\_pWallet, \_name, \_idHash, \_blood, \_allergies, \_emergency, \_pHash)

- triggerSOS(\_severity) / resolveSOS()

- addMedicalRecord(\_pWallet, \_hash, \_type, \_cat, \_notes)

- grantAccess(\_doctor) / revokeAccess(\_doctor)

- referPatient(\_pWallet, \_targetDoc, \_reason)

- issuePrescription(\_patient, \_diagnosis, \_ipfsHash)

- getProfile / getPatientRecords / getRecord / getPrescriptions / getReferrals / getHospitalStaff

## Frontend React Components

- LoginGate (App.jsx)

- App (App.jsx)

- Register (Register.jsx)

- Dashboard (Dashboard.jsx)

- LiveVitals (LiveVitals.jsx)

- PatientAppointments (PatientAppointments.jsx)

- DoctorAppointments (DoctorAppointments.jsx)

- CareTeam (CareTeam.jsx)

- DrugInteractionChecker (DrugInteractionChecker.jsx)

- AIAssistantWidget (AIAssistantWidget.jsx)

- MyRecords (MyRecords.jsx)

- UploadData (UploadData.jsx)

- MyProfile (MyProfile.jsx)

- PatientsDirectory (PatientsDirectory.jsx)

- IssueRecordModal (IssueRecordModal.jsx)

- ProfileUpload (ProfileUpload.jsx)

- NodeOverview (NodeOverview.jsx)

- StaffDirectory (StaffDirectory.jsx)

- AuditLogs (AuditLogs.jsx)

## Development & Testing Scripts

- seed.py — Enterprise database seeding script that populates MongoDB with initial hospital, doctor, and patient records for development.

- test_connect.py — Database connection testing and alternative seeding script for local MongoDB instances.

- view_db.py — Database inspection utility that displays all patients, doctors, and hospitals in the database.

- check_db.py — Appointment data export utility that dumps appointment records to JSON.

- reset_pwd.py — Password reset utility for resetting patient passwords during development.

- simulator.py — IoT vitals WebSocket simulator that connects to the backend and displays real-time vital sign data streams.

- update_names.py — Doctor name migration script for updating display names across collections.

- update_records.py — Medical record migration script for fixing missing doctor names in records.

- migrate_records.py — Patient record migration script for transferring records between patient accounts.

- print_records.py — Simple record printing utility for debugging purposes.

- tmp_update_patient.py — Temporary patient field update script for development testing.

# API Keys and Configuration Guide

Important Note: For security purposes, all API keys, private keys, and sensitive credentials have been replaced with placeholder values in this document. To run the application, you must obtain your own keys and configure them in the .env file in the backend directory.

Note: For security purposes, all API keys, private keys, and sensitive credentials in the code listings below have been replaced with placeholder values. Obtain your own keys from MongoDB Atlas, Pinata IPFS, and Google Gemini AI, and configure a local Hardhat blockchain node and MetaMask wallet as described in the project README.

# GitHub Repository Access Note

The complete, unabridged, verbatim source code for all 54 files of the BioChainAI 2.0 ecosystem is documented in its entirety across the sections below. Every line of code from every module, component, smart contract, and script is included directly in this registration document without abbreviation. Additionally, for interactive code browsing, version control history, commit auditing, and cloning, the official live project repository is publicly accessible on GitHub at: https://github.com/Yash1510s/BioChainAI_2.o

# Source Code — Complete and Unabridged

The following sections contain the complete, unabridged source code of the entire application. All code files are presented in their entirety without truncation.

**Code Files are in the following order:**

1.  backend/main.py

2.  backend/app/blockchain.py

3.  backend/app/pinata.py

4.  backend/app/models.py

5.  backend/app/\_\_init\_\_.py

6.  backend/seed.py

7.  backend/requirements.txt

8.  backend/.env.example

9.  backend/test_connect.py

10. backend/view_db.py

11. backend/check_db.py

12. backend/reset_pwd.py

13. backend/simulator.py

14. backend/update_names.py

15. backend/update_records.py

16. backend/migrate_records.py

17. backend/print_records.py

18. backend/tmp_update_patient.py

19. blockchain/contracts/BioChaincontract.sol

20. blockchain/scripts/deploy.js

21. blockchain/hardhat.config.js

22. blockchain/package.json

23. frontend/src/main.jsx

24. frontend/src/config.js

25. frontend/src/App.jsx

26. frontend/src/Register.jsx

27. frontend/src/Dashboard.jsx

28. frontend/src/PatientList.jsx

29. frontend/src/index.css

30. frontend/src/App.css

31. frontend/src/BioChain.json

32. frontend/src/components/LiveVitals.jsx

33. frontend/src/components/PatientAppointments.jsx

34. frontend/src/components/DoctorAppointments.jsx

35. frontend/src/components/CareTeam.jsx

36. frontend/src/components/DrugInteractionChecker.jsx

37. frontend/src/components/AIAssistantWidget.jsx

38. frontend/src/components/MyRecords.jsx

39. frontend/src/components/UploadData.jsx

40. frontend/src/components/MyProfile.jsx

41. frontend/src/components/PatientsDirectory.jsx

42. frontend/src/components/IssueRecordModal.jsx

43. frontend/src/components/ProfileUpload.jsx

44. frontend/src/components/NodeOverview.jsx

45. frontend/src/components/StaffDirectory.jsx

46. frontend/src/components/AuditLogs.jsx

47. frontend/index.html

48. frontend/vite.config.js

49. frontend/tailwind.config.js

50. frontend/postcss.config.js

51. frontend/eslint.config.js

52. frontend/package.json

53. start_biochain.ps1

54. backend/app/biochain_abi.json

## 1. backend/main.py

from fastapi import FastAPI, HTTPException, Body, File, UploadFile, WebSocket, WebSocketDisconnect

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

\# Load environment variables from .env

load_dotenv()

import datetime

\# IMPORT your existing blockchain functions

\# Note: Removed 'from app.models import PatientSignup' because we are defining the enterprise models below

from app.blockchain import register_patient_on_chain, get_hospital_details, fetch_patient_data

from app.pinata import upload_file_to_ipfs

app = FastAPI()

\# Standard CORS for React communication

app.add_middleware(

CORSMiddleware,

allow_origins=\["\*"\],

allow_credentials=True,

allow_methods=\["\*"\],

allow_headers=\["\*"\],

)

\# ==========================================

\# 1. DATABASE CONNECTION

\# ==========================================

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/biochain_db")

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

db = client\["biochain_db"\]

patients_collection = db.patients

doctors_collection = db.doctors

hospitals_collection = db.hospitals \# \<-- NEW: Added Hospitals Collection

records_collection = db\["medical_records"\]

appointments_collection = db.appointments

permissions_collection = db.permissions \# Care Team Access Control

audit_collection = db\["audit_logs"\] \# \<-- NEW: Audit Logs

\# Helper function jo har important action ke baad call hoga

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

"tx_hash": f"0x{random.getrandbits(128):032x}" \# Mocking Web3 Hash for MVP

}

audit_collection.insert_one(log_entry)

\# Password Hashing Logic

pwd_context = CryptContext(schemes=\["pbkdf2_sha256"\], deprecated="auto")

def get_password_hash(password):

return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):

try:

return pwd_context.verify(plain_password, hashed_password)

except Exception:

\# Fallback: old accounts may have plain-text passwords stored

\# This handles the UnknownHashError for legacy/test users

return plain_password == hashed_password

\# In-memory storage for pending OTPs (Temporary)

OTP_STORAGE = {}

\# ==========================================

\# 2. ENTERPRISE DATA MODELS

\# ==========================================

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

hospital_admin_wallet: str \# Links doc to a specific hospital admin

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

idHash: Optional\[str\] = None

\# Login Models

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

name: Optional\[str\] = None

email: Optional\[str\] = None

phone: Optional\[str\] = None

address: Optional\[str\] = None

bloodGroup: Optional\[str\] = None

allergies: Optional\[str\] = None

emergencyContact: Optional\[str\] = None

profile_photo_hash: Optional\[str\] = None \# Pinata IPFS Hash

class DoctorUpdate(BaseModel):

name: Optional\[str\] = None

email: Optional\[str\] = None

phone: Optional\[str\] = None

address: Optional\[str\] = None

specialization: Optional\[str\] = None

profile_photo_hash: Optional\[str\] = None \# Pinata IPFS Hash

certificate_hash: Optional\[str\] = None \# Medical Degree PDF Hash

\# ==========================================

\# 3. EXISTING CLINICAL ENDPOINTS

\# ==========================================

@app.get("/")

def read_root():

name = get_hospital_details()

return {"message": f"Welcome to {name} API"}

@app.post("/register")

def register_patient(patient: PatientSignup):

print(f"\[doc\] New Registration: {patient.name}")

\# 1. Check if email already exists

if patients_collection.find_one({"email": patient.email}):

raise HTTPException(status_code=400, detail="Email already registered")

\# 2. Trigger Blockchain Smart Contract

try:

\# This calls your register_patient_on_chain function

blockchain_result = register_patient_on_chain(patient)

if blockchain_result.get("status") == "Error":

raise HTTPException(status_code=500, detail=f"Blockchain Registration Failed: {blockchain_result.get('message')}")

\# 3. Save to MongoDB with the newly generated idHash, hashed password, and clinical defaults

new_user = {

"name": patient.name,

"email": patient.email,

"phone": patient.phone,

"address": patient.address,

"password": get_password_hash(patient.password),

"bloodGroup": patient.bloodGroup, \# \<-- NEW

"allergies": patient.allergies, \# \<-- NEW

"emergencyContact": patient.emergencyContact, \# \<-- NEW

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

\# ==========================================

\# 4. STEP 1: PASSWORD AUTH + OTP GENERATION

\# ==========================================

@app.post("/login/patient/step1")

def login_patient_step1(data: PatientLogin):

print(f"\[key\] Stage 1 Auth: {data.email}")

\# Search MongoDB

user = patients_collection.find_one({"email": data.email})

if not user or not verify_password(data.password, user.get("password")):

raise HTTPException(status_code=401, detail="Invalid email or password")

\# Generate 6-digit OTP

otp_code = str(random.randint(100000, 999999))

OTP_STORAGE\[data.email\] = otp_code

\# SIMULATION: Printing OTP to terminal as an "SMS"

print("\n" + "="\*40)

print(f"\[ph\] SMS SENT TO: {user.get('phone')}")

print(f"\[key\] YOUR BIOCHAIN OTP IS: {otp_code}")

print("="\*40 + "\n")

return {

"status": "OTP_SENT",

"message": f"Code sent to your registered number ending in {user.get('phone')\[-4:\]}"

}

\# ==========================================

\# 5. STEP 2: OTP VERIFICATION

\# ==========================================

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

\# Cleanup OTP in a type-safe way

OTP_STORAGE.pop(email, None)

user.pop("\_id", None)

user.pop("password", None)

return {

"status": "Success",

"role": "PATIENT",

\*\*user

}

raise HTTPException(status_code=401, detail="Incorrect OTP. Access Denied.")

\# ==========================================

\# 5.5. FORGOT / RESET PASSWORD (OTP BASED)

\# ==========================================

class PasswordResetRequest(BaseModel):

email: str

class PasswordResetVerify(BaseModel):

email: str

otp: str

new_password: str

@app.post("/login/patient/forgot-password/request")

def request_password_reset(data: PasswordResetRequest):

print(f"\[lock\] Password Reset Request for: {data.email}")

user = patients_collection.find_one({"email": data.email})

if not user:

raise HTTPException(status_code=404, detail="Email not registered in BioChain.")

otp_code = str(random.randint(100000, 999999))

OTP_STORAGE\[data.email\] = otp_code

print("\n" + "="\*40)

print(f"\[lock\] PASSWORD RESET SMS TO: {user.get('phone')}")

print(f"\[key\] BIOCHAIN RESET OTP: {otp_code}")

print("="\*40 + "\n")

return {

"status": "OTP_SENT",

"message": f"Reset code sent to number ending in {user.get('phone', '????')\[-4:\]}"

}

@app.post("/login/patient/forgot-password/verify")

def verify_password_reset(data: PasswordResetVerify):

stored_otp = OTP_STORAGE.get(data.email)

if not stored_otp or stored_otp != data.otp:

raise HTTPException(status_code=401, detail="Invalid or expired OTP.")

hashed_pw = get_password_hash(data.new_password)

result = patients_collection.update_one(

{"email": data.email},

{"\$set": {"password": hashed_pw}}

)

if result.modified_count == 0:

raise HTTPException(status_code=500, detail="Failed to update password.")

OTP_STORAGE.pop(data.email, None)

print(f"\[OK\] Password reset for: {data.email}")

return {"status": "Success", "message": "Password reset! You can now login."}

\# ==========================================

\# 6. DOCTOR WEB3 LOGIN (META-MASK)

\# ==========================================

@app.post("/login/doctor")

def login_doctor(data: DoctorLogin):

doctor = doctors_collection.find_one({"wallet_address": {"\$regex": f"^{data.wallet_address}\$", "\$options": "i"}})

if not doctor:

raise HTTPException(status_code=403, detail="Not an authorized Doctor.")

try:

message_hash = encode_defunct(text=data.message)

recovered_address = Account.recover_message(message_hash, signature=data.signature)

if recovered_address.lower() != data.wallet_address.lower():

raise HTTPException(status_code=401, detail="Signature Mismatch")

except Exception as e:

raise HTTPException(status_code=400, detail="Crypto Verification Failed")

doctor.pop("\_id", None)

doctor.pop("password", None)

\# Ensure a name is always returned

doctor_name = doctor.get("name")

if not doctor_name or "Demo Doctor" in doctor_name:

doctor_name = "Yash"

doctor\["name"\] = doctor_name

return {"status": "Success", "role": "DOCTOR", \*\*doctor}

\# ==========================================

\# 6.5. HOSPITAL ADMIN WEB3 LOGIN (META-MASK)

\# ==========================================

@app.post("/login/admin")

def login_admin(data: AdminLogin):

\# MongoDB ki hospitals collection mein admin_wallet search karo

hospital = hospitals_collection.find_one({"admin_wallet": {"\$regex": f"^{data.wallet_address}\$", "\$options": "i"}})

if not hospital:

raise HTTPException(status_code=403, detail="Not an authorized Hospital Admin.")

try:

\# Cryptographic Signature Verification

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

\# ==========================================

\# 10. ISSUE NEW MEDICAL RECORD (WEB3) -- COMING SOON

\# ==========================================

class MedicalRecord(BaseModel):

patient_id: str

doctor_wallet: str

doctor_name: str = "Unknown Doctor"

hospital_name: str

title: str

diagnosis: str

ipfs_hashes: list\[str\] = \[\] \# Changed from single string to an array

@app.post("/record/issue")

def issue_medical_record(record: MedicalRecord):

import datetime

try:

record_dict = record.dict()

record_dict\["timestamp"\] = datetime.datetime.utcnow().isoformat()

record_dict\["isSelfUploaded"\] = ("Self-Uploaded" in record.doctor_wallet)

records_collection.insert_one(record_dict)

return {"status": "Success", "message": "Record securely added."}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/record/patient/{patient_id}")

def get_patient_records(patient_id: str):

try:

\# Search for records where patient_id matches

records = list(records_collection.find({"patient_id": patient_id}))

\# Convert ObjectId to string for JSON serialization

for r in records:

r\["\_id"\] = str(r\["\_id"\])

\# Sort by timestamp descending (newest first)

records.sort(key=lambda x: x.get("timestamp", ""), reverse=True)

return {"status": "Success", "records": records}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

\# ==========================================

\# 7. PROFILE UPDATE ENDPOINTS

\# ==========================================

@app.get("/api/patient/{email}")

def get_patient_profile(email: str):

patient = patients_collection.find_one({"email": email})

if not patient:

raise HTTPException(status_code=404, detail="Patient not found")

patient\["\_id"\] = str(patient\["\_id"\])

if "password" in patient:

del patient\["password"\]

return {"status": "Success", "patient": patient}

@app.put("/update/patient/{email}")

def update_patient_profile(email: str, update_data: PatientUpdate):

\# Remove fields that are None (matlab jo user ne update nahi kiye)

update_dict = {k: v for k, v in update_data.dict().items() if v is not None}

if not update_dict:

raise HTTPException(status_code=400, detail="Koi naya data nahi bheja update karne ke liye.")

\# MongoDB update query

result = patients_collection.update_one(

{"email": email},

{"\$set": update_dict}

)

if result.matched_count == 0:

raise HTTPException(status_code=404, detail="Patient nahi mila.")

return {"status": "Success", "message": "Patient profile updated successfully", "updated_fields": list(update_dict.keys())}

@app.put("/update/doctor/{wallet_address}")

def update_doctor_profile(wallet_address: str, update_data: DoctorUpdate):

update_dict = {k: v for k, v in update_data.dict().items() if v is not None}

if not update_dict:

raise HTTPException(status_code=400, detail="Koi naya data nahi bheja update karne ke liye.")

\# Wallet address case-insensitive search ke liye regex use karte hain

result = doctors_collection.update_one(

{"wallet_address": {"\$regex": f"^{wallet_address}\$", "\$options": "i"}},

{"\$set": update_dict}

)

if result.matched_count == 0:

raise HTTPException(status_code=404, detail="Doctor nahi mila.")

return {"status": "Success", "message": "Doctor profile updated successfully", "updated_fields": list(update_dict.keys())}

\# ==========================================

\# 11. UPLOAD FILE TO PINATA IPFS (MULTI-FILE)

\# ==========================================

@app.post("/upload/ipfs")

async def upload_to_ipfs(files: List\[UploadFile\] = File(...)):

PINATA_API_KEY = os.getenv("PINATA_API_KEY")

PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

if not PINATA_API_KEY or not PINATA_SECRET_API_KEY:

return {"status": "Error", "detail": "Pinata API Keys missing in .env"}

url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

headers = {

"pinata_api_key": PINATA_API_KEY,

"pinata_secret_api_key": PINATA_SECRET_API_KEY

}

uploaded_hashes = \[\]

try:

for file in files:

\# Read the file data

file_content = await file.read()

\# Prepare file for Pinata

pinata_files = {

"file": (file.filename, file_content, file.content_type)

}

\# Send to Pinata

response = requests.post(url, files=pinata_files, headers=headers)

if response.status_code == 200:

ipfs_hash = response.json()\["IpfsHash"\]

uploaded_hashes.append(ipfs_hash)

else:

return {"status": "Error", "detail": f"Failed to upload {file.filename}: {response.text}"}

return {"status": "Success", "ipfs_hashes": uploaded_hashes}

except Exception as e:

return {"status": "Error", "detail": str(e)}

\# ==========================================

\# 12. PATIENT DIRECTORY (CRM FOR DOCTORS)

\# ==========================================

@app.get("/api/patients")

def get_all_patients():

try:

\# Fetch all patients, hide \_id and password

patients = list(patients_collection.find({}, {"\_id": 0, "password": 0}))

\# Reverse the list so newest signups appear first

patients.reverse()

return {"status": "Success", "patients": patients}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

\# ==========================================

\# 13. APPOINTMENT ENGINE (V2: REQUEST BASED)

\# ==========================================

from pydantic import BaseModel

import datetime

\# Patient ab date/time nahi bhejega

class AppointmentCreate(BaseModel):

patient_email: str

patient_name: str

doctor_wallet: str

doctor_name: str

hospital_name: str

reason: str

\# Doctor approve karte waqt date/time set karega

class AppointmentApprove(BaseModel):

appointment_date: str

appointment_time: str

@app.post("/appointments/book")

def book_appointment(appointment: AppointmentCreate):

try:

app_dict = appointment.dict()

app_dict\["status"\] = "Pending" \# Status ab Pending se start hoga

app_dict\["created_at"\] = datetime.datetime.utcnow().isoformat()

appointments_collection.insert_one(app_dict)

return {"status": "Success", "message": "Appointment request sent to doctor!"}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Failed to request appointment: {str(e)}")

\# NAYA ROUTE: Doctor Approve Karega

@app.put("/appointments/approve/{app_id}")

def approve_appointment(app_id: str, details: AppointmentApprove):

try:

result = appointments_collection.update_one(

{"\_id": ObjectId(app_id)},

{"\$set": {

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

r\["\_id"\] = str(r\["\_id"\]) \# Convert ObjectId to string

appointments.sort(key=lambda x: x.get("created_at", ""), reverse=True)

return {"status": "Success", "appointments": appointments}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Error fetching appointments: {str(e)}")

@app.get("/appointments/doctor/{wallet}")

def get_doctor_appointments(wallet: str):

try:

appointments = list(appointments_collection.find(

{"doctor_wallet": {"\$regex": f"^{wallet}\$", "\$options": "i"}}

))

for r in appointments:

r\["\_id"\] = str(r\["\_id"\])

appointments.sort(key=lambda x: x.get("created_at", ""), reverse=True)

return {"status": "Success", "appointments": appointments}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Error fetching appointments: {str(e)}")

@app.get("/api/doctors/active")

def get_active_doctors():

try:

doctors = list(doctors_collection.find({}, {"\_id": 0, "password": 0, "certificate_hash": 0}))

\# Attach Hospital Names

for doc in doctors:

hospital_wallet = doc.get("hospital_admin_wallet")

if hospital_wallet:

hospital = hospitals_collection.find_one({"admin_wallet": {"\$regex": f"^{hospital_wallet}\$", "\$options": "i"}})

if hospital:

doc\["hospital_name"\] = hospital.get("name", "Private")

else:

doc\["hospital_name"\] = "Private"

else:

doc\["hospital_name"\] = "Private"

return {"status": "Success", "doctors": doctors}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

\# ==========================================

\# 14. CARE TEAM & ACCESS CONTROL (DATA SOVEREIGNTY)

\# ==========================================

class AccessToggle(BaseModel):

patient_email: str

doctor_wallet: str

grant_access: bool \# True for Granted, False for Revoked

@app.get("/care-team/{patient_email}")

def get_care_team(patient_email: str):

try:

\# 1. Find all unique doctors this patient has booked appointments with

patient_appointments = list(appointments_collection.find({"patient_email": patient_email}))

unique_doctors = {}

for appt in patient_appointments:

wallet = appt.get("doctor_wallet")

if wallet and wallet not in unique_doctors:

\# Get doctor details from doctors_collection

doc_info = doctors_collection.find_one(

{"wallet_address": {"\$regex": f"^{wallet}\$", "\$options": "i"}},

{"\_id": 0, "password": 0}

)

if doc_info:

unique_doctors\[wallet\] = {

"wallet_address": wallet,

"name": doc_info.get("name", appt.get("doctor_name", "Dr. Unknown")),

"specialization": doc_info.get("specialization", "General Physician"),

"hospital": appt.get("hospital_name", doc_info.get("hospital_name", "BioChain Network")),

"access_granted": True \# Default: access is granted

}

\# 2. Check permissions_collection for any access overrides

for wallet in unique_doctors.keys():

perm = permissions_collection.find_one({"patient_email": patient_email, "doctor_wallet": wallet})

if perm:

unique_doctors\[wallet\]\["access_granted"\] = perm.get("access_granted", True)

return {"status": "Success", "care_team": list(unique_doctors.values())}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Failed to fetch Care Team: {str(e)}")

@app.put("/care-team/toggle-access")

def toggle_doctor_access(data: AccessToggle):

try:

\# Upsert the permission (Update if exists, Insert if not)

permissions_collection.update_one(

{"patient_email": data.patient_email, "doctor_wallet": data.doctor_wallet},

{"\$set": {

"patient_email": data.patient_email,

"doctor_wallet": data.doctor_wallet,

"access_granted": data.grant_access,

"updated_at": datetime.datetime.utcnow().isoformat()

}},

upsert=True

)

status_msg = "Access Granted \[OK\]" if data.grant_access else "Access Revoked \[!\]"

\# --- NEW: LOG THIS REAL ACTION TO AUDIT LEDGER ---

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

"""Used by doctor's patient directory to verify access before showing records."""

try:

perm = permissions_collection.find_one({"patient_email": patient_email, "doctor_wallet": doctor_wallet})

if perm:

return {"status": "Success", "access_granted": perm.get("access_granted", True)}

\# No entry = default access granted (they are in care team)

return {"status": "Success", "access_granted": True}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Failed to check access: {str(e)}")

\# ==========================================

\# 15. BIOCHAIN AI ASSISTANT (TRUE GEN-AI ENGINE)

\# ==========================================

from google import genai as google_genai

\# Get your free key from: https://aistudio.google.com/

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

gemini_client = google_genai.Client(api_key=GEMINI_API_KEY)

\# Using flash-latest dynamically bypasses region zero-quota limits on newly created free-tier keys

GEMINI_MODEL = "gemini-flash-latest"

class ChatRequest(BaseModel):

user_id: str \# email for patients, wallet for doctors

role: str

message: str

@app.post("/api/ai/chat")

def ai_assistant_chat(request: ChatRequest):

try:

context_prompt = ""

if request.role == "PATIENT":

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

elif "DOCTOR" in request.role:

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

else:

context_prompt = f'You are BioChain AI, a healthcare assistant. Answer helpfully and concisely. Message: "{request.message}"'

response = gemini_client.models.generate_content(

model=GEMINI_MODEL,

contents=context_prompt

)

return {"status": "Success", "reply": response.text}

except Exception as e:

print("Gemini AI Error:", str(e))

return {"status": "Success", "reply": "Network interference. My quantum processors are currently syncing with the blockchain."}

\# ==========================================

\# 16. ADMIN PANEL: STAFF ONBOARDING & DIRECTORY

\# ==========================================

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

if doctors_collection.find_one({"\$or": \[{"email": data.email}, {"wallet_address": data.wallet_address}\]}):

raise HTTPException(status_code=400, detail="Doctor with this email or wallet already exists in the network.")

doc_dict = data.dict()

doc_dict\["is_verified"\] = True

doc_dict\["status"\] = "Active"

doc_dict\["password"\] = get_password_hash("BioChain@2026")

doc_dict\["created_at"\] = datetime.datetime.utcnow().isoformat()

doctors_collection.insert_one(doc_dict)

return {"status": "Success", "message": f"Dr. {data.name} successfully onboarded as {data.role}."}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Onboarding failed: {str(e)}")

@app.get("/api/admin/staff-directory")

def get_staff_directory():

try:

doctors = list(doctors_collection.find({}, {"password": 0}))

for d in doctors:

d\["\_id"\] = str(d\["\_id"\])

doctors.sort(key=lambda x: x.get("created_at", ""), reverse=True)

return {"status": "Success", "staff": doctors}

except Exception as e:

raise HTTPException(status_code=500, detail=f"Failed to fetch directory: {str(e)}")

\# ==========================================

\# 16.1 ADMIN PANEL: NODE OVERVIEW STATS

\# ==========================================

@app.get("/api/admin/node-stats")

def get_node_stats():

try:

\# Get real-time counts from MongoDB

total_patients = patients_collection.count_documents({})

total_doctors = doctors_collection.count_documents({})

total_appointments = appointments_collection.count_documents({})

\# Simulating Web3 transactions count (Appointments \* 3 + a base number for effect)

total_transactions = 8400 + (total_appointments \* 3)

\# Mock recent activity for the dashboard (Later we can fetch this from an Audit collection)

recent_activities = \[

{"id": 1, "action": "Node Synchronized with BioChain Mainnet", "time": "Just now", "type": "system"},

{"id": 2, "action": "Encrypted Patient Record Updated", "time": "5 mins ago", "type": "record"},

{"id": 3, "action": "Smart Contract EIP-2771 Executed", "time": "12 mins ago", "type": "contract"},

{"id": 4, "action": "New Clinical Staff Credentialed", "time": "1 hour ago", "type": "staff"}

\]

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

\# ==========================================

\# 16.2 ADMIN PANEL: IMMUTABLE AUDIT LOGS

\# ==========================================

@app.get("/api/admin/audit-logs")

def get_audit_logs():

try:

\# 1. REAL DB LOGS (Sabse pehle asli data utha)

real_logs = list(audit_collection.find({}, {"\_id": 0}).sort("timestamp", -1))

\# 2. DEMO MOCK LOGS (Taaki hackathon table khali na dikhe)

mock_logs = \[\]

if len(real_logs) \< 10: \# Agar asli logs kam hain toh dummy daal do

import random

from datetime import datetime, timedelta

real_doctors = list(doctors_collection.find({}, {"name": 1, "wallet_address": 1}))

virtual_actors = \[{"name": "System Node", "wallet_address": "0x000"}\]

all_actors = real_doctors + virtual_actors if real_doctors else virtual_actors

now = datetime.utcnow()

for i in range(10 - len(real_logs)):

actor = random.choice(all_actors)

time_offset = now - timedelta(hours=random.randint(1, 48))

wallet = actor.get("wallet_address", "0x000")

if len(wallet) \> 15: wallet = f"{wallet\[:6\]}...{wallet\[-4:\]}"

mock_logs.append({

"id": f"mock\_{i}",

"timestamp": time_offset.strftime("%Y-%m-%d %H:%M:%S UTC"),

"actor_name": actor.get("name", "Unknown"),

"actor_wallet": wallet,

"action_type": "RECORD_SIGNED",

"description": "Cryptographically signed medical record (System Demo)",

"color": "purple",

"tx_hash": f"0x{random.getrandbits(128):032x}"

})

\# Asli aur Dummy ko mila do, latest timestamp upar aayega

final_logs = real_logs + mock_logs

final_logs.sort(key=lambda x: x\["timestamp"\], reverse=True)

return {"status": "Success", "logs": final_logs}

except Exception as e:

raise HTTPException(status_code=500, detail=str(e))

\# ==========================================

\# 17. AI CLINICAL DECISION SUPPORT (DRUG CHECKER)

\# ==========================================

class DrugCheckRequest(BaseModel):

drugs: list\[str\]

@app.post("/api/ai/check-drugs")

async def check_drug_interactions(request: DrugCheckRequest):

try:

\# Agar sirf 1 dawai hai, toh aapas mein reaction ka chance nahi

if len(request.drugs) \< 2:

return {

"status": "Success",

"risk_level": "Safe",

"warning_message": "Single medication. No major drug-drug interactions detected."

}

\# Gemini Prompt - Strict medical formatting

prompt = f"""

You are an expert clinical AI system. Analyze the following list of medications for potential drug-drug interactions:

{', '.join(request.drugs)}

Respond ONLY in a valid JSON format with the following keys:

\- "risk_level": Must be exactly one of "Safe", "Moderate", or "Severe".

\- "warning_message": A concise 1-2 sentence clinical explanation of the interaction (or confirmation of safety).

Do not use markdown formatting like \`\`\`json. Just return the raw JSON string.

"""

\# Using the existing gemini_client

response = gemini_client.models.generate_content(

model=GEMINI_MODEL,

contents=prompt

)

ai_text = response.text.strip()

\# Clean up in case Gemini adds markdown formatting accidentally

if ai_text.startswith("\`\`\`json"):

ai_text = ai_text\[7:-3\]

elif ai_text.startswith("\`\`\`"):

ai_text = ai_text\[3:-3\]

result = json.loads(ai_text.strip())

return {

"status": "Success",

"risk_level": result.get("risk_level", "Unknown"),

"warning_message": result.get("warning_message", "Analysis complete.")

}

except Exception as e:

print(f"AI Drug Check Error: {e}")

return {

"status": "Error",

"risk_level": "Unknown",

"warning_message": "Could not verify drug interactions at this moment. Please check manually."

}

\# ==========================================

\# 18. PHASE 4: THE GUARDIAN (IoT WEBSOCKETS)

\# ==========================================

class ConnectionManager:

def \_\_init\_\_(self):

self.active_connections: list\[WebSocket\] = \[\]

async def connect(self, websocket: WebSocket):

await websocket.accept()

self.active_connections.append(websocket)

def disconnect(self, websocket: WebSocket):

self.active_connections.remove(websocket)

manager = ConnectionManager()

@app.websocket("/ws/vitals/{patient_id}")

async def iot_vitals_stream(websocket: WebSocket, patient_id: str):

await manager.connect(websocket)

print(f"\[ant\] IoT Sensor Connected for Patient: {patient_id}")

try:

while True:

\# Simulate realistic IoT sensor data

bpm = random.randint(65, 105)

spo2 = random.randint(94, 100)

\# Auto-flagging logic on the edge (Backend)

status = "CRITICAL" if bpm \> 100 or spo2 \< 95 else "NORMAL"

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

print(f"\[X\] IoT Sensor Disconnected for Patient: {patient_id}")

## 2. backend/app/blockchain.py

import json

import os

import hashlib

from web3 import Web3

from eth_account import Account

from dotenv import load_dotenv

\# 1. Setup Connection

\# Load .env from the backend root directory

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(\_\_file\_\_))), '.env')

load_dotenv(dotenv_path=env_path)

w3 = Web3(Web3.HTTPProvider(os.getenv("BLOCKCHAIN_URL")))

account_address = os.getenv("ACCOUNT_ADDRESS")

private_key = os.getenv("PRIVATE_KEY")

contract_address = os.getenv("CONTRACT_ADDRESS")

\# Safety Check (Defaults to Hardhat Account \#0)

if not account_address or not private_key:

account_address = account_address or "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

private_key = private_key or "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

\# 2. Load ABI

try:

with open(os.path.join(os.path.dirname(\_\_file\_\_), "biochain_abi.json"), "r") as f:

data = json.load(f)

abi = data\["abi"\] if isinstance(data, dict) and "abi" in data else data

contract = w3.eth.contract(address=contract_address, abi=abi)

except Exception as e:

print(f"Error loading ABI: {e}")

def generate_identity_hash(email: str):

return hashlib.sha256(email.encode()).hexdigest()

def get_hospital_details():

try:

return contract.functions.hospitals(account_address).call()\[1\]

except Exception:

return "BioChainAI Enterprise"

def register_patient_on_chain(data):

try:

identity_hash = generate_identity_hash(data.email)

\# \[\*\] WEB 2.5 MAGIC: Generate a unique Ethereum wallet based on the patient's email hash!

\# This ensures every patient gets a unique blockchain identity without needing MetaMask.

patient_wallet = Account.from_key("0x" + identity_hash).address

\# 1. Build Transaction

\# Super Admin (account_address) is acting as the Relayer, paying the gas fee.

tx = contract.functions.registerPatient(

patient_wallet, \# Unique Patient Wallet

data.name or "Unknown",

identity_hash,

data.bloodGroup or "O+", \# Fixed variable name

data.allergies or "None",

data.emergencyContact or "N/A", \# Fixed variable name

"QmPlaceholderHash"

).build_transaction({

'chainId': 31337,

'gas': 2000000,

'gasPrice': w3.to_wei('50', 'gwei'),

'nonce': w3.eth.get_transaction_count(account_address),

})

\# 2. Sign Transaction (Admin signs it to pay gas)

signed_tx = w3.eth.account.sign_transaction(tx, private_key)

\# 3. Send Transaction

tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

\# 4. Wait for Block

receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

return {

"status": "Success",

"tx_hash": w3.to_hex(tx_hash),

"block": receipt.blockNumber,

"idHash": identity_hash

}

except Exception as e:

error_msg = str(e)

if "Registered" in error_msg:

print("\[i\] Note: Patient already registered on Blockchain. Proceeding with Database registration.")

return {

"status": "Success",

"message": "Already registered on chain",

"idHash": identity_hash

}

print(f"Blockchain Error: {error_msg}")

return {"status": "Error", "message": error_msg}

def fetch_patient_data():

"""

Temporary Dashboard Fetcher

"""

try:

patient_basic = contract.functions.patients(account_address).call()

profile = contract.functions.getProfile(account_address).call()

return {

"status": "Success",

"name": patient_basic\[0\],

"email_hash": patient_basic\[1\],

"blood_type": profile\[0\],

"allergies": profile\[1\],

"emergency_contact": profile\[2\],

"timestamp": profile\[4\]

}

except Exception as e:

return {"status": "Error", "message": str(e)}

## 3. backend/app/pinata.py

import os

import requests

from dotenv import load_dotenv

\# Load env variables (Yeh automatically tumhari backend folder wali .env ko dhund lega)

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(\_\_file\_\_))), '.env')

load_dotenv(dotenv_path=env_path)

PINATA_API_KEY = os.getenv("PINATA_API_KEY")

PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

def upload_file_to_ipfs(file_bytes: bytes, filename: str):

"""

Takes file bytes and uploads them securely to Pinata IPFS.

Returns the IPFS Hash (CID).

"""

url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

headers = {

"pinata_api_key": PINATA_API_KEY,

"pinata_secret_api_key": PINATA_SECRET_API_KEY

}

files = {

'file': (filename, file_bytes)

}

try:

response = requests.post(url, files=files, headers=headers)

if response.status_code == 200:

ipfs_hash = response.json()\["IpfsHash"\]

print(f"\[pkg\] Successfully pinned to IPFS: {ipfs_hash}")

return {"status": "Success", "ipfs_hash": ipfs_hash}

else:

print(f"\[X\] Pinata Error: {response.text}")

return {"status": "Error", "message": response.text}

except Exception as e:

return {"status": "Error", "message": str(e)}

## 4. backend/app/models.py

from pydantic import BaseModel

class PatientSignup(BaseModel):

name: str

email: str

phone: str

address: str

password: str

blood_type: str = "O+"

allergies: str = "None"

emergency_contact: str = "N/A"

## 5. backend/app/__init__.py

*(This file is empty.)*

## 6. backend/seed.py

from pymongo import MongoClient

from passlib.context import CryptContext

from dotenv import load_dotenv

import os

\# Load environment variables from .env

load_dotenv()

\# Connect to MongoDB Atlas

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/biochain_db")

client = MongoClient(MONGO_URI)

db = client\["biochain_db"\]

\# Password Hashing Logic

pwd_context = CryptContext(schemes=\["pbkdf2_sha256"\], deprecated="auto")

def get_password_hash(password):

return pwd_context.hash(password)

def seed_database():

print("\[seed\] Clearing old database records for Enterprise Upgrade...")

db.hospitals.delete_many({})

db.doctors.delete_many({})

db.patients.delete_many({})

\# ==========================================

\# 1. CREATE A HOSPITAL (The Organization)

\# ==========================================

hospital_admin_wallet = "0xe4b363aBE49C8580010dEEdDF888362c556DBfbc" \# Placeholder Admin

hospital = {

"admin_wallet": hospital_admin_wallet,

"name": "Apollo Spectra",

"registration_number": "REG-2026-MUM",

"is_active": True

}

db.hospitals.insert_one(hospital)

print(f"\[hosp\] Hospital Created: {hospital\['name'\]}")

\# ==========================================

\# 2. HIRE A DOCTOR (Linked to Apollo)

\# ==========================================

\# This is YOUR actual MetaMask wallet from your old seed!

doctor_wallet = "0x94072243e3344AE3d80509F6Db2e0cb212AdEe79"

doctor = {

"wallet_address": doctor_wallet,

"name": "Dr. Yash",

"email": "dr.yash@biochain.ai",

"phone": "+91 98765 43210",

"address": "Apollo Spectra Hospitals, Mumbai, Maharashtra",

"license_id": "MD-84758",

"specialization": "Cardiology",

"hospital_admin_wallet": hospital_admin_wallet, \# Links Dr. Adonis to Apollo

"role": "SR_DOCTOR",

"is_active": True

}

db.doctors.insert_one(doctor)

print(f"\[doc\] Doctor Hired: {doctor\['name'\]} (Assigned to {hospital\['name'\]})")

\# ==========================================

\# 3. REGISTER A PATIENT (Web 2.5 Auth)

\# ==========================================

patient = {

"name": "Yash Singh",

"email": "yash@biochain.ai",

"phone": "+919876543210",

"address": "Mumbai, Maharashtra",

"password": get_password_hash("securepassword123"),

\# --- NEW ENTERPRISE CLINICAL FIELDS ---

"bloodGroup": "O+",

"allergies": "None",

"emergencyContact": "+919999999999",

"idHash": "0xabc123456789...YashIdentity"

}

db.patients.insert_one(patient)

print(f"\[usr\] Patient Registered: {patient\['name'\]} (Enterprise Profile Set)")

print("\n\[OK\] Enterprise Database Seeding Complete!")

if \_\_name\_\_ == "\_\_main\_\_":

seed_database()

## 7. backend/requirements.txt

fastapi

uvicorn\[standard\]

web3

python-dotenv

pydantic

httpx

pymongo

passlib\[bcrypt\]

bcrypt

certifi

eth-account

requests

google-genai

python-multipart

## 8. backend/.env.example

\# --- BLOCKCHAIN CONNECTION ---

BLOCKCHAIN_URL="http://127.0.0.1:8545"

CONTRACT_ADDRESS="YOUR_DEPLOYED_CONTRACT_ADDRESS"

\# --- SUPER ADMIN WALLET (Hardhat Account \#0) ---

ACCOUNT_ADDRESS="YOUR_HARDHAT_ACCOUNT_0_ADDRESS"

PRIVATE_KEY="YOUR_HARDHAT_ACCOUNT_0_PRIVATE_KEY"

\# --- PINATA IPFS KEYS (For Decentralized File Storage) ---

PINATA_API_KEY="YOUR_PINATA_API_KEY"

PINATA_SECRET_API_KEY="YOUR_PINATA_SECRET_API_KEY"

\# --- MONGODB ATLAS ---

MONGO_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/biochain_db?retryWrites=true&w=majority"

\# --- GOOGLE GEMINI AI ---

GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

## 9. backend/test_connect.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

from passlib.context import CryptContext

\# Database Connection

client = MongoClient("mongodb://localhost:27017")

db = client.biochain_db

\# Password Hasher for the Patient

pwd_context = CryptContext(schemes=\["pbkdf2_sha256"\], deprecated="auto")

def get_password_hash(password):

return pwd_context.hash(password)

def seed_database():

print("\[seed\] Clearing old database records...")

db.hospitals.delete_many({})

db.doctors.delete_many({})

db.patients.delete_many({})

\# ==========================================

\# 1. CREATE A HOSPITAL (The Organization)

\# ==========================================

hospital_admin_wallet = "0xAdminWalletAddressHere1234567890" \# Placeholder Admin Wallet

hospital = {

"admin_wallet": hospital_admin_wallet,

"name": "Apollo Spectra",

"registration_number": "REG-2026-MUM",

"is_active": True

}

db.hospitals.insert_one(hospital)

print(f"\[hosp\] Hospital Created: {hospital\['name'\]}")

\# ==========================================

\# 2. HIRE A DOCTOR (Linked to the Hospital)

\# ==========================================

\# \[!\] IMPORTANT: Replace this with your ACTUAL MetaMask Wallet Address so you can log in!

doctor_wallet = "0x94072243e3344AE3d80509F6Db2e0cb212AdEe79"

doctor = {

"wallet_address": doctor_wallet,

"name": "Dr. Yash",

"license_id": "MD-84758",

"specialization": "Neurology",

"hospital_admin_wallet": hospital_admin_wallet, \# Links Dr. Strange to Apollo

"role": "SR_DOCTOR",

"is_active": True

}

db.doctors.insert_one(doctor)

print(f"\[doc\] Doctor Hired: {doctor\['name'\]} (Assigned to {hospital\['name'\]})")

\# ==========================================

\# 3. REGISTER A PATIENT (Web 2.5 Auth)

\# ==========================================

patient = {

"name": "Yash",

"email": "yash@biochain.ai",

"phone": "+91 9876543210",

"address": "Mumbai, Maharashtra, India",

"password": get_password_hash("password123"), \# Hashed for security

"bloodGroup": "O+",

"allergies": "Penicillin",

"emergencyContact": "+91 9999999999",

"idHash": "0xPendingBlockchainHash..." \# Will be updated when actually registered on-chain

}

db.patients.insert_one(patient)

print(f"\[usr\] Patient Registered: {patient\['name'\]}")

print("\n\[OK\] Enterprise Database Seeding Complete!")

if \_\_name\_\_ == "\_\_main\_\_":

seed_database()

## 10. backend/view_db.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

import json

from bson import json_util

def view_data():

try:

\# 1. Connect to MongoDB

client = MongoClient("mongodb://localhost:27017")

db = client.biochain_db

\# 2. Patients

patients = list(db.patients.find())

print(f"\n\[OK\] Patients: {len(patients)}")

for p in patients:

print(f"- {p.get('name')} ({p.get('email')})")

\# 3. Doctors

doctors = list(db.doctors.find())

print(f"\n\[doc\] Doctors: {len(doctors)}")

for d in doctors:

print(f"- {d.get('name')} ({d.get('wallet_address')})")

\# 4. Hospitals

hospitals = list(db.hospitals.find())

print(f"\n\[bldg\] Hospitals: {len(hospitals)}")

for h in hospitals:

print(f"- {h.get('name')} (Admin: {h.get('admin_wallet')})")

except Exception as e:

print(f"\[X\] Error connecting to MongoDB: {e}")

print("\[tip\] Make sure MongoDB service is running on your machine.")

if \_\_name\_\_ == "\_\_main\_\_":

view_data()

## 11. backend/check_db.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

import json

from pymongo import MongoClient

from bson import json_util

client = MongoClient('mongodb://localhost:27017/')

db = client.biochain_db

appointments = list(db.appointments.find())

with open('appointments_dump.json', 'w', encoding='utf-8') as f:

f.write(json.dumps(appointments, default=json_util.default, indent=2))

## 12. backend/reset_pwd.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

from passlib.context import CryptContext

\# Connect to Local MongoDB

client = MongoClient("mongodb://localhost:27017")

db = client.biochain_db

\# Password Hashing Logic

pwd_context = CryptContext(schemes=\["pbkdf2_sha256"\], deprecated="auto")

def reset_password(email, new_password):

hashed_pwd = pwd_context.hash(new_password)

result = db.patients.update_one(

{"email": email},

{"\$set": {"password": hashed_pwd}}

)

if result.modified_count \> 0:

print(f"\[OK\] Password reset successfully for {email}")

else:

print(f"\[!\] No user found with email {email} (or password is already exactly the same).")

if \_\_name\_\_ == "\_\_main\_\_":

\# Resetting the password for the manually created user

reset_password("YOUR_EMAIL@example.com", "securepassword123")

\# Also log the default password for the seed user

print("\[i\] The default password for 'yash@biochain.ai' is also 'securepassword123'")

## 13. backend/simulator.py

*(This file is a Testing Tool, not part of the core application.)*

"""

==============================================

BioChain AI - IoT Vitals Simulator v1.0

==============================================

Run this script to simulate IoT sensor data

streaming to the backend via WebSocket.

Usage:

cd backend

python simulator.py

The simulator connects as a WebSocket client

and verifies the live data stream is working.

Press Ctrl+C to stop the simulation.

==============================================

"""

import asyncio

import websockets

import json

WS_URL = "ws://127.0.0.1:8000/ws/vitals/simulator-test-patient"

async def run_simulator():

print("=" \* 50)

print(" \[ant\] BioChain IoT Simulator v1.0")

print("=" \* 50)

print(f" Connecting to: {WS_URL}")

print("-" \* 50)

try:

async with websockets.connect(WS_URL) as ws:

print(" \[OK\] Connected! Receiving live vitals data...\n")

reading_num = 0

while True:

data = await ws.recv()

vitals = json.loads(data)

reading_num += 1

\# Color-coded terminal output

status = vitals.get("status", "UNKNOWN")

bpm = vitals.get("bpm", 0)

spo2 = vitals.get("spo2", 0)

timestamp = vitals.get("timestamp", "")

if status == "CRITICAL":

status_icon = "\[!!\] CRITICAL"

else:

status_icon = "\[OK\] NORMAL "

print(f" \[{reading_num:04d}\] {timestamp} \| \<3 BPM: {bpm:3d} \| O2 SpO2: {spo2}% \| {status_icon}")

except websockets.exceptions.ConnectionClosedError:

print("\n \[X\] Connection closed by server.")

except ConnectionRefusedError:

print("\n \[X\] Could not connect! Make sure the backend is running:")

print(" cd backend && uvicorn main:app --reload")

except KeyboardInterrupt:

print("\n\n \[stop\] Simulator stopped by user.")

finally:

print("=" \* 50)

if \_\_name\_\_ == "\_\_main\_\_":

asyncio.run(run_simulator())

## 14. backend/update_names.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client\['biochain_db'\]

res1 = db.doctors.update_many(

{'name': 'Yash (Demo Doctor)'},

{'\$set': {'name': 'Dr. Yash'}}

)

res2 = db.medical_records.update_many(

{'doctor_name': 'Yash (Demo Doctor)'},

{'\$set': {'doctor_name': 'Dr. Yash'}}

)

print(f'Doctors updated: {res1.modified_count}')

print(f'Records updated: {res2.modified_count}')

## 15. backend/update_records.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client\['biochain_db'\]

records = list(db.medical_records.find())

updated = 0

for rc in records:

\# Only update if the name is truly missing or uselessly set

if 'doctor_name' not in rc or not rc\['doctor_name'\] or rc\['doctor_name'\] == 'Unknown Doctor':

wallet = rc.get('doctor_wallet', '')

name = 'Yash (Demo Doctor)'

\# We can just force it so the UI looks beautiful

if '0x94072243e3344AE3d80509F6Db2e0cb212AdEe79' in wallet.lower():

name = 'Dr. Yash Vijay Singh'

elif '0xdoc' in wallet.lower():

name = 'Dr. AI Assistant'

db.medical_records.update_one({'\_id': rc\['\_id'\]}, {'\$set': {'doctor_name': name}})

updated += 1

print(f"Updated {updated} records.")

## 16. backend/migrate_records.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client\['biochain_db'\]

res = db.medical_records.update_many(

{'patient_id': 'yash@biochain.ai'},

{'\$set': {'patient_id': 'YOUR_EMAIL@example.com'}}

)

print(f'Transferred {res.modified_count} records to YOUR_EMAIL@example.com')

## 17. backend/print_records.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

import pprint

client = MongoClient('mongodb://localhost:27017/')

db = client\['biochain_db'\]

records = list(db.records.find())

print("Total records:", len(records))

for r in records:

print("---")

print(r)

## 18. backend/tmp_update_patient.py

*(This file is a Development/Debugging Tool, not part of the core application.)*

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client\['biochain_db'\]

result = db.patients.update_one(

{"email": "YOUR_EMAIL@example.com"},

{"\$set": {

"phone": "8369669945",

"bloodGroup": "B+",

"allergies": "None",

"address": "Railway colony matunga",

"idHash": "e541a079b94590e3a028d812b2a0864da444e90480d184273653d486e05736e4"

}}

)

print(f"Matched count: {result.matched_count}, Modified count: {result.modified_count}")

## 19. blockchain/contracts/BioChaincontract.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

/\*\*

\* @title BioChainNetwork (Phase 3 - Multi-Hospital Enterprise Ready)

\* @dev Merges user's advanced Clinical Logic (Referrals, Access, SOS) with Multi-Tenant Hospital Orgs.

\*/

contract BioChainNetwork {

// ==========================================

// 1. DATA MODELS & ENUMS

// ==========================================

enum Role { NONE, PATIENT, DOCTOR, HOSPITAL_ADMIN, SUPER_ADMIN }

// --- UPDATED: Hospital Network Structure (Added staffList) ---

struct Hospital {

address adminWallet;

string name;

string registrationNumber;

bool isActive;

address\[\] staffList; // Tracks all doctors in this hospital

}

// --- YOUR CLINICAL STRUCTURES (Preserved) ---

struct MedicalProfile {

string bloodType;

string allergies;

string emergencyContact;

string profileHash; // IPFS JSON for extended Bio

uint256 lastUpdated;

}

struct Record {

uint256 id;

string ipfsHash; // File Link (X-Ray, MRI)

string recordType; // e.g., "Scan", "Lab Result"

string category; // AI Tag: "Critical", "Routine"

string notes; // Preserved from your code

address addedBy;

uint256 timestamp;

}

struct Prescription {

address doctor;

string diagnosis;

string ipfsHash; // IPFS link to medicine list JSON

uint256 timestamp;

}

struct Referral {

address referrer;

address targetDoctor;

string reason;

bool active;

uint256 timestamp;

}

struct Doctor {

address hospitalAdmin; // Links doc to a specific hospital

string name;

string licenseId;

string specialization;

bool isActive;

}

struct Patient {

string name;

string identityHash; // Web 2.5 Link (Hash of Email/Google ID)

MedicalProfile profile;

uint256\[\] recordIds;

bool exists;

}

// ==========================================

// 2. STATE VARIABLES

// ==========================================

address public superAdmin; // The master deployer

uint256 private nextRecordId;

mapping(address =\> bool) public authorizedRelayers;

mapping(address =\> Hospital) public hospitals;

mapping(address =\> Doctor) public doctors;

mapping(address =\> Patient) public patients;

mapping(address =\> Role) public roles;

mapping(uint256 =\> Record) public allRecords;

// Clinical History Mappings

mapping(address =\> Prescription\[\]) public patientPrescriptions;

mapping(address =\> Referral\[\]) public patientReferrals;

// ACCESS BRIDGE: Patient -\> Doctor -\> Access Granted?

mapping(address =\> mapping(address =\> bool)) public hasAccess;

// --- NEW: Global Emergency Tracker ---

mapping(address =\> bool) public isSOSActive;

// ==========================================

// 3. EVENTS (Audit Trail)

// ==========================================

event HospitalRegistered(address indexed admin, string name);

event PatientRegistered(address indexed patient, string name, string idHash);

event DoctorStatusChanged(address indexed doctor, address indexed hospital, bool isActive);

event RecordAdded(uint256 indexed recordId, address indexed patient, address indexed doctor);

event ReferralCreated(address indexed patient, address indexed from, address indexed to);

event SOSAlert(address indexed patient, string severity, uint256 time);

event SOSResolved(address indexed patient, uint256 time);

event PrescriptionIssued(address indexed patient, address indexed doctor);

// ==========================================

// 4. SECURITY MODIFIERS

// ==========================================

modifier onlySuperAdmin() {

require(msg.sender == superAdmin, "Auth: Super Admin Only");

\_;

}

modifier onlyHospitalAdmin() {

require(roles\[msg.sender\] == Role.HOSPITAL_ADMIN && hospitals\[msg.sender\].isActive, "Auth: Hospital Admin Only");

\_;

}

modifier onlyAuthorizedRelayer() {

require(msg.sender == superAdmin \|\| authorizedRelayers\[msg.sender\], "Auth: Relayer Only");

\_;

}

modifier onlyActiveDoctor() {

require(roles\[msg.sender\] == Role.DOCTOR && doctors\[msg.sender\].isActive, "Auth: Active Doctor Only");

\_;

}

constructor() {

superAdmin = msg.sender;

roles\[superAdmin\] = Role.SUPER_ADMIN;

nextRecordId = 1;

}

// ==========================================

// 5. ADMINISTRATION (The Org Hierarchy)

// ==========================================

function setRelayer(address \_relayer, bool \_status) public onlySuperAdmin {

authorizedRelayers\[\_relayer\] = \_status;

}

// \<-- UPDATED: Gas-optimized initialization --\>

function registerHospital(address \_adminWallet, string memory \_name, string memory \_regNumber) public onlySuperAdmin {

require(!hospitals\[\_adminWallet\].isActive, "Hospital exists");

Hospital storage newHospital = hospitals\[\_adminWallet\];

newHospital.adminWallet = \_adminWallet;

newHospital.name = \_name;

newHospital.registrationNumber = \_regNumber;

newHospital.isActive = true;

// staffList array is automatically initialized empty

roles\[\_adminWallet\] = Role.HOSPITAL_ADMIN;

emit HospitalRegistered(\_adminWallet, \_name);

}

// \<-- UPDATED: Pushes doctor to staffList --\>

function addDoctor(address \_wallet, string memory \_name, string memory \_license, string memory \_spec) public onlyHospitalAdmin {

doctors\[\_wallet\] = Doctor(msg.sender, \_name, \_license, \_spec, true);

roles\[\_wallet\] = Role.DOCTOR;

hospitals\[msg.sender\].staffList.push(\_wallet); // Track the staff

emit DoctorStatusChanged(\_wallet, msg.sender, true);

}

// \<-- NEW: Revoke a rogue or retiring doctor --\>

function deactivateDoctor(address \_wallet) public onlyHospitalAdmin {

require(doctors\[\_wallet\].hospitalAdmin == msg.sender, "Doctor not from your hospital");

doctors\[\_wallet\].isActive = false;

roles\[\_wallet\] = Role.NONE; // Demote role

emit DoctorStatusChanged(\_wallet, msg.sender, false);

}

// ==========================================

// 6. ONBOARDING (Web 2.5 Relayer Logic)

// ==========================================

// \<-- UPDATED: Gas-optimized struct initialization --\>

function registerPatient(

address \_pWallet, string memory \_name, string memory \_idHash,

string memory \_blood, string memory \_allergies, string memory \_emergency, string memory \_pHash

) public onlyAuthorizedRelayer {

require(!patients\[\_pWallet\].exists, "Registered");

Patient storage p = patients\[\_pWallet\];

p.name = \_name;

p.identityHash = \_idHash;

p.profile = MedicalProfile(\_blood, \_allergies, \_emergency, \_pHash, block.timestamp);

p.exists = true;

roles\[\_pWallet\] = Role.PATIENT;

emit PatientRegistered(\_pWallet, \_name, \_idHash);

}

// ==========================================

// 7. CLINICAL OPERATIONS (Emergency & Data)

// ==========================================

// \<-- UPDATED: Emergency Override Logic --\>

function triggerSOS(string memory \_severity) public {

require(patients\[msg.sender\].exists, "Patient only");

isSOSActive\[msg.sender\] = true; // Bypasses access checks

emit SOSAlert(msg.sender, \_severity, block.timestamp);

}

// \<-- NEW: Resolve Emergency --\>

function resolveSOS() public {

require(patients\[msg.sender\].exists, "Patient only");

isSOSActive\[msg.sender\] = false; // Restores privacy lock

emit SOSResolved(msg.sender, block.timestamp);

}

// \<-- UPDATED: Emergency Access Check --\>

function addMedicalRecord(

address \_pWallet, string memory \_hash, string memory \_type, string memory \_cat, string memory \_notes

) public onlyActiveDoctor {

// Doc needs standard access OR an active emergency to upload life-saving reports

require(hasAccess\[\_pWallet\]\[msg.sender\] \|\| isSOSActive\[\_pWallet\], "Access Denied");

uint256 rId = nextRecordId;

allRecords\[rId\] = Record(rId, \_hash, \_type, \_cat, \_notes, msg.sender, block.timestamp);

patients\[\_pWallet\].recordIds.push(rId);

nextRecordId++;

emit RecordAdded(rId, \_pWallet, msg.sender);

}

function referPatient(address \_pWallet, address \_targetDoc, string memory \_reason) public onlyActiveDoctor {

require(hasAccess\[\_pWallet\]\[msg.sender\], "You don't have access to refer");

require(doctors\[\_targetDoc\].isActive, "Target Doctor not active");

patientReferrals\[\_pWallet\].push(Referral(msg.sender, \_targetDoc, \_reason, true, block.timestamp));

hasAccess\[\_pWallet\]\[\_targetDoc\] = true;

emit ReferralCreated(\_pWallet, msg.sender, \_targetDoc);

}

// \<-- UPDATED: Emergency Access Check --\>

function issuePrescription(address \_patient, string memory \_diagnosis, string memory \_ipfsHash) public onlyActiveDoctor {

require(hasAccess\[\_patient\]\[msg.sender\] \|\| isSOSActive\[\_patient\], "Access Denied");

patientPrescriptions\[\_patient\].push(Prescription(

msg.sender,

\_diagnosis,

\_ipfsHash,

block.timestamp

));

emit PrescriptionIssued(\_patient, msg.sender);

}

// PERMISSIONS

function grantAccess(address \_doctor) public {

require(patients\[msg.sender\].exists, "Patient only");

hasAccess\[msg.sender\]\[\_doctor\] = true;

}

function revokeAccess(address \_doctor) public {

hasAccess\[msg.sender\]\[\_doctor\] = false;

}

// ==========================================

// 8. DATA RETRIEVAL (Getters)

// ==========================================

// \<-- UPDATED: Added Access Lock --\>

function getProfile(address \_pWallet) public view returns (MedicalProfile memory) {

// Patient, Authorized Doctor, or ANY Doctor during an SOS can view

require(

msg.sender == \_pWallet \|\|

hasAccess\[\_pWallet\]\[msg.sender\] \|\|

isSOSActive\[\_pWallet\],

"Access Denied"

);

return patients\[\_pWallet\].profile;

}

function getPatientRecords(address \_pWallet) public view returns (uint256\[\] memory) {

return patients\[\_pWallet\].recordIds;

}

function getRecord(uint256 \_id) public view returns (Record memory) {

return allRecords\[\_id\];

}

function getPrescriptions(address \_patient) public view returns (Prescription\[\] memory) {

return patientPrescriptions\[\_patient\];

}

function getReferrals(address \_patient) public view returns (Referral\[\] memory) {

return patientReferrals\[\_patient\];

}

// \<-- NEW: Helper to get all doctors in a hospital --\>

function getHospitalStaff(address \_hospitalAdmin) public view returns (address\[\] memory) {

return hospitals\[\_hospitalAdmin\].staffList;

}

}

## 20. blockchain/scripts/deploy.js

const hre = require("hardhat");

async function main() {

console.log("\[hosp\] Deploying BioChainNetwork...");

// 1. Get the Contract Factory (The Blueprint)

// FIX 1: Look for the new Enterprise contract name

const BioChainNetwork = await hre.ethers.getContractFactory("BioChainNetwork");

// 2. Deploy it

// FIX 2: The new contract doesn't take a hospital name in the constructor anymore.

// The network starts empty, and the Super Admin registers hospitals later!

const bioChain = await BioChainNetwork.deploy();

// 3. Wait for the transaction to finish

await bioChain.waitForDeployment();

// 4. Print the result

console.log("----------------------------------------------------");

console.log("\[OK\] Contract deployed successfully!");

console.log("\[loc\] Address:", await bioChain.getAddress());

console.log("----------------------------------------------------");

}

// Standard error handling

main().catch((error) =\> {

console.error(error);

process.exitCode = 1;

});

## 21. blockchain/hardhat.config.js

require("@nomicfoundation/hardhat-toolbox");

/\*\* @type import('hardhat/config').HardhatUserConfig \*/

module.exports = {

solidity: "0.8.19",

};

## 22. blockchain/package.json

{

"name": "blockchain",

"version": "1.0.0",

"main": "index.js",

"scripts": {

"test": "echo \\Error: no test specified\\ && exit 1"

},

"keywords": \[\],

"author": "",

"license": "ISC",

"description": "",

"devDependencies": {

"@nomicfoundation/hardhat-toolbox": "^6.1.0",

"hardhat": "^2.22.0"

}

}

## 23. frontend/src/main.jsx

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(

\<StrictMode\>

\<App /\>

\</StrictMode\>,

)

## 24. frontend/src/config.js

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const API_BASE_URL = "http://127.0.0.1:8000";

## 25. frontend/src/App.jsx

import { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL } from './config';

import {

Eye, EyeOff, Mail, Wallet, ArrowRight, ArrowLeft, Activity,

Home, Users, FileText, User, Settings, LogOut, Heart, Clock, Shield,

Building, UploadCloud, BadgeCheck, Pill // \<-- Added Pill icon for Drug Check

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

const EncryptedSection = ({ title }) =\> (

\<div className="bg-\[#121620\] h-\[500px\] rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center p-8"\>

\<div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-500 mb-6 border border-slate-700"\>

\<Shield size={32} /\>

\</div\>

\<h3 className="text-xl font-bold text-white mb-2"\>Section Encrypted\</h3\>

\<p className="text-slate-500 text-sm max-w-xs"\>

This module is currently locked on the mainnet. {title} will be available once the node synchronization is complete.

\</p\>

\</div\>

);

// --- COMPONENT: THE LOGIN GATE ---

const LoginGate = ({ onLogin, onCreateIdentity, showOtp, otpEmail }) =\> {

const \[email, setEmail\] = useState('');

const \[password, setPassword\] = useState('');

const \[otp, setOtp\] = useState('');

const \[showPassword, setShowPassword\] = useState(false);

const \[showNewPassword, setShowNewPassword\] = useState(false);

const \[showForm, setShowForm\] = useState(false);

// --- FORGOT PASSWORD STATE ---

const \[forgotMode, setForgotMode\] = useState(false); // Shows forgot UI

const \[forgotStep, setForgotStep\] = useState(1); // 1=email, 2=otp+newpw, 3=success

const \[forgotEmail, setForgotEmail\] = useState('');

const \[forgotOtp, setForgotOtp\] = useState('');

const \[newPassword, setNewPassword\] = useState('');

const \[forgotMsg, setForgotMsg\] = useState('');

const \[forgotLoading, setForgotLoading\] = useState(false);

const handleForgotRequest = async (e) =\> {

e.preventDefault();

setForgotLoading(true);

setForgotMsg('');

try {

const res = await axios.post(\`\${API_BASE_URL}/login/patient/forgot-password/request\`, { email: forgotEmail });

if (res.data.status === 'OTP_SENT') {

setForgotMsg(res.data.message);

setForgotStep(2);

}

} catch (err) {

setForgotMsg(err.response?.data?.detail \|\| 'Something went wrong.');

} finally {

setForgotLoading(false);

}

};

const handleForgotVerify = async (e) =\> {

e.preventDefault();

setForgotLoading(true);

setForgotMsg('');

try {

const res = await axios.post(\`\${API_BASE_URL}/login/patient/forgot-password/verify\`, {

email: forgotEmail,

otp: forgotOtp,

new_password: newPassword

});

if (res.data.status === 'Success') {

setForgotStep(3);

}

} catch (err) {

setForgotMsg(err.response?.data?.detail \|\| 'OTP Invalid or Expired.');

} finally {

setForgotLoading(false);

}

};

const resetForgotState = () =\> {

setForgotMode(false);

setForgotStep(1);

setForgotEmail('');

setForgotOtp('');

setNewPassword('');

setForgotMsg('');

};

const handlePatientSubmit = (e) =\> {

e.preventDefault();

if (!showOtp) {

onLogin('PATIENT', { email, password });

} else {

onLogin('PATIENT_VERIFY', { email: otpEmail, otp });

}

};

return (

\<div className="min-h-screen bg-\[#0b0e14\] flex items-center justify-center p-6 relative overflow-hidden"\>

{/\* UPDATE: Changed max-w-4xl to max-w-6xl and md:grid-cols-2 to lg:grid-cols-3 to fit 3 cards \*/}

\<div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"\>

{/\* 1. PATIENT PORTAL (Web 2.5) \*/}

\<div className="bg-\[#121620\]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition duration-300 flex flex-col"\>

\<div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6"\>\<Mail size={24} /\>\</div\>

\<h2 className="text-2xl font-bold text-white mb-2"\>Patient Portal\</h2\>

{/\* ---- FORGOT PASSWORD MODE ---- \*/}

{forgotMode ? (

\<div className="flex-1 flex flex-col"\>

{forgotStep === 1 && (

\<form onSubmit={handleForgotRequest} className="space-y-3 flex-1 flex flex-col"\>

\<p className="text-slate-400 text-sm mb-2"\>Enter your registered email to receive a reset OTP.\</p\>

\<input

type="email" required placeholder="Registered Email"

value={forgotEmail} onChange={e =\> setForgotEmail(e.target.value)}

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-amber-500 focus:outline-none"

/\>

{forgotMsg && \<p className="text-xs text-red-400"\>{forgotMsg}\</p\>}

\<button type="submit" disabled={forgotLoading}

className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold transition disabled:opacity-50"\>

{forgotLoading ? 'Sending OTP...' : 'Send Reset OTP \[lock\]'}

\</button\>

\</form\>

)}

{forgotStep === 2 && (

\<form onSubmit={handleForgotVerify} className="space-y-3 flex-1 flex flex-col"\>

\<p className="text-emerald-400 text-xs font-bold uppercase tracking-widest"\>Reset Password\</p\>

\<p className="text-slate-400 text-xs mb-1"\>{forgotMsg}\</p\>

\<input

type="text" required placeholder="Enter OTP" maxLength="6"

value={forgotOtp} onChange={e =\> setForgotOtp(e.target.value)}

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-amber-500/50 text-white text-center text-xl tracking-\[0.4em\] font-mono focus:border-amber-400 focus:outline-none"

/\>

\<div className="relative"\>

\<input

type={showNewPassword ? "text" : "password"} required placeholder="New Password" minLength="6"

value={newPassword} onChange={e =\> setNewPassword(e.target.value)}

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-amber-500 focus:outline-none pr-10"

/\>

\<button type="button" onClick={() =\> setShowNewPassword(!showNewPassword)}

className="absolute right-3 top-3 text-slate-500 hover:text-white transition"\>

{showNewPassword ? \<EyeOff size={18} /\> : \<Eye size={18} /\>}

\</button\>

\</div\>

{forgotMsg && forgotStep === 2 && \<p className="text-xs text-red-400"\>{forgotMsg}\</p\>}

\<button type="submit" disabled={forgotLoading}

className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold transition disabled:opacity-50"\>

{forgotLoading ? 'Verifying...' : 'Reset Password \[OK\]'}

\</button\>

\</form\>

)}

{forgotStep === 3 && (

\<div className="flex-1 flex flex-col items-center justify-center text-center gap-4"\>

\<div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-2xl"\>\[OK\]\</div\>

\<h3 className="text-lg font-bold text-white"\>Password Reset!\</h3\>

\<p className="text-slate-400 text-sm"\>Your new password is active. You can now login.\</p\>

\<button onClick={resetForgotState}

className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition"\>

Back to Login

\</button\>

\</div\>

)}

{forgotStep \< 3 && (

\<button onClick={resetForgotState} className="text-xs text-slate-500 hover:text-slate-300 transition mt-4 text-center"\>

\<- Back to Login

\</button\>

)}

\</div\>

) : (

/\* ---- NORMAL LOGIN MODE ---- \*/

\<\>

{!showOtp ? (

\<\>

\<p className="text-slate-400 mb-6 text-sm flex-1"\>Secure login with 2FA protection for your medical records.\</p\>

{!showForm ? (

\<button

onClick={() =\> setShowForm(true)}

className="group w-full py-4 bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-emerald-500/10 active:scale-\[0.98\] mb-4 border border-emerald-400/20"

\>

\<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /\>

Continue with Email

\</button\>

) : (

\<form onSubmit={handlePatientSubmit} className="space-y-3 mb-4"\>

\<input

type="email"

placeholder="Email Address"

required

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setEmail(e.target.value)}

/\>

\<div className="relative"\>

\<input

type={showPassword ? "text" : "password"}

placeholder="Password"

required

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setPassword(e.target.value)}

/\>

\<button

type="button"

onClick={() =\> setShowPassword(!showPassword)}

className="absolute right-3 top-3 text-slate-500 hover:text-white"

\>

{showPassword ? \<EyeOff size={18} /\> : \<Eye size={18} /\>}

\</button\>

\</div\>

\<button

type="submit"

className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95"

\>

Get OTP

\</button\>

\<button

type="button"

onClick={() =\> setForgotMode(true)}

className="w-full text-xs text-amber-500 hover:text-amber-400 transition text-right pr-1"

\>

Forgot Password?

\</button\>

\</form\>

)}

\</\>

) : (

\<form onSubmit={handlePatientSubmit} className="space-y-4 mb-4"\>

\<div className="text-center"\>

\<p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1"\>Verify Identity\</p\>

\<p className="text-slate-500 text-xs mb-4"\>Enter the code sent to your terminal\</p\>

\</div\>

\<input

type="text"

placeholder="000000"

maxLength="6"

required

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border-2 border-emerald-500/50 text-white text-center text-2xl tracking-\[0.5em\] font-mono focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setOtp(e.target.value)}

/\>

\<button

type="submit"

className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95"

\>

Verify &amp; Login

\</button\>

\</form\>

)}

\<button onClick={onCreateIdentity} className="text-xs text-slate-500 hover:text-emerald-400 transition mt-auto"\>New to BioChain? \<span className="underline"\>Create Identity\</span\>\</button\>

\</\>

)}

\</div\>

{/\* 2. DOCTOR ACCESS (Web3 Native) \*/}

\<div className="bg-\[#121620\]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition flex flex-col"\>

\<div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6"\>\<Wallet size={24} /\>\</div\>

\<h2 className="text-2xl font-bold text-white mb-2"\>Doctor Access\</h2\>

\<p className="text-slate-400 mb-8 text-sm flex-1"\>Connect MetaMask to sign medical records directly on the blockchain.\</p\>

\<button

onClick={() =\> onLogin('DOCTOR')}

className="group w-full py-4 bg-gradient-to-br from-blue-600 to-indigo-800 hover:from-blue-500 hover:to-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-500/10 active:scale-\[0.98\] border border-blue-400/20"

\>

\<Wallet size={20} className="group-hover:scale-110 transition-transform" /\>

Connect Wallet

\</button\>

\</div\>

{/\* 3. NEW: ENTERPRISE ADMIN ACCESS (Web3 Native) \*/}

\<div className="bg-\[#121620\]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition flex flex-col"\>

\<div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6"\>\<Building size={24} /\>\</div\>

\<h2 className="text-2xl font-bold text-white mb-2"\>Enterprise Admin\</h2\>

\<p className="text-slate-400 mb-8 text-sm flex-1"\>Authenticate as a Hospital Node Administrator to manage clinical staff access.\</p\>

\<button

onClick={() =\> onLogin('ADMIN')}

className="group w-full py-4 bg-gradient-to-br from-purple-600 to-fuchsia-800 hover:from-purple-500 hover:to-fuchsia-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-purple-500/10 active:scale-\[0.98\] border border-purple-400/20"

\>

\<Shield size={20} className="group-hover:scale-110 transition-transform" /\>

Node Access

\</button\>

\</div\>

\</div\>

\</div\>

);

};

// --- MAIN APP ---

function App() {

const \[view, setView\] = useState('login');

const \[activeTab, setActiveTab\] = useState('Home');

const \[role, setRole\] = useState(null);

const \[wallet, setWallet\] = useState("0x...");

const \[showOtp, setShowOtp\] = useState(false);

const \[otpEmail, setOtpEmail\] = useState('');

const \[userData, setUserData\] = useState(null);

const \[selectedPatient, setSelectedPatient\] = useState(null);

const onLogin = async (selectedRole, credentials = null) =\> {

try {

if (selectedRole === 'PATIENT') {

const res = await axios.post(\`\${API_BASE_URL}/login/patient/step1\`, credentials);

if (res.data.status === "OTP_SENT") {

setOtpEmail(credentials.email);

setShowOtp(true);

}

}

else if (selectedRole === 'PATIENT_VERIFY') {

const res = await axios.post(\`\${API_BASE_URL}/login/patient/verify\`, credentials);

if (res.data.status === "Success") {

setRole('PATIENT');

setWallet(res.data.idHash);

setUserData({ ...res.data, email: otpEmail });

setView('dashboard');

}

}

// UPDATE: Handle both Doctor AND Admin Web3 Logins

else if (selectedRole === 'DOCTOR' \|\| selectedRole === 'ADMIN') {

let provider = window.ethereum;

if (provider?.providers) {

provider = provider.providers.find(p =\> p.isMetaMask) \|\| provider.providers\[0\];

}

if (!provider) return alert("MetaMask not detected! Please ensure the extension is enabled and refresh the page.");

const accounts = await provider.request({ method: 'eth_requestAccounts' });

const msg = \`BioChain Login: \${Date.now()}\`;

const signature = await provider.request({

method: 'personal_sign',

params: \[msg, accounts\[0\]\],

});

// Determine which backend API to hit based on the button clicked

const apiEndpoint = selectedRole === 'DOCTOR' ? '/login/doctor' : '/login/admin';

const res = await axios.post(\`\${API_BASE_URL}\${apiEndpoint}\`, {

wallet_address: accounts\[0\],

signature: signature,

message: msg

});

if (res.data.status === "Success") {

setRole(res.data.role); // 'DOCTOR' or 'HOSPITAL_ADMIN'

setWallet(accounts\[0\]);

setUserData(res.data);

setView('dashboard');

}

}

} catch (err) {

alert(err.response?.data?.detail \|\| "Login Failed");

}

};

const handleLogout = () =\> {

setView('login');

setRole(null);

setShowOtp(false);

setUserData(null);

setSelectedPatient(null);

setActiveTab('Home');

};

// UPDATE: Added menu items specifically for the Hospital Admin

const menuItems = role === 'HOSPITAL_ADMIN' ? \[

{ name: 'Home', icon: Home },

{ name: 'Node Overview', icon: Activity },

{ name: 'Staff Directory', icon: Users },

{ name: 'Audit Logs', icon: FileText },

{ name: 'Settings', icon: Settings },

\] : role?.includes('DOCTOR') ? \[

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

\] : \[

{ name: 'Home', icon: Home },

{ name: 'Live Vitals', icon: Activity },

{ name: 'My Record', icon: FileText },

{ name: 'Upload Data', icon: UploadCloud },

{ name: 'Drug Check', icon: Pill },

{ name: 'Appointments', icon: Clock },

{ name: 'Care Team', icon: Heart },

{ name: 'My Profile', icon: User },

{ name: 'Settings', icon: Settings },

\];

if (view === 'login') return \<LoginGate onLogin={onLogin} onCreateIdentity={() =\> setView('register')} showOtp={showOtp} otpEmail={otpEmail} /\>;

if (view === 'register') return (

\<div className="min-h-screen bg-\[#0b0e14\] p-6"\>

\<button onClick={() =\> setView('login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"\>\<ArrowLeft size={20} /\> Back to Login\</button\>

\<div className="flex justify-center"\>\<Register role={role} /\>\</div\>

\</div\>

);

return (

\<div className="flex min-h-screen bg-\[#0b0e14\] text-slate-300 font-sans print:bg-white"\>

\<aside className="w-64 bg-\[#121620\] border-r border-slate-800 p-6 flex flex-col fixed h-full z-20 overflow-y-auto overflow-x-hidden print:hidden"\>

\<div className="flex items-center gap-3 mb-10 text-white flex-shrink-0"\>

\<Activity className={role === 'HOSPITAL_ADMIN' ? 'text-purple-500' : role?.includes('DOCTOR') ? 'text-blue-500' : 'text-emerald-500'} size={28} /\>

\<span className="text-xl font-bold tracking-tight"\>BioChainAI\</span\>

{role === 'HOSPITAL_ADMIN' && \<span className="text-\[8px\] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-purple-500/20"\>Admin\</span\>}

\</div\>

\<div className={\`p-4 rounded-xl mb-8 flex items-center gap-3 border transition-all duration-300 flex-shrink-0 \${

role === 'HOSPITAL_ADMIN' ? 'bg-purple-500/5 border-purple-500/20' :

role?.includes('DOCTOR') ? 'bg-blue-500/5 border-blue-500/20' :

'bg-\[#1a1f2e\] border-slate-700/50'

}\`}\>

\<div className={\`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0 \${role?.includes('DOCTOR') ? 'bg-blue-600' : role === 'HOSPITAL_ADMIN' ? 'bg-purple-600' : 'bg-emerald-600'}\`}\>

{userData?.profile_photo_hash ? (

\<img

src={\`https://ipfs.io/ipfs/\${userData.profile_photo_hash}\`}

alt="Avatar"

className="w-full h-full object-cover"

/\>

) : (

(userData?.name \|\| userData?.hospital_name \|\| '??').substring(0, 2).toUpperCase()

)}

\</div\>

\<div className="overflow-hidden min-w-0"\>

\<p className="text-sm font-bold text-white truncate"\>{userData?.name \|\| userData?.hospital_name \|\| 'User'}\</p\>

\<span className={\`text-\[10px\] uppercase font-bold tracking-widest \${

role === 'HOSPITAL_ADMIN' ? 'text-purple-400' :

role?.includes('DOCTOR') ? 'text-blue-400' :

'text-slate-500'

}\`}\>{role?.replace('\_', ' ')}\</span\>

\</div\>

\</div\>

\<nav className="flex-1 space-y-1"\>

{menuItems.map((item) =\> {

const isActive = activeTab === item.name;

const activeClasses = role === 'HOSPITAL_ADMIN'

? 'bg-purple-500/10 text-purple-400 border-l-4 border-purple-500'

: role?.includes('DOCTOR')

? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500'

: 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500';

return (

\<button key={item.name} onClick={() =\> setActiveTab(item.name)} className={\`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 \${isActive ? activeClasses : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}\`}\>

\<item.icon size={20} className="flex-shrink-0" /\>

\<span className="text-sm font-semibold truncate"\>{item.name}\</span\>

\</button\>

);

})}

\</nav\>

\<div className="mt-auto pt-6 border-t border-slate-800 flex-shrink-0"\>

\<button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 text-sm px-4 py-2 transition-colors duration-200"\>\<LogOut size={18} className="flex-shrink-0" /\> Disconnect\</button\>

\</div\>

\</aside\>

\<main className="flex-1 ml-64 p-8 overflow-x-hidden print:ml-0 print:p-0"\>

\<header className="flex justify-between items-center mb-10 print:hidden"\>

\<div\>

\<h2 className="text-3xl font-bold text-white"\>{activeTab}\</h2\>

\<p className="text-slate-500 text-sm"\>Welcome back, {userData?.name \|\| userData?.hospital_name}.\</p\>

\</div\>

\<div className="text-right"\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-widest"\>Identity ID\</p\>

\<p className={\`text-xs font-mono \${

role === 'HOSPITAL_ADMIN' ? 'text-purple-400/80' :

role?.includes('DOCTOR') ? 'text-blue-400/80' :

'text-emerald-400/80'

}\`}\>{wallet.slice(0, 6)}...{wallet.slice(-4)}\</p\>

\</div\>

\</header\>

\<div className="max-w-7xl"\>

{activeTab === 'Home' && role !== 'HOSPITAL_ADMIN' && \<Dashboard role={role} userData={userData} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setActiveTab={setActiveTab} /\>}

{activeTab === 'Home' && role === 'HOSPITAL_ADMIN' && \<Dashboard role={role} userData={userData} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setActiveTab={setActiveTab} /\>}

{/\* Admin Specific Tabs \*/}

{activeTab === 'Node Overview' && role === 'HOSPITAL_ADMIN' && \<NodeOverview setActiveTab={setActiveTab} /\>}

{activeTab === 'Staff Directory' && role === 'HOSPITAL_ADMIN' && \<StaffDirectory /\>}

{activeTab === 'Audit Logs' && role === 'HOSPITAL_ADMIN' && \<AuditLogs /\>}

{activeTab === 'Patients' && \<PatientsDirectory doctorData={userData} onSelectPatient={(p) =\> {

setSelectedPatient(p);

setActiveTab('Home');

}} /\>}

{activeTab === 'My Record' && (

(role === 'PATIENT' \|\| role?.includes('DOCTOR')) ? \<MyRecords userData={userData} /\> : \<EncryptedSection title="Personal Records" /\>

)}

{activeTab === 'Upload Data' && \<UploadData userData={userData} /\>}

{/\* LIVE VITALS TAB -- Full IoT Monitor with Canvas Charts & Threshold Alerts \*/}

{activeTab === 'Live Vitals' && (role === 'PATIENT' \|\| role?.includes('DOCTOR')) && (

\<LiveVitals userData={userData} /\>

)}

{/\* Appointments Tab Rendering Logic \*/}

{activeTab === 'Appointments' && role === 'PATIENT' && \<PatientAppointments userData={userData} /\>}

{activeTab === 'Appointments' && role?.includes('DOCTOR') && \<DoctorAppointments userData={userData} /\>}

{activeTab === 'Appointments' && role === 'HOSPITAL_ADMIN' && \<EncryptedSection title={activeTab} /\>}

{/\* CARE TEAM TAB \*/}

{activeTab === 'Care Team' && (role === 'PATIENT' \|\| role?.includes('DOCTOR')) && (

\<CareTeam userData={userData} role={role} /\>

)}

{activeTab === 'Care Team' && role === 'HOSPITAL_ADMIN' && (

\<EncryptedSection title={activeTab} /\>

)}

{activeTab === 'Drug Check' && (role === 'PATIENT' \|\| role?.includes('DOCTOR')) && \<DrugInteractionChecker /\>}

{activeTab === 'Settings' && \<EncryptedSection title={activeTab} /\>}

{activeTab === 'My Profile' && (

\<MyProfile

userRole={role}

userId={role?.includes('DOCTOR') ? wallet : userData?.email}

userData={userData}

onProfileUpdate={(updatedFields) =\> setUserData({ ...userData, ...updatedFields })}

/\>

)}

{/\* JARVIS: Floating AI Widget -- visible on all pages when logged in \*/}

\<AIAssistantWidget userData={userData} role={role} /\>

\</div\>

\</main\>

\</div\>

);

}

export default App;

## 26. frontend/src/Register.jsx

import React, { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL } from './config';

import { User, Mail, Phone, MapPin, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const Register = ({ role }) =\> {

const \[formData, setFormData\] = useState({

name: '',

email: '',

phone: '',

address: '',

password: '',

bloodGroup: 'O+',

allergies: 'None',

emergencyContact: ''

});

const \[showPassword, setShowPassword\] = useState(false);

const \[isLoading, setIsLoading\] = useState(false);

const handleSubmit = async (e) =\> {

e.preventDefault();

setIsLoading(true);

console.log("Attempting to align submitting data:", formData);

try {

const response = await axios.post(\`\${API_BASE_URL}/register\`, formData);

alert("Identity Created! You can now log in.");

window.location.reload();

} catch (error) {

console.error("Registration endpoint fail:", error);

if(error.response) {

console.error("Response data:", error.response.data);

}

alert("Registration Failed: " + (error.response?.data?.detail \|\| error.message \|\| "Error"));

} finally {

setIsLoading(false);

}

};

return (

\<div className="w-full max-w-md bg-\[#121620\]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl mx-auto"\>

\<div className="flex items-center gap-3 mb-6 text-emerald-400"\>

\<ShieldCheck size={32} /\>

\<h2 className="text-2xl font-bold text-white"\>New Identity\</h2\>

\</div\>

\<form onSubmit={handleSubmit} className="space-y-4"\>

\<div className="relative"\>

\<User className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input type="text" placeholder="Full Name" required className="w-full bg-\[#0b0e14\] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, name: e.target.value })} /\>

\</div\>

\<div className="relative"\>

\<Mail className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input type="email" placeholder="Email Address" required className="w-full bg-\[#0b0e14\] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, email: e.target.value })} /\>

\</div\>

\<div className="relative"\>

\<Phone className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input type="text" placeholder="Phone Number (for 2FA)" required className="w-full bg-\[#0b0e14\] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, phone: e.target.value })} /\>

\</div\>

\<div className="relative"\>

\<MapPin className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input type="text" placeholder="Residential Address" required className="w-full bg-\[#0b0e14\] p-3 pl-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, address: e.target.value })} /\>

\</div\>

\<div className="grid grid-cols-2 gap-4"\>

\<div className="relative"\>

\<select

required

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none appearance-none cursor-pointer"

onChange={(e) =\> setFormData({ ...formData, bloodGroup: e.target.value })}

\>

\<option value=""\>Blood Type\</option\>

\<option value="A+"\>A+\</option\>

\<option value="A-"\>A-\</option\>

\<option value="B+"\>B+\</option\>

\<option value="B-"\>B-\</option\>

\<option value="AB+"\>AB+\</option\>

\<option value="AB-"\>AB-\</option\>

\<option value="O+"\>O+\</option\>

\<option value="O-"\>O-\</option\>

\</select\>

\</div\>

\<div className="relative"\>

\<input type="text" placeholder="Emergency Phone (e.g. 9876543210)" required className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, emergencyContact: e.target.value })} /\>

\</div\>

\</div\>

\<div className="relative"\>

\<input type="text" placeholder="Allergies (e.g. Peanuts, Aspirin)" className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, allergies: e.target.value })} /\>

\</div\>

\<div className="relative"\>

\<Lock className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input

type={showPassword ? "text" : "password"}

placeholder="Set Password"

required

className="w-full bg-\[#0b0e14\] p-3 pl-10 pr-10 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"

onChange={(e) =\> setFormData({ ...formData, password: e.target.value })}

/\>

\<button

type="button"

onClick={() =\> setShowPassword(!showPassword)}

className="absolute right-3 top-3 text-slate-500 hover:text-white"

\>

{showPassword ? \<EyeOff size={18} /\> : \<Eye size={18} /\>}

\</button\>

\</div\>

\<button

type="submit"

disabled={isLoading}

className={\`w-full py-4 bg-gradient-to-r \${isLoading ? "from-slate-600 to-slate-700 cursor-not-allowed" : "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"} text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all duration-300 active:scale-95\`}

\>

{isLoading ? "Creating Identity on BioChain..." : "Securely Register on BioChain"}

\</button\>

\</form\>

\</div\>

);

};

export default Register;

## 27. frontend/src/Dashboard.jsx

import { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from './config';

import { motion, AnimatePresence } from 'framer-motion';

import {

Activity, FileText, User, Heart, Phone, Clock,

Shield, Thermometer, Droplet, Weight, Users,

ClipboardPlus, Stethoscope, AlertOctagon, Search,

Zap, ArrowLeft, X, ChevronRight, Filter, AlertCircle,

CheckCircle2, CheckCircle, Plus, Calendar, Briefcase, MapPin, Building, Server, BadgeCheck

} from 'lucide-react';

import IssueRecordModal from './components/IssueRecordModal';

const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

function Dashboard({ role, userData, selectedPatient, setSelectedPatient, setActiveTab }) {

const \[data, setData\] = useState(null);

const \[loading, setLoading\] = useState(true);

// --- NEW STATE: TRACK WHICH PATIENT IS OPEN ---

// const \[selectedPatient, setSelectedPatient\] = useState(null); // Managed by App.jsx

const \[isRecordModalOpen, setIsRecordModalOpen\] = useState(false);

const \[selectedHistoryRecord, setSelectedHistoryRecord\] = useState(null);

const \[patientRecords, setPatientRecords\] = useState(\[\]); // \<-- NEW STATE FOR REAL RECORDS

const \[patientProfile, setPatientProfile\] = useState(null); // \<-- NEW STATE FOR FULL PROFILE

const \[appointments, setAppointments\] = useState(\[\]);

const \[approvalInputs, setApprovalInputs\] = useState({}); // To store date/time for approval

const \[liveVitals, setLiveVitals\] = useState(null); // \<-- NEW STATE FOR LIVE VITALS

// Doctor ki asli appointments fetch karne ka logic

useEffect(() =\> {

if (role?.includes('DOCTOR') && userData?.wallet_address) {

const fetchAppointments = async () =\> {

try {

const res = await axios.get(\`\${API_BASE_URL}/appointments/doctor/\${userData.wallet_address}\`);

setAppointments(res.data.appointments \|\| \[\]);

} catch (error) {

console.error("Failed to fetch appointments:", error);

}

};

fetchAppointments();

}

}, \[role, userData\]);

const handleApprove = async (appId) =\> {

const data = approvalInputs\[appId\];

if (!data?.date \|\| !data?.time) {

alert("\[!\] Please select both Date and Time to approve this appointment.");

return;

}

try {

await axios.put(\`\${API_BASE_URL}/appointments/approve/\${appId}\`, {

appointment_date: data.date,

appointment_time: data.time

});

// Refresh the list after approval

const res = await axios.get(\`\${API_BASE_URL}/appointments/doctor/\${userData.wallet_address}\`);

setAppointments(res.data.appointments \|\| \[\]);

} catch (error) {

console.error("Approval failed:", error);

alert("Failed to approve appointment.");

}

};

// --- NEW: Function to manually fetch patient records & profile ---

const fetchPatientRecords = async () =\> {

if (!selectedPatient) return;

try {

const pid = selectedPatient.email \|\| selectedPatient.id;

const res = await axios.get(\`\${API_BASE_URL}/record/patient/\${pid}\`);

if (res.data.status === "Success") {

setPatientRecords(res.data.records);

}

// Fetch full profile for doctor if they only got '{name, email}' via appointments tab

if (role?.includes('DOCTOR')) {

const profileRes = await axios.get(\`\${API_BASE_URL}/api/patient/\${pid}\`);

if (profileRes.data.status === "Success") {

setPatientProfile(profileRes.data.patient);

}

}

} catch (err) {

console.error("Error fetching patient details:", err);

}

};

// Fetch records when a patient is selected

useEffect(() =\> {

if (selectedPatient) {

fetchPatientRecords();

}

}, \[selectedPatient\]);

useEffect(() =\> {

const fetchData = async () =\> {

try {

// Admin dashboard requires specific health telemetry stats

const endpoint = role === 'HOSPITAL_ADMIN' ? \`\${API_BASE_URL}/api/admin/node-stats\` : \`\${API_BASE_URL}/dashboard\`;

const res = await axios.get(endpoint);

setData(res.data);

} catch (err) {

console.error("Dashboard data fetch failed:", err);

} finally {

setLoading(false);

}

};

fetchData();

}, \[role\]);

// --- NEW: WEB SOCKET FOR LIVE DASHBOARD CARDS ---

useEffect(() =\> {

// Only fetch vitals if we are a patient, or a doctor viewing themselves/a patient

if (role === 'HOSPITAL_ADMIN') return;

const patientId = selectedPatient?.wallet_address \|\| selectedPatient?.email \|\| userData?.wallet_address \|\| userData?.email \|\| 'demo-patient';

let ws;

let reconnectTimer;

const connectWebSocket = () =\> {

const encodedId = encodeURIComponent(patientId);

const wsUrl = \`\${WS_BASE_URL}/ws/vitals/\${encodedId}\`;

ws = new WebSocket(wsUrl);

ws.onmessage = (event) =\> {

try {

const data = JSON.parse(event.data);

setLiveVitals({ hr: data.bpm, spo2: data.spo2, \_status: data.status });

} catch (e) {

console.error("Dashboard WebSocket error:", e);

}

};

ws.onclose = () =\> {

reconnectTimer = setTimeout(connectWebSocket, 3000); // Reconnect

};

};

connectWebSocket();

return () =\> {

clearTimeout(reconnectTimer);

if (ws) {

ws.onclose = null; // Prevent infinite reconnect loop on unmount

ws.close();

}

};

}, \[selectedPatient, userData, role\]);

if (loading) return (

\<div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Loading BioChain Node...

\</div\>

);

// --- COMPONENT: VITALS CARD (Reusable) ---

const VitalsWidget = ({ title, values }) =\> (

\<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"\>

\<div className={\`bg-\[#121620\] p-5 rounded-2xl border \${values.\_status === 'CRITICAL' && values.hr \> 100 ? 'border-rose-500/50 shadow-\[0_0_20px_rgba(244,63,94,0.15)\]' : 'border-slate-800'} shadow-lg relative overflow-hidden group transition-all duration-300\`}\>

\<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-rose-500"\>\<Heart size={60} /\>\</div\>

\<div className="flex items-center justify-between mb-2"\>

\<div className="flex items-center gap-2 text-rose-500"\>

\<Heart size={20} className={values.\_status === 'CRITICAL' && values.hr \> 100 ? "animate-ping absolute opacity-75" : "animate-pulse"} /\>

\<Heart size={20} className="relative" /\>

\<span className="text-xs font-bold uppercase tracking-wider"\>{title} Heart Rate\</span\>

\</div\>

{values.\_status === 'CRITICAL' && values.hr \> 100 && \<span className="text-\[9px\] bg-rose-500/20 text-rose-400 px-2 rounded-full font-bold uppercase animate-pulse"\>HIGH\</span\>}

\</div\>

\<h3 className={\`text-3xl font-bold \${values.\_status === 'CRITICAL' && values.hr \> 100 ? 'text-rose-400' : 'text-white'}\`}\>{values.hr} \<span className="text-sm text-slate-500 font-normal"\>bpm\</span\>\</h3\>

\</div\>

\<div className={\`bg-\[#121620\] p-5 rounded-2xl border \${values.\_status === 'CRITICAL' && values.spo2 \< 95 ? 'border-amber-500/50 shadow-\[0_0_20px_rgba(245,158,11,0.15)\]' : 'border-slate-800'} shadow-lg relative overflow-hidden group transition-all duration-300\`}\>

\<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-blue-500"\>\<Activity size={60} /\>\</div\>

\<div className="flex items-center justify-between mb-2"\>

\<div className="flex items-center gap-2 text-blue-500"\>

\<Activity size={20} /\>

\<span className="text-xs font-bold uppercase tracking-wider"\>{title} SpO2\</span\>

\</div\>

{values.\_status === 'CRITICAL' && values.spo2 \< 95 && \<span className="text-\[9px\] bg-amber-500/20 text-amber-400 px-2 rounded-full font-bold uppercase animate-pulse"\>LOW\</span\>}

\</div\>

\<h3 className={\`text-3xl font-bold \${values.\_status === 'CRITICAL' && values.spo2 \< 95 ? 'text-amber-400' : 'text-white'}\`}\>{values.spo2} \<span className="text-sm text-slate-500 font-normal"\>%\</span\>\</h3\>

\</div\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group"\>

\<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-cyan-500"\>\<Droplet size={60} /\>\</div\>

\<div className="flex items-center gap-2 text-cyan-500 mb-2"\>

\<Droplet size={20} /\>

\<span className="text-xs font-bold uppercase tracking-wider"\>{title} BP\</span\>

\</div\>

\<h3 className="text-3xl font-bold text-white"\>{values.bp}\</h3\>

\</div\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group"\>

\<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-500"\>\<Weight size={60} /\>\</div\>

\<div className="flex items-center gap-2 text-emerald-500 mb-2"\>

\<Weight size={20} /\>

\<span className="text-xs font-bold uppercase tracking-wider"\>{title} Weight\</span\>

\</div\>

\<h3 className="text-3xl font-bold text-white"\>{values.weight} \<span className="text-sm text-slate-500 font-normal"\>kg\</span\>\</h3\>

\</div\>

\</div\>

);

return (

\<div className="min-h-screen text-white"\>

\<div className="max-w-7xl mx-auto"\>

{/\* --- HEADER --- \*/}

\<div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6 print:hidden"\>

\<div className="flex items-center gap-4"\>

{selectedPatient ? (

\<button onClick={() =\> setSelectedPatient(null)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition"\>

\<ArrowLeft size={24} className="text-slate-200" /\>

\</button\>

) : (

\<div className={\`p-3 rounded-2xl \${role === 'DOCTOR' ? 'bg-blue-600/20 text-blue-400' : role === 'HOSPITAL_ADMIN' ? 'bg-purple-600/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}\`}\>

{role === 'DOCTOR' ? \<Stethoscope size={32} /\> : role === 'HOSPITAL_ADMIN' ? \<Building size={32} /\> : \<Activity size={32} /\>}

\</div\>

)}

\<div\>

{/\* DYNAMIC TITLE BASED ON ROLE \*/}

{role?.includes('DOCTOR') && !selectedPatient ? (

\<\>

\<h1 className="text-3xl font-bold text-white flex items-center gap-3"\>

Welcome back, {userData?.name?.replace(/^Dr\\\s\*/i, '') \|\| 'Doctor'}

{userData?.is_verified && (

\<div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full"\>

\<BadgeCheck className="text-blue-400" size={16} /\>

\<span className="text-xs font-bold text-blue-400 uppercase tracking-wider"\>Verified Identity\</span\>

\</div\>

)}

\</h1\>

\<p className="text-slate-400 text-sm mt-2"\>

Your medical node is fully synced and secured on-chain.

\</p\>

\</\>

) : (

\<\>

\<h1 className="text-3xl font-bold tracking-tight"\>

{selectedPatient ? \`Patient: \${selectedPatient.name}\` :

role === 'HOSPITAL_ADMIN' ? \`\${userData?.hospital_name \|\| 'Hospital Network'}\` :

userData?.name \|\| "Patient Profile"}

\</h1\>

\<p className="text-slate-400 text-sm"\>

{selectedPatient ? 'Viewing Live Clinical Data' :

role === 'HOSPITAL_ADMIN' ? 'Enterprise Node Control Center' :

'Manage your decentralized health ecosystem.'}

\</p\>

\</\>

)}

\</div\>

\</div\>

{role?.includes('DOCTOR') && !selectedPatient && (

\<div className="flex gap-3"\>

\<div className="relative"\>

\<Search className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input placeholder="Search Patient ID..." className="bg-\[#121620\] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 w-64 text-sm focus:border-blue-500 outline-none transition focus:ring-1 focus:ring-blue-500" /\>

\</div\>

\<button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-blue-900/20"\>

\<ClipboardPlus size={18} /\> New Record

\</button\>

\</div\>

)}

\</div\>

{/\* =========================================================

1\. ADMIN DASHBOARD (Only visible to HOSPITAL_ADMIN)

========================================================= \*/}

{role === 'HOSPITAL_ADMIN' && (

\<div className="space-y-8 print:hidden animate-fade-in-up"\>

{/\* --- ADMIN STAT CARDS (4-Grid) --- \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children"\>

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-purple-500/30"\>

\<div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/5 rounded-full group-hover:bg-purple-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between mb-4 relative z-10"\>

\<div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"\>\<Stethoscope size={22} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Clinical Staff\</span\>

\</div\>

\<h3 className="text-4xl font-bold text-white relative z-10"\>{data?.stats?.total_doctors \|\| '--'}\</h3\>

\<p className="text-xs text-purple-400 mt-2 font-medium"\>Registered doctors\</p\>

\</div\>

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-blue-500/30"\>

\<div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between mb-4 relative z-10"\>

\<div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"\>\<Users size={22} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Total Patients\</span\>

\</div\>

\<h3 className="text-4xl font-bold text-white relative z-10"\>{data?.stats?.total_patients \|\| '--'}\</h3\>

\<p className="text-xs text-blue-400 mt-2 font-medium"\>Mapped to your node\</p\>

\</div\>

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-emerald-500/30"\>

\<div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between mb-4 relative z-10"\>

\<div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400"\>\<Server size={22} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Node Status\</span\>

\</div\>

\<div className="flex items-center gap-2 mt-2 relative z-10"\>

\<div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-\[0_0_8px_rgba(16,185,129,0.6)\]"\>\</div\>

\<h3 className="text-xl font-bold text-emerald-400"\>Synced to Mainnet\</h3\>

\</div\>

\<p className="text-xs text-slate-500 mt-2 font-medium"\>All systems operational\</p\>

\</div\>

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group card-hover hover:border-amber-500/30"\>

\<div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/5 rounded-full group-hover:bg-amber-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between mb-4 relative z-10"\>

\<div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"\>\<Shield size={22} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Smart Contracts\</span\>

\</div\>

\<h3 className="text-4xl font-bold text-white relative z-10"\>{(data?.stats?.transactions \|\| 0).toLocaleString()}\</h3\>

\<p className="text-xs text-amber-400 mt-2 font-medium"\>Records on chain\</p\>

\</div\>

\</div\>

{/\* --- QUICK ACTIONS + RECENT ACTIVITY (2-Col) --- \*/}

\<div className="grid grid-cols-1 lg:grid-cols-2 gap-6"\>

{/\* Quick Actions \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white"\>

\<Stethoscope size={18} className="text-purple-400" /\> Quick Actions

\</h3\>

\<div className="space-y-3"\>

\<button

onClick={() =\> setActiveTab('Staff Directory')}

className="w-full bg-\[#0b0e14\] hover:bg-purple-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-purple-500/30"

\>

\<div className="flex items-center gap-3"\>

\<div className="bg-purple-500/15 p-2.5 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200"\>\<User size={18} /\>\</div\>

Register New Doctor

\</div\>

\<ChevronRight size={16} className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" /\>

\</button\>

\<button

onClick={() =\> setActiveTab('Audit Logs')}

className="w-full bg-\[#0b0e14\] hover:bg-blue-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-blue-500/30"

\>

\<div className="flex items-center gap-3"\>

\<div className="bg-blue-500/15 p-2.5 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200"\>\<FileText size={18} /\>\</div\>

View Audit Logs

\</div\>

\<ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" /\>

\</button\>

\<button

onClick={() =\> setActiveTab('Node Overview')}

className="w-full bg-\[#0b0e14\] hover:bg-emerald-900/20 p-4 rounded-xl flex items-center justify-between text-sm font-bold text-slate-300 transition-all duration-200 group border border-slate-800 hover:border-emerald-500/30"

\>

\<div className="flex items-center gap-3"\>

\<div className="bg-emerald-500/15 p-2.5 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200"\>\<Shield size={18} /\>\</div\>

Manage Smart Contracts

\</div\>

\<ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" /\>

\</button\>

\</div\>

\</div\>

{/\* Recent Network Activity \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white"\>

\<Activity size={18} className="text-emerald-400" /\> Network Activity

\</h3\>

\<div className="relative pl-6 border-l-2 border-slate-800 space-y-6"\>

{data?.activities?.map((act, idx) =\> (

\<div key={idx} className="relative"\>

\<div className={\`absolute -left-\[25px\] top-1 w-3 h-3 rounded-full border-2 border-\[#121620\] shadow-lg \${

act.type === 'system' ? 'bg-emerald-500 shadow-emerald-500/20' :

act.type === 'record' ? 'bg-blue-500 shadow-blue-500/20' :

act.type === 'contract' ? 'bg-amber-500 shadow-amber-500/20' :

'bg-purple-500 shadow-purple-500/20'

}\`}\>\</div\>

\<h4 className="text-sm font-bold text-white"\>{act.action}\</h4\>

\<p className="text-xs text-slate-500 mt-1"\>Network: BioChain Protocol\</p\>

\<p className="text-\[10px\] text-slate-600 font-mono mt-1"\>{act.time}\</p\>

\</div\>

))}

{!data?.activities && (

\<div className="relative"\>

\<div className="absolute -left-\[25px\] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-\[#121620\]"\>\</div\>

\<h4 className="text-sm font-bold text-white"\>Node Sync Completed\</h4\>

\<p className="text-xs text-slate-500 mt-1"\>All blockchain data synchronized\</p\>

\<p className="text-\[10px\] text-slate-600 font-mono mt-1"\>Just now\</p\>

\</div\>

)}

\</div\>

\</div\>

\</div\>

\</div\>

)}

{/\* =========================================================

2\. VITALS SECTION (Visible to Patient or when Doctor is viewing a Patient)

========================================================= \*/}

{role !== 'HOSPITAL_ADMIN' && (

\<div className="mb-8 print:hidden"\>

\<h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-2"\>

\<Activity size={16} /\> {selectedPatient ? "Patient Live Monitor" : "Live Personal Health Monitor"}

\</h3\>

{/\* Logic to determine WHICH vitals to show \*/}

\<VitalsWidget

title={selectedPatient ? "Patient" : "My"}

values={liveVitals ? { ...liveVitals, bp: "120/80", weight: 70 } : (

selectedPatient \|\| role === 'PATIENT' ?

{ hr: 72, spo2: 98, bp: "120/80", weight: 70 } :

{ hr: 65, spo2: 99, bp: "118/76", weight: 75 }

)}

/\>

\</div\>

)}

{/\* =========================================================

DOCTOR'S MAIN DASHBOARD (When NO patient is selected)

========================================================= \*/}

{role?.includes('DOCTOR') && !selectedPatient && (

\<div className="space-y-8 border-t border-slate-800 pt-8 print:hidden"\>

\<h3 className="text-xl font-bold text-white flex items-center gap-2"\>

\<Shield size={24} className="text-blue-400" /\> Clinical Workspace

\</h3\>

{/\* HOSPITAL STATS \*/}

\<div className="grid grid-cols-1 md:grid-cols-4 gap-4"\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden"\>

\<div className="flex justify-between mb-4"\>

\<div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"\>\<Users size={20} /\>\</div\>

\<span className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Total Patients\</span\>

\</div\>

\<h3 className="text-3xl font-bold"\>1,248\</h3\>

\</div\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden"\>

\<div className="flex justify-between mb-4"\>

\<div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 animate-pulse"\>\<AlertOctagon size={20} /\>\</div\>

\<span className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Critical Alerts\</span\>

\</div\>

\<h3 className="text-3xl font-bold text-white"\>3\</h3\>

\</div\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden"\>

\<div className="flex justify-between mb-4"\>

\<div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"\>\<ClipboardPlus size={20} /\>\</div\>

\<span className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Pending Reports\</span\>

\</div\>

\<h3 className="text-3xl font-bold text-white"\>14\</h3\>

\</div\>

\<div className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden"\>

\<div className="flex justify-between mb-4"\>

\<div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"\>\<Zap size={20} /\>\</div\>

\<span className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Node Status\</span\>

\</div\>

\<h3 className="text-lg font-bold text-emerald-400"\>Synced\</h3\>

\</div\>

\</div\>

{/\* --- 3. DOCTOR'S QUEUE (Dynamic Appointments) --- \*/}

\<div className="space-y-8 mt-8"\>

{/\* Section A: Pending Requests (Needs Action) \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-yellow-500/30 shadow-xl"\>

\<h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"\>

\<Clock size={18} className="text-yellow-400" /\> Pending Consultation Requests

\</h3\>

\<div className="space-y-4"\>

{appointments.filter(a =\> a.status === 'Pending').length \> 0 ? (

appointments.filter(a =\> a.status === 'Pending').map((app) =\> (

\<div key={app.\_id} className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-500/20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition hover:bg-yellow-500/10"\>

\<div\>

\<h4 className="font-bold text-white text-lg"\>{app.patient_name}\</h4\>

\<p className="text-sm text-slate-400 mt-1"\>Reason: \<span className="italic text-slate-300"\>"{app.reason}"\</span\>\</p\>

\</div\>

{/\* Approval Controls \*/}

\<div className="flex flex-wrap items-center gap-3 bg-\[#0b0e14\] p-2 rounded-xl border border-slate-800"\>

\<input

type="date"

className="bg-transparent text-sm text-white outline-none border-r border-slate-700 pr-3 cursor-pointer \[&::-webkit-calendar-picker-indicator\]:filter \[&::-webkit-calendar-picker-indicator\]:invert"

onChange={(e) =\> setApprovalInputs({...approvalInputs, \[app.\_id\]: {...approvalInputs\[app.\_id\], date: e.target.value}})}

/\>

\<input

type="time"

className="bg-transparent text-sm text-white outline-none border-r border-slate-700 pr-3 cursor-pointer \[&::-webkit-calendar-picker-indicator\]:filter \[&::-webkit-calendar-picker-indicator\]:invert"

onChange={(e) =\> setApprovalInputs({...approvalInputs, \[app.\_id\]: {...approvalInputs\[app.\_id\], time: e.target.value}})}

/\>

\<button

onClick={() =\> handleApprove(app.\_id)}

className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"

\>

\<CheckCircle size={14} /\> Approve

\</button\>

\</div\>

\</div\>

))

) : (

\<p className="text-sm text-slate-500 italic p-4 text-center"\>No pending requests right now.\</p\>

)}

\</div\>

\</div\>

{/\* Section B: Scheduled Appointments (Approved) \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"\>

\<CheckCircle size={18} className="text-emerald-400" /\> Scheduled Appointments

\</h3\>

\<div className="grid grid-cols-1 md:grid-cols-2 gap-4"\>

{appointments.filter(a =\> a.status === 'Scheduled').length \> 0 ? (

appointments.filter(a =\> a.status === 'Scheduled').map((app) =\> (

\<div key={app.\_id} className="bg-\[#0b0e14\] p-5 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-blue-500/30 transition"\>

\<div className="flex items-center gap-4"\>

\<div className="w-12 h-12 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center font-bold border border-blue-500/20"\>

{app.patient_name.substring(0, 2).toUpperCase()}

\</div\>

\<div\>

\<h4 className="font-bold text-white"\>{app.patient_name}\</h4\>

\<p className="text-xs text-emerald-400 font-medium mt-1"\>

{app.appointment_date} at {app.appointment_time}

\</p\>

\</div\>

\</div\>

\<button

onClick={() =\> setSelectedPatient({ name: app.patient_name, email: app.patient_email })}

className="bg-slate-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition opacity-0 group-hover:opacity-100 shadow-lg"

\>

Open Profile

\</button\>

\</div\>

))

) : (

\<div className="col-span-full text-center p-8 border border-slate-800 border-dashed rounded-2xl"\>

\<p className="text-sm text-slate-500"\>You don't have any scheduled appointments.\</p\>

\</div\>

)}

\</div\>

\</div\>

\</div\>

\</div\>

)}

{/\* =========================================================

PATIENT DETAIL VIEW (MAIN CARD) - FOR PATIENTS ONLY

========================================================= \*/}

{role === 'PATIENT' && data && (

\<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 border-t border-slate-800 pt-8 print:hidden"\>

\<motion.div className="lg:col-span-2 bg-\[#121620\] rounded-3xl p-8 border border-slate-800 shadow-xl"\>

\<div className="flex justify-between items-start mb-8"\>

\<div\>

\<h2 className="text-3xl font-bold text-white mb-1"\>{userData?.name \|\| "Patient"}\</h2\>

\<div className="flex items-center gap-2 text-slate-500 text-xs font-mono bg-black/20 px-2 py-1 rounded w-fit border border-slate-800/50"\>

\<Shield size={12} className="text-emerald-500" /\>

{userData?.idHash ? (

\<span className="text-\[10px\] tracking-tight"\>

{userData.idHash.substring(0, 10)}...{userData.idHash.substring(userData.idHash.length - 8)}

\</span\>

) : (

\<span className="text-\[10px\] opacity-50 underline decoration-dotted"\>PENDING_SYNC\</span\>

)}

\</div\>

\</div\>

\<span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20 shadow-\[0_0_10px_rgba(16,185,129,0.2)\]"\>

MY HEALTH PROFILE

\</span\>

\</div\>

\<div className="grid grid-cols-2 md:grid-cols-4 gap-3"\>

\<div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50"\>

\<div className="text-rose-400 text-\[10px\] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"\>\<Heart size={12} /\> Blood\</div\>

\<p className="text-xl font-black text-white"\>{userData?.bloodGroup \|\| "N/A"}\</p\>

\</div\>

\<div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50"\>

\<div className="text-amber-400 text-\[10px\] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"\>\<FileText size={12} /\> Allergies\</div\>

\<p className="text-sm font-bold text-white truncate"\>{userData?.allergies \|\| "None"}\</p\>

\</div\>

\<div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50"\>

\<div className="text-emerald-400 text-\[10px\] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"\>\<Phone size={12} /\> Mobile\</div\>

\<p className="text-sm font-bold text-white tracking-tighter"\>{userData?.phone \|\| "N/A"}\</p\>

\</div\>

\<div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50"\>

\<div className="text-blue-400 text-\[10px\] font-bold uppercase mb-1 flex items-center gap-2 tracking-wider"\>\<Phone size={12} /\> Emergency\</div\>

\<p className="text-sm font-bold text-white tracking-tighter break-all"\>{userData?.emergencyContact \|\| "N/A"}\</p\>

\</div\>

\</div\>

\</motion.div\>

\<motion.div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2"\>

\<Activity size={16} className="text-emerald-500" /\> Recent Activity

\</h3\>

\<div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-slate-800"\>

\<div className="relative pl-8"\>

\<div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-\[#121620\]"\>\</div\>

\<p className="text-sm font-bold text-white"\>Vitals Synced\</p\>

\<p className="text-xs text-slate-500 mt-0.5"\>Automated IoT Check via BioHub\</p\>

\<p className="text-\[10px\] text-slate-600 font-mono mt-1"\>2 mins ago\</p\>

\</div\>

\</div\>

\</motion.div\>

\</div\>

)}

{/\* --- 4. DOCTOR VIEWING PATIENT (The Missing Grid!) --- \*/}

{role?.includes('DOCTOR') && selectedPatient && (

\<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 border-t border-slate-800 pt-8 print:hidden"\>

{/\* Profile Info \*/}

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden"\>

\<h3 className="text-2xl font-bold text-white mb-1"\>{selectedPatient.name}\</h3\>

\<p className="text-xs text-emerald-500 font-mono mb-6 flex items-center gap-1"\>

\<Shield size={12}/\> ACTIVE PATIENT

\</p\>

\<div className="grid grid-cols-2 gap-4"\>

\<div className="bg-\[#0b0e14\] p-3 rounded-xl border border-slate-800"\>

\<p className="text-\[10px\] text-rose-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"\>\<Heart size={12}/\> Blood Type\</p\>

\<p className="font-bold text-white"\>{patientProfile?.bloodGroup \|\| selectedPatient?.bloodGroup \|\| "N/A"}\</p\>

\</div\>

\<div className="bg-\[#0b0e14\] p-3 rounded-xl border border-slate-800"\>

\<p className="text-\[10px\] text-yellow-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"\>\<AlertOctagon size={12}/\> Allergies\</p\>

\<p className="font-bold text-white"\>{patientProfile?.allergies \|\| selectedPatient?.allergies \|\| "None"}\</p\>

\</div\>

\</div\>

\</div\>

{/\* Quick Actions (Issue Rx) \*/}

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"\>

\<Zap size={18} className="text-yellow-400" /\> Quick Actions

\</h3\>

\<div className="space-y-3"\>

\<button

onClick={() =\> setIsRecordModalOpen(true)}

className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-xl flex items-center gap-3 text-sm font-bold text-white transition shadow-lg shadow-blue-900/20 group"

\>

\<FileText size={20} className="group-hover:scale-110 transition-transform" /\>

Issue Medical Record (Rx)

\</button\>

\<button className="w-full bg-slate-800 p-4 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-400 cursor-not-allowed border border-slate-700"\>

\<Stethoscope size={20} /\> Request Lab Test

\</button\>

\</div\>

\</div\>

{/\* Recent Activity \*/}

\<div className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 shadow-xl"\>

\<h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"\>

\<Activity size={16} /\> Recent Activity

\</h3\>

\<div className="relative pl-4 border-l-2 border-slate-800 space-y-6"\>

\<div className="relative"\>

\<div className="absolute -left-\[21px\] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-\[#121620\]"\>\</div\>

\<h4 className="text-sm font-bold text-white"\>Vitals Synced\</h4\>

\<p className="text-xs text-slate-500 mt-1"\>Automated IoT Check via BioHub\</p\>

\<p className="text-\[10px\] text-slate-600 mt-1"\>Just now\</p\>

\</div\>

\</div\>

\</div\>

\</div\>

)}

{/\* --- 5. PATIENT CLINICAL HISTORY (NEW) --- \*/}

{role?.includes('DOCTOR') && selectedPatient && (

\<div className="mt-8 bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl print:hidden"\>

\<h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"\>

\<FileText size={20} className="text-blue-400" /\> Patient Clinical History

\</h3\>

\<div className="overflow-x-auto"\>

\<table className="w-full text-left border-collapse"\>

\<thead\>

\<tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider"\>

\<th className="pb-3 px-4"\>Date\</th\>

\<th className="pb-3 px-4"\>Record Title\</th\>

\<th className="pb-3 px-4"\>Source / Issued By\</th\>

\<th className="pb-3 px-4 text-center"\>Web3 Action\</th\>

\</tr\>

\</thead\>

\<tbody className="text-sm"\>

{patientRecords.length === 0 ? (

\<tr\>

\<td colSpan="4" className="py-8 text-center text-slate-500"\>

No clinical history found for this patient.

\</td\>

\</tr\>

) : (

patientRecords.map((record) =\> (

\<tr key={record.\_id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition"\>

\<td className="py-4 px-4 text-slate-300"\>

{new Date(record.timestamp).toLocaleDateString()}

\</td\>

\<td className="py-4 px-4 font-bold text-white"\>{record.title}\</td\>

\<td className="py-4 px-4 text-slate-400"\>

{record.isSelfUploaded ? (

\<span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-\[10px\] font-bold uppercase tracking-wider"\>

Self-Added

\</span\>

) : (

\<span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-\[10px\] font-bold uppercase tracking-wider flex items-center gap-1 w-max"\>

\<Shield size={10}/\> {record.doctor_name

? (record.doctor_name.includes('Dr.') ? record.doctor_name : \`Dr. \${record.doctor_name}\`)

: \`Dr. \${record.doctor_wallet?.substring(0, 6)}...\`}

\</span\>

)}

\</td\>

\<td className="py-4 px-4 text-center"\>

\<button

onClick={() =\> setSelectedHistoryRecord({

title: record.title,

date: new Date(record.timestamp).toLocaleDateString(),

source: record.isSelfUploaded

? "Self-Added"

: (record.doctor_name

? (record.doctor_name.includes('Dr.') ? record.doctor_name : \`Dr. \${record.doctor_name}\`)

: \`Dr. \${record.doctor_wallet?.substring(0, 6)}...\`),

hospital: record.hospital_name,

diagnosis: record.diagnosis,

ipfs_hashes: record.ipfs_hashes \|\| (record.ipfs_hash ? \[record.ipfs_hash\] : \[\]) // Handle both new array and old single string

})}

className="text-slate-300 hover:text-white font-bold text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"

\>

Details

\</button\>

\</td\>

\</tr\>

))

)}

\</tbody\>

\</table\>

\</div\>

\</div\>

)}

{/\* --- ISSUE RX MODAL --- \*/}

{role?.includes('DOCTOR') && selectedPatient && (

\<IssueRecordModal

isOpen={isRecordModalOpen}

onClose={() =\> setIsRecordModalOpen(false)}

patient={selectedPatient}

doctorData={userData}

onSuccess={fetchPatientRecords}

/\>

)}

{/\* --- EXTENDED RECORD VIEW MODAL --- \*/}

{selectedHistoryRecord && (

\<div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-8 print:static print:overflow-visible print:bg-white print:p-0"\>

\<div className="flex min-h-full items-start justify-center print:block print:min-h-0"\>

\<div className="bg-\[#121620\] print:bg-white border border-slate-700 print:border-none w-full max-w-3xl rounded-3xl p-8 shadow-2xl print:p-0 print:shadow-none relative mt-4 mb-10 print:m-0"\>

\<button onClick={() =\> setSelectedHistoryRecord(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition"\>

\<X size={24} /\>

\</button\>

\<div\>

\<div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-6"\>

\<div\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-2"\>

\<Activity className="text-emerald-500" /\> BioChain Medical Record

\</h2\>

\</div\>

\<div className="text-right"\>

\<p className="text-sm font-bold text-white"\>{selectedHistoryRecord.hospital}\</p\>

\<p className="text-xs text-slate-500"\>{selectedHistoryRecord.date}\</p\>

\</div\>

\</div\>

\<div className="mb-6"\>

\<h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"\>Record Title\</h4\>

\<p className="text-lg font-bold text-white"\>{selectedHistoryRecord.title}\</p\>

\</div\>

\<div className="mb-8"\>

\<h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"\>Clinical Notes\</h4\>

\<div className="bg-\[#0b0e14\] p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap"\>

{selectedHistoryRecord.diagnosis}

\</div\>

\</div\>

{/\* ATTACHED DOCUMENTS SECTION \*/}

{selectedHistoryRecord.ipfs_hashes && selectedHistoryRecord.ipfs_hashes.length \> 0 && (

\<div className="mb-8 border-t border-slate-800 pt-6"\>

\<h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"\>

\<FileText size={16} className="text-blue-400"/\> Attached Documents ({selectedHistoryRecord.ipfs_hashes.length})

\</h4\>

\<div className="space-y-6"\>

{selectedHistoryRecord.ipfs_hashes.map((hash, idx) =\> (

\<div key={idx} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900/50"\>

\<div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center border-b border-slate-700"\>

\<span className="text-xs font-bold text-slate-400"\>Document {idx + 1}\</span\>

\<a

href={\`https://ipfs.io/ipfs/\${hash}\`}

target="\_blank"

rel="noopener noreferrer"

className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"

\>

Open Full Screen \<ChevronRight size={14} /\>

\</a\>

\</div\>

\<div className="h-96 w-full relative group bg-\[#0b0e14\]"\>

{/\* Loading/Fallback Layer \*/}

\<div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2 z-0"\>

\<Activity className="animate-spin text-blue-500" /\>

\<span className="text-xs font-bold"\>Loading from IPFS...\</span\>

\</div\>

{/\* Attempt to load as an image first. If it fails (e.g., PDF), the onError handler hides it,

and the iframe behind it becomes visible. We use object-cover/contain to fit the image perfectly. \*/}

\<div className="absolute inset-0 z-10 flex items-center justify-center p-2"\>

\<iframe

src={\`https://ipfs.io/ipfs/\${hash}\`}

className="w-full h-full border-none"

style={{ backgroundColor: 'transparent' }}

title={\`Medical Document \${idx + 1} Fallback\`}

/\>

{/\* We place the img on top. If it's a valid image, it covers the iframe. If not, it's hidden. \*/}

\<img

src={\`https://ipfs.io/ipfs/\${hash}\`}

alt={\`Medical Document \${idx + 1}\`}

className="absolute inset-0 w-full h-full object-contain bg-\[#0b0e14\] z-20"

onError={(e) =\> {

e.target.style.display = 'none'; // Hide img if it's a PDF/unsupported

}}

/\>

\</div\>

{/\* Full Screen View Button Overlay \*/}

\<a href={\`https://ipfs.io/ipfs/\${hash}\`} target="\_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition shadow-lg z-30 flex items-center gap-2"\>

Open Full Screen \<ChevronRight size={16} /\>

\</a\>

\</div\>

\</div\>

))}

\</div\>

\</div\>

)}

\<div className="flex justify-between items-end border-t border-slate-800 pt-6"\>

\<div\>

\<h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"\>Source\</h4\>

\<p className="text-sm font-bold text-white"\>{selectedHistoryRecord.source}\</p\>

\</div\>

\</div\>

\</div\>

\</div\>

\</div\>

\</div\>

)}

\</div\>

\</div\>

);

}

export default Dashboard;

## 28. frontend/src/PatientList.jsx

import { useState } from 'react';

import { Search, Filter, MoreHorizontal, FileText, Activity, Shield } from 'lucide-react';

const PatientList = () =\> {

const \[searchTerm, setSearchTerm\] = useState('');

// --- MOCK DATABASE (Simulating the Blockchain) ---

const allPatients = \[

{ id: "0xe94...2266", name: "Yash Vijay Singh", age: 24, blood: "B+", status: "Active", lastVisit: "Today" },

{ id: "0x42a...9912", name: "John Smith", age: 32, blood: "O-", status: "Critical", lastVisit: "2 days ago" },

{ id: "0x12c...8841", name: "Sarah Connor", age: 35, blood: "A+", status: "Discharged", lastVisit: "1 month ago" },

{ id: "0x77b...1120", name: "Tony Stark", age: 48, blood: "AB+", status: "Active", lastVisit: "Yesterday" },

{ id: "0x99a...3311", name: "Steve Rogers", age: 98, blood: "O+", status: "In-Patient", lastVisit: "Ongoing" },

{ id: "0x88c...2214", name: "Bruce Banner", age: 42, blood: "O+", status: "Active", lastVisit: "1 week ago" },

\];

// Filter Logic

const filteredPatients = allPatients.filter(patient =\>

patient.name.toLowerCase().includes(searchTerm.toLowerCase()) \|\|

patient.id.toLowerCase().includes(searchTerm.toLowerCase())

);

return (

\<div className="text-white"\>

{/\* --- SEARCH HEADER --- \*/}

\<div className="flex justify-between items-center mb-8"\>

\<div\>

\<h2 className="text-2xl font-bold"\>Patient Directory\</h2\>

\<p className="text-slate-400 text-sm"\>Total Registered: {allPatients.length}\</p\>

\</div\>

\<div className="flex gap-3"\>

\<div className="relative"\>

\<Search className="absolute left-3 top-3 text-slate-500" size={18} /\>

\<input

type="text"

placeholder="Search Name or Wallet ID..."

className="bg-\[#121620\] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 w-72 text-sm focus:border-emerald-500 outline-none text-slate-200"

onChange={(e) =\> setSearchTerm(e.target.value)}

/\>

\</div\>

\<button className="bg-\[#121620\] border border-slate-700 p-2.5 rounded-xl hover:bg-slate-800 text-slate-400"\>

\<Filter size={18} /\>

\</button\>

\</div\>

\</div\>

{/\* --- PATIENT GRID --- \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"\>

{filteredPatients.map((patient) =\> (

\<div key={patient.id} className="bg-\[#121620\] p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition group cursor-pointer relative overflow-hidden"\>

{/\* Status Badge \*/}

\<div className={\`absolute top-4 right-4 text-\[10px\] px-2 py-0.5 rounded uppercase font-bold border \${patient.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :

patient.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :

'bg-slate-700/30 text-slate-400 border-slate-600'

}\`}\>

{patient.status}

\</div\>

\<div className="flex items-center gap-4 mb-6"\>

\<div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-bold border border-slate-600 shadow-inner"\>

{patient.name.charAt(0)}{patient.name.split(' ')\[1\]?.charAt(0)}

\</div\>

\<div\>

\<h3 className="font-bold text-lg leading-tight group-hover:text-emerald-400 transition"\>{patient.name}\</h3\>

\<p className="text-xs text-slate-500 font-mono"\>{patient.id.substring(0, 10)}...\</p\>

\</div\>

\</div\>

\<div className="grid grid-cols-2 gap-4 mb-6"\>

\<div className="bg-black/20 p-2 rounded-lg"\>

\<p className="text-\[10px\] text-slate-500 uppercase font-bold"\>Age\</p\>

\<p className="text-sm font-semibold"\>{patient.age} yrs\</p\>

\</div\>

\<div className="bg-black/20 p-2 rounded-lg"\>

\<p className="text-\[10px\] text-slate-500 uppercase font-bold"\>Blood\</p\>

\<p className="text-sm font-semibold"\>{patient.blood}\</p\>

\</div\>

\</div\>

\<div className="flex gap-2"\>

\<button className="flex-1 bg-slate-800 hover:bg-emerald-600 hover:text-white py-2 rounded-lg text-xs font-bold text-slate-300 transition flex items-center justify-center gap-2"\>

\<FileText size={14} /\> View Record

\</button\>

\<button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-400"\>

\<MoreHorizontal size={16} /\>

\</button\>

\</div\>

\</div\>

))}

\</div\>

\</div\>

);

};

export default PatientList;

## 29. frontend/src/index.css

@import "tailwindcss";

/\* ========== BioChainAI Design System ========== \*/

/\* --- Global Reset & Defaults --- \*/

\*,

\*::before,

\*::after {

box-sizing: border-box;

}

html {

scroll-behavior: smooth;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

body {

background-color: \#0b0e14;

color: \#cbd5e1;

font-family: 'Inter', system-ui, -apple-system, sans-serif;

line-height: 1.6;

overflow-x: hidden;

}

/\* --- Selection Colors --- \*/

::selection {

background-color: rgba(16, 185, 129, 0.3);

color: \#fff;

}

/\* --- Custom Scrollbar (Dark Theme) --- \*/

.custom-scrollbar::-webkit-scrollbar {

width: 6px;

height: 6px;

}

.custom-scrollbar::-webkit-scrollbar-track {

background: transparent;

}

.custom-scrollbar::-webkit-scrollbar-thumb {

background: \#334155;

border-radius: 999px;

}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {

background: \#475569;

}

/\* Global scrollbar for body \*/

::-webkit-scrollbar {

width: 8px;

}

::-webkit-scrollbar-track {

background: \#0b0e14;

}

::-webkit-scrollbar-thumb {

background: \#1e293b;

border-radius: 999px;

}

::-webkit-scrollbar-thumb:hover {

background: \#334155;

}

/\* --- Keyframe Animations --- \*/

@keyframes fade-in-up {

from {

opacity: 0;

transform: translateY(16px);

}

to {

opacity: 1;

transform: translateY(0);

}

}

@keyframes fade-in {

from { opacity: 0; }

to { opacity: 1; }

}

@keyframes slide-in-right {

from {

opacity: 0;

transform: translateX(20px);

}

to {

opacity: 1;

transform: translateX(0);

}

}

@keyframes pulse-glow {

0%, 100% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.15); }

50% { box-shadow: 0 0 24px rgba(16, 185, 129, 0.35); }

}

@keyframes shimmer {

0% { background-position: -200% 0; }

100% { background-position: 200% 0; }

}

/\* --- Animation Utility Classes --- \*/

.animate-fade-in-up {

animation: fade-in-up 0.5s ease-out;

}

.animate-fade-in {

animation: fade-in 0.4s ease-out;

}

.animate-slide-in-right {

animation: slide-in-right 0.4s ease-out;

}

.animate-pulse-glow {

animation: pulse-glow 2s ease-in-out infinite;

}

/\* Staggered children animation \*/

.stagger-children \> \*:nth-child(1) { animation-delay: 0.05s; }

.stagger-children \> \*:nth-child(2) { animation-delay: 0.1s; }

.stagger-children \> \*:nth-child(3) { animation-delay: 0.15s; }

.stagger-children \> \*:nth-child(4) { animation-delay: 0.2s; }

.stagger-children \> \*:nth-child(5) { animation-delay: 0.25s; }

.stagger-children \> \*:nth-child(6) { animation-delay: 0.3s; }

/\* --- Card Hover Effects --- \*/

.card-hover {

transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

}

.card-hover:hover {

transform: translateY(-2px);

box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

}

/\* --- Glassmorphism --- \*/

.glass {

background: rgba(18, 22, 32, 0.7);

-webkit-backdrop-filter: blur(12px);

backdrop-filter: blur(12px);

}

/\* --- Gradient Text --- \*/

.gradient-text-emerald {

background: linear-gradient(135deg, \#10b981, \#06b6d4);

-webkit-background-clip: text;

-webkit-text-fill-color: transparent;

background-clip: text;

}

.gradient-text-purple {

background: linear-gradient(135deg, \#a855f7, \#ec4899);

-webkit-background-clip: text;

-webkit-text-fill-color: transparent;

background-clip: text;

}

.gradient-text-blue {

background: linear-gradient(135deg, \#3b82f6, \#8b5cf6);

-webkit-background-clip: text;

-webkit-text-fill-color: transparent;

background-clip: text;

}

/\* --- Print Styles --- \*/

@media print {

body {

background-color: white !important;

color: black !important;

}

.print\\:hidden {

display: none !important;

}

}

## 30. frontend/src/App.css

/\* BioChainAI Core Styles \*/

\#root {

width: 100%;

min-height: 100vh;

}

## 31. frontend/src/BioChain.json

{

"\_format": "hh-sol-artifact-1",

"contractName": "BioChainNetwork",

"sourceName": "contracts/BioChaincontract.sol",

"abi": \[

{

"inputs": \[\],

"stateMutability": "nonpayable",

"type": "constructor"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "hospital",

"type": "address"

},

{

"indexed": false,

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"name": "DoctorStatusChanged",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "admin",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "name",

"type": "string"

}

\],

"name": "HospitalRegistered",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "name",

"type": "string"

},

{

"indexed": false,

"internalType": "string",

"name": "idHash",

"type": "string"

}

\],

"name": "PatientRegistered",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

}

\],

"name": "PrescriptionIssued",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "uint256",

"name": "recordId",

"type": "uint256"

},

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

}

\],

"name": "RecordAdded",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "from",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "to",

"type": "address"

}

\],

"name": "ReferralCreated",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "severity",

"type": "string"

},

{

"indexed": false,

"internalType": "uint256",

"name": "time",

"type": "uint256"

}

\],

"name": "SOSAlert",

"type": "event"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_wallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_license",

"type": "string"

},

{

"internalType": "string",

"name": "\_spec",

"type": "string"

}

\],

"name": "addDoctor",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_hash",

"type": "string"

},

{

"internalType": "string",

"name": "\_type",

"type": "string"

},

{

"internalType": "string",

"name": "\_cat",

"type": "string"

},

{

"internalType": "string",

"name": "\_notes",

"type": "string"

}

\],

"name": "addMedicalRecord",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "allRecords",

"outputs": \[

{

"internalType": "uint256",

"name": "id",

"type": "uint256"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "string",

"name": "recordType",

"type": "string"

},

{

"internalType": "string",

"name": "category",

"type": "string"

},

{

"internalType": "string",

"name": "notes",

"type": "string"

},

{

"internalType": "address",

"name": "addedBy",

"type": "address"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "authorizedRelayers",

"outputs": \[

{

"internalType": "bool",

"name": "",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "doctors",

"outputs": \[

{

"internalType": "address",

"name": "hospitalAdmin",

"type": "address"

},

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "licenseId",

"type": "string"

},

{

"internalType": "string",

"name": "specialization",

"type": "string"

},

{

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

}

\],

"name": "getPatientRecords",

"outputs": \[

{

"internalType": "uint256\[\]",

"name": "",

"type": "uint256\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

}

\],

"name": "getPrescriptions",

"outputs": \[

{

"components": \[

{

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"internalType": "string",

"name": "diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Prescription\[\]",

"name": "",

"type": "tuple\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

}

\],

"name": "getProfile",

"outputs": \[

{

"components": \[

{

"internalType": "string",

"name": "bloodType",

"type": "string"

},

{

"internalType": "string",

"name": "allergies",

"type": "string"

},

{

"internalType": "string",

"name": "emergencyContact",

"type": "string"

},

{

"internalType": "string",

"name": "profileHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "lastUpdated",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.MedicalProfile",

"name": "",

"type": "tuple"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "uint256",

"name": "\_id",

"type": "uint256"

}

\],

"name": "getRecord",

"outputs": \[

{

"components": \[

{

"internalType": "uint256",

"name": "id",

"type": "uint256"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "string",

"name": "recordType",

"type": "string"

},

{

"internalType": "string",

"name": "category",

"type": "string"

},

{

"internalType": "string",

"name": "notes",

"type": "string"

},

{

"internalType": "address",

"name": "addedBy",

"type": "address"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Record",

"name": "",

"type": "tuple"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

}

\],

"name": "getReferrals",

"outputs": \[

{

"components": \[

{

"internalType": "address",

"name": "referrer",

"type": "address"

},

{

"internalType": "address",

"name": "targetDoctor",

"type": "address"

},

{

"internalType": "string",

"name": "reason",

"type": "string"

},

{

"internalType": "bool",

"name": "active",

"type": "bool"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Referral\[\]",

"name": "",

"type": "tuple\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_doctor",

"type": "address"

}

\],

"name": "grantAccess",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "hasAccess",

"outputs": \[

{

"internalType": "bool",

"name": "",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "hospitals",

"outputs": \[

{

"internalType": "address",

"name": "adminWallet",

"type": "address"

},

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "registrationNumber",

"type": "string"

},

{

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

},

{

"internalType": "string",

"name": "\_diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "\_ipfsHash",

"type": "string"

}

\],

"name": "issuePrescription",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "patientPrescriptions",

"outputs": \[

{

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"internalType": "string",

"name": "diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "patientReferrals",

"outputs": \[

{

"internalType": "address",

"name": "referrer",

"type": "address"

},

{

"internalType": "address",

"name": "targetDoctor",

"type": "address"

},

{

"internalType": "string",

"name": "reason",

"type": "string"

},

{

"internalType": "bool",

"name": "active",

"type": "bool"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "patients",

"outputs": \[

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "identityHash",

"type": "string"

},

{

"components": \[

{

"internalType": "string",

"name": "bloodType",

"type": "string"

},

{

"internalType": "string",

"name": "allergies",

"type": "string"

},

{

"internalType": "string",

"name": "emergencyContact",

"type": "string"

},

{

"internalType": "string",

"name": "profileHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "lastUpdated",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.MedicalProfile",

"name": "profile",

"type": "tuple"

},

{

"internalType": "bool",

"name": "exists",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "address",

"name": "\_targetDoc",

"type": "address"

},

{

"internalType": "string",

"name": "\_reason",

"type": "string"

}

\],

"name": "referPatient",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_adminWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_regNumber",

"type": "string"

}

\],

"name": "registerHospital",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_idHash",

"type": "string"

},

{

"internalType": "string",

"name": "\_blood",

"type": "string"

},

{

"internalType": "string",

"name": "\_allergies",

"type": "string"

},

{

"internalType": "string",

"name": "\_emergency",

"type": "string"

},

{

"internalType": "string",

"name": "\_pHash",

"type": "string"

}

\],

"name": "registerPatient",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_doctor",

"type": "address"

}

\],

"name": "revokeAccess",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "roles",

"outputs": \[

{

"internalType": "enum BioChainNetwork.Role",

"name": "",

"type": "uint8"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_relayer",

"type": "address"

},

{

"internalType": "bool",

"name": "\_status",

"type": "bool"

}

\],

"name": "setRelayer",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[\],

"name": "superAdmin",

"outputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "string",

"name": "\_severity",

"type": "string"

}

\],

"name": "triggerSOS",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

}

\],

"bytecode": "0x60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506004600660008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690836004811115620000d957620000d8620000eb565b5b0217905550600180819055506200011a565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b614f94806200012a6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c806341a0894d116100de5780639940c2c011610097578063d428015911610071578063d4280159146104ca578063ecd8dc3a146104e6578063f093cf8014610502578063f8f3f3821461053557610173565b80639940c2c01461045e578063a9583c221461047a578063afbf6a7b146104ae57610173565b806341a0894d1461035d57806349d41e831461038d578063733ba56d146103a95780637e257dc8146103dc57806385e6853114610412578063993746421461042e57610173565b806312c214721161013057806312c21472146102775780631709ef071461029357806318bd4847146102c357806329575f6a146102f357806329e295c51461031157806337b7f4f51461034157610173565b806303e9e60914610178578063078918f1146101a85780630869cfbc146101dc5780630ae5e7391461020f5780630f53a4701461022b57806310be6c331461025b575b600080fd5b610192600480360381019061018d91906136ee565b610565565b60405161019f91906138ac565b60405180910390f35b6101c260048036038101906101bd91906138fa565b610844565b6040516101d39594939291906139bd565b60405180910390f35b6101f660048036038101906101f19190613a17565b61096c565b6040516102069493929190613acf565b60405180910390f35b61022960048036038101906102249190613a17565b610d15565b005b61024560048036038101906102409190613a17565b610e3c565b6040516102529190613b29565b60405180910390f35b61027560048036038101906102709190613c80565b6110ea565b005b610291600480360381019061028c9190613d3b565b6113f4565b005b6102ad60048036038101906102a89190613dc6565b611745565b6040516102ba9190613e06565b60405180910390f35b6102dd60048036038101906102d89190613a17565b611774565b6040516102ea9190613ed0565b60405180910390f35b6102fb61180e565b6040516103089190613ef2565b60405180910390f35b61032b60048036038101906103269190613a17565b611832565b6040516103389190613e06565b60405180910390f35b61035b60048036038101906103569190613f0d565b611852565b005b61037760048036038101906103729190613a17565b611bf6565b604051610384919061419e565b60405180910390f35b6103a760048036038101906103a29190613d3b565b611df7565b005b6103c360048036038101906103be91906138fa565b6120df565b6040516103d394939291906141c0565b60405180910390f35b6103f660048036038101906103f191906136ee565b61225c565b6040516104099796959493929190614213565b60405180910390f35b61042c60048036038101906104279190613a17565b6124de565b005b61044860048036038101906104439190613a17565b612576565b6040516104559190614315565b60405180910390f35b61047860048036038101906104739190614330565b612596565b005b610494600480360381019061048f9190613a17565b612678565b6040516104a5959493929190614379565b60405180910390f35b6104c860048036038101906104c391906143e1565b612873565b005b6104e460048036038101906104df91906144cc565b612c44565b005b61050060048036038101906104fb9190614567565b613140565b005b61051c60048036038101906105179190613a17565b613229565b60405161052c94939291906145a7565b60405180910390f35b61054f600480360381019061054a9190613a17565b613396565b60405161055c9190614726565b60405180910390f35b61056d6135b8565b600760008381526020019081526020016000206040518060e0016040529081600082015481526020016001820180546105a590614777565b80601f01602080910402602001604051908101604052809291908181526020018280546105d190614777565b801561061e5780601f106105f35761010080835404028352916020019161061e565b820191906000526020600020905b81548152906001019060200180831161060157829003601f168201915b5050505050815260200160028201805461063790614777565b80601f016020809104026020016040519081016040528092919081815260200182805461066390614777565b80156106b05780601f10610685576101008083540402835291602001916106b0565b820191906000526020600020905b81548152906001019060200180831161069357829003601f168201915b505050505081526020016003820180546106c990614777565b80601f01602080910402602001604051908101604052809291908181526020018280546106f590614777565b80156107425780601f1061071757610100808354040283529160200191610742565b820191906000526020600020905b81548152906001019060200180831161072557829003601f168201915b5050505050815260200160048201805461075b90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461078790614777565b80156107d45780601f106107a9576101008083540402835291602001916107d4565b820191906000526020600020905b8154815290600101906020018083116107b757829003601f168201915b505050505081526020016005820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016006820154815250509050919050565b6009602052816000526040600020818154811061086057600080fd5b9060005260206000209060050201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020180546108d090614777565b80601f01602080910402602001604051908101604052809291908181526020018280546108fc90614777565b80156109495780601f1061091e57610100808354040283529160200191610949565b820191906000526020600020905b81548152906001019060200180831161092c57829003601f168201915b5050505050908060030160009054906101000a900460ff16908060040154905085565b600560205280600052604060002060009150905080600001805461098f90614777565b80601f01602080910402602001604051908101604052809291908181526020018280546109bb90614777565b8015610a085780601f106109dd57610100808354040283529160200191610a08565b820191906000526020600020905b8154815290600101906020018083116109eb57829003601f168201915b505050505090806001018054610a1d90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4990614777565b8015610a965780601f10610a6b57610100808354040283529160200191610a96565b820191906000526020600020905b815481529060010190602001808311610a7957829003601f168201915b505050505090806002016040518060a0016040529081600082018054610abb90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ae790614777565b8015610b345780601f10610b0957610100808354040283529160200191610b34565b820191906000526020600020905b815481529060010190602001808311610b1757829003601f168201915b50505050508152602001600182018054610b4d90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610b7990614777565b8015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b50505050508152602001600282018054610bdf90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610c0b90614777565b8015610c585780601f10610c2d57610100808354040283529160200191610c58565b820191906000526020600020905b815481529060010190602001808311610c3b57829003601f168201915b50505050508152602001600382018054610c7190614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9d90614777565b8015610cea5780601f10610cbf57610100808354040283529160200191610cea565b820191906000526020600020905b815481529060010190602001808311610ccd57829003601f168201915b50505050508152602001600482015481525050908060080160009054906101000a900460ff16905084565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16610da4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9b906147f4565b60405180910390fd5b6001600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610e4461360b565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016040518060a0016040529081600082018054610ea190614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ecd90614777565b8015610f1a5780601f10610eef57610100808354040283529160200191610f1a565b820191906000526020600020905b815481529060010190602001808311610efd57829003601f168201915b50505050508152602001600182018054610f3390614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610f5f90614777565b8015610fac5780601f10610f8157610100808354040283529160200191610fac565b820191906000526020600020905b815481529060010190602001808311610f8f57829003601f168201915b50505050508152602001600282018054610fc590614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ff190614777565b801561103e5780601f106110135761010080835404028352916020019161103e565b820191906000526020600020905b81548152906001019060200180831161102157829003601f168201915b5050505050815260200160038201805461105790614777565b80601f016020809104026020016040519081016040528092919081815260200182805461108390614777565b80156110d05780601f106110a5576101008083540402835291602001916110d0565b820191906000526020600020905b8154815290600101906020018083116110b357829003601f168201915b505050505081526020016004820154815250509050919050565b600360048111156110fe576110fd61429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600481111561115d5761115c61429e565b5b1480156111b65750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff165b6111f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ec90614860565b60405180910390fd5b6040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200182815260200160011515815250600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816112d09190614a2c565b5060408201518160020190816112e69190614a2c565b5060608201518160030190816112fc9190614a2c565b5060808201518160040160006101000a81548160ff0219169083151502179055509050506002600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360048111156113835761138261429e565b5b02179055503373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f02c85b885734b3d5d5c682733151ac20f6a44abdb64e53ff21d0085c36a4873a60016040516113e69190613e06565b60405180910390a350505050565b600260048111156114085761140761429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660048111156114675761146661429e565b5b1480156114c05750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b6114ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f690614b4a565b60405180910390fd5b600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166115c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115bf90614bb6565b60405180910390fd5b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200142815250908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816116c39190614a2c565b5060408201518160020190816116d99190614a2c565b506060820151816003015550503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f360b5f2b76d555084dc9edcd626c49c58235dfb6213788f7797dc18a6d8430f460405160405180910390a3505050565b600a6020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6060600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070180548060200260200160405190810160405280929190818152602001828054801561180257602002820191906000526020600020905b8154815260200190600101908083116117ee575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806118f55750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b611934576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161192b90614c22565b60405180910390fd5b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16156119c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119bb90614c8e565b60405180910390fd5b60006040518060a0016040528086815260200185815260200184815260200183815260200142815250905060606040518060a0016040528089815260200188815260200183815260200182815260200160011515815250600560008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019081611a6f9190614a2c565b506020820151816001019081611a859190614a2c565b506040820151816002016000820151816000019081611aa49190614a2c565b506020820151816001019081611aba9190614a2c565b506040820151816002019081611ad09190614a2c565b506060820151816003019081611ae69190614a2c565b506080820151816004015550506060820151816007019080519060200190611b0f92919061363a565b5060808201518160080160006101000a81548160ff0219169083151502179055509050506001600660008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690836004811115611b9657611b9561429e565b5b02179055508873ffffffffffffffffffffffffffffffffffffffff167f5aad8bc7ad9861b16c6d01a65f54118dfe585a51e408ac2e7b9499148d515c418989604051611be3929190614cae565b60405180910390a2505050505050505050565b6060600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015611dec57838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054611d3690614777565b80601f0160208091040260200160405190810160405280929190818152602001828054611d6290614777565b8015611daf5780601f10611d8457610100808354040283529160200191611daf565b820191906000526020600020905b815481529060010190602001808311611d9257829003601f168201915b505050505081526020016003820160009054906101000a900460ff1615151515815260200160048201548152505081526020019060010190611c57565b505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611e85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e7c90614d31565b60405180910390fd5b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1615611f15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f0c90614d9d565b60405180910390fd5b60405180608001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200160011515815250600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019081611fea9190614a2c565b5060408201518160020190816120009190614a2c565b5060608201518160030160006101000a81548160ff0219169083151502179055509050506003600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360048111156120875761208661429e565b5b02179055508273ffffffffffffffffffffffffffffffffffffffff167f72cefccb74b7edacb21023a72b39a2cecb1123ba70d1eea03d3509d046b941c2836040516120d29190614dbd565b60405180910390a2505050565b600860205281600052604060002081815481106120fb57600080fd5b9060005260206000209060040201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461214590614777565b80601f016020809104026020016040519081016040528092919081815260200182805461217190614777565b80156121be5780601f10612193576101008083540402835291602001916121be565b820191906000526020600020905b8154815290600101906020018083116121a157829003601f168201915b5050505050908060020180546121d390614777565b80601f01602080910402602001604051908101604052809291908181526020018280546121ff90614777565b801561224c5780601f106122215761010080835404028352916020019161224c565b820191906000526020600020905b81548152906001019060200180831161222f57829003601f168201915b5050505050908060030154905084565b600760205280600052604060002060009150905080600001549080600101805461228590614777565b80601f01602080910402602001604051908101604052809291908181526020018280546122b190614777565b80156122fe5780601f106122d3576101008083540402835291602001916122fe565b820191906000526020600020905b8154815290600101906020018083116122e157829003601f168201915b50505050509080600201805461231390614777565b80601f016020809104026020016040519081016040528092919081815260200182805461233f90614777565b801561238c5780601f106123615761010080835404028352916020019161238c565b820191906000526020600020905b81548152906001019060200180831161236f57829003601f168201915b5050505050908060030180546123a190614777565b80601f01602080910402602001604051908101604052809291908181526020018280546123cd90614777565b801561241a5780601f106123ef5761010080835404028352916020019161241a565b820191906000526020600020905b8154815290600101906020018083116123fd57829003601f168201915b50505050509080600401805461242f90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461245b90614777565b80156124a85780601f1061247d576101008083540402835291602001916124a8565b820191906000526020600020905b81548152906001019060200180831161248b57829003601f168201915b5050505050908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060154905087565b6000600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60066020528060005260406000206000915054906101000a900460ff1681565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16612625576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161261c906147f4565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f829d3ca34bb03490993184b08484f72b26775bd7f3dbc7ec32e859d22326af9c824260405161266d929190614ddf565b60405180910390a250565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546126c190614777565b80601f01602080910402602001604051908101604052809291908181526020018280546126ed90614777565b801561273a5780601f1061270f5761010080835404028352916020019161273a565b820191906000526020600020905b81548152906001019060200180831161271d57829003601f168201915b50505050509080600201805461274f90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461277b90614777565b80156127c85780601f1061279d576101008083540402835291602001916127c8565b820191906000526020600020905b8154815290600101906020018083116127ab57829003601f168201915b5050505050908060030180546127dd90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461280990614777565b80156128565780601f1061282b57610100808354040283529160200191612856565b820191906000526020600020905b81548152906001019060200180831161283957829003601f168201915b5050505050908060040160009054906101000a900460ff16905085565b600260048111156128875761288661429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660048111156128e6576128e561429e565b5b14801561293f5750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b61297e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161297590614b4a565b60405180910390fd5b600a60008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612a47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a3e90614bb6565b60405180910390fd5b600060015490506040518060e001604052808281526020018681526020018581526020018481526020018381526020013373ffffffffffffffffffffffffffffffffffffffff1681526020014281525060076000838152602001908152602001600020600082015181600001556020820151816001019081612ac99190614a2c565b506040820151816002019081612adf9190614a2c565b506060820151816003019081612af59190614a2c565b506080820151816004019081612b0b9190614a2c565b5060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060155905050600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070181908060018154018082558091505060019003906000526020600020016000909190919091505560016000815480929190612bdc90614e3e565b91905055503373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16827f45cbd8514e76f91fe5ca7e77740d71af49ae7b9b7d629fab5a016e5883f87ad160405160405180910390a4505050505050565b60026004811115612c5857612c5761429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166004811115612cb757612cb661429e565b5b148015612d105750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b612d4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d4690614b4a565b60405180910390fd5b600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612e18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e0f90614ed2565b60405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff16612ea7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e9e90614f3e565b60405180910390fd5b600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200160011515815260200142815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190816130089190614a2c565b5060608201518160030160006101000a81548160ff0219169083151502179055506080820151816004015550506001600a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fbc2877c8d4eb12deddb1ab37c403c5f807d633ef5c3da32b9bc419c4fc5d4dd060405160405180910390a4505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146131ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016131c590614d31565b60405180910390fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461327290614777565b80601f016020809104026020016040519081016040528092919081815260200182805461329e90614777565b80156132eb5780601f106132c0576101008083540402835291602001916132eb565b820191906000526020600020905b8154815290600101906020018083116132ce57829003601f168201915b50505050509080600201805461330090614777565b80601f016020809104026020016040519081016040528092919081815260200182805461332c90614777565b80156133795780601f1061334e57610100808354040283529160200191613379565b820191906000526020600020905b81548152906001019060200180831161335c57829003601f168201915b5050505050908060030160009054906101000a900460ff16905084565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156135ad57838290600052602060002090600402016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201805461348090614777565b80601f01602080910402602001604051908101604052809291908181526020018280546134ac90614777565b80156134f95780601f106134ce576101008083540402835291602001916134f9565b820191906000526020600020905b8154815290600101906020018083116134dc57829003601f168201915b5050505050815260200160028201805461351290614777565b80601f016020809104026020016040519081016040528092919081815260200182805461353e90614777565b801561358b5780601f106135605761010080835404028352916020019161358b565b820191906000526020600020905b81548152906001019060200180831161356e57829003601f168201915b50505050508152602001600382015481525050815260200190600101906133f7565b505050509050919050565b6040518060e001604052806000815260200160608152602001606081526020016060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6040518060a0016040528060608152602001606081526020016060815260200160608152602001600081525090565b828054828255906000526020600020908101928215613676579160200282015b8281111561367557825182559160200191906001019061365a565b5b5090506136839190613687565b5090565b5b808211156136a0576000816000905550600101613688565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6136cb816136b8565b81146136d657600080fd5b50565b6000813590506136e8816136c2565b92915050565b600060208284031215613704576137036136ae565b5b6000613712848285016136d9565b91505092915050565b613724816136b8565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613764578082015181840152602081019050613749565b60008484015250505050565b6000601f19601f8301169050919050565b600061378c8261372a565b6137968185613735565b93506137a6818560208601613746565b6137af81613770565b840191505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006137e5826137ba565b9050919050565b6137f5816137da565b82525050565b600060e083016000830151613813600086018261371b565b506020830151848203602086015261382b8282613781565b915050604083015184820360408601526138458282613781565b9150506060830151848203606086015261385f8282613781565b915050608083015184820360808601526138798282613781565b91505060a083015161388e60a08601826137ec565b5060c08301516138a160c086018261371b565b508091505092915050565b600060208201905081810360008301526138c681846137fb565b905092915050565b6138d7816137da565b81146138e257600080fd5b50565b6000813590506138f4816138ce565b92915050565b60008060408385031215613911576139106136ae565b5b600061391f858286016138e5565b9250506020613930858286016136d9565b9150509250929050565b613943816137da565b82525050565b600082825260208201905092915050565b60006139658261372a565b61396f8185613949565b935061397f818560208601613746565b61398881613770565b840191505092915050565b60008115159050919050565b6139a881613993565b82525050565b6139b7816136b8565b82525050565b600060a0820190506139d2600083018861393a565b6139df602083018761393a565b81810360408301526139f1818661395a565b9050613a00606083018561399f565b613a0d60808301846139ae565b9695505050505050565b600060208284031215613a2d57613a2c6136ae565b5b6000613a3b848285016138e5565b91505092915050565b600060a0830160008301518482036000860152613a618282613781565b91505060208301518482036020860152613a7b8282613781565b91505060408301518482036040860152613a958282613781565b91505060608301518482036060860152613aaf8282613781565b9150506080830151613ac4608086018261371b565b508091505092915050565b60006080820190508181036000830152613ae9818761395a565b90508181036020830152613afd818661395a565b90508181036040830152613b118185613a44565b9050613b20606083018461399f565b95945050505050565b60006020820190508181036000830152613b438184613a44565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613b8d82613770565b810181811067ffffffffffffffff82111715613bac57613bab613b55565b5b80604052505050565b6000613bbf6136a4565b9050613bcb8282613b84565b919050565b600067ffffffffffffffff821115613beb57613bea613b55565b5b613bf482613770565b9050602081019050919050565b82818337600083830152505050565b6000613c23613c1e84613bd0565b613bb5565b905082815260208101848484011115613c3f57613c3e613b50565b5b613c4a848285613c01565b509392505050565b600082601f830112613c6757613c66613b4b565b5b8135613c77848260208601613c10565b91505092915050565b60008060008060808587031215613c9a57613c996136ae565b5b6000613ca8878288016138e5565b945050602085013567ffffffffffffffff811115613cc957613cc86136b3565b5b613cd587828801613c52565b935050604085013567ffffffffffffffff811115613cf657613cf56136b3565b5b613d0287828801613c52565b925050606085013567ffffffffffffffff811115613d2357613d226136b3565b5b613d2f87828801613c52565b91505092959194509250565b600080600060608486031215613d5457613d536136ae565b5b6000613d62868287016138e5565b935050602084013567ffffffffffffffff811115613d8357613d826136b3565b5b613d8f86828701613c52565b925050604084013567ffffffffffffffff811115613db057613daf6136b3565b5b613dbc86828701613c52565b9150509250925092565b60008060408385031215613ddd57613ddc6136ae565b5b6000613deb858286016138e5565b9250506020613dfc858286016138e5565b9150509250929050565b6000602082019050613e1b600083018461399f565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000613e59838361371b565b60208301905092915050565b6000602082019050919050565b6000613e7d82613e21565b613e878185613e2c565b9350613e9283613e3d565b8060005b83811015613ec3578151613eaa8882613e4d565b9750613eb583613e65565b925050600181019050613e96565b5085935050505092915050565b60006020820190508181036000830152613eea8184613e72565b905092915050565b6000602082019050613f07600083018461393a565b92915050565b600080600080600080600060e0888a031215613f2c57613f2b6136ae565b5b6000613f3a8a828b016138e5565b975050602088013567ffffffffffffffff811115613f5b57613f5a6136b3565b5b613f678a828b01613c52565b965050604088013567ffffffffffffffff811115613f8857613f876136b3565b5b613f948a828b01613c52565b955050606088013567ffffffffffffffff811115613fb557613fb46136b3565b5b613fc18a828b01613c52565b945050608088013567ffffffffffffffff811115613fe257613fe16136b3565b5b613fee8a828b01613c52565b93505060a088013567ffffffffffffffff81111561400f5761400e6136b3565b5b61401b8a828b01613c52565b92505060c088013567ffffffffffffffff81111561403c5761403b6136b3565b5b6140488a828b01613c52565b91505092959891949750929550565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61408c81613993565b82525050565b600060a0830160008301516140aa60008601826137ec565b5060208301516140bd60208601826137ec565b50604083015184820360408601526140d58282613781565b91505060608301516140ea6060860182614083565b5060808301516140fd608086018261371b565b508091505092915050565b60006141148383614092565b905092915050565b6000602082019050919050565b600061413482614057565b61413e8185614062565b93508360208202850161415085614073565b8060005b8581101561418c578484038952815161416d8582614108565b94506141788361411c565b925060208a01995050600181019050614154565b50829750879550505050505092915050565b600060208201905081810360008301526141b88184614129565b905092915050565b60006080820190506141d5600083018761393a565b81810360208301526141e7818661395a565b905081810360408301526141fb818561395a565b905061420a60608301846139ae565b95945050505050565b600060e082019050614228600083018a6139ae565b818103602083015261423a818961395a565b9050818103604083015261424e818861395a565b90508181036060830152614262818761395a565b90508181036080830152614276818661395a565b905061428560a083018561393a565b61429260c08301846139ae565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600581106142de576142dd61429e565b5b50565b60008190506142ef826142cd565b919050565b60006142ff826142e1565b9050919050565b61430f816142f4565b82525050565b600060208201905061432a6000830184614306565b92915050565b600060208284031215614346576143456136ae565b5b600082013567ffffffffffffffff811115614364576143636136b3565b5b61437084828501613c52565b91505092915050565b600060a08201905061438e600083018861393a565b81810360208301526143a0818761395a565b905081810360408301526143b4818661395a565b905081810360608301526143c8818561395a565b90506143d7608083018461399f565b9695505050505050565b600080600080600060a086880312156143fd576143fc6136ae565b5b600061440b888289016138e5565b955050602086013567ffffffffffffffff81111561442c5761442b6136b3565b5b61443888828901613c52565b945050604086013567ffffffffffffffff811115614459576144586136b3565b5b61446588828901613c52565b935050606086013567ffffffffffffffff811115614486576144856136b3565b5b61449288828901613c52565b925050608086013567ffffffffffffffff8111156144b3576144b26136b3565b5b6144bf88828901613c52565b9150509295509295909350565b6000806000606084860312156144e5576144e46136ae565b5b60006144f3868287016138e5565b9350506020614504868287016138e5565b925050604084013567ffffffffffffffff811115614525576145246136b3565b5b61453186828701613c52565b9150509250925092565b61454481613993565b811461454f57600080fd5b50565b6000813590506145618161453b565b92915050565b6000806040838503121561457e5761457d6136ae565b5b600061458c858286016138e5565b925050602061459d85828601614552565b9150509250929050565b60006080820190506145bc600083018761393a565b81810360208301526145ce818661395a565b905081810360408301526145e2818561395a565b90506145f1606083018461399f565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600060808301600083015161463e60008601826137ec565b50602083015184820360208601526146568282613781565b915050604083015184820360408601526146708282613781565b9150506060830151614685606086018261371b565b508091505092915050565b600061469c8383614626565b905092915050565b6000602082019050919050565b60006146bc826145fa565b6146c68185614605565b9350836020820285016146d885614616565b8060005b8581101561471457848403895281516146f58582614690565b9450614700836146a4565b925060208a019950506001810190506146dc565b50829750879550505050505092915050565b6000602082019050818103600083015261474081846146b1565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061478f57607f821691505b6020821081036147a2576147a1614748565b5b50919050565b7f50617469656e74206f6e6c790000000000000000000000000000000000000000600082015250565b60006147de600c83613949565b91506147e9826147a8565b602082019050919050565b6000602082019050818103600083015261480d816147d1565b9050919050565b7f417574683a20486f73706974616c2041646d696e204f6e6c7900000000000000600082015250565b600061484a601983613949565b915061485582614814565b602082019050919050565b600060208201905081810360008301526148798161483d565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148e27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826148a5565b6148ec86836148a5565b95508019841693508086168417925050509392505050565b6000819050919050565b600061492961492461491f846136b8565b614904565b6136b8565b9050919050565b6000819050919050565b6149438361490e565b61495761494f82614930565b8484546148b2565b825550505050565b600090565b61496c61495f565b61497781848461493a565b505050565b5b8181101561499b57614990600082614964565b60018101905061497d565b5050565b601f8211156149e0576149b181614880565b6149ba84614895565b810160208510156149c9578190505b6149dd6149d585614895565b83018261497c565b50505b505050565b600082821c905092915050565b6000614a03600019846008026149e5565b1980831691505092915050565b6000614a1c83836149f2565b9150826002028217905092915050565b614a358261372a565b67ffffffffffffffff811115614a4e57614a4d613b55565b5b614a588254614777565b614a6382828561499f565b600060209050601f831160018114614a965760008415614a84578287015190505b614a8e8582614a10565b865550614af6565b601f198416614aa486614880565b60005b82811015614acc57848901518255600182019150602085019450602081019050614aa7565b86831015614ae95784890151614ae5601f8916826149f2565b8355505b6001600288020188555050505b505050505050565b7f417574683a2041637469766520446f63746f72204f6e6c790000000000000000600082015250565b6000614b34601883613949565b9150614b3f82614afe565b602082019050919050565b60006020820190508181036000830152614b6381614b27565b9050919050565b7f4163636573732044656e69656400000000000000000000000000000000000000600082015250565b6000614ba0600d83613949565b9150614bab82614b6a565b602082019050919050565b60006020820190508181036000830152614bcf81614b93565b9050919050565b7f417574683a2052656c61796572204f6e6c790000000000000000000000000000600082015250565b6000614c0c601283613949565b9150614c1782614bd6565b602082019050919050565b60006020820190508181036000830152614c3b81614bff565b9050919050565b7f5265676973746572656400000000000000000000000000000000000000000000600082015250565b6000614c78600a83613949565b9150614c8382614c42565b602082019050919050565b60006020820190508181036000830152614ca781614c6b565b9050919050565b60006040820190508181036000830152614cc8818561395a565b90508181036020830152614cdc818461395a565b90509392505050565b7f417574683a2053757065722041646d696e204f6e6c7900000000000000000000600082015250565b6000614d1b601683613949565b9150614d2682614ce5565b602082019050919050565b60006020820190508181036000830152614d4a81614d0e565b9050919050565b7f486f73706974616c206578697374730000000000000000000000000000000000600082015250565b6000614d87600f83613949565b9150614d9282614d51565b602082019050919050565b60006020820190508181036000830152614db681614d7a565b9050919050565b60006020820190508181036000830152614dd7818461395a565b905092915050565b60006040820190508181036000830152614df9818561395a565b9050614e0860208301846139ae565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614e49826136b8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614e7b57614e7a614e0f565b5b600182019050919050565b7f596f7520646f6e277420686176652061636365737320746f2072656665720000600082015250565b6000614ebc601e83613949565b9150614ec782614e86565b602082019050919050565b60006020820190508181036000830152614eeb81614eaf565b9050919050565b7f54617267657420446f63746f72206e6f74206163746976650000000000000000600082015250565b6000614f28601883613949565b9150614f3382614ef2565b602082019050919050565b60006020820190508181036000830152614f5781614f1b565b905091905056fea2646970667358221220c973b7493672c8dd0ee38efbc7b2b4765c561d9f6d3e2a10c9f98fb531cc4bbb64736f6c63430008130033",

"deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101735760003560e01c806341a0894d116100de5780639940c2c011610097578063d428015911610071578063d4280159146104ca578063ecd8dc3a146104e6578063f093cf8014610502578063f8f3f3821461053557610173565b80639940c2c01461045e578063a9583c221461047a578063afbf6a7b146104ae57610173565b806341a0894d1461035d57806349d41e831461038d578063733ba56d146103a95780637e257dc8146103dc57806385e6853114610412578063993746421461042e57610173565b806312c214721161013057806312c21472146102775780631709ef071461029357806318bd4847146102c357806329575f6a146102f357806329e295c51461031157806337b7f4f51461034157610173565b806303e9e60914610178578063078918f1146101a85780630869cfbc146101dc5780630ae5e7391461020f5780630f53a4701461022b57806310be6c331461025b575b600080fd5b610192600480360381019061018d91906136ee565b610565565b60405161019f91906138ac565b60405180910390f35b6101c260048036038101906101bd91906138fa565b610844565b6040516101d39594939291906139bd565b60405180910390f35b6101f660048036038101906101f19190613a17565b61096c565b6040516102069493929190613acf565b60405180910390f35b61022960048036038101906102249190613a17565b610d15565b005b61024560048036038101906102409190613a17565b610e3c565b6040516102529190613b29565b60405180910390f35b61027560048036038101906102709190613c80565b6110ea565b005b610291600480360381019061028c9190613d3b565b6113f4565b005b6102ad60048036038101906102a89190613dc6565b611745565b6040516102ba9190613e06565b60405180910390f35b6102dd60048036038101906102d89190613a17565b611774565b6040516102ea9190613ed0565b60405180910390f35b6102fb61180e565b6040516103089190613ef2565b60405180910390f35b61032b60048036038101906103269190613a17565b611832565b6040516103389190613e06565b60405180910390f35b61035b60048036038101906103569190613f0d565b611852565b005b61037760048036038101906103729190613a17565b611bf6565b604051610384919061419e565b60405180910390f35b6103a760048036038101906103a29190613d3b565b611df7565b005b6103c360048036038101906103be91906138fa565b6120df565b6040516103d394939291906141c0565b60405180910390f35b6103f660048036038101906103f191906136ee565b61225c565b6040516104099796959493929190614213565b60405180910390f35b61042c60048036038101906104279190613a17565b6124de565b005b61044860048036038101906104439190613a17565b612576565b6040516104559190614315565b60405180910390f35b61047860048036038101906104739190614330565b612596565b005b610494600480360381019061048f9190613a17565b612678565b6040516104a5959493929190614379565b60405180910390f35b6104c860048036038101906104c391906143e1565b612873565b005b6104e460048036038101906104df91906144cc565b612c44565b005b61050060048036038101906104fb9190614567565b613140565b005b61051c60048036038101906105179190613a17565b613229565b60405161052c94939291906145a7565b60405180910390f35b61054f600480360381019061054a9190613a17565b613396565b60405161055c9190614726565b60405180910390f35b61056d6135b8565b600760008381526020019081526020016000206040518060e0016040529081600082015481526020016001820180546105a590614777565b80601f01602080910402602001604051908101604052809291908181526020018280546105d190614777565b801561061e5780601f106105f35761010080835404028352916020019161061e565b820191906000526020600020905b81548152906001019060200180831161060157829003601f168201915b5050505050815260200160028201805461063790614777565b80601f016020809104026020016040519081016040528092919081815260200182805461066390614777565b80156106b05780601f10610685576101008083540402835291602001916106b0565b820191906000526020600020905b81548152906001019060200180831161069357829003601f168201915b505050505081526020016003820180546106c990614777565b80601f01602080910402602001604051908101604052809291908181526020018280546106f590614777565b80156107425780601f1061071757610100808354040283529160200191610742565b820191906000526020600020905b81548152906001019060200180831161072557829003601f168201915b5050505050815260200160048201805461075b90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461078790614777565b80156107d45780601f106107a9576101008083540402835291602001916107d4565b820191906000526020600020905b8154815290600101906020018083116107b757829003601f168201915b505050505081526020016005820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016006820154815250509050919050565b6009602052816000526040600020818154811061086057600080fd5b9060005260206000209060050201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020180546108d090614777565b80601f01602080910402602001604051908101604052809291908181526020018280546108fc90614777565b80156109495780601f1061091e57610100808354040283529160200191610949565b820191906000526020600020905b81548152906001019060200180831161092c57829003601f168201915b5050505050908060030160009054906101000a900460ff16908060040154905085565b600560205280600052604060002060009150905080600001805461098f90614777565b80601f01602080910402602001604051908101604052809291908181526020018280546109bb90614777565b8015610a085780601f106109dd57610100808354040283529160200191610a08565b820191906000526020600020905b8154815290600101906020018083116109eb57829003601f168201915b505050505090806001018054610a1d90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4990614777565b8015610a965780601f10610a6b57610100808354040283529160200191610a96565b820191906000526020600020905b815481529060010190602001808311610a7957829003601f168201915b505050505090806002016040518060a0016040529081600082018054610abb90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ae790614777565b8015610b345780601f10610b0957610100808354040283529160200191610b34565b820191906000526020600020905b815481529060010190602001808311610b1757829003601f168201915b50505050508152602001600182018054610b4d90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610b7990614777565b8015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b50505050508152602001600282018054610bdf90614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610c0b90614777565b8015610c585780601f10610c2d57610100808354040283529160200191610c58565b820191906000526020600020905b815481529060010190602001808311610c3b57829003601f168201915b50505050508152602001600382018054610c7190614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9d90614777565b8015610cea5780601f10610cbf57610100808354040283529160200191610cea565b820191906000526020600020905b815481529060010190602001808311610ccd57829003601f168201915b50505050508152602001600482015481525050908060080160009054906101000a900460ff16905084565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16610da4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9b906147f4565b60405180910390fd5b6001600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610e4461360b565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016040518060a0016040529081600082018054610ea190614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ecd90614777565b8015610f1a5780601f10610eef57610100808354040283529160200191610f1a565b820191906000526020600020905b815481529060010190602001808311610efd57829003601f168201915b50505050508152602001600182018054610f3390614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610f5f90614777565b8015610fac5780601f10610f8157610100808354040283529160200191610fac565b820191906000526020600020905b815481529060010190602001808311610f8f57829003601f168201915b50505050508152602001600282018054610fc590614777565b80601f0160208091040260200160405190810160405280929190818152602001828054610ff190614777565b801561103e5780601f106110135761010080835404028352916020019161103e565b820191906000526020600020905b81548152906001019060200180831161102157829003601f168201915b5050505050815260200160038201805461105790614777565b80601f016020809104026020016040519081016040528092919081815260200182805461108390614777565b80156110d05780601f106110a5576101008083540402835291602001916110d0565b820191906000526020600020905b8154815290600101906020018083116110b357829003601f168201915b505050505081526020016004820154815250509050919050565b600360048111156110fe576110fd61429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600481111561115d5761115c61429e565b5b1480156111b65750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff165b6111f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ec90614860565b60405180910390fd5b6040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200182815260200160011515815250600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816112d09190614a2c565b5060408201518160020190816112e69190614a2c565b5060608201518160030190816112fc9190614a2c565b5060808201518160040160006101000a81548160ff0219169083151502179055509050506002600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360048111156113835761138261429e565b5b02179055503373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f02c85b885734b3d5d5c682733151ac20f6a44abdb64e53ff21d0085c36a4873a60016040516113e69190613e06565b60405180910390a350505050565b600260048111156114085761140761429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660048111156114675761146661429e565b5b1480156114c05750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b6114ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f690614b4a565b60405180910390fd5b600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166115c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115bf90614bb6565b60405180910390fd5b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200142815250908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816116c39190614a2c565b5060408201518160020190816116d99190614a2c565b506060820151816003015550503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f360b5f2b76d555084dc9edcd626c49c58235dfb6213788f7797dc18a6d8430f460405160405180910390a3505050565b600a6020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6060600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070180548060200260200160405190810160405280929190818152602001828054801561180257602002820191906000526020600020905b8154815260200190600101908083116117ee575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806118f55750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b611934576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161192b90614c22565b60405180910390fd5b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16156119c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119bb90614c8e565b60405180910390fd5b60006040518060a0016040528086815260200185815260200184815260200183815260200142815250905060606040518060a0016040528089815260200188815260200183815260200182815260200160011515815250600560008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019081611a6f9190614a2c565b506020820151816001019081611a859190614a2c565b506040820151816002016000820151816000019081611aa49190614a2c565b506020820151816001019081611aba9190614a2c565b506040820151816002019081611ad09190614a2c565b506060820151816003019081611ae69190614a2c565b506080820151816004015550506060820151816007019080519060200190611b0f92919061363a565b5060808201518160080160006101000a81548160ff0219169083151502179055509050506001600660008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690836004811115611b9657611b9561429e565b5b02179055508873ffffffffffffffffffffffffffffffffffffffff167f5aad8bc7ad9861b16c6d01a65f54118dfe585a51e408ac2e7b9499148d515c418989604051611be3929190614cae565b60405180910390a2505050505050505050565b6060600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015611dec57838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054611d3690614777565b80601f0160208091040260200160405190810160405280929190818152602001828054611d6290614777565b8015611daf5780601f10611d8457610100808354040283529160200191611daf565b820191906000526020600020905b815481529060010190602001808311611d9257829003601f168201915b505050505081526020016003820160009054906101000a900460ff1615151515815260200160048201548152505081526020019060010190611c57565b505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611e85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e7c90614d31565b60405180910390fd5b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1615611f15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f0c90614d9d565b60405180910390fd5b60405180608001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200160011515815250600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019081611fea9190614a2c565b5060408201518160020190816120009190614a2c565b5060608201518160030160006101000a81548160ff0219169083151502179055509050506003600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360048111156120875761208661429e565b5b02179055508273ffffffffffffffffffffffffffffffffffffffff167f72cefccb74b7edacb21023a72b39a2cecb1123ba70d1eea03d3509d046b941c2836040516120d29190614dbd565b60405180910390a2505050565b600860205281600052604060002081815481106120fb57600080fd5b9060005260206000209060040201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461214590614777565b80601f016020809104026020016040519081016040528092919081815260200182805461217190614777565b80156121be5780601f10612193576101008083540402835291602001916121be565b820191906000526020600020905b8154815290600101906020018083116121a157829003601f168201915b5050505050908060020180546121d390614777565b80601f01602080910402602001604051908101604052809291908181526020018280546121ff90614777565b801561224c5780601f106122215761010080835404028352916020019161224c565b820191906000526020600020905b81548152906001019060200180831161222f57829003601f168201915b5050505050908060030154905084565b600760205280600052604060002060009150905080600001549080600101805461228590614777565b80601f01602080910402602001604051908101604052809291908181526020018280546122b190614777565b80156122fe5780601f106122d3576101008083540402835291602001916122fe565b820191906000526020600020905b8154815290600101906020018083116122e157829003601f168201915b50505050509080600201805461231390614777565b80601f016020809104026020016040519081016040528092919081815260200182805461233f90614777565b801561238c5780601f106123615761010080835404028352916020019161238c565b820191906000526020600020905b81548152906001019060200180831161236f57829003601f168201915b5050505050908060030180546123a190614777565b80601f01602080910402602001604051908101604052809291908181526020018280546123cd90614777565b801561241a5780601f106123ef5761010080835404028352916020019161241a565b820191906000526020600020905b8154815290600101906020018083116123fd57829003601f168201915b50505050509080600401805461242f90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461245b90614777565b80156124a85780601f1061247d576101008083540402835291602001916124a8565b820191906000526020600020905b81548152906001019060200180831161248b57829003601f168201915b5050505050908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060154905087565b6000600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60066020528060005260406000206000915054906101000a900460ff1681565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060080160009054906101000a900460ff16612625576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161261c906147f4565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f829d3ca34bb03490993184b08484f72b26775bd7f3dbc7ec32e859d22326af9c824260405161266d929190614ddf565b60405180910390a250565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546126c190614777565b80601f01602080910402602001604051908101604052809291908181526020018280546126ed90614777565b801561273a5780601f1061270f5761010080835404028352916020019161273a565b820191906000526020600020905b81548152906001019060200180831161271d57829003601f168201915b50505050509080600201805461274f90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461277b90614777565b80156127c85780601f1061279d576101008083540402835291602001916127c8565b820191906000526020600020905b8154815290600101906020018083116127ab57829003601f168201915b5050505050908060030180546127dd90614777565b80601f016020809104026020016040519081016040528092919081815260200182805461280990614777565b80156128565780601f1061282b57610100808354040283529160200191612856565b820191906000526020600020905b81548152906001019060200180831161283957829003601f168201915b5050505050908060040160009054906101000a900460ff16905085565b600260048111156128875761288661429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660048111156128e6576128e561429e565b5b14801561293f5750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b61297e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161297590614b4a565b60405180910390fd5b600a60008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612a47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a3e90614bb6565b60405180910390fd5b600060015490506040518060e001604052808281526020018681526020018581526020018481526020018381526020013373ffffffffffffffffffffffffffffffffffffffff1681526020014281525060076000838152602001908152602001600020600082015181600001556020820151816001019081612ac99190614a2c565b506040820151816002019081612adf9190614a2c565b506060820151816003019081612af59190614a2c565b506080820151816004019081612b0b9190614a2c565b5060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060155905050600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070181908060018154018082558091505060019003906000526020600020016000909190919091505560016000815480929190612bdc90614e3e565b91905055503373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16827f45cbd8514e76f91fe5ca7e77740d71af49ae7b9b7d629fab5a016e5883f87ad160405160405180910390a4505050505050565b60026004811115612c5857612c5761429e565b5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166004811115612cb757612cb661429e565b5b148015612d105750600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b612d4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d4690614b4a565b60405180910390fd5b600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612e18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e0f90614ed2565b60405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff16612ea7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e9e90614f3e565b60405180910390fd5b600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200160011515815260200142815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190816130089190614a2c565b5060608201518160030160006101000a81548160ff0219169083151502179055506080820151816004015550506001600a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fbc2877c8d4eb12deddb1ab37c403c5f807d633ef5c3da32b9bc419c4fc5d4dd060405160405180910390a4505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146131ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016131c590614d31565b60405180910390fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461327290614777565b80601f016020809104026020016040519081016040528092919081815260200182805461329e90614777565b80156132eb5780601f106132c0576101008083540402835291602001916132eb565b820191906000526020600020905b8154815290600101906020018083116132ce57829003601f168201915b50505050509080600201805461330090614777565b80601f016020809104026020016040519081016040528092919081815260200182805461332c90614777565b80156133795780601f1061334e57610100808354040283529160200191613379565b820191906000526020600020905b81548152906001019060200180831161335c57829003601f168201915b5050505050908060030160009054906101000a900460ff16905084565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156135ad57838290600052602060002090600402016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201805461348090614777565b80601f01602080910402602001604051908101604052809291908181526020018280546134ac90614777565b80156134f95780601f106134ce576101008083540402835291602001916134f9565b820191906000526020600020905b8154815290600101906020018083116134dc57829003601f168201915b5050505050815260200160028201805461351290614777565b80601f016020809104026020016040519081016040528092919081815260200182805461353e90614777565b801561358b5780601f106135605761010080835404028352916020019161358b565b820191906000526020600020905b81548152906001019060200180831161356e57829003601f168201915b50505050508152602001600382015481525050815260200190600101906133f7565b505050509050919050565b6040518060e001604052806000815260200160608152602001606081526020016060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6040518060a0016040528060608152602001606081526020016060815260200160608152602001600081525090565b828054828255906000526020600020908101928215613676579160200282015b8281111561367557825182559160200191906001019061365a565b5b5090506136839190613687565b5090565b5b808211156136a0576000816000905550600101613688565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6136cb816136b8565b81146136d657600080fd5b50565b6000813590506136e8816136c2565b92915050565b600060208284031215613704576137036136ae565b5b6000613712848285016136d9565b91505092915050565b613724816136b8565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613764578082015181840152602081019050613749565b60008484015250505050565b6000601f19601f8301169050919050565b600061378c8261372a565b6137968185613735565b93506137a6818560208601613746565b6137af81613770565b840191505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006137e5826137ba565b9050919050565b6137f5816137da565b82525050565b600060e083016000830151613813600086018261371b565b506020830151848203602086015261382b8282613781565b915050604083015184820360408601526138458282613781565b9150506060830151848203606086015261385f8282613781565b915050608083015184820360808601526138798282613781565b91505060a083015161388e60a08601826137ec565b5060c08301516138a160c086018261371b565b508091505092915050565b600060208201905081810360008301526138c681846137fb565b905092915050565b6138d7816137da565b81146138e257600080fd5b50565b6000813590506138f4816138ce565b92915050565b60008060408385031215613911576139106136ae565b5b600061391f858286016138e5565b9250506020613930858286016136d9565b9150509250929050565b613943816137da565b82525050565b600082825260208201905092915050565b60006139658261372a565b61396f8185613949565b935061397f818560208601613746565b61398881613770565b840191505092915050565b60008115159050919050565b6139a881613993565b82525050565b6139b7816136b8565b82525050565b600060a0820190506139d2600083018861393a565b6139df602083018761393a565b81810360408301526139f1818661395a565b9050613a00606083018561399f565b613a0d60808301846139ae565b9695505050505050565b600060208284031215613a2d57613a2c6136ae565b5b6000613a3b848285016138e5565b91505092915050565b600060a0830160008301518482036000860152613a618282613781565b91505060208301518482036020860152613a7b8282613781565b91505060408301518482036040860152613a958282613781565b91505060608301518482036060860152613aaf8282613781565b9150506080830151613ac4608086018261371b565b508091505092915050565b60006080820190508181036000830152613ae9818761395a565b90508181036020830152613afd818661395a565b90508181036040830152613b118185613a44565b9050613b20606083018461399f565b95945050505050565b60006020820190508181036000830152613b438184613a44565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613b8d82613770565b810181811067ffffffffffffffff82111715613bac57613bab613b55565b5b80604052505050565b6000613bbf6136a4565b9050613bcb8282613b84565b919050565b600067ffffffffffffffff821115613beb57613bea613b55565b5b613bf482613770565b9050602081019050919050565b82818337600083830152505050565b6000613c23613c1e84613bd0565b613bb5565b905082815260208101848484011115613c3f57613c3e613b50565b5b613c4a848285613c01565b509392505050565b600082601f830112613c6757613c66613b4b565b5b8135613c77848260208601613c10565b91505092915050565b60008060008060808587031215613c9a57613c996136ae565b5b6000613ca8878288016138e5565b945050602085013567ffffffffffffffff811115613cc957613cc86136b3565b5b613cd587828801613c52565b935050604085013567ffffffffffffffff811115613cf657613cf56136b3565b5b613d0287828801613c52565b925050606085013567ffffffffffffffff811115613d2357613d226136b3565b5b613d2f87828801613c52565b91505092959194509250565b600080600060608486031215613d5457613d536136ae565b5b6000613d62868287016138e5565b935050602084013567ffffffffffffffff811115613d8357613d826136b3565b5b613d8f86828701613c52565b925050604084013567ffffffffffffffff811115613db057613daf6136b3565b5b613dbc86828701613c52565b9150509250925092565b60008060408385031215613ddd57613ddc6136ae565b5b6000613deb858286016138e5565b9250506020613dfc858286016138e5565b9150509250929050565b6000602082019050613e1b600083018461399f565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000613e59838361371b565b60208301905092915050565b6000602082019050919050565b6000613e7d82613e21565b613e878185613e2c565b9350613e9283613e3d565b8060005b83811015613ec3578151613eaa8882613e4d565b9750613eb583613e65565b925050600181019050613e96565b5085935050505092915050565b60006020820190508181036000830152613eea8184613e72565b905092915050565b6000602082019050613f07600083018461393a565b92915050565b600080600080600080600060e0888a031215613f2c57613f2b6136ae565b5b6000613f3a8a828b016138e5565b975050602088013567ffffffffffffffff811115613f5b57613f5a6136b3565b5b613f678a828b01613c52565b965050604088013567ffffffffffffffff811115613f8857613f876136b3565b5b613f948a828b01613c52565b955050606088013567ffffffffffffffff811115613fb557613fb46136b3565b5b613fc18a828b01613c52565b945050608088013567ffffffffffffffff811115613fe257613fe16136b3565b5b613fee8a828b01613c52565b93505060a088013567ffffffffffffffff81111561400f5761400e6136b3565b5b61401b8a828b01613c52565b92505060c088013567ffffffffffffffff81111561403c5761403b6136b3565b5b6140488a828b01613c52565b91505092959891949750929550565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61408c81613993565b82525050565b600060a0830160008301516140aa60008601826137ec565b5060208301516140bd60208601826137ec565b50604083015184820360408601526140d58282613781565b91505060608301516140ea6060860182614083565b5060808301516140fd608086018261371b565b508091505092915050565b60006141148383614092565b905092915050565b6000602082019050919050565b600061413482614057565b61413e8185614062565b93508360208202850161415085614073565b8060005b8581101561418c578484038952815161416d8582614108565b94506141788361411c565b925060208a01995050600181019050614154565b50829750879550505050505092915050565b600060208201905081810360008301526141b88184614129565b905092915050565b60006080820190506141d5600083018761393a565b81810360208301526141e7818661395a565b905081810360408301526141fb818561395a565b905061420a60608301846139ae565b95945050505050565b600060e082019050614228600083018a6139ae565b818103602083015261423a818961395a565b9050818103604083015261424e818861395a565b90508181036060830152614262818761395a565b90508181036080830152614276818661395a565b905061428560a083018561393a565b61429260c08301846139ae565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600581106142de576142dd61429e565b5b50565b60008190506142ef826142cd565b919050565b60006142ff826142e1565b9050919050565b61430f816142f4565b82525050565b600060208201905061432a6000830184614306565b92915050565b600060208284031215614346576143456136ae565b5b600082013567ffffffffffffffff811115614364576143636136b3565b5b61437084828501613c52565b91505092915050565b600060a08201905061438e600083018861393a565b81810360208301526143a0818761395a565b905081810360408301526143b4818661395a565b905081810360608301526143c8818561395a565b90506143d7608083018461399f565b9695505050505050565b600080600080600060a086880312156143fd576143fc6136ae565b5b600061440b888289016138e5565b955050602086013567ffffffffffffffff81111561442c5761442b6136b3565b5b61443888828901613c52565b945050604086013567ffffffffffffffff811115614459576144586136b3565b5b61446588828901613c52565b935050606086013567ffffffffffffffff811115614486576144856136b3565b5b61449288828901613c52565b925050608086013567ffffffffffffffff8111156144b3576144b26136b3565b5b6144bf88828901613c52565b9150509295509295909350565b6000806000606084860312156144e5576144e46136ae565b5b60006144f3868287016138e5565b9350506020614504868287016138e5565b925050604084013567ffffffffffffffff811115614525576145246136b3565b5b61453186828701613c52565b9150509250925092565b61454481613993565b811461454f57600080fd5b50565b6000813590506145618161453b565b92915050565b6000806040838503121561457e5761457d6136ae565b5b600061458c858286016138e5565b925050602061459d85828601614552565b9150509250929050565b60006080820190506145bc600083018761393a565b81810360208301526145ce818661395a565b905081810360408301526145e2818561395a565b90506145f1606083018461399f565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600060808301600083015161463e60008601826137ec565b50602083015184820360208601526146568282613781565b915050604083015184820360408601526146708282613781565b9150506060830151614685606086018261371b565b508091505092915050565b600061469c8383614626565b905092915050565b6000602082019050919050565b60006146bc826145fa565b6146c68185614605565b9350836020820285016146d885614616565b8060005b8581101561471457848403895281516146f58582614690565b9450614700836146a4565b925060208a019950506001810190506146dc565b50829750879550505050505092915050565b6000602082019050818103600083015261474081846146b1565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061478f57607f821691505b6020821081036147a2576147a1614748565b5b50919050565b7f50617469656e74206f6e6c790000000000000000000000000000000000000000600082015250565b60006147de600c83613949565b91506147e9826147a8565b602082019050919050565b6000602082019050818103600083015261480d816147d1565b9050919050565b7f417574683a20486f73706974616c2041646d696e204f6e6c7900000000000000600082015250565b600061484a601983613949565b915061485582614814565b602082019050919050565b600060208201905081810360008301526148798161483d565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148e27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826148a5565b6148ec86836148a5565b95508019841693508086168417925050509392505050565b6000819050919050565b600061492961492461491f846136b8565b614904565b6136b8565b9050919050565b6000819050919050565b6149438361490e565b61495761494f82614930565b8484546148b2565b825550505050565b600090565b61496c61495f565b61497781848461493a565b505050565b5b8181101561499b57614990600082614964565b60018101905061497d565b5050565b601f8211156149e0576149b181614880565b6149ba84614895565b810160208510156149c9578190505b6149dd6149d585614895565b83018261497c565b50505b505050565b600082821c905092915050565b6000614a03600019846008026149e5565b1980831691505092915050565b6000614a1c83836149f2565b9150826002028217905092915050565b614a358261372a565b67ffffffffffffffff811115614a4e57614a4d613b55565b5b614a588254614777565b614a6382828561499f565b600060209050601f831160018114614a965760008415614a84578287015190505b614a8e8582614a10565b865550614af6565b601f198416614aa486614880565b60005b82811015614acc57848901518255600182019150602085019450602081019050614aa7565b86831015614ae95784890151614ae5601f8916826149f2565b8355505b6001600288020188555050505b505050505050565b7f417574683a2041637469766520446f63746f72204f6e6c790000000000000000600082015250565b6000614b34601883613949565b9150614b3f82614afe565b602082019050919050565b60006020820190508181036000830152614b6381614b27565b9050919050565b7f4163636573732044656e69656400000000000000000000000000000000000000600082015250565b6000614ba0600d83613949565b9150614bab82614b6a565b602082019050919050565b60006020820190508181036000830152614bcf81614b93565b9050919050565b7f417574683a2052656c61796572204f6e6c790000000000000000000000000000600082015250565b6000614c0c601283613949565b9150614c1782614bd6565b602082019050919050565b60006020820190508181036000830152614c3b81614bff565b9050919050565b7f5265676973746572656400000000000000000000000000000000000000000000600082015250565b6000614c78600a83613949565b9150614c8382614c42565b602082019050919050565b60006020820190508181036000830152614ca781614c6b565b9050919050565b60006040820190508181036000830152614cc8818561395a565b90508181036020830152614cdc818461395a565b90509392505050565b7f417574683a2053757065722041646d696e204f6e6c7900000000000000000000600082015250565b6000614d1b601683613949565b9150614d2682614ce5565b602082019050919050565b60006020820190508181036000830152614d4a81614d0e565b9050919050565b7f486f73706974616c206578697374730000000000000000000000000000000000600082015250565b6000614d87600f83613949565b9150614d9282614d51565b602082019050919050565b60006020820190508181036000830152614db681614d7a565b9050919050565b60006020820190508181036000830152614dd7818461395a565b905092915050565b60006040820190508181036000830152614df9818561395a565b9050614e0860208301846139ae565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614e49826136b8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614e7b57614e7a614e0f565b5b600182019050919050565b7f596f7520646f6e277420686176652061636365737320746f2072656665720000600082015250565b6000614ebc601e83613949565b9150614ec782614e86565b602082019050919050565b60006020820190508181036000830152614eeb81614eaf565b9050919050565b7f54617267657420446f63746f72206e6f74206163746976650000000000000000600082015250565b6000614f28601883613949565b9150614f3382614ef2565b602082019050919050565b60006020820190508181036000830152614f5781614f1b565b905091905056fea2646970667358221220c973b7493672c8dd0ee38efbc7b2b4765c561d9f6d3e2a10c9f98fb531cc4bbb64736f6c63430008130033",

"linkReferences": {},

"deployedLinkReferences": {}

}

## 32. frontend/src/components/LiveVitals.jsx

import React, { useState, useEffect, useRef } from 'react';

import { API_BASE_URL } from '../config';

import {

Activity, Heart, Wind, AlertTriangle, Wifi, WifiOff,

ShieldCheck, TrendingUp, Clock, Zap

} from 'lucide-react';

const CHART_MAX_POINTS = 30; // Show last 30 readings (~60 seconds)

// Derive WebSocket URL from API_BASE_URL (http://127.0.0.1:8000 -\> ws://127.0.0.1:8000)

const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

const LiveVitals = ({ userData }) =\> {

const \[connected, setConnected\] = useState(false);

const \[vitals, setVitals\] = useState(null);

const \[bpmHistory, setBpmHistory\] = useState(\[\]);

const \[spo2History, setSpo2History\] = useState(\[\]);

const \[alerts, setAlerts\] = useState(\[\]);

const wsRef = useRef(null);

const bpmCanvasRef = useRef(null);

const spo2CanvasRef = useRef(null);

const patientId = userData?.wallet_address \|\| userData?.email \|\| 'demo-patient';

useEffect(() =\> {

let ws;

let reconnectTimer;

const connectWebSocket = () =\> {

const encodedId = encodeURIComponent(patientId);

const wsUrl = \`\${WS_BASE_URL}/ws/vitals/\${encodedId}\`;

ws = new WebSocket(wsUrl);

wsRef.current = ws;

ws.onopen = () =\> {

setConnected(true);

console.log('\[ant\] IoT WebSocket Connected');

};

ws.onmessage = (event) =\> {

try {

const data = JSON.parse(event.data);

setVitals(data);

setBpmHistory(prev =\> {

const next = \[...prev, data.bpm\];

return next.length \> CHART_MAX_POINTS ? next.slice(-CHART_MAX_POINTS) : next;

});

setSpo2History(prev =\> {

const next = \[...prev, data.spo2\];

return next.length \> CHART_MAX_POINTS ? next.slice(-CHART_MAX_POINTS) : next;

});

// Threshold alerts

if (data.status === 'CRITICAL') {

const alertMsg = data.bpm \> 100

? \`\[!\] TACHYCARDIA DETECTED -- BPM spiked to \${data.bpm} at \${data.timestamp}\`

: \`\[!\] LOW OXYGEN -- SpO2 dropped to \${data.spo2}% at \${data.timestamp}\`;

setAlerts(prev =\> \[{ msg: alertMsg, time: data.timestamp, bpm: data.bpm, spo2: data.spo2 }, ...prev\].slice(0, 8));

}

} catch (e) {

console.error("WebSocket message error:", e);

}

};

ws.onclose = () =\> {

setConnected(false);

console.log('\[X\] IoT WebSocket Disconnected. Reconnecting in 3 seconds...');

// Auto-reconnect logic

reconnectTimer = setTimeout(connectWebSocket, 3000);

};

ws.onerror = (e) =\> {

setConnected(false);

console.error("WebSocket Error:", e);

ws.close(); // Triggers onclose -\> reconnect

};

};

connectWebSocket();

return () =\> {

clearTimeout(reconnectTimer);

if (ws) {

ws.onclose = null; // Prevent reconnect on unmount

ws.close();

}

};

}, \[patientId\]);

// Draw BPM chart

useEffect(() =\> {

drawChart(bpmCanvasRef.current, bpmHistory, {

min: 50, max: 120,

threshold: 100,

color: '#f43f5e',

gradientTop: 'rgba(244,63,94,0.3)',

gradientBottom: 'rgba(244,63,94,0)'

});

}, \[bpmHistory\]);

// Draw SpO2 chart

useEffect(() =\> {

drawChart(spo2CanvasRef.current, spo2History, {

min: 88, max: 102,

threshold: 95,

thresholdDir: 'below',

color: '#3b82f6',

gradientTop: 'rgba(59,130,246,0.3)',

gradientBottom: 'rgba(59,130,246,0)'

});

}, \[spo2History\]);

const drawChart = (canvas, data, opts) =\> {

if (!canvas \|\| data.length \< 2) return;

const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio \|\| 1;

const rect = canvas.getBoundingClientRect();

canvas.width = rect.width \* dpr;

canvas.height = rect.height \* dpr;

ctx.scale(dpr, dpr);

const w = rect.width;

const h = rect.height;

const padding = { top: 10, bottom: 10, left: 0, right: 0 };

const chartW = w - padding.left - padding.right;

const chartH = h - padding.top - padding.bottom;

ctx.clearRect(0, 0, w, h);

// Draw threshold line

const thresholdY = padding.top + chartH - ((opts.threshold - opts.min) / (opts.max - opts.min)) \* chartH;

ctx.setLineDash(\[4, 4\]);

ctx.strokeStyle = 'rgba(255,255,255,0.1)';

ctx.lineWidth = 1;

ctx.beginPath();

ctx.moveTo(padding.left, thresholdY);

ctx.lineTo(w - padding.right, thresholdY);

ctx.stroke();

ctx.setLineDash(\[\]);

// Build path

const points = data.map((val, i) =\> ({

x: padding.left + (i / (CHART_MAX_POINTS - 1)) \* chartW,

y: padding.top + chartH - ((val - opts.min) / (opts.max - opts.min)) \* chartH

}));

// Gradient fill

const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);

gradient.addColorStop(0, opts.gradientTop);

gradient.addColorStop(1, opts.gradientBottom);

ctx.beginPath();

ctx.moveTo(points\[0\].x, h - padding.bottom);

points.forEach(p =\> ctx.lineTo(p.x, p.y));

ctx.lineTo(points\[points.length - 1\].x, h - padding.bottom);

ctx.closePath();

ctx.fillStyle = gradient;

ctx.fill();

// Line

ctx.beginPath();

ctx.strokeStyle = opts.color;

ctx.lineWidth = 2.5;

ctx.lineJoin = 'round';

points.forEach((p, i) =\> i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));

ctx.stroke();

// Glow dot on last point

const last = points\[points.length - 1\];

ctx.beginPath();

ctx.arc(last.x, last.y, 4, 0, Math.PI \* 2);

ctx.fillStyle = opts.color;

ctx.fill();

ctx.beginPath();

ctx.arc(last.x, last.y, 8, 0, Math.PI \* 2);

ctx.fillStyle = opts.color.replace(')', ',0.2)').replace('rgb', 'rgba');

ctx.fill();

};

return (

\<div className="space-y-6 animate-fade-in-up max-w-5xl"\>

{/\* Header \*/}

\<div className="bg-\[#121620\] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden"\>

\<div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-rose-500/5 to-blue-500/5 rounded-full blur-2xl"\>\</div\>

\<div className="flex items-center gap-4 relative z-10"\>

\<div className={\`p-3 rounded-xl border \${connected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}\`}\>

{connected ? \<Wifi size={24} /\> : \<WifiOff size={24} /\>}

\</div\>

\<div className="flex-1"\>

\<h2 className="text-xl font-bold text-white flex items-center gap-2"\>

Live IoT Vitals Monitor

\<span className={\`text-\[9px\] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider \${connected ? 'bg-emerald-500 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}\`}\>

{connected ? '\* LIVE' : 'o OFFLINE'}

\</span\>

\</h2\>

\<p className="text-xs text-slate-500 mt-0.5"\>Real-time biometric data streamed via WebSocket from IoT sensors\</p\>

\</div\>

{vitals && (

\<div className="text-right"\>

\<p className="text-\[10px\] text-slate-600 uppercase tracking-wider"\>Last Reading\</p\>

\<p className="text-sm font-mono text-slate-400"\>{vitals.timestamp}\</p\>

\</div\>

)}

\</div\>

\</div\>

{/\* Vitals Cards \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 gap-5"\>

{/\* BPM Card \*/}

\<div className={\`bg-\[#121620\] rounded-2xl border overflow-hidden transition-all duration-500 \${

vitals?.bpm \> 100

? 'border-rose-500/50 shadow-\[0_0_40px_rgba(244,63,94,0.15)\]'

: 'border-slate-800'

}\`}\>

\<div className="p-5 flex items-center justify-between"\>

\<div className="flex items-center gap-3"\>

\<div className={\`p-2.5 rounded-xl \${vitals?.bpm \> 100 ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-500/10 text-rose-400'}\`}\>

\<Heart size={20} className={vitals?.bpm \> 100 ? 'animate-pulse' : ''} /\>

\</div\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Heart Rate\</p\>

\<div className="flex items-baseline gap-2"\>

\<span className={\`text-3xl font-black \${vitals?.bpm \> 100 ? 'text-rose-400' : 'text-white'}\`}\>

{vitals?.bpm \|\| '--'}

\</span\>

\<span className="text-xs text-slate-500"\>BPM\</span\>

\</div\>

\</div\>

\</div\>

{vitals?.bpm \> 100 && (

\<span className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-\[10px\] font-black uppercase tracking-wider animate-pulse"\>

\<AlertTriangle size={12} /\> HIGH

\</span\>

)}

{vitals && vitals.bpm \<= 100 && (

\<span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-\[10px\] font-black uppercase tracking-wider"\>

\<ShieldCheck size={12} /\> NORMAL

\</span\>

)}

\</div\>

\<div className="px-2 pb-2"\>

\<canvas ref={bpmCanvasRef} className="w-full h-\[120px\]" style={{ width: '100%', height: '120px' }} /\>

\</div\>

\</div\>

{/\* SpO2 Card \*/}

\<div className={\`bg-\[#121620\] rounded-2xl border overflow-hidden transition-all duration-500 \${

vitals?.spo2 \< 95

? 'border-amber-500/50 shadow-\[0_0_40px_rgba(245,158,11,0.15)\]'

: 'border-slate-800'

}\`}\>

\<div className="p-5 flex items-center justify-between"\>

\<div className="flex items-center gap-3"\>

\<div className={\`p-2.5 rounded-xl \${vitals?.spo2 \< 95 ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}\`}\>

\<Wind size={20} /\>

\</div\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Oxygen Saturation\</p\>

\<div className="flex items-baseline gap-2"\>

\<span className={\`text-3xl font-black \${vitals?.spo2 \< 95 ? 'text-amber-400' : 'text-white'}\`}\>

{vitals?.spo2 \|\| '--'}

\</span\>

\<span className="text-xs text-slate-500"\>SpO2 %\</span\>

\</div\>

\</div\>

\</div\>

{vitals?.spo2 \< 95 && (

\<span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-\[10px\] font-black uppercase tracking-wider animate-pulse"\>

\<AlertTriangle size={12} /\> LOW

\</span\>

)}

{vitals && vitals.spo2 \>= 95 && (

\<span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-\[10px\] font-black uppercase tracking-wider"\>

\<ShieldCheck size={12} /\> NORMAL

\</span\>

)}

\</div\>

\<div className="px-2 pb-2"\>

\<canvas ref={spo2CanvasRef} className="w-full h-\[120px\]" style={{ width: '100%', height: '120px' }} /\>

\</div\>

\</div\>

\</div\>

{/\* Threshold Alerts Feed \*/}

\<div className="bg-\[#121620\] rounded-2xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"\>

\<Zap size={14} className="text-amber-400" /\> Threshold Alerts

{alerts.length \> 0 && (

\<span className="text-\[10px\] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold"\>

{alerts.length}

\</span\>

)}

\</h3\>

{alerts.length === 0 ? (

\<div className="text-center py-8"\>

\<ShieldCheck size={32} className="mx-auto text-emerald-500/30 mb-3" /\>

\<p className="text-sm text-slate-600"\>All vitals within normal range. No alerts triggered.\</p\>

\</div\>

) : (

\<div className="space-y-2 max-h-\[300px\] overflow-y-auto pr-2 custom-scrollbar"\>

{alerts.map((alert, i) =\> (

\<div

key={i}

className={\`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 \${

i === 0 ? 'bg-rose-500/10 border-rose-500/20 animate-fade-in-up' : 'bg-\[#0b0e14\] border-slate-800'

}\`}

\>

\<AlertTriangle size={14} className={i === 0 ? 'text-rose-400' : 'text-slate-600'} /\>

\<p className={\`text-xs flex-1 \${i === 0 ? 'text-rose-300 font-bold' : 'text-slate-500'}\`}\>

{alert.msg}

\</p\>

\<div className="flex gap-3 text-\[10px\] text-slate-600 font-mono"\>

\<span\>\<3 {alert.bpm}\</span\>

\<span\>O2 {alert.spo2}%\</span\>

\</div\>

\</div\>

))}

\</div\>

)}

\</div\>

{/\* Connection Info \*/}

\<div className="bg-\[#121620\] rounded-2xl p-4 border border-slate-800"\>

\<div className="flex items-center justify-between text-\[10px\] text-slate-600"\>

\<div className="flex items-center gap-4"\>

\<span className="flex items-center gap-1.5"\>

\<Activity size={10} /\> Stream: ws://localhost:8000/ws/vitals/

\</span\>

\<span className="flex items-center gap-1.5"\>

\<Clock size={10} /\> Interval: 2s

\</span\>

\<span className="flex items-center gap-1.5"\>

\<TrendingUp size={10} /\> Readings: {bpmHistory.length}

\</span\>

\</div\>

\<span className="flex items-center gap-1.5"\>

\<ShieldCheck size={10} /\> BioChain Guardian Protocol v1.0

\</span\>

\</div\>

\</div\>

\</div\>

);

};

export default LiveVitals;

## 33. frontend/src/components/PatientAppointments.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Calendar, Clock, User, Building, FileText, Plus, X, Activity, CheckCircle, Clock3 } from 'lucide-react';

const PatientAppointments = ({ userData }) =\> {

const \[appointments, setAppointments\] = useState(\[\]);

const \[doctors, setDoctors\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[isBookingModalOpen, setIsBookingModalOpen\] = useState(false);

const \[bookingMessage, setBookingMessage\] = useState('');

// Form State (No Date/Time anymore!)

const \[formData, setFormData\] = useState({

doctor_wallet: '',

reason: ''

});

useEffect(() =\> {

fetchData();

}, \[userData.email\]);

const fetchData = async () =\> {

setLoading(true);

try {

const appRes = await axios.get(\`\${API_BASE_URL}/appointments/patient/\${userData.email}\`);

setAppointments(appRes.data.appointments \|\| \[\]);

const docRes = await axios.get(\`\${API_BASE_URL}/api/doctors/active\`);

setDoctors(docRes.data.doctors \|\| \[\]);

} catch (error) {

console.error("Error fetching data:", error);

} finally {

setLoading(false);

}

};

const handleBookAppointment = async (e) =\> {

e.preventDefault();

setBookingMessage("\[T\] Sending request to doctor...");

const selectedDoc = doctors.find(d =\> d.wallet_address === formData.doctor_wallet);

if (!selectedDoc) {

setBookingMessage("\[X\] Please select a valid doctor.");

return;

}

// Clean up "Dr. Dr." if it exists in DB

const cleanDoctorName = selectedDoc.name.replace(/^Dr\\\s\*/i, '');

const payload = {

patient_email: userData.email,

patient_name: userData.name \|\| "Unknown Patient",

doctor_wallet: selectedDoc.wallet_address,

doctor_name: cleanDoctorName,

hospital_name: selectedDoc.hospital_name \|\| "Private",

reason: formData.reason

};

try {

await axios.post(\`\${API_BASE_URL}/appointments/book\`, payload);

setBookingMessage("\[!\] Request sent! Awaiting Doctor's approval.");

fetchData();

setTimeout(() =\> {

setIsBookingModalOpen(false);

setFormData({ doctor_wallet: '', reason: '' });

setBookingMessage('');

}, 2500);

} catch (error) {

console.error(error);

setBookingMessage("\[X\] Failed to send request.");

}

};

if (loading) return (

\<div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Syncing Medical Schedule...

\</div\>

);

return (

\<div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up"\>

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex justify-between items-center relative overflow-hidden"\>

\<div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"\>\</div\>

\<div className="relative z-10"\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<Calendar className="text-emerald-500" size={28} /\> My Appointments

\</h2\>

\<p className="text-sm text-slate-400 mt-1"\>Manage your clinical visits across the BioChain network.\</p\>

\</div\>

\<button

onClick={() =\> setIsBookingModalOpen(true)}

className="relative z-10 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-900/20"

\>

\<Plus size={20} /\> Request Consult

\</button\>

\</div\>

\<div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children animate-fade-in-up"\>

{appointments.length \> 0 ? (

appointments.map((app, index) =\> {

const isPending = app.status === "Pending";

return (

\<div key={index} className={\`bg-\[#121620\] rounded-3xl p-6 border shadow-xl transition-all group card-hover relative overflow-hidden \${isPending ? 'border-yellow-500/30 hover:border-yellow-500/50' : 'border-slate-800 hover:border-emerald-500/30'}\`}\>

\<div className={\`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 \${isPending ? 'bg-yellow-500/5 group-hover:bg-yellow-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}\`}\>\</div\>

{/\* Status Badge \*/}

\<div className={\`absolute top-6 right-6 px-3 py-1.5 rounded-full text-\[10px\] font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-lg \${isPending ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}\`}\>

{isPending ? \<Clock3 size={12} /\> : \<CheckCircle size={12} /\>}

{app.status}

\</div\>

\<h3 className="text-lg font-bold text-white mb-4 pr-24 line-clamp-1 relative z-10 group-hover:text-emerald-400 transition-colors"\>Dr. {app.doctor_name}\</h3\>

\<div className="space-y-4 mb-2 relative z-10"\>

\<p className="text-sm text-slate-400 flex items-center gap-3"\>

\<Building size={16} className="text-slate-500"/\> {app.hospital_name}

\</p\>

{/\* Show Time ONLY if scheduled, else show waiting message \*/}

{isPending ? (

\<div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10 text-xs text-yellow-500 font-medium"\>

Awaiting doctor to assign date & time...

\</div\>

) : (

\<div className="flex gap-6"\>

\<p className="text-sm text-emerald-400 flex items-center gap-2 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"\>

\<Calendar size={14} /\> {app.appointment_date}

\</p\>

\<p className="text-sm text-emerald-400 flex items-center gap-2 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"\>

\<Clock size={14} /\> {app.appointment_time}

\</p\>

\</div\>

)}

\<div className="bg-\[#0b0e14\] p-3 rounded-xl border border-slate-800/50 mt-2"\>

\<p className="text-xs text-slate-500 font-bold uppercase mb-1"\>Reason / Symptoms\</p\>

\<p className="text-sm text-slate-300 italic"\>"{app.reason}"\</p\>

\</div\>

\</div\>

\</div\>

);

})

) : (

\<div className="col-span-full bg-\[#121620\] border border-slate-800 rounded-3xl p-12 text-center text-slate-500"\>

\<Calendar size={48} className="mx-auto mb-4 opacity-50" /\>

\<h3 className="text-xl font-bold text-white mb-2"\>No Consultations Yet\</h3\>

\<p\>Request an appointment with a network doctor to get started.\</p\>

\</div\>

)}

\</div\>

{/\* REQUEST MODAL \*/}

{isBookingModalOpen && (

\<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"\>

\<div className="bg-\[#121620\] border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative"\>

\<button onClick={() =\> setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition"\>

\<X size={24} /\>

\</button\>

\<h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"\>

\<Plus className="text-emerald-400" /\> Request Consult

\</h2\>

\<p className="text-sm text-slate-400 mb-6"\>Send your symptoms to a doctor. They will assign a time slot.\</p\>

\<form onSubmit={handleBookAppointment} className="space-y-5"\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<User size={14} /\> Select Doctor & Network

\</label\>

\<select

required

value={formData.doctor_wallet}

onChange={(e) =\> setFormData({...formData, doctor_wallet: e.target.value})}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none transition appearance-none"

\>

\<option value="" disabled\>-- Search & Choose Doctor --\</option\>

{doctors.map(doc =\> {

const cleanName = doc.name.replace(/^Dr\\\s\*/i, '');

return (

\<option key={doc.wallet_address} value={doc.wallet_address}\>

Dr. {cleanName} ({doc.specialization \|\| 'Gen. Physician'}) - {doc.hospital_name \|\| 'Private'}

\</option\>

);

})}

\</select\>

\</div\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<FileText size={14} /\> Details / Symptoms

\</label\>

\<textarea

required

rows="4"

placeholder="Briefly describe what you are feeling... e.g., 'Mild fever since 2 days'"

value={formData.reason}

onChange={(e) =\> setFormData({...formData, reason: e.target.value})}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none resize-none"

\>\</textarea\>

\</div\>

\<button

type="submit"

className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-900/20"

\>

Send Request to Doctor

\</button\>

{bookingMessage && (

\<div className={\`p-4 rounded-xl text-center font-bold text-sm border \${bookingMessage.includes('\[X\]') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}\`}\>

{bookingMessage}

\</div\>

)}

\</form\>

\</div\>

\</div\>

)}

\</div\>

);

};

export default PatientAppointments;

## 34. frontend/src/components/DoctorAppointments.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Calendar, Clock, User, Building, FileText, Plus, X, Activity, CheckCircle, Stethoscope, HeartPulse } from 'lucide-react';

const DoctorAppointments = ({ userData }) =\> {

// UI States

const \[viewMode, setViewMode\] = useState('CLINICAL'); // 'CLINICAL' or 'PERSONAL'

const \[loading, setLoading\] = useState(true);

// Data States

const \[clinicalAppointments, setClinicalAppointments\] = useState(\[\]);

const \[personalAppointments, setPersonalAppointments\] = useState(\[\]);

const \[doctorsList, setDoctorsList\] = useState(\[\]);

const \[approvalInputs, setApprovalInputs\] = useState({});

// Booking Modal States

const \[isBookingModalOpen, setIsBookingModalOpen\] = useState(false);

const \[bookingMessage, setBookingMessage\] = useState('');

const \[formData, setFormData\] = useState({ doctor_wallet: '', reason: '' });

useEffect(() =\> {

fetchAllData();

}, \[userData\]);

const fetchAllData = async () =\> {

setLoading(true);

try {

// 1. Fetch Patients waiting for this Doctor (Clinical)

if (userData?.wallet_address) {

const clinRes = await axios.get(\`\${API_BASE_URL}/appointments/doctor/\${userData.wallet_address}\`);

setClinicalAppointments(clinRes.data.appointments \|\| \[\]);

}

// 2. Fetch Doctor's own appointments as a Patient (Personal)

// Fallback to wallet if email is missing for Web3 doctors

const personalId = userData?.email \|\| userData?.wallet_address;

if (personalId) {

const persRes = await axios.get(\`\${API_BASE_URL}/appointments/patient/\${personalId}\`);

setPersonalAppointments(persRes.data.appointments \|\| \[\]);

}

// 3. Fetch all active doctors for personal booking

const docRes = await axios.get(\`\${API_BASE_URL}/api/doctors/active\`);

setDoctorsList(docRes.data.doctors \|\| \[\]);

} catch (error) {

console.error("Error fetching scheduling data:", error);

} finally {

setLoading(false);

}

};

// --- DOCTOR APPROVING PATIENT REQUEST ---

const handleApprove = async (appId) =\> {

const data = approvalInputs\[appId\];

if (!data?.date \|\| !data?.time) {

alert("\[!\] Please select both Date and Time to approve.");

return;

}

try {

await axios.put(\`\${API_BASE_URL}/appointments/approve/\${appId}\`, {

appointment_date: data.date,

appointment_time: data.time

});

fetchAllData(); // Refresh list

} catch (error) {

alert("Failed to approve appointment.");

}

};

// --- DOCTOR BOOKING PERSONAL APPOINTMENT ---

const handleBookPersonal = async (e) =\> {

e.preventDefault();

setBookingMessage("\[T\] Sending request...");

const selectedDoc = doctorsList.find(d =\> d.wallet_address === formData.doctor_wallet);

if (!selectedDoc) return setBookingMessage("\[X\] Please select a doctor.");

const cleanDoctorName = selectedDoc.name.replace(/^Dr\\\s\*/i, '');

const personalId = userData?.email \|\| userData?.wallet_address;

const payload = {

patient_email: personalId,

patient_name: \`Dr. \${userData.name \|\| "Unknown"}\`, // Tagging as Doctor

doctor_wallet: selectedDoc.wallet_address,

doctor_name: cleanDoctorName,

hospital_name: selectedDoc.affiliated_hospital_id \|\| "BioChain Network",

reason: formData.reason

};

try {

await axios.post(\`\${API_BASE_URL}/appointments/book\`, payload);

setBookingMessage("\[!\] Request sent successfully!");

fetchAllData();

setTimeout(() =\> {

setIsBookingModalOpen(false);

setFormData({ doctor_wallet: '', reason: '' });

setBookingMessage('');

setViewMode('PERSONAL'); // Switch to personal tab to see it

}, 2000);

} catch (error) {

setBookingMessage("\[X\] Failed to send request.");

}

};

if (loading) return (

\<div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Syncing Master Schedule...

\</div\>

);

return (

\<div className="max-w-6xl mx-auto space-y-6"\>

{/\* Header & Toggle \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4"\>

\<div\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<Calendar className="text-blue-500" size={28} /\> Master Schedule

\</h2\>

\<p className="text-sm text-slate-400 mt-1"\>Manage your clinic queue and your personal health consultations.\</p\>

\</div\>

\<div className="flex gap-4"\>

\<div className="bg-\[#0b0e14\] p-1.5 rounded-2xl border border-slate-800 flex"\>

\<button

onClick={() =\> setViewMode('CLINICAL')}

className={\`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 \${viewMode === 'CLINICAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}\`}

\>

\<Stethoscope size={16} /\> Clinical Queue

\</button\>

\<button

onClick={() =\> setViewMode('PERSONAL')}

className={\`px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 \${viewMode === 'PERSONAL' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}\`}

\>

\<HeartPulse size={16} /\> My Personal Health

\</button\>

\</div\>

{/\* ONLY SHOW BOOK BUTTON IN PERSONAL MODE \*/}

{viewMode === 'PERSONAL' && (

\<button

onClick={() =\> setIsBookingModalOpen(true)}

className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-900/20"

\>

\<Plus size={18} /\> Book Consult

\</button\>

)}

\</div\>

\</div\>

{/\* ==============================================

MODE 1: CLINICAL QUEUE (Patients waiting for Doctor)

============================================== \*/}

{viewMode === 'CLINICAL' && (

\<div className="space-y-6"\>

{/\* Pending Approvals \*/}

\<h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2"\>

\<Clock className="text-yellow-400" size={20} /\> Action Required (Pending Requests)

\</h3\>

\<div className="grid grid-cols-1 lg:grid-cols-2 gap-4"\>

{clinicalAppointments.filter(a =\> a.status === 'Pending').length \> 0 ? (

clinicalAppointments.filter(a =\> a.status === 'Pending').map((app) =\> (

\<div key={app.\_id} className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-500/20 shadow-lg"\>

\<h4 className="font-bold text-white text-lg"\>{app.patient_name}\</h4\>

\<p className="text-sm text-slate-400 mt-1 mb-4"\>Reason: \<span className="italic"\>"{app.reason}"\</span\>\</p\>

\<div className="flex flex-wrap items-center gap-3 bg-\[#0b0e14\] p-3 rounded-xl border border-slate-800"\>

\<input

type="date"

className="bg-transparent text-sm text-white outline-none cursor-pointer \[&::-webkit-calendar-picker-indicator\]:filter \[&::-webkit-calendar-picker-indicator\]:invert"

onChange={(e) =\> setApprovalInputs({...approvalInputs, \[app.\_id\]: {...approvalInputs\[app.\_id\], date: e.target.value}})}

/\>

\<input

type="time"

className="bg-transparent text-sm text-white outline-none border-l border-slate-700 pl-3 ml-1 cursor-pointer \[&::-webkit-calendar-picker-indicator\]:filter \[&::-webkit-calendar-picker-indicator\]:invert"

onChange={(e) =\> setApprovalInputs({...approvalInputs, \[app.\_id\]: {...approvalInputs\[app.\_id\], time: e.target.value}})}

/\>

\<button

onClick={() =\> handleApprove(app.\_id)}

className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-lg flex items-center gap-1.5"

\>

\<CheckCircle size={14} /\> Approve

\</button\>

\</div\>

\</div\>

))

) : (

\<p className="text-slate-500 text-sm italic col-span-full"\>No pending requests.\</p\>

)}

\</div\>

{/\* Scheduled & Past \*/}

\<h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2 mt-8"\>

\<CheckCircle className="text-emerald-400" size={20} /\> Scheduled & Completed

\</h3\>

\<div className="grid grid-cols-1 md:grid-cols-3 gap-4"\>

{clinicalAppointments.filter(a =\> a.status !== 'Pending').length \> 0 ? (

clinicalAppointments.filter(a =\> a.status !== 'Pending').map((app) =\> (

\<div key={app.\_id} className="bg-\[#121620\] p-5 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition shadow-lg"\>

\<div className="flex justify-between items-start mb-2"\>

\<h4 className="font-bold text-white"\>{app.patient_name}\</h4\>

\<span className="text-\[10px\] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full"\>{app.status}\</span\>

\</div\>

\<p className="text-sm text-blue-400 font-bold mb-2"\>{app.appointment_date} \| {app.appointment_time}\</p\>

\<p className="text-xs text-slate-500 line-clamp-2"\>"{app.reason}"\</p\>

\</div\>

))

) : (

\<p className="text-slate-500 text-sm italic col-span-full"\>No scheduled appointments.\</p\>

)}

\</div\>

\</div\>

)}

{/\* ==============================================

MODE 2: PERSONAL HEALTH (Doctor acting as Patient)

============================================== \*/}

{viewMode === 'PERSONAL' && (

\<div className="grid grid-cols-1 md:grid-cols-2 gap-6"\>

{personalAppointments.length \> 0 ? (

personalAppointments.map((app, index) =\> {

const isPending = app.status === "Pending";

return (

\<div key={index} className={\`bg-\[#121620\] rounded-2xl p-6 border shadow-lg \${isPending ? 'border-yellow-500/30' : 'border-slate-800'}\`}\>

\<div className={\`absolute top-4 right-4 px-3 py-1 rounded-full text-\[10px\] font-bold uppercase tracking-wider border flex items-center gap-1 \${isPending ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}\`}\>

{app.status}

\</div\>

\<h3 className="text-lg font-bold text-white mb-4"\>Dr. {app.doctor_name}\</h3\>

\<div className="space-y-3"\>

{isPending ? (

\<p className="text-xs text-yellow-500 font-medium"\>Awaiting doctor to assign date & time...\</p\>

) : (

\<p className="text-sm text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 inline-block"\>

{app.appointment_date} at {app.appointment_time}

\</p\>

)}

\<div className="bg-\[#0b0e14\] p-3 rounded-xl border border-slate-800/50 mt-2"\>

\<p className="text-xs text-slate-500 font-bold uppercase mb-1"\>Reason\</p\>

\<p className="text-sm text-slate-300 italic"\>"{app.reason}"\</p\>

\</div\>

\</div\>

\</div\>

);

})

) : (

\<div className="col-span-full text-center p-12 border border-slate-800 rounded-3xl text-slate-500"\>

\<HeartPulse size={48} className="mx-auto mb-4 opacity-50 text-emerald-500" /\>

\<h3 className="text-xl font-bold text-white mb-2"\>No Personal Consultations\</h3\>

\<p\>You haven't requested any checkups for yourself yet.\</p\>

\</div\>

)}

\</div\>

)}

{/\* --- PERSONAL BOOKING MODAL --- \*/}

{isBookingModalOpen && (

\<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"\>

\<div className="bg-\[#121620\] border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative"\>

\<button onClick={() =\> setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition"\>

\<X size={24} /\>

\</button\>

\<h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"\>

\<Plus className="text-emerald-400" /\> Book Personal Consult

\</h2\>

\<p className="text-sm text-slate-400 mb-6"\>Request an appointment with a fellow specialist.\</p\>

\<form onSubmit={handleBookPersonal} className="space-y-5"\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<User size={14} /\> Select Specialist

\</label\>

\<select

required

value={formData.doctor_wallet}

onChange={(e) =\> setFormData({...formData, doctor_wallet: e.target.value})}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none"

\>

\<option value="" disabled\>-- Choose a Colleague/Doctor --\</option\>

{doctorsList.map(doc =\> {

const cleanName = doc.name.replace(/^Dr\\\s\*/i, '');

// Don't let the doctor book themselves!

if(doc.wallet_address === userData.wallet_address) return null;

return (

\<option key={doc.wallet_address} value={doc.wallet_address}\>

Dr. {cleanName} ({doc.specialization \|\| 'Specialist'})

\</option\>

);

})}

\</select\>

\</div\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<FileText size={14} /\> Reason for Consult

\</label\>

\<textarea

required rows="3" placeholder="Describe your symptoms..."

value={formData.reason}

onChange={(e) =\> setFormData({...formData, reason: e.target.value})}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-emerald-500 outline-none"

\>\</textarea\>

\</div\>

\<button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition"\>

Send Request

\</button\>

{bookingMessage && (

\<div className="p-4 rounded-xl text-center font-bold text-sm bg-slate-800 text-white mt-2 border border-slate-700"\>

{bookingMessage}

\</div\>

)}

\</form\>

\</div\>

\</div\>

)}

\</div\>

);

};

export default DoctorAppointments;

## 35. frontend/src/components/CareTeam.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Shield, ShieldOff, User, Building, Activity, Lock, Unlock, Users, CheckCircle, XCircle, BadgeCheck } from 'lucide-react';

const CareTeam = ({ userData, role }) =\> {

const \[careTeam, setCareTeam\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[actionMessage, setActionMessage\] = useState('');

useEffect(() =\> {

fetchCareTeam();

}, \[userData\]);

const fetchCareTeam = async () =\> {

setLoading(true);

const userId = userData?.email \|\| userData?.wallet_address;

if (!userId) {

setLoading(false);

return;

}

try {

const res = await axios.get(\`\${API_BASE_URL}/care-team/\${userId}\`);

setCareTeam(res.data.care_team \|\| \[\]);

} catch (error) {

console.error("Failed to fetch Care Team:", error);

} finally {

setLoading(false);

}

};

const handleToggleAccess = async (doctorWallet, currentAccess) =\> {

const userId = userData?.email \|\| userData?.wallet_address;

const newAccessState = !currentAccess;

setCareTeam(prev =\> prev.map(doc =\>

doc.wallet_address === doctorWallet ? { ...doc, access_granted: newAccessState } : doc

));

try {

await axios.put(\`\${API_BASE_URL}/care-team/toggle-access\`, {

patient_email: userId,

doctor_wallet: doctorWallet,

grant_access: newAccessState

});

setActionMessage(newAccessState ? "\[OK\] Access Granted to Doctor" : "\[!\] Access Revoked from Doctor");

setTimeout(() =\> setActionMessage(''), 3000);

} catch (error) {

console.error("Failed to toggle access:", error);

setCareTeam(prev =\> prev.map(doc =\>

doc.wallet_address === doctorWallet ? { ...doc, access_granted: currentAccess } : doc

));

setActionMessage("\[X\] Failed to update blockchain permissions.");

setTimeout(() =\> setActionMessage(''), 3000);

}

};

// --- COMPUTED STATS ---

const totalDoctors = careTeam.length;

const grantedCount = careTeam.filter(doc =\> doc.access_granted).length;

const revokedCount = totalDoctors - grantedCount;

if (loading) return (

\<div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Verifying Blockchain Permissions...

\</div\>

);

return (

\<div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up"\>

{/\* Header Section \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden"\>

\<div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"\>\</div\>

\<div className="relative z-10"\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<Shield className="text-blue-500" size={28} /\> My Care Team

\</h2\>

\<p className="text-sm text-slate-400 mt-1"\>

{role === 'DOCTOR'

? "Manage doctors who have access to your personal health records."

: "Control which doctors can decrypt and view your medical history."}

\</p\>

\</div\>

\<div className="bg-\[#0b0e14\] px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2 relative z-10 shadow-lg"\>

\<Lock size={16} className="text-emerald-500" /\>

\<span className="text-xs font-bold text-slate-300 tracking-wider"\>WEB3 SECURED VAULT\</span\>

\</div\>

\</div\>

{/\* Notification Toast \*/}

{actionMessage && (

\<div className="bg-\[#0b0e14\] border border-slate-700 p-4 rounded-xl text-center font-bold text-sm text-white shadow-lg"\>

{actionMessage}

\</div\>

)}

{careTeam.length \> 0 ? (

\<\>

{/\* STATS WIDGETS \*/}

\<div className="grid grid-cols-1 md:grid-cols-3 gap-4"\>

\<div className="bg-\[#121620\] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg"\>

\<div className="bg-blue-500/10 p-3 rounded-xl text-blue-500"\>\<Users size={24} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-slate-500 uppercase"\>Total Doctors\</p\>

\<p className="text-2xl font-bold text-white"\>{totalDoctors}\</p\>

\</div\>

\</div\>

\<div className="bg-\[#121620\] border border-emerald-500/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg"\>

\<div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500"\>\<CheckCircle size={24} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-emerald-500/70 uppercase"\>Access Granted\</p\>

\<p className="text-2xl font-bold text-emerald-400"\>{grantedCount}\</p\>

\</div\>

\</div\>

\<div className="bg-\[#121620\] border border-rose-500/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg"\>

\<div className="bg-rose-500/10 p-3 rounded-xl text-rose-500"\>\<XCircle size={24} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-rose-500/70 uppercase"\>Access Revoked\</p\>

\<p className="text-2xl font-bold text-rose-400"\>{revokedCount}\</p\>

\</div\>

\</div\>

\</div\>

{/\* DOCTORS GRID \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children animate-fade-in-up mt-8"\>

{careTeam.map((doc, index) =\> (

\<div key={index} className={\`bg-\[#121620\] rounded-3xl p-6 border transition-all shadow-xl relative overflow-hidden group card-hover \${doc.access_granted ? 'border-emerald-500/30' : 'border-rose-500/30 opacity-80'}\`}\>

\<div className={\`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 \${doc.access_granted ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' : 'bg-rose-500/5 group-hover:bg-rose-500/10'}\`}\>\</div\>

\<div className="flex justify-between items-start mb-4 relative z-10"\>

\<div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-slate-700 shadow-lg group-hover:shadow-xl transition-all"\>

{doc.name.substring(0, 2).toUpperCase()}

\</div\>

\<div className={\`px-2 py-1 rounded-md text-\[10px\] font-bold uppercase tracking-wider flex items-center gap-1 border \${doc.access_granted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}\`}\>

{doc.access_granted ? \<Unlock size={10} /\> : \<Lock size={10} /\>}

{doc.access_granted ? 'Active' : 'Blocked'}

\</div\>

\</div\>

\<h3 className="text-lg font-bold text-white mb-1 relative z-10 group-hover:text-blue-400 transition-colors flex items-center gap-2"\>

Dr. {doc.name.replace(/^Dr\\\s\*/i, '')}

{doc.is_verified && (

\<BadgeCheck

className="text-blue-500 flex-shrink-0"

size={18}

title="Verified & Credentialed by BioChain Node Admin"

/\>

)}

\</h3\>

\<p className="text-xs text-blue-400 font-medium mb-4 relative z-10"\>{doc.specialization}\</p\>

\<div className="space-y-2 mb-6"\>

\<p className="text-sm text-slate-400 flex items-center gap-2"\>\<Building size={14} className="text-slate-500"/\> {doc.hospital}\</p\>

\</div\>

\<button

onClick={() =\> handleToggleAccess(doc.wallet_address, doc.access_granted)}

className={\`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg \${doc.access_granted ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'}\`}

\>

{doc.access_granted ? \<\>\<ShieldOff size={18} /\> Revoke Access\</\> : \<\>\<Shield size={18} /\> Grant Access\</\>}

\</button\>

\</div\>

))}

\</div\>

{/\* PERMISSION AUDIT LOG TABLE \*/}

\<div className="bg-\[#121620\] rounded-3xl border border-slate-800 shadow-xl overflow-hidden mt-8"\>

\<div className="bg-\[#0b0e14\] px-6 py-4 border-b border-slate-800"\>

\<h3 className="text-sm font-bold text-white uppercase tracking-wider"\>Permission Audit Log\</h3\>

\</div\>

\<div className="overflow-x-auto"\>

\<table className="w-full text-left border-collapse"\>

\<thead\>

\<tr className="bg-\[#0b0e14\]/50 border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider"\>

\<th className="py-3 px-6 font-bold"\>Doctor Name\</th\>

\<th className="py-3 px-6 font-bold"\>Specialization\</th\>

\<th className="py-3 px-6 font-bold"\>Wallet ID\</th\>

\<th className="py-3 px-6 font-bold text-right"\>Current Status\</th\>

\</tr\>

\</thead\>

\<tbody className="text-sm divide-y divide-slate-800/50"\>

{careTeam.map((doc, idx) =\> (

\<tr key={idx} className="hover:bg-slate-800/30 transition"\>

\<td className="py-4 px-6 font-bold text-white"\>Dr. {doc.name.replace(/^Dr\\\s\*/i, '')}\</td\>

\<td className="py-4 px-6 text-slate-400"\>{doc.specialization}\</td\>

\<td className="py-4 px-6 text-slate-500 font-mono text-xs"\>{doc.wallet_address}\</td\>

\<td className="py-4 px-6 text-right"\>

\<span className={\`inline-flex px-2.5 py-1 rounded-full text-\[10px\] font-bold uppercase tracking-wider border \${doc.access_granted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}\`}\>

{doc.access_granted ? 'Granted' : 'Revoked'}

\</span\>

\</td\>

\</tr\>

))}

\</tbody\>

\</table\>

\</div\>

\</div\>

\</\>

) : (

\<div className="col-span-full bg-\[#121620\] border border-slate-800 rounded-3xl p-12 text-center text-slate-500 shadow-xl"\>

\<Shield size={48} className="mx-auto mb-4 opacity-50" /\>

\<h3 className="text-xl font-bold text-white mb-2"\>No Authorized Doctors Yet\</h3\>

\<p\>When you book an appointment, the treating doctor will appear here for you to manage their access.\</p\>

\</div\>

)}

\</div\>

);

};

export default CareTeam;

## 36. frontend/src/components/DrugInteractionChecker.jsx

import React, { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import {

Pill, Plus, X, Zap, AlertTriangle, ShieldCheck, AlertCircle,

Activity, Trash2, FlaskConical, Sparkles

} from 'lucide-react';

const DrugInteractionChecker = () =\> {

const \[drugs, setDrugs\] = useState(\[\]);

const \[inputValue, setInputValue\] = useState('');

const \[result, setResult\] = useState(null);

const \[loading, setLoading\] = useState(false);

const addDrug = () =\> {

const raw = inputValue.trim();

if (!raw) return;

// Split by comma, plus, or pipe to support multi-drug input

const newDrugs = raw

.split(/\[,+\|\]/)

.map(d =\> d.trim())

.filter(d =\> d.length \> 0 && !drugs.includes(d));

if (newDrugs.length \> 0) {

setDrugs(\[...drugs, ...newDrugs\]);

setInputValue('');

setResult(null);

}

};

const removeDrug = (drugToRemove) =\> {

setDrugs(drugs.filter(d =\> d !== drugToRemove));

setResult(null);

};

// Auto-split: when user types a comma, plus, or pipe, immediately add the drug

const handleInputChange = (e) =\> {

const val = e.target.value;

const lastChar = val.slice(-1);

if (\[',', '+', '\|'\].includes(lastChar)) {

const drugName = val.slice(0, -1).trim();

if (drugName && !drugs.includes(drugName)) {

setDrugs(prev =\> \[...prev, drugName\]);

setResult(null);

}

setInputValue('');

} else {

setInputValue(val);

}

};

const handleKeyDown = (e) =\> {

if (e.key === 'Enter') {

e.preventDefault();

addDrug();

}

};

const analyzeInteractions = async () =\> {

if (drugs.length === 0) return;

setLoading(true);

setResult(null);

try {

const res = await axios.post(\`\${API_BASE_URL}/api/ai/check-drugs\`, { drugs });

setResult(res.data);

} catch (error) {

console.error("Drug check failed:", error);

setResult({

status: "Error",

risk_level: "Unknown",

warning_message: "Network error. Could not reach the AI analysis engine."

});

} finally {

setLoading(false);

}

};

const getRiskConfig = (level) =\> {

switch (level) {

case 'Safe':

return {

icon: ShieldCheck,

color: 'emerald',

bg: 'bg-emerald-500/10',

border: 'border-emerald-500/30',

text: 'text-emerald-400',

glow: 'shadow-\[0_0_30px_rgba(16,185,129,0.15)\]',

label: 'No Interactions Detected'

};

case 'Moderate':

return {

icon: AlertCircle,

color: 'amber',

bg: 'bg-amber-500/10',

border: 'border-amber-500/30',

text: 'text-amber-400',

glow: 'shadow-\[0_0_30px_rgba(245,158,11,0.15)\]',

label: 'Moderate Risk -- Monitor Required'

};

case 'Severe':

return {

icon: AlertTriangle,

color: 'rose',

bg: 'bg-rose-500/10',

border: 'border-rose-500/30',

text: 'text-rose-400',

glow: 'shadow-\[0_0_30px_rgba(244,63,94,0.2)\]',

label: 'Severe Risk -- Contraindication Alert'

};

default:

return {

icon: AlertCircle,

color: 'slate',

bg: 'bg-slate-500/10',

border: 'border-slate-500/30',

text: 'text-slate-400',

glow: '',

label: 'Analysis Unavailable'

};

}

};

return (

\<div className="space-y-6 animate-fade-in-up max-w-4xl"\>

{/\* Header Card \*/}

\<div className="bg-\[#121620\] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden"\>

\<div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-2xl"\>\</div\>

\<div className="flex items-center gap-4 mb-2 relative z-10"\>

\<div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl text-purple-400 border border-purple-500/20"\>

\<FlaskConical size={24} /\>

\</div\>

\<div\>

\<h2 className="text-xl font-bold text-white flex items-center gap-2"\>

AI Drug Interaction Checker

\<span className="text-\[9px\] bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"\>

Gemini AI

\</span\>

\</h2\>

\<p className="text-xs text-slate-500 mt-0.5"\>Enter medications to analyze potential drug-drug interactions using clinical AI\</p\>

\</div\>

\</div\>

\</div\>

{/\* Drug Input Section \*/}

\<div className="bg-\[#121620\] rounded-2xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"\>

\<Pill size={14} /\> Current Medications

\</h3\>

{/\* Drug Pills \*/}

\<div className="flex flex-wrap gap-2 mb-4 min-h-\[44px\]"\>

{drugs.length === 0 && (

\<p className="text-xs text-slate-600 italic py-2"\>No medications added yet. Type a drug name below and press Enter.\</p\>

)}

{drugs.map((drug) =\> (

\<span

key={drug}

className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-lg text-sm font-bold group hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200"

\>

\<Pill size={12} /\>

{drug}

\<button

onClick={() =\> removeDrug(drug)}

className="opacity-50 group-hover:opacity-100 hover:text-rose-400 transition"

\>

\<X size={14} /\>

\</button\>

\</span\>

))}

\</div\>

{/\* Input Row \*/}

\<div className="flex gap-3"\>

\<div className="relative flex-1"\>

\<Pill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} /\>

\<input

type="text"

placeholder="e.g. Aspirin, Warfarin, Metformin..."

value={inputValue}

onChange={handleInputChange}

onKeyDown={handleKeyDown}

className="w-full bg-\[#0b0e14\] text-sm text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition placeholder:text-slate-600"

/\>

\</div\>

\<button

onClick={addDrug}

disabled={!inputValue.trim()}

className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-200 shadow-lg shadow-purple-900/20 disabled:shadow-none"

\>

\<Plus size={16} /\> Add

\</button\>

\</div\>

{/\* Analyze Button \*/}

\<button

onClick={analyzeInteractions}

disabled={drugs.length === 0 \|\| loading}

className="w-full mt-5 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:via-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-purple-900/20 disabled:shadow-none active:scale-\[0.98\] group"

\>

{loading ? (

\<\>

\<Activity className="animate-spin" size={18} /\>

Analyzing {drugs.length} Medication{drugs.length !== 1 ? 's' : ''} with Gemini AI...

\</\>

) : (

\<\>

\<Sparkles size={18} className="group-hover:rotate-12 transition-transform" /\>

Analyze Drug Interactions ({drugs.length} Drug{drugs.length !== 1 ? 's' : ''})

\</\>

)}

\</button\>

{drugs.length \> 0 && (

\<button

onClick={() =\> { setDrugs(\[\]); setResult(null); }}

className="w-full mt-2 py-2 text-xs text-slate-600 hover:text-rose-400 transition flex items-center justify-center gap-1"

\>

\<Trash2 size={12} /\> Clear all medications

\</button\>

)}

\</div\>

{/\* Result Card \*/}

{result && !loading && (

\<div className={\`bg-\[#121620\] rounded-2xl border \${getRiskConfig(result.risk_level).border} \${getRiskConfig(result.risk_level).glow} overflow-hidden animate-fade-in-up\`}\>

{/\* Result Header \*/}

\<div className={\`\${getRiskConfig(result.risk_level).bg} p-5 border-b \${getRiskConfig(result.risk_level).border} flex items-center gap-4\`}\>

\<div className={\`p-3 rounded-xl \${getRiskConfig(result.risk_level).bg} \${getRiskConfig(result.risk_level).text} border \${getRiskConfig(result.risk_level).border}\`}\>

{React.createElement(getRiskConfig(result.risk_level).icon, { size: 24 })}

\</div\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-0.5"\>Risk Assessment\</p\>

\<h3 className={\`text-lg font-bold \${getRiskConfig(result.risk_level).text}\`}\>

{getRiskConfig(result.risk_level).label}

\</h3\>

\</div\>

\<div className="ml-auto"\>

\<span className={\`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider \${getRiskConfig(result.risk_level).bg} \${getRiskConfig(result.risk_level).text} border \${getRiskConfig(result.risk_level).border}\`}\>

{result.risk_level === 'Severe' && \<AlertTriangle size={12} /\>}

{result.risk_level}

\</span\>

\</div\>

\</div\>

{/\* Result Body \*/}

\<div className="p-6"\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-2"\>Clinical Analysis\</p\>

\<div className="bg-\[#0b0e14\] rounded-xl border border-slate-800 p-4"\>

\<p className="text-sm text-slate-300 leading-relaxed"\>{result.warning_message}\</p\>

\</div\>

{/\* Analyzed Drugs Summary \*/}

\<div className="mt-4 flex flex-wrap gap-2"\>

\<span className="text-\[10px\] font-bold text-slate-600 uppercase tracking-wider mr-2 self-center"\>Analyzed:\</span\>

{drugs.map((drug) =\> (

\<span key={drug} className="text-\[10px\] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md font-bold border border-slate-700"\>

{drug}

\</span\>

))}

\</div\>

{/\* Disclaimer \*/}

\<div className="mt-5 pt-4 border-t border-slate-800"\>

\<p className="text-\[10px\] text-slate-600 flex items-center gap-1.5"\>

\<ShieldCheck size={10} className="text-slate-700" /\>

AI-powered analysis via BioChain Clinical Engine. Always verify with your prescribing physician.

\</p\>

\</div\>

\</div\>

\</div\>

)}

\</div\>

);

};

export default DrugInteractionChecker;

## 37. frontend/src/components/AIAssistantWidget.jsx

import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Bot, X, Send, Sparkles, Activity } from 'lucide-react';

const INITIAL_MESSAGE = { sender: 'ai', text: \`Hi there! I'm your BioChain AI Assistant. How can I help you today?\` };

const AIAssistantWidget = ({ userData, role }) =\> {

const \[isOpen, setIsOpen\] = useState(false);

const \[messages, setMessages\] = useState(\[INITIAL_MESSAGE\]);

const \[inputText, setInputText\] = useState('');

const \[isTyping, setIsTyping\] = useState(false);

const messagesEndRef = useRef(null);

useEffect(() =\> {

messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

}, \[messages\]);

// Clear chat history on close for privacy

const handleToggleChat = () =\> {

if (isOpen) {

setTimeout(() =\> setMessages(\[INITIAL_MESSAGE\]), 300);

}

setIsOpen(prev =\> !prev);

};

const handleSendMessage = async (e) =\> {

e.preventDefault();

if (!inputText.trim() \|\| isTyping) return;

const userMsg = inputText.trim();

setMessages(prev =\> \[...prev, { sender: 'user', text: userMsg }\]);

setInputText('');

setIsTyping(true);

const userId = role === 'PATIENT' ? userData?.email : userData?.wallet_address;

try {

const res = await axios.post(\`\${API_BASE_URL}/api/ai/chat\`, {

user_id: userId,

role: role,

message: userMsg

});

// Strip markdown bold (\*\*text\*\*) from Gemini output

const cleaned = (res.data.reply \|\| '').replace(/\\\\(.\*?)\\\\/g, '\$1').replace(/\\(.\*?)\\/g, '\$1');

setMessages(prev =\> \[...prev, { sender: 'ai', text: cleaned }\]);

} catch (error) {

setMessages(prev =\> \[...prev, { sender: 'ai', text: "Network error. Node connection lost." }\]);

} finally {

setIsTyping(false);

}

};

return (

\<div className="fixed bottom-6 right-6 z-\[100\] flex flex-col items-end"\>

{/\* CHAT WINDOW \*/}

{isOpen && (

\<div className="bg-\[#121620\]/95 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-emerald-900/20 w-80 sm:w-96 h-\[28rem\] rounded-3xl mb-4 flex flex-col overflow-hidden"\>

{/\* Header \*/}

\<div className="bg-\[#0b0e14\] p-4 border-b border-slate-700 flex justify-between items-center"\>

\<div className="flex items-center gap-3"\>

\<div className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/30 text-emerald-400"\>

\<Bot size={20} /\>

\</div\>

\<div\>

\<h3 className="font-bold text-white text-sm flex items-center gap-1"\>

BioChain AI \<Sparkles size={12} className="text-emerald-400" /\>

\</h3\>

\<p className="text-\[10px\] text-emerald-500 font-bold tracking-wider uppercase flex items-center gap-1"\>

\<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"\>\</span\> Online

\</p\>

\</div\>

\</div\>

\<button onClick={handleToggleChat} className="text-slate-400 hover:text-white transition"\>

\<X size={20} /\>

\</button\>

\</div\>

{/\* Messages \*/}

\<div className="flex-1 p-4 overflow-y-auto space-y-4"\>

{messages.map((msg, idx) =\> (

\<div key={idx} className={\`flex \${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2\`}\>

{msg.sender === 'ai' && (

\<div className="w-6 h-6 rounded-full bg-emerald-500/10 flex-shrink-0 flex items-center justify-center border border-emerald-500/30 text-emerald-500 mt-1"\>

\<Bot size={12} /\>

\</div\>

)}

\<div className={\`px-4 py-2.5 max-w-\[80%\] rounded-2xl text-sm leading-relaxed \${

msg.sender === 'user'

? 'bg-blue-600 text-white rounded-br-sm shadow-lg'

: 'bg-\[#0b0e14\] text-slate-300 border border-slate-800 rounded-bl-sm shadow-md'

}\`}\>

{msg.text}

\</div\>

\</div\>

))}

{/\* Typing dots \*/}

{isTyping && (

\<div className="flex justify-start gap-2"\>

\<div className="w-6 h-6 rounded-full bg-emerald-500/10 flex-shrink-0 flex items-center justify-center border border-emerald-500/30 text-emerald-500 mt-1"\>

\<Activity size={12} className="animate-spin" /\>

\</div\>

\<div className="px-4 py-3 rounded-2xl bg-\[#0b0e14\] border border-slate-800 rounded-bl-sm flex gap-1 items-center"\>

\<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"\>\</div\>

\<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}\>\</div\>

\<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}\>\</div\>

\</div\>

\</div\>

)}

\<div ref={messagesEndRef} /\>

\</div\>

{/\* Input \*/}

\<form onSubmit={handleSendMessage} className="p-3 bg-\[#0b0e14\] border-t border-slate-700 flex gap-2"\>

\<input

type="text"

placeholder="Ask BioChain AI..."

value={inputText}

onChange={(e) =\> setInputText(e.target.value)}

className="flex-1 bg-\[#121620\] text-sm text-white px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 transition"

/\>

\<button

type="submit"

disabled={!inputText.trim() \|\| isTyping}

className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow-lg"

\>

\<Send size={18} /\>

\</button\>

\</form\>

\</div\>

)}

{/\* FLOATING BUTTON \*/}

\<button

onClick={handleToggleChat}

className={\`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 \${

isOpen

? 'bg-rose-500 hover:bg-rose-400 rotate-90 text-white'

: 'bg-emerald-500 hover:bg-emerald-400 text-\[#0b0e14\] shadow-emerald-500/40 hover:scale-110'

}\`}

\>

{isOpen ? \<X size={24} /\> : \<Bot size={28} /\>}

\</button\>

\</div\>

);

};

export default AIAssistantWidget;

## 38. frontend/src/components/MyRecords.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { FileText, Download, Printer, ShieldCheck, Calendar, Building, User, Activity, X, Plus, UploadCloud } from 'lucide-react';

const MyRecords = ({ userData }) =\> {

const \[records, setRecords\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[selectedRecord, setSelectedRecord\] = useState(null);

// Fetch records from backend

useEffect(() =\> {

const fetchRecords = async () =\> {

try {

const pid = userData?.email \|\| userData?.wallet_address \|\| userData?.id;

if (!pid) return;

const res = await axios.get(\`\${API_BASE_URL}/record/patient/\${pid}\`);

if (res.data.status === "Success") {

setRecords(res.data.records);

}

} catch (error) {

console.error("Error fetching records:", error);

} finally {

setLoading(false);

}

};

fetchRecords();

}, \[userData\]);

const handlePrint = () =\> window.print();

if (loading) return \<div className="flex items-center justify-center h-64 text-emerald-400 animate-pulse gap-2"\>\<Activity className="animate-spin" /\> Syncing Vault from BioChain...\</div\>;

return (

\<div className="space-y-6"\>

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex justify-between items-center print:hidden animate-fade-in-up"\>

\<div\>

\<h3 className="text-xl font-bold text-white flex items-center gap-2"\>

\<ShieldCheck size={24} className="text-emerald-500" /\> Clinical Vault

\</h3\>

\<p className="text-sm text-slate-400 mt-1"\>Your decentralized medical history, securely anchored on IPFS.\</p\>

\</div\>

\<div className="flex items-center gap-6"\>

\<div className="text-right pr-6 border-r border-slate-800"\>

\<p className="text-3xl font-bold text-white"\>{records.length}\</p\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-widest mt-1"\>Total Records\</p\>

\</div\>

\</div\>

\</div\>

{/\* RECORDS GRID \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:hidden stagger-children animate-fade-in-up"\>

{records.map((record) =\> (

\<div key={record.\_id} className={\`bg-\[#121620\] rounded-3xl p-6 border transition-all shadow-xl group card-hover relative overflow-hidden \${record.isSelfUploaded ? 'border-slate-800 hover:border-blue-500/30' : 'border-slate-800 hover:border-emerald-500/30'}\`}\>

{/\* Glow Effect \*/}

\<div className={\`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-500 \${record.isSelfUploaded ? 'bg-blue-500/5 group-hover:bg-blue-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}\`}\>\</div\>

\<div className="flex justify-between items-start mb-6 relative z-10"\>

\<div className={\`p-3 rounded-xl transition-all duration-300 \${record.isSelfUploaded ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white'}\`}\>

\<FileText size={20} /\>

\</div\>

{/\* DYNAMIC BADGE: Web3 Verified vs Self-Uploaded \*/}

{record.isSelfUploaded ? (

\<span className="flex items-center gap-1 text-\[10px\] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md border border-blue-500/20"\>

\<UploadCloud size={12} /\> Self-Added

\</span\>

) : (

\<span className="flex items-center gap-1 text-\[10px\] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20"\>

\<ShieldCheck size={12} /\> Web3 Verified

\</span\>

)}

\</div\>

\<h4 className="text-lg font-bold text-white mb-3 line-clamp-1 relative z-10"\>{record.title}\</h4\>

\<div className="space-y-3 mb-6 relative z-10 p-4 bg-\[#0b0e14\] rounded-2xl border border-slate-800/50"\>

\<div className="flex items-start gap-3"\>

\<Building size={16} className="text-slate-500 mt-0.5"/\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Facility\</p\>

\<p className="text-sm text-slate-300 line-clamp-1"\>{record.hospital_name}\</p\>

\</div\>

\</div\>

\<div className="flex items-start gap-3"\>

\<User size={16} className="text-slate-500 mt-0.5"/\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Issued By\</p\>

\<p className="text-sm text-slate-300 line-clamp-1"\>

{record.doctor_name

? (record.doctor_name.includes('Dr.') ? record.doctor_name : \`Dr. \${record.doctor_name}\`)

: \`Dr. \${record.doctor_wallet?.substring(0, 6)}...\`}

\</p\>

\</div\>

\</div\>

\<div className="flex items-start gap-3"\>

\<Calendar size={16} className="text-slate-500 mt-0.5"/\>

\<div\>

\<p className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Date\</p\>

\<p className="text-sm text-slate-300"\>{new Date(record.timestamp).toLocaleDateString()}\</p\>

\</div\>

\</div\>

\</div\>

\<div className="flex gap-3 pt-4 border-t border-slate-800 relative z-10"\>

\<button

onClick={() =\> setSelectedRecord(record)}

className="flex-1 bg-\[#0b0e14\] hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"

\>

\<FileText size={16} className="text-slate-400" /\> Details

\</button\>

\<a

href={\`https://ipfs.io/ipfs/\${record.ipfs_hash}\`}

target="\_blank"

rel="noreferrer"

className="px-4 bg-\[#0b0e14\] hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center shadow-lg hover:shadow-blue-900/20"

\>

\<Download size={18} /\>

\</a\>

\</div\>

\</div\>

))}

\</div\>

{/\* PRINT / VIEW MODAL (Same as before) \*/}

{selectedRecord && (

\<div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-8 print:static print:overflow-visible print:bg-white print:p-0"\>

\<div className="flex min-h-full items-start justify-center print:block print:min-h-0"\>

\<div className="bg-\[#121620\] print:bg-white border border-slate-700 print:border-none w-full max-w-3xl rounded-3xl p-8 shadow-2xl print:p-0 print:shadow-none relative mt-4 mb-10 print:m-0"\>

\<button onClick={() =\> setSelectedRecord(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition print:hidden"\>

\<X size={24} /\>

\</button\>

\<div className="print:text-black"\>

\<div className="flex justify-between items-start border-b border-slate-800 print:border-gray-300 pb-6 mb-6"\>

\<div\>

\<h2 className="text-2xl font-bold text-white print:text-black flex items-center gap-2"\>

\<Activity className="text-emerald-500 print:text-black" /\> BioChain Medical Record

\</h2\>

\</div\>

\<div className="text-right"\>

\<p className="text-sm font-bold text-white print:text-black"\>{selectedRecord.hospital_name}\</p\>

\<p className="text-xs text-slate-500 print:text-gray-500"\>{new Date(selectedRecord.timestamp).toLocaleDateString()}\</p\>

\</div\>

\</div\>

\<div className="mb-6"\>

\<h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-1"\>Record Title\</h4\>

\<p className="text-lg font-bold text-white print:text-black"\>{selectedRecord.title}\</p\>

\</div\>

\<div className="mb-8"\>

\<h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-2"\>Clinical Notes\</h4\>

\<div className="bg-\[#0b0e14\] print:bg-gray-50 p-4 rounded-xl border border-slate-800 text-slate-300 print:text-black leading-relaxed whitespace-pre-wrap"\>

{selectedRecord.diagnosis}

\</div\>

\</div\>

{/\* ATTACHED DOCUMENTS SECTION \*/}

{(selectedRecord.ipfs_hashes && selectedRecord.ipfs_hashes.length \> 0 \|\| selectedRecord.ipfs_hash) && (() =\> {

// Normalize backwards compatibility for older records with single string \`ipfs_hash\`

const hashes = selectedRecord.ipfs_hashes && selectedRecord.ipfs_hashes.length \> 0

? selectedRecord.ipfs_hashes

: \[selectedRecord.ipfs_hash\];

return (

\<div className="mb-8 border-t border-slate-800 pt-6 print:border-gray-300"\>

\<h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"\>

\<FileText size={16} className="text-emerald-400 print:text-gray-500"/\> Attached Documents ({hashes.length})

\</h4\>

\<div className="space-y-6"\>

{hashes.map((hash, idx) =\> (

\<div key={idx} className="border border-slate-700 print:border-none rounded-xl overflow-hidden bg-slate-900/50 print:bg-transparent print:break-before-page print:mt-10"\>

\<div className="bg-slate-800/80 print:hidden px-4 py-2 flex justify-between items-center border-b border-slate-700"\>

\<span className="text-xs font-bold text-slate-400"\>Document {idx + 1}\</span\>

\<a

href={\`https://ipfs.io/ipfs/\${hash}\`}

target="\_blank"

rel="noopener noreferrer"

className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"

\>

Open Full Screen

\</a\>

\</div\>

\<div className="h-96 print:h-\[1000px\] print:w-full relative group bg-\[#0b0e14\] print:bg-transparent"\>

{/\* Loading/Fallback Layer \*/}

\<div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2 z-0 print:hidden"\>

\<Activity className="animate-spin text-emerald-500" /\>

\<span className="text-xs font-bold"\>Loading from IPFS...\</span\>

\</div\>

{/\* Attempt to load as an image first. If it fails (e.g., PDF), the onError handler hides it,

and the iframe behind it becomes visible. We use object-cover/contain to fit the image perfectly. \*/}

\<div className="absolute inset-0 z-10 flex items-center justify-center p-2 print:p-0"\>

\<iframe

src={\`https://ipfs.io/ipfs/\${hash}\`}

className="w-full h-full border-none print:w-full print:h-full"

style={{ backgroundColor: 'transparent' }}

title={\`Medical Document \${idx + 1} Fallback\`}

/\>

{/\* We place the img on top. If it's a valid image, it covers the iframe. If not, it's hidden. \*/}

\<img

src={\`https://ipfs.io/ipfs/\${hash}\`}

alt={\`Medical Document \${idx + 1}\`}

className="absolute inset-0 w-full h-full object-contain bg-\[#0b0e14\] print:bg-transparent z-20"

onError={(e) =\> {

e.target.style.display = 'none'; // Hide img if it's a PDF/unsupported

}}

/\>

\</div\>

\</div\>

\</div\>

))}

\</div\>

\</div\>

);

})()}

\<div className="flex justify-between items-end border-t border-slate-800 print:border-gray-300 pt-6"\>

\<div\>

\<h4 className="text-xs font-bold text-slate-500 print:text-gray-500 uppercase tracking-wider mb-1"\>Source\</h4\>

\<p className="text-sm font-bold text-white print:text-black"\>

{selectedRecord.isSelfUploaded

? "Self-Added"

: (selectedRecord.doctor_name

? (selectedRecord.doctor_name.includes('Dr.') ? selectedRecord.doctor_name : \`Dr. \${selectedRecord.doctor_name}\`)

: \`Dr. \${selectedRecord.doctor_wallet?.substring(0, 6)}...\`)}

\</p\>

\</div\>

\</div\>

\</div\>

\<div className="mt-8 flex gap-4 print:hidden"\>

\<button onClick={handlePrint} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold flex justify-center gap-2"\>\<Printer size={20} /\> Print\</button\>

\</div\>

\</div\>

\</div\>

\</div\>

)}

\</div\>

);

};

export default MyRecords;

## 39. frontend/src/components/UploadData.jsx

import React, { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { UploadCloud, FileText, Calendar, Activity, ShieldCheck, Clock } from 'lucide-react';

const UploadData = ({ userData }) =\> {

const \[formData, setFormData\] = useState({

date: '',

time: '',

ampm: 'AM',

summary: '',

notes: '',

vitals: ''

});

const \[files, setFiles\] = useState(\[\]);

const \[loading, setLoading\] = useState(false);

const \[message, setMessage\] = useState('');

const handleChange = (e) =\> {

setFormData({ ...formData, \[e.target.name\]: e.target.value });

};

const handleSetCurrentDateTime = () =\> {

const now = new Date();

const yyyy = now.getFullYear();

const mm = String(now.getMonth() + 1).padStart(2, '0');

const dd = String(now.getDate()).padStart(2, '0');

let hours = now.getHours();

const ampm = hours \>= 12 ? 'PM' : 'AM';

hours = hours % 12;

hours = hours ? hours : 12;

const minutes = String(now.getMinutes()).padStart(2, '0');

setFormData({

...formData,

date: \`\${yyyy}-\${mm}-\${dd}\`,

time: \`\${String(hours).padStart(2, '0')}:\${minutes}\`,

ampm: ampm

});

};

const handleSubmit = async (e) =\> {

e.preventDefault();

setLoading(true);

let ipfsHashes = \[\];

try {

if (files.length \> 0) {

setMessage(\`\[T\] 1/2: Uploading \${files.length} document(s) to Pinata IPFS...\`);

// STEP 1: Upload Files to IPFS

const uploadData = new FormData();

files.forEach(file =\> {

uploadData.append("files", file);

});

const uploadRes = await axios.post(\`\${API_BASE_URL}/upload/ipfs\`, uploadData, {

headers: { "Content-Type": "multipart/form-data" }

});

ipfsHashes = uploadRes.data.ipfs_hashes;

setMessage(\`\[OK\] Files Pinned! Anchoring to Vault...\`);

} else {

setMessage("\[T\] Anchoring record to BioChain DB...");

}

// STEP 2: Save to Database (Self-Uploaded Record)

const recordData = {

patient_id: userData.email \|\| userData.wallet_address \|\| "Unknown",

doctor_wallet: "Self-Uploaded (Patient)",

doctor_name: userData.name \|\| "Patient",

hospital_name: "External / Personal Record",

title: formData.summary,

diagnosis: \`Date: \${formData.date} \${formData.time} \${formData.ampm}\nNotes: \${formData.notes}\nVitals: \${formData.vitals}\`,

ipfs_hashes: ipfsHashes // Array of hashes

};

await axios.post(\`\${API_BASE_URL}/record/issue\`, recordData);

setMessage("\[!\] Success! Record securely added to your Vault.");

// Reset Form

setTimeout(() =\> {

setFormData({ date: '', time: '', ampm: 'AM', summary: '', notes: '', vitals: '' });

setFiles(\[\]);

setMessage('');

}, 3000);

} catch (error) {

console.error(error);

setMessage("\[X\] Error: " + (error.response?.data?.detail \|\| error.message));

} finally {

setLoading(false);

}

};

return (

\<div className="max-w-4xl mx-auto animate-fade-in-up"\>

\<div className="bg-\[#121620\] rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden"\>

\<div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"\>\</div\>

\<div className="mb-8 border-b border-slate-800 pb-6 relative z-10"\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<UploadCloud className="text-blue-500" size={28} /\> Upload Medical Data

\</h2\>

\<p className="text-sm text-slate-400 mt-2"\>Securely store your personal medical records, lab reports, and external prescriptions on IPFS.\</p\>

\</div\>

\<form onSubmit={handleSubmit} className="space-y-6"\>

{/\* Top Row Header with Auto-fill button \*/}

\<div className="flex justify-between items-center mb-1"\>

\<h3 className="text-sm font-bold text-slate-300"\>Record Details\</h3\>

\<button

type="button"

onClick={handleSetCurrentDateTime}

className="bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"

\>

\<Clock size={14} /\> Set Current Time

\</button\>

\</div\>

{/\* Top Row: Date, Time & Summary \*/}

\<div className="grid grid-cols-1 md:grid-cols-3 gap-6"\>

{/\* 1. DATE PICKER (Opens Calendar) \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<Calendar size={14} /\> Date

\</label\>

\<input

type="date"

name="date"

required

value={formData.date}

onChange={handleChange}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition cursor-pointer \[color-scheme:dark\]"

/\>

\</div\>

{/\* 2. TIME PICKER (Number Type + AM/PM Toggle) \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<Activity size={14} /\> Time

\</label\>

\<div className="flex bg-\[#0b0e14\] border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition"\>

\<input

type="text"

name="time"

required

placeholder="10:30"

maxLength="5"

onChange={(e) =\> {

let val = e.target.value;

// Simple auto-formatting for HH:MM

if (val.length === 2 && !val.includes(':') && formData.time.length \< val.length) {

val += ':';

}

setFormData({...formData, time: val});

}}

value={formData.time \|\| ""}

className="w-full bg-transparent p-4 text-white outline-none"

/\>

\<button

type="button"

onClick={() =\> setFormData({...formData, ampm: formData.ampm === 'AM' ? 'PM' : 'AM'})}

className="px-4 font-bold text-sm bg-slate-800 text-blue-400 hover:bg-slate-700 transition"

\>

{formData.ampm \|\| 'AM'}

\</button\>

\</div\>

\</div\>

{/\* 3. SUMMARY \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<FileText size={14} /\> Summary / Diagnosis

\</label\>

\<input

type="text"

name="summary"

required

placeholder="e.g. Annual Blood Test"

value={formData.summary}

onChange={handleChange}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition"

/\>

\</div\>

\</div\>

{/\* Detailed Notes \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block"\>

Detailed Notes

\</label\>

\<textarea

name="notes"

required

placeholder="Add your observations or doctor's comments here..."

rows="4"

value={formData.notes}

onChange={handleChange}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition resize-none"

\>\</textarea\>

\</div\>

{/\* Vitals \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"\>

\<Activity size={14} /\> Vitals (Optional)

\</label\>

\<input

type="text"

name="vitals"

placeholder="e.g. BP: 120/80, HR: 72 bpm"

value={formData.vitals}

onChange={handleChange}

className="w-full bg-\[#0b0e14\] p-4 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none transition"

/\>

\</div\>

{/\* Drag & Drop Attachment Zone \*/}

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block"\>

Attachments (Optional)

\</label\>

\<div className="border-2 border-dashed border-slate-700 bg-\[#0b0e14\] p-10 rounded-2xl text-center hover:border-blue-500 transition cursor-pointer relative group"\>

\<input

type="file"

multiple

onChange={(e) =\> setFiles(Array.from(e.target.files))}

className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"

/\>

\<UploadCloud className="mx-auto text-slate-500 mb-4 group-hover:text-blue-400 transition" size={48} /\>

\<p className="text-lg font-bold text-slate-300"\>

{files.length \> 0 ? \`\${files.length} file(s) selected\` : "Drag & Drop files here or click to browse"}

\</p\>

\<p className="text-sm text-slate-500 mt-2"\>Supports PDF, JPG, PNG (Max 10MB per file)\</p\>

{/\* Document Preview Tags \*/}

{files.length \> 0 && (

\<div className="mt-4 flex flex-wrap gap-2 justify-center"\>

{files.map((f, idx) =\> (

\<div key={idx} className="bg-slate-800 text-xs text-white px-3 py-1 rounded-full border border-slate-700 relative z-20"\>

{f.name}

\</div\>

))}

\</div\>

)}

\</div\>

\</div\>

{/\* Submit Button & Message \*/}

\<button

type="submit"

disabled={loading}

className={\`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg \${loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'}\`}

\>

{loading ? "Anchoring Data..." : \<\>\<ShieldCheck size={20} /\> Upload to BioChain\</\>}

\</button\>

{message && (

\<div className={\`p-4 rounded-xl text-center font-bold text-sm border \${message.includes('\[X\]') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}\`}\>

{message}

\</div\>

)}

\</form\>

\</div\>

\</div\>

);

};

export default UploadData;

## 40. frontend/src/components/MyProfile.jsx

import React, { useState } from 'react';

import axios from 'axios';

import { User, Phone, MapPin, Edit2, Check, X, UploadCloud, FileText, Activity, ShieldAlert } from 'lucide-react';

const InputField = ({ label, name, value, placeholder, type="text", onChange }) =\> (

\<div className="flex flex-col gap-1.5"\>

\<label className="text-\[10px\] text-slate-500 uppercase font-bold tracking-wider"\>{label}\</label\>

\<input

type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}

className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-emerald-500 focus:outline-none transition active:outline-none"

/\>

\</div\>

);

const DisplayField = ({ label, value }) =\> (

\<div\>

\<label className="text-\[10px\] text-slate-500 uppercase font-bold tracking-wider"\>{label}\</label\>

\<p className="text-white font-medium break-all"\>{value \|\| "N/A"}\</p\>

\</div\>

);

const MyProfile = ({ userRole, userId, userData, onProfileUpdate }) =\> {

const \[isEditing, setIsEditing\] = useState(false);

const \[loading, setLoading\] = useState(false);

const \[message, setMessage\] = useState("");

const \[formData, setFormData\] = useState({

name: userData?.name \|\| "",

email: userData?.email \|\| "",

phone: userData?.phone \|\| "",

emergencyContact: userData?.emergencyContact \|\| "",

address: userData?.address \|\| "",

bloodGroup: userData?.bloodGroup \|\| "",

allergies: userData?.allergies \|\| "",

specialization: userData?.specialization \|\| "",

});

const \[profilePhoto, setProfilePhoto\] = useState(null);

const \[certificate, setCertificate\] = useState(null);

const handleInputChange = (e) =\> {

setFormData({ ...formData, \[e.target.name\]: e.target.value });

};

const uploadToIPFS = async (file) =\> {

const fd = new FormData();

fd.append("file", file);

const res = await axios.post("http://localhost:8000/upload/ipfs", fd, {

headers: { "Content-Type": "multipart/form-data" }

});

return res.data.ipfs_hash;

};

const handleSave = async () =\> {

setLoading(true);

setMessage(userRole?.includes('DOCTOR') ? "Securing Credentials on Web3..." : "Securing Profile on Web3...");

try {

let photoHash = null;

let certHash = null;

if (profilePhoto) photoHash = await uploadToIPFS(profilePhoto);

if (userRole?.includes("DOCTOR") && certificate) certHash = await uploadToIPFS(certificate);

let updatePayload = {};

Object.keys(formData).forEach(key =\> {

if (formData\[key\] !== "") updatePayload\[key\] = formData\[key\];

});

if (photoHash) updatePayload.profile_photo_hash = photoHash;

if (userRole === "PATIENT") {

await axios.put(\`http://localhost:8000/update/patient/\${userId}\`, updatePayload);

} else if (userRole?.includes("DOCTOR")) {

if (certHash) updatePayload.certificate_hash = certHash;

await axios.put(\`http://localhost:8000/update/doctor/\${userId}\`, updatePayload);

}

// Propagate changes to the parent (App.jsx) to trigger a fresh render of the UI instantly

if (onProfileUpdate) {

onProfileUpdate(updatePayload);

}

setMessage("\[OK\] Profile Successfully Updated!");

setTimeout(() =\> {

setIsEditing(false);

setMessage("");

}, 3000);

} catch (error) {

console.error(error);

setMessage("\[X\] Error: " + (error.response?.data?.detail \|\| error.message));

} finally {

setLoading(false);

}

};

return (

\<div className="bg-\[#121620\] p-8 rounded-3xl border border-slate-800 max-w-3xl"\>

\<div className="flex justify-between items-start mb-10"\>

\<div className="flex items-center gap-5"\>

\<div className="relative"\>

\<div className={\`w-20 h-20 rounded-full flex items-center justify-center text-white border-2 border-slate-700 overflow-hidden \${userRole?.includes('DOCTOR') ? 'bg-blue-600/20 text-blue-500 border-blue-500/30' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'}\`}\>

{userData?.profile_photo_hash ? (

\<img

src={\`https://ipfs.io/ipfs/\${userData.profile_photo_hash}\`}

alt="Profile"

className="w-full h-full object-cover"

/\>

) : (

\<span className="text-2xl font-bold"\>{ (userData?.name \|\| "??").substring(0, 2).toUpperCase() }\</span\>

)}

\</div\>

\</div\>

\<div\>

\<h3 className="text-2xl font-bold text-white"\>{userData?.name \|\| "BioChain User"}\</h3\>

\<span className={\`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide \${userRole?.includes('DOCTOR') ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}\`}\>

Role: {userRole}

\</span\>

\</div\>

\</div\>

{!isEditing ? (

\<button onClick={() =\> setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition active:scale-95 shadow-md"\>

\<Edit2 size={16} /\> Edit Profile

\</button\>

) : (

\<div className="flex gap-3"\>

\<button onClick={() =\> setIsEditing(false)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition active:scale-95"\>Cancel\</button\>

\<button onClick={handleSave} disabled={loading} className={\`flex items-center gap-2 px-6 py-2.5 \${userRole?.includes('DOCTOR') ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'} text-white rounded-xl font-bold transition shadow-lg active:scale-95\`}\>

{loading ? \<span className="animate-pulse"\>{message \|\| "Saving..."}\</span\> : \<\>\<Check size={18} /\> Save Changes\</\>}

\</button\>

\</div\>

)}

\</div\>

{message && !loading && (

\<div className={\`mb-8 p-4 rounded-xl flex items-center gap-3 \${message.includes("\[X\]") ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}\`}\>

{message.includes("\[X\]") ? \<X size={20} /\> : \<Check size={20} /\>}

\<p className="font-medium text-sm"\>{message}\</p\>

\</div\>

)}

{/\* VIEW MODE \*/}

{!isEditing ? (

\<div className="space-y-8 animate-in fade-in duration-300"\>

\<div className="grid grid-cols-1 md:grid-cols-2 gap-8"\>

\<DisplayField label="Email Address" value={userData?.email} /\>

\<DisplayField label="Phone Number" value={userData?.phone} /\>

\<DisplayField label="Emergency Contact" value={userData?.emergencyContact} /\>

{userRole === 'PATIENT' && (

\<\>

\<DisplayField label="Blood Group" value={userData?.bloodGroup} /\>

\<DisplayField label="Allergies" value={userData?.allergies} /\>

\</\>

)}

{userRole?.includes('DOCTOR') && (

\<DisplayField label="Specialization" value={userData?.specialization} /\>

)}

\<div className="md:col-span-2"\>

\<DisplayField label="Resident Address" value={userData?.address} /\>

\</div\>

\<div className="md:col-span-2 p-5 bg-black/30 rounded-2xl border border-slate-800 border-dashed"\>

\<label className="text-\[10px\] text-slate-500 uppercase font-bold tracking-wider mb-2 block"\>Blockchain Identity Hash\</label\>

\<div className="flex items-center gap-3"\>

\<div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400"\>\<Activity size={18} /\>\</div\>

\<p className="font-mono text-emerald-500/80 text-sm break-all"\>

{userRole?.includes('DOCTOR') ? userId : (userData?.idHash \|\| "PENDING_BLOCKCHAIN_SYNC")}

\</p\>

\</div\>

\</div\>

\</div\>

\</div\>

) : (

/\* EDIT MODE \*/

\<div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300"\>

\<div className="p-6 border border-slate-800 rounded-3xl bg-black/20 shadow-inner"\>

\<h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4"\>\<User size={18} className="text-slate-400" /\> General Details\</h4\>

\<div className="grid grid-cols-1 md:grid-cols-2 gap-6"\>

\<InputField label="Full Name" name="name" value={formData.name} placeholder="John Doe" onChange={handleInputChange} /\>

\<InputField label="Email Address" name="email" value={formData.email} placeholder="doctor@biochain.ai" onChange={handleInputChange} /\>

\<InputField label="Phone Number" name="phone" value={formData.phone} placeholder="+1 234 567 890" onChange={handleInputChange} /\>

{userRole === "PATIENT" && \<InputField label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} placeholder="Family / Guardian Number" onChange={handleInputChange} /\>}

{userRole === "PATIENT" && \<InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} placeholder="O+, A-, etc." onChange={handleInputChange} /\>}

{userRole === "PATIENT" && \<InputField label="Allergies" name="allergies" value={formData.allergies} placeholder="Peanuts, Penicillin..." onChange={handleInputChange} /\>}

{userRole?.includes("DOCTOR") && \<InputField label="Specialization" name="specialization" value={formData.specialization} placeholder="Cardiologist, Neurologist..." onChange={handleInputChange} /\>}

\</div\>

\<div className="mt-6"\>

\<InputField label="Resident Address" name="address" value={formData.address} placeholder="123 Web3 Street, Crypto City" onChange={handleInputChange} /\>

\</div\>

\</div\>

\<div className="p-6 border border-slate-800 rounded-3xl bg-black/20 shadow-inner"\>

\<h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4"\>\<UploadCloud size={18} className="text-slate-400" /\> Secure Documents (IPFS Node)\</h4\>

\<div className="grid grid-cols-1 md:grid-cols-2 gap-6"\>

{/\* Profile Photo Upload \*/}

\<div className="relative group rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/5 bg-\[#0b0e14\] p-8 text-center transition cursor-pointer"\>

\<input type="file" accept="image/\*" onChange={(e)=\>setProfilePhoto(e.target.files\[0\])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /\>

\<UploadCloud className="mx-auto text-slate-500 mb-3 group-hover:text-emerald-500 transition group-hover:-translate-y-1" size={32} /\>

\<p className="text-sm font-bold text-white mb-1 tracking-wide"\>{profilePhoto ? profilePhoto.name : "Upload Profile Photo"}\</p\>

\<p className="text-\[11px\] text-slate-500 uppercase font-medium"\>PNG, JPG up to 5MB\</p\>

\</div\>

{/\* Doctor's Certificate Upload \*/}

{userRole?.includes("DOCTOR") && (

\<div className="relative group rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 bg-\[#0b0e14\] p-8 text-center transition cursor-pointer"\>

\<input type="file" accept="application/pdf" onChange={(e)=\>setCertificate(e.target.files\[0\])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /\>

\<FileText className="mx-auto text-slate-500 mb-3 group-hover:text-blue-500 transition group-hover:-translate-y-1" size={32} /\>

\<p className="text-sm font-bold text-white mb-1 tracking-wide"\>{certificate ? certificate.name : "Upload Medical Certificate"}\</p\>

\<p className="text-\[11px\] text-slate-500 uppercase font-medium"\>PDF documents only\</p\>

\</div\>

)}

\</div\>

\</div\>

\<div className="flex items-center gap-2 justify-center text-xs text-slate-500 pt-4"\>

\<ShieldAlert size={14} className="text-emerald-500" /\>

All documents are encrypted and pinned directly to the decentralized IPFS network.

\</div\>

\</div\>

)}

\</div\>

);

};

export default MyProfile;

## 41. frontend/src/components/PatientsDirectory.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Search, Users, Activity, FileText, Shield, ArrowRight, Phone, Lock } from 'lucide-react';

const PatientsDirectory = ({ doctorData, onSelectPatient }) =\> {

const \[patients, setPatients\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[searchTerm, setSearchTerm\] = useState('');

const \[accessDenied, setAccessDenied\] = useState(null); // Stores patient name if access denied

// Check permission then navigate to patient chart

const checkAndOpenPatient = async (patient) =\> {

const doctorWallet = doctorData?.wallet_address;

if (!doctorWallet) {

onSelectPatient && onSelectPatient(patient);

return;

}

try {

const res = await axios.get(\`\${API_BASE_URL}/care-team/check-access/\${patient.email}/\${doctorWallet}\`);

if (res.data.access_granted === false) {

setAccessDenied(patient.name);

setTimeout(() =\> setAccessDenied(null), 4000);

} else {

onSelectPatient && onSelectPatient(patient);

}

} catch (err) {

// If check fails or doctor not in care team, allow access (not in care team = no restriction)

onSelectPatient && onSelectPatient(patient);

}

};

useEffect(() =\> {

const fetchPatients = async () =\> {

try {

const response = await axios.get(\`\${API_BASE_URL}/api/patients\`);

setPatients(response.data.patients);

setLoading(false);

} catch (error) {

console.error("Error fetching patients:", error);

setLoading(false);

}

};

fetchPatients();

}, \[\]);

// Real-time Search Logic

const filteredPatients = patients.filter(patient =\>

patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) \|\|

patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) \|\|

patient.phone?.includes(searchTerm)

);

if (loading) return (

\<div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Fetching Global Patient Directory...

\</div\>

);

return (

\<div className="max-w-6xl mx-auto space-y-6"\>

{/\* Access Denied Alert \*/}

{accessDenied && (

\<div className="bg-rose-900/70 border border-rose-500/50 rounded-2xl p-4 flex items-center gap-3 text-rose-300 font-bold text-sm animate-pulse"\>

\<Lock size={18} className="shrink-0" /\>

Access Denied -- {accessDenied} has revoked your access to their medical records.

\</div\>

)}

{/\* Header & Search Bar \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4"\>

\<div\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<Users className="text-blue-500" size={28} /\> Global Patient Directory

\</h2\>

\<p className="text-sm text-slate-400 mt-1"\>Search and manage patients across the BioChain network.\</p\>

\</div\>

\<div className="relative w-full md:w-96"\>

\<Search className="absolute left-4 top-3.5 text-slate-500" size={20} /\>

\<input

type="text"

placeholder="Search by Name, Email or Phone..."

value={searchTerm}

onChange={(e) =\> setSearchTerm(e.target.value)}

className="w-full bg-\[#0b0e14\] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition shadow-inner"

/\>

\</div\>

\</div\>

{/\* Patients Grid \*/}

\<div className="bg-\[#121620\] rounded-3xl border border-slate-800 shadow-xl overflow-hidden"\>

\<div className="overflow-x-auto"\>

\<table className="w-full text-left border-collapse"\>

\<thead\>

\<tr className="bg-\[#0b0e14\] border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider"\>

\<th className="py-4 px-6 font-bold"\>Patient Details\</th\>

\<th className="py-4 px-6 font-bold"\>Contact Info\</th\>

\<th className="py-4 px-6 font-bold"\>Vitals Base\</th\>

\<th className="py-4 px-6 font-bold text-center"\>Web3 Status\</th\>

\<th className="py-4 px-6 font-bold text-right"\>Action\</th\>

\</tr\>

\</thead\>

\<tbody className="text-sm divide-y divide-slate-800/50"\>

{filteredPatients.length \> 0 ? (

filteredPatients.map((patient, index) =\> (

\<tr key={index} className="hover:bg-slate-800/30 transition group"\>

\<td className="py-4 px-6"\>

\<div className="flex items-center gap-3"\>

\<div className="w-10 h-10 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20"\>

{patient.name.substring(0, 2).toUpperCase()}

\</div\>

\<div\>

\<p className="font-bold text-white"\>{patient.name}\</p\>

\<p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"\>

\<Shield size={10} className="text-emerald-500"/\> ID: {patient.idHash ? patient.idHash.substring(0,10) + '...' : 'Pending'}

\</p\>

\</div\>

\</div\>

\</td\>

\<td className="py-4 px-6"\>

\<p className="text-slate-300"\>{patient.email}\</p\>

\<p className="text-xs text-slate-500 mt-1 flex items-center gap-1"\>\<Phone size={10}/\> {patient.phone}\</p\>

\</td\>

\<td className="py-4 px-6"\>

\<div className="flex gap-2"\>

\<span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded text-\[10px\] font-bold border border-rose-500/20"\>

{patient.bloodGroup \|\| 'N/A'}

\</span\>

\<span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-\[10px\] font-bold border border-yellow-500/20 max-w-\[100px\] truncate"\>

{patient.allergies \|\| 'None'}

\</span\>

\</div\>

\</td\>

\<td className="py-4 px-6 text-center"\>

\<span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-\[10px\] font-bold uppercase tracking-wider border border-emerald-500/20"\>

\<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"\>\</div\> Network Active

\</span\>

\</td\>

\<td className="py-4 px-6 text-right"\>

\<button

onClick={() =\> checkAndOpenPatient(patient)}

className="bg-slate-800 hover:bg-blue-600 text-white p-2.5 rounded-xl transition flex items-center justify-center w-full max-w-\[120px\] ml-auto gap-2 text-xs font-bold shadow-lg"

\>

Open Chart \<ArrowRight size={14} /\>

\</button\>

\</td\>

\</tr\>

))

) : (

\<tr\>

\<td colSpan="5" className="py-12 text-center text-slate-500"\>

\<Search className="mx-auto mb-3 opacity-50" size={32} /\>

\<p\>No patients found matching "{searchTerm}"\</p\>

\</td\>

\</tr\>

)}

\</tbody\>

\</table\>

\</div\>

\</div\>

\</div\>

);

};

export default PatientsDirectory;

## 42. frontend/src/components/IssueRecordModal.jsx

import React, { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { FileText, Upload, X, ShieldCheck } from 'lucide-react';

const IssueRecordModal = ({ isOpen, onClose, patient, doctorData, onSuccess }) =\> {

const \[title, setTitle\] = useState('');

const \[diagnosis, setDiagnosis\] = useState('');

const \[files, setFiles\] = useState(\[\]); // Support multiple files

const \[loading, setLoading\] = useState(false);

const \[message, setMessage\] = useState('');

if (!isOpen) return null;

const handleSubmit = async (e) =\> {

e.preventDefault();

setLoading(true);

let ipfsHashes = \[\];

try {

if (files.length \> 0) {

setMessage(\`\[T\] 1/2: Uploading \${files.length} document(s) to Pinata IPFS...\`);

// STEP 1: Upload Files to IPFS via FastAPI

const formData = new FormData();

files.forEach(file =\> {

formData.append("files", file); // Ensure backend accepts 'files'

});

const uploadRes = await axios.post(\`\${API_BASE_URL}/upload/ipfs\`, formData, {

headers: { "Content-Type": "multipart/form-data" }

});

ipfsHashes = uploadRes.data.ipfs_hashes;

setMessage(\`\[OK\] Files Pinned!\`);

}

setMessage(files.length \> 0 ? "\[T\] 2/2: Anchoring record to BioChain DB..." : "\[T\] Anchoring record to BioChain DB...");

// STEP 2: Save the Record details + IPFS Hash to DB

const recordData = {

patient_id: patient.email \|\| patient.id \|\| "Unknown_Patient", // Use email as consistent patient ID

doctor_wallet: doctorData.wallet_address \|\| doctorData.wallet \|\| "Unknown_Doc",

doctor_name: doctorData.name \|\| "Unknown Doctor", // Pass the doctor's name

hospital_name: doctorData.hospital_name \|\| "BioChain Node",

title: title,

diagnosis: diagnosis,

ipfs_hashes: ipfsHashes // Send the array of hashes (empty if no files)

};

await axios.post(\`\${API_BASE_URL}/record/issue\`, recordData);

setMessage("\[!\] Success! Medical Record Secured on Web3.");

// Close modal after 2 seconds

setTimeout(() =\> {

if (onSuccess) onSuccess(); // \<--- NEW: Call the callback to refresh standard table

onClose();

setMessage('');

setTitle('');

setDiagnosis('');

setFiles(\[\]);

}, 2000);

} catch (error) {

console.error(error);

setMessage("\[X\] Error: " + (error.response?.data?.detail \|\| error.message));

} finally {

setLoading(false);

}

};

return (

\<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"\>

\<div className="bg-\[#121620\] border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative"\>

\<button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition"\>

\<X size={24} /\>

\</button\>

\<h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"\>

\<FileText className="text-blue-400" /\> Issue Medical Record

\</h2\>

\<p className="text-sm text-slate-400 mb-6"\>Patient: \<span className="text-emerald-400 font-bold"\>{patient?.name \|\| 'Selected Patient'}\</span\>\</p\>

\<form onSubmit={handleSubmit} className="space-y-4"\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block"\>Record Title\</label\>

\<input type="text" required placeholder="e.g. Viral Fever Prescription" className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none"

value={title} onChange={(e) =\> setTitle(e.target.value)} /\>

\</div\>

\<div\>

\<label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block"\>Diagnosis / Notes\</label\>

\<textarea required placeholder="Clinical notes here..." rows="3" className="w-full bg-\[#0b0e14\] p-3 rounded-xl border border-slate-700 text-white focus:border-blue-500 outline-none"

value={diagnosis} onChange={(e) =\> setDiagnosis(e.target.value)}\>\</textarea\>

\</div\>

\<div className="border-2 border-dashed border-slate-700 p-4 rounded-xl text-center hover:border-blue-500 transition cursor-pointer relative"\>

\<input

type="file"

multiple

required={files.length === 0}

onChange={(e) =\> {

const newFiles = Array.from(e.target.files);

setFiles(prev =\> \[...prev, ...newFiles\]);

// Reset input so same file can be selected again if removed

e.target.value = null;

}}

className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"

/\>

\<Upload className="mx-auto text-slate-500 mb-2" size={24} /\>

\<p className="text-sm text-slate-300 font-bold"\>Click or Drag to upload PDF/X-Ray\</p\>

\<p className="text-xs text-slate-500 mb-2"\>Secured via Pinata IPFS\</p\>

{/\* Display selected files \*/}

{files.length \> 0 && (

\<div className="mt-4 space-y-2 relative z-20"\>

{files.map((f, index) =\> (

\<div key={index} className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg text-xs text-slate-300"\>

\<span className="truncate pr-2"\>{f.name}\</span\>

\<button

type="button"

onClick={(e) =\> {

e.stopPropagation();

setFiles(files.filter((\_, i) =\> i !== index));

}}

className="text-red-400 hover:text-red-300"

\>

\<X size={14} /\>

\</button\>

\</div\>

))}

\</div\>

)}

\</div\>

\<button type="submit" disabled={loading} className={\`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${loading ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'}\`}\>

{loading ? "Anchoring to Blockchain..." : \<\>\<ShieldCheck size={20} /\> Anchor Medical Record\</\>}

\</button\>

{message && \<p className="text-center text-sm font-bold mt-2 text-emerald-400"\>{message}\</p\>}

\</form\>

\</div\>

\</div\>

);

};

export default IssueRecordModal;

## 43. frontend/src/components/ProfileUpload.jsx

import React, { useState } from 'react';

import axios from 'axios';

const ProfileUpload = ({ userEmail }) =\> {

const \[file, setFile\] = useState(null);

const \[loading, setLoading\] = useState(false);

const \[message, setMessage\] = useState("");

const handleFileChange = (e) =\> {

setFile(e.target.files\[0\]);

};

const handleUploadAndSave = async () =\> {

if (!file) {

alert("Pehle ek file select karo bhai!");

return;

}

setLoading(true);

setMessage("\[T\] Uploading to IPFS via FastAPI...");

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

setMessage(\`\[pkg\] IPFS Hash Milya: \${ipfsHash} ... Profile update ho rahi hai!\`);

// Step 3: Naye Hash ko MongoDB mein User Profile ke sath link karo

const updateRes = await axios.put(\`http://localhost:8000/update/patient/\${userEmail}\`, {

profile_photo_hash: ipfsHash

});

if (updateRes.data.status === "Success") {

setMessage("\[OK\] Boom! Profile Successfully Updated with Web3 Hash!");

}

} catch (error) {

console.error(error);

setMessage("\[X\] Error: " + (error.response?.data?.detail \|\| error.message));

} finally {

setLoading(false);

}

};

return (

\<div style={{ padding: "20px", border: "1px solid \#00ffcc", borderRadius: "10px", marginTop: "20px", backgroundColor: "#1a1a2e", color: "white" }}\>

\<h3\>Upload Medical Doc / Photo\</h3\>

\<input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} /\>

\<br /\>

\<button

onClick={handleUploadAndSave}

disabled={loading}

style={{ padding: "10px 20px", backgroundColor: "#00ffcc", color: "black", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer" }}

\>

{loading ? "Uploading to Web3..." : "Secure Upload"}

\</button\>

\<p style={{ marginTop: "10px", fontSize: "14px", color: "#a8b2d1" }}\>{message}\</p\>

\</div\>

);

};

export default ProfileUpload;

## 44. frontend/src/components/NodeOverview.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { Stethoscope, Users, Server, Shield, ArrowRight, Activity, Database, FileText, Clock, Wifi, HardDrive, Cpu } from 'lucide-react';

const NodeOverview = ({ setActiveTab }) =\> {

const \[stats, setStats\] = useState({ total_patients: 0, total_doctors: 0, total_appointments: 0, transactions: 0 });

const \[activities, setActivities\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

useEffect(() =\> {

fetchStats();

}, \[\]);

const fetchStats = async () =\> {

try {

const res = await axios.get(\`\${API_BASE_URL}/api/admin/node-stats\`);

setStats(res.data.stats);

setActivities(res.data.activities);

} catch (error) {

console.error("Failed to fetch Node Stats:", error);

} finally {

setLoading(false);

}

};

if (loading) return (

\<div className="flex items-center justify-center h-64 text-purple-400 animate-pulse gap-3"\>

\<Server className="animate-spin" size={24} /\> Fetching Mainnet Telemetry...

\</div\>

);

return (

\<div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up"\>

{/\* Header \*/}

\<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"\>

\<div\>

\<h1 className="text-3xl font-bold text-white flex items-center gap-3"\>

\<div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500 border border-purple-500/20"\>

\<Server size={28} /\>

\</div\>

Enterprise Node Control Center

\</h1\>

\<p className="text-slate-400 mt-2 text-sm ml-\[52px\]"\>Monitor network telemetry, clinical staff deployment, and active smart contracts.\</p\>

\</div\>

\<div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20"\>

\<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-\[0_0_6px_rgba(16,185,129,0.8)\]"\>\</div\>

\<span className="text-xs font-bold text-emerald-400 uppercase tracking-wider"\>Network Online\</span\>

\</div\>

\</div\>

{/\* Top Stats Grid \*/}

\<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children"\>

{/\* Doctors Stat \*/}

\<div className="bg-\[#121620\] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-blue-500/30 relative overflow-hidden"\>

\<div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between items-start relative z-10"\>

\<div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"\>\<Stethoscope size={24} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Clinical Staff\</span\>

\</div\>

\<div className="relative z-10"\>

\<h2 className="text-4xl font-bold text-white"\>{stats.total_doctors}\</h2\>

\<p className="text-xs text-blue-400 mt-1 font-medium"\>Mapped to your node\</p\>

\</div\>

\</div\>

{/\* Patients Stat \*/}

\<div className="bg-\[#121620\] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-emerald-500/30 relative overflow-hidden"\>

\<div className="absolute -bottom-6 -right-6 w-28 h-28 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between items-start relative z-10"\>

\<div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"\>\<Users size={24} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Total Patients\</span\>

\</div\>

\<div className="relative z-10"\>

\<h2 className="text-4xl font-bold text-white"\>{stats.total_patients}\</h2\>

\<p className="text-xs text-emerald-400 mt-1 font-medium"\>Secured on Web3\</p\>

\</div\>

\</div\>

{/\* Node Status \*/}

\<div className="bg-\[#121620\] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-purple-500/30 relative overflow-hidden"\>

\<div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500/5 rounded-full group-hover:bg-purple-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between items-start relative z-10"\>

\<div className="bg-purple-500/10 p-3 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"\>\<Server size={24} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Node Status\</span\>

\</div\>

\<div className="relative z-10"\>

\<h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2"\>

\<span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-\[0_0_8px_rgba(16,185,129,0.6)\]"\>\</span\> Synced

\</h2\>

\<p className="text-xs text-slate-400 mt-2 font-mono"\>Mainnet Connection: Active\</p\>

\</div\>

\</div\>

{/\* Transactions Stat \*/}

\<div className="bg-\[#121620\] p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-44 group card-hover hover:border-amber-500/30 relative overflow-hidden"\>

\<div className="absolute -bottom-6 -right-6 w-28 h-28 bg-amber-500/5 rounded-full group-hover:bg-amber-500/10 transition-all duration-500"\>\</div\>

\<div className="flex justify-between items-start relative z-10"\>

\<div className="bg-amber-500/10 p-3 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"\>\<Shield size={24} /\>\</div\>

\<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider"\>Smart Contracts\</span\>

\</div\>

\<div className="relative z-10"\>

\<h2 className="text-4xl font-bold text-white"\>{stats.transactions.toLocaleString()}\</h2\>

\<p className="text-xs text-amber-400 mt-1 font-medium"\>Transactions Executed\</p\>

\</div\>

\</div\>

\</div\>

{/\* System Health + Quick Metrics Row \*/}

\<div className="grid grid-cols-1 md:grid-cols-3 gap-4"\>

\<div className="bg-\[#121620\] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-emerald-500/20 transition"\>

\<div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400"\>\<Wifi size={22} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Uptime\</p\>

\<p className="text-lg font-bold text-white"\>99.97%\</p\>

\</div\>

\</div\>

\<div className="bg-\[#121620\] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-blue-500/20 transition"\>

\<div className="bg-blue-500/10 p-3 rounded-xl text-blue-400"\>\<HardDrive size={22} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>IPFS Storage\</p\>

\<p className="text-lg font-bold text-white"\>2.4 GB \<span className="text-xs text-slate-500 font-normal"\>used\</span\>\</p\>

\</div\>

\</div\>

\<div className="bg-\[#121620\] rounded-2xl p-5 border border-slate-800 flex items-center gap-4 group hover:border-purple-500/20 transition"\>

\<div className="bg-purple-500/10 p-3 rounded-xl text-purple-400"\>\<Cpu size={22} /\>\</div\>

\<div\>

\<p className="text-xs font-bold text-slate-500 uppercase tracking-wider"\>Gas (Sponsored)\</p\>

\<p className="text-lg font-bold text-white"\>0.045 ETH\</p\>

\</div\>

\</div\>

\</div\>

\<div className="grid grid-cols-1 lg:grid-cols-2 gap-8"\>

{/\* Left: Quick Actions \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"\>

\<Activity className="text-purple-400" size={20} /\> Quick Actions

\</h3\>

\<div className="space-y-4"\>

\<button

onClick={() =\> setActiveTab('Staff Directory')}

className="w-full bg-\[#0b0e14\] hover:bg-purple-900/15 border border-slate-800 hover:border-purple-500/30 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group"

\>

\<div className="flex items-center gap-4"\>

\<div className="bg-purple-500/10 p-2.5 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200"\>\<Stethoscope size={20} /\>\</div\>

\<div className="text-left"\>

\<span className="text-sm font-bold text-slate-300 group-hover:text-white transition"\>Register New Doctor\</span\>

\<p className="text-\[10px\] text-slate-600 mt-0.5"\>Onboard clinical staff with Web3 identity\</p\>

\</div\>

\</div\>

\<ArrowRight size={18} className="text-slate-600 group-hover:text-purple-400 transition transform group-hover:translate-x-1" /\>

\</button\>

\<button

onClick={() =\> setActiveTab('Audit Logs')}

className="w-full bg-\[#0b0e14\] hover:bg-emerald-900/15 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group"

\>

\<div className="flex items-center gap-4"\>

\<div className="bg-emerald-500/10 p-2.5 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200"\>\<FileText size={20} /\>\</div\>

\<div className="text-left"\>

\<span className="text-sm font-bold text-slate-300 group-hover:text-white transition"\>View Audit Logs\</span\>

\<p className="text-\[10px\] text-slate-600 mt-0.5"\>Cryptographic record of all events\</p\>

\</div\>

\</div\>

\<ArrowRight size={18} className="text-slate-600 group-hover:text-emerald-400 transition transform group-hover:translate-x-1" /\>

\</button\>

\</div\>

\</div\>

{/\* Right: Network Activity \*/}

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl"\>

\<h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"\>

\<Database className="text-slate-400" size={20} /\> Network Activity Log

\</h3\>

\<div className="space-y-4 custom-scrollbar max-h-\[300px\] overflow-y-auto pr-2"\>

{activities.length \> 0 ? (

activities.map((act) =\> (

\<div key={act.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-\[#0b0e14\] transition border border-transparent hover:border-slate-800 group"\>

\<div className={\`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 \${

act.type === 'system' ? 'bg-purple-500 shadow-\[0_0_8px_rgba(168,85,247,0.6)\]' :

act.type === 'contract' ? 'bg-amber-500 shadow-\[0_0_8px_rgba(245,158,11,0.6)\]' :

act.type === 'staff' ? 'bg-blue-500 shadow-\[0_0_8px_rgba(59,130,246,0.6)\]' :

'bg-emerald-500 shadow-\[0_0_8px_rgba(16,185,129,0.6)\]'

}\`}\>\</div\>

\<div className="flex-1"\>

\<p className="text-sm font-medium text-slate-300 group-hover:text-white transition"\>{act.action}\</p\>

\<p className="text-xs text-slate-500 mt-1 flex items-center gap-1"\>

\<Clock size={10} /\> {act.time}

\</p\>

\</div\>

\</div\>

))

) : (

\<div className="text-center py-8 text-slate-500"\>

\<Database size={32} className="mx-auto mb-3 opacity-40" /\>

\<p className="text-sm"\>No recent network activity\</p\>

\</div\>

)}

\</div\>

\</div\>

\</div\>

\</div\>

);

};

export default NodeOverview;

## 45. frontend/src/components/StaffDirectory.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { UserPlus, ShieldCheck, Stethoscope, BadgeCheck, Activity, Users, FileText, Mail, Search, Copy, Check } from 'lucide-react';

const StaffDirectory = () =\> {

const \[staffList, setStaffList\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[message, setMessage\] = useState('');

const \[isSubmitting, setIsSubmitting\] = useState(false);

const \[searchQuery, setSearchQuery\] = useState('');

const \[copiedWallet, setCopiedWallet\] = useState(null);

const \[formData, setFormData\] = useState({

name: '', email: '', phone: '', wallet_address: '',

specialization: '', department: '', role: '', license_number: ''

});

useEffect(() =\> {

fetchStaff();

}, \[\]);

const fetchStaff = async () =\> {

setLoading(true);

try {

const res = await axios.get(\`\${API_BASE_URL}/api/admin/staff-directory\`);

setStaffList(res.data.staff \|\| \[\]);

} catch (error) {

console.error("Failed to fetch staff:", error);

} finally {

setLoading(false);

}

};

const handleOnboard = async (e) =\> {

e.preventDefault();

setIsSubmitting(true);

setMessage("\[T\] Registering identity on BioChain...");

try {

const finalName = formData.name.toLowerCase().startsWith('dr.') ? formData.name : \`Dr. \${formData.name}\`;

await axios.post(\`\${API_BASE_URL}/api/admin/onboard-doctor\`, { ...formData, name: finalName });

setMessage("\[OK\] Doctor successfully onboarded & verified!");

setFormData({ name: '', email: '', phone: '', wallet_address: '', specialization: '', department: '', role: '', license_number: '' });

fetchStaff();

setTimeout(() =\> setMessage(''), 4000);

} catch (error) {

setMessage(\`\[X\] Error: \${error.response?.data?.detail \|\| "Failed to onboard doctor"}\`);

setTimeout(() =\> setMessage(''), 4000);

} finally {

setIsSubmitting(false);

}

};

const handleCopyWallet = (wallet) =\> {

navigator.clipboard.writeText(wallet);

setCopiedWallet(wallet);

setTimeout(() =\> setCopiedWallet(null), 2000);

};

// Filter staff based on search

const filteredStaff = staffList.filter(doc =\> {

const query = searchQuery.toLowerCase();

return (

doc.name?.toLowerCase().includes(query) \|\|

doc.specialization?.toLowerCase().includes(query) \|\|

doc.department?.toLowerCase().includes(query) \|\|

doc.role?.toLowerCase().includes(query) \|\|

doc.email?.toLowerCase().includes(query)

);

});

if (loading) return (

\<div className="flex items-center justify-center h-64 text-blue-400 animate-pulse gap-2"\>

\<Activity className="animate-spin" /\> Syncing Global Staff Directory...

\</div\>

);

return (

\<div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up"\>

\<div className="bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"\>

\<div\>

\<h2 className="text-2xl font-bold text-white flex items-center gap-3"\>

\<div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20"\>

\<Users size={24} /\>

\</div\>

Hospital Staff Directory

\</h2\>

\<p className="text-sm text-slate-400 mt-1 ml-\[44px\]"\>Manage network access, hierarchical roles, and Web3 credentials.\</p\>

\</div\>

\<div className="flex items-center gap-3"\>

\<div className="bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20 text-purple-400 font-bold text-xs flex items-center gap-2"\>

\<ShieldCheck size={16} /\> Admin Access Level

\</div\>

\<div className="bg-slate-800 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700"\>

{staffList.length} Members

\</div\>

\</div\>

\</div\>

\<div className="grid grid-cols-1 lg:grid-cols-3 gap-8"\>

{/\* LEFT: ONBOARDING FORM \*/}

\<div className="lg:col-span-1 bg-\[#121620\] rounded-3xl p-6 border border-slate-800 shadow-xl h-fit"\>

\<h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3"\>

\<UserPlus className="text-emerald-400" size={20} /\> Onboard New Staff

\</h3\>

\<form onSubmit={handleOnboard} className="space-y-4"\>

\<div className="space-y-3"\>

\<input required type="text" placeholder="Full Name (e.g. Yash)" value={formData.name} onChange={e =\> setFormData({...formData, name: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" /\>

\<input required type="email" placeholder="Official Email Address" value={formData.email} onChange={e =\> setFormData({...formData, email: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" /\>

\<input type="text" placeholder="Phone Number (Optional)" value={formData.phone} onChange={e =\> setFormData({...formData, phone: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" /\>

\<input required type="text" placeholder="Web3 Wallet Address (0x...)" value={formData.wallet_address} onChange={e =\> setFormData({...formData, wallet_address: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 font-mono transition" /\>

\<input required type="text" placeholder="Medical License Registration No." value={formData.license_number} onChange={e =\> setFormData({...formData, license_number: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" /\>

\</div\>

\<div className="grid grid-cols-2 gap-3"\>

\<select required value={formData.role} onChange={e =\> setFormData({...formData, role: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-slate-300 px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer transition"\>

\<option value="" disabled\>Select Role...\</option\>

\<option value="Chief Medical Officer"\>Chief Medical Officer\</option\>

\<option value="Senior Consultant"\>Senior Consultant\</option\>

\<option value="Attending Physician"\>Attending Physician\</option\>

\<option value="Junior Resident"\>Junior Resident\</option\>

\</select\>

\<select required value={formData.department} onChange={e =\> setFormData({...formData, department: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-slate-300 px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer transition"\>

\<option value="" disabled\>Department...\</option\>

\<option value="Cardiology"\>Cardiology\</option\>

\<option value="Neurology"\>Neurology\</option\>

\<option value="Orthopedics"\>Orthopedics\</option\>

\<option value="Emergency"\>Emergency\</option\>

\<option value="General Medicine"\>General Medicine\</option\>

\</select\>

\</div\>

\<input required type="text" placeholder="Specialization (e.g. Interventional Cardiology)" value={formData.specialization} onChange={e =\> setFormData({...formData, specialization: e.target.value})} className="w-full bg-\[#0b0e14\] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition" /\>

\<button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 active:scale-\[0.98\]"\>

{isSubmitting ? \<Activity className="animate-spin" size={18} /\> : \<ShieldCheck size={18} /\>}

{isSubmitting ? 'Verifying & Saving...' : 'Grant Network Access'}

\</button\>

{message && (

\<div className={\`p-3 rounded-xl text-center text-xs font-bold border transition-all duration-300 \${message.includes('\[OK\]') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : message.includes('\[T\]') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}\`}\>

{message}

\</div\>

)}

\</form\>

\</div\>

{/\* RIGHT: STAFF DIRECTORY LIST \*/}

\<div className="lg:col-span-2 bg-\[#121620\] rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-\[650px\]"\>

{/\* Search Bar + Header \*/}

\<div className="bg-\[#0b0e14\] px-6 py-4 border-b border-slate-800 space-y-3 sticky top-0 z-10"\>

\<div className="flex justify-between items-center"\>

\<h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"\>

\<Stethoscope size={16} className="text-slate-400" /\> Verified Clinical Staff

\</h3\>

\<span className="bg-blue-500/10 text-xs font-bold px-3 py-1 rounded-full text-blue-400 border border-blue-500/20"\>{filteredStaff.length} of {staffList.length}\</span\>

\</div\>

{/\* Search Input \*/}

\<div className="relative"\>

\<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} /\>

\<input

type="text"

placeholder="Search by name, specialization, department..."

value={searchQuery}

onChange={(e) =\> setSearchQuery(e.target.value)}

className="w-full bg-\[#121620\] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-blue-500 transition"

/\>

\</div\>

\</div\>

\<div className="overflow-y-auto p-4 space-y-3 custom-scrollbar flex-1"\>

{filteredStaff.length \> 0 ? (

filteredStaff.map((doc, idx) =\> (

\<div key={idx} className="bg-\[#0b0e14\] border border-slate-800 hover:border-blue-500/30 transition-all duration-200 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"\>

\<div className="flex items-center gap-4"\>

\<div className="w-12 h-12 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center font-bold border border-blue-500/20 group-hover:border-blue-500/40 transition flex-shrink-0"\>

{doc.name.replace('Dr. ', '').substring(0, 2).toUpperCase()}

\</div\>

\<div\>

\<h4 className="font-bold text-white flex items-center gap-2"\>

{doc.name}

{doc.is_verified && \<BadgeCheck size={14} className="text-blue-400" title="Verified by Admin" /\>}

\</h4\>

\<p className="text-xs text-slate-400 mt-0.5"\>{doc.specialization} \* {doc.department}\</p\>

{doc.email && (

\<p className="text-\[10px\] text-slate-500 mt-0.5 flex items-center gap-1"\>

\<Mail size={10} /\> {doc.email}

\</p\>

)}

\</div\>

\</div\>

\<div className="flex flex-col items-start md:items-end gap-1.5"\>

\<span className={\`text-\[10px\] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border \${

doc.role === 'Chief Medical Officer' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :

doc.role === 'Senior Consultant' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :

doc.role === 'Attending Physician' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :

'bg-slate-500/10 text-slate-400 border-slate-500/20'

}\`}\>

{doc.role}

\</span\>

\<div className="flex items-center gap-2"\>

\<p className="text-\[10px\] text-slate-500 font-mono"\>Lic: {doc.license_number \|\| 'N/A'}\</p\>

{doc.wallet_address && (

\<button

onClick={() =\> handleCopyWallet(doc.wallet_address)}

className="text-\[10px\] text-slate-600 hover:text-blue-400 font-mono flex items-center gap-1 transition"

title="Copy wallet address"

\>

{copiedWallet === doc.wallet_address ? (

\<\>\<Check size={10} className="text-emerald-400" /\> Copied\</\>

) : (

\<\>\<Copy size={10} /\> {doc.wallet_address.substring(0, 6)}...{doc.wallet_address.slice(-4)}\</\>

)}

\</button\>

)}

\</div\>

\</div\>

\</div\>

))

) : (

\<div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60 py-12"\>

{searchQuery ? (

\<\>

\<Search size={48} className="mb-4 opacity-40" /\>

\<p className="font-bold text-white mb-1"\>No Results Found\</p\>

\<p className="text-sm"\>Try a different search term\</p\>

\</\>

) : (

\<\>

\<Users size={48} className="mb-4" /\>

\<p\>No staff members onboarded yet.\</p\>

\</\>

)}

\</div\>

)}

\</div\>

\</div\>

\</div\>

\</div\>

);

};

export default StaffDirectory;

## 46. frontend/src/components/AuditLogs.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { API_BASE_URL } from '../config';

import { ShieldAlert, Activity, Search, Hash, Clock, User, AlertTriangle, Link, Copy, Check, ExternalLink } from 'lucide-react';

const AuditLogs = () =\> {

const \[logs, setLogs\] = useState(\[\]);

const \[loading, setLoading\] = useState(true);

const \[searchTerm, setSearchTerm\] = useState('');

const \[filterEvent, setFilterEvent\] = useState('ALL');

const \[filterTime, setFilterTime\] = useState('ALL');

const \[selectedTx, setSelectedTx\] = useState(null);

const \[copiedHash, setCopiedHash\] = useState(null);

useEffect(() =\> {

fetchLogs();

}, \[\]);

const fetchLogs = async () =\> {

try {

const res = await axios.get(\`\${API_BASE_URL}/api/admin/audit-logs\`);

setLogs(res.data.logs \|\| \[\]);

} catch (error) {

console.error("Failed to fetch Audit Logs:", error);

} finally {

setLoading(false);

}

};

const handleCopy = (hash) =\> {

navigator.clipboard.writeText(hash);

setCopiedHash(hash);

setTimeout(() =\> setCopiedHash(null), 2000);

};

// Advanced Multi-level Filtering

const filteredLogs = logs.filter(log =\> {

const nameMatch = log.actor_name ? log.actor_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;

const hashMatch = log.tx_hash ? log.tx_hash.toLowerCase().includes(searchTerm.toLowerCase()) : false;

const matchesSearch = nameMatch \|\| hashMatch;

const matchesEvent = filterEvent === 'ALL' \|\| log.action_type === filterEvent;

let matchesTime = true;

if (filterTime === 'TODAY') {

matchesTime = log.timestamp.includes('2026-03-20') \|\| log.timestamp.includes('2026-03-19');

} else if (filterTime === 'WEEK') {

matchesTime = log.timestamp.includes('2026-03-20') \|\| log.timestamp.includes('2026-03-19') \|\| log.timestamp.includes('2026-03-18');

}

return matchesSearch && matchesEvent && matchesTime;

});

const getEventBadge = (log) =\> {

const colors = {

emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',

rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',

amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',

blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',

};

return colors\[log.color\] \|\| 'bg-purple-500/10 text-purple-400 border-purple-500/20';

};

if (loading) return (

\<div className="flex items-center justify-center h-64 text-purple-400 animate-pulse gap-3"\>

\<Activity className="animate-spin" size={24} /\> Decrypting On-Chain Audit Trail...

\</div\>

);

return (

\<div className="space-y-6 animate-fade-in-up"\>

{/\* Header + Filters \*/}

\<div className="bg-\[#121620\] rounded-2xl p-5 border border-slate-800 shadow-xl"\>

\<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5"\>

\<div className="flex items-center gap-3"\>

\<div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 border border-emerald-500/20"\>

\<ShieldAlert size={22} /\>

\</div\>

\<div\>

\<h2 className="text-xl font-bold text-white"\>Immutable Audit Logs\</h2\>

\<p className="text-xs text-slate-500 mt-0.5"\>Cryptographic record of all network events\</p\>

\</div\>

\</div\>

\<div className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300"\>

{filteredLogs.length} of {logs.length} events

\</div\>

\</div\>

{/\* Filter Bar \*/}

\<div className="flex flex-col md:flex-row gap-3"\>

\<div className="relative flex-1"\>

\<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} /\>

\<input

type="text"

placeholder="Search by name or tx hash..."

value={searchTerm}

onChange={(e) =\> setSearchTerm(e.target.value)}

className="w-full bg-\[#0b0e14\] text-sm text-white pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition"

/\>

\</div\>

\<select

value={filterEvent}

onChange={(e) =\> setFilterEvent(e.target.value)}

className="bg-\[#0b0e14\] text-sm text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition appearance-none cursor-pointer"

\>

\<option value="ALL"\>All Events\</option\>

\<option value="EMERGENCY_OVERRIDE"\>\[!!\] Emergency\</option\>

\<option value="RECORD_SIGNED"\>\[doc\] Records Signed\</option\>

\<option value="ACCESS_GRANTED"\>\[OK\] Access Granted\</option\>

\<option value="ACCESS_REVOKED"\>\[X\] Access Revoked\</option\>

\<option value="STAFF_ONBOARD"\>\[usr\] Staff Onboard\</option\>

\<option value="CONSENT_GRANTED"\>\[key\] Consent\</option\>

\</select\>

\<select

value={filterTime}

onChange={(e) =\> setFilterTime(e.target.value)}

className="bg-\[#0b0e14\] text-sm text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-purple-500 transition appearance-none cursor-pointer"

\>

\<option value="ALL"\>All Time\</option\>

\<option value="TODAY"\>Last 24h\</option\>

\<option value="WEEK"\>This Week\</option\>

\</select\>

\</div\>

\</div\>

{/\* Event Cards List \*/}

\<div className="space-y-3"\>

{filteredLogs.map((log) =\> (

\<div

key={log.id}

onClick={() =\> setSelectedTx(log)}

className="bg-\[#121620\] rounded-2xl border border-slate-800 hover:border-slate-700 p-4 transition-all duration-200 cursor-pointer group card-hover"

\>

\<div className="flex flex-col md:flex-row md:items-center gap-4"\>

{/\* Left: Event indicator + Actor \*/}

\<div className="flex items-center gap-3 md:w-\[240px\] flex-shrink-0"\>

\<div className={\`w-2.5 h-2.5 rounded-full flex-shrink-0 \${

log.color === 'emerald' ? 'bg-emerald-500 shadow-\[0_0_8px_rgba(16,185,129,0.5)\]' :

log.color === 'rose' ? 'bg-rose-500 shadow-\[0_0_8px_rgba(244,63,94,0.5)\]' :

log.color === 'amber' ? 'bg-amber-500 shadow-\[0_0_8px_rgba(245,158,11,0.5)\]' :

log.color === 'blue' ? 'bg-blue-500 shadow-\[0_0_8px_rgba(59,130,246,0.5)\]' :

'bg-purple-500 shadow-\[0_0_8px_rgba(168,85,247,0.5)\]'

}\`}\>\</div\>

\<div className="min-w-0"\>

\<p className="text-sm font-bold text-white truncate"\>{log.actor_name}\</p\>

\<p className="text-\[10px\] text-slate-600 font-mono truncate"\>{log.actor_wallet?.substring(0, 10)}...{log.actor_wallet?.slice(-6)}\</p\>

\</div\>

\</div\>

{/\* Center: Event badge + Description \*/}

\<div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"\>

\<span className={\`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-\[10px\] font-bold uppercase tracking-wider border w-fit flex-shrink-0 \${getEventBadge(log)}\`}\>

{log.action_type === 'EMERGENCY_OVERRIDE' && \<AlertTriangle size={10} /\>}

{log.action_type?.replace('\_', ' ')}

\</span\>

\<p className="text-xs text-slate-400 truncate"\>{log.description}\</p\>

\</div\>

{/\* Right: Timestamp + Hash \*/}

\<div className="flex items-center gap-4 md:flex-shrink-0 text-right"\>

\<div className="hidden md:block"\>

\<p className="text-\[10px\] text-slate-600 font-mono"\>{log.timestamp?.split(' ')\[0\]}\</p\>

\<p className="text-\[10px\] text-slate-500 font-mono"\>{log.timestamp?.split(' ')\[1\]}\</p\>

\</div\>

\<button

onClick={(e) =\> { e.stopPropagation(); handleCopy(log.tx_hash); }}

className="flex items-center gap-1.5 text-\[10px\] font-mono text-blue-500 hover:text-blue-400 transition bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-blue-500/10 hover:border-blue-500/30 flex-shrink-0"

\>

{copiedHash === log.tx_hash ? (

\<\>\<Check size={10} className="text-emerald-400" /\> Copied\</\>

) : (

\<\>\<Copy size={10} /\> {log.tx_hash?.substring(0, 6)}...{log.tx_hash?.slice(-4)}\</\>

)}

\</button\>

\</div\>

\</div\>

\</div\>

))}

{filteredLogs.length === 0 && (

\<div className="bg-\[#121620\] rounded-2xl border border-slate-800 py-16 text-center"\>

\<div className="bg-slate-800/30 p-4 rounded-full mb-4 inline-block"\>

\<Search size={32} className="text-slate-500 opacity-40" /\>

\</div\>

\<p className="font-bold text-white mb-1"\>No Events Found\</p\>

\<p className="text-sm text-slate-500"\>Try adjusting your filters or search terms.\</p\>

\</div\>

)}

\</div\>

{/\* Transaction Receipt Modal \*/}

{selectedTx && (

\<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() =\> setSelectedTx(null)}\>

\<div className="bg-\[#121620\] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" onClick={e =\> e.stopPropagation()}\>

{/\* Modal Header \*/}

\<div className="bg-\[#0b0e14\] p-5 border-b border-slate-700 flex justify-between items-center"\>

\<div\>

\<h3 className="text-lg font-bold text-white flex items-center gap-2"\>

\<Activity className="text-emerald-500" size={20} /\> Transaction Receipt

\</h3\>

\<p className="text-\[10px\] text-slate-500 mt-1 font-mono"\>Status: Confirmed on Mainnet\</p\>

\</div\>

\<button onClick={() =\> setSelectedTx(null)} className="text-slate-400 hover:text-white p-2 bg-slate-800/50 rounded-full transition"\>

\<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"\>\<path d="M18 6L6 18M6 6l12 12"/\>\</svg\>

\</button\>

\</div\>

{/\* Modal Body \*/}

\<div className="p-5 space-y-4 max-h-\[70vh\] overflow-y-auto custom-scrollbar"\>

\<div\>

\<span className="block text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1.5"\>Transaction Hash\</span\>

\<div className="bg-\[#0b0e14\] border border-slate-800 p-3 rounded-xl flex items-center gap-2"\>

\<span className="text-emerald-400 font-mono text-xs break-all flex-1"\>{selectedTx.tx_hash}\</span\>

\<button onClick={() =\> handleCopy(selectedTx.tx_hash)} className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition flex-shrink-0"\>

{copiedHash === selectedTx.tx_hash ? \<Check size={14} className="text-emerald-400" /\> : \<Copy size={14} /\>}

\</button\>

\</div\>

\</div\>

\<div className="grid grid-cols-2 gap-3"\>

\<div\>

\<span className="block text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1.5"\>Timestamp\</span\>

\<div className="bg-\[#0b0e14\] border border-slate-800 p-3 rounded-xl text-slate-300 font-mono text-xs"\>

{selectedTx.timestamp}

\</div\>

\</div\>

\<div\>

\<span className="block text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1.5"\>Network\</span\>

\<div className="bg-\[#0b0e14\] border border-slate-800 p-3 rounded-xl text-slate-300 font-mono text-xs flex items-center gap-2"\>

\<span className="w-2 h-2 rounded-full bg-purple-500"\>\</span\> BioChain L2 (Polygon)

\</div\>

\</div\>

\</div\>

\<div\>

\<span className="block text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1.5"\>From (Actor)\</span\>

\<div className="bg-\[#0b0e14\] border border-slate-800 p-3 rounded-xl flex items-center gap-3"\>

\<div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0"\>

\<User size={14} /\>

\</div\>

\<div className="min-w-0"\>

\<p className="text-sm font-bold text-white"\>{selectedTx.actor_name}\</p\>

\<p className="text-\[10px\] text-slate-500 font-mono truncate"\>{selectedTx.actor_wallet}\</p\>

\</div\>

\</div\>

\</div\>

\<div\>

\<span className="block text-\[10px\] font-bold text-slate-500 uppercase tracking-wider mb-1.5"\>Event Payload\</span\>

\<div className="bg-\[#0b0e14\] border border-slate-800 p-4 rounded-xl"\>

\<span className={\`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-\[10px\] font-bold uppercase tracking-wider border mb-2 \${getEventBadge(selectedTx)}\`}\>

{selectedTx.action_type}

\</span\>

\<p className="text-sm text-slate-300"\>{selectedTx.description}\</p\>

\<div className="mt-3 pt-3 border-t border-slate-800 text-\[10px\] font-mono text-slate-500 flex justify-between"\>

\<p\>Gas: \<span className="text-slate-400"\>0.00045 ETH (Sponsored)\</span\>\</p\>

\<p\>Relayer: \<span className="text-emerald-500"\>Active\</span\>\</p\>

\</div\>

\</div\>

\</div\>

\</div\>

\</div\>

\</div\>

)}

\</div\>

);

};

export default AuditLogs;

## 47. frontend/index.html

\<!doctype html\>

\<html lang="en"\>

\<head\>

\<meta charset="UTF-8" /\>

\<link rel="icon" type="image/svg+xml" href="/vite.svg" /\>

\<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>

\<title\>BioChain Hospital\</title\>

\</head\>

\<body\>

\<div id="root"\>\</div\>

\<script type="module" src="/src/main.jsx"\>\</script\>

\</body\>

\</html\>

## 48. frontend/vite.config.js

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({

plugins: \[react()\],

server: {

port: 3000, // Move to a new port to escape the cache ghost

}

})

## 49. frontend/tailwind.config.js

/\*\* @type {import('tailwindcss').Config} \*/

export default {

content: \[

"./index.html",

"./src/\*\*/\*.{js,ts,jsx,tsx}",

\],

theme: {

extend: {},

},

plugins: \[\],

}

## 50. frontend/postcss.config.js

export default {

plugins: {

'@tailwindcss/postcss': {},

autoprefixer: {},

},

}

## 51. frontend/eslint.config.js

import js from '@eslint/js'

import globals from 'globals'

import reactHooks from 'eslint-plugin-react-hooks'

import reactRefresh from 'eslint-plugin-react-refresh'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(\[

globalIgnores(\['dist'\]),

{

files: \['\*\*/\*.{js,jsx}'\],

extends: \[

js.configs.recommended,

reactHooks.configs.flat.recommended,

reactRefresh.configs.vite,

\],

languageOptions: {

ecmaVersion: 2020,

globals: globals.browser,

parserOptions: {

ecmaVersion: 'latest',

ecmaFeatures: { jsx: true },

sourceType: 'module',

},

},

rules: {

'no-unused-vars': \['error', { varsIgnorePattern: '^\[A-Z\_\]' }\],

},

},

\])

## 52. frontend/package.json

{

"name": "frontend",

"private": true,

"version": "0.0.0",

"type": "module",

"scripts": {

"dev": "vite",

"build": "vite build",

"lint": "eslint .",

"preview": "vite preview"

},

"dependencies": {

"@tailwindcss/postcss": "^4.1.18",

"axios": "^1.13.5",

"framer-motion": "^12.34.0",

"lucide-react": "^0.564.0",

"react": "^19.2.0",

"react-dom": "^19.2.0"

},

"devDependencies": {

"@eslint/js": "^9.39.1",

"@types/react": "^19.2.7",

"@types/react-dom": "^19.2.3",

"@vitejs/plugin-react": "^5.1.1",

"autoprefixer": "^10.4.24",

"eslint": "^9.39.1",

"eslint-plugin-react-hooks": "^7.0.1",

"eslint-plugin-react-refresh": "^0.4.24",

"globals": "^16.5.0",

"postcss": "^8.5.6",

"tailwindcss": "^4.1.18",

"vite": "^7.3.1"

}

}

## 53. start_biochain.ps1

\# =====================================================

\# BioChainAI 2.0 - Master Launcher (PowerShell)

\# Usage: Open terminal in project root, run: .\start_biochain.ps1

\# =====================================================

Write-Host ""

Write-Host " =====================================================" -ForegroundColor Cyan

Write-Host " BioChainAI 2.0 - Launching All Services..." -ForegroundColor Cyan

Write-Host " =====================================================" -ForegroundColor Cyan

Write-Host ""

\$ProjectRoot = Split-Path -Parent \$MyInvocation.MyCommand.Definition

\# --- Step 1: Start Hardhat Blockchain Node ---

Write-Host " \[1/4\] Starting Hardhat Blockchain Node..." -ForegroundColor Green

Start-Process "powershell.exe" -ArgumentList "-NoExit -Command \`"cd '\$ProjectRoot\blockchain'; Write-Host '=== HARDHAT NODE ===' -ForegroundColor Yellow; npx hardhat node\`""

Write-Host " Waiting 8 seconds for node to initialize..." -ForegroundColor Gray

Start-Sleep -Seconds 8

\# --- Step 2: Deploy Smart Contracts ---

Write-Host " \[2/4\] Deploying Smart Contracts..." -ForegroundColor Green

Start-Process "powershell.exe" -ArgumentList "-NoExit -Command \`"cd '\$ProjectRoot\blockchain'; Write-Host '=== CONTRACT DEPLOY ===' -ForegroundColor Yellow; npx hardhat run scripts/deploy.js --network localhost; Write-Host ''; Write-Host 'Contracts Deployed! You can close this window.' -ForegroundColor Green\`""

Write-Host " Waiting 10 seconds for deployment..." -ForegroundColor Gray

Start-Sleep -Seconds 10

\# --- Step 3: Start FastAPI Backend ---

Write-Host " \[3/4\] Starting FastAPI Backend..." -ForegroundColor Green

Start-Process "powershell.exe" -ArgumentList "-NoExit -Command \`"cd '\$ProjectRoot\backend'; Write-Host '=== BACKEND (FastAPI) ===' -ForegroundColor Yellow; python -m uvicorn main:app --reload\`""

Start-Sleep -Seconds 3

\# --- Step 4: Start Vite Frontend ---

Write-Host " \[4/4\] Starting Vite Frontend..." -ForegroundColor Green

Start-Process "powershell.exe" -ArgumentList "-NoExit -Command \`"cd '\$ProjectRoot\frontend'; Write-Host '=== FRONTEND (Vite) ===' -ForegroundColor Yellow; npm run dev\`""

Write-Host ""

Write-Host " =====================================================" -ForegroundColor Cyan

Write-Host " Frontend: http://localhost:3000" -ForegroundColor Green

Write-Host " Backend API: http://localhost:8000" -ForegroundColor Green

Write-Host " Backend Docs: http://localhost:8000/docs" -ForegroundColor Green

Write-Host " Blockchain: http://127.0.0.1:8545" -ForegroundColor Green

Write-Host " =====================================================" -ForegroundColor Cyan

Write-Host ""

Write-Host " Close the newly opened windows to stop the services." -ForegroundColor Gray

Write-Host ""

## 54. backend/app/biochain_abi.json

\[

{

"inputs": \[\],

"stateMutability": "nonpayable",

"type": "constructor"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "hospital",

"type": "address"

},

{

"indexed": false,

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"name": "DoctorStatusChanged",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "admin",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "name",

"type": "string"

}

\],

"name": "HospitalRegistered",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "name",

"type": "string"

},

{

"indexed": false,

"internalType": "string",

"name": "idHash",

"type": "string"

}

\],

"name": "PatientRegistered",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

}

\],

"name": "PrescriptionIssued",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "uint256",

"name": "recordId",

"type": "uint256"

},

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "doctor",

"type": "address"

}

\],

"name": "RecordAdded",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "from",

"type": "address"

},

{

"indexed": true,

"internalType": "address",

"name": "to",

"type": "address"

}

\],

"name": "ReferralCreated",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": false,

"internalType": "string",

"name": "severity",

"type": "string"

},

{

"indexed": false,

"internalType": "uint256",

"name": "time",

"type": "uint256"

}

\],

"name": "SOSAlert",

"type": "event"

},

{

"anonymous": false,

"inputs": \[

{

"indexed": true,

"internalType": "address",

"name": "patient",

"type": "address"

},

{

"indexed": false,

"internalType": "uint256",

"name": "time",

"type": "uint256"

}

\],

"name": "SOSResolved",

"type": "event"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_wallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_license",

"type": "string"

},

{

"internalType": "string",

"name": "\_spec",

"type": "string"

}

\],

"name": "addDoctor",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_hash",

"type": "string"

},

{

"internalType": "string",

"name": "\_type",

"type": "string"

},

{

"internalType": "string",

"name": "\_cat",

"type": "string"

},

{

"internalType": "string",

"name": "\_notes",

"type": "string"

}

\],

"name": "addMedicalRecord",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "allRecords",

"outputs": \[

{

"internalType": "uint256",

"name": "id",

"type": "uint256"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "string",

"name": "recordType",

"type": "string"

},

{

"internalType": "string",

"name": "category",

"type": "string"

},

{

"internalType": "string",

"name": "notes",

"type": "string"

},

{

"internalType": "address",

"name": "addedBy",

"type": "address"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "authorizedRelayers",

"outputs": \[

{

"internalType": "bool",

"name": "",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_wallet",

"type": "address"

}

\],

"name": "deactivateDoctor",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "doctors",

"outputs": \[

{

"internalType": "address",

"name": "hospitalAdmin",

"type": "address"

},

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "licenseId",

"type": "string"

},

{

"internalType": "string",

"name": "specialization",

"type": "string"

},

{

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_hospitalAdmin",

"type": "address"

}

\],

"name": "getHospitalStaff",

"outputs": \[

{

"internalType": "address\[\]",

"name": "",

"type": "address\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

}

\],

"name": "getPatientRecords",

"outputs": \[

{

"internalType": "uint256\[\]",

"name": "",

"type": "uint256\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

}

\],

"name": "getPrescriptions",

"outputs": \[

{

"components": \[

{

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"internalType": "string",

"name": "diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Prescription\[\]",

"name": "",

"type": "tuple\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

}

\],

"name": "getProfile",

"outputs": \[

{

"components": \[

{

"internalType": "string",

"name": "bloodType",

"type": "string"

},

{

"internalType": "string",

"name": "allergies",

"type": "string"

},

{

"internalType": "string",

"name": "emergencyContact",

"type": "string"

},

{

"internalType": "string",

"name": "profileHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "lastUpdated",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.MedicalProfile",

"name": "",

"type": "tuple"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "uint256",

"name": "\_id",

"type": "uint256"

}

\],

"name": "getRecord",

"outputs": \[

{

"components": \[

{

"internalType": "uint256",

"name": "id",

"type": "uint256"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "string",

"name": "recordType",

"type": "string"

},

{

"internalType": "string",

"name": "category",

"type": "string"

},

{

"internalType": "string",

"name": "notes",

"type": "string"

},

{

"internalType": "address",

"name": "addedBy",

"type": "address"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Record",

"name": "",

"type": "tuple"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

}

\],

"name": "getReferrals",

"outputs": \[

{

"components": \[

{

"internalType": "address",

"name": "referrer",

"type": "address"

},

{

"internalType": "address",

"name": "targetDoctor",

"type": "address"

},

{

"internalType": "string",

"name": "reason",

"type": "string"

},

{

"internalType": "bool",

"name": "active",

"type": "bool"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.Referral\[\]",

"name": "",

"type": "tuple\[\]"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_doctor",

"type": "address"

}

\],

"name": "grantAccess",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "hasAccess",

"outputs": \[

{

"internalType": "bool",

"name": "",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "hospitals",

"outputs": \[

{

"internalType": "address",

"name": "adminWallet",

"type": "address"

},

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "registrationNumber",

"type": "string"

},

{

"internalType": "bool",

"name": "isActive",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "isSOSActive",

"outputs": \[

{

"internalType": "bool",

"name": "",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_patient",

"type": "address"

},

{

"internalType": "string",

"name": "\_diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "\_ipfsHash",

"type": "string"

}

\],

"name": "issuePrescription",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "patientPrescriptions",

"outputs": \[

{

"internalType": "address",

"name": "doctor",

"type": "address"

},

{

"internalType": "string",

"name": "diagnosis",

"type": "string"

},

{

"internalType": "string",

"name": "ipfsHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

},

{

"internalType": "uint256",

"name": "",

"type": "uint256"

}

\],

"name": "patientReferrals",

"outputs": \[

{

"internalType": "address",

"name": "referrer",

"type": "address"

},

{

"internalType": "address",

"name": "targetDoctor",

"type": "address"

},

{

"internalType": "string",

"name": "reason",

"type": "string"

},

{

"internalType": "bool",

"name": "active",

"type": "bool"

},

{

"internalType": "uint256",

"name": "timestamp",

"type": "uint256"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "patients",

"outputs": \[

{

"internalType": "string",

"name": "name",

"type": "string"

},

{

"internalType": "string",

"name": "identityHash",

"type": "string"

},

{

"components": \[

{

"internalType": "string",

"name": "bloodType",

"type": "string"

},

{

"internalType": "string",

"name": "allergies",

"type": "string"

},

{

"internalType": "string",

"name": "emergencyContact",

"type": "string"

},

{

"internalType": "string",

"name": "profileHash",

"type": "string"

},

{

"internalType": "uint256",

"name": "lastUpdated",

"type": "uint256"

}

\],

"internalType": "struct BioChainNetwork.MedicalProfile",

"name": "profile",

"type": "tuple"

},

{

"internalType": "bool",

"name": "exists",

"type": "bool"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "address",

"name": "\_targetDoc",

"type": "address"

},

{

"internalType": "string",

"name": "\_reason",

"type": "string"

}

\],

"name": "referPatient",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_adminWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_regNumber",

"type": "string"

}

\],

"name": "registerHospital",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_pWallet",

"type": "address"

},

{

"internalType": "string",

"name": "\_name",

"type": "string"

},

{

"internalType": "string",

"name": "\_idHash",

"type": "string"

},

{

"internalType": "string",

"name": "\_blood",

"type": "string"

},

{

"internalType": "string",

"name": "\_allergies",

"type": "string"

},

{

"internalType": "string",

"name": "\_emergency",

"type": "string"

},

{

"internalType": "string",

"name": "\_pHash",

"type": "string"

}

\],

"name": "registerPatient",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[\],

"name": "resolveSOS",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_doctor",

"type": "address"

}

\],

"name": "revokeAccess",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"name": "roles",

"outputs": \[

{

"internalType": "enum BioChainNetwork.Role",

"name": "",

"type": "uint8"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "address",

"name": "\_relayer",

"type": "address"

},

{

"internalType": "bool",

"name": "\_status",

"type": "bool"

}

\],

"name": "setRelayer",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

},

{

"inputs": \[\],

"name": "superAdmin",

"outputs": \[

{

"internalType": "address",

"name": "",

"type": "address"

}

\],

"stateMutability": "view",

"type": "function"

},

{

"inputs": \[

{

"internalType": "string",

"name": "\_severity",

"type": "string"

}

\],

"name": "triggerSOS",

"outputs": \[\],

"stateMutability": "nonpayable",

"type": "function"

}

\]
