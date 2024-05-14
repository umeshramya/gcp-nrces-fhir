import { ADDRESS, ATTACHMENT, CODEABLE_CONCEPT, EXTENSION, IDENTTIFIER, MONEY, PERIOD, REFERENCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import { SAMPLE_QUANTITY } from "../resources/Observation";
import ResourceMain from "../resources/ResourceMai";

interface ADJUDICATION{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[];
    /** system  http://terminology.hl7.org/CodeSystem/adjudication*/
    category:CODEABLE_CONCEPT
    reason:CODEABLE_CONCEPT
    amount?:MONEY;
    value?:number
}

interface DETAIL {
    id?: string;
    extension?: EXTENSION[];
    modifierExtension?: EXTENSION[];
    detailSequence: number;
    noteNumber: number[];
    adjudication: ADJUDICATION[];
    subDetail?: Omit<DETAIL, "subDetail">[];
}
interface TOTAL {
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[];
    /** system  http://terminology.hl7.org/CodeSystem/adjudication*/
    category:CODEABLE_CONCEPT
    amount:MONEY
}

interface ITEM{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[];
    itemSequence:number;
    noteNumber:number[];
    adjudication:ADJUDICATION[];
    detail?:DETAIL[]
    formCode?:CODEABLE_CONCEPT
}

interface PAYEMENT{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[];
    type : CODEABLE_CONCEPT
    adjustment?:MONEY;
    adjustmentReason?:CODEABLE_CONCEPT
    date?:string
    amount:MONEY;
    identifier:IDENTTIFIER
}

interface ADD_ITEM{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?:EXTENSION[];
    itemSequence:number[];
    detailSequence:number[]
    subdetailSequence:number[]
    provider:REFERENCE;
    productOrService:CODEABLE_CONCEPT;
    modifier:CODEABLE_CONCEPT[]
    programCode:CODEABLE_CONCEPT[]
    quantity?:SAMPLE_QUANTITY
    unitPrice?:MONEY;
    factor?:number
    net?:MONEY
    bodySite?:CODEABLE_CONCEPT
    subSite:CODEABLE_CONCEPT[];
    noteNumber:number[];
    adjudication:ADJUDICATION[];
    serviced?:{
        servicedDate?:string
        servicedPeriod ?:PERIOD
    }
    location?:{
        locationCodeableConcept	:CODEABLE_CONCEPT;
        locationAddress : ADDRESS
        locationReference: REFERENCE
    }
  
}

interface INSURANCE{

}

interface ERROR{
    
}


interface CLAIM_RESPONSE{
    id?:string;
    text:string
    identifiers:IDENTTIFIER[]
    //** "http://terminology.hl7.org/CodeSystem/claim-type" */
    type:CODEABLE_CONCEPT
    use: "claim" | "preauthorization" | "predetermination";
    created : string
    outcome:"queued" | "complete" | "error" | "partial"
    hcx?: "nhcx" | "swastha";
    patient:REFERENCE
    insurer:REFERENCE
    requestor?:REFERENCE
    request?: REFERENCE
    status:"active" | "cancelled" | "draft" | "entered-in-error"
    subType?:CODEABLE_CONCEPT
    disposition?:string
    preAuthRef?:string
    preAuthPeriod:PERIOD
    payeeType?:CODEABLE_CONCEPT
    item?:ITEM[]
    detail?:DETAIL[]
    adjudication?:ADJUDICATION[]
    total:TOTAL[]
    payment?:PAYEMENT
    fundsReserve?:CODEABLE_CONCEPT
    formCode ?:CODEABLE_CONCEPT
    form:ATTACHMENT
    addItem:ADD_ITEM[]
    communicationRequest ?:REFERENCE
    insurance?:INSURANCE
    error:ERROR
    

 


}

export class ClaimResponse extends ResourceMain implements ResourceMaster{
    getFHIR(options: CLAIM_RESPONSE) {
        const body = {
            "resourceType": "ClaimResponse",
            "id": options.id || undefined,
            "meta": {
              "versionId": "1",
              "lastUpdated": new Date().toISOString(),
              "source": "#JrkobxCRdZUI6QNh"
            },
            "text": {
              "status": "generated",
              "div": options.text
            },
            "identifier": options.identifiers,
            "disposition" : options.disposition,
            "preAuthRef": options.preAuthRef,
            "preAuthPeriod": options.preAuthPeriod,
            "status": options.status,
            "type":options.type,
            "subType" : options.subType,
            "use": options.use,
            "patient": options.patient,
            "created": options.created,
            "insurer": options.insurer,
            "requestor": options.requestor || undefined,
            "request": options.request || undefined,
            "outcome": options.outcome,
            "payeeType" :options.payeeType,
            "item": options.item,
            "detail":options.detail,
            "total": options.total,
            "payment": options.payment,
            "fundsReserve" : options.fundsReserve,
            "formCode" : options.formCode,
            "form":options.form,
            "addItem":options.addItem,
            "communicationRequest" : options.communicationRequest,
            "insurance":options.insurance,
            "error" : options.error

          }

          return body
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    async toHtml(option: { addResourceType: boolean; }):Promise<string> {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}