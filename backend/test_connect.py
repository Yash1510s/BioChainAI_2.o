import json
import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# 1. Connect
w3 = Web3(Web3.HTTPProvider(os.getenv("BLOCKCHAIN_URL")))
print(f"🔌 Connected to Blockchain? {w3.is_connected()}")

# 2. Load ABI
try:
    with open("biochain_abi.json", "r") as f:
        abi = json.load(f)["abi"]
    print("✅ ABI Loaded")
except FileNotFoundError:
    print("❌ ERROR: biochain_abi.json not found in backend folder!")
    exit()

# 3. Connect to Contract
address = os.getenv("CONTRACT_ADDRESS")
contract = w3.eth.contract(address=address, abi=abi)

# 4. Read Data
try:
    name = contract.functions.hospitalName().call()
    print(f"🏥 Success! Connected to: {name}")
except Exception as e:
    print(f"❌ Contract Error: {e}")