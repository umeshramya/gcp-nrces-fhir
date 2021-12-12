"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllergyIntolerance = exports.verificationStatusArray = exports.clinicalStatusArray = void 0;
exports.clinicalStatusArray = ["active", "inactive", "resolved"];
exports.verificationStatusArray = [
    "unconfirmed",
    "confirmed",
    "refuted",
    "entered-in-error",
];
class AllergyIntolerance {
    getFHIR(options) {
        const body = {
            resourceType: "AllergyIntolerance",
            id: options.id || undefined,
            meta: {
                profile: [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/AllergyIntolerance",
                ],
            },
            text: {
                status: "generated",
                div: options.text,
            },
            clinicalStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                        code: options.clinicalStatus,
                        display: options.clinicalStatus,
                    },
                ],
            },
            verificationStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                        code: options.verificationStatus,
                        display: options.verificationStatus,
                    },
                ],
            },
            code: {
                coding: options.allergyIntolerance,
                text: options.text,
            },
            patient: { reference: `Patient/${options.patientId}` },
            recordedDate: options.date,
            recorder: { reference: `Practitioner/${options.practitionerId}` },
            note: options.note,
        };
    }
    convertFhirToObject(options) {
        throw new Error("Method not implemented.");
    }
}
exports.AllergyIntolerance = AllergyIntolerance;
//# sourceMappingURL=AllergyIntolerance.js.map