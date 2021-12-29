import { ResourceMaster } from "../Interfaces"
import ResourceMain from "./ResourceMai"

const EncounterStatusArray = ["planned", "arrived", "triaged", "in-progress", "onleave", "finished", "cancelled", "entered-in-error", "unknown"] as const
const EncounterClassArray = [
  { code: "AMB", display: "ambulatory" },
  { code: "FLD", display: "Field" },
  { code: "HH", display: "Home Health" },
  { code: "IMP", display: "in-patient" },
  { code: "EMER", display: "emergency" },
  { code: "ACUTE", display: "inpatient acute" },
  { code: "NONAC", display: "inpatient non-acute" },
  { code: "OBSENC", display: "observation encounter" },
  { code: "PRENC", display: "pre-admission" },
  { code: "VR", display: "virtual" },
] as const

const EncounterHospitalizationDischargeDispositionArray = [
  { code: "home", display: "home" },
  { code: "alt-home", display: "Alternative home" },
  { code: "other-hcf", display: "Other healthcare facility" },
  { code: "hosp", display: "Hospice" },
  { code: "long", display: "Long-term care" },
  { code: "aadvice", display: "Left against advice" },
  { code: "exp", display: "Expired" },
  { code: "psy", display: "Psychiatric hospital" },
  { code: "rehab", display: "Rehabilitation" },
  { code: "smf", display: "Skilled nursing facility" },
  { code: "oth", display: "Other" },
] as const

type EncounterStatus = typeof EncounterStatusArray[number]
type EncounterClass = typeof EncounterClassArray[number]
type EncounterHospitalizationDischargeDisposition = typeof EncounterHospitalizationDischargeDispositionArray[number]


interface ENCOUNTER {
  id?: string
  text: string
  status: EncounterStatus
  identifier: string
  class: EncounterClass
  patientId: string
  startDate: string
  endDate: string
  dischargeDisposition: EncounterHospitalizationDischargeDisposition

}

export class Encounter extends ResourceMain implements ResourceMaster {

  getFHIR(options: ENCOUNTER) {

    const body = {
      "resourceType": "Encounter",
      "id": options.id,
      "meta": {
        "lastUpdated": new Date().toISOString(),
        "profile": [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"
        ]
      },
      "text": {
        "status": "generated",
        "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.text} </div>`
      },
      "identifier": [
        {
          "system": "https://ndhm.in",
          "value": options.identifier
        }
      ],
      "status": options.status,
      "class": {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": options.class.code,
        "display": options.class.display
      },
      "subject": {
        "reference": `Patient/${options.patientId}`
      },
      "period": {
        "start": options.startDate,
        "end": options.endDate
      },
      "hospitalization": {
        "dischargeDisposition": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition",
              "code": options.dischargeDisposition.code,
              "display": options.dischargeDisposition.display
            }
          ],
          "text": "Discharged to Home Care"
        }
      }
    }

    return body
  }



  convertFhirToObject(options: any): ENCOUNTER {
    let ret: ENCOUNTER = {
      text: this.getDivText(options.text.div),
      status: options.status,
      identifier: options.identifier[0].value,
      class: { "code": options.class.code, "display": options.class.display },
      patientId: `${options.subject.reference}`.substring(8),
      startDate: options.period.start,
      endDate: options.period.end,
      dischargeDisposition: { "code": options.hospitalization.dischargeDisposition.coding[0].code, "display": options.hospitalization.dischargeDisposition.coding[0].display },
      id: options.id

    }

    return ret;
  }


}


/**
 * @deprecated
 * @param options 
 * @returns 
 */
const EncounterResource = (options: ENCOUNTER) => {
  const encounter = new Encounter();
  return encounter.getFHIR(options)
}

export { ENCOUNTER, EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray }
export type { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition }






// const body1 = {
//   "resourceType": "Encounter",
//   // "id": "example-01",
//   "meta": {
//     "lastUpdated": "2020-07-09T14:58:58.181+05:30",
//     "profile": [
//       "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"
//     ]
//   },
//   "text": {
//     "status": "generated",
//     "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"> Admitted to Cardiac Unit,UVW Hospital between June 28 and July 9 2020</div>"
//   },
//   "identifier": [
//     {
//       "system": "https://ndhm.in",
//       "value": "S100"
//     }
//   ],
//   "status": "finished",
//   "class": {
//     "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
//     "code": "IMP",
//     "display": "inpatient encounter"
//   },
//   "subject": {
//     "reference": "Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5"
//   },
//   "period": {
//     "start": "2020-04-20T15:32:26.605+05:30",
//     "end": "2020-05-01T15:32:26.605+05:30"
//   },
//   "hospitalization": {
//     "dischargeDisposition": {
//       "coding": [
//         {
//           "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition",
//           "code": "home",
//           "display": "Home"
//         }
//       ],
//       "text": "Discharged to Home Care"
//     }
//   }
// }









