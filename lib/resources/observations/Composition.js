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
    {
        type: "ImmunizationRecord",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ImmunizationRecord",
        code: "41000179103",
        text: "Immunization record",
    },
];
const onlyType = exports.compositionTypeArrey.map(el => el.type);
exports.compositionStatusArrey = ["preliminary", "final", "amended", "entered-in-error"];
class Composition {
    mapCompositionType(type) {
        this.compType = exports.compositionTypeArrey.filter(comp => comp.type == type)[0];
    }
    getFHIR(options) {
        this.mapCompositionType(options.type);
        const body = {
            "resourceType": "Composition",
            "id": options.id || undefined,
            "meta": {
                "versionId": "1",
                "lastUpdated": new Date().toISOString(),
                "profile": [
                    this.compType.url
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
                        "code": this.compType.code,
                        "display": this.compType.text
                    }
                ],
                "text": this.compType.text
            },
            "subject": {
                "reference": `Patient/${options.patientId}`,
                "display": options.patient.name
            },
            "encounter": {
                "reference": `Encounter/${options.encounterId}`
            },
            "date": options.date,
            "author": options.author,
            "title": options.type,
            "custodian": {
                "reference": `Organization/${options.organizationId}`,
                "display": options.organization.name
            },
            "section": [
                {
                    "title": this.compType.type,
                    "code": {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": this.compType.code,
                                "display": options.type
                            }
                        ]
                    },
                    "entry": [options.section]
                }
            ]
        };
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            patient: undefined,
            patientId: `${options.subject.reference}`.substring(8),
            encounter: undefined,
            encounterId: `${options.encounter.reference}`.substring(10),
            date: options.date,
            organization: undefined,
            organizationId: `${options.custodian.reference}`.substring(13),
            status: options.status,
            type: options.title,
            section: options.section,
            id: options.id,
            identifier: options.identifier.value,
            author: options.author
        };
        return ret;
    }
}
exports.Composition = Composition;
//# sourceMappingURL=Composition.js.map