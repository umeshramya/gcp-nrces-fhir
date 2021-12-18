"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentReference = exports.documentDocStatusArrey = exports.documentStatusArrey = void 0;
exports.documentStatusArrey = ["current", "superseded", "entered-in-error"
];
exports.documentDocStatusArrey = ["preliminary", "final", "amended", "entered-in-error"
];
class DocumentReference {
    getFHIR(options) {
        const body = {
            resourceType: "DocumentReference",
            id: options.id || undefined,
            meta: {
                profile: [
                    "httcps://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentReference",
                ],
            },
            text: {
                status: "generated",
                div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Narrative with Details</b></p><p><b>id</b>: 1</p><p><b>status</b>: current</p><p><b>docStatus</b>: final</p><p><b>subject</b>: ABC</p><p><b>type</b>: Laboratory Report</p><p><b>content</b>: Dr. PQR</p></div>',
            },
            status: options.status,
            docStatus: options.docStatus,
            type: {
                coding: [
                    {
                        system: "http://snomed.info/sct",
                        code: "4241000179101",
                        display: "Laboratory report",
                    },
                ],
                text: "Laboratory report",
            },
            subject: { reference: "Patient/1" },
            content: [
                {
                    attachment: {
                        contentType: "application/pdf",
                        language: "en-IN",
                        data: "",
                        title: "Laboratory report",
                        creation: "2019-05-29T14:58:58.181+05:30",
                    },
                },
            ],
        };
        return body;
    }
    convertFhirToObject(options) {
        throw new Error("Method not implemented.");
    }
}
exports.DocumentReference = DocumentReference;
//# sourceMappingURL=DocumentReference.js.map