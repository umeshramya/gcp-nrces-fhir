import ResourceToHTML from "../classess/ReseorcetToHtml";
import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { PAYLOAD } from "./Communication";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

interface TO_HTML_HCX_OPTIONS_COMMUNICATION_REQUEST
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}

interface SUBJECT extends MULTI_RESOURCE {
  resource: "Patient" | "Group";
}

interface REQUESTER extends MULTI_RESOURCE {
  resource:
    | "RelatedPerson"
    | "Device"
    | "Practitioner"
    | "PractitionerRole"
    | "Organization"
    | "Patient";
}

interface RECIPIENT extends MULTI_RESOURCE {
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

interface SENDER extends MULTI_RESOURCE {
  resource:
    | "Device"
    | "Organization"
    | "Patient"
    | "Practitioner"
    | "PractitionerRole"
    | "RelatedPerson"
    | "HealthcareService";
}

interface REASON_REFERENCE extends MULTI_RESOURCE {
  resource:
    | "Condition"
    | "Observation"
    | "DiagnosticReport"
    | "DocumentReference";
}

interface REPLACES extends MULTI_RESOURCE {
  resource:"CommunicationRequest"

}
export interface COMMUNICATION_REQUEST {
  id?: string;
  hcx?: "nhcx" | "swasth";
  resourceType: "CommunicationRequest"
  text: string;
  identifiers?: IDENTTIFIER[];
  basedOn?: MULTI_RESOURCE[];
  replaces?: REPLACES[]
  status:
    | "draft"
    | "active"
    | "on-hold"
    | "revoked"
    | "completed"
    | "entered-in-error"
    | "unknown";
  /** ststem "http://terminology.hl7.org/CodeSystem/communication-category" */
  category: CODEABLE_CONCEPT[];
  priority: "routine" | "urgent" | "asap" | "stat";
  subject?: SUBJECT;
  about?: MULTI_RESOURCE;
  encounterId?: string;
  doNotPerform?: boolean;
  /** system http://terminology.hl7.org/CodeSystem/v3-ActReason */
  reasonCode?: CODEABLE_CONCEPT[];
  reasonReference: REASON_REFERENCE[];
  statusReason: CODEABLE_CONCEPT;
  authoredOn: string;
  requester: REQUESTER;
  payload?:PAYLOAD[];
  recipient: RECIPIENT[];
  sender: SENDER;
  note?: {
    author?: {
      authorReference: {
        reference: `${
          | "Practitioner"
          | "Patient"
          | "RelatedPerson"
          | "Organization)"}/${string}`;
      };
      authorString: string;
    }[];
    time?: string;
    text: string;
  };
}

export class CommunicationRequest
  extends ResourceMain
  implements ResourceMaster
{
  getFHIR(options: COMMUNICATION_REQUEST) {
    const body = {
      resourceType: "CommunicationRequest",
      id: options.id || undefined,
      status:options.status,
      meta: {
        versionId: "1",
        lastUpdated: "2023-09-07T14:58:58.181+05:30",
        profile:
          options.hcx == "swasth"
            ? [
                "https://ig.hcxprotocol.io/v0.8/StructureDefinition-CommunicationRequest.html",
              ]
            : [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/CommunicationRequest",
              ],
      },
      text: {
        status: "generated",
        div: options.text || "",
      },
      identifier: options.identifiers,
      replaces:
      options.replaces &&
      options.replaces.map((el) => {
        return {
          reference: el.resource && `${el.resource}/${el.id}`,
          type: el.type,
          identifier: el.identifier,
          display: el.display,
        };
      }),
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
      category: options.category,
      priority: options.priority,
      subject: {
        reference:
          options.subject &&
          `${options.subject?.resource}/${options.subject?.id}`,
      },
      doNotPerform: options.doNotPerform,
      statusReason: options.statusReason,
      encounter: { reference: `Encounter/${options.encounterId}` },
      payload: options.payload,
      authoredOn: options.authoredOn,
      requester: {
        reference:
          options.requester &&
          `${options.requester.resource}/${options.requester.id}`,
      },
      recipient:
        options.recipient &&
        options.recipient.map((el) => {
          return { reference: `${el.resource}/${el.id}` };
        }),
      sender: options.sender && {
        reference: `${options.sender.resource}/${options.sender.id}`,
      },
      reasonCode: options.reasonCode && options.reasonCode,
      reasonReference:
        options.reasonReference &&
        options.reasonReference.map((el) => {
          return { reference: `${el.resource}/${el.id}` };
        }),
      note: options.note,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const ret: COMMUNICATION_REQUEST = {
      text: (options.text && options.text.div) || "",
      identifiers: options.identifier,
      status: options.status,
      category: options.category,
      priority: options.priority,
      reasonReference: options.reasonReference &&
        options.reasonReference.map((el: { reference: any; display: any; }) => {
          return this.getFromMultResource({
            ...el,
            reference: el?.reference,
          });
        }),
      statusReason: options.statusReason,
      authoredOn: options.authoredOn,
      requester: options.requester &&
        this.getFromMultResource({
          ...options.requester,
          reference: options?.requester,

        }),
      recipient: options.recipient &&
        options.recipient.map((el: { reference: any; display: any; }) => {
          return this.getFromMultResource({
            ...el,
            reference: el?.reference,

          });
        }),
      reasonCode: options.reasonCode,
      doNotPerform: options.doNotPerform,
      note: options.note,
      subject: options.subject &&
        this.getFromMultResource({
          reference: options.subject.reference,
          display: options.subject.display,
        }),
      encounterId: options.encounter &&
        this.getIdFromReference({
          ref: options.encounter.reference,
          resourceType: "Encounter",
        }),
      about: options.about &&
        this.getFromMultResource({
          ...options.about,
          reference: options.about?.reference,
        }),
      sender: options.sender &&
        this.getFromMultResource({
          ...options.sender,
          reference: options.sender?.reference,
        }),
      resourceType: "CommunicationRequest",
      basedOn : options.basedOn.map(
        (el: { basedOn: { reference: any; }; display: any; }) => {
          return this.getFromMultResource({
            ...el,
            reference: el.basedOn?.reference,
          });
        })
    };

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
  async toHtml(
    option: TO_HTML_HCX_OPTIONS_COMMUNICATION_REQUEST
  ): Promise<string> {
    let ret: string = "";
    const body: COMMUNICATION_REQUEST = this.convertFhirToObject(option.body);
  
    ret += `<html><body>`;
    ret += `<h1>Communication Request</h1>`;
    ret += `<p><strong>ID:</strong> ${body.id || "N/A"}</p>`;
    ret += `<p><strong>Status:</strong> ${body.status}</p>`;
    ret += `<p><strong>Priority:</strong> ${body.priority}</p>`;
    ret += `<p><strong>Authored On:</strong> ${body.authoredOn}</p>`;
    ret += body.text;

    if(body.identifiers){
      ret += `<p><strong>Identifiers</strong></p>`
      body.identifiers.forEach(el=>{
       ret += this.identifierToHtml(el)
      })
    }
    
    if (body.subject) {
        ret += `<p><strong>Subject:</strong></p>`
      ret += this.multiResourceToHtml(body.subject, "Subject")
    }
    
    if (body.requester) {
      ret +=  this.multiResourceToHtml(body.requester, "Requester")
    }
    
    if (body.recipient && body.recipient.length > 0) {
      ret += this.multiResourceToHtml(body.recipient, "Recipient")
    }
    
    if (body.reasonCode && body.reasonCode.length > 0) {
      ret += `<p><strong>ReasonCode</strong></p>`
      ret += this.codeableConceptToHtml(body.reasonCode)
    }
    
    if (body.reasonReference && body.reasonReference.length > 0) {
      ret += this.multiResourceToHtml(body.reasonReference, "ReasonReference")
    }
    
    if (body.payload && body.payload.length > 0) {
      ret += `<h2>Payload</h2>`;
      ret += new ResourceToHTML().payloadToHtml(body.payload)
    }
    
    if (body.note) {
      ret += `<h2>Notes</h2>`;
      ret += `<p>${body.note.text}</p>`;
    }
  
    ret += `</body></html>`;
    return ret;
  }
  
  statusArray?: Function | undefined;
}
