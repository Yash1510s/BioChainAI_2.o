# =============================================================================
# Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
# Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
# License  : Proprietary — See LICENSE file in project root for full terms.
# Repo     : https://github.com/Yash1510s/BioChainAI_2.o
# WARNING  : Unauthorized copying, modification, or distribution is prohibited.
# =============================================================================
from pymongo import MongoClient
from app.encryption import encrypt_pii, decrypt_pii
import os

def migrate_encrypt():
    print("🚚 Starting MONGODB PII FIELD-LEVEL ENCRYPTION MIGRATION...")
    client = MongoClient("mongodb://localhost:27017")
    db = client.biochain_db
    
    # Target fields: phone, address
    patients = list(db.patients.find({}))
    count = 0
    
    for p in patients:
        needs_update = False
        updates = {}
        
        # Only encrypt if they don't look already encrypted (rough heuristic for migration)
        # Encrypted cryptocode strings usually start with * or look like random noise
        # Since this is a one-way migration, we'll just check if they are already encrypted
        # Actually better: try to decrypt. If decrypt returns a real string, it's already encrypted!
        
        if decrypt_pii(p.get('phone')) == p.get('phone'):
            updates['phone'] = encrypt_pii(p.get('phone', ''))
            needs_update = True
            
        if decrypt_pii(p.get('address')) == p.get('address'):
            updates['address'] = encrypt_pii(p.get('address', ''))
            needs_update = True
            
        if needs_update:
            db.patients.update_one({"_id": p['_id']}, {"$set": updates})
            count += 1
            
    print(f"✅ Migration Complete! Encrypted {count} Patient(s).")

if __name__ == "__main__":
    migrate_encrypt()
