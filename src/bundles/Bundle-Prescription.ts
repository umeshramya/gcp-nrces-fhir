import { COMPOSITOIN, DOCUMENT_BUNDLE } from "..";
import { Bundle, BundleInterface } from "./Bundle";

export class PrescriptionBundle extends Bundle implements BundleInterface {
  constructor() {
    super("PrescriptionRecord")
  }
  update(options: any) {
    throw new Error("Method not implemented.");
  }


  // "papersize" : "a5"
  async create(options: {
     compositionObj: COMPOSITOIN; 
     documentBundle:DOCUMENT_BUNDLE; 
     medicationRequest: any,
     papersize:string, 
     headerbase64Image : string
     qrCode?:string
     esign ?: {imageBase64 : string, nameLine1 : string, nameLine2? : string} 

    
    }) {
    this.clearEntries();
    this.setSectionEntries("MedicationRequest", options.medicationRequest.id);
    options.compositionObj.documentDatahtml= options.medicationRequest.text.div
    options.compositionObj.section = this.sectionEntries as any;
     await this.createComposition(options.compositionObj)
     this.setBundleEntries("MedicationRequest", options.medicationRequest.id, options.medicationRequest)

     
    await this.createDocumentRefernce({
      "resource" : {
           "patientId" : this.patient.Obj.id || "",
           "patient" : this.patient.Obj,
           "pdf" : "",
           "status" : "current",
           "title" : "Prescription",
           "docStatus" : options.compositionObj.status,
           "code" : [{"display" : "Prescription", "system" : "http://snomed.info/sct"}],
         },
         "headerbase64Image" : options.headerbase64Image,
         "html" : this.composition.data.text.div,
         "papersize" : options.papersize,
         "qrCode" : options.qrCode ? options.qrCode : undefined,
         "esign" : options.esign ? options.esign : undefined
    })
      

     this.setBundleEntries("DocumentReference", this.documentReference.data.id, this.documentReference.data)
    await this.createBundle(options.documentBundle)
  }

 

}
