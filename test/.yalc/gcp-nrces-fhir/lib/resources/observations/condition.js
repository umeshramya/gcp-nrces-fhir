"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
class Condition {
    getFHIR(options) {
        const body = {
            "resourceType": "Condition",
            "id": "example-01",
            "meta": {
                "profile": [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
                ]
            },
            "text": {
                "status": "generated",
                "div": options.text
            },
            "code": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": options.snoemedCode,
                        "display": options.snowmedDisplay
                    }
                ],
                "text": options.text
            },
            "subject": {
                "reference": `Patient/${options.patientId}`
            }
        };
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            "patientId": `${options.subject.reference}`.substr(7),
            "snoemedCode": options.code.coding[0].code,
            "text": options.text,
            "snowmedDisplay": options.code.coding[0].display
        };
        return ret;
    }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map