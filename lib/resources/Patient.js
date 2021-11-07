"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientResource = void 0;
const PatientResource = (options) => {
    const body = {
        "resourceType": "Patient",
        "id": `${options.id}`,
        "meta": {
            "versionId": "1",
            "lastUpdated": "2020-07-09T14:58:58.181+05:30",
            "profile": [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
            ]
        },
        "text": {
            "status": "generated",
            "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient name - ${options.name},Gender- ${options.gender}</div>`
        },
        "identifier": [
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "MR",
                            "display": `${options.MRN}`,
                        }
                    ]
                },
                "system": "https://healthid.ndhm.gov.in",
                "value": `${options.healthNumber}`
            }
        ],
        "name": [
            {
                "text": `${options.name}`
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": `${options.mobile}`,
                "use": "home"
            }
        ],
        "gender": `${options.gender}`,
        "birthDate": `${options.dob}`
    };
    return body;
};
exports.PatientResource = PatientResource;
//# sourceMappingURL=Patient.js.map