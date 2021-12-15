import { ResourceMaster } from "../Interfaces";

export interface PATIENT {
  id?: string
  name: string
  gender: string
  healthNumber: string
  mobile: string
  dob: string
  MRN: string
  organizationId: string
}



export class Patient implements ResourceMaster {
  getFHIR(options: PATIENT) {

    const body = {
      "resourceType": "Patient",
      "id": `${options.id}`,
      "meta": {
        "versionId": "1",
        "lastUpdated": new Date().toISOString(),
        "profile": [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
        ]
      },
      "text": {
        "status": "generated",
        "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient name - ${options.name},Gender- ${options.gender}</div>`
      },
      "identifier": [
        {
          "type": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                "code": "MR",
                "display": `${options.MRN}`,

              }
            ]
          },
          "system": "https://healthid.ndhm.gov.in",
          "value": `${options.healthNumber}`
        }


      ],
      "name": [
        {
          "text": `${options.name}`
        }
      ],
      "telecom": [
        {
          "system": "phone",
          "value": `${options.mobile}`,
          "use": "mobile"
        }
      ],
      "gender": `${options.gender}`,
      "birthDate": `${options.dob}`,
      "managingOrganization": {
        "reference": `Organization/${options.organizationId}`
      }
    }

    return body;

  }
  convertFhirToObject(options: any): PATIENT {
    let ret: PATIENT = {
      name: options.name[0].text,
      gender: options.gender,
      healthNumber: options.identifier[0].value,
      mobile: options.telecom[0].value,
      dob: options.birthDate,
      MRN: options.identifier[0].type.coding[0].display,
      organizationId: `${options.managingOrganization.reference}`.substring(13),
      id: options.id
    }

    return ret
  }

}


/**
 * @deprecated
 * @param options 
 * @returns 
 */
export const PatientResource = (options: PATIENT) => {
  const body = new Patient().getFHIR(options)
  return body
}


