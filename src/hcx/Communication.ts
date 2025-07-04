import { abort } from "process";
import {
  ATTACHMENT,
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
  REFERENCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";
import ResourceToHTML from "../classess/ReseorcetToHtml";

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

interface ReasonReference extends MULTI_RESOURCE {
  resource:
    | "DiagnosticReport"
    | "Condition"
    | "Observation"
    | "DocumentReference";
}

interface Encounter extends MULTI_RESOURCE {
  resource: "Encounter";
}

interface InResponseTo extends MULTI_RESOURCE {
  resource: "Communication";
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

export interface PAYLOAD {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  content?: {
    contentAttachment?: ATTACHMENT;
    contentString?: string;
    contentReference?: MULTI_RESOURCE;
  };
}

export interface COMMUNICATION {
  id?: string;
  hcx?: "nhcx" | "swasth";
  resourceType: "Communication"
  text: string;
  implicitRulesLink?: string;
  subject?: subject;
  inResponseTo?: InResponseTo[];
  encounter?: Encounter;
  topic?: CODEABLE_CONCEPT;
  sentDate?: string;
  receivedDate?: string;
  identifier?: IDENTTIFIER[];
  basedOn?: MULTI_RESOURCE[];
  partOf?: MULTI_RESOURCE[];
  status: Status;
  about?: MULTI_RESOURCE[];
  medium?: CODEABLE_CONCEPT[];
  category: CODEABLE_CONCEPT[];
  priority: "routine" | "urgent" | "asap" | "stat";
  recipient?: Recipient[];
  reasonCode?: CODEABLE_CONCEPT[];
  reasonReference?: ReasonReference[];
  sender?: Sender;
  payload?: PAYLOAD[];
}

interface TO_HTML_HCX_OPTIONS_COMMUNICATION
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: COMMUNICATION;
}

export class Communication extends ResourceMain implements ResourceMaster {
  async toHtml(options: TO_HTML_HCX_OPTIONS_COMMUNICATION): Promise<string> {
    const body = this.convertFhirToObject(options.body)
    

    const getReference = (resource: MULTI_RESOURCE , name:string) => 
        this.multiResourceToHtml(resource, name)
    
    const getCategories = () => 
        body.category?.map(c => c.text).filter(Boolean).join(', ') || '';
    
    const getRecipients = () => 
        body.recipient?.map(r => getReference(r, "Recipient")).join(',<br>') || '';
    
    const getInResponseTo = () => 
        body.inResponseTo?.map(ir => getReference(ir, "InResponseTo")).join(',<br>') || '';

    const getReasonReferences = () => 
        body.reasonReference?.map(rr => getReference(rr, "ReasonReference")).join(',<br>') || '';

    const html = `
        <div class="communication">
            <h1>Communication</h1>
            <table data-pdfmake="{'widths':['40%','60%']}">
                <tbody>
                    ${body.id ? `<tr><th>ID</th><td>${body.id}</td></tr>` : ''}
                    ${body.status ? `<tr><th>Status</th><td>${body.status}</td></tr>` : ''}
                    ${body.priority ? `<tr><th>Priority</th><td>${body.priority}</td></tr>` : ''}
                    ${body.category ? `<tr><th>Category</th><td>${getCategories()}</td></tr>` : ''}
                    ${body.subject ? `<tr><th>Subject</th><td>${getReference(body.subject, "Subject")}</td></tr>` : ''}
                    ${body.encounter ? `<tr><th>Encounter</th><td>${getReference(body.encounter, "Encounter")}</td></tr>` : ''}
                    ${body.sentDate ? `<tr><th>Sent Date</th><td>${body.sentDate}</td></tr>` : ''}
                    ${body.receivedDate ? `<tr><th>Received Date</th><td>${body.receivedDate}</td></tr>` : ''}
                    ${body.topic ? `<tr><th>Topic</th><td>${body.topic.text}</td></tr>` : ''}
                    ${body.reasonCode?.length ? `<tr><th>Reason Code</th><td>${body.reasonCode.map(rc => rc.text).join(', ')}</td></tr>` : ''}
                    ${body.reasonReference?.length ? `<tr><th>Reason Reference</th><td>${getReasonReferences()}</td></tr>` : ''}
                    ${body.inResponseTo?.length ? `<tr><th>In Response To</th><td>${getInResponseTo()}</td></tr>` : ''}
                    ${body.payload?.length ? `
                        <tr>
                            <th>Payloads</th>
                            <td>
                                <ul style="list-style-type: none; padding-left: 0;">
                                    ${new ResourceToHTML().payloadToHtml(body.payload)}
                                </ul>
                            </td>
                        </tr>` : ''}
                </tbody>
            </table>
        </div>
    `;

    return html;
}
  getFHIR(options: COMMUNICATION) {
    const body = {
      resourceType: "Communication",
      identifier: options.identifier,
      topic: options.topic,
      id: options.id ? options.id : undefined,
      implicitRules: options.implicitRulesLink,
      medium: options.medium,
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
      about:
        options.about &&
        options.about.map((el) => {
          return {
            reference: el.resource && `${el.resource}/${el.id}`,
            type: el.type,
            identifier: el.identifier,
            display: el.display,
          };
        }),
      partOf:
        options.partOf &&
        options.partOf.map((el) => {
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
        options.payload &&
        options.payload.map((el) => {
          let ret: any = {};
          if (el.id) {
            ret.id = el.id;
          }
          if (el.extension) {
            ret.extension = el.extension;
          }
          if (el.modifierExtension) {
            ret.modifierExtension = ret.modifierExtension;
          }

          if (el.content) {
            if (el.content.contentAttachment) {
              ret.contentAttachment = el.content.contentAttachment;
            } else if (el.content.contentString) {
              ret.contentString = el.content.contentString;
            } else if (el.content.contentReference) {
              ret.contentReference = {
                reference: `${el.content.contentReference.resource}/${el.content.contentReference.id}`,
                type: el.content.contentReference.type,
                identifier: el.content.contentReference.identifier,
                display: el.content.contentReference.display,
              };
            }
          }
          return ret;
        }),

      received: options.receivedDate,
      sent: options.sentDate,
      reasonCode: options.reasonCode,
      reasonReference:
        options.reasonReference &&
        options.reasonReference.map((el) => {
          return {
            reference: el.resource && `${el.resource}/${el.id}`,
            type: el.type,
            identifier: el.identifier,
            display: el.display,
          };
        }),
      encounter: options.encounter && {
        reference:
          options.encounter.resource &&
          `${options.encounter.resource}/${options.encounter.id}`,
        type: options.encounter.type,
        identifier: options.encounter.identifier,
        display: options.encounter.display,
      },
      inResponseTo:
        options.inResponseTo &&
        options.inResponseTo.map((el) => {
          return {
            reference: el.resource && `${el.resource}/${el.id}`,
            type: el.type,
            identifier: el.identifier,
            display: el.display,
          };
        }),
    };

    return body;
  }
  convertFhirToObject(options: any): COMMUNICATION {
    const ret: COMMUNICATION = {
      text: options?.text?.div || "",
      status: options.status,
      category: options.category,

      resourceType: "Communication",
      priority: options.priority
    };

    if(options.recipient){
      ret.recipient =options.recipient.map((el: any) => this.getFromMultResource(el))
    }

    if (options.identifier) {
      ret.identifier = options.identifier;
    }

    if (options.subject) {
      ret.subject = this.getFromMultResource(options.subject) as any;
    }

    if (options.basedOn) {
      ret.basedOn = options.basedOn.map((el: any) =>
        this.getFromMultResource(el)
      );
    }

    if (options.about) {
      ret.about = options.about.map((el: any) =>
        this.getFromMultResource(el)
      );
    }

    if (options.topic) {
      ret.topic = options.topic;
    }
    if (options.partOf) {
      ret.partOf = options.partOf.map((el: any) =>
        this.getFromMultResource(el)
      );
    }
    if (options.recipient) {
      ret.recipient = options.recipient.map((el: any) =>
        this.getFromMultResource(el)
      );
    }

    if (options.medium) {
      ret.medium = options.medium;
    }

    if (options.implicitRules) {
      ret.implicitRulesLink = options.implicitRules;
    }

    if (options.reasonCode) {
      ret.reasonCode = options.reasonCode;
    }

    if (options.reasonReference) {
      ret.reasonReference = options.reasonReference.map((el: any) =>
        this.getFromMultResource(el)
      );
    }

    if (options.inResponseTo) {
      ret.inResponseTo = options.inResponseTo.map((el: any) =>
        this.getFromMultResource(el)
      );
    }
    if (options.sender) {
      ret.sender = this.getFromMultResource(options.sender) as any;
    }

    if (options.encounter) {
      ret.encounter = this.getFromMultResource(
        options.encounter
      ) as any;
    }

    if (options.id) {
      ret.id = options.id;
    }

    if (options.sent) {
      ret.sentDate = options.sent;
    }
    if (options.received) {
      ret.receivedDate = options.received;
    }

    if (options.payload) {
      ret.payload = options.payload?.map((el: any) => {
        const ret: PAYLOAD = {};
        if (el.id) ret.id = el.id;
        if (el.extension) ret.extension = el.extension;
        if (el.modifierExtension) ret.modifierExtension = el.modifierExtension;

        if (el.contentAttachment) {
          ret.content = {};
          ret.content.contentAttachment = el.contentAttachment;
        } else if (el.contentString) {
          ret.content = {};
          ret.content.contentString = el.contentString;
        } else if (el.content.contentReference) {
          ret.content = {};
          ret.content.contentReference = this.getFromMultResource(
            el.contentReference
          );
        }

        return ret;
      });
    }

    return ret;
  }
  statusArray(): Status[] {
    return statusArray.map((el) => el);
  }
}
