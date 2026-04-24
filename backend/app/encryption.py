# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
import os
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from dotenv import load_dotenv

load_dotenv()

def get_fernet():
    # Master Key for encryption (Derived from a secret)
    master_key = os.getenv("FLE_MASTER_KEY", "biochain_super_secret_master_key_991122").encode()
    salt = b'biochain_salt_2026' # In prod, should be unique per key rotation
    
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(master_key))
    return Fernet(key)

fernet = get_fernet()

def encrypt_pii(data: str) -> str:
    """Encrypts Personal Identifiable Information (PII) using a master key."""
    if not data: return data
    try:
        return fernet.encrypt(data.encode()).decode()
    except Exception:
        return data

def decrypt_pii(data: str | None) -> str:
    """Decrypts PII back to plaintext."""
    if not data or not isinstance(data, str): return ""
    try:
        # Check if it looks encrypted (Fermi tokens are long and start with gAAAA)
        # We try to decrypt, if it fails, return as is
        return fernet.decrypt(data.encode()).decode()
    except Exception:
        return data
