import json
import os
import hashlib
from web3 import Web3
from dotenv import load_dotenv

# 1. Setup Connection
# Load .env from the backend root directory (one level up from this file)
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

w3 = Web3(Web3.HTTPProvider(os.getenv("BLOCKCHAIN_URL")))
account_address = os.getenv("ACCOUNT_ADDRESS") 
private_key = os.getenv("PRIVATE_KEY")
contract_address = os.getenv("CONTRACT_ADDRESS")

# Safety Check
if not account_address or not private_key:
    # Use Hardhat #0 as fallback if env variables are somehow missing
    account_address = account_address or "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    private_key = private_key or "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

# 2. Load ABI
try:
    with open("biochain_abi.json", "r") as f:
        data = json.load(f)
        # Use data["abi"] if it's a dict, otherwise use data directly if it's a list
        abi = data["abi"] if isinstance(data, dict) and "abi" in data else data
    contract = w3.eth.contract(address=contract_address, abi=abi)
except Exception as e:
    print(f"Error loading ABI: {e}")

def generate_identity_hash(email: str):
    return hashlib.sha256(email.encode()).hexdigest()

def get_hospital_details():
    try:
        # Fetching index 1 which is the 'name' field in the Hospital struct
        return contract.functions.hospitals(account_address).call()[1]
    except Exception:
        return "BioChainAI"

def register_patient_on_chain(data):
    try:
        identity_hash = generate_identity_hash(data.email)
        
        # 1. Build Transaction
        # We use the account_address as the "Patient Wallet" for this demo
        tx = contract.functions.registerPatient(
            account_address,      # Wallet
            data.name or "Unknown", # Name
            identity_hash,        # ID Hash
            data.blood_type or "O+", # Blood
            data.allergies or "None", # Allergies
            data.emergency_contact or "N/A", # Emergency
            "QmPlaceholderHash"     # IPFS Hash
        ).build_transaction({
            'chainId': 31337,
            'gas': 2000000,
            'gasPrice': w3.to_wei('50', 'gwei'),
            'nonce': w3.eth.get_transaction_count(account_address),
        })

        # 2. Sign Transaction
        signed_tx = w3.eth.account.sign_transaction(tx, private_key)
        
        # 3. Send Transaction
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction) 

        # 4. Wait for Block
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            "status": "Success", 
            "tx_hash": w3.to_hex(tx_hash),
            "block": receipt.blockNumber,
            "idHash": identity_hash
        }

    except Exception as e:
        error_msg = str(e)
        if "Registered" in error_msg:
            print("ℹ️ Note: Patient already registered on Blockchain. Proceeding with Database registration.")
            return {
                "status": "Success", 
                "message": "Already registered on chain",
                "idHash": identity_hash
            }
        
        print(f"Blockchain Error: {error_msg}") 
        return {"status": "Error", "message": error_msg}

def fetch_patient_data():
    """
    Doctor's Tool: Fetches patient data using the specific getters from your Solidity contract.
    """
    try:
        # 1. Fetch Basic Info (Name, ID Hash) from the 'patients' mapping
        # Solidity public mappings return struct fields in order.
        # Based on your struct: (name, identityHash, medicalProfile, recordIds, exists)
        # Note: Web3 sometimes flattens nested structs or skips arrays. 
        # We will access the first 2 fields which are definitely Name and ID.
        patient_basic = contract.functions.patients(account_address).call()
        
        # 2. Fetch Medical Profile using your custom 'getProfile' function
        # Returns: (bloodType, allergies, emergencyContact, profileHash, lastUpdated)
        profile = contract.functions.getProfile(account_address).call()

        return {
            "status": "Success",
            "name": patient_basic[0],         # Name
            "email_hash": patient_basic[1],   # Identity Hash
            "blood_type": profile[0],         # Blood Type
            "allergies": profile[1],          # Allergies
            "emergency_contact": profile[2],  # Emergency Contact
            "timestamp": profile[4]           # Last Updated Timestamp
        }
    except Exception as e:
        return {"status": "Error", "message": str(e)}