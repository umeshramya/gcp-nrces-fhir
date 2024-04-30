import { text } from "stream/consumers";
import { CODEABLE_CONCEPT, CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

export const documentStatusArrey = ["current", "superseded", "entered-in-error"
] as const
type DocumentStatus = typeof documentStatusArrey[number]

export const documentDocStatusArrey = ["preliminary", "final", "amended", "entered-in-error"
] as const
type DocumentDocStatus = typeof documentDocStatusArrey[number]

export interface DOCUMENT_REFERENCE {
  id?: string;
  status: DocumentStatus;
  docStatus: DocumentDocStatus;
  type:CODEABLE_CONCEPT
  patientId: string
  pdf: string
  title: string
  text?:string
}


export class DocumentReference extends ResourceMain implements ResourceMaster {
  async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: DOCUMENT_REFERENCE) {
    const body = {
      resourceType: "DocumentReference",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentReference",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${options.text || options.title}</div>`,
      },
      status: options.status,
      docStatus: options.docStatus,
      type: options.type,
      subject: { reference: `Patient/${options.patientId}` },
      content: [
        {
          attachment: {
            contentType: "application/pdf",
            language: "en-IN",
            data: options.pdf,
            title: options.title,
            creation: new Date().toISOString(),
          },
        },
      ],
    };


    return body;
  }
  convertFhirToObject(options: any):DOCUMENT_REFERENCE {
    let ret:DOCUMENT_REFERENCE={
      id: options.id,
      status: options.status,
      docStatus: options.docStatus,
      type: options.type,
      patientId: this.getIdFromReference({"ref" : options.subject.reference, "resourceType" : "Patient"}),
      pdf: options.content[0].attachment.data,
      title: options.content[0].attachment.title, 
      text : options.text.div
    }

    return ret
    
  }

}



