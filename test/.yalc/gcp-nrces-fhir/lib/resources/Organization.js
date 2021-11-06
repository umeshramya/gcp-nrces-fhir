"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationResource = void 0;
const OrganizationResource = (options) => {
    const body = {
        "resourceType": "Organization",
        "id": `${options.id}`,
        "meta": {
            "profile": [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
            ]
        },
        "text": {
            "status": "generated",
            "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}. ph: ${options.phone}, email:<a href=\"mailto:${options.email}\">${options.email}</a></div>`
        },
        "identifier": [
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "PRN",
                            "display": `${options.providerNumber}`
                        }
                    ]
                },
                "system": "https://facility.ndhm.gov.in",
                "value": `${options.ndhmFacilityNumber}`
            }
        ],
        "name": `${options.name}`,
        "telecom": [
            {
                "system": "phone",
                "value": `${options.phone}`,
                "use": "work"
            },
            {
                "system": "email",
                "value": `${options.email}`,
                "use": "work"
            }
        ]
    };
    return body;
};
exports.OrganizationResource = OrganizationResource;
//# sourceMappingURL=Organization.js.map