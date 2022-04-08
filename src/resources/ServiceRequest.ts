import { PATIENT, PRACTITIONER } from "..";
import { CodeDisplay, resourceType } from "../config";
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
export interface SERVICE_REQUEST {
  id?: string;
  status: ServiceRequestStatus;
  intent: ServiceRequestIntent;
  services: CodeDisplay[];
  patientId: string;
  patientName: string;
  requester: requester;
  performer: performer[];
  date: string;
  priority: ServiceRequestPriority;
  category: ServceRequestCategory;
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
      priority: options.priority,
      category: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: options.category.code,
              display: options.category.display,
            },
          ],
        },
      ],
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
      requester: {
        reference: `${options.requester.resource}/${options.requester.id}`,
        display: options.requester.display,
      },
      performer: options.performer.map(el=>{
        return {
          reference: `${el.resource}/${el.id}`,
          display: el.display,
        }
      }),
      
      // [
      //   {
      //     reference: `${options.performer[0].resource}/${options.performer[0].id}`,
      //     display: options.performer[0].display,
      //   },
      // ],
    };

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
      const resource = `${options.performer[0].reference}`.substring(
        0,
        `${options.performer[0].reference}`.indexOf("/")
      ) as any;

      const id = this.getIdFromReference({
        ref: options.requester.reference,
        resourceType: resource,
      });

      let ret: performer[] = [
        {
          display: options.performer[0].display,
          id: id,
          resource: resource,
        },
      ];
      return ret;
    };

    let ret: SERVICE_REQUEST = {
      status: options.status,
      intent: options.intent,
      services: options.code.coding,
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      patientName: options.subject.display,
      requester: requester(),
      performer: performer(),
      date: options.occurrenceDateTime,
      id: options.id,
      priority: options.priority,
      category: {
        code: options.category[0].coding[0].code,
        display: options.category[0].coding[0].display,
      },
    };
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
