
import { CODEABLE_CONCEPT, CodeDisplay, IDENTTIFIER } from "../config";
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
  slotId?: string[];
 organizationId:string;
}

export class Appointment extends ResourceMain implements ResourceMaster {
  getFHIR(options: APPOINTMENT): any {
    const getText = (): any => {
      let ret = ``;
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

    const identifiers:IDENTTIFIER[]=[]
    identifiers.push(    {
      "value" : options.organizationId,
      "system" : "https://www.nicehms.com/orgnization"
    })

    
    let body: any = {
      resourceType: "Appointment",
      id: options.id || undefined,
      identifier:identifiers,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment",
        ],
      },
      text: {
        status: "generated",
        div: getText(),
      },
      supportingInformation:[{
        reference: `Organization/${options.organizationId}`
      }],
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
    if (options.slotId && options.slotId?.length > 0) {
      body.slot = options.slotId.map(el=>{
        return {
          reference: `Slot/${el}`
        }
      });
    }

    return body;
  }


  convertFhirToObject(options: any): APPOINTMENT {
    let orgIdentifierArray:IDENTTIFIER[] = options.identifier.filter((el:IDENTTIFIER)=> el.system == "https://www.nicehms.com/orgnization") 

    let ret: APPOINTMENT = {
      priority: options.priority,
      status: options.status,
      participants: options.participant.map((el: any) => new Participant().getObject(el)),
      createdDate: options.created,
      startDate: options.start,
      endDate: options.end,
      description: options.description,
      id: options.id,
      organizationId :orgIdentifierArray && orgIdentifierArray.length > 0 ? orgIdentifierArray[0].value || "" : "",
    }
    if (options.slot && options.slot.length > 0 ){
      ret.slotId = options.slot.map((el:any)=>{
       return this.getIdFromReference({
          ref: el.reference,
          resourceType: "Slot",
        })
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
