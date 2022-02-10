import { Condition, GcpFhirCRUD, Patient, Practitioner } from "..";
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
  patientId: string;
  practitionerId: string;
  // text: string;
  serviceCategory: CodeDisplay[];
  serviceType: CodeDisplay[];
  appointmentType: CodeDisplay[];
  reasonReferenceConditionId: string;
  createdDate: string;
  startDate: string;
  endDate: string;
  description: string;
  patientStatus: AppointmentActorStatus;
  practitionerStatus: AppointmentActorStatus;
}

export class Appointment extends ResourceMain implements ResourceMaster {
  async getFHIR(options: APPOINTMENT): Promise<any> {
    const getText = async (): Promise<string> => {
      const gcpFhirCrud = new GcpFhirCRUD();
      let res = await gcpFhirCrud.getFhirResource(options.patientId, "Patient");
      const patient = new Patient().convertFhirToObject(res.data);

      res = await gcpFhirCrud.getFhirResource(
        options.practitionerId,
        "Practitioner"
      );
      const practitioner = new Practitioner().convertFhirToObject(res.data);

      res = await gcpFhirCrud.getFhirResource(
        options.reasonReferenceConditionId,
        "Condition"
      );
      const condtion = new Condition().convertFhirToObject(res.data);

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
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${await getText()}</div>`,
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
  convertFhirToObject(options: any): APPOINTMENT {
    let ret: APPOINTMENT = {
      status: options.status,
      patientId: this.getIdFromReference({
        ref: options.participant[0].actor.reference,
        resourceType: "Patient",
      }),
      practitionerId: this.getIdFromReference({
        ref: options.participant[1].actor.reference,
        resourceType: "Practitioner",
      }),
      serviceCategory: options.serviceCategory,
      serviceType: options.serviceType,
      appointmentType: options.appointmentType,
      reasonReferenceConditionId: this.getIdFromReference({
        ref: options.reasonReference[0].reference,
        resourceType: "Condition",
      }),
      createdDate: options.created,
      startDate: options.start,
      endDate: options.end,
      description: options.description,
      patientStatus: options.participant[0].status,
      practitionerStatus: options.participant[0].status,
      id: options.id,
    };
    // let ret: APPOINTMENT = {
    //   status: options.status,
    //   patientId: `${options.participant[0].actor.reference}`.substring(8),
    //   practitionerId: `${options.participant[1].actor.reference}`.substring(13),
    //   text: options.text,
    //   serviceCategory: options.serviceCategory,
    //   serviceType: options.serviceType,
    //   appointmentType: options.appointmentType,
    //   reasonReferenceConditionId: `${options.reasonReference.reference}`.substring(8),
    //   createdDate: options.created,
    //   startDate: options.start,
    //   endDate: options.end,
    //   description: options.description,
    //   patientStatus: options.participant[0].status,
    //   practitionerStatus: options.participant[0].status,
    //   id: options.id
    // }

    return ret;
  }

  statusArray = (): AppointmentStatus[] => {
    return AppointmentStatusArray.map((el) => el);
  };

  actorStatusArray = (): AppointmentActorStatus[] => {
    return AppointmentActorStatusArray.map((el) => el);
  };
}
