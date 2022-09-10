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
import { Participant, PARTICIPANT } from "./objects/Partipant";
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
  participants:PARTICIPANT[]
  status: AppointmentStatus;
  serviceCategory?: CODEABLE_CONCEPT[];
  serviceType?: CODEABLE_CONCEPT[];
  specialty?: CODEABLE_CONCEPT[];
  appointmentType?: CODEABLE_CONCEPT;
  reasonCode?: CODEABLE_CONCEPT[];
  createdDate: string;
  startDate: string;
  endDate: string;
  description: string;
  priority: number;
  slotId?: string;
}

export class Appointment extends ResourceMain implements ResourceMaster {
  getFHIR(options: APPOINTMENT): any {
    const getText = (): any => {
      let ret = ``;
      ret = `${ret} <div>Date ${new Date(
        options.startDate
      ).toDateString() || new Date(options.endDate).toDateString()}} `;
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
    
    const getParticipant=():any[]=>{
      const ret:any[]=[]
      const participant = new Participant()
      options.participants.forEach(el=>{
        participant.setObject(el);
        ret.push(participant.getJson())
      })
      return ret;
    }


    
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
        div: getText(),
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
      participant: getParticipant(),
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
      participants:options.participant.map((el: any)=> new Participant().getObject(el)),
      createdDate: options.created,
      startDate: options.start,
      endDate: options.end,
      description: options.description,

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
