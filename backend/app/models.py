from pydantic import BaseModel

class PatientSignup(BaseModel):
    name: str
    email: str
    blood_type: str
    allergies: str
    emergency_contact: str