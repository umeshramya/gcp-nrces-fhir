import { IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface PRACTITIONER {
  id?: string;
  name: string;
  qualification?: string;
  medicalLicenseNumber?: string;
  ndhmProfessionalId?: string;
  providerNumber?: string;
  orgnizationId: string;
}

export class Practitioner extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string>{
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: PRACTITIONER) {
    const identifiers: IDENTTIFIER[] = [];
    if (options.ndhmProfessionalId) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MD",
              display: "Medical License number",
            },
          ],
        },
        system: "https://doctor.ndhm.gov.in",
        value: options.ndhmProfessionalId,
      };

      identifiers.push(id);
    }

    if (options.medicalLicenseNumber) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MD",
              display: "Medical License number",
            },
          ],
        },
        system: "https://www.nmc.org.in/",
        value: options.medicalLicenseNumber,
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

    identifiers.push({
      type: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "PRN",
            display: "Provider number",
          },
        ],
      },
      system: "https://www.nicehms.com/organizationId",
      value: `${options.orgnizationId}`,
    });

    const body = {
      resourceType: "Practitioner",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}, ${
          options.qualification || ""
        })</div>`,
      },
      identifier: identifiers,
      name: [
        {
          text: `${options.name} ${options.qualification || ""}`,
        },
      ],
    };

    return body;
  }

  convertFhirToObject(options: any): PRACTITIONER {
    let ret: PRACTITIONER = {
      name: options.name[0].text,
      id: options.id,
      orgnizationId: this.getIdentifers(
        "https://www.nicehms.com/organizationId",
        options
      ),
    };
    if (options.identifier) {
      const medicalLicenseNumber: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nmc.org.in/"
      );
      if (medicalLicenseNumber.length > 0) {
        ret.medicalLicenseNumber = medicalLicenseNumber[0].value;
      }

      const ndhmProfessionalId: any[] = options.identifier.filter(
        (el: any) => el.system == "https://healthid.ndhm.gov.in"
      );

      if (ndhmProfessionalId.length > 0) {
        ret.ndhmProfessionalId = ndhmProfessionalId[0].value;
      }

      const providerNumber: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com"
      );
      if (providerNumber.length) {
        ret.providerNumber = providerNumber[0].value;
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
export const PractitionerResource = (options: PRACTITIONER) => {
  const body = new Practitioner().getFHIR(options);
  return body;
};
