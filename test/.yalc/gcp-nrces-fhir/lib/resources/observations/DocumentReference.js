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
                div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Narrative with Details</b></p><p><b>id</b>: 1</p><p><b>status</b>: ${options.status}</p><p><b>docStatus</b>: ${options.docStatus}</p><p><b>subject</b>: ${options.patient.MRN} ${options.patient.name}</p><p><b>type</b>: ${options.title}</p><p><b>content</b>: Dr. PQR</p></div>`,
            },
            status: options.status,
            docStatus: options.docStatus,
            type: {
                coding: options.code,
                text: options.title,
            },
            subject: { reference: `Patient/${options.patientId}` },
            content: [
                {
                    attachment: {
                        contentType: "application/pdf",
                        language: "en-IN",
                        data: options.pdf,
                        title: options.title,
                        creation: new Date().toISOString(),
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