import { ResourceMaster } from "../../Interfaces";
import { IDENTTIFIER } from "../../config";
import ResourceMain from "../../resources/ResourceMai";

export class ClaimRequestBundle extends ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;

  getFHIR(options: {
    id?: string;
    indentfier: IDENTTIFIER;
    dateTime: string;
    claim: any;
    patient: any;
    practitioner?: any[];
    organization: any[];
    coverage: any;
    documentReference?:any[]
    hcx: "nhcx" | "swasth";
  }): any {
    const body = {
      resourceType: "Bundle",
      id: options.id || undefined,
      meta: {
        profile:
          options.hcx == "nhcx"
            ? ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClaimBundle"]
            : [
                "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-ClaimRequestBundle.html",
              ],
      },
      identifier: options.indentfier,
      type: "collection",
      timestamp: options.dateTime || new Date().toISOString(),
      entry: [
        {
          fullUrl: `Claim/${options.claim.id}`,
          resource: options.claim,
        },
        {
          fullUrl: `Patient/${options.patient.id}`,
          resource: options.patient,
        },

        {
          fullUrl: `Coverage/${options.coverage.id}`,
          resource: options.coverage,
        },
      ],
    };

    if (options.practitioner && options.practitioner.length > 0) {
      options.practitioner.forEach((el) => {
        body.entry.push({
          fullUrl: `Practitioner/${el.id}`,
          resource: el,
        });
      });
    }
    if (options.organization && options.organization.length > 0) {
      options.organization.forEach((el) => {
        body.entry.push({
          fullUrl: `Organization/${el.id}`,
          resource: el,
        });
      });
    }
    if(options.documentReference && options.documentReference.length > 0){
      options.documentReference.forEach(el=>{
        body.entry.push({
          fullUrl: `DocumentReference/${el.id}`,
          resource: el,
        });
      })
    }
    return body;
  }
}
