// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BioChainHospital (Final Phase 1 - Deployment Ready)
 * @dev Fully corrected: Includes Notes, Prescriptions, Referrals, and Web 2.5 Auth.
 */
contract BioChainHospital {
    
    // ==========================================
    // 1. DATA MODELS
    // ==========================================

    enum Role { NONE, PATIENT, DOCTOR, ADMIN }

    struct MedicalProfile {
        string bloodType;
        string allergies;
        string emergencyContact;
        string profileHash;     // IPFS JSON for extended Bio
        uint256 lastUpdated;
    }

    struct Record {
        uint256 id;
        string ipfsHash;        // File Link (X-Ray, MRI)
        string recordType;      // e.g., "Scan", "Lab Result"
        string category;        // AI Tag: "Critical", "Routine"
        string notes;           // <-- FIXED: Added Notes field
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
    
    address public dean;
    string public hospitalName;
    uint256 private nextRecordId;

    mapping(address => bool) public authorizedRelayers; 
    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    mapping(address => Role) public roles;
    mapping(uint256 => Record) public allRecords;

    // Clinical History Mappings
    mapping(address => Prescription[]) public patientPrescriptions;
    mapping(address => Referral[]) public patientReferrals;
    
    // ACCESS BRIDGE: Patient -> Doctor -> Access Granted?
    mapping(address => mapping(address => bool)) public hasAccess;

    // ==========================================
    // 3. EVENTS (Audit Trail)
    // ==========================================
    event PatientRegistered(address indexed patient, string name, string idHash);
    event DoctorStatusChanged(address indexed doctor, bool isActive);
    event RecordAdded(uint256 indexed recordId, address indexed patient, address indexed doctor);
    event ReferralCreated(address indexed patient, address indexed from, address indexed to);
    event SOSAlert(address indexed patient, string severity, uint256 time);
    event PrescriptionIssued(address indexed patient, address indexed doctor);

    // ==========================================
    // 4. SECURITY MODIFIERS
    // ==========================================
    modifier onlyDean() { require(msg.sender == dean, "Auth: Dean Only"); _; }
    
    // Relayer is the "Web 2.5 Bridge" for Email/Google Sign-in
    modifier onlyAuthorized() { 
        require(msg.sender == dean || authorizedRelayers[msg.sender], "Auth: Relayer/Dean Only"); 
        _; 
    }

    modifier onlyActiveDoctor() { 
        require(roles[msg.sender] == Role.DOCTOR && doctors[msg.sender].isActive, "Auth: Active Doctor Only"); 
        _; 
    }

    constructor(string memory _hospitalName) {
        dean = msg.sender; 
        hospitalName = _hospitalName;
        roles[dean] = Role.ADMIN;
        nextRecordId = 1; 
    }

    // ==========================================
    // 5. ADMINISTRATION (The Org Hierarchy)
    // ==========================================

    function setRelayer(address _relayer, bool _status) public onlyDean {
        authorizedRelayers[_relayer] = _status;
    }

    function addDoctor(address _wallet, string memory _name, string memory _license, string memory _spec) public onlyDean {
        doctors[_wallet] = Doctor(_name, _license, _spec, true);
        roles[_wallet] = Role.DOCTOR;
        emit DoctorStatusChanged(_wallet, true);
    }

    // ==========================================
    // 6. ONBOARDING (Web 2.5 Relayer Logic)
    // ==========================================
    
    function registerPatient(
        address _pWallet, string memory _name, string memory _idHash, 
        string memory _blood, string memory _allergies, string memory _emergency, string memory _pHash
    ) public onlyAuthorized {
        require(!patients[_pWallet].exists, "Registered");

        MedicalProfile memory profile = MedicalProfile(_blood, _allergies, _emergency, _pHash, block.timestamp);
        uint256[] memory emptyIds;

        patients[_pWallet] = Patient(_name, _idHash, profile, emptyIds, true);
        roles[_pWallet] = Role.PATIENT;

        emit PatientRegistered(_pWallet, _name, _idHash);
    }

    // ==========================================
    // 7. CLINICAL OPERATIONS
    // ==========================================

    // EMERGENCY: Triggers alert for the AI Engine
    function triggerSOS(string memory _severity) public {
        require(patients[msg.sender].exists, "Patient only");
        emit SOSAlert(msg.sender, _severity, block.timestamp);
    }

    // RECORDS: Doctors add medical data
    function addMedicalRecord(
        address _pWallet, string memory _hash, string memory _type, string memory _cat, string memory _notes
    ) public onlyActiveDoctor {
        // Ensure doctor has permission (either hired or referred)
        require(hasAccess[_pWallet][msg.sender] || msg.sender == dean, "Access Denied");

        uint256 rId = nextRecordId;
        
        // <-- FIXED: Added _notes to the Record creation
        allRecords[rId] = Record(rId, _hash, _type, _cat, _notes, msg.sender, block.timestamp);
        
        patients[_pWallet].recordIds.push(rId);
        nextRecordId++;
        
        emit RecordAdded(rId, _pWallet, msg.sender);
    }

    // REFERRAL FIX: Automatically grants access to the target doctor
    function referPatient(address _pWallet, address _targetDoc, string memory _reason) public onlyActiveDoctor {
        require(hasAccess[_pWallet][msg.sender], "You don't have access to refer");
        require(doctors[_targetDoc].isActive, "Target Doctor not active");

        patientReferrals[_pWallet].push(Referral(msg.sender, _targetDoc, _reason, true, block.timestamp));
        
        // THE FIX: Automatically grant permission to the referred doctor
        hasAccess[_pWallet][_targetDoc] = true;

        emit ReferralCreated(_pWallet, msg.sender, _targetDoc);
    }

    // PRESCRIPTIONS
    function issuePrescription(address _patient, string memory _diagnosis, string memory _ipfsHash) public onlyActiveDoctor {
        require(hasAccess[_patient][msg.sender], "Access Denied");
        
        patientPrescriptions[_patient].push(Prescription(
            msg.sender, 
            _diagnosis, 
            _ipfsHash, 
            block.timestamp
        ));
        
        emit PrescriptionIssued(_patient, msg.sender);
    }

    // PERMISSIONS: Patient hires/grants access to a doctor manually
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
    
    function getPatientRecords(address _pWallet) public view returns (uint256[] memory) {
        return patients[_pWallet].recordIds;
    }

    function getRecord(uint256 _id) public view returns (Record memory) {
        return allRecords[_id];
    }

    function getProfile(address _pWallet) public view returns (MedicalProfile memory) {
        return patients[_pWallet].profile;
    }

    function getPrescriptions(address _patient) public view returns (Prescription[] memory) {
        return patientPrescriptions[_patient];
    }

    function getReferrals(address _patient) public view returns (Referral[] memory) {
        return patientReferrals[_patient];
    }
}