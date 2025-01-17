import GcpFhirCRUD from "../classess/gcp";
import {
  ADDRESS,
  ATTACHMENT,
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
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

interface CLAIM_RESPONSE {
  id?: string;
  text: string;
  resourceType: "ClaimResponse";
  identifiers: IDENTTIFIER[];
  //** "http://terminology.hl7.org/CodeSystem/claim-type" */
  type: CODEABLE_CONCEPT;
  use: "claim" | "preauthorization" | "predetermination";
  created: string;
  outcome: "queued" | "complete" | "error" | "partial";
  hcx?: "nhcx" | "swastha";
  patient: REFERENCE;
  insurer: REFERENCE;
  requestor?: REFERENCE;
  request?: REFERENCE;
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
  communicationRequest?: REFERENCE;
  insurance?: INSURANCE[];
  error: ERROR[];
}
interface TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: CLAIM_RESPONSE;
}
export class ClaimResponse extends ResourceMain implements ResourceMaster {
  getFHIR(options: CLAIM_RESPONSE) {
    const body = {
      resourceType: "ClaimResponse",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        source: "#JrkobxCRdZUI6QNh",
      },
      text: {
        status: "generated",
        div: options.text,
      },
      identifier: options.identifiers,
      disposition: options.disposition,
      preAuthRef: options.preAuthRef,
      preAuthPeriod: options.preAuthPeriod,
      status: options.status,
      type: options.type,
      subType: options.subType,
      use: options.use,
      patient: options.patient,
      created: options.created,
      insurer: options.insurer,
      requestor: options.requestor || undefined,
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
      communicationRequest: options.communicationRequest,
      insurance: options.insurance,
      error: options.error,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const ret: CLAIM_RESPONSE = options;
    options.text = options.text && options.text.div ? options.text.div : "";
    return ret;
  }
  async toHtml(options: TO_HTML_HCX_OPTIONS_CLAIM_RESPONSE): Promise<string> {
    const patient =
      options.patinet &&
      `UHID ${options.patinet.MRN} Name : ${options.patinet.name}`;
    const insurance =
      options.insurance &&
      `${options.insurance.name} ${options.insurance.phone || ""} ${
        options.insurance.phone || ""
      }`;

    const getAdjudication = (adjication: ADJUDICATION[]): string => {
      const retAdjucation = adjication.map((el) => {
        let ret = "";
        ret += `<tr>`;
        ret += `<td> ${el.id || ""}  </td>`;
        ret += `<td>${this.codebleConceptToHtml(el.category)}</td>`;
        ret += `<td>${this.codebleConceptToHtml(el.reason)}</td>`;
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

    const claimResponse = options.body;
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
            <h2>Patient</h2>
            ${patient}
            <h2>Insurer</h2>
            ${insurance}
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
                    `<p><strong>Type:</strong> ${this.codebleConceptToHtml(
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
