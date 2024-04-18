import { CODING, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

type RelationshipCode = "FTH" | "MTH" | "SPS" | "HUSB" | "SON" | "DAU" | "BRO" | "SIS" | "UNCLE" | "AUNT" | "FRIEND";
type RelationshipDisplay = "Father" | "Mother" | "Wife" | "Husband" | "Son" | "Daughter" | "Brother" | "Sister" | "Uncle" | "Aunt" | "Friend";



interface Relationship {
  relationship: {
    code: RelationshipCode;
    display: RelationshipDisplay;
  };
}

interface PATIENT_CONTACT {
  relationship: {
    coding: {
      system: "http://terminology.hl7.org/CodeSystem/v2-0131";
      code: RelationshipCode;
      display:RelationshipDisplay
    }[];
  }[];
  name: {
    use: string;
    family: string;
    given: string[];
  };
  telecom: 
    {
      "system": string,
      "value": string,
      "use": string
    }[]

}




const relationships: Relationship[] = [
  { relationship: { code: "FTH", display: "Father" } },
  { relationship: { code: "MTH", display: "Mother" } },
  { relationship: { code: "SPS", display: "Wife" } },
  { relationship: { code: "HUSB", display: "Husband" } },
  { relationship: { code: "SON", display: "Son" } },
  { relationship: { code: "DAU", display: "Daughter" } },
  { relationship: { code: "BRO", display: "Brother" } },
  { relationship: { code: "SIS", display: "Sister" } },
  { relationship: { code: "UNCLE", display: "Uncle" } },
  { relationship: { code: "AUNT", display: "Aunt" } },
  { relationship: { code: "FRIEND", display: "Friend" } }
];

export { Relationship, relationships, RelationshipCode, RelationshipDisplay , PATIENT_CONTACT};

export interface PATIENT {
  id?: string;
  internalId?: string;
  facilityId?:number
  name: string;
  gender: string;
  healthNumber?: string;
  phrAddress?: string;
  mobile: string;
  dob: string;
  MRN?: string;
  organizationId: string;
  identifier?:IDENTTIFIER[]
  contact?:PATIENT_CONTACT[]
}

export class Patient extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string>{
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: PATIENT) {
    const identifiers: IDENTTIFIER[] = [];
    if (options.internalId) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://www.nicehms.com/internalid",
        value: `${options.internalId}`,
      };

      identifiers.push(id);
    }

    if (options.facilityId) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://www.nicehms.com/facilityId",
        value: `${options.facilityId}`,
      };

      identifiers.push(id);
    }


    if (options.healthNumber) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://healthid.ndhm.gov.in/health-number",
        value: `${options.healthNumber}`,
      };

      identifiers.push(id);
    }

    if (options.phrAddress) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://healthid.ndhm.gov.in/phr-address",
        value: `${options.phrAddress}`,
      };

      identifiers.push(id);
    }
    if(options.identifier && options.identifier.length >0){
      identifiers.push(...options.identifier)
    }

    if (options.MRN) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://www.nicehms.com",
        value: `${options.MRN}`,
      };
      identifiers.push(id);
    }

    const body = {
      resourceType: "Patient",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"],
      },
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient name - ${options.name},Gender- ${options.gender}</div>`,
      },
      identifier: identifiers,
      name: [
        {
          text: `${options.name}`,
        },
      ],
      telecom: [
        {
          system: "phone",
          value: `${options.mobile}`,
          use: "mobile",
        },
      ],
      gender: `${options.gender}`,
      birthDate: `${options.dob}`,
      managingOrganization: {
        reference: `Organization/${options.organizationId}`,
      },
      contact: options.contact

    };

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

    if (options.identifier) {
      const mrn: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com"
      );

      if (mrn.length > 0) {
        ret.MRN = mrn[0].value;
      }

      const internalId: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com/internalid"
      );

      

      if (internalId.length > 0) {
        ret.internalId = internalId[0].value;
      }

      const facilityId: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com/facilityId"
      );

      if (facilityId.length > 0) {
        ret.facilityId = facilityId[0].value;
      }
      

      const healthNumber: any[] = options.identifier.filter(
        (el: any) => el.system == "https://healthid.ndhm.gov.in/health-number"
      );

      if (healthNumber.length > 0) {
        ret.healthNumber = healthNumber[0].value;
      }

      const phrAddress: any[] = options.identifier.filter(
        (el: any) => el.system == "https://healthid.ndhm.gov.in/phr-address"
      );

      if (phrAddress.length > 0) {
        ret.phrAddress = phrAddress[0].value;
      }

      ret.identifier= options.identifier.filter((el:IDENTTIFIER)=>{
         if(el.system !=  "https://healthid.ndhm.gov.in/phr-address" 
         && el.system !=  "https://healthid.ndhm.gov.in/health-number"
         &&   el.system != "https://www.nicehms.com/internalid"
         &&  el.system != "https://www.nicehms.com"){
          return el
         }
      })
      if(options.contact){
        ret.contact= options.contact;
      }
    }

    return ret;
  }
}

/**
 * @deprecated
 * @param options
 * @returns
 */
export const PatientResource = (options: PATIENT) => {
  const body = new Patient().getFHIR(options);
  return body;
};








