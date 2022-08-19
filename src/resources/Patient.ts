import { coding, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface PATIENT {
  id?: string;
  internalId?: string;
  name: string;
  gender: string;
  healthNumber?: string;
  phrAddress?: string;
  mobile: string;
  dob: string;
  MRN?: string;
  organizationId: string;
}

export class Patient extends ResourceMain implements ResourceMaster {
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
