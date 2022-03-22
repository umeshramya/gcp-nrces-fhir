import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";

export class PrescriptionBundle extends BundelMain implements ResourceMaster {
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }

    const bundlemain = await new BundelMain().getentries(
      options.composition,
      options.pdfData
    );

    const entry = bundlemain.entry;
    // write code to pusj medication trequest here
    const sectionEntries = bundlemain.compositionObj.section[0].entry as {
      reference: string;
      type: resourceType;
    }[];

    const medicationRequestId = this.getIdFromReference({
      ref: sectionEntries.filter((el) => el.type == "MedicationRequest")[0]
        .reference,
      resourceType: "MedicationRequest",
    });

    const medicationRequest = await new GcpFhirCrud()
      .getFhirResource(medicationRequestId, "MedicationRequest")
      .then((res) => res.data);

    entry.push({
      fullUrl: `MedicationRequest/${medicationRequestId}`,
      resource: medicationRequest,
    });
    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: "2020-07-09T15:32:26.605+05:30",
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
      identifier: options.identifier,
      type: "document",
      timestamp: new Date().toISOString,
      entry: entry,
    };

    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}
