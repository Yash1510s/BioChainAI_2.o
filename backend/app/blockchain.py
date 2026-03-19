import json
import os
import hashlib
from web3 import Web3
from eth_account import Account
from dotenv import load_dotenv

# 1. Setup Connection
# Load .env from the backend root directory
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

w3 = Web3(Web3.HTTPProvider(os.getenv("BLOCKCHAIN_URL")))
account_address = os.getenv("ACCOUNT_ADDRESS") 
private_key = os.getenv("PRIVATE_KEY")
contract_address = os.getenv("CONTRACT_ADDRESS")

# Safety Check (Defaults to Hardhat Account #0)
if not account_address or not private_key:
    account_address = account_address or "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    private_key = private_key or "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

# 2. Load ABI
try:
    with open(os.path.join(os.path.dirname(__file__), "biochain_abi.json"), "r") as f:
        data = json.load(f)
        abi = data["abi"] if isinstance(data, dict) and "abi" in data else data
    contract = w3.eth.contract(address=contract_address, abi=abi)
except Exception as e:
    print(f"Error loading ABI: {e}")

def generate_identity_hash(email: str):
    return hashlib.sha256(email.encode()).hexdigest()

def get_hospital_details():
    try:
        return contract.functions.hospitals(account_address).call()[1]
    except Exception:
        return "BioChainAI Enterprise"

def register_patient_on_chain(data):
    try:
        identity_hash = generate_identity_hash(data.email)
        
        # 🌟 WEB 2.5 MAGIC: Generate a unique Ethereum wallet based on the patient's email hash!
        # This ensures every patient gets a unique blockchain identity without needing MetaMask.
        patient_wallet = Account.from_key("0x" + identity_hash).address

        # 1. Build Transaction
        # Super Admin (account_address) is acting as the Relayer, paying the gas fee.
        tx = contract.functions.registerPatient(
            patient_wallet,                 # Unique Patient Wallet
            data.name or "Unknown",         
            identity_hash,                  
            data.bloodGroup or "O+",        # Fixed variable name
            data.allergies or "None",       
            data.emergencyContact or "N/A", # Fixed variable name
            "QmPlaceholderHash"             
        ).build_transaction({
            'chainId': 31337,
            'gas': 2000000,
            'gasPrice': w3.to_wei('50', 'gwei'),
            'nonce': w3.eth.get_transaction_count(account_address),
        })

        # 2. Sign Transaction (Admin signs it to pay gas)
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
    Temporary Dashboard Fetcher
    """
    try:
        patient_basic = contract.functions.patients(account_address).call()
        profile = contract.functions.getProfile(account_address).call()

        return {
            "status": "Success",
            "name": patient_basic[0],         
            "email_hash": patient_basic[1],   
            "blood_type": profile[0],         
            "allergies": profile[1],          
            "emergency_contact": profile[2],  
            "timestamp": profile[4]           
        }
    except Exception as e:
        return {"status": "Error", "message": str(e)}