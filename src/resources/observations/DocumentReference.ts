import { CodeDisplay } from "../../config";
import { ResourceMaster } from "../../Interfaces";
import { PATIENT } from "../Patient";

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
  patient: PATIENT
  pdf: string
  code: CodeDisplay[]
  title: string
}


export class DocumentReference implements ResourceMaster {
  getFHIR(options: DOCUMENT_REFERENCE) {
    const body = {
      resourceType: "DocumentReference",
      id: options.id || undefined,
      meta: {
        profile: [
          "httcps://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentReference",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Narrative with Details</b></p><p><b>id</b>: 1</p><p><b>status</b>: ${options.status}</p><p><b>docStatus</b>: ${options.docStatus}</p><p><b>subject</b>: ${options.patient.MRN} ${options.patient.name}</p><p><b>type</b>: ${options.title}</p><p><b>content</b>: Dr. PQR</p></div>`,
      },
      status: options.status,
      docStatus: options.docStatus,
      type: {
        coding: options.code,
        text: options.title,
      },
      subject: { reference: `Patient/${options.patient.id}` },
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
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

}



