import { CODEABLE_CONCEPT, IDENTTIFIER, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const CoverageEligibilityRequestStatus = [	"active" , "cancelled" , "draft" , "entered-in-error"] as const

type CoverageEligibilityRequestStatus = typeof CoverageEligibilityRequestStatus[number]
const CoverageEligibilityRequestPurpose = [
  "auth-requirements",
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
  }[]
}

export interface COVERAGE_ELIGIBILITY_REQUEST {
  id?: string;
  status : CoverageEligibilityRequestStatus
  text: string;
  identifier: IDENTTIFIER;
  priority: CODEABLE_CONCEPT;
  purpose: CoverageEligibilityRequestPurpoe;
  patientId: string;
  createdDateTime: string;
  enterer :ENTERER
  provider : PROVIDER
  insurerOrganizationId : string
  /**
   * ward
   */
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
  getFHIR(options: COVERAGE_ELIGIBILITY_REQUEST):any {
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

    return body
  }
  convertFhirToObject(options: any):COVERAGE_ELIGIBILITY_REQUEST {
    let ret:COVERAGE_ELIGIBILITY_REQUEST={
      id: options.id,
      status: options.status,
      text: options.text,
      identifier: options.identifier,
      priority: options.priority,
      purpose: options.purpose,
      patientId: this.getIdFromReference({"ref" : options.patient.reference, "resourceType" : "Patient"}),
      createdDateTime: options.created,
      enterer: options.enterer,
      provider: options.provider,
      insurerOrganizationId: this.getIdFromReference({"ref" : options.insurer.reference, "resourceType" : "Organization"}),
      locationId: this.getIdFromReference({"ref" : options.facility.reference, "resourceType" : "Location"}),
      coverageId: this.getIdFromReference({"ref" : options.insurance.reference, "resourceType" : "Coverage"}),
      item: options.item
    }

    if(options.detail){
      ret.detail= options.detail
    }
    return ret
  }
  statusArray =():CoverageEligibilityRequestStatus[]=>{
    return CoverageEligibilityRequestStatus.map(el=>el)
  }

  Purpose = (): CoverageEligibilityRequestPurpoe[] => {
    return CoverageEligibilityRequestPurpose.map((el) => el);
  };
}
