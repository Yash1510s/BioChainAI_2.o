"""
==============================================
  BioChain AI - IoT Vitals Simulator v1.0
==============================================
Run this script to simulate IoT sensor data
streaming to the backend via WebSocket.

Usage:
  cd backend
  python simulator.py

The simulator connects as a WebSocket client 
and verifies the live data stream is working.
Press Ctrl+C to stop the simulation.
==============================================
"""

import asyncio
import websockets
import json

WS_URL = "ws://127.0.0.1:8000/ws/vitals/simulator-test-patient"

async def run_simulator():
    print("=" * 50)
    print("  📡 BioChain IoT Simulator v1.0")
    print("=" * 50)
    print(f"  Connecting to: {WS_URL}")
    print("-" * 50)

    try:
        async with websockets.connect(WS_URL) as ws:
            print("  ✅ Connected! Receiving live vitals data...\n")
            reading_num = 0
            while True:
                data = await ws.recv()
                vitals = json.loads(data)
                reading_num += 1

                # Color-coded terminal output
                status = vitals.get("status", "UNKNOWN")
                bpm = vitals.get("bpm", 0)
                spo2 = vitals.get("spo2", 0)
                timestamp = vitals.get("timestamp", "")

                if status == "CRITICAL":
                    status_icon = "🚨 CRITICAL"
                else:
                    status_icon = "💚 NORMAL  "

                print(f"  [{reading_num:04d}] {timestamp} | ♥ BPM: {bpm:3d} | O₂ SpO2: {spo2}% | {status_icon}")

    except websockets.exceptions.ConnectionClosedError:
        print("\n  ❌ Connection closed by server.")
    except ConnectionRefusedError:
        print("\n  ❌ Could not connect! Make sure the backend is running:")
        print("     cd backend && uvicorn main:app --reload")
    except KeyboardInterrupt:
        print("\n\n  🛑 Simulator stopped by user.")
    finally:
        print("=" * 50)

if __name__ == "__main__":
    asyncio.run(run_simulator())
