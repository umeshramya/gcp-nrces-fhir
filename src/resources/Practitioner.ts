import { ResourceMaster } from "../Interfaces";

export interface PRACTITIONER {
  id?: string;
  name: string;
  qualification?: string;
  medicalLicenseNumber: string;
  ndhmProfessionalId: string;
}

export class Practitioner implements ResourceMaster {
  getFHIR(options: PRACTITIONER) {
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
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}, ${options.qualification})</div>`,
      },
      identifier: [
        {
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "MD",
                display: options.medicalLicenseNumber,
              },
            ],
          },
          system: "https://doctor.ndhm.gov.in",
          value: options.ndhmProfessionalId,
        },
      ],
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
      medicalLicenseNumber: options.identifier[0].type.coding[0].display,
      ndhmProfessionalId: options.identifier[0].value,
      id: options.id,
    };
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

  // const body = {
  //   "resourceType": "Practitioner",
  //   "id": `${options.id}`,
  //   "meta": {
  //     "versionId": "1",
  //     "lastUpdated": "2019-05-29T14:58:58.181+05:30",
  //     "profile": [
  //       "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner"
  //     ]
  //   },
  //   "text": {
  //     "status": "generated",
  //     "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}, ${options.qualification})</div>`
  //   },
  //   "identifier": [
  //     {
  //       "type": {
  //         "coding": [
  //           {
  //             "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
  //             "code": "MD",
  //             "display": `${options.medicalLicenseNumber}`
  //           }
  //         ]
  //       },
  //       "system": "https://doctor.ndhm.gov.in",
  //       "value": `${options.ndhmProfessionalId}`
  //     }
  //   ],
  //   "name": [
  //     {
  //       "text": `${options.name}`
  //     }
  //   ]
  // }

  // return body;
};
