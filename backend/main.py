from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import PatientSignup
# IMPORT the new function here:
from app.blockchain import register_patient_on_chain, get_hospital_details, fetch_patient_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/")
def read_root():
    name = get_hospital_details()
    return {"message": f"Welcome to {name} API"}

@app.post("/register")
def register_patient(patient: PatientSignup):
    print(f"📝 Registering {patient.name}...")
    result = register_patient_on_chain(patient)
    return result

# --- NEW ENDPOINT FOR DASHBOARD ---
@app.get("/dashboard")
def get_dashboard_data():
    print("🔎 Fetching Patient Data from Blockchain...")
    return fetch_patient_data()