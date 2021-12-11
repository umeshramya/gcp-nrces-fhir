"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class OPConsultationNote {
    constructor(date) {
        this.resource = {
            "resourceType": "Bundle",
            "id": "OPConsultNote-example-05",
            "meta": {
                "versionId": "1",
                "lastUpdated": "2020-07-09T15:32:26.605+05:30",
                "profile": [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"
                ],
                "security": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                        "code": "V",
                        "display": "very restricted"
                    }
                ]
            },
            "identifier": {
                "system": "http://hip.in",
                "value": uuid_1.v4()
            },
            "type": "document",
            "timestamp": date,
            "entry": [],
            "signature": {
                "type": [
                    {
                        "system": "urn:iso-astm:E1762-95:2013",
                        "code": "1.2.840.10065.1.12.1.1",
                        "display": "Author's Signature"
                    }
                ],
                "when": "2020-07-09T07:42:33+10:00",
                "who": {
                    "reference": "Practitioner/1"
                },
                "sigFormat": "image/jpeg",
                "data": ""
            }
        };
    }
    setComposition() {
        this.composition = {
            "fullUrl": "Composition/1",
            "resource": {
                "resourceType": "Composition",
                "id": "1",
                "meta": {
                    "versionId": "1",
                    "lastUpdated": "2020-07-09T15:32:26.605+05:30",
                    "profile": [
                        "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord"
                    ]
                },
                "language": "en-IN",
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ABC. Generated Summary: id: 1; Medical Record Number = 1234 (System : {https://healthid.ndhm.gov.in}); active; ABC ; ph: +919818512600(HOME); gender: male; birthDate: 1981-01-12</p></div>"
                },
                "identifier": {
                    "system": "https://ndhm.in/phr",
                    "value": uuid_1.v4()
                },
                "status": "final",
                "type": {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "371530004",
                            "display": "Clinical consultation report"
                        }
                    ],
                    "text": "Clinical Consultation report"
                },
                "subject": {
                    "reference": "Patient/1",
                    "display": "ABC"
                },
                "encounter": {
                    "reference": "Encounter/1"
                },
                "date": "2020-07-09T15:32:26.605+05:30",
                "author": [
                    {
                        "reference": "Practitioner/1",
                        "display": "Dr. DEF"
                    }
                ],
                "title": "Consultation Report",
                "custodian": {
                    "reference": "Organization/1",
                    "display": "UVW Hospital"
                },
                "section": [
                    {
                        "title": "Chief complaints",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "422843007",
                                    "display": "Chief complaint section"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "Condition/1"
                            }
                        ]
                    },
                    {
                        "title": "Allergies",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "722446000",
                                    "display": "Allergy record"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "AllergyIntolerance/1"
                            }
                        ]
                    },
                    {
                        "title": "Medical History",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "371529009",
                                    "display": "History and physical report"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "Condition/2"
                            }
                        ]
                    },
                    {
                        "title": "Investigation Advice",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "721963009",
                                    "display": "Order document"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "ServiceRequest/1"
                            }
                        ]
                    },
                    {
                        "title": "Medications",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "721912009",
                                    "display": "Medication summary document"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "MedicationStatement/1"
                            },
                            {
                                "reference": "MedicationRequest/1"
                            }
                        ]
                    },
                    {
                        "title": "Procedure",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "371525003",
                                    "display": "Clinical procedure report"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "Procedure/1"
                            }
                        ]
                    },
                    {
                        "title": "Follow Up",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "736271009",
                                    "display": "Outpatient care plan"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "Appointment/1"
                            }
                        ]
                    },
                    {
                        "title": "Document Reference",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://snomed.info/sct",
                                    "code": "371530004",
                                    "display": "Clinical consultation report"
                                }
                            ]
                        },
                        "entry": [
                            {
                                "reference": "DocumentReference/1"
                            }
                        ]
                    }
                ]
            }
        };
    }
    setPractitioner(gcpFhirId, resource) {
        this.practitioner = {
            "fullUrl": `Practitioner/${gcpFhirId}`,
            "resource": resource
        };
    }
    setOrganization(gcpFhirId, resource) {
        this.organization = {
            "fullUrl": `organization/${gcpFhirId}`,
            "resource": resource
        };
    }
    setPatient(gcpFhirId, resource) {
        this.patient = {
            "fullUrl": `Patient/${gcpFhirId}`,
            "resource": resource
        };
    }
    setEncounter(gcpFhirId, resource) {
        this.encounter = {
            "fullUrl": `Encounter/${gcpFhirId}`,
            "resource": resource
        };
    }
    setAllergyIntolerance(gcpFhirId, resource) {
        this.allergyIntolerance = {
            "fullUrl": `AllergyIntolerance/${gcpFhirId}`,
            "resource": resource
        };
    }
    setAppointment(gcpFhirId, resource) {
        this.appointment = {
            "fullUrl": `Appointment/${gcpFhirId}`,
            "resource": resource
        };
    }
    /**
    * mapped to Condition1
    * @param gcpFhirId
    * @param resource
    */
    setChiefComplaints(gcpFhirId, resource) {
        // ,mapped to Condtion1
        this.chiefComplaints = {
            "fullUrl": `Condition/${gcpFhirId}`,
            "resource": resource
        };
    }
    /**
    * mapped to Condition2
    * @param gcpFhirId
    * @param resource
    */
    setMedicalHistory(gcpFhirId, resource) {
        // ,mapped to Condtion2
        this.medicalHistory = {
            "fullUrl": `Condition/${gcpFhirId}`,
            "resource": resource
        };
    }
    // Procedure
    setProcedure(gcpFhirId, resource) {
        this.procedure = {
            "fullUrl": `Procedure/${gcpFhirId}`,
            "resource": resource
        };
    }
    // 
    setServiceRequest(gcpFhirId, resource) {
        this.serviceRequest = {
            "fullUrl": `ServiceRequest/${gcpFhirId}`,
            "resource": resource
        };
    }
    setMedicationStatement(gcpFhirId, resource) {
        this.medicationStatement = {
            "fullUrl": `MedicationStatement/${gcpFhirId}`,
            "resource": resource
        };
    }
    setMedicationRequest(gcpFhirId, resource) {
        this.medicationRequest = {
            "fullUrl": `MedicationRequest/${gcpFhirId}`,
            "resource": resource
        };
    }
    setdocumentReference(gcpFhirId, resource) {
        this.documentReference = {
            "fullUrl": `DocumentReference/${gcpFhirId}`,
            "resource": resource
        };
    }
}
exports.default = OPConsultationNote;
const full = [
    {
        "fullUrl": "Condition/3",
        "resource": {
            "resourceType": "Condition",
            "id": "3",
            "meta": {
                "profile": [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
                ]
            },
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Past Medical Problem of Diabetes mellitus type 2</div>"
            },
            "clinicalStatus": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        "code": "recurrence",
                        "display": "Recurrence"
                    }
                ]
            },
            "code": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "44054006",
                        "display": "Diabetes mellitus type 2"
                    }
                ],
                "text": "Diabetes mellitus type 2"
            },
            "subject": {
                "reference": "Patient/1"
            }
        }
    },
];
//# sourceMappingURL=Bundle-OPConsultNote.js.map