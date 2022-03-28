import { type } from "os";
import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

export interface SPECIMEN {
  id?: string;
  patient: PATIENT;
  recivedDateTime: string;
  collectedDateTime: string;
  /**
   * Specimen type blood serun , or plural fluid , HPR tissue etc
   * */
  type: CodeDisplay[];
}
export class Specimen extends ResourceMain implements ResourceMaster {
  getFHIR(options: SPECIMEN) {
    const body = {
      resourceType: "Specimen",
      id: options.id,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Specimen"],
      },
      text: {
        status: "generated",
        div: options.type[0].display,
      },
      type: {
        coding: type,
      },
      subject: { reference: `Patient/${options.patient.id}` },
      receivedTime: options.recivedDateTime,
      collection: { collectedDateTime: options.collectedDateTime },
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}
