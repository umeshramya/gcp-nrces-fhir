import GcpFhirCRUD from "../classess/gcp";
import {
  ADDRESS,
  ATTACHMENT,
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
  PERIOD,
  REFERENCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { SAMPLE_QUANTITY } from "../resources/Observation";
import { Organization } from "../resources/Organization";
import { Patient } from "../resources/Patient";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

interface ADJUDICATION {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  /** system  http://terminology.hl7.org/CodeSystem/adjudication*/
  category: CODEABLE_CONCEPT;
  reason: CODEABLE_CONCEPT;
  amount?: MONEY;
  value?: number;
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
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  /** system  http://terminology.hl7.org/CodeSystem/adjudication*/
  category: CODEABLE_CONCEPT;
  amount: MONEY;
}

interface ITEM {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  itemSequence: number;
  noteNumber: number[];
  adjudication: ADJUDICATION[];
  detail?: DETAIL[];
  formCode?: CODEABLE_CONCEPT;
}

interface PAYEMENT {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  type: CODEABLE_CONCEPT;
  adjustment?: MONEY;
  adjustmentReason?: CODEABLE_CONCEPT;
  date?: string;
  amount: MONEY;
  identifier: IDENTTIFIER;
}

interface ADD_ITEM {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  itemSequence: number[];
  detailSequence: number[];
  subdetailSequence: number[];
  provider: REFERENCE;
  productOrService: CODEABLE_CONCEPT;
  modifier: CODEABLE_CONCEPT[];
  programCode: CODEABLE_CONCEPT[];
  quantity?: SAMPLE_QUANTITY;
  unitPrice?: MONEY;
  factor?: number;
  net?: MONEY;
  bodySite?: CODEABLE_CONCEPT;
  subSite: CODEABLE_CONCEPT[];
  noteNumber: number[];
  adjudication: ADJUDICATION[];
  serviced?: {
    servicedDate?: string;
    servicedPeriod?: PERIOD;
  };
  location?: {
    locationCodeableConcept: CODEABLE_CONCEPT;
    locationAddress: ADDRESS;
    locationReference: REFERENCE;
  };
}

interface INSURANCE {
  sequence: number;
  focal: boolean;
  coverage: REFERENCE;
  businessArrangement?: string;
  claimResponse?: REFERENCE;
}

interface ERROR {
  itemSequence?: number;
  detailSequence?: number;
  subDetailSequence?: number;
  code: CODEABLE_CONCEPT;
}

interface PATIENT_MULTIRESOURCE extends MULTI_RESOURCE{
 "resource" : "Patient"
}

interface INSURER_MULTIRESOURCE extends MULTI_RESOURCE{
  "resource" : "Organization"
 }

 interface REQUESTER_MULTIRESOURCE extends MULTI_RESOURCE{
  "resource" : "Practitioner" | "PractitionerRole" | "Organization"
 }

 interface REQUEST_MULTIRESOURCE extends MULTI_RESOURCE{
  "resource" : "Claim"
 }
 interface COMMUNICATION_REQUEST_MULTIRESOURCE extends MULTI_RESOURCE{
  "resource" : "CommunicationRequest"
 }
interface CLAIM_RESPONSE {
  id?: string;
  text: string;
  resourceType: "ClaimResponse";
  identifier: IDENTTIFIER[];
  containedInlineResource?:any[];
  language?:string
  //** "http://terminology.hl7.org/CodeSystem/claim-type" */
  type: CODEABLE_CONCEPT;
  use: "claim" | "preauthorization" | "predetermination";
  created: string;
  outcome: "queued" | "complete" | "error" | "partial";
  hcx?: "nhcx" | "swastha";
  extension?:EXTENSION[];
  modifierExtension?:EXTENSION[]
  patient: PATIENT_MULTIRESOURCE;
  insurer: INSURER_MULTIRESOURCE;
  requestor?: REQUESTER_MULTIRESOURCE;
  request?: REQUEST_MULTIRESOURCE;
  status: "active" | "cancelled" | "draft" | "entered-in-error";
  subType?: CODEABLE_CONCEPT;
  disposition?: string;
  preAuthRef?: string;
  preAuthPeriod: PERIOD;
  payeeType?: CODEABLE_CONCEPT;
  item?: ITEM[];
  detail?: DETAIL[];
  adjudication?: ADJUDICATION[];
  total: TOTAL[];
  payment?: PAYEMENT;
  fundsReserve?: CODEABLE_CONCEPT;
  formCode?: CODEABLE_CONCEPT;
  form: ATTACHMENT;
  addItem: ADD_ITEM[];
  communicationRequest?: COMMUNICATION_REQUEST_MULTIRESOURCE[];
  insurance?: INSURANCE[];
  error: ERROR[];
}
interface TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}
export class ClaimResponse extends ResourceMain implements ResourceMaster {
  getFHIR(options: CLAIM_RESPONSE) {
    const body = {
      resourceType: "ClaimResponse",
      id: options.id || undefined,
      contained:options.containedInlineResource,

      modifierExtension:options.modifierExtension,
      extension:options.extension,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        source: "#JrkobxCRdZUI6QNh",
      },
      language:options.language,
      text: {
        status: "generated",
        div: options.text,
      },
      identifier: options.identifier,
      disposition: options.disposition,
      preAuthRef: options.preAuthRef,
      preAuthPeriod: options.preAuthPeriod,
      status: options.status,
      type: options.type,
      subType: options.subType,
      use: options.use,
      patient: options.patient && {
        reference:
          options.patient.resource &&
          `${options.patient.resource}/${options.patient.id}`,
        type: options.patient.type,
        identifier: options.patient.identifier,
        display: options.patient.display,
      },
      created: options.created,
      insurer: options.patient && {
        reference:
          options.insurer.resource &&
          `${options.insurer.resource}/${options.insurer.id}`,
        type: options.insurer.type,
        identifier: options.insurer.identifier,
        display: options.insurer.display,
      },
      requestor: options.requestor && {
        reference:
          options.requestor.resource &&
          `${options.requestor.resource}/${options.requestor.id}`,
        type: options.requestor.type,
        identifier: options.requestor.identifier,
        display: options.requestor.display,
      },
      request: options.request || undefined,
      outcome: options.outcome,
      payeeType: options.payeeType,
      item: options.item,
      detail: options.detail,
      total: options.total,
      payment: options.payment,
      fundsReserve: options.fundsReserve,
      formCode: options.formCode,
      form: options.form,
      addItem: options.addItem,
      communicationRequest: options.communicationRequest &&
      options.communicationRequest.map((el) => {
        return {
          reference: el.resource && `${el.resource}/${el.id}`,
          type: el.type,
          identifier: el.identifier,
          display: el.display,
        };
      }) ,
      insurance: options.insurance,
      error: options.error,
    };

    return body;
  }
  convertFhirToObject(options: any):CLAIM_RESPONSE {
  const ret: CLAIM_RESPONSE ={
    text: options?.div?.Text,
    resourceType: "ClaimResponse",
    identifier: options.identifier,
    type: options.type,
    use: options.use,
    created: options.created,
    outcome: options.outcome,
    patient: this.getFromMultResource(options.patient) as any,
    insurer: this.getFromMultResource(options.insurer) as any,
    status: options.status,
    preAuthPeriod: options.preAuthPeriod,
    total: options.total,
    form: options.form,
    addItem: options.addItem,
    error: options.error
  }

  if(options.language){
    ret.language=options.language
  }

  if(options.extension){
    ret.extension=options.extension
  }
  if(options.modifierExtension){
    ret.modifierExtension=options.modifierExtension
  }

  if(options.requestor){
    ret.requestor= this.getFromMultResource(options.requestor) as any
  }

  if(options.request){
    ret.request=this.getFromMultResource(options.request) as any
  }

  if(options.subType){
    ret.subType=options.subType
  }

  if(options.disposition){
    ret.disposition=ret.disposition
  }

  if(options.preAuthRef){
    ret.preAuthRef= ret.preAuthRef
  }

  if(options.payeeType){
    ret.payeeType=ret.payeeType
  }

  if(options.item){
    ret.item=options.item
  }
  if(options.detail){
    ret.detail=options.detail
  }

  if(options.payment){
    ret.payment=options.payment
  }

  if(options.fundsReserve){
    ret.fundsReserve=options.fundsReserve
  }

  if(options.formCode){
    ret.formCode=options.formCode
  }

    return ret;
  }
  async toHtml(options: TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE): Promise<string> {
    const getAdjudication = (adjication: ADJUDICATION[]): string => {
      const retAdjucation = adjication.map((el) => {
        let ret = "";
        ret += `<tr>`;
        ret += `<td> ${el.id || ""}  </td>`;
        ret += `<td>${this.codeableConceptToHtml(el.category)}</td>`;
        ret += `<td>${this.codeableConceptToHtml(el.reason)}</td>`;
        ret += `<td>${el.amount?.currency || ""}${
          el.amount?.value || ""
        } </td>`;
        ret += `<td>${el.value || ""}</td>`;
        ret += `<td>
        ${
          el.extension &&
          el.extension.map((ex) => this.extensionToHtml(ex)).join("<br/>")
        }
        ${
          el.modifierExtension &&
          el.modifierExtension
            .map((ex) => this.extensionToHtml(ex))
            .join("<br/>")
        }</td>`;
        ret += `</tr>`;
        return ret;
      });

      const ret = `
      <table data-pdfmake="{'widths':['10%','25%', '15%', '15%', '15%', '20%']}">
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Reason</th>
          <th>Amount</th>
          <th>Value</th>
          <th>Extension</th>
          ${retAdjucation?.join("") || ""}
        </tr>
      </table>
      `;

      return ret;
    };

    const getDetail = (detail: DETAIL) => {
      let ret = `<p> ${
        detail.detailSequence && `Sequence ${detail.detailSequence}`
      } ${detail.id && `Id ${detail.id}`} ${
        detail.noteNumber && `NoteNumber ${detail.noteNumber}`
      }</p>`;
      ret +=
        detail.adjudication &&
        `<p>Adjudication</P ${getAdjudication(detail.adjudication)}`;
      ret +=
        detail.extension &&
        `<p>Extension</p>${detail.extension
          .map((el) => this.extensionToHtml(el))
          .join("<br/>")}`;
      ret +=
        detail.modifierExtension &&
        `<p>Modified Extension</p>${detail.modifierExtension
          .map((el) => this.extensionToHtml(el))
          .join("<br/>")}`;

      
        detail.subDetail && detail.subDetail.map(el=>{
          // @ts-ignore
          delete el.subDetail
          ret +=  detail.subDetail && `<p>Sub Detail</p>${getDetail(el)}`
        })

      return ret;
    };

    const claimResponse = this.convertFhirToObject(options.body);
    const renderList = (items: string[]): string =>
      `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

    const renderCodeableConcept = (concept?: CODEABLE_CONCEPT): string =>
      concept
        ? `<span>${
            concept.text ||
            concept.coding?.map((c) => c.display).join(", ") ||
            ""
          }</span>`
        : "";

    const renderReference = (reference?: REFERENCE): string =>
      reference
        ? `<span>${reference.reference || reference.display || ""}</span>`
        : "";

    const renderMoney = (money?: MONEY): string =>
      money ? `<span>${money.currency || ""} ${money.value || ""}</span>` : "";

    return `
        <div>
            <h1>Claim Response</h1>
            <p><strong>Resource Type:</strong> ${claimResponse.resourceType}</p>
            <p><strong>ID:</strong> ${claimResponse.id || "N/A"}</p>
            <p><strong>Text:</strong> ${claimResponse.text}</p>
            <p><strong>Status:</strong> ${claimResponse.status}</p>
            <p><strong>Outcome:</strong> ${claimResponse.outcome}</p>
            <p><strong>Use:</strong> ${claimResponse.use}</p>
            ${
              claimResponse.adjudication &&
              `<p><b>Adjudication</b></p>${getAdjudication(
                claimResponse.adjudication
              )}`
            }
            <p><strong>Created:</strong> ${claimResponse.created}</p>
            <p><strong>Disposition:</strong> ${
              claimResponse.disposition || "N/A"
            }</p>
            <h2>Totals</h2>
            ${renderList(
              claimResponse.total.map(
                (total) =>
                  `<div><strong>Category:</strong> ${renderCodeableConcept(
                    total.category
                  )} <strong>Amount:</strong> ${renderMoney(
                    total.amount
                  )}</div>`
              )
            )}
            <h2>Items</h2>
            ${renderList(
              claimResponse.item?.map(
                (item) =>
                  `<div>
                            <p><strong>Item Sequence:</strong> ${
                              item.itemSequence
                            }</p>
                            <p><strong>Adjudication:</strong></p>
                            ${getAdjudication(item.adjudication)}
                        </div>`
              ) || []
            )}
            <h2>Detail</h2>
            ${
              claimResponse.detail &&
              claimResponse.detail.map((el) => getDetail(el)).join("<br/>")
            }
            <h2>Payment</h2>
            ${
              claimResponse.payment
                ? `
                <div>
                  ${
                    claimResponse.payment.type &&
                    `<p><strong>Type:</strong> ${this.codeableConceptToHtml(
                      claimResponse.payment.type
                    )}</p>`
                  } 
                  ${
                    claimResponse.payment.amount &&
                    `<p><strong>Amount:</strong> ${renderMoney(
                      claimResponse.payment.amount
                    )}</p>`
                  }
                    <p><strong>Date:</strong> ${
                      claimResponse.payment.date || "N/A"
                    }</p>
                    ${
                      claimResponse.payment.adjustment &&
                      `<p><strong>Adjustment:</strong> ${renderMoney(
                        claimResponse.payment.adjustment
                      )}</p>`
                    }
                </div>`
                : "<p>No payment details available.</p>"
            }
            <h2>Errors</h2>
            ${renderList(
              claimResponse.error?.map(
                (error) =>
                  `<div>
                            <p><strong>Code:</strong> ${renderCodeableConcept(
                              error.code
                            )}</p>
                            <p><strong>Item Sequence:</strong> ${
                              error.itemSequence || "N/A"
                            }</p>
                            <p><strong>Detail Sequence:</strong> ${
                              error.detailSequence || "N/A"
                            }</p>
                            <p><strong>Sub Detail Sequence:</strong> ${
                              error.subDetailSequence || "N/A"
                            }</p>
                        </div>`
              ) || []
            )}
        </div>
    `;
  }
  statusArray?: Function | undefined;
}
