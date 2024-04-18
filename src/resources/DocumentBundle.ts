import { v4 as uuidv4 } from 'uuid'
import { ResourceMaster } from "../Interfaces";
import ResourceMain from './ResourceMai';


export interface DOCUMENT_BUNDLE {
  date: string;
  id?: string;
  practitionerId: string;
  signJpegbase64?: string;
  identifier?: string;
  entry : any [];
  signedDate:string
}

export class DocumentBundle extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string>{
    throw new Error('Method not implemented.');
  }
  statusArray?: Function | undefined;
  getFHIR(options: DOCUMENT_BUNDLE): any {
    const body = {
      resourceType: "Bundle",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle",
        ],
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
            code: "V",
            display: "very restricted",
          },
        ],
      },
      identifier: {
        system: "http://hip.in",
        value: options.identifier || uuidv4(),
      },
      type: "document",
      timestamp: options.date,
      
      entry: options.entry,

      signature: {
        type: [
          {
            system: "urn:iso-astm:E1762-95:2013",
            code: "1.2.840.10065.1.12.1.1",
            display: "Author's Signature",
          },
        ],
        when: options.signedDate,
        who: {
          reference: `Practitioner/${options.practitionerId}`,
        },
        sigFormat: "image/jpeg",
        data: options.signJpegbase64,
      },
    };

    return body
  }
  convertFhirToObject(options:any):DOCUMENT_BUNDLE {
    let ret:DOCUMENT_BUNDLE={
      date: options.timestamp,
      signedDate:options.signature.when,
      practitionerId: `${options.signature.who.reference}`.substring(13),
      entry: options.entry,
      id:options.id,
      identifier :options.identifier.value,
      signJpegbase64 : options.signature.data
    }
    return ret
  }

 
}

