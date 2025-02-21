import { ResourceMaster } from "../Interfaces";
import { TimeZone } from "../TimeZone";
import GcpFhirCRUD from "../classess/gcp";
import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { Encounter } from "../resources/Encounter";
import {
  QUANTITY,
  SAMPLE_QUANTITY,
  SUPPORTING_INFO,
} from "../resources/Observation";
import { Organization } from "../resources/Organization";
import { Patient } from "../resources/Patient";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

interface PAYEE_PARTY {
  id: string;
  identifier: IDENTTIFIER;
}

export interface CLAIM {
  id?: string;
  text: string;
  resourceType:"Claim"
  identifier: IDENTTIFIER[];
  status: "active" | "cancelled" | "draft" | "entered-in-error";
  patientGcpId: string;
  providerId: string;
  supportingInfo?: SUPPORTING_INFO[];
  payee?: {
    /**
     * Code from https://hl7.org/fhir/R4/codesystem-payeetype.html
     */
    type: CODEABLE_CONCEPT;
    party?: PAYEE_PARTY;
  };
  payorId?: string;
  payorParticipantCode?:string
  payorName:string
  billablePeriod: PERIOD;
  priority: CODEABLE_CONCEPT;
  total: {
    value: number;
    currency: "INR" | "USD";
  };
  careteam: {
    sequence: number;
    provider: { reference: `Organization/${string}` };
  }[];
  item: {
    sequence: number;
    productOrService: {
      coding: 
        {
          system: "https://irdai.gov.in/package-code";
          code: string;
          display: string;
        }[]
      ;
    };
    unitPrice: { value: number; currency: "INR" | "USD" };
    quantity: SAMPLE_QUANTITY;
    encounter: {
      reference: `Encounter/${string}`;
    }[];
  }[];
  diagnosis: {
    sequence: number;
    diagnosisCodeableConcept: CODEABLE_CONCEPT;
    type: CODEABLE_CONCEPT[];
  }[];
  insurance: {
    sequence: number;
    focal: boolean;
    identifier?: IDENTTIFIER;
    coverage: { reference: `Coverage/${string}` };
  }[];
  type: CODEABLE_CONCEPT;
  createdDate: string;
  use: "claim" | "preauthorization" | "predetermination";
  hcx?: "nhcx" | "swastha";
}

interface TO_HTML_HCX_OPTIONS_CLAIM extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}
export class Claim extends ResourceMain implements ResourceMaster {
  async toHtml(options: TO_HTML_HCX_OPTIONS_CLAIM): Promise<string> {
    const body: CLAIM = this.convertFhirToObject(options.body);
    let ret: string = "";
    const erorInfo = "Claim toHtml error";
    try {
      try {
      if (options.addResourceType) {
          ret += `<h1>${body.use.toString().toUpperCase()}</h1>`;
      }

    } catch (error) {
      console.log(erorInfo, "addResourceType", error);
    }
      try {
        if (body.createdDate) {
          ret += `Date : ${new TimeZone().convertTZ(
            body.createdDate,
            "Asia/Kolkata",
            false
          )}<br/>`;
        }
      } catch (error) {
        console.log(erorInfo, "createdDate", error);
      }


      
    if (body.text) {
      ret += `<h2>Text</h2> ${body.text}<br/><hr/>`;
    }

      
      try {
        ret +=`<h4>Status</h4>`
        if(body.status){
          ret += body.status
        }

      } catch (error) {
        console.log(erorInfo, "Status", error);
      }


      try {
        ret +=`<h4>Type</h4>`
        if(body.type){
          ret +=  this.codeableConceptToHtml(body.type)
        }
        
      } catch (error) {
        console.log(erorInfo, "Type", error);
      }

      try {
        if (body.identifier && body.identifier.length > 0) {
          ret += `<h4>Identifiers</h4>`;
          body.identifier.forEach((el) => {
            ret += this.identifierToHtml(el);
          });
        }
      } catch (error) {
        console.log(erorInfo, "identifier", error);
      }


      try {
        ret += `<h4>Diagnosis</h4>`
        if (body.diagnosis && body.diagnosis.length > 0) {
          body.diagnosis.forEach((el) => {
            if (el.diagnosisCodeableConcept) {
              ret += `Diagnosis Codeable Concept  : ${this.codeableConceptToHtml(
                el.diagnosisCodeableConcept
              )}`;
            }
  
            if (el.type && el.type.length > 0) {
              el.type.forEach((type) => {
                ret += `Type : ${this.codeableConceptToHtml(type)}`;
              });
            }
          });
        }
      } catch (error) {
        console.log(erorInfo, "diagnosis", error);
      }


      try {
        if(body.item && body.item.length > 0){
          ret += `<table>`
          ret += `<tr>
            <th>
              Encounter
            </th>
            <th>
              Item
            </th>
            <th>
              Unit Price
            </th>
            <th>
              Quantity
            </th>
            <th>
              Value
            </th>
          </tr>`
          for (let index = 0; index < body.item.length; index++) {
            const el = body.item[index];
            if(el.encounter && el.encounter.length >0){

              ret += `<tr>`
              for (let encounterIndex = 0; encounterIndex < el.encounter.length; encounterIndex++) {
                const encounterEl = el.encounter[ encounterIndex];
                const encounterId = this.getIdFromReference({"ref" : encounterEl.reference,  "resourceType" : "Encounter"})
                const resource = await new GcpFhirCRUD().getFhirResource(encounterId, "Encounter")
                const curEncounter = new Encounter().convertFhirToObject(resource.data);
               const encounterString = `${curEncounter.text}`
                ret += `<td>${encounterString}</td>`
              }
            }
              
            ret += `<td>${el.sequence} ${el.productOrService.coding.map(el=>this.codingtoHtml(el)).join(", ")}</td>`
            ret += `<td>${el.unitPrice.currency}${el.unitPrice.value}</td>`
            ret += `<td>${el.quantity.value}</td>`
            ret += `<td>${el.unitPrice.currency} ${(el.unitPrice.value * el.quantity.value).toFixed(2)}</td>`
            ret += `</td>` 
            ret  +=`</tr>`
          }
          ret += `</table>`
        }
        
      } catch (error) {
        console.log(erorInfo, "Prodcut and services", error);
      }


      try {
        if(body.total){
          ret += `<h4>Total ${body.total.value} ${body.total.currency} </h4>`
        }
        
      } catch (error) {
        console.log(erorInfo, "Total", error);
      }

      try {
        ret += `<h4>Payee</h4>`
        if(body.payee){
          if(body.payee.type){
            ret += this.codeableConceptToHtml(body.payee.type)
          }

          if(body.payee.party){
            ret += `${body.payee.party.id} ${this.identifierToHtml(body.payee.party.identifier)}`
          }
        }
      } catch (error) {
        console.log(erorInfo, "Payee", error);
      }


      try {
        if(body.supportingInfo){
          ret += `<h4>Supporting Info</h4>`
          for (let index = 0; index < body.supportingInfo.length; index++) {
            const el = body.supportingInfo[index];
            if(el.category){
              ret += `Category  ${this.codeableConceptToHtml(el.category)}`
            }
            if(el.code){
              ret += `Code ${this.codeableConceptToHtml(el.code)}`
            }

            if(el.valueAttachment){
              const st=`${el.valueAttachment.title} Craeted On ${new TimeZone().convertTZ(el.valueAttachment.creation, "Asia/Kolkata", false)} }`

              if(el.valueAttachment.url){
                ret += `<a href=${el.valueAttachment.url}>${`Click Here ${st}`}</a>`
              }

              if(el.valueAttachment.data){

                ret += `<a href="data:${el.valueAttachment.contentType};base64,${el.valueAttachment.data}" >Right Click Open in new tab ${st}</a>
`

              }
            }

            
          }
        }
        
      } catch (error) {
        
      }




      return ret;
    } catch (error) {
      console.log(erorInfo,"all",error);
      return ret;
    }
  }
  getFHIR(options: CLAIM) {
    const body = {
      resourceType: "Claim",
      id: options.id ? options.id : undefined,
      meta: {
        lastUpdated: "2023-02-20T14:03:14.918+05:30",
        profile:
          options.hcx == "nhcx"
            ? ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim"]
            : [
                "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Claim.html",
              ],
      },
      identifier: options.identifier,
      status: options.status,
      type: options.type,
      patient: { reference: `Patient/${options.patientGcpId}` },
      created: options.createdDate,
      insurer: { 
        reference: options.payorId && `Organization/${options.payorId}`,
        identifier :options .payorParticipantCode && {
          "system" : "NHCX",
          "value" : options.payorParticipantCode
        },
        display : options.payorName

       },
      provider: { reference: `Organization/${options.providerId}` },
      priority: options.priority,
      careTeam: options.careteam,
      diagnosis: options.diagnosis,
      insurance: options.insurance,
      item: options.item,
      total: options.total,
      use: options.use,
      supportingInfo: options.supportingInfo,
      payee: options.payee && {
        type: options.payee?.type,
        party: options.payee.party || undefined,
      },
      billablePeriod: options.billablePeriod,
      text: {
        status: "generated",
        div: options.text,
      },
    };
    return body;
  }
  convertFhirToObject(options: any) {
    const ret: CLAIM = {
      text: options.text.div,
      identifier: options.identifier,
      status: "active",
      patientGcpId: this.getIdFromReference({
        resourceType: "Patient",
        ref: options.patient.reference,
      }),
      providerId: this.getIdFromReference({
        resourceType: "Organization",
        ref: options.provider.reference,
      }),

      billablePeriod: options.billablePeriod,
      priority: options.priority,
      total: options.total,
      careteam: options.careTeam,
      item: options.item,
      diagnosis: options.diagnosis,
      insurance: options.insurance,
      type: options.type,
      createdDate: options.created,
      use: options.use,
      id: options.id,
      payorName: options.insurer.display,
      resourceType: "Claim"
    };

    if(options.insurer.reference){
      ret.payorId= this.getIdFromReference({
        resourceType: "Organization",
        ref: options.insurer.reference,
      })
    }

    if(options.insurer.identifier){
      ret.payorParticipantCode = options.insurer.identifier.value
    }

    if (options.payee) {
      ret.payee = {
        party: options.payee.party,
        type: options.payee.type,
      };
    }
    if (options.supportingInfo) {
      ret.supportingInfo = options.supportingInfo;
    }
    return ret;
  }
  statusArray?: Function | undefined;
}

