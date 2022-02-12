import { type } from "os";
import { PATIENT, PRACTITIONER } from "..";
import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
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

export interface SERVICE_REQUEST {
  id?: string;
  status: ServiceRequestStatus;
  intent: ServiceRequestIntent;
  services: CodeDisplay[];
  patient: PATIENT;
  practitioner: PRACTITIONER;
  date: string;
}

export class ServiceRequest extends ResourceMain implements ResourceMaster {
  getFHIR(options: SERVICE_REQUEST): any {
    const getText = (): string => {
      let services = "";
      if (options.services.length > 0) {
        options.services.forEach((el) => {
          services = `${services}, ${el.display}`;
        });
      }

      let ret = services;

      // let ret = `<div>Following service/services requested by ${options.practitioner} to ${options.patient.name} with MRN ${options.patient.MRN} on ${new Date().toDateString()}</div>`
      // ret = `${ret} <div>${services}</div>`
      // ret = `${ret} <div>Order Status ${options.status}, Order Intent ${options.intent}</div>`
      return ret;
    };
    const body = {
      resourceType: "ServiceRequest",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ServiceRequest",
        ],
      },
      text: {
        status: options.status,
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${getText()}</div>`,
      },
      status: options.status,
      intent: options.intent,
      code: {
        coding: options.services,
      },
      subject: {
        reference: `Patient/${options.patient.id}`,
        display: options.patient.name,
      },
      occurrenceDateTime: options.date,
      requester: {
        reference: `Practitioner/${options.practitioner.id}`,
        display: options.practitioner.name,
      },
    };

    return body;
  }
  convertFhirToObject(options: any): SERVICE_REQUEST {
    let ret: SERVICE_REQUEST = {
      status: options.status,
      intent: options.intent,
      services: options.code.coding,
      patient: {
        id: this.getIdFromReference({
          ref: options.subject.reference,
          resourceType: "Patient",
        }),
        name: options.subject.display,
      } as any,
      practitioner: {
        id: this.getIdFromReference({
          ref: options.requester.reference,
          resourceType: "Practitioner",
        }),
        name: options.requester.display,
      } as any,
      date: options.occurrenceDateTime,
      id: options.id,
    };
    return ret;
  }
  statusArray = (): ServiceRequestStatus[] => {
    return ServiceRequestStatusArray.map((el) => el);
  };

  itentArray = (): ServiceRequestIntent[] => {
    return ServiceRequestIntentArray.map((el) => el);
  };
}
