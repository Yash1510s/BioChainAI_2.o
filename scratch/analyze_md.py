import os
import re

file_path = r"c:\Users\YASH VIJAY SINGH\Desktop\BCA2.0 copy\BioChainAI_Source_Code_Report (1).md"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Find all section headers
sections = re.findall(r"^## (\d+\.\s+.*)$", content, re.MULTILINE)

# Find abbreviated text indicators
abbreviations = []
lines = content.split('\n')
for i, line in enumerate(lines):
    if "..." in line or "Full component implementation" in line or "abbreviated" in line.lower():
        abbreviations.append(f"Line {i+1}: {line.strip()}")

output_path = r"c:\Users\YASH VIJAY SINGH\Desktop\BCA2.0 copy\scratch\md_analysis_results.txt"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(f"Total Sections Found: {len(sections)}\n\n")
    for sec in sections:
        f.write(f"{sec}\n")
    
    f.write("\n\nPossible Abbreviations / Truncations Found:\n")
    for abbr in abbreviations:
        f.write(f"{abbr}\n")

print(f"Results written to {output_path}")
