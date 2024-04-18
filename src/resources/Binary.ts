import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface BINARY {
  id?: string;
  data: string;
}

export class Binary extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: BINARY) {
    const body = {
      resourceType: "Binary",
      id: options.id,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Binary"],
      },
      contentType: "application/pdf",
      data: options.data,
    };
    return body;
  }
  convertFhirToObject(options: any): BINARY {
    let ret: BINARY = {
      id: options.id,
      data: options.data,
    };
    return ret;
  }
}
