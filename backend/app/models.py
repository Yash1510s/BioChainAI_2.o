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