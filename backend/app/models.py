# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
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