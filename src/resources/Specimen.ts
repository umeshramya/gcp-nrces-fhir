import { type } from "os";
import { CODEABLE_CONCEPT, CodeDisplay, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

export interface SPECIMEN {
  id?: string;
  patientId: string;
  recivedDateTime: string;
  collection: { collectedDateTime: string; collectedPeriod?: PERIOD };
  /**
   * Specimen type blood serun , or plural fluid , HPR tissue etc
   * */
  type: CODEABLE_CONCEPT;
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
        div: options.type.text,
      },
      type:options.type,
      subject: { reference: `Patient/${options.patientId}` },
      receivedTime: options.recivedDateTime,
      collection: options.collection,
    };
    return body;
  }
  convertFhirToObject(options: any) {
    let ret: SPECIMEN = {
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      recivedDateTime: options.receivedTime,
      collection: options.collection,
      type: options.type,
    };
    return ret;
  }
  statusArray?: Function | undefined;
}
