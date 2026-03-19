import os
import requests
from dotenv import load_dotenv

# Load env variables (Yeh automatically tumhari backend folder wali .env ko dhund lega)
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

def upload_file_to_ipfs(file_bytes: bytes, filename: str):
    """
    Takes file bytes and uploads them securely to Pinata IPFS.
    Returns the IPFS Hash (CID).
    """
    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY
    }
    
    files = {
        'file': (filename, file_bytes)
    }
    
    try:
        response = requests.post(url, files=files, headers=headers)
        if response.status_code == 200:
            ipfs_hash = response.json()["IpfsHash"]
            print(f"📦 Successfully pinned to IPFS: {ipfs_hash}")
            return {"status": "Success", "ipfs_hash": ipfs_hash}
        else:
            print(f"❌ Pinata Error: {response.text}")
            return {"status": "Error", "message": response.text}
    except Exception as e:
        return {"status": "Error", "message": str(e)}
