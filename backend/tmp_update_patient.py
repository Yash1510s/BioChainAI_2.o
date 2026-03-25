from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['biochain_db']

result = db.patients.update_one(
    {"email": "yash82040@gmail.com"},
    {"$set": {
        "phone": "8369669945",
        "bloodGroup": "B+",
        "allergies": "None",
        "address": "Railway colony matunga",
        "idHash": "e541a079b94590e3a028d812b2a0864da444e90480d184273653d486e05736e4"
    }}
)

print(f"Matched count: {result.matched_count}, Modified count: {result.modified_count}")
