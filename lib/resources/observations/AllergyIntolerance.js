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
        // {
        //   clinicalStatus: { coding: [Array] },
        //   code: { coding: [Array], text: 'Allergic to Asprin' },
        //   id: 'e7f1d6ad-34e7-41d5-b1f5-ba45024be438',
        //   meta: {
        //     lastUpdated: '2021-12-12T06:53:19.884496+00:00',
        //     profile: [Array],
        //     versionId: 'MTYzOTI5MTk5OTg4NDQ5NjAwMA'
        //   },
        //   note: [ [Object] ],
        //   patient: { reference: 'Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5' },
        //   recordedDate: '2021-12-12T06:53:31.095Z',
        //   recorder: { reference: 'Practitioner/877f1236-63fd-4827-a3da-636a4f2c5739' },
        //   resourceType: 'AllergyIntolerance',
        //   text: { div: 'Allergic to Asprin', status: 'generated' },
        //   verificationStatus: { coding: [Array] }
        // }
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