import { CODEABLE_CONCEPT, IDENTTIFIER, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { VALUE } from "./Observation";
import ResourceMain from "./ResourceMai";
const CoverageStatus = ["active" , "cancelled" , "draft" , "entered-in-error"] as const
type CoverageStatus = typeof CoverageStatus[number]
const CoverageKind = ["insurance" , "self-pay" , "other"] as const
type CoverageKind = typeof CoverageKind[number]
interface party extends MULTI_RESOURCE{
    "resource" : "Patient" | "RelatedPerson" | "Organization"
}
interface policyHolder extends MULTI_RESOURCE{
    "resource" : "Patient" | "RelatedPerson" | "Organization"
}
interface subscriber extends MULTI_RESOURCE{
    "resource" : "Patient" | "RelatedPerson" 
}


interface SAMPLE_QUANTITY {
    value: number;
    unit: string;
    system: string;
    code: string;
  }

  interface MONEY{
    value: number;
    currency:string
  }

interface costToBeneficiary{
    type?:CODEABLE_CONCEPT;
    category ?: CODEABLE_CONCEPT;
    network ? : CODEABLE_CONCEPT;
    unit?:CODEABLE_CONCEPT;
    term?:CODEABLE_CONCEPT;
    value?: SAMPLE_QUANTITY | MONEY
    exception?: {"type" : CODEABLE_CONCEPT, "period" ?: PERIOD}[]

}
interface COVERAGE{
    id?:string
    identifier?:IDENTTIFIER[]
    status:CoverageStatus
    kind : CoverageKind
    paymentBy ?: {
        party : party;
        responsibility ?:string
    }[],
    type ?: CODEABLE_CONCEPT
    policyHolder ?: policyHolder
    subscriber ?: subscriber
    subscriberId ?: IDENTTIFIER[],
    beneficiaryPatientId : string
    dependent :string
    relationship?:CODEABLE_CONCEPT
    period?:PERIOD
    insurerOrganizationId ?:string
    class ?: {
        type:CODEABLE_CONCEPT,
        value : IDENTTIFIER
        name : string
       
    }[],
    order?:number,
    network?:string,
    costToBeneficiary?:costToBeneficiary[]
    subrogation?: boolean
    contractId?:string[],
    insurancePlanId?:string
}

export class Coverage extends ResourceMain implements ResourceMaster{
    getFHIR(options: COVERAGE) {
        const body ={
            id:options.id,
            identifier:options.identifier,
            status : options.status,
            kind : options.kind,
            paymentBy : options.paymentBy?.map(el=>{
                return {
                    "party" : {"reference" : `${el.party.resource}/${el.party.id}`},
                    "responsibility" : el.responsibility
                }
            }),
            policyHolder : options.policyHolder ? {"reference" : `${options.policyHolder.resource}/${options.policyHolder.id}`} : undefined,
            subscriber :options.subscriber ? {"reference" : `${options.subscriber.resource}/${options.subscriber.id}`} : undefined,
            beneficiary : {"reference" : `Patient/${options.beneficiaryPatientId}`},
            dependent : options.dependent,
            relationship : options.relationship,
            period:options.period,
            insurer : {"reference" : `Organization/${options.beneficiaryPatientId}`},
            class : options.class,
            order:options.order,
            network: options.network,
            costToBeneficiary:options.costToBeneficiary,
            subrogation:options.subrogation,
            contract: options.contractId?.map(el=>{
                return{"reference" : `Contract/${options.contractId}`}
            }),
            insurancePlan: {"reference" : `InsurancePlan/${options.insurancePlanId}`}
        }
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}