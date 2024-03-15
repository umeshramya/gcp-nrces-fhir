import { CODEABLE_CONCEPT, EXTENSION, IDENTTIFIER, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

const CoverageEligibilityRequestStatus = [	"active" , "cancelled" , "draft" , "entered-in-error"] as const
export interface INSURANCE {
  id?: string
  focal?: boolean
  coverage: {
    reference: string
  }
  businessArrangement?: string
  extension ?: EXTENSION[]
  modifierExtension?:EXTENSION[]
}


interface SUPPORTING_INFO {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  sequence: number;
  /**
   * Any resource
   */
  information: {"reference" : string};
  appliesToAll?: boolean;
}

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

  type DIAGNOSIS= {
    diagnosisCodeableConcept: CODEABLE_CONCEPT
  } | {diagnosisReference: {
    reference: string;
  }};

interface ITEM{
  category?:CODEABLE_CONCEPT;
  productOrService:CODEABLE_CONCEPT;
  modifier ? :CODEABLE_CONCEPT[];
  provider: ITEM_PROVIDER
  facility: ITEM_FACILITY
  diagnosis:DIAGNOSIS[]
  
}

export type COVERAGE_ELIGIBILITY_REQUEST_PRIORITY = "stat" | "normal" | "deferred"

export interface COVERAGE_ELIGIBILITY_REQUEST {
  id?: string;
  status : CoverageEligibilityRequestStatus
  text: string;
  identifier: IDENTTIFIER[];
  priority: CODEABLE_CONCEPT;
  purpose: CoverageEligibilityRequestPurpoe[];
  patientId: string;
  createdDateTime: string;
  /**
   * Only Date 2023-08-15
   */
  servicedDate?: string;
  servicedPeriod?:PERIOD;
  supportingInfo?:SUPPORTING_INFO[]
  enterer :ENTERER
  provider : PROVIDER
  insurerOrganizationId : string
  /**
   * ward
   */
  locationId ?: string
  insurance: INSURANCE[]
  item ?: ITEM[]
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
      servicedDate: options.servicedDate,
      supportingInfo:options.supportingInfo,
      identifier: options.identifier,
      priority: options.priority,
      purpose: options.purpose,
      patient: {
        reference: `Patient/${options.patientId}`,
      },
      created: options.createdDateTime,
      enterer: {"reference" : `${options.enterer.resource}/${options.enterer.id}`},
      provider : {"reference" : `${options.provider.resource}/${options.provider.id}`},
      insurer : {
        reference: `Organization/${options.insurerOrganizationId}`,
      },
      facility :{
        reference: `Location/${options.locationId}`,
      },
      insurance:options.insurance,
      item:options.item,
      detail : options.detail,
      status : options.status
    };

    const keys = Object.keys(body);
    keys.forEach(el=>{
      if(el== undefined){
        delete body[`${el}`]
      }
    })

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
      // enterer: options.enterer,
      enterer : this.getFromMultResource(options.enterer) as any,
      // provider: options.provider,
      provider : this.getFromMultResource(options.provider) as any,
      insurerOrganizationId: this.getIdFromReference({"ref" : options.insurer.reference, "resourceType" : "Organization"}),
      
      insurance:options.insurance,

    }
    if(options.item){
      ret.item = options.item
    }

    if(options.facility){
      ret.locationId= this.getIdFromReference({"ref" : options.facility.reference, "resourceType" : "Location"})
    }
    if(options.supportingInfo){
      ret.supportingInfo= options.supportingInfo
    }

    if(options.servicedPeriod){
        ret.servicedPeriod = options.servicedPeriod
      }

      if(options.servicedDate){
        ret.servicedDate=options.servicedDate
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
