import { ResourceMaster } from "../../Interfaces";
import { IDENTTIFIER } from "../../config";
import ResourceMain from "../../resources/ResourceMai";

export class TaskBundle extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;

  getFHIR(options: {
    id?: string;
    indentfier: IDENTTIFIER;
    resourceType: "Bundle";
    dateTime: string;
    claim?: any;
    patient?: any;
    communicationRequest?: any;
    communication?:any;
    task: any;
    practitioner?: any[];
    organization?: any[];
    coverage?: any;
    documentReference?: any[];
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
          fullUrl: `Task/${options.task.id}`,
          resource: options.task,
        },
      ],
    };

    if(options.communication){
      body.entry.push(        {
        fullUrl: `Communication/${options.communication.id}`,
        resource: options.communication,
      })
    }

    if(options.patient){
      body.entry.push(        {
        fullUrl: `Patient/${options.patient.id}`,
        resource: options.patient,
      })
    }

    if (options.communicationRequest) {
      body.entry.push({
        fullUrl: `CommunicationRequest/${options.task.id}`,
        resource: options.communicationRequest,
      });
    }

    if (options.coverage) {
      body.entry.push({
        fullUrl: `Coverage/${options.coverage.id}`,
        resource: options.coverage,
      });
    }
    if (options.claim) {
      body.entry.push({
        fullUrl: `Claim/${options.claim.id}`,
        resource: options.claim,
      });
    }
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
    if (options.documentReference && options.documentReference.length > 0) {
      options.documentReference.forEach((el) => {
        body.entry.push({
          fullUrl: `DocumentReference/${el.id}`,
          resource: el,
        });
      });
    }
    return body;
  }
}
