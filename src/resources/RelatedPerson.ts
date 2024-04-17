import { ADDRESS, CODEABLE_CONCEPT, CODING, COMMUNICATION, CONTACT_POINT, HUMAN_NAME, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface RELATED_PERSON {
  id?: string;
  identifiers?: IDENTTIFIER
  patientId: string
  relationship?: CODEABLE_CONCEPT[]
  name: HUMAN_NAME[];
  gender?: string;
  active?: boolean
  dob?: string;
  address?: ADDRESS[]
  telecom?: CONTACT_POINT[]
  communication?: COMMUNICATION[]


}

export class RelatedPerson extends ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: RELATED_PERSON) {
    const identifiers: IDENTTIFIER[] = [];
    const getText = (): string => {
      let ret: string = ""
      ret+=`<div>${options.name[0].text}</div>`
      return ret;
    }


    const body = {
      "resourceType": "RelatedPerson",
      "id": options.id,
      "text": {
        "status": "generated",
        "div": getText()
      },
      "identifier": options.identifiers,
      "active": options.active,
      "patient": {
        "reference": `Patient/${options.patientId}`
      },
      "relationship": options.relationship,
      "name": options.name,
      "telecom": options.telecom,
      "gender": options.gender,
      "birthDate": options.dob,
      "address": options.address,
      "communication": options.communication

    }

    return body;
  }
  convertFhirToObject(options: any): RELATED_PERSON {
    let ret: RELATED_PERSON = {
      name: options.name,
      patientId: this.getIdFromReference({ "ref": options.patient.reference, "resourceType": "Patient" })
    };
    if (options.identifiers) {
      ret.identifiers = options.identifiers
    }
    if (options.relationship) {
      ret.relationship = options.relationship
    }
    if (options.gender) {
      ret.gender = options.gender
    }
    if (options.active !== undefined) {
      ret.active = options.active
    }
    if (options.dob) {
      ret.dob = options.birthDate
    }
    if (options.telecom) {
      ret.telecom = options.telecom
    }
    if (options.address) {
      ret.address = options.address
    }
    if (options.communication) {
      ret.communication = options.communication
    }


    return ret;
  }
}

