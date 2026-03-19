from pymongo import MongoClient
import json
from bson import json_util

def view_data():
    try:
        # 1. Connect to MongoDB
        client = MongoClient("mongodb://localhost:27017")
        db = client.biochain_db
        
        # 2. Patients
        patients = list(db.patients.find())
        print(f"\n✅ Patients: {len(patients)}")
        for p in patients:
            print(f"- {p.get('name')} ({p.get('email')})")

        # 3. Doctors
        doctors = list(db.doctors.find())
        print(f"\n🩺 Doctors: {len(doctors)}")
        for d in doctors:
            print(f"- {d.get('name')} ({d.get('wallet_address')})")

        # 4. Hospitals
        hospitals = list(db.hospitals.find())
        print(f"\n🏢 Hospitals: {len(hospitals)}")
        for h in hospitals:
            print(f"- {h.get('name')} (Admin: {h.get('admin_wallet')})")

    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        print("💡 Make sure MongoDB service is running on your machine.")

if __name__ == "__main__":
    view_data()
