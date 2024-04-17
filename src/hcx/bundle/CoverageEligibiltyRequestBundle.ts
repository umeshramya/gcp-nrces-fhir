import { ResourceMaster } from "../../Interfaces";
import { IDENTTIFIER } from "../../config";
import ResourceMain from "../../resources/ResourceMai";


export class CoverageEligibilityRequestBundle
  extends ResourceMain
  implements ResourceMaster
{
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
    CoverageEligibilityRequest: any;
    patient: any;
    practitioner?: any[];
    organization: any[];
    location?: any;
    coverage: any;
    condition?:any[]
    hcx : "nhcx" | "swasth"
  }): any {


    const body = {
      resourceType: "Bundle",
      id: options.id || undefined,
      meta: {
        profile: options.hcx == "nhcx" ? [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityRequestBundle",
        ] : [
          "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequestBundle.html",
        ],
      },
      identifier: options.indentfier,
      type: "collection",
      timestamp: options.dateTime || new Date().toISOString(),
      entry: [
        {
          fullUrl: `CoverageEligibilityRequest/${options.CoverageEligibilityRequest.id}`,
          resource: options.CoverageEligibilityRequest,
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
    if (options.organization && options.organization.length  > 0) {
      options.organization.forEach((el) => {
        body.entry.push({
          fullUrl: `Organization/${el.id}`,
          resource: el,
        });
      });
    }

    if (options.location) {
      body.entry.push({
        fullUrl: `Location/${options.location.id}`,
        resource: options.location,
      });
    }

    if(options.condition && options.condition.length > 0){
      options.condition.forEach(el=>{
        body.entry.push({
          fullUrl: `Condition/${el.id}`,
          resource: el,
        })
      })
    }

    return body;
  }
}
