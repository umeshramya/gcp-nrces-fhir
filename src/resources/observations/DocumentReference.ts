import { ResourceMaster } from "../../Interfaces";

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
  patientId: string;
  pdf: string
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
        div: `<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Narrative with Details</b></p><p><b>id</b>: 1</p><p><b>status</b>: current</p><p><b>docStatus</b>: final</p><p><b>subject</b>: ABC</p><p><b>type</b>: Laboratory Report</p><p><b>content</b>: Dr. PQR</p></div>`,
      },
      status: options.status,
      docStatus: options.docStatus,
      type: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "4241000179101",
            display: "Laboratory report",
          },
        ],
        text: "Laboratory report",
      },
      subject: { reference: `Patient/${options.patientId}` },
      content: [
        {
          attachment: {
            contentType: "application/pdf",
            language: "en-IN",
            data: options.pdf,
            title: "Laboratory report",
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



