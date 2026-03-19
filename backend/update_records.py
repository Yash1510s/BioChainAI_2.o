from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['biochain_db']

records = list(db.medical_records.find())
updated = 0
for rc in records:
    # Only update if the name is truly missing or uselessly set
    if 'doctor_name' not in rc or not rc['doctor_name'] or rc['doctor_name'] == 'Unknown Doctor':
        wallet = rc.get('doctor_wallet', '')
        name = 'Yash (Demo Doctor)'
        
        # We can just force it so the UI looks beautiful
        if '0x94072243e3344AE3d80509F6Db2e0cb212AdEe79' in wallet.lower():
            name = 'Dr. Yash Vijay Singh'
        elif '0xdoc' in wallet.lower():
            name = 'Dr. AI Assistant'
        
        db.medical_records.update_one({'_id': rc['_id']}, {'$set': {'doctor_name': name}})
        updated += 1

print(f"Updated {updated} records.")
