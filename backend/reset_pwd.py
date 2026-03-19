from pymongo import MongoClient
from passlib.context import CryptContext

# Connect to Local MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client.biochain_db 

# Password Hashing Logic
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def reset_password(email, new_password):
    hashed_pwd = pwd_context.hash(new_password)
    result = db.patients.update_one(
        {"email": email},
        {"$set": {"password": hashed_pwd}}
    )
    if result.modified_count > 0:
        print(f"✅ Password reset successfully for {email}")
    else:
        print(f"⚠️ No user found with email {email} (or password is already exactly the same).")

if __name__ == "__main__":
    # Resetting the password for the manually created user
    reset_password("yash82040@gmail.com", "securepassword123")
    
    # Also log the default password for the seed user
    print("ℹ️ The default password for 'yash@biochain.ai' is also 'securepassword123'")
