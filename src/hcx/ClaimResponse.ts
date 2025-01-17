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
    const patient = options.patinet && `UHID ${options.patinet.MRN} Name : ${options.patinet.name}`
    const insurance = options.insurance && `${options.insurance.name} ${options.insurance.phone} ${options.insurance.phone}`
  
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
                            ${renderList(
                              item.adjudication.map(
                                (adjudication) =>
                                  `<div>
                                            <p><strong>Category:</strong> ${renderCodeableConcept(
                                              adjudication.category
                                            )}</p>
                                            <p><strong>Reason:</strong> ${renderCodeableConcept(
                                              adjudication.reason
                                            )}</p>
                                            <p><strong>Amount:</strong> ${renderMoney(
                                              adjudication.amount
                                            )}</p>
                                            <p><strong>Value:</strong> ${
                                              adjudication.value || "N/A"
                                            }</p>
                                        </div>`
                              )
                            )}
                        </div>`
              ) || []
            )}
            <h2>Payment</h2>
            ${
              claimResponse.payment
                ? `
                <div>
                    <p><strong>Type:</strong> ${renderCodeableConcept(
                      claimResponse.payment.type
                    )}</p>
                    <p><strong>Amount:</strong> ${renderMoney(
                      claimResponse.payment.amount
                    )}</p>
                    <p><strong>Date:</strong> ${
                      claimResponse.payment.date || "N/A"
                    }</p>
                    <p><strong>Adjustment:</strong> ${renderMoney(
                      claimResponse.payment.adjustment
                    )}</p>
                    <p><strong>Adjustment Reason:</strong> ${renderCodeableConcept(
                      claimResponse.payment.adjustmentReason
                    )}</p>
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
