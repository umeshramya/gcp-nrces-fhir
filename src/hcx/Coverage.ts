import GcpFhirCRUD from "../classess/gcp";
import {
  CODEABLE_CONCEPT,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";
const CoverageStatus = [
  "active",
  "cancelled",
  "draft",
  "entered-in-error",
] as const;
type CoverageStatus = (typeof CoverageStatus)[number];

interface policyHolder extends MULTI_RESOURCE {
  resource: "Patient" | "RelatedPerson" | "Organization";
}
interface subscriber extends MULTI_RESOURCE {
  resource: "Patient" | "RelatedPerson";
}
interface payor extends MULTI_RESOURCE {
  resource: "Patient" | "RelatedPerson" | "Organization";
}

interface SAMPLE_QUANTITY {
  value: number;
  unit: string;
  system: string;
  code: string;
}

interface MONEY {
  value: number;
  currency: string;
}

interface costToBeneficiary {
  type?: CODEABLE_CONCEPT;
  category?: CODEABLE_CONCEPT;
  network?: CODEABLE_CONCEPT;
  unit?: CODEABLE_CONCEPT;
  term?: CODEABLE_CONCEPT;
  value?: SAMPLE_QUANTITY | MONEY;
  exception?: { type: CODEABLE_CONCEPT; period?: PERIOD }[];
}
export interface COVERAGE {
  id?: string;
  identifier: IDENTTIFIER[];
  text: string;
  status: CoverageStatus;
  type?: CODEABLE_CONCEPT;
  /**
   * Corporate insurences
   */
  policyHolder?: policyHolder;
  /**
   * main person in the policy
   */
  subscriber?: subscriber;
  /**
   * id of the subscriber
   */
  subscriberId?: string;
  /**
   * Patient
   */
  beneficiaryPatientId: string;

  /**
   * 	
For some coverages a single identifier is issued to the Subscriber and then a unique dependent number is issued to each beneficiary.
   */
  dependent?: string;
  relationship?: CODEABLE_CONCEPT;
   resourceType: "Coverage";
  period?: PERIOD;
  insurerOrganizationId?: string;
  payor: payor[];
  class?: {
    type: CODEABLE_CONCEPT;
    value: IDENTTIFIER;
    name: string;
  }[];
  order?: number;
  network?: string;
  costToBeneficiary?: costToBeneficiary[];
  subrogation?: boolean;
  contractId?: string[];
  insurancePlanId?: string;
  hcx?: "nhcx" | "swasth";
}



export interface TO_HTML_HCX_OPTIONS_COVERAGE
  extends Omit<Omit<TO_HTML_HCX_OPTIONS, "body">, "coverages"> {
  body: any;
  showPatient: boolean;
  showInsuranceCompany: boolean;
}
export class Coverage extends ResourceMain implements ResourceMaster {
  async toHtml(option: TO_HTML_HCX_OPTIONS_COVERAGE): Promise<string> {
    const body: COVERAGE = this.convertFhirToObject(option.body);
    let ret = await this.coverageToHtml(option)
    return ret;
  }
  getFHIR(options: COVERAGE) {
    const getText = (): string => {
      let ret: string = "";
      ret = options.text;
      return ret;
    };
    const body = {
      id: options.id,
      resourceType: "Coverage",
      type: options.type,
      identifier: options.identifier,

      meta: {
        profile:
          options.hcx == "nhcx"
            ? ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Coverage"]
            : [
                "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Coverage.html",
              ],
      },

      text: {
        status: "generated",
        div: getText(),
      },
      status: options.status,
      policyHolder: options.policyHolder
        ? {
            reference: `${options.policyHolder.resource}/${options.policyHolder.id}`,
          }
        : undefined,
      subscriber: options.subscriber
        ? {
            reference: `${options.subscriber.resource}/${options.subscriber.id}`,
          }
        : undefined,
      subscriberId: options.subscriberId,
      beneficiary: { reference: `Patient/${options.beneficiaryPatientId}` },
      dependent: options.dependent,
      relationship: options.relationship,
      payor:options.payor && options.payor.map((el) => {
        let ret: any={}
        if(el.resource){
         ret.reference= `${el.resource}/${el.id}` ;
        }
        if(el.identifier){
          ret.identifier= el.identifier
        }
       if(el.type){
        ret.type= el.type
       }
        if (el.display) {
          ret.display = el.display;
        }
        return ret;
      }),
      period: options.period,
      insurer: options.insurerOrganizationId
        ? { reference: `Organization/${options.insurerOrganizationId}` }
        : undefined,
      class: options.class,
      order: options.order,
      network: options.network,
      costToBeneficiary: options.costToBeneficiary,
      subrogation: options.subrogation,
      contract: options.contractId?.map((el) => {
        return { reference: `Contract/${options.contractId}` };
      }),
      insurancePlan: options.insurancePlanId
        ? { reference: `InsurancePlan/${options.insurancePlanId}` }
        : undefined,
    };
    return body;
  }
  convertFhirToObject(options: any) {
    const ret: COVERAGE = {
      id: options.id,
      identifier: options.identifier,
      text: options.text && options.text.div,
      status: options.status,
      beneficiaryPatientId: options.beneficiary && this.getIdFromReference({
        ref: options.beneficiary.reference,
        resourceType: "Patient",
      }),
      payor: options.payor && options.payor.map((el: any) => {
        const ret: MULTI_RESOURCE = this.getFromMultResource(el);
        return ret;
      }),
      resourceType: "Coverage"
    };

    if (options.type) {
      ret.type = options.type;
    }
    if (options.policyHolder) {
      ret.policyHolder = this.getFromMultResource(options.policyHolder) as any;
    }
    if (options.subscriber) {
      ret.subscriber = this.getFromMultResource(options.subscriber) as any;
    }
    if (options.subscriberId) {
      ret.subscriberId = options.subscriberId;
    }
    if (options.dependent) {
      ret.dependent = options.dependent;
    }
    if (options.relationship) {
      ret.relationship = options.relationship;
    }

    if (options.period) {
      ret.period = options.period;
    }

    if (options.insurer) {
      ret.insurerOrganizationId = this.getIdFromReference({
        ref: options.insurer.reference,
        resourceType: "Organization",
      });
    }

    if (options.dependent) {
      ret.dependent = options.dependent;
    }

    if (options.class) {
      ret.class = options.class;
    }
    if (options.order) {
      ret.order = options.order;
    }
    if (options.network) {
      ret.network = options.network;
    }
    if (options.costToBeneficiary) {
      ret.costToBeneficiary = options.costToBeneficiary;
    }

    if (options.subrogation) {
      ret.subrogation = options.subrogation;
    }
    if (options.contract) {
      ret.contractId = options.contract.map((el: any) => {
        const ret: string = this.getIdFromReference({
          ref: el.reference,
          resourceType: "Contract",
        });
      });
    }

    return ret;
  }
  statusArray?: Function | undefined;
}
