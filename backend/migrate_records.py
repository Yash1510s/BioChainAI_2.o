from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['biochain_db']

res = db.medical_records.update_many(
    {'patient_id': 'yash@biochain.ai'},
    {'$set': {'patient_id': 'yash82040@gmail.com'}}
)
print(f'Transferred {res.modified_count} records to yash82040@gmail.com')
