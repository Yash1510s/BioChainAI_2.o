# -*- coding: utf-8 -*-
"""
=============================================================================
BioChainAI 2.0 - Clean Code Document (.doc / .docx) Generator
=============================================================================
This script generates the exact Word document format required according to 
the 'copy_right_guide' reference (Screenshot 2).

FORMAT SPECIFICATION (Per Reference Guide):
  - Clean 2-row Table format for every single file.
  - Top Cell (Row 1): Bold Filename / Path (e.g., app.py or backend/main.py)
  - Bottom Cell (Row 2): Pure, clean source code exactly as written, with each
    statement on its own clean line (no line numbers, no dark themes, no horizontal merging).
  - Clean black borders, standard Calibri/Arial font, zero visual clutter.

OUTPUTS:
  - BioChainAI_Code_Documentation.doc  (Word-compatible structured HTML format, zero dependencies)
  - BioChainAI_Code_Documentation.docx (Native Word binary format if python-docx is installed)
=============================================================================
"""

import os
import sys
import datetime
import html

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if os.path.basename(SCRIPT_DIR).lower() == 'copyright':
    PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
    OUTPUT_DIR = SCRIPT_DIR
else:
    PROJECT_ROOT = SCRIPT_DIR
    OUTPUT_DIR = os.path.join(PROJECT_ROOT, "copyright")
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR, exist_ok=True)

DOC_OUTPUT_PATH = os.path.join(OUTPUT_DIR, "BioChainAI_Code_Documentation.doc")
DOCX_OUTPUT_PATH = os.path.join(OUTPUT_DIR, "BioChainAI_Code_Documentation.docx")

# Complete Project File Registry (All 58 Files)
PROJECT_FILES = [
    # System Launcher & Setup
    "start_biochain.ps1",
    "README.md",
    "Project report.md",
    ".gitignore",

    # Blockchain Layer
    "blockchain/contracts/BioChaincontract.sol",
    "blockchain/scripts/deploy.js",
    "blockchain/hardhat.config.js",
    "blockchain/package.json",

    # Backend Layer
    "backend/main.py",
    "backend/app/__init__.py",
    "backend/app/blockchain.py",
    "backend/app/pinata.py",
    "backend/app/models.py",
    "backend/app/biochain_abi.json",
    "backend/biochain_abi.json",
    "backend/requirements.txt",
    "backend/.env.example",
    "backend/seed.py",
    "backend/test_connect.py",
    "backend/view_db.py",
    "backend/check_db.py",
    "backend/reset_pwd.py",
    "backend/simulator.py",
    "backend/update_names.py",
    "backend/update_records.py",
    "backend/migrate_records.py",
    "backend/print_records.py",
    "backend/tmp_update_patient.py",

    # Frontend Configuration
    "frontend/index.html",
    "frontend/vite.config.js",
    "frontend/tailwind.config.js",
    "frontend/postcss.config.js",
    "frontend/eslint.config.js",
    "frontend/package.json",
    "frontend/README.md",
    "frontend/.gitignore",
    "frontend/src/main.jsx",
    "frontend/src/config.js",
    "frontend/src/index.css",
    "frontend/src/App.css",
    "frontend/src/BioChain.json",

    # Frontend Core Pages
    "frontend/src/App.jsx",
    "frontend/src/Register.jsx",
    "frontend/src/Dashboard.jsx",
    "frontend/src/PatientList.jsx",

    # Frontend UI Components
    "frontend/src/components/LiveVitals.jsx",
    "frontend/src/components/PatientAppointments.jsx",
    "frontend/src/components/DoctorAppointments.jsx",
    "frontend/src/components/CareTeam.jsx",
    "frontend/src/components/DrugInteractionChecker.jsx",
    "frontend/src/components/AIAssistantWidget.jsx",
    "frontend/src/components/MyRecords.jsx",
    "frontend/src/components/UploadData.jsx",
    "frontend/src/components/MyProfile.jsx",
    "frontend/src/components/PatientsDirectory.jsx",
    "frontend/src/components/IssueRecordModal.jsx",
    "frontend/src/components/ProfileUpload.jsx",
    "frontend/src/components/NodeOverview.jsx",
    "frontend/src/components/StaffDirectory.jsx",
    "frontend/src/components/AuditLogs.jsx",
]


def generate_word_doc_native(output_path):
    """
    Generates .doc file matching exactly Screenshot 2 reference guide format:
    A clean bordered table for each file with 2 cells (filename on top, code lines below).
    """
    print(f"\n[INFO] Generating Word Document (.doc) matching exact reference format at:\n       {output_path}")

    html_parts = []
    
    html_parts.append("""<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>BioChainAI Source Code</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
@page {
    size: 8.5in 11in;
    margin: 1in;
}
body {
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 10.5pt;
    line-height: 1.35;
    color: #000000;
}
.code-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 28pt;
    border: 1px solid #000000;
}
.code-table th {
    border: 1px solid #000000;
    padding: 6pt 8pt;
    text-align: left;
    font-weight: bold;
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 11pt;
    background-color: #ffffff;
    color: #000000;
}
.code-table td {
    border: 1px solid #000000;
    padding: 8pt;
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 10pt;
    line-height: 1.35;
    color: #000000;
    vertical-align: top;
}
</style>
</head>
<body>
""")

    for rel_path in PROJECT_FILES:
        abs_path = os.path.join(PROJECT_ROOT, rel_path.replace("/", os.sep))

        if not os.path.isfile(abs_path):
            html_parts.append(f"""
<table class="code-table">
    <thead>
        <tr><th>{html.escape(rel_path)}</th></tr>
    </thead>
    <tbody>
        <tr><td style="color:red;">[FILE NOT FOUND]</td></tr>
    </tbody>
</table>
""")
            continue

        try:
            with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
                lines = f.readlines()

            html_parts.append(f"""
<table class="code-table">
    <thead>
        <tr><th>{html.escape(rel_path)}</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>
""")
            # Print each line followed by <br> so Microsoft Word creates a crisp line break
            for line in lines:
                clean_line = html.escape(line.rstrip("\r\n")).replace("\t", "    ")
                if not clean_line:
                    html_parts.append("<br>\n")
                else:
                    html_parts.append(f"{clean_line}<br>\n")

            html_parts.append("""            </td>
        </tr>
    </tbody>
</table>
""")
        except Exception as e:
            html_parts.append(f"""
<table class="code-table">
    <thead>
        <tr><th>{html.escape(rel_path)}</th></tr>
    </thead>
    <tbody>
        <tr><td style="color:red;">[ERROR READING FILE: {html.escape(str(e))}]</td></tr>
    </tbody>
</table>
""")

    html_parts.append("</body></html>")

    with open(output_path, "w", encoding="utf-8") as out:
        out.write("".join(html_parts))

    print(f"[SUCCESS] Native Word (.doc) generated cleanly ({os.path.getsize(output_path):,} bytes).")


def generate_word_docx_library(output_path):
    """
    If python-docx is installed, generates native .docx with exact 2-row table structure per file.
    """
    try:
        import docx
        from docx import Document
        from docx.shared import Pt, RGBColor, Inches, Cm
        from docx.enum.text import WD_ALIGN_PARAGRAPH
    except ImportError:
        print("\n[NOTE] 'python-docx' package is not installed.")
        print("       To ALSO generate the .docx file, run: pip install python-docx")
        print("       (The .doc file generated above already opens natively in Microsoft Word!)")
        return

    print(f"\n[INFO] Generating Binary Word Document (.docx) matching exact reference at:\n       {output_path}")
    doc = Document()

    # Page setup
    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)

    for rel_path in PROJECT_FILES:
        abs_path = os.path.join(PROJECT_ROOT, rel_path.replace("/", os.sep))

        # Create 2-row, 1-column table with exact grid borders
        table = doc.add_table(rows=2, cols=1)
        table.style = 'Table Grid'
        table.autofit = False

        # Row 0: Filename Header
        cell_head = table.rows[0].cells[0]
        cell_head.width = Inches(6.5)
        p_head = cell_head.paragraphs[0]
        p_head.paragraph_format.space_before = Pt(3)
        p_head.paragraph_format.space_after = Pt(3)
        r_head = p_head.add_run(rel_path)
        r_head.font.name = "Calibri"
        r_head.font.size = Pt(11)
        r_head.font.bold = True
        r_head.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

        # Row 1: Code Body
        cell_body = table.rows[1].cells[0]
        cell_body.width = Inches(6.5)
        p_body = cell_body.paragraphs[0]
        p_body.paragraph_format.space_before = Pt(2)
        p_body.paragraph_format.space_after = Pt(2)

        if not os.path.isfile(abs_path):
            r_err = p_body.add_run("[FILE NOT FOUND]")
            r_err.font.color.rgb = RGBColor(0xFF, 0x00, 0x00)
        else:
            try:
                with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
                    lines = f.readlines()

                for idx, line in enumerate(lines):
                    clean_line = line.rstrip("\r\n").replace("\t", "    ")
                    if idx > 0:
                        p_body = cell_body.add_paragraph()
                        p_body.paragraph_format.space_before = Pt(0)
                        p_body.paragraph_format.space_after = Pt(0)
                    
                    r_code = p_body.add_run(clean_line)
                    r_code.font.name = "Calibri"
                    r_code.font.size = Pt(10)
                    r_code.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
            except Exception as e:
                r_err = p_body.add_run(f"[ERROR READING FILE: {e}]")
                r_err.font.color.rgb = RGBColor(0xFF, 0x00, 0x00)

        # Space between tables
        p_sep = doc.add_paragraph()
        p_sep.paragraph_format.space_before = Pt(6)
        p_sep.paragraph_format.space_after = Pt(12)

    doc.save(output_path)
    print(f"[SUCCESS] Binary Word (.docx) generated cleanly ({os.path.getsize(output_path):,} bytes).")


if __name__ == "__main__":
    print("=============================================================================")
    print("      BioChainAI 2.0 - Clean Code Document Generator (Reference Format)")
    print("=============================================================================")
    
    generate_word_doc_native(DOC_OUTPUT_PATH)
    generate_word_docx_library(DOCX_OUTPUT_PATH)
    
    print("\n✅ Generation process completed!")
    print(f"📄 Native Word file available at: {DOC_OUTPUT_PATH}")
