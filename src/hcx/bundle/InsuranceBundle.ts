import { ResourceMaster } from "../../Interfaces";
import { IDENTTIFIER } from "../../config";
import ResourceMain from "../../resources/ResourceMai";

export class InsurancePlanBundle
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: { id?: string; InsurancePlan: any; Organization?: any , dateTime?:string}) {
    const ret = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/InsurancePlanBundle",
        ],
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
            code: "V",
            display: "very restricted",
          },
        ],
      },
      type: "collection",
      timestamp: options.dateTime || new Date().toISOString(),
      entry: [
        {
          fullUrl: `Claim/${options.InsurancePlan.id}`,
          resource: options.InsurancePlan,
        },
,
      ],
    };

    if (options.Organization) {
      ret.entry.push({
        fullUrl: `Claim/${options.Organization.id}`,
        resource: options.Organization,
      });
    }
  }
}
