import { ResourceMaster } from "../Interfaces/index"
import { CodeDisplay } from "../config";

export interface CONDITION {
  id?: string
  text: string;
  title:string;
  condtion: CodeDisplay[];
  patientId: string;
}

export class Condition implements ResourceMaster {
  getFHIR(options: CONDITION): any {

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
        "coding": options.condtion,
        "text": options.title
      },
      "subject": {
        "reference": `Patient/${options.patientId}`
      }
    };

    return body;

  }
  convertFhirToObject(options: any): CONDITION {

    let ret: CONDITION = {
      "id": options.id,
      "patientId": `${options.subject.reference}`.substring(8),
      "condtion": options.code.coding,
      "text": options.text.div,
      "title" : options.code.text

    }

    return ret
  }

}
