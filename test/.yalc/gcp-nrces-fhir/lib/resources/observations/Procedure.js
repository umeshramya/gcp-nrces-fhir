"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Procedure = exports.procedureStatusArray = void 0;
exports.procedureStatusArray = ["preparation", "in-progress", "not-done", "on-hold", "stopped", "completed", "entered-in-error", "unknown"];
class Procedure {
    getFHIR(options) {
        const body = {
            resourceType: "Procedure",
            id: options.id || undefined,
            meta: {
                profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Procedure"],
            },
            text: {
                status: "generated",
                div: options.text,
            },
            status: options.status,
            code: {
                coding: options.procedure,
                text: options.text,
            },
            subject: { reference: `Patient/${options.patientID}` },
            performedDateTime: options.procedureDate,
            complication: [
                {
                    coding: options.complication,
                },
            ],
        };
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            status: options.status,
            text: options.text.div,
            procedure: options.code.coding,
            patientID: `${options.subject.reference}`.substring(7),
            procedureDate: options.performedDateTime,
            id: options.id,
            complication: options.complication[0].coding
        };
        return ret;
    }
}
exports.Procedure = Procedure;
//# sourceMappingURL=Procedure.js.map