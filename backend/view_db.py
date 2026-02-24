from pymongo import MongoClient
import json
from bson import json_util

def view_data():
    try:
        # 1. Connect to MongoDB
        client = MongoClient("mongodb://localhost:27017")
        db = client.biochain_db
        patients_collection = db.patients
        
        # 2. Fetch all patients
        patients = list(patients_collection.find())
        
        if not patients:
            print("\nℹ️ No patients found in the database.")
            return

        print(f"\n✅ Found {len(patients)} patients in 'biochain_db':\n")
        
        # 3. Print in a readable format
        for i, patient in enumerate(patients, 1):
            print(f"--- Patient #{i} ---")
            # Convert BSON to JSON for pretty printing
            readable_patient = json.loads(json_util.dumps(patient))
            print(json.dumps(readable_patient, indent=4))
            print("-" * 20)

    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        print("💡 Make sure MongoDB service is running on your machine.")

if __name__ == "__main__":
    view_data()
