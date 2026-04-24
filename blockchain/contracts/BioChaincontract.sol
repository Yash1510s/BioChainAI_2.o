// =============================================================================
// Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
// Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
// License  : Proprietary — See LICENSE file in project root for full terms.
// Repo     : https://github.com/Yash1510s/BioChainAI_2.o
// WARNING  : Unauthorized copying, modification, or distribution is prohibited.
// =============================================================================
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BioChainNetwork (Phase 3 - Multi-Hospital Enterprise Ready)
 * @dev Merges user's advanced Clinical Logic (Referrals, Access, SOS) with Multi-Tenant Hospital Orgs.
 */
contract BioChainNetwork {
    
    // ==========================================
    // 1. DATA MODELS & ENUMS
    // ==========================================

    enum Role { NONE, PATIENT, DOCTOR, HOSPITAL_ADMIN, SUPER_ADMIN }

    // --- UPDATED: Hospital Network Structure (Added staffList) ---
    struct Hospital {
        address adminWallet;
        string name;
        string registrationNumber;
        bool isActive;
        address[] staffList; // Tracks all doctors in this hospital
    }

    // --- YOUR CLINICAL STRUCTURES (Preserved) ---
    struct MedicalProfile {
        string bloodType;
        string allergies;
        string emergencyContact;
        string profileHash;      // IPFS JSON for extended Bio
        uint256 lastUpdated;
    }

    struct Record {
        uint256 id;
        string ipfsHash;        // File Link (X-Ray, MRI)
        string recordType;      // e.g., "Scan", "Lab Result"
        string category;        // AI Tag: "Critical", "Routine"
        string notes;           // Preserved from your code
        address addedBy;
        uint256 timestamp;
    }

    struct Prescription {
        address doctor;
        string diagnosis;
        string ipfsHash;        // IPFS link to medicine list JSON
        uint256 timestamp;
    }

    struct Referral {
        address referrer; 
        address targetDoctor;
        string reason;
        bool active;
        uint256 timestamp;
    }

    struct Doctor {
        address hospitalAdmin;  // Links doc to a specific hospital
        string name;
        string licenseId; 
        string specialization;
        bool isActive;
    }

    struct Patient {
        string name;
        string identityHash;    // Web 2.5 Link (Hash of Email/Google ID)
        MedicalProfile profile;
        uint256[] recordIds;
        bool exists;
    }

    // ==========================================
    // 2. STATE VARIABLES
    // ==========================================
    
    address public superAdmin; // The master deployer
    uint256 private nextRecordId;

    mapping(address => bool) public authorizedRelayers; 
    mapping(address => Hospital) public hospitals; 
    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    mapping(address => Role) public roles;
    mapping(uint256 => Record) public allRecords;

    // Clinical History Mappings
    mapping(address => Prescription[]) public patientPrescriptions;
    mapping(address => Referral[]) public patientReferrals;
    
    // ACCESS BRIDGE: Patient -> Doctor -> Access Granted?
    mapping(address => mapping(address => bool)) public hasAccess;

    // --- NEW: Global Emergency Tracker ---
    mapping(address => bool) public isSOSActive;

    // ==========================================
    // 3. EVENTS (Audit Trail)
    // ==========================================
    event HospitalRegistered(address indexed admin, string name);
    event PatientRegistered(address indexed patient, string name, string idHash);
    event DoctorStatusChanged(address indexed doctor, address indexed hospital, bool isActive);
    event RecordAdded(uint256 indexed recordId, address indexed patient, address indexed doctor);
    event ReferralCreated(address indexed patient, address indexed from, address indexed to);
    event SOSAlert(address indexed patient, string severity, uint256 time);
    event SOSResolved(address indexed patient, uint256 time);
    event PrescriptionIssued(address indexed patient, address indexed doctor);

    // ==========================================
    // 4. SECURITY MODIFIERS
    // ==========================================
    
    modifier onlySuperAdmin() { 
        require(msg.sender == superAdmin, "Auth: Super Admin Only"); 
        _; 
    }

    modifier onlyHospitalAdmin() { 
        require(roles[msg.sender] == Role.HOSPITAL_ADMIN && hospitals[msg.sender].isActive, "Auth: Hospital Admin Only"); 
        _; 
    }
    
    modifier onlyAuthorizedRelayer() { 
        require(msg.sender == superAdmin || authorizedRelayers[msg.sender], "Auth: Relayer Only"); 
        _; 
    }

    modifier onlyActiveDoctor() { 
        require(roles[msg.sender] == Role.DOCTOR && doctors[msg.sender].isActive, "Auth: Active Doctor Only"); 
        _; 
    }

    constructor() {
        superAdmin = msg.sender; 
        roles[superAdmin] = Role.SUPER_ADMIN;
        nextRecordId = 1; 
    }

    // ==========================================
    // 5. ADMINISTRATION (The Org Hierarchy)
    // ==========================================

    function setRelayer(address _relayer, bool _status) public onlySuperAdmin {
        authorizedRelayers[_relayer] = _status;
    }

    // <-- UPDATED: Gas-optimized initialization -->
    function registerHospital(address _adminWallet, string memory _name, string memory _regNumber) public onlySuperAdmin {
        require(!hospitals[_adminWallet].isActive, "Hospital exists");
        
        Hospital storage newHospital = hospitals[_adminWallet];
        newHospital.adminWallet = _adminWallet;
        newHospital.name = _name;
        newHospital.registrationNumber = _regNumber;
        newHospital.isActive = true;
        // staffList array is automatically initialized empty

        roles[_adminWallet] = Role.HOSPITAL_ADMIN;
        emit HospitalRegistered(_adminWallet, _name);
    }

    // <-- UPDATED: Pushes doctor to staffList -->
    function addDoctor(address _wallet, string memory _name, string memory _license, string memory _spec) public onlyHospitalAdmin {
        doctors[_wallet] = Doctor(msg.sender, _name, _license, _spec, true);
        roles[_wallet] = Role.DOCTOR;
        
        hospitals[msg.sender].staffList.push(_wallet); // Track the staff
        
        emit DoctorStatusChanged(_wallet, msg.sender, true);
    }

    // <-- NEW: Revoke a rogue or retiring doctor -->
    function deactivateDoctor(address _wallet) public onlyHospitalAdmin {
        require(doctors[_wallet].hospitalAdmin == msg.sender, "Doctor not from your hospital");
        doctors[_wallet].isActive = false;
        roles[_wallet] = Role.NONE; // Demote role
        emit DoctorStatusChanged(_wallet, msg.sender, false);
    }

    // ==========================================
    // 6. ONBOARDING (Web 2.5 Relayer Logic)
    // ==========================================
    
    // <-- UPDATED: Gas-optimized struct initialization -->
    function registerPatient(
        address _pWallet, string memory _name, string memory _idHash, 
        string memory _blood, string memory _allergies, string memory _emergency, string memory _pHash
    ) public onlyAuthorizedRelayer {
        require(!patients[_pWallet].exists, "Registered");

        Patient storage p = patients[_pWallet];
        p.name = _name;
        p.identityHash = _idHash;
        p.profile = MedicalProfile(_blood, _allergies, _emergency, _pHash, block.timestamp);
        p.exists = true;

        roles[_pWallet] = Role.PATIENT;

        emit PatientRegistered(_pWallet, _name, _idHash);
    }

    // ==========================================
    // 7. CLINICAL OPERATIONS (Emergency & Data)
    // ==========================================

    // <-- UPDATED: Emergency Override Logic -->
    function triggerSOS(string memory _severity) public {
        require(patients[msg.sender].exists, "Patient only");
        isSOSActive[msg.sender] = true; // Bypasses access checks
        emit SOSAlert(msg.sender, _severity, block.timestamp);
    }

    // <-- NEW: Resolve Emergency -->
    function resolveSOS() public {
        require(patients[msg.sender].exists, "Patient only");
        isSOSActive[msg.sender] = false; // Restores privacy lock
        emit SOSResolved(msg.sender, block.timestamp);
    }

    // <-- UPDATED: Emergency Access Check -->
    function addMedicalRecord(
        address _pWallet, string memory _hash, string memory _type, string memory _cat, string memory _notes
    ) public onlyActiveDoctor {
        // Doc needs standard access OR an active emergency to upload life-saving reports
        require(hasAccess[_pWallet][msg.sender] || isSOSActive[_pWallet], "Access Denied");

        uint256 rId = nextRecordId;
        allRecords[rId] = Record(rId, _hash, _type, _cat, _notes, msg.sender, block.timestamp);
        
        patients[_pWallet].recordIds.push(rId);
        nextRecordId++;
        
        emit RecordAdded(rId, _pWallet, msg.sender);
    }

    function referPatient(address _pWallet, address _targetDoc, string memory _reason) public onlyActiveDoctor {
        require(hasAccess[_pWallet][msg.sender], "You don't have access to refer");
        require(doctors[_targetDoc].isActive, "Target Doctor not active");

        patientReferrals[_pWallet].push(Referral(msg.sender, _targetDoc, _reason, true, block.timestamp));
        hasAccess[_pWallet][_targetDoc] = true;

        emit ReferralCreated(_pWallet, msg.sender, _targetDoc);
    }

    // <-- UPDATED: Emergency Access Check -->
    function issuePrescription(address _patient, string memory _diagnosis, string memory _ipfsHash) public onlyActiveDoctor {
        require(hasAccess[_patient][msg.sender] || isSOSActive[_patient], "Access Denied");
        
        patientPrescriptions[_patient].push(Prescription(
            msg.sender, 
            _diagnosis, 
            _ipfsHash, 
            block.timestamp
        ));
        
        emit PrescriptionIssued(_patient, msg.sender);
    }

    // PERMISSIONS
    function grantAccess(address _doctor) public {
        require(patients[msg.sender].exists, "Patient only");
        hasAccess[msg.sender][_doctor] = true;
    }

    function revokeAccess(address _doctor) public {
        hasAccess[msg.sender][_doctor] = false;
    }

    // ==========================================
    // 8. DATA RETRIEVAL (Getters)
    // ==========================================
    
    // <-- UPDATED: Added Access Lock -->
    function getProfile(address _pWallet) public view returns (MedicalProfile memory) {
        // Patient, Authorized Doctor, or ANY Doctor during an SOS can view
        require(
            msg.sender == _pWallet || 
            hasAccess[_pWallet][msg.sender] || 
            isSOSActive[_pWallet], 
            "Access Denied"
        );
        return patients[_pWallet].profile;
    }

    function getPatientRecords(address _pWallet) public view returns (uint256[] memory) {
        return patients[_pWallet].recordIds;
    }

    function getRecord(uint256 _id) public view returns (Record memory) {
        return allRecords[_id];
    }

    function getPrescriptions(address _patient) public view returns (Prescription[] memory) {
        return patientPrescriptions[_patient];
    }

    function getReferrals(address _patient) public view returns (Referral[] memory) {
        return patientReferrals[_patient];
    }
    
    // <-- NEW: Helper to get all doctors in a hospital -->
    function getHospitalStaff(address _hospitalAdmin) public view returns (address[] memory) {
        return hospitals[_hospitalAdmin].staffList;
    }
}