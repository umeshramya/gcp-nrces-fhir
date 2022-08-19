import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import { MedicationRequest } from "../MedicationRequest";
import { Condition } from "../Condition";

export class PrescriptionBundle extends BundelMain implements ResourceMaster {
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com/bundle",
        value: options.identifier.value,
      };
    }

    const bundlemain = await new BundelMain(this.gcpCredetials, this.gcpPath).getentries(
      options.composition,
      options.pdfData
    );

    const entry = bundlemain.entry;
   
    const sectionEntries = bundlemain.compositionObj.section[0].entry as {
      reference: string;
      type: resourceType;
    }[];

     // write code to pusj medication trequest here
    const medicationRequestId = this.getIdFromReference({
      ref: sectionEntries.filter((el) => el.type == "MedicationRequest")[0]
        .reference,
      resourceType: "MedicationRequest",
    });

    const gcpFhirCrud = new GcpFhirCrud(this.gcpCredetials, this.gcpPath)
    const medicationRequest = new MedicationRequest().bundlify(await gcpFhirCrud
      .getFhirResource(medicationRequestId, "MedicationRequest")
      .then((res) => res.data));

    entry.push({
      fullUrl: `MedicationRequest/${medicationRequestId}`,
      resource: medicationRequest,
    });

    // Get Condition
    const conditionArray = sectionEntries.filter(el=> el.type == "Condition")
    if(conditionArray.length >0){
      const conditionId = this.getIdFromReference({
        "ref" : conditionArray[0].reference,
        resourceType : "Condition"
      })

      
      const condition = await gcpFhirCrud.getFhirResource(conditionId, "Condition").then(res=>res.data)
      entry.push({
        fullUrl: `Condition/${conditionId}`,
        resource: new Condition().bundlify(condition),
      })
    }


    // Binary
    const binaryArray = sectionEntries.filter(el=> el.type == "Binary")
    if(binaryArray.length > 0){
      const binaryId = this.getIdFromReference({
        "ref" : binaryArray[0].reference,
        "resourceType" : "Binary"
      })
      const binary = await gcpFhirCrud.getFhirResource(binaryId, "Binary").then(res=>res.data);
      entry.push({
        fullUrl: `Binary/${binaryId}`,
        resource: binary,
      })
    }


   const  filteredEntry = entry.filter(el =>el.resource.resourceType !== "DocumentReference")

 

    const body = {
      "resourceType": "Bundle",
      "id": options.id,
      "meta": {
        "lastUpdated": new Date().toISOString()
      },
      "identifier": {
        "system": "https://www.nicehms.com/bundle",
        "value": options.id
      },
      "type": "document",
      "timestamp": options.composition.date,
      "entry": filteredEntry
    }
    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}




