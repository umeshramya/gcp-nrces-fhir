import { CONDITION, Condition, GcpFhirCRUD, PATIENT, Patient, PRACTITIONER, Practitioner } from "..";
import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export const AppointmentStatusArray = [
  "proposed",
  "pending",
  "booked",
  "arrived",
  "fulfilled",
  "cancelled",
  "noshow",
  "entered-in-error",
  "checked-in",
  "waitlist",
] as const;

type AppointmentStatus = typeof AppointmentStatusArray[number];

export const AppointmentActorStatusArray = [
  "accepted",
  "declined",
  "tentative",
  "needs-action",
] as const;
type AppointmentActorStatus = typeof AppointmentActorStatusArray[number];

export interface APPOINTMENT {
  id?: string;
  status: AppointmentStatus;
  patient: PATIENT;
  practitioner: PRACTITIONER;
  serviceCategory: CodeDisplay[];
  serviceType: CodeDisplay[];
  appointmentType: CodeDisplay[];
  reasonReferenceCondition: CONDITION;
  createdDate: string;
  startDate: string;
  endDate: string;
  description: string;
  patientStatus: AppointmentActorStatus;
  practitionerStatus: AppointmentActorStatus;
}

export class Appointment extends ResourceMain implements ResourceMaster {
  getFHIR(options: APPOINTMENT): any {
    const getText = (): any => {
      const patient = options.patient
      const practitioner = options.practitioner
      const condtion = options.reasonReferenceCondition

      let ret = `Appointment status ${options.status}`;
      ret = `${ret} <div> ${patient.name} (${options.patientStatus}) </div>`;
      ret = `${ret} <div> ${practitioner.name} (${options.practitionerStatus}) </div>`;
      ret = `${ret} <div>From ${new Date(
        options.startDate
      ).toDateString()} to ${new Date(options.endDate).toDateString()} </div>`;
      if (options.serviceCategory) {
        ret = `${ret} <div>Service Category ${options.serviceCategory[0].display}</div>`;
      }

      if (options.serviceType) {
        ret = `${ret} <div>Service Type ${options.serviceType[0].display}</div>`;
      }

      ret = `${ret} <div>${options.description}</div>`;
      return ret;
    };
    let body = {
      resourceType: "Appointment",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${getText()}</div>`,
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
      reasonReference: options.reasonReferenceCondition ? [
        {
          reference: `Condition/${options.reasonReferenceCondition}`,
        },
      ] : undefined,
      description: options.description,
      start: options.startDate,
      end: options.endDate,
      created: options.createdDate,
      participant: [
        {
          actor: {
            reference: `Patient/${options.patient.id}`,
          },
          status: options.patientStatus,
        },
        {
          actor: {
            reference: `Practitioner/${options.practitioner.id}`,
          },
          status: options.practitionerStatus,
        },
      ],
    };



    return body;
  }
  convertFhirToObject(options: any): APPOINTMENT {
    let ret: APPOINTMENT = {
      status: options.status,
      patient: {
        id: this.getIdFromReference({
          ref: options.participant[0].actor.reference,
          resourceType: "Patient",
        })
      } as any,
      practitioner: {
        id: this.getIdFromReference({
          ref: options.participant[1].actor.reference,
          resourceType: "Practitioner",
        })
      } as any,
      serviceCategory: options.serviceCategory,
      serviceType: options.serviceType,
      appointmentType: options.appointmentType,
      reasonReferenceCondition: {
        id: this.getIdFromReference({
          ref: options.reasonReference[0].reference,
          resourceType: "Condition",
        })
      } as any,
      createdDate: options.created,
      startDate: options.start,
      endDate: options.end,
      description: options.description,
      patientStatus: options.participant[0].status,
      practitionerStatus: options.participant[0].status,
      id: options.id,
    };


    return ret;
  }

  statusArray = (): AppointmentStatus[] => {
    return AppointmentStatusArray.map((el) => el);
  };

  actorStatusArray = (): AppointmentActorStatus[] => {
    return AppointmentActorStatusArray.map((el) => el);
  };
}
