"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentBundle = void 0;
const uuid_1 = require("uuid");
class DocumentBundle {
    getFHIR(options) {
        const body = {
            resourceType: "Bundle",
            id: options.id || undefined,
            meta: {
                versionId: "1",
                lastUpdated: new Date().toISOString(),
                profile: [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle",
                ],
                security: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                        code: "V",
                        display: "very restricted",
                    },
                ],
            },
            identifier: {
                system: "http://hip.in",
                value: options.identifier || (0, uuid_1.v4)(),
            },
            type: "document",
            timestamp: options.date,
            entry: options.entry,
            signature: {
                type: [
                    {
                        system: "urn:iso-astm:E1762-95:2013",
                        code: "1.2.840.10065.1.12.1.1",
                        display: "Author's Signature",
                    },
                ],
                when: options.date,
                who: {
                    reference: `Practitioner/${options.practitionerId}`,
                },
                sigFormat: "image/jpeg",
                data: options.signJpegbase64,
            },
        };
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            date: options.timestamp,
            practitionerId: `${options.signature.who.reference}`.substring(13),
            entry: options.entry,
            id: options.id,
            identifier: options.identifier.value,
            signJpegbase64: options.signature.data
        };
        return ret;
    }
}
exports.DocumentBundle = DocumentBundle;
//# sourceMappingURL=DocumentBundle.js.map