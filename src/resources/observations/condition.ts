import {RseourceMaster} from "../../Interfaces/index"

export interface CONDITION {
  id?:string
  text:string;
  snoemedCode?:string;
  snowmedDisplay?:string;
  patientId:string;
}

export class Condition implements RseourceMaster{
  getFHIR(options: CONDITION):any {

  const body = {
    "resourceType": "Condition",
    "id": options.id || undefined,
    "meta": {
      "profile": [
        "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
      ]
    },
    "text": {
      "status": "generated",
      "div": options.text
    },
    "code": {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": options.snoemedCode,
          "display": options.snowmedDisplay
        }
      ],
      "text": options.text
    },
    "subject": {
      "reference": `Patient/${options.patientId}`
    }
  };

  return body;
    
  }
  convertFhirToObject(options: any): CONDITION {
    let ret:CONDITION={
      "id" : options.id,
      "patientId" :`${options.subject.reference}`.substring(7),
      "snoemedCode" :options.code.coding[0].code,
      "text" : options.text,
      "snowmedDisplay" : options.code.coding[0].display
    }

    return ret
  }








}
