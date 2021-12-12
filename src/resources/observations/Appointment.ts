import { CodeDisplay } from "../../config";
import { ResourceMaster } from "../../Interfaces";

export const AppointmentStatusArray = ["proposed" , "pending" , "booked" , "arrived" , "fulfilled" , "cancelled" , "noshow" , "entered-in-error" , "checked-in" , "waitlist"] as const

type  AppointmentStatus = typeof AppointmentStatusArray[number]

export const ActorStatusArray = ["accepted" , "declined" , "tentative" , "needs-action"] as const
type ActorStatus = typeof ActorStatusArray[number]

export interface APPOINTMENT{
    id?:string;
    status : AppointmentStatus
    patientId: string;
    practitionerId: string;
    text :string
    serviceCategory:CodeDisplay[]
    serviceType : CodeDisplay[]
    appointmentType : CodeDisplay[]
    reasonReferenceConditionId : string;
    createdDate:string;
    startDate:string;
    endDate:string
    description:string
    patientStatus:ActorStatus
    practitionerStatus :ActorStatus
}

export class Appointment implements ResourceMaster {
  getFHIR(options: APPOINTMENT):any {
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
        coding:options.appointmentType,
      },
      reasonReference: [
        {
          reference: `Condition/${options.reasonReferenceConditionId}`,
        },
      ],
      description:
        options.description,
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

    return body
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
}
