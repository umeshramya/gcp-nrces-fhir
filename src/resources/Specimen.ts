import { type } from "os";
import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

export interface SPECIMEN {
  id?: string;
  patientId: string;
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
        coding: options.type,
      },
      subject: { reference: `Patient/${options.patientId}` },
      receivedTime: options.recivedDateTime,
      collection: { collectedDateTime: options.collectedDateTime },
    };
  }
  convertFhirToObject(options: any) {
    let ret: SPECIMEN = {
      patientId: this.getIdFromReference({
        "ref": options.subject.reference, "resourceType": "Patient"
      }),
      recivedDateTime: "",
      collectedDateTime: "",
      type: []
    }
    return ret;
  }
  statusArray?: Function | undefined;
}
