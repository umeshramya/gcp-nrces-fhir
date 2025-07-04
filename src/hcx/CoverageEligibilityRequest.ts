import { isIdentifier } from "typescript";
import GcpFhirCRUD from "../classess/gcp";
import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { Location } from "../resources/Location";
import { Organization, ORGANIZATION } from "../resources/Organization";
import { Patient, PATIENT } from "../resources/Patient";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { Coverage } from "./Coverage";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

const CoverageEligibilityRequestStatus = [
  "active",
  "cancelled",
  "draft",
  "entered-in-error",
] as const;
export interface INSURANCE {
  id?: string;
  focal?: boolean;
  coverage: {
    reference: string;
  };
  businessArrangement?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
}

interface SUPPORTING_INFO {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  sequence: number;
  /**
   * Any resource
   */
  information: { reference: string };
  appliesToAll?: boolean;
}

type CoverageEligibilityRequestStatus =
  (typeof CoverageEligibilityRequestStatus)[number];
const CoverageEligibilityRequestPurpose = [
  "auth-requirements",
  "benefits",
  "discovery",
  "validation",
] as const;
type CoverageEligibilityRequestPurpoe =
  (typeof CoverageEligibilityRequestPurpose)[number];
interface ENTERER extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole";
}

interface PROVIDER extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole" | "Organization";
}

interface ITEM_PROVIDER extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole";
}

interface ITEM_FACILITY extends MULTI_RESOURCE {
  resource: "Location" | "Organization";
}

type DIAGNOSIS = {
      diagnosisCodeableConcept: CODEABLE_CONCEPT;
    }
  // | {
  //     diagnosisReference: {
  //       reference: string;
  //     };
  //   };

interface ITEM {
  category?: CODEABLE_CONCEPT;
  productOrService: CODEABLE_CONCEPT;
  modifier?: CODEABLE_CONCEPT[];
  provider?: ITEM_PROVIDER;
  facility?: ITEM_FACILITY;
  diagnosis: DIAGNOSIS[];
}

export type COVERAGE_ELIGIBILITY_REQUEST_PRIORITY =
  | "stat"
  | "normal"
  | "deferred";

export interface COVERAGE_ELIGIBILITY_REQUEST {
  id?: string;
  status: CoverageEligibilityRequestStatus;
  resourceType: "CoverageEligibilityRequest"
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
  servicedPeriod?: PERIOD;
  supportingInfo?: SUPPORTING_INFO[];
  enterer: ENTERER;
  provider: PROVIDER;
  insurerOrganizationId?: string;
  insurerParticipantId?:string
  insurerName ?: string 
  /**
   * ward
   */
  locationId?: string;
  insurance: INSURANCE[];
  item?: ITEM[];
  detail?: {
    reference: string;
  };
  hcx?: "nhcx" | "swasth";
}

export interface TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_REQUEST
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}

export class CoverageEligibilityRequest
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(
    option: TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_REQUEST
  ): Promise<string> {
    let ret: string = "";
    const body: COVERAGE_ELIGIBILITY_REQUEST = this.convertFhirToObject(option.body)

    if (option.addResourceType) {
      ret += `<h1>Coverage Eligibility Request</h1>`;
    }

    ret += `Date : ${new TimeZone().convertTZ(
      body.createdDateTime,
      "Asia/Kolkata",
      false
    )}`;

    if (option.body.text) {
      ret += `<h2>Text</h2>`;
      ret += `<p>${option.body.text} </p>`
    }

  

    if (body.purpose) {
      ret += body.purpose && `Purpose : ${body.purpose}</br>`;
    }

    if (option.body.identifier && option.body.identifier.length > 0) {
      ret += `<h4>Identifiers</h4>`;
      ret += this.identifierToHtml(body.identifier)
    }

    if (option.body.priority) {
      ret += `<b>Priority</b> : ${this.codeableConceptToHtml(
        option.body.priority
      )}<br/>`;
    }

    if(option.body.locationId){
      try {
        
        const locationRes = await new GcpFhirCRUD().getFhirResource(option.body.locationId, "Location")
        if(locationRes && locationRes.data){
          const location =new Location()
          const locationObj = location.convertFhirToObject(locationRes.data)
          ret +=`<h3>Location</h3>  ${await location.toHtml({body : locationObj}) }`
        }
      } catch (error) {
        
      }
    }


    if(body.insurance){
      ret +=await  this.insuranceToHtml({
        "val" : Array.isArray(body.insurance )  ? body.insurance : [body.insurance],
        "coverage":option.coverages || [],
        "patient" : option.patient,
        "payerCode" : option.payerCode,
        "payerName" : option.payerName
      })
    }


    if(body.item && body.item.length > 0){
      ret +=`<table>
      <tr>
        <th>category</th>
        <th>diagnosis</th>
        <th>productOrService</th>
      </tr>`

      for (let index = 0; index < body.item.length; index++) {
        
        const el = body.item[index];
    
        ret +=`<tr>`
        if(el.category){

          ret +=`<td>`
          ret += this.codeableConceptToHtml(el.category)
          ret +=`</td>`
        }

        if(el.diagnosis){
          ret +=`<td>`
          el.diagnosis.forEach((dia)=>{
    
           if(dia.diagnosisCodeableConcept ){
              ret += `${this.codeableConceptToHtml(dia.diagnosisCodeableConcept )}`
           }
          })
          ret += `</td>`
        }

        if(el.productOrService){

          ret += `<td>`
          ret += this.codeableConceptToHtml(el.productOrService)
          ret+=`</td>`
        
        }

         
        ret +=`</tr>`
      }

      ret+=`</table>`

    }
    return ret;
  }
  getFHIR(options: COVERAGE_ELIGIBILITY_REQUEST): any {
    const getText = (): string => {
      let ret: string = "";
      ret += options.text;
      return ret;
    };
    const body = {
      resourceType: "CoverageEligibilityRequest",
      id: options.id,
      meta: {
        profile:
          options.hcx == "nhcx"
            ? [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityRequest",
              ]
            : [
                "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequest.html",
              ],
      },
      language: "en",
      text: {
        status: "generated",
        div: getText(),
      },
      servicedDate: options.servicedDate,
      supportingInfo: options.supportingInfo,
      identifier: options.identifier,
      priority: options.priority,
      purpose: options.purpose,
      patient: {
        reference: `Patient/${options.patientId}`,
      },
      created: options.createdDateTime,
      enterer: {
        reference: `${options.enterer.resource}/${options.enterer.id}`,
        "display" :options.enterer &&  options.enterer.display,
        identifier : options.enterer && options.enterer.identifier
      },
      provider: {
        reference: options.provider && `${options.provider.resource}/${options.provider.id}`,
        "display" :options.provider &&  options.provider.display,
        identifier : options.provider && options.provider.identifier
      },
      insurer: {
        reference: options.insurerOrganizationId && `Organization/${options.insurerOrganizationId}`,
        identifier : options.insurerParticipantId && {
          "system" : "NHCX",
          "value" : options.insurerParticipantId
        },
        display : options.insurerName,
      },
      facility: {
        reference: `Location/${options.locationId}`,
      },
      insurance: options.insurance,
      item: options.item,
      detail: options.detail,
      status: options.status,
    };

    const keys = Object.keys(body);
    keys.forEach((el) => {
      if (el == undefined) {
        delete body[`${el}`];
      }
    });

    return body;
  }
  convertFhirToObject(options: any): COVERAGE_ELIGIBILITY_REQUEST {
    let ret: COVERAGE_ELIGIBILITY_REQUEST = {
      id: options.id,
      status: options.status,
      text: options.text && options.text.div,
      identifier: options.identifier,
      priority: options.priority,
      purpose: options.purpose,
      patientId: this.getIdFromReference({
        ref: options.patient.reference,
        resourceType: "Patient",
      }),
      createdDateTime: options.created,
      // enterer: options.enterer,
      enterer: {
        "identifier": options.enterer.identifier,
        ...this.getFromMultResource(options.enterer) as any
      },
      // provider: options.provider,
      provider: {
        "identifier": options.provider.identifier,
        ...this.getFromMultResource(options.provider) as any
      },

      insurance: options.insurance,
      resourceType: "CoverageEligibilityRequest"
    };

    if(options.insurer && options.insurer.reference){
      ret.insurerOrganizationId =  this.getIdFromReference({
        ref: options.insurer.reference,
        resourceType: "Organization"
      })
    }

    if(options.insurer && options.insurer.display){
      ret.insurerName =  options.insurer.display
    }

    if(options.insurer && options.insurer.identifier){
      ret.insurerParticipantId =  options.insurer.identifier.value
    }
    if (options.item) {
      ret.item = options.item;
    }

    if (options.facility) {
      ret.locationId = this.getIdFromReference({
        ref: options.facility.reference,
        resourceType: "Location",
      });
    }
    if (options.supportingInfo) {
      ret.supportingInfo = options.supportingInfo;
    }

    if (options.servicedPeriod) {
      ret.servicedPeriod = options.servicedPeriod;
    }

    if (options.servicedDate) {
      ret.servicedDate = options.servicedDate;
    }
    if (options.detail) {
      ret.detail = options.detail;
    }
    return ret;
  }
  statusArray = (): CoverageEligibilityRequestStatus[] => {
    return CoverageEligibilityRequestStatus.map((el) => el);
  };

  Purpose = (): CoverageEligibilityRequestPurpoe[] => {
    return CoverageEligibilityRequestPurpose.map((el) => el);
  };

 
}
