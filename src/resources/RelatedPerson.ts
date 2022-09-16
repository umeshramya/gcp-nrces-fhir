import { ADDRESS, CODEABLE_CONCEPT, coding, CONTACT_POINT, HUMAN_NAME, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface PATIENT {
  id?: string;
  identifiers?:IDENTTIFIER
  patientId:string
  relationship?:CODEABLE_CONCEPT[]
  name: HUMAN_NAME[];
  gender?: string;
  active?:boolean
  mobile: string;
  dob?: string;
  address?:ADDRESS[]
  telecom?:CONTACT_POINT[]


}

export class RelatedPerson extends ResourceMain implements ResourceMaster {
  getFHIR(options: PATIENT) {
    const identifiers: IDENTTIFIER[] = [];
    const getText=():string=>{
      let ret:string=""
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
      "relationship":options.relationship,
      "name": options.name,
      "telecom": options.telecom,
      "gender": options.gender,
      "birthDate": options.dob,
      "address": options.address
    }

    return body;
  }
  convertFhirToObject(options: any): PATIENT {
    let ret: PATIENT = {
      name: options.name[0].text,
      gender: options.gender,

      mobile: options.telecom[0].value,
      dob: options.birthDate,
      organizationId: `${options.managingOrganization.reference}`.substring(13),
      id: options.id,
    };


    return ret;
  }
}

