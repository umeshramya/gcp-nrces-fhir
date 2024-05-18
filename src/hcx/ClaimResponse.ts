import GcpFhirCRUD from "../classess/gcp";
import { ADDRESS, ATTACHMENT, CODEABLE_CONCEPT, EXTENSION, IDENTTIFIER, MONEY, PERIOD, REFERENCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import { SAMPLE_QUANTITY } from "../resources/Observation";
import { Organization } from "../resources/Organization";
import { Patient } from "../resources/Patient";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

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
    sequence:number;
    focal:boolean;
    coverage:REFERENCE;
    businessArrangement?:string
    claimResponse?:REFERENCE
}

interface ERROR{
    itemSequence?:number;
    detailSequence?:number;
    subDetailSequence?:number
    code:CODEABLE_CONCEPT
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
    insurance?:INSURANCE[]
    error:ERROR[]
}
interface TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE extends Omit<TO_HTML_HCX_OPTIONS, "body">{
    body : CLAIM_RESPONSE
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
        const ret:CLAIM_RESPONSE=options;
        options.text = options.text && options.text.div ? options.text.div : ""
        return ret;
    }
    async toHtml(options: TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE):Promise<string> {
        let ret:string=""
        const adjucation=(ad:ADJUDICATION)=>{
            let adRet=""
            if(ad.id){
                adRet += `<i>Id</i>${ad.id}`
            }
            if(ad.amount){
                adRet += `<i>Amount</i>${ad.amount.value}`
            }
            
        }
        try {
            const body:CLAIM_RESPONSE = options.body 

        if(options.addResourceType){
            ret+=`<h1>${body.use.toUpperCase()}</h1>`
          }
          if(body.created){
            ret += `Date : ${new TimeZone().convertTZ(body.created, "Asia/Kolkata", false)}<br/>`
          }

          if(options.patinet){
            ret += `<h3>Patient</h3>`;
            ret += await new Patient().toHtml({"addResourceType" : false, body : options.patinet})
          }

          const orgnaization = new Organization();
          if (!options.insurance) {
            try {
                const resource = (
                    await new GcpFhirCRUD().getFhirResource(
                      this.getIdFromReference({"ref" : options.body.insurer.reference || "", "resourceType" : "Organization"}),
                      "Organization"
                    )
                  ).data;
                  options.insurance = orgnaization.convertFhirToObject(resource);
                
            } catch (error) {
                
            }
          }

          if(options.insurance){
            ret += `<h3>Insurance</h3>`;
            ret += await orgnaization.toHtml({
              addResourceType: false,
              body: options.insurance,
            });
          }
          ret += `<hr/>`;

          if (body.text) {
            ret += `<h2>Text</h2> ${body.text}<br/><hr/>`;
            ret += `<h2>Object Text</h2>`
          }



          if(body.identifiers && body.identifiers.length >0){
            ret += `<h4>Identifiers</h4>`
            body.identifiers.forEach(el=>{
              ret += this.identifierToHtml(el)
            })
          }

          if(body.disposition){
            ret+=`<b>Disposition</b>${body.disposition}`
          }

          if(body.outcome){
            ret += `<b>Outcome</b> ${body.outcome}`
          }

          if(body.item && body.item.length > 0){
            ret += `<h4>Item</h4>`
            body.item.forEach((el,i)=>{
                
            })
          }
          
            
        } catch (error) {
            console.log(error)
        }finally{
            return ret;
        }
        



    }
    statusArray?: Function | undefined;
    
}