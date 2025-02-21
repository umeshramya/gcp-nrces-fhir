import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

const status = ["active", "cancelled", "draft", "entered-in-error"] as const;
type Status = (typeof status)[number];

interface Payment extends MULTI_RESOURCE {
  resource: "PaymentReconciliation";
}

interface Recipient extends MULTI_RESOURCE {
  resource: "Organization";
}

interface Payee extends MULTI_RESOURCE {
  resource: "Organization" | "Practitioner" | "PractitionerRole";
}

export interface PAYMENT_NOTICE {
  id?: string;
  resourceType: "PaymentNotice";
  text: string;
  identifier: IDENTTIFIER[];
  status: Status;
  request?: MULTI_RESOURCE;
  response?: MULTI_RESOURCE;
  createdDate: string;
  payment: Payment;
  paymentDate?: string;
  recipient: Recipient;
  amount: MONEY;
  paymentStatus: CODEABLE_CONCEPT;
  payee?: Payee;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  implicitRules?: string;
}

export interface TO_HTML_HCX_OPTIONS_PAYEMENT_NOTICE
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}

export class PaymentNoctice extends ResourceMain implements ResourceMaster {
  getFHIR(options: PAYMENT_NOTICE) {
    const body = {
      resourceType: "PaymentNotice",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: "2023-09-07T14:58:58.181+05:30",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PaymentNotice",
        ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      identifier: options.identifier,
      status: options.status,
      request: options.request && {
        reference:
          options.request.resource &&
          options.request.id &&
          `${options.request.resource}/${options.request.id}`,
        identifier: options.request.identifier,
        type: options.request.type,
        display: options.request.display,
      },
      response: options.response && {
        reference:
          options.response.resource &&
          options.response.id &&
          `${options.response.resource}/${options.response.id}`,
        identifier: options.response.identifier,
        type: options.response.type,
        display: options.response.display,
      },
      created: options.createdDate,
      payment: options.payment && {
        reference:
          options.payment.resource &&
          options.payment.id &&
          `${options.payment.resource}/${options.payment.id}`,
        identifier: options.payment.identifier,
        type: options.payment.type,
        display: options.payment.display,
      },
      paymentDate: options.paymentDate,
      recipient: options.recipient && {
        reference:
          options.recipient.resource &&
          options.recipient.id &&
          `${options.recipient.resource}/${options.recipient.id}`,
        identifier: options.recipient.identifier,
        type: options.recipient.type,
        display: options.recipient.display,
      },
      amount: options.amount,
      paymentStatus: options.paymentStatus,
      payee: options.payee && {
        reference:
          options.payee.resource &&
          options.payee.id &&
          `${options.payee.resource}/${options.payee.id}`,
        identifier: options.payee.identifier,
        type: options.payee.type,
        display: options.payee.display,
      },
      extension: options.extension,
      modifierExtension: options.modifierExtension,
      implicitRules: options.implicitRules,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const ret: PAYMENT_NOTICE = {
      id: options.id,
      resourceType: "PaymentNotice",
      text: options.text && options.text.div,
      identifier: options.identifier,
      status: options.status,
      request: options.request && this.getFromMultResource(options.request),
      response: options.response && this.getFromMultResource(options.response),
      createdDate: options.created,
      payment: options.payment && this.getFromMultResource(options.payment),
      paymentDate: options.paymentDate,
      recipient:
        options.recipient && this.getFromMultResource(options.recipient),
      amount: options.amount,
      paymentStatus: options.paymentStatus,
      payee: options.payee && this.getFromMultResource(options.payee),
      extension: options.extension,
      modifierExtension: options.modifierExtension,
      implicitRules: options.implicitRules,
    };

    // Remove keys with null or undefined values
    Object.keys(ret).forEach((key) => {
      if (
        ret[key as keyof PAYMENT_NOTICE] === null ||
        ret[key as keyof PAYMENT_NOTICE] === undefined
      ) {
        delete ret[key as keyof PAYMENT_NOTICE];
      }
    });

    return ret;
  }
  async toHtml(option: TO_HTML_HCX_OPTIONS_PAYEMENT_NOTICE): Promise<string> {

      const body = this.convertFhirToObject(option.body)
    
      const htmlContent = `
        <div>
          <h1>Payment Notice</h1>
          <p><strong>ID:</strong> ${body.id || "N/A"}</p>
          <p><strong>Status:</strong> ${body.status}</p>
          <p><strong>Created Date:</strong> ${body.createdDate}</p>
          <p><strong>Payment Date:</strong> ${body.paymentDate || "N/A"}</p>
          <p><strong>Payment Amount:</strong> ${body.amount?.value || "N/A"} ${
        body.amount?.currency || ""
      }</p>
          <p><strong>Payment Status:</strong> ${
            body.paymentStatus?.text || "N/A"
          }</p>
          <p><strong>Payee:</strong> ${
            body.payee?.display || "N/A"
          } (${body.payee?.type || "Unknown"})
          ${body.payee?.identifier && this.identifierToHtml(body.payee.identifier)}</p>
          <p><strong>Recipient:</strong> ${
            body.recipient?.display || "N/A"
          } (${body.recipient?.type || "Unknown"})
           ${body.recipient?.identifier && this.identifierToHtml(body.recipient.identifier)}</p>
          <p><strong>Request:</strong> ${
            body.request?.display || "N/A"
          } (${body.request?.reference || "Unknown"})
          </p>
          <p><strong>Response:</strong> ${
            body.response?.display || "N/A"
          } (${body.response?.reference || "Unknown"})</p>
          <p><strong>Additional Details:</strong></p>
          <ul>
            ${
              body.extension
                ? body.extension
                    .map(
                      (ext) =>
                        `<li>${this.extensionToHtml(ext)}</li>`
                    )
                    .join("")
                : "<li>No extensions provided</li>"
            }
          </ul>
          <p><strong>Text:</strong></p>
          <div>${body.text || "No text available"}</div>
        </div>
      `;
    
      return htmlContent;

    
  }
  statusArray(): Status[] {
    return status.map((el) => el);
  }
}
