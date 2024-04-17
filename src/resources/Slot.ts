import { CODEABLE_CONCEPT } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const statusArray = [
  "busy",
  "free",
  "busy-unavailable",
  "busy-tentative",
  "entered-in-error",
] as const;
type Status = typeof statusArray[number];

export interface SLOT {
  id?: string;
  comment: string;
  serviceCategory?: CODEABLE_CONCEPT[];
  serviceType?: CODEABLE_CONCEPT[];
  specialty?: CODEABLE_CONCEPT[];
  appointmentType: CODEABLE_CONCEPT;
  scheduleId: string;
  status: Status;
  start: string;
  end: string;
}

export class Slot extends ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: SLOT): any {
    const getText = (): string => {
      let ret: string = "";
      ret = options.comment;
      return ret;
    };
    const body = {
      resourceType: "Slot",
      id: options.id,
      text: {
        status: "generated",
        div: getText(),
      },
      serviceCategory: options.serviceCategory,
      serviceType: options.serviceType,
      specialty: options.specialty,
      appointmentType: options.appointmentType,
      schedule: {
        reference: `Schedule/${options.scheduleId}`,
      },
      status: options.status,
      start: options.start,
      end: options.end,
      comment: options.comment,
    };

    return body;
  }

  convertFhirToObject(options: any):SLOT {
    const ret:SLOT={
        id:options.id,
        comment: options.comment,
        appointmentType: options.appointmentType,
        scheduleId: this.getIdFromReference({"ref" : options.schedule.reference, "resourceType" : "Schedule"}),
        status: options.status,
        start: options.start,
        end: options.end
    }
    if(options.serviceCategory){
      ret.serviceCategory =options.serviceCategory
    }
    if(options.serviceType){
      ret.serviceType= options.serviceType
    }
    if(options.specialty){
      ret.specialty=options.specialty
    }
    return ret;
  }

  statusArray(): Status[] {
    const ret = statusArray.map((el) => el);
    return ret;
  }
}
