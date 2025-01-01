import {
  CODEABLE_CONCEPT,
  IDENTTIFIER,
  MULTI_RESOURCE,
  REFERENCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

interface subject extends MULTI_RESOURCE {
  resource: "Patient" | "Group";
}

interface Recipient extends MULTI_RESOURCE {
  resource:
    | "Device"
    | "RelatedPerson"
    | "Group"
    | "CareTeam"
    | "HealthcareService"
    | "Organization"
    | "Patient"
    | "Practitioner"
    | "PractitionerRole";
}

interface Sender extends MULTI_RESOURCE {
  resource:
    | "Device"
    | "Organization"
    | "Patient"
    | "Practitioner"
    | "PractitionerRole"
    | "RelatedPerson"
    | "HealthcareService"
    | "Practitioner"
    | "PractitionerRole"
    | "Organization"
    | "Patient";
}

interface ReasonReference extends MULTI_RESOURCE{
 resource : "DiagnosticReport" | "Condition" | "Observation" | "DocumentReference"
}

interface Encounter extends MULTI_RESOURCE{
  resource : "Encounter"
}

const statusArray = [
  "preparation",
  "in-progress",
  "not-done",
  "on-hold",
  "stopped",
  "completed",
  "entered-in-error",
  "unknown",
] as const;

type Status = (typeof statusArray)[number];

export interface COMMUNICATION {
  id?: string;
  hcx?: "nhcx" | "swasth";
  text: string;
  subject?: subject;
  encounter?: Encounter;
  sentDate?: string;
  receivedDate?: string;
  identifier: IDENTTIFIER[];
  basedOn?: MULTI_RESOURCE[];
  status: Status;
  category: CODEABLE_CONCEPT[];
  priority: "routine" | "urgent" | "asap" | "stat";
  recipient?: Recipient[];
  reasonCode?:CODEABLE_CONCEPT[];
  reasonReference ?: ReasonReference[]
  sender?: Sender;
  contentBase64PDFstrings?: {
    pdf: string;
    createdDate: string;
    title: string;
  }[];
}

export class Communication extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: COMMUNICATION) {
    const body = {
      resourceType: "Communication",
      identifier: options.identifier,
      id: options.id ? options.id : undefined,
      subject: options.subject && {
        reference:
          options.subject.resource &&
          `${options.subject.resource}/${options.subject.id}`,
        type: options.subject.type,
        identifier: options.subject.identifier,
        display: options.subject.display,
      },
      meta: {
        versionId: "1",
        lastUpdated: "2023-09-07T14:58:58.181+05:30",
        profile:
          options.hcx == "nhcx"
            ? [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Communication",
              ]
            : [
                "https://ig.hcxprotocol.io/v0.8/StructureDefinition-Communication.html",
              ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      basedOn:
        options.basedOn &&
        options.basedOn.map((el) => {
          return {
            reference: el.resource && `${el.resource}/${el.id}`,
            type: el.type,
            identifier: el.identifier,
            display: el.display,
          };
        }),
      status: options.status,
      category: options.category,
      priority: options.priority,
      recipient:
        options.recipient &&
        options.recipient.map((el) => {
          return {
            reference: el.resource && `${el.resource}/${el.id}`,
            type: el.type,
            identifier: el.identifier,
            display: el.display,
          };
        }),
      sender: options.sender && {
        reference:
          options.sender.resource &&
          `${options.sender.resource}/${options.sender.id}`,
        type: options.sender.type,
        identifier: options.sender.identifier,
        display: options.sender.display,
      },
      payload:
        options.contentBase64PDFstrings &&
        options.contentBase64PDFstrings.map((el) => ({
          contentAttachment: {
            contentType: "application/pdf",
            language: "en-IN",
            data: el.pdf,
            title: el.title,
            creation: el.createdDate,
          },
        })),

      received: options.receivedDate,
      sent: options.sentDate,
      reasonCode:options.reasonCode,
      reasonReference :options.reasonReference && options.reasonReference.map((el) => {
        return {
          reference: el.resource && `${el.resource}/${el.id}`,
          type: el.type,
          identifier: el.identifier,
          display: el.display,
        };
      }), 
      encounter : options.encounter && {
        reference: options.encounter.resource && `${options.encounter.resource}/${options.encounter.id}`,
        type: options.encounter.type,
        identifier: options.encounter.identifier,
        display: options.encounter.display,
      }
    };

    return body;
  }
  convertFhirToObject(options: any): COMMUNICATION {
    const communication: COMMUNICATION = {
      text: options.text.div,
      identifier: options.identifier,
      status: options.status,
      category: options.category,
      priority: options.priority,

      contentBase64PDFstrings: options.payload.map((el: any) => ({
        pdf: el.contentAttachment.data,
        title: el.contentAttachment.title,
        createdDate: el.contentAttachment.creation,
      })),
      recipient: options.recipient.map((el: any) =>
        this.getFromMultResource(el)
      ),
    };

    if (options.subject) {
      communication.subject = this.getFromMultResource(options.subject) as any;
    }

    if (options.basedOn) {
      communication.basedOn = options.basedOn.map((el: any) =>
        this.getFromMultResource(el)
      );
    }
    if (options.recipient) {
      communication.recipient = options.recipient.map((el: any) =>
        this.getFromMultResource(el)
      );
    }

    if(options.reasonCode){
      communication.reasonCode=options.reasonCode
    }

    if(options.reasonReference){
      communication.reasonReference = options.reasonReference.map((el: any) =>
        this.getFromMultResource(el)
      );
    }
      if (options.sender) {
        communication.sender = this.getFromMultResource(options.sender) as any;
      }

      if (options.encounter) {
        communication.encounter = this.getFromMultResource(options.encounter) as any;
      }
 

    if (options.id) {
      communication.id = options.id;
    }

    if (options.sent) {
      communication.sentDate = options.sent;
    }
    if (options.received) {
      communication.receivedDate = options.received;
    }
    return communication;
  }
  statusArray(): Status[] {
    return statusArray.map((el) => el);
  }
}
