import { PATIENT, PRACTITIONER } from "..";
import { CodeDisplay, EXTENSION, MULTI_RESOURCE, resourceType } from "../config";
import { ResourceMaster } from "../Interfaces";
import { ORGANIZATION } from "./Organization";
import ResourceMain from "./ResourceMai";

const ServiceRequestStatusArray = [
  "draft",
  "active",
  "on-hold",
  "revoked",
  "completed",
  "entered-in-error",
  "unknown",
] as const;
export type ServiceRequestStatus = typeof ServiceRequestStatusArray[number];
const ServiceRequestIntentArray = [
  "proposal",
  "plan",
  "directive",
  "order",
  "original-order",
  "reflex-order",
  "filler-order",
  "instance-order",
  "option",
] as const;

export type ServiceRequestIntent = typeof ServiceRequestIntentArray[number];

interface requester {
  resource: "Practitioner" | "Patient" | "Organization" | "PractitionerRole";
  id: string;
  display: string;
}
interface performer extends requester {}

const serviceRequestCategory = [
  { code: "108252007", display: "Laboratory procedure" },
  { code: "363679005", display: "Imaging" },
  { code: "409063005", display: "Counselling" },
  { code: "409073007", display: "Education" },
  { code: "387713003", display: "Surgical procedure" },
] as const;

export type ServceRequestCategory = typeof serviceRequestCategory[number];
const serviceRequestPriority = ["routine", "urgent", "asap", "stat"] as const;

export type ServiceRequestPriority = typeof serviceRequestPriority[number];
interface authorReference	extends MULTI_RESOURCE{
  resource : "Practitioner" | "Patient" | "RelatedPerson" | "Organization",
  
}
interface ANNOTATION {
  // author?:{author:authorReference; authorString : string}
  // time:string
  text:string
}
export interface SERVICE_REQUEST {
  id?: string;
  status: ServiceRequestStatus;
  intent: ServiceRequestIntent;
  services?: CodeDisplay[];
  patientId: string;
  patientName: string;
  requester: requester;
  performer?: performer[];
  date: string;
  priority?: ServiceRequestPriority;
  category?: ServceRequestCategory;
  encounterId?: string;
  note?:ANNOTATION[],
  extension?:EXTENSION[];
}

export class ServiceRequest extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: SERVICE_REQUEST): any {
    const getText = (): string => {
      let services = "";
      if (options.services && options.services.length > 0) {
        options.services.forEach((el) => {
          services = `${services}, ${el.display}`;
        });
      }

      let ret = services;
      return ret;
    };
    const body: any = {
      resourceType: "ServiceRequest",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ServiceRequest",
        ],
      },
      
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${getText()}</div>`,
      },

      status: options.status,
      intent: options.intent,
      code: {
        coding: options.services,
      },
      subject: {
        reference: `Patient/${options.patientId}`,
        display: options.patientName,
      },
      occurrenceDateTime: options.date,
    };


    if(options.priority){
      body.priority=options.priority
    }

    if(options.category){
      body.category=[
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: options.category.code,
              display: options.category.display,
            },
          ],
        },
      ]
    }
    if(options.requester){
      body.requester={
        reference: `${options.requester.resource}/${options.requester.id}`,
        display: options.requester.display,
      }
    }

    if (options.performer) {
      body.performer = options.performer.map((el) => {
        return {
          reference: `${el.resource}/${el.id}`,
          display: el.display,
        };
      });
    }

    if (options.encounterId) {
      body.encounter = { reference: `Encounter/${options.encounterId}` };
    }
    if(options.note){
      body.note = options.note
    }

    if(options.extension){
      body.extension = options.extension
    }
    

    return body;
  }
  convertFhirToObject(options: any): SERVICE_REQUEST {
    const requester = (): requester => {
      const resource = `${options.requester.reference}`.substring(
        0,
        `${options.requester.reference}`.indexOf("/")
      ) as any;

      const id = this.getIdFromReference({
        ref: options.requester.reference,
        resourceType: resource,
      });

      let ret: requester = {
        display: options.requester.display,
        id: id,
        resource: resource,
      };
      return ret;
    };

    const performer = (): performer[] => {
      let ret: performer[] = [];
      options.performer.forEach((el: any) => {
        const resource = `${el.reference}`.substring(
          0,
          `${el.reference}`.indexOf("/")
        ) as any;
        const id = this.getIdFromReference({
          ref: el.reference,
          resourceType: resource,
        });
        ret.push({
          display: el.display,
          id: id,
          resource: resource,
        });
      });
      return ret;
    };

    let ret: SERVICE_REQUEST = {
      status: options.status,
      intent: options.intent,
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      patientName: options.subject.display,
      date: options.occurrenceDateTime,
      id: options.id,
   
      requester: requester()
    };

    if(options.priority){
      ret.priority=options.priority
    }

    if(options.category){
      ret.category={
        code: options.category[0].coding[0].code,
        display: options.category[0].coding[0].display,
      }
    }

    if(options.code && options.code.coding){
      ret.services= options.code.coding
    }
    if(options.performer){
      ret.performer = performer()
    }

    if (options.encounter) {
      ret.encounterId = this.getIdFromReference({
        ref: options.encounter.reference,
        resourceType: "Encounter",
      });
    }

    if(options.extension){
      ret.extension = options.extension
    }

    if(options.note){
      ret.note=options.note
    }
    if (ret.performer == undefined) {
      delete ret.performer;
    }


    

    return ret;
  }

  statusArray = (): ServiceRequestStatus[] => {
    return ServiceRequestStatusArray.map((el) => el);
  };

  itentArray = (): ServiceRequestIntent[] => {
    return ServiceRequestIntentArray.map((el) => el);
  };

  category = (): ServceRequestCategory[] => {
    return serviceRequestCategory.map((el) => el);
  };
  priority = (): ServiceRequestPriority[] => {
    return serviceRequestPriority.map((el) => el);
  };
}
