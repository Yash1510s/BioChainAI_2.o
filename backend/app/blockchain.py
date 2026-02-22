import json
import os
import hashlib
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# 1. Setup Connection
w3 = Web3(Web3.HTTPProvider(os.getenv("BLOCKCHAIN_URL")))
account_address = os.getenv("ACCOUNT_ADDRESS", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") # Default to Hardhat #0
private_key = os.getenv("PRIVATE_KEY")
contract_address = os.getenv("CONTRACT_ADDRESS")

# 2. Load ABI
try:
    with open("biochain_abi.json", "r") as f:
        abi = json.load(f)["abi"]
    contract = w3.eth.contract(address=contract_address, abi=abi)
except Exception as e:
    print(f"Error loading ABI: {e}")

def generate_identity_hash(email: str):
    return hashlib.sha256(email.encode()).hexdigest()

def get_hospital_details():
    return contract.functions.hospitalName().call()

def register_patient_on_chain(data):
    try:
        identity_hash = generate_identity_hash(data.email)
        
        # 1. Build Transaction
        # We use the account_address as the "Patient Wallet" for this demo
        tx = contract.functions.registerPatient(
            account_address,      # Wallet
            data.name,            # Name
            identity_hash,        # ID Hash
            data.blood_type,      # Blood
            data.allergies,       # Allergies
            data.emergency_contact, # Emergency
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
        # accessing by index [0] is safer than .rawTransaction in some web3 versions
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction) 

        # 4. Wait for Block
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            "status": "Success", 
            "tx_hash": w3.to_hex(tx_hash),
            "block": receipt.blockNumber
        }

    except Exception as e:
        print(f"Blockchain Error: {e}") 
        return {"status": "Error", "message": str(e)}

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