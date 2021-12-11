"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
class Condition {
    getFHIR(options) {
        const body = {
            "resourceType": "Condition",
            "id": options.id || undefined,
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
                "coding": options.condtion,
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
            "id": options.id,
            "patientId": `${options.subject.reference}`.substring(7),
            "condtion": options.code.coding,
            "text": options.code.text,
        };
        return ret;
    }
}
exports.Condition = Condition;
//# sourceMappingURL=Condition.js.map