import json
from pymongo import MongoClient
from bson import json_util

client = MongoClient('mongodb://localhost:27017/')
db = client.biochain_db
appointments = list(db.appointments.find())

with open('appointments_dump.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(appointments, default=json_util.default, indent=2))
