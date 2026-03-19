from pymongo import MongoClient
import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client['biochain_db']
records = list(db.records.find())

print("Total records:", len(records))
for r in records:
    print("---")
    print(r)
