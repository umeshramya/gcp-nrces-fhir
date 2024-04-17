import { ResourceMaster } from "../Interfaces/index"
import { CodeDisplay } from "../config";
import ResourceMain from "./ResourceMai";
import {convert } from "html-to-text"

export interface CONDITION {
  id?: string
  text: string;
  title:string;
  condtion: CodeDisplay[];
  patientId: string;
}

export class Condition extends  ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
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

  bundlify (resource:any):any{
    const copy=super.bundlify(resource)
    copy.code.text =convert( resource.text.div)
    return copy
  }

}
