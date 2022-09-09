import {
  CONDITION,
  Condition,
  GcpFhirCRUD,
  PATIENT,
  Patient,
  PRACTITIONER,
  Practitioner,
} from "..";
import { CODEABLE_CONCEPT, CodeDisplay } from "../config";
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
  serviceCategory?: CODEABLE_CONCEPT[];
  serviceType?: CODEABLE_CONCEPT[];
  specialty?: CODEABLE_CONCEPT[];
  appointmentType?: CODEABLE_CONCEPT;
  reasonCode?: CODEABLE_CONCEPT[];
  createdDate: string;
  startDate: string;
  endDate: string;
  description: string;
  patientStatus: AppointmentActorStatus;
  practitionerStatus: AppointmentActorStatus;
  priority: number;
  slotId?: string;
}

export class Appointment extends ResourceMain implements ResourceMaster {
  getFHIR(options: APPOINTMENT): any {
    const getText = (): any => {
      const patient = options.patient;
      const practitioner = options.practitioner;

      let ret = `Appointment status ${options.status}`;
      ret = `${ret} <div> ${patient.name} (${options.patientStatus}) </div>`;
      ret = `${ret} <div> ${practitioner.name} (${options.practitionerStatus}) </div>`;
      ret = `${ret} <div>From ${new Date(
        options.startDate
      ).toDateString()} to ${new Date(options.endDate).toDateString()} </div>`;
      if (options.serviceCategory) {
        ret = `${ret} <div>Service Category ${options.serviceCategory[0].text}</div>`;
      }

      if (options.serviceType) {
        ret = `${ret} <div>Service Type ${options.serviceType[0].text}</div>`;
      }
      if(options.reasonCode){
        ret = `${ret} <div>Reason ${options.reasonCode[0].text}</div>`;
      }
      ret = `${ret} <div>${options.description}</div>`;
      return ret;
    };
    let body: any = {
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
      serviceCategory: options.serviceCategory,
      serviceType: options.serviceCategory,
      specialty: options.serviceType,
      appointmentType: options.appointmentType,
      reasonCode: options.reasonCode,
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
      priority: options.priority,
    };
    if (options.slotId) {
      body.slot = {
        reference: `Slot/${options.slotId}`,
      };
    }

    return body;
  }
  convertFhirToObject(options: any): APPOINTMENT {
    let ret: APPOINTMENT = {
      priority: options.priority,
      status: options.status,
      patient: {
        id: this.getIdFromReference({
          ref: options.participant[0].actor.reference,
          resourceType: "Patient",
        }),
      } as any,
      practitioner: {
        id: this.getIdFromReference({
          ref: options.participant[1].actor.reference,
          resourceType: "Practitioner",
        }),
      } as any,

      createdDate: options.created,
      startDate: options.start,
      endDate: options.end,
      description: options.description,
      patientStatus: options.participant[0].status,
      practitionerStatus: options.participant[0].status,
      id: options.id,
    };
    if (options.slot) {
      ret.slotId = this.getIdFromReference({
        ref: options.slot.reference,
        resourceType: "Slot",
      });
    }

    if (options.serviceCategory) {
      ret.serviceCategory = options.serviceCategory;
    }
    if (options.serviceType) {
      ret.serviceType = options.serviceType;
    }
    if (options.specialty) {
      ret.specialty = options.specialty;
    }

    if (options.appointmentType) {
      ret.appointmentType = options.appointmentType;
    }

    return ret;
  }

  statusArray = (): AppointmentStatus[] => {
    return AppointmentStatusArray.map((el) => el);
  };

  actorStatusArray = (): AppointmentActorStatus[] => {
    return AppointmentActorStatusArray.map((el) => el);
  };
}
