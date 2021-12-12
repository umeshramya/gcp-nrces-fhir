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
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            clinicalStatus: options.clinicalStatus.coding[0].code,
            verificationStatus: options.verificationStatus.coding[0].code,
            allergyIntolerance: options.code.coding,
            text: options.code.text,
            patientId: `${options.patient.reference}`.substring(8),
            date: options.recordedDate,
            practitionerId: `${options.recorder.reference}`.substring(13),
            note: options.note,
            id: options.id
        };
        return ret;
    }
}
exports.AllergyIntolerance = AllergyIntolerance;
//# sourceMappingURL=AllergyIntolerance.js.map