"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = exports.compositionStatusArrey = exports.compositionTypeArrey = void 0;
const uuid_1 = require("uuid");
exports.compositionTypeArrey = [
    {
        type: "OPConsultRecord",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
        code: "371530004",
        text: "Clinical consultation report"
    },
    {
        type: "DischargeSummaryRecord",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord",
        code: "373942005",
        text: "Discharge summary"
    },
];
exports.compositionStatusArrey = ["preliminary", "final", "amended", "entered-in-error"];
class Composition {
    getFHIR(options) {
        const body = {
            "resourceType": "Composition",
            "id": options.id || undefined,
            "meta": {
                "versionId": "1",
                "lastUpdated": new Date().toISOString(),
                "profile": [
                    options.type.url
                ]
            },
            "language": "en-IN",
            "text": {
                "status": "generated",
                "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ${options.patient.name}.  ${options.patient.healthNumber}; ph: ${options.patient.mobile}; gender: ${options.patient.gender}; birthDate: ${options.patient.dob}</p></div>`
            },
            "identifier": {
                "system": "https://ndhm.in/phr",
                "value": options.identifier || uuid_1.v4()
            },
            "status": options.status,
            "type": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": options.type.code,
                        "display": options.type.text
                    }
                ],
                "text": options.type.text
            },
            "subject": {
                "reference": `Patient/${options.patient.id}`,
                "display": options.patient.name
            },
            "encounter": {
                "reference": `Encounter/${options.encounter.id}`
            },
            "date": options.date,
            "author": [
                {
                    "reference": `Practitioner/${options.practitioner.id}`,
                    "display": options.practitioner.name
                }
            ],
            "title": options.type.type,
            "custodian": {
                "reference": `Organization/${options.organization.id}`,
                "display": options.organization.name
            },
            "section": options.section
        };
        return body;
    }
    convertFhirToObject(options) {
        throw new Error("Method not implemented.");
    }
}
exports.Composition = Composition;
//# sourceMappingURL=Composition.js.map