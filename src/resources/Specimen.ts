import { type } from "os";
import { CODEABLE_CONCEPT, CodeDisplay, IDENTTIFIER, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

export interface SPECIMEN {
  id?: string;
  patientId: string;
  recivedDateTime: string;
  collection: { collectedDateTime: string };
  serviceRequestIds:string[]
  /**
   * Specimen type blood serun , or plural fluid , HPR tissue etc
   * */
  type: CODEABLE_CONCEPT;
  identifier?:IDENTTIFIER[]
}
export class Specimen extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: SPECIMEN) {
    const body:any = {
      resourceType: "Specimen",
      id: options.id,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Specimen"],
      },
      text: {
        status: "generated",
        div: options.type.text,
      },
      type: options.type,

      subject: { reference: `Patient/${options.patientId}` },
      receivedTime: options.recivedDateTime,
      collection: options.collection,
      request : options.serviceRequestIds && options.serviceRequestIds.length >0 && options.serviceRequestIds.map(el=>{
        return{ reference: `ServiceRequest/${el}` }
      })
    };

    if(options.identifier){
      body.identifier = options.identifier
    }
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
      id: options.id,
      serviceRequestIds: options.request && options.request.length >0 && options.request.map((el: { reference: any; })=> {
        return this.getIdFromReference({"ref" : el.reference, "resourceType" : "ServiceRequest"})
      })
    };

    if(options.identifier){
      ret.identifier = options.identifier
    }
    return ret;
  }
  statusArray?: Function | undefined;
}
