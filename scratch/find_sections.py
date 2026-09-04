import sys

# Read the file and find all lines starting with "## "
filepath = r"c:\Users\YASH VIJAY SINGH\Desktop\BCA2.0 copy\BioChainAI_Source_Code_Report (1).md"

with open(filepath, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        stripped = line.strip()
        if stripped.startswith("## ") and any(c.isdigit() for c in stripped[:8]):
            print(f"Line {i}: {stripped}")

print("\n--- NON-NUMBERED ## HEADERS ---")
with open(filepath, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        stripped = line.strip()
        if stripped.startswith("## ") and not any(c.isdigit() for c in stripped[:8]):
            print(f"Line {i}: {stripped}")

print("\n--- TOTAL LINES ---")
with open(filepath, "r", encoding="utf-8") as f:
    total = sum(1 for _ in f)
    print(f"Total lines: {total}")
