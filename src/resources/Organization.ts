interface ORGANIZATION {
  id?: string
  name: string
  phone: string
  email: string
  providerNumber?: string
  ndhmFacilityNumber?: string

}

const OrganizationResource = (options: ORGANIZATION) => {

  const body = {
    "resourceType": "Organization",
    "id": `${options.id}`,
    "meta": {
      "profile": [
        "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
      ]
    },
    "text": {
      "status": "generated",
      "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}. ph: ${options.phone}, email:<a href=\"mailto:${options.email}\">${options.email}</a></div>`
    },
    "identifier": [
      {
        "type": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
              "code": "PRN",
              "display": `${options.providerNumber}`
            }
          ]
        },
        "system": "https://facility.ndhm.gov.in",
        "value": `${options.ndhmFacilityNumber}`
      }
    ],
    "name": `${options.name}`,
    "telecom": [
      {
        "system": "phone",
        "value": `${options.phone}`,
        "use": "work"
      },
      {
        "system": "email",
        "value": `${options.email}`,
        "use": "work"
      }
    ]
  }

  return body

}


export { ORGANIZATION, OrganizationResource }