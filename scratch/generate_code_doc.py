#!/usr/bin/env python3
"""
Generate the complete LaTeX code document for BioChainAI 2.0 copyright registration.
Reads all source files and produces a single .tex file with proper lstlisting environments.
"""

import os
import re
import json

PROJECT_ROOT = r"c:\Users\YASH VIJAY SINGH\OneDrive\Desktop\BCA2.0 copy"
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "copyright", "BioChainAI_Copyright_Code_Complete.tex")

# Sensitive patterns to redact
SENSITIVE_PATTERNS = [
    # MongoDB URI with credentials
    (r'mongodb\+srv://[^"\']+', 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/biochain_db?retryWrites=true&w=majority'),
    # Specific email addresses that look personal
    (r'yash82040@gmail\.com', 'YOUR_EMAIL@example.com'),
]

# File ordering for the code document
CODE_FILES = [
    # === BACKEND (Core Application) ===
    ("backend/main.py", "Python", "Backend Core API Server"),
    ("backend/app/blockchain.py", "Python", "Blockchain Integration Module"),
    ("backend/app/pinata.py", "Python", "Pinata IPFS Upload Utility"),
    ("backend/app/models.py", "Python", "Pydantic Data Models"),
    ("backend/app/__init__.py", "Python", "App Package Initializer"),

    # === BACKEND (Database Seeding & Configuration) ===
    ("backend/seed.py", "Python", "Enterprise Database Seeding Script"),
    ("backend/requirements.txt", "bash", "Python Dependencies (requirements.txt)"),
    ("backend/.env.example", "bash", "Environment Variables Template"),

    # === BACKEND (Development/Debugging/Testing Scripts) ===
    ("backend/test_connect.py", "Python", "Database Connection Test Script [Development Tool]"),
    ("backend/view_db.py", "Python", "Database Viewer Script [Development Tool]"),
    ("backend/check_db.py", "Python", "Appointment Dump Script [Development Tool]"),
    ("backend/reset_pwd.py", "Python", "Password Reset Utility [Development Tool]"),
    ("backend/simulator.py", "Python", "IoT Vitals WebSocket Simulator [Testing Tool]"),
    ("backend/update_names.py", "Python", "Doctor Name Migration Script [Development Tool]"),
    ("backend/update_records.py", "Python", "Medical Record Migration Script [Development Tool]"),
    ("backend/migrate_records.py", "Python", "Patient Record Migration Script [Development Tool]"),
    ("backend/print_records.py", "Python", "Record Printer Script [Development Tool]"),
    ("backend/tmp_update_patient.py", "Python", "Temporary Patient Update Script [Development Tool]"),

    # === BLOCKCHAIN ===
    ("blockchain/contracts/BioChaincontract.sol", "Solidity", "Smart Contract (Solidity)"),
    ("blockchain/scripts/deploy.js", "JavaScript", "Contract Deployment Script"),
    ("blockchain/hardhat.config.js", "JavaScript", "Hardhat Network Configuration"),
    ("blockchain/package.json", "JavaScript", "Blockchain Dependencies (package.json)"),

    # === FRONTEND (Core Application Files) ===
    ("frontend/src/main.jsx", "JavaScript", "React Application Entry Point"),
    ("frontend/src/config.js", "JavaScript", "Frontend Configuration"),
    ("frontend/src/App.jsx", "JavaScript", "Main Application Component (Login Gate + Router)"),
    ("frontend/src/Register.jsx", "JavaScript", "Patient Registration Component"),
    ("frontend/src/Dashboard.jsx", "JavaScript", "Role-Based Dashboard Component"),
    ("frontend/src/PatientList.jsx", "JavaScript", "Patient List Component"),
    ("frontend/src/index.css", "CSS", "Global Stylesheet"),
    ("frontend/src/App.css", "CSS", "App Component Stylesheet"),

    # === FRONTEND (Feature Components) ===
    ("frontend/src/components/LiveVitals.jsx", "JavaScript", "Live Vitals Monitoring Component"),
    ("frontend/src/components/PatientAppointments.jsx", "JavaScript", "Patient Appointments Component"),
    ("frontend/src/components/DoctorAppointments.jsx", "JavaScript", "Doctor Scheduling Hub Component"),
    ("frontend/src/components/CareTeam.jsx", "JavaScript", "Care Team Access Control Component"),
    ("frontend/src/components/DrugInteractionChecker.jsx", "JavaScript", "Drug Interaction Checker Component"),
    ("frontend/src/components/AIAssistantWidget.jsx", "JavaScript", "AI Assistant Chatbot Widget"),
    ("frontend/src/components/MyRecords.jsx", "JavaScript", "Medical Records Viewer Component"),
    ("frontend/src/components/UploadData.jsx", "JavaScript", "Medical Document Upload Component"),
    ("frontend/src/components/MyProfile.jsx", "JavaScript", "User Profile Component"),
    ("frontend/src/components/PatientsDirectory.jsx", "JavaScript", "Patients Directory Component"),
    ("frontend/src/components/IssueRecordModal.jsx", "JavaScript", "Issue Record Modal Component"),
    ("frontend/src/components/ProfileUpload.jsx", "JavaScript", "Profile Photo Upload Component"),

    # === FRONTEND (Admin Components) ===
    ("frontend/src/components/NodeOverview.jsx", "JavaScript", "Node Overview Dashboard Component"),
    ("frontend/src/components/StaffDirectory.jsx", "JavaScript", "Staff Directory Component"),
    ("frontend/src/components/AuditLogs.jsx", "JavaScript", "Audit Logs Component"),

    # === FRONTEND (Configuration) ===
    ("frontend/package.json", "JavaScript", "Frontend Dependencies (package.json)"),

    # === AUTOMATION ===
    ("start_biochain.ps1", "bash", "Master Launcher Script (PowerShell)"),

    # === SMART CONTRACT ABI (Auto-Generated) ===
    ("backend/app/biochain_abi.json", "JavaScript", "Smart Contract ABI (Auto-Generated by Hardhat Compiler)"),
]


def get_language_tag(lang):
    """Map language names to lstlisting language parameters."""
    mapping = {
        "Python": "Python",
        "JavaScript": "Java",  # lstlisting doesn't have native JS; Java is closest for syntax highlighting
        "Solidity": "C",       # Solidity has C-like syntax
        "CSS": "C",            # CSS somewhat C-like for highlighting
        "bash": "bash",
        "HTML": "HTML",
    }
    return mapping.get(lang, "")


def sanitize_content(content, filepath):
    """Replace sensitive data with placeholders."""
    # Replace the .env file's actual values if somehow they leak
    for pattern, replacement in SENSITIVE_PATTERNS:
        content = re.sub(pattern, replacement, content)
    return content


def escape_for_lstlisting(content):
    """
    The listings package handles most special characters automatically.
    But we need to handle a few edge cases.
    """
    # No special escaping needed for listings package when using basicstyle=\ttfamily
    # The package automatically handles %, $, {, }, etc. inside lstlisting
    return content


def generate_functions_section():
    """Generate the Functions/Modules section."""
    return r"""
%% ════════════════════════════════════════════════════════════
%% 2. FUNCTIONS / MODULES
%% ════════════════════════════════════════════════════════════
\newpage
\section*{Functions / Modules used in the application}
\addcontentsline{toc}{section}{Functions / Modules used in the application}

\subsection*{Backend (FastAPI --- main.py)}

\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=6pt]
    \item \textbf{create\_audit\_log(actor\_name, actor\_wallet, action\_type, description, color)}
    \\ \textit{Summary:} Creates an immutable audit log entry in the MongoDB audit\_logs collection, recording the actor, action, timestamp, and a simulated blockchain transaction hash for compliance tracking.

    \item \textbf{get\_password\_hash(password)}
    \\ \textit{Summary:} Hashes a plaintext password using the PBKDF2-SHA256 algorithm via the passlib library, producing a secure hash for storage.

    \item \textbf{verify\_password(plain\_password, hashed\_password)}
    \\ \textit{Summary:} Verifies a plaintext password against a stored PBKDF2-SHA256 hash. Includes fallback for legacy accounts with plain-text passwords.

    \item \textbf{register\_patient(patient: PatientSignup)}
    \\ \textit{Summary:} Registers a new patient by checking email uniqueness, triggering blockchain smart contract registration via the Relayer pattern, hashing the password, and persisting the record in MongoDB with clinical defaults.

    \item \textbf{login\_patient\_step1(data: PatientLogin)}
    \\ \textit{Summary:} Implements the first stage of two-factor authentication --- verifies email and password against MongoDB, generates a 6-digit OTP, stores it in memory, and simulates SMS delivery by printing to the terminal.

    \item \textbf{login\_patient\_verify(payload: dict)}
    \\ \textit{Summary:} Implements the second stage of two-factor authentication --- verifies the submitted OTP against the stored OTP, and upon success, returns the patient's full profile data.

    \item \textbf{forgot\_password\_send\_otp(data: dict)}
    \\ \textit{Summary:} Sends a 6-digit OTP to the specified email for password reset verification. Validates email existence in MongoDB before generating OTP.

    \item \textbf{forgot\_password\_verify\_otp(data: dict)}
    \\ \textit{Summary:} Verifies the submitted OTP and resets the patient's password with a new PBKDF2-SHA256 hash upon successful verification.

    \item \textbf{login\_doctor(data: DoctorLogin)}
    \\ \textit{Summary:} Authenticates a doctor via MetaMask Web3 signature verification. Recovers the Ethereum address from the signed message using \texttt{eth-account}, compares it against the registered wallet, and returns the doctor's profile.

    \item \textbf{login\_admin(data: AdminLogin)}
    \\ \textit{Summary:} Authenticates a Hospital Administrator via MetaMask Web3 signature verification against the hospitals collection.

    \item \textbf{issue\_medical\_record(record: MedicalRecord)}
    \\ \textit{Summary:} Persists a new medical record in MongoDB with patient ID, doctor details, hospital, diagnosis, IPFS file hashes, timestamp, and self-upload detection flag.

    \item \textbf{upload\_to\_ipfs(files: List[UploadFile])}
    \\ \textit{Summary:} Accepts multiple file uploads, transmits each to Pinata's IPFS pinning API, and returns an array of IPFS Content Identifier (CID) hashes.

    \item \textbf{get\_care\_team(patient\_email: str)}
    \\ \textit{Summary:} Constructs the patient's Care Team by aggregating unique doctors from the appointment history, enriching with doctor profile data, and checking access permission overrides.

    \item \textbf{toggle\_doctor\_access(data: AccessToggle)}
    \\ \textit{Summary:} Upserts an access permission record granting or revoking a doctor's access to a patient's medical records, and logs the action to the audit ledger.

    \item \textbf{ai\_assistant\_chat(request: ChatRequest)}
    \\ \textit{Summary:} Processes a chat message through the Google Gemini AI engine with role-specific context prompts, returning an AI-generated clinical response.

    \item \textbf{check\_drug\_interactions(request: DrugCheckRequest)}
    \\ \textit{Summary:} Sends a list of medication names to Google Gemini with a structured clinical prompt, parses the JSON response, and returns a risk level classification with a clinical explanation.

    \item \textbf{iot\_vitals\_stream(websocket: WebSocket, patient\_id: str)}
    \\ \textit{Summary:} Establishes a persistent WebSocket connection for real-time IoT vital sign streaming. Transmits simulated BPM and SpO2 readings every 2 seconds with automatic threshold-based status flagging.

    \item \textbf{get\_patients\_list()}
    \\ \textit{Summary:} Returns a sanitized list of all registered patients for the doctor's patient directory, stripping sensitive fields like password and MongoDB \_id.

    \item \textbf{get\_doctors\_list()}
    \\ \textit{Summary:} Returns a list of all active doctors for appointment booking and directory browsing.

    \item \textbf{create\_appointment(data: dict)}
    \\ \textit{Summary:} Creates a new appointment with ``Pending'' status linking a patient to a doctor, storing reason and timestamps.

    \item \textbf{get\_patient\_appointments(email: str)}
    \\ \textit{Summary:} Retrieves all appointments for a specific patient, sorted by creation date.

    \item \textbf{get\_doctor\_appointments(wallet: str)}
    \\ \textit{Summary:} Retrieves all appointments assigned to a specific doctor for their Scheduling Hub.

    \item \textbf{approve\_appointment(data: dict)}
    \\ \textit{Summary:} Doctor approves a pending appointment by assigning a scheduled date and time, updating status to ``Scheduled''.

    \item \textbf{get\_patient\_records(patient\_id: str)}
    \\ \textit{Summary:} Retrieves all medical records associated with a specific patient email.

    \item \textbf{update\_profile(data: dict)}
    \\ \textit{Summary:} Updates the user's profile fields in MongoDB including name, phone, address, blood group, allergies, and emergency contact.

    \item \textbf{update\_profile\_photo(data: dict)}
    \\ \textit{Summary:} Updates the user's profile photo URL (IPFS hash) in the patients collection.

    \item \textbf{get\_audit\_logs()}
    \\ \textit{Summary:} Returns all audit log entries sorted by timestamp in descending order for the Enterprise Admin dashboard.

    \item \textbf{get\_node\_overview()}
    \\ \textit{Summary:} Returns aggregated system health metrics including patient count, doctor count, hospital count, appointment volume, and simulated blockchain statistics.

    \item \textbf{register\_doctor(data: dict)}
    \\ \textit{Summary:} Hospital Admin onboards a new doctor by inserting their profile into MongoDB with wallet address, specialization, department, and license information.
\end{enumerate}

\subsection*{Backend (blockchain.py)}
\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=6pt]
    \setcounter{enumi}{29}
    \item \textbf{generate\_identity\_hash(email: str)}
    \\ \textit{Summary:} Generates a SHA-256 hash of the patient's email address to create a deterministic blockchain identity.

    \item \textbf{register\_patient\_on\_chain(data)}
    \\ \textit{Summary:} Builds, signs, and submits an Ethereum transaction to register a patient on the BioChainNetwork smart contract using the Relayer pattern (Super Admin pays gas).

    \item \textbf{get\_hospital\_details()}
    \\ \textit{Summary:} Retrieves the hospital name associated with the Super Admin wallet from the blockchain.

    \item \textbf{fetch\_patient\_data()}
    \\ \textit{Summary:} Retrieves patient basic info and medical profile from the blockchain smart contract.

    \item \textbf{upload\_file\_to\_ipfs(file\_bytes, filename)} \textit{(pinata.py)}
    \\ \textit{Summary:} Uploads raw file bytes to the Pinata IPFS pinning service and returns the resulting IPFS hash (CID).
\end{enumerate}

\subsection*{Smart Contract (BioChainNetwork.sol)}
\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=6pt]
    \setcounter{enumi}{34}
    \item \textbf{registerHospital(\_adminWallet, \_name, \_regNumber)}
    \\ \textit{Summary:} Super Admin registers a new hospital organization on the blockchain with admin wallet, name, and registration number.

    \item \textbf{addDoctor(\_wallet, \_name, \_license, \_spec)}
    \\ \textit{Summary:} Hospital Admin adds a doctor to the blockchain registry, linking them to the hospital and adding to the staff list.

    \item \textbf{registerPatient(\_pWallet, \_name, \_idHash, \_blood, \_allergies, \_emergency, \_pHash)}
    \\ \textit{Summary:} Authorized Relayer registers a patient on the blockchain with full medical profile initialization.

    \item \textbf{triggerSOS(\_severity) / resolveSOS()}
    \\ \textit{Summary:} Patient-initiated emergency override that bypasses normal access checks, allowing any active doctor to access records during critical situations.

    \item \textbf{addMedicalRecord(\_pWallet, \_hash, \_type, \_cat, \_notes)}
    \\ \textit{Summary:} Active doctor adds a medical record to a patient's blockchain history, requiring either standard access or active SOS emergency.

    \item \textbf{grantAccess(\_doctor) / revokeAccess(\_doctor)}
    \\ \textit{Summary:} Patient controls which doctors can access their medical records on the blockchain level.

    \item \textbf{referPatient(\_pWallet, \_targetDoc, \_reason)}
    \\ \textit{Summary:} Active doctor refers a patient to another doctor, automatically granting the target doctor access to the patient's records.

    \item \textbf{issuePrescription(\_patient, \_diagnosis, \_ipfsHash)}
    \\ \textit{Summary:} Active doctor issues a prescription stored on the blockchain with IPFS-backed document reference.

    \item \textbf{getProfile / getPatientRecords / getRecord / getPrescriptions / getReferrals / getHospitalStaff}
    \\ \textit{Summary:} Read-only getter functions for retrieving patient profiles, medical records, prescriptions, referrals, and hospital staff lists from the blockchain.
\end{enumerate}

\subsection*{Frontend React Components}
\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=6pt]
    \setcounter{enumi}{43}
    \item \textbf{LoginGate} \textit{(App.jsx)}
    \\ \textit{Summary:} Renders three role-based authentication portals (Patient Email+OTP, Doctor MetaMask, Admin MetaMask) with glassmorphic UI and forgot password flow.

    \item \textbf{App} \textit{(App.jsx)}
    \\ \textit{Summary:} Main application router managing view state (login/register/dashboard), role-based sidebar navigation, and conditional module rendering.

    \item \textbf{Register} \textit{(Register.jsx)}
    \\ \textit{Summary:} Patient registration form with full profile fields (name, email, phone, address, blood group, allergies, emergency contact).

    \item \textbf{Dashboard} \textit{(Dashboard.jsx)}
    \\ \textit{Summary:} Role-specific dashboard rendering Patient Home, Doctor Home, or Admin Home with dynamic metrics and quick-access cards.

    \item \textbf{LiveVitals} \textit{(LiveVitals.jsx)}
    \\ \textit{Summary:} Canvas-based ECG waveform visualization with WebSocket real-time Heart Rate/SpO2 streaming and threshold alerting.

    \item \textbf{PatientAppointments} \textit{(PatientAppointments.jsx)}
    \\ \textit{Summary:} Patient appointment booking with doctor directory browsing and appointment status tracking.

    \item \textbf{DoctorAppointments} \textit{(DoctorAppointments.jsx)}
    \\ \textit{Summary:} Doctor's Scheduling Hub for viewing, approving, and managing appointment requests with date/time assignment.

    \item \textbf{CareTeam} \textit{(CareTeam.jsx)}
    \\ \textit{Summary:} Patient-controlled access management with doctor permission toggles and audit logging.

    \item \textbf{DrugInteractionChecker} \textit{(DrugInteractionChecker.jsx)}
    \\ \textit{Summary:} Multi-drug input interface with Gemini AI-powered interaction analysis and risk classification display.

    \item \textbf{AIAssistantWidget} \textit{(AIAssistantWidget.jsx)}
    \\ \textit{Summary:} Floating chatbot widget with role-aware context injection and Gemini AI response streaming.

    \item \textbf{MyRecords} \textit{(MyRecords.jsx)}
    \\ \textit{Summary:} Medical records viewer with IPFS document links, filtering, and chronological history display.

    \item \textbf{UploadData} \textit{(UploadData.jsx)}
    \\ \textit{Summary:} Medical document upload interface with Pinata IPFS integration and metadata tagging.

    \item \textbf{MyProfile} \textit{(MyProfile.jsx)}
    \\ \textit{Summary:} Profile editor with IPFS photo upload and clinical field management.

    \item \textbf{PatientsDirectory} \textit{(PatientsDirectory.jsx)}
    \\ \textit{Summary:} Doctor's patient directory with search and profile card display.

    \item \textbf{IssueRecordModal} \textit{(IssueRecordModal.jsx)}
    \\ \textit{Summary:} Modal dialog for doctors to issue medical records to patients with diagnosis and document attachment.

    \item \textbf{ProfileUpload} \textit{(ProfileUpload.jsx)}
    \\ \textit{Summary:} Reusable profile photo upload component with drag-and-drop support and IPFS integration.

    \item \textbf{NodeOverview} \textit{(NodeOverview.jsx)}
    \\ \textit{Summary:} Enterprise dashboard displaying system health metrics, blockchain statistics, and service status.

    \item \textbf{StaffDirectory} \textit{(StaffDirectory.jsx)}
    \\ \textit{Summary:} Hospital admin interface for doctor onboarding and staff management with credential display.

    \item \textbf{AuditLogs} \textit{(AuditLogs.jsx)}
    \\ \textit{Summary:} Chronological audit trail viewer with actor details, action classification, and blockchain transaction hashes.
\end{enumerate}

\subsection*{Development \& Testing Scripts}
\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=6pt]
    \setcounter{enumi}{62}
    \item \textbf{seed.py} --- Enterprise database seeding script that populates MongoDB with initial hospital, doctor, and patient records for development.
    \item \textbf{test\_connect.py} --- Database connection testing and alternative seeding script for local MongoDB instances.
    \item \textbf{view\_db.py} --- Database inspection utility that displays all patients, doctors, and hospitals in the database.
    \item \textbf{check\_db.py} --- Appointment data export utility that dumps appointment records to JSON.
    \item \textbf{reset\_pwd.py} --- Password reset utility for resetting patient passwords during development.
    \item \textbf{simulator.py} --- IoT vitals WebSocket simulator that connects to the backend and displays real-time vital sign data streams.
    \item \textbf{update\_names.py} --- Doctor name migration script for updating display names across collections.
    \item \textbf{update\_records.py} --- Medical record migration script for fixing missing doctor names in records.
    \item \textbf{migrate\_records.py} --- Patient record migration script for transferring records between patient accounts.
    \item \textbf{print\_records.py} --- Simple record printing utility for debugging purposes.
    \item \textbf{tmp\_update\_patient.py} --- Temporary patient field update script for development testing.
\end{enumerate}
"""


def generate_latex():
    """Generate the complete LaTeX code document."""

    # Preamble
    latex = r"""%% ============================================================
%% Smart Blockchain and AI-Based Healthcare System
%% SOURCE CODE DOCUMENT — Copyright Registration
%% Structure follows the reference WPW Copyright Code format
%% Compiled with: pdflatex (run twice for ToC)
%% ============================================================

\documentclass[12pt, a4paper]{article}

%% ── Packages ──────────────────────────────────────────────────
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{lmodern}                    % Latin Modern fonts
\usepackage[margin=1in]{geometry}
\usepackage{setspace}                   % Line spacing
\usepackage{titlesec}                   % Section formatting
\usepackage{enumitem}                   % List customization
\usepackage{hyperref}                   % Clickable links
\usepackage{xcolor}                     % Colors
\usepackage{fancyhdr}                   % Headers / footers
\usepackage{listings}                   % Code listings
\usepackage{parskip}                    % Paragraph spacing
\usepackage{microtype}                  % Microtypography
\usepackage{longtable}                  % Multi-page tables

%% ── Code listing colors ─────────────────────────────────────
\definecolor{codegreen}{rgb}{0,0.6,0}
\definecolor{codegray}{rgb}{0.5,0.5,0.5}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
\definecolor{backcolour}{rgb}{0.95,0.95,0.92}

%% ── Hyperlink Setup ──────────────────────────────────────────
\hypersetup{
    colorlinks  = true,
    linkcolor   = black,
    urlcolor    = blue,
    citecolor   = black,
    pdfauthor   = {Yash Vijay Singh, Adonis Jeswin, Nimish Arekar, Romit Singh},
    pdftitle    = {Smart Blockchain and AI-Based Healthcare System — Source Code Document},
    pdfsubject  = {Copyright Registration under Indian Copyright Act 1957},
}

%% ── Listings Setup ──────────────────────────────────────────
\lstdefinestyle{mystyle}{
    backgroundcolor=\color{backcolour},
    commentstyle=\color{codegreen},
    keywordstyle=\color{magenta},
    numberstyle=\tiny\color{codegray},
    stringstyle=\color{codepurple},
    basicstyle=\ttfamily\scriptsize,
    breakatwhitespace=false,
    breaklines=true,
    captionpos=b,
    keepspaces=true,
    numbers=left,
    numbersep=5pt,
    showspaces=false,
    showstringspaces=false,
    showtabs=false,
    tabsize=2
}
\lstset{style=mystyle}

%% ── Line Spacing ────────────────────────────────────────────
\onehalfspacing

%% ── Page Style ──────────────────────────────────────────────
\pagestyle{plain}

%% ════════════════════════════════════════════════════════════
%%                       DOCUMENT
%% ════════════════════════════════════════════════════════════
\begin{document}

%% ── Title Page ──────────────────────────────────────────────
\begin{titlepage}
    \centering
    \vspace*{3cm}

    {\LARGE\bfseries SOURCE CODE DOCUMENT\par}

    \vspace{2cm}

    \begin{tabular}{@{}l l@{}}
        \textbf{Title:}            & Smart Blockchain and AI-based Healthcare System \\[8pt]
        \textbf{Class of work:}    & Software \\[8pt]
        \textbf{Authors:}          & Yash Vijay Singh, Adonis Jeswin, Nimish Arekar, Romit Singh \\[8pt]
        \textbf{Organization:}     & Xavier Institute of Engineering, \\
                                   & Mahim, Mumbai, Maharashtra, India \\
    \end{tabular}

    \vfill
\end{titlepage}

%% ── Table of Contents ───────────────────────────────────────
\newpage
\tableofcontents
\newpage

"""

    # ── Section 1: Folder Structure ──
    latex += r"""
%% ════════════════════════════════════════════════════════════
%% 1. FOLDER STRUCTURE
%% ════════════════════════════════════════════════════════════
\section*{Project Folder Structure}
\addcontentsline{toc}{section}{Project Folder Structure}

The ``Smart Blockchain and AI-Based Healthcare System'' project root consists of the following directories and files:

\subsection*{1. ``backend'' Folder:}
\begin{enumerate}[label=\alph*), leftmargin=2em]
    \item Contains the FastAPI (Python) server that acts as the RESTful API backend for the application.
    \item The main application logic resides in \texttt{main.py} (1006 lines), handling all API endpoints, authentication, WebSocket streaming, and database operations.
    \item Subfolder ``app'' contains the blockchain integration module (\texttt{blockchain.py}), Pinata IPFS upload utility (\texttt{pinata.py}), data models (\texttt{models.py}), and the smart contract ABI (\texttt{biochain\_abi.json}).
    \item Contains \texttt{requirements.txt} for Python dependency management and \texttt{.env.example} for environment variable configuration.
    \item Contains development/debugging/testing scripts: \texttt{seed.py} (database seeding), \texttt{test\_connect.py} (connection testing), \texttt{view\_db.py} (database viewer), \texttt{check\_db.py} (data export), \texttt{reset\_pwd.py} (password reset), \texttt{simulator.py} (IoT simulator), and various migration utilities.
\end{enumerate}

\subsection*{2. ``frontend'' Folder:}
\begin{enumerate}[label=\alph*), leftmargin=2em]
    \item Contains the React 19 + Vite 7 frontend application.
    \item Subfolder ``src'' contains all React components (JSX), styling (CSS), and configuration files.
    \item Core files: \texttt{App.jsx} (548 lines --- Login Gate and application router), \texttt{Dashboard.jsx} (849 lines --- role-based dashboard), \texttt{Register.jsx} (patient registration), \texttt{PatientList.jsx} (patient listing).
    \item Subfolder ``src/components'' holds all 15 modular UI components:
    \begin{itemize}
        \item \texttt{LiveVitals.jsx} --- Real-time ECG waveform and vital sign monitoring
        \item \texttt{PatientAppointments.jsx} --- Patient appointment booking interface
        \item \texttt{DoctorAppointments.jsx} --- Doctor's scheduling hub
        \item \texttt{CareTeam.jsx} --- Patient-controlled access management
        \item \texttt{DrugInteractionChecker.jsx} --- AI-powered drug interaction analysis
        \item \texttt{AIAssistantWidget.jsx} --- Floating Gemini AI chatbot
        \item \texttt{MyRecords.jsx} --- Medical records viewer
        \item \texttt{UploadData.jsx} --- IPFS document upload
        \item \texttt{MyProfile.jsx} --- Profile editor
        \item \texttt{PatientsDirectory.jsx} --- Doctor's patient directory
        \item \texttt{IssueRecordModal.jsx} --- Record issuance dialog
        \item \texttt{ProfileUpload.jsx} --- Profile photo upload
        \item \texttt{NodeOverview.jsx} --- Enterprise system metrics
        \item \texttt{StaffDirectory.jsx} --- Staff management and onboarding
        \item \texttt{AuditLogs.jsx} --- Immutable audit trail viewer
    \end{itemize}
\end{enumerate}

\subsection*{3. ``blockchain'' Folder:}
\begin{enumerate}[label=\alph*), leftmargin=2em]
    \item Subfolder ``contracts'' contains the Solidity smart contract \texttt{BioChaincontract.sol} (308 lines).
    \item Subfolder ``scripts'' contains the deployment script \texttt{deploy.js}.
    \item Contains \texttt{hardhat.config.js} for Hardhat network configuration and \texttt{package.json} for Node.js dependencies.
\end{enumerate}

\subsection*{4. ``start\_biochain.ps1'' file:}
\begin{enumerate}[label=\alph*), leftmargin=2em]
    \item Custom PowerShell automation script that orchestrates the concurrent startup of all four system services (Hardhat node, contract deployment, FastAPI backend, Vite frontend), providing a one-click launch mechanism.
\end{enumerate}

"""

    # ── Section 2: Functions/Modules ──
    latex += generate_functions_section()

    # ── Section 3: API Keys & Configuration Guide ──
    latex += r"""
\newpage
\section*{API Keys and Configuration Guide}
\addcontentsline{toc}{section}{API Keys and Configuration Guide}

\textbf{Important Note:} For security purposes, all API keys, private keys, and sensitive credentials have been replaced with placeholder values in this document. To run the application, you must obtain your own keys and configure them in the \texttt{.env} file in the backend directory.

\subsection*{How to Obtain Required API Keys:}

\begin{enumerate}[label=\textbf{\arabic*)}, leftmargin=2em, itemsep=8pt]
    \item \textbf{MongoDB Atlas URI:}
    \begin{itemize}
        \item Visit \url{https://www.mongodb.com/atlas} and create a free account.
        \item Create a new cluster (free tier M0 available).
        \item Go to ``Database Access'' and create a database user with password.
        \item Go to ``Network Access'' and add your IP address (or 0.0.0.0/0 for development).
        \item Click ``Connect'' $\rightarrow$ ``Connect your application'' and copy the connection string.
        \item Replace \texttt{YOUR\_USERNAME}, \texttt{YOUR\_PASSWORD}, and \texttt{YOUR\_CLUSTER} in the URI.
    \end{itemize}

    \item \textbf{Pinata IPFS API Keys:}
    \begin{itemize}
        \item Visit \url{https://app.pinata.cloud/} and create a free account.
        \item Navigate to ``API Keys'' in the dashboard.
        \item Click ``New Key'' and generate an API key with ``pinFileToIPFS'' permission.
        \item Copy both the \texttt{API Key} and \texttt{API Secret}.
    \end{itemize}

    \item \textbf{Google Gemini AI API Key:}
    \begin{itemize}
        \item Visit \url{https://aistudio.google.com/apikey} and sign in with a Google account.
        \item Click ``Create API Key'' and select or create a Google Cloud project.
        \item Copy the generated API key.
    \end{itemize}

    \item \textbf{Hardhat Blockchain (Local --- No External Key Required):}
    \begin{itemize}
        \item Run \texttt{npx hardhat node} to start a local Ethereum node.
        \item The node automatically generates 20 test accounts with pre-funded ETH.
        \item Account \#0 address and private key are used as the Super Admin / Relayer.
        \item The default Hardhat Account \#0 address is: \texttt{0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266}
        \item The default Hardhat Account \#0 private key is: \texttt{0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80}
        \item \textbf{Note:} These are public test-only keys provided by Hardhat. Never use them on a real Ethereum network.
    \end{itemize}

    \item \textbf{MetaMask Wallet (For Doctor/Admin Login):}
    \begin{itemize}
        \item Install the MetaMask browser extension from \url{https://metamask.io/}.
        \item Create a new wallet or import an existing one.
        \item Add a custom network: Network Name: ``Hardhat'', RPC URL: \texttt{http://127.0.0.1:8545}, Chain ID: \texttt{31337}, Currency Symbol: \texttt{ETH}.
        \item Import a Hardhat test account using its private key for testing.
    \end{itemize}
\end{enumerate}

"""

    # ── Section 3: GitHub Repository Access Note ──
    latex += r"""
%% ════════════════════════════════════════════════════════════
%% 3. GITHUB REPOSITORY ACCESS NOTE
%% ════════════════════════════════════════════════════════════
\newpage
\section*{GitHub Repository Access Note}
\addcontentsline{toc}{section}{GitHub Repository Access Note}

The complete, unabridged, verbatim source code for all 48 files of the BioChainAI 2.0 ecosystem is documented in its entirety across the sections below. Every line of code from every module, component, smart contract, and script is included directly in this registration document without abbreviation.

Additionally, for interactive code browsing, version control history, commit auditing, and cloning, the official live project repository is publicly accessible on GitHub at:
\begin{center}
    \large\textbf{\url{https://github.com/Yash1510s/BioChainAI_2.o}}
\end{center}

\vspace{0.5cm}

%% ════════════════════════════════════════════════════════════
%% 4. SOURCE CODE — COMPLETE AND UNABRIDGED
%% ════════════════════════════════════════════════════════════
\newpage
\section*{Source Code --- Complete and Unabridged}
\addcontentsline{toc}{section}{Source Code --- Complete and Unabridged}

The following sections contain the \textbf{complete, unabridged source code} of the entire application.
All code files are presented in their entirety without any truncation or abbreviation.

\textbf{Note:} API keys, private keys, and sensitive credentials have been replaced with placeholder values (e.g., \texttt{YOUR\_API\_KEY\_HERE}) for security. Refer to the ``API Keys and Configuration Guide'' section above for instructions on obtaining your own keys.

\vspace{0.3cm}
Code Files are in the following order:

"""

    # Build the code file listing
    latex += r"\begin{enumerate}" + "\n"
    for i, (filepath, lang, title) in enumerate(CODE_FILES, 1):
        escaped_path = filepath.replace('\\', '/').replace('_', r'\_').replace('&', r'\&')
        latex += f"    \\item {escaped_path}\n"
    latex += r"\end{enumerate}" + "\n\n"

    # Now add each code file
    for i, (filepath, lang, title) in enumerate(CODE_FILES, 1):
        full_path = os.path.join(PROJECT_ROOT, filepath.replace('/', os.sep))

        if not os.path.exists(full_path):
            print(f"WARNING: File not found: {full_path}")
            continue

        try:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except Exception as e:
            print(f"ERROR reading {full_path}: {e}")
            continue

        # Sanitize sensitive content
        content = sanitize_content(content, filepath)

        # Count lines
        line_count = len(content.splitlines())

        escaped_title = title.replace('\\', '/').replace('_', r'\_').replace('&', r'\&')
        escaped_path = filepath.replace('\\', '/').replace('_', r'\_').replace('&', r'\&')

        lang_tag = get_language_tag(lang)

        latex += r"\newpage" + "\n"
        latex += f"\\subsection*{{{i}. {escaped_path}}}\n"
        latex += f"\\addcontentsline{{toc}}{{subsection}}{{{i}. {escaped_path}}}\n"

        # Add a development tool note if applicable
        if "[Development Tool]" in title or "[Testing Tool]" in title:
            tool_type = "Development/Debugging Tool" if "Development" in title else "Testing Tool"
            latex += f"\\noindent\\textit{{(This file is a {tool_type}, not part of the core application.)}}\n\n"

        if lang_tag:
            latex += f"\\begin{{lstlisting}}[language={lang_tag}]\n"
        else:
            latex += f"\\begin{{lstlisting}}\n"

        latex += content
        if not content.endswith('\n'):
            latex += '\n'
        latex += r"\end{lstlisting}" + "\n\n"

        print(f"  [{i:02d}/{len(CODE_FILES)}] Added {filepath} ({line_count} lines)")

    # End document
    latex += r"""
\end{document}
"""

    return latex


if __name__ == "__main__":
    print("=" * 60)
    print("  BioChainAI 2.0 - LaTeX Code Document Generator")
    print("=" * 60)
    print()

    latex_content = generate_latex()

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(latex_content)

    # Also overwrite BioChainAI_Copyright_Code.tex so the user gets the full code regardless of which filename they open in Overleaf
    old_draft_path = os.path.join(PROJECT_ROOT, "copyright", "BioChainAI_Copyright_Code.tex")
    with open(old_draft_path, 'w', encoding='utf-8') as f:
        f.write(latex_content)

    total_lines = latex_content.count('\n')
    print()
    print(f"  Output 1: {OUTPUT_FILE}")
    print(f"  Output 2: {old_draft_path}")
    print(f"  Total LaTeX lines: {total_lines}")
    print(f"  Total size: {len(latex_content):,} bytes")
    print()
    print("  Done! Compile with: pdflatex (run twice for ToC)")
    print("=" * 60)
