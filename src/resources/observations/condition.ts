import {RseourceMaster} from "../../Interfaces/index"
import { CodeDisplay } from "../../config";

export interface CONDITION {
  id?:string
  text:string;
  condtion:CodeDisplay[];
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
      "coding":options.condtion,
      "text": options.text
    },
    "subject": {
      "reference": `Patient/${options.patientId}`
    }
  };

  return body;
    
  }
  convertFhirToObject(options: any): CONDITION {
    // {
    //   code: { coding: [ [Object] ], text: 'Chest Pain for Evaluvation' },
    //   id: '80cde551-455e-4e7d-8190-02296903aebf',
    //   meta: {
    //     lastUpdated: '2021-12-11T17:50:33.275482+00:00',
    //     profile: [ 'https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition' ],
    //     versionId: 'MTYzOTI0NTAzMzI3NTQ4MjAwMA'
    //   },
    //   resourceType: 'Condition',
    //   subject: { reference: 'Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5' },
    //   text: { div: 'Chest Pain for Evaluvation', status: 'generated' }
    // }
    let ret:CONDITION={
      "id" : options.id,
      "patientId" :`${options.subject.reference}`.substring(8),
      "condtion" : options.code.coding,
      "text" : options.code.text,
    }

    return ret
  }








}
