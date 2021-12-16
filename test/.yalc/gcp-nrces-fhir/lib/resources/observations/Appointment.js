"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentActorStatusArray = exports.AppointmentStatusArray = void 0;
exports.AppointmentStatusArray = ["proposed", "pending", "booked", "arrived", "fulfilled", "cancelled", "noshow", "entered-in-error", "checked-in", "waitlist"];
exports.AppointmentActorStatusArray = ["accepted", "declined", "tentative", "needs-action"];
class Appointment {
    getFHIR(options) {
        const body = {
            resourceType: "Appointment",
            id: options.id || undefined,
            meta: {
                profile: [
                    "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment",
                ],
            },
            text: {
                status: "generated",
                div: `<div xmlns="http://www.w3.org/1999/xhtml">${options.text}</div>`,
            },
            status: options.status,
            serviceCategory: [
                {
                    coding: options.serviceCategory,
                },
            ],
            serviceType: [
                {
                    coding: options.serviceType,
                },
            ],
            appointmentType: {
                coding: options.appointmentType,
            },
            reasonReference: [
                {
                    reference: `Condition/${options.reasonReferenceConditionId}`,
                },
            ],
            description: options.description,
            start: options.startDate,
            end: options.endDate,
            created: options.createdDate,
            participant: [
                {
                    actor: {
                        reference: `Patient/${options.patientId}`,
                    },
                    status: options.patientStatus,
                },
                {
                    actor: {
                        reference: `Practitioner/${options.practitionerId}`,
                    },
                    status: options.practitionerStatus,
                },
            ],
        };
        return body;
    }
    convertFhirToObject(options) {
        let ret = {
            status: options.status,
            patientId: `${options.participant[0].actor.reference}`.substring(8),
            practitionerId: `${options.participant[1].actor.reference}`.substring(13),
            text: options.text,
            serviceCategory: options.serviceCategory,
            serviceType: options.serviceType,
            appointmentType: options.appointmentType,
            reasonReferenceConditionId: `${options.reasonReference.reference}`.substring(8),
            createdDate: options.created,
            startDate: options.start,
            endDate: options.end,
            description: options.description,
            patientStatus: options.participant[0].status,
            practitionerStatus: options.participant[0].status,
            id: options.id
        };
        return ret;
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=Appointment.js.map