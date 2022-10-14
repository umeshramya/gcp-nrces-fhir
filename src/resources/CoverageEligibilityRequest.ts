import { CODEABLE_CONCEPT, IDENTTIFIER, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const CoverageEligibilityRequestPurpose = [
  "auth-requirements ",
  "benefits",
  "discovery",
  "validation",
] as const;
type CoverageEligibilityRequestPurpoe =
  typeof CoverageEligibilityRequestPurpose[number];
  interface ENTERER extends MULTI_RESOURCE{
     resource: "Practitioner" | "PractitionerRole"
  }

  interface PROVIDER extends MULTI_RESOURCE{
    resource: "Practitioner" | "PractitionerRole" | "Organization"
  }

  interface ITEM_PROVIDER extends MULTI_RESOURCE{
    resource: "Practitioner" | "PractitionerRole" 
  }

  interface ITEM_FACILITY extends MULTI_RESOURCE{
    resource: "Location" | "Organization" 
  }

interface ITEM{
  category?:CODEABLE_CONCEPT;
  productOrService:CODEABLE_CONCEPT;
  modifier ? :CODEABLE_CONCEPT[];
  provider: ITEM_PROVIDER
  facility: ITEM_FACILITY
  diagnosis:{
    diagnosis:CODEABLE_CONCEPT
    diagnosisReference:`Condtion/${string}`
  }
}

export interface COVERAGE_ELIGIBILITY_REQUEST {
  id?: string;
  text: string;
  identifier: IDENTTIFIER;
  priority: CODEABLE_CONCEPT;
  purpose: CoverageEligibilityRequestPurpoe;
  patientId: string;
  createdDateTime: string;
  enterer :ENTERER
  provider : PROVIDER
  insurerOrganizationId : string
  locationId : string
  coverageId:string
  item : ITEM
  detail ?: {
    reference : string
  }
  
}

export class CoverageEligibilityRequest
  extends ResourceMain
  implements ResourceMaster
{
  getFHIR(options: COVERAGE_ELIGIBILITY_REQUEST) {
    const getText = (): string => {
      let ret: string = "";
      ret += options.text;
      return ret;
    };
    const body = {
      resourceType: "CoverageEligibilityRequest",
      id: options.id,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityRequest",
        ],
      },
      language: "en",
      text: {
        status: "generated",
        div: getText(),
      },
      identifier: options.identifier,
      priority: options.priority,
      purpose: options.purpose,
      patient: {
        reference: `Patient/${options.patientId}`,
      },
      created: options.createdDateTime,
      enterer: options.enterer,
      provider : options.provider,
      insurer : {
        reference: `Organization/${options.insurerOrganizationId}`,
      },
      facility :{
        reference: `Location/${options.locationId}`,
      },
      insurance:{
        reference: `Coverage/${options.coverageId}`,
      },
      item:options.item,
      detail : options.detail
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;

  Purpose = (): CoverageEligibilityRequestPurpoe[] => {
    return CoverageEligibilityRequestPurpose.map((el) => el);
  };
}
