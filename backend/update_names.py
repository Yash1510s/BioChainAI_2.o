from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['biochain_db']

res1 = db.doctors.update_many(
    {'name': 'Yash (Demo Doctor)'},
    {'$set': {'name': 'Dr. Yash'}}
)

res2 = db.medical_records.update_many(
    {'doctor_name': 'Yash (Demo Doctor)'},
    {'$set': {'doctor_name': 'Dr. Yash'}}
)

print(f'Doctors updated: {res1.modified_count}')
print(f'Records updated: {res2.modified_count}')
