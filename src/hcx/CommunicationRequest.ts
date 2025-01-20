import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

interface TO_HTML_HCX_OPTIONS_COMMUNICATION_REQUEST
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: COMMUNICATION_REQUEST;
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
export interface COMMUNICATION_REQUEST {
  id?: string;
  hcx?: "nhcx" | "swasth";
  resourceType: "CommunicationRequest"
  text: string;
  identifiers: IDENTTIFIER[];
  basedOn: MULTI_RESOURCE[];
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
  payload: {
    id?: string;
    extension: EXTENSION[];
    modifierExtension: EXTENSION[];
    content: {
      contentString: string;
      contentAttachment: {
        contentType: "application/pdf" | string;
        language: "en-IN";
        data: string;
        title: string;
        creation: string;
      };
    }[];
  }[];
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
      basedOn: options.basedOn,
      status: options.status,
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
      basedOn: options.basedOn &&
        options.basedOn.map(
          (el: { basedOn: { reference: any; }; display: any; }) => {
            return this.getFromMultResource({
              reference: el.basedOn.reference,
              display: el.display || undefined,
            });
          }
        ),
      status: options.status,
      category: options.category,
      priority: options.priority,
      reasonReference: options.reasonReference &&
        options.reasonReference.map((el: { reference: any; display: any; }) => {
          return this.getFromMultResource({
            reference: el.reference,
            display: el.display,
          });
        }),
      statusReason: options.statusReason,
      authoredOn: options.authoredOn,
      requester: options.requester &&
        this.getFromMultResource({
          reference: options.requester,
          display: options.requester.display,
        }),
      payload: options.payload,
      recipient: options.recipient &&
        options.recipient.map((el: { reference: any; display: any; }) => {
          return this.getFromMultResource({
            reference: el.reference,
            display: el.display,
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
          reference: options.about.reference,
          display: options.about.display,
        }),
      sender: options.sender &&
        this.getFromMultResource({
          reference: options.sender.reference,
          display: options.sender.display,
        }),
      resourceType: "CommunicationRequest"
    };

    return ret;
  }
  async toHtml(
    option: TO_HTML_HCX_OPTIONS_COMMUNICATION_REQUEST
  ): Promise<string> {
    let ret: string = "";
    const body: COMMUNICATION_REQUEST = option.body;
    if (option.patient) {
          ret += `<h3>Patient</h3>`;
        ret += `<p>UHID ${option.patient.MRN} Name ${option.patient.name} ${option.patient.mobile || ""}</p>`
    }

    ret += `<h3>Insurance</h3>`;
    ret +=  `<p>${option.payerName}  ${option.payerCode}</p>`
    ret += `<hr/>`;

    if (option.body.authoredOn) {
      ret += `<b>Authored On</b> : ${new TimeZone().convertTZ(
        option.body.authoredOn,
        "Asia/Kolkata",
        false
      )}<br/>`;
    }

    if (option.body.status) {
      ret += `<b>Status</b> : ${option.body.status}<br/>`;
    }

    if (option.body.text) {
      ret += `<h4>Text<</text>`;
      ret += `${option.body.text}<br/>`;
    }

    if (body.payload && body.payload.length > 0) {
      ret += `<h3>Payload</h3>`;
      for (let index = 0; index < body.payload.length; index++) {
        const el = body.payload[index];
        if (el.content && el.content.length > 0) {
          for (let cIndex = 0; cIndex < el.content.length; cIndex++) {
            const content = el.content[cIndex];
            if (content.contentString) {
              ret += `${content.contentString}<br/>`;
            }

            if (content.contentAttachment) {
              const { data, title, contentType, creation } =
                content.contentAttachment;
              const byteCharacters = window.atob(data);
              const byteArray = new Uint8Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
              }

              const blob = new Blob([byteArray], { type: contentType });
              const url = URL.createObjectURL(blob);
              // Create a link element
              const link = document.createElement("a");
              link.href = url;
              link.download = title; // Set the filename for download

              // Append the link to the document body (or any other element)
              document.body.appendChild(link);

              // Programmatically trigger the download
              link.click();

              // Clean up by revoking the URL
              URL.revokeObjectURL(url);
            }
          }
        }
      }
    }

    return ret;
  }
  statusArray?: Function | undefined;
}
