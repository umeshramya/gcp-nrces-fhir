import { EXTENSION, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface ORGANIZATION {
  id?: string;
  name: string;
  phone: string;
  email: string;
  providerNumber?: string;
  ndhmFacilityNumber?: string;
  extension?:EXTENSION
  identifier?:IDENTTIFIER[]
}

export class Organization extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string>{
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: ORGANIZATION) {
    const identifiers: IDENTTIFIER[] = [];

    if (options.ndhmFacilityNumber) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "PRN",
              display: "Provider number",
            },
          ],
        },
        system: "https://healthid.ndhm.gov.in",
        value: `${options.ndhmFacilityNumber}`,
      };

      identifiers.push(id);
    }

    if (options.providerNumber) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "PRN",
              display: "Provider number",
            },
          ],
        },
        system: "https://www.nicehms.com",
        value: `${options.providerNumber}`,
      };
      identifiers.push(id);
    }
    if(options.identifier && options.identifier.length > 0){
      options.identifier.forEach(el=>{
        identifiers.push(el)
      })
      
    }

    let body = {
      resourceType: "Organization",
      id: `${options.id}`,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}. ph: ${options.phone}, email:<a href=\"mailto:${options.email}\">${options.email}</a></div>`,
      },

      identifier: identifiers,
      name: `${options.name}`,
      telecom: [
        {
          system: "phone",
          value: `${options.phone}`,
          use: "work",
        },
        {
          system: "email",
          value: `${options.email}`,
          use: "work",
        },
      ],
    
    };

    if(options.extension){
      // @ts-ignore
      body.extension = options.extension
    }
    
  

   

    return body;
  }
  convertFhirToObject(options: any): ORGANIZATION {
    const ret: ORGANIZATION = {
      name: options.name,
      phone: options.telecom[0].value,
      email: options.telecom[1].value,
      id: options.id,
    };
    if (options.identifier) {
      const ndhmFacilityNumber: any[] = options.identifier.filter(
        (el: any) => el.system == "https://healthid.ndhm.gov.in"
      );
      if (ndhmFacilityNumber.length > 0) {
        ret.ndhmFacilityNumber = ndhmFacilityNumber[0].value;
      }

      const providerNumber: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com"
      );

      if (providerNumber.length > 0) {
        ret.providerNumber = providerNumber[0].value;
      }

      ret.identifier=options.identifier


    }

    if(options.extension){
      ret.extension= options.extension
    }

    return ret;
  }
}

/**
 * @deprecated
 * @param options
 * @returns
 */
export const OrganizationResource = (options: ORGANIZATION) => {
  const body = new Organization().getFHIR(options);
  return body;
};
