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
  payorId: string;
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
      coding: [
        {
          system: "https://irdai.gov.in/package-code";
          code: string;
          display: string;
        }
      ];
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
  body: CLAIM;
}
export class Claim extends ResourceMain implements ResourceMaster {
  async toHtml(options: TO_HTML_HCX_OPTIONS_CLAIM): Promise<string> {
    const body: CLAIM = options.body;
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

      try {
        if (options.patinet) {
          ret += `<h3>Patient</h3>`;
          ret += await new Patient().toHtml({
            addResourceType: false,
            body: options.patinet,
          });
        }
      } catch (error) {
        console.log(erorInfo, "patinet", error);
      }

      const orgnaization = new Organization();
      try {
        if (!options.insurance) {
          const resource = (
            await new GcpFhirCRUD().getFhirResource(
              options.body.payorId,
              "Organization"
            )
          ).data;
          options.insurance = orgnaization.convertFhirToObject(resource);
        }
        ret += `<h3>Insurance</h3>`;
        ret += await orgnaization.toHtml({
          addResourceType: false,
          body: options.insurance,
        });
      } catch (error) {
        console.log(erorInfo, "insurance", error);
      }

      ret += `<hr/>`;

      
    if (body.text) {
      ret += `<h2>Text</h2> ${body.text}<br/><hr/>`;
    }

    ret += `<h2>Object to Text</h2>`;
      
      // try {
      //   if (body.text) {
      //     ret += `<h2>Text</h2> ${body.text}<br/><hr/>`;
      //     ret += `<h2>Object Text</h2>`;
      //   }
      // } catch (error) {
      //   console.log(erorInfo, "text", error);
      // }


      
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
          ret +=  this.codebleConceptToHtml(body.type)
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
              ret += `Diagnosis Codeable Concept  : ${this.codebleConceptToHtml(
                el.diagnosisCodeableConcept
              )}`;
            }
  
            if (el.type && el.type.length > 0) {
              el.type.forEach((type) => {
                ret += `Type : ${this.codebleConceptToHtml(type)}`;
              });
            }
          });
        }
      } catch (error) {
        console.log(erorInfo, "diagnosis", error);
      }


      try {
        if(body.item && body.item.length > 0){
          for (let index = 0; index < body.item.length; index++) {
            const el = body.item[index];
            if(el.encounter && el.encounter.length >0){
              ret += `<h4>Encounter</h4>`
              for (let encounterIndex = 0; encounterIndex < el.encounter.length; encounterIndex++) {
                const encounterEl = el.encounter[ encounterIndex];
                const encounterId = this.getIdFromReference({"ref" : encounterEl.reference,  "resourceType" : "Encounter"})
                const resource = await new GcpFhirCRUD().getFhirResource(encounterId, "Encounter")
                const curEncounter = new Encounter().convertFhirToObject(resource.data);
                ret += `Encounter : ${curEncounter.text} start Date : ${new TimeZone().convertTZ(curEncounter.startDate, "Asia/Kolkata", false)} ${curEncounter.endDate && `End Date : ${new TimeZone().convertTZ(curEncounter.startDate, "Asia/Kolkata", false)}`}`
              }
              

              ret += `<h4>Product and services </h4>`
              ret += `${el.sequence} Name : ${el.productOrService.coding.map(el=>this.codingtoHtml(el)).join(", ")}, quantity: ${el.quantity.value} unitPrice ${el.unitPrice.value} ${el.unitPrice.currency}`

              
            }
            
          }
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
            ret += this.codebleConceptToHtml(body.payee.type)
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
              ret += `Category  ${this.codebleConceptToHtml(el.category)}`
            }
            if(el.code){
              ret += `Code ${this.codebleConceptToHtml(el.code)}`
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
      insurer: { reference: `Organization/${options.payorId}` },
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
      payorId: this.getIdFromReference({
        resourceType: "Organization",
        ref: options.insurer.reference,
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
    };

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

// const test = {
//   resourceType: "Claim",
//   id: "bb1eea08-8739-4f14-b541-04622f18450c",
//   meta: {
//     lastUpdated: "2023-02-20T14:03:14.918+05:30",
//     profile: [
//       "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Claim.html",
//     ],
//   },
//   identifier: [
//     { system: "http://identifiersystem.com", value: "IdentifierValue" },
//   ],
//   status: "active",
//   type: {
//     coding: [
//       {
//         system: "http://terminology.hl7.org/CodeSystem/claim-type",
//         code: "institutional",
//       },
//     ],
//   },
//   use: "claim",
//   patient: { reference: "Patient/RVH1003" },
//   created: "2023-02-20T14:03:14+05:30",
//   insurer: { reference: "Organization/GICOFINDIA" },
//   provider: { reference: "Organization/WeMeanWell01" },
//   priority: {
//     coding: [
//       {
//         system: "http://terminology.hl7.org/CodeSystem/processpriority",
//         code: "normal",
//       },
//     ],
//   },
//   payee: {
//     type: {
//       coding: [
//         {
//           system: "http://terminology.hl7.org/CodeSystem/payeetype",
//           code: "provider",
//         },
//       ],
//     },
//     party: { reference: "Organization/WeMeanWell01" },
//   },
//   careTeam: [
//     { sequence: 4, provider: { reference: "Organization/WeMeanWell01" } },
//   ],
//   diagnosis: [
//     {
//       sequence: 1,
//       diagnosisCodeableConcept: {
//         coding: [
//           {
//             system: "http://irdai.com",
//             code: "E906184",
//             display: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
//           },
//         ],
//         text: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
//       },
//       type: [
//         {
//           coding: [
//             {
//               system: "http://terminology.hl7.org/CodeSystem/ex-diagnosistype",
//               code: "admitting",
//               display: "Admitting Diagnosis",
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   insurance: [
//     {
//       sequence: 1,
//       focal: true,
//       coverage: { reference: "Coverage/COVERAGE1" },
//     },
//   ],
//   item: [
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E101021",
//             display: "Twin Sharing Ac",
//           },
//         ],
//       },
//       unitPrice: { value: 100000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E924260",
//             display: "CLINICAL TOXICOLOGY SCREEN, BLOOD",
//           },
//         ],
//       },
//       unitPrice: { value: 2000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E924261",
//             display: "CLINICAL TOXICOLOGY SCREEN,URINE",
//           },
//         ],
//       },
//       unitPrice: { value: 1000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E507029",
//             display: "ECG",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E6080377",
//             display: "UltraSound Abdomen",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "502001",
//             display: "Surgeons Charges",
//           },
//         ],
//       },
//       unitPrice: { value: 1000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "5020021",
//             display: "Anesthesiologist charges",
//           },
//         ],
//       },
//       unitPrice: { value: 1000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E6080373",
//             display: "Physician charges",
//           },
//         ],
//       },
//       unitPrice: { value: 1000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "201008",
//             display: "Recovery Room",
//           },
//         ],
//       },
//       unitPrice: { value: 10000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "406003",
//             display: "intra -venous (iv) set",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E507353",
//             display: "Oral Medication",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "E925171",
//             display: "Hospital charges",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//     {
//       sequence: 1,
//       productOrService: {
//         coding: [
//           {
//             system: "https://irdai.gov.in/package-code",
//             code: "501001",
//             display: "Consultation Charges",
//           },
//         ],
//       },
//       unitPrice: { value: 5000, currency: "INR" },
//     },
//   ],
//   total: { value: 146000.0, currency: "INR" },
// };
