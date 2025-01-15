import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

const status = ["active", "cancelled", "draft", "entered-in-error"] as const;
type Status = (typeof status)[number];

const outcome = ["queued", "complete", "error", "partial"] as const;
type Outcome = (typeof outcome)[number];

interface PaymentIssuer extends MULTI_RESOURCE {
  resource: "Organization";
}

interface Requestor extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole" | "Organization";
}
interface Request extends MULTI_RESOURCE {
  resource: "Task";
}

interface DetailSubmitter extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole" | "Organization";
}

interface DetailResponsible extends MULTI_RESOURCE {
  resource: "PractitionerRole";
}

interface DetailPayee extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole" | "Organization";
}
interface Detail {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  identifier?: IDENTTIFIER;
  predecessor?: IDENTTIFIER;
  type: CODEABLE_CONCEPT;
  request?: MULTI_RESOURCE;
  submitter?: DetailSubmitter;
  response?: MULTI_RESOURCE;
  date?: string;
  responsible?: DetailResponsible;
  payee?: DetailPayee;
  amount?: MONEY;
}

interface ProcessNote {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  type?: "display" | "print" | "printoper";
  text?: string;
}

export interface PAYMENT_RECONCILIATION {
  id?: string;
  resourceType: "PaymentReconciliation";
  text: string;
  identifier: IDENTTIFIER[];
  status: Status;
  period?: PERIOD;
  createdDate: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  paymentIssuer?: PaymentIssuer;
  requestor?: Requestor;
  request?: Request;
  outcome?: Outcome;
  disposition?: string;
  paymentDate: string;
  paymentAmount: MONEY;
  paymentIdentifier?: IDENTTIFIER;
  implicitRules?: string;
  formCode?: CODEABLE_CONCEPT;
  detail?: Detail[];
  processNote: ProcessNote[];
  // type:CODEABLE_CONCEPT
  // amount:MONEY
}

export interface TO_HTML_HCX_OPTIONS_PAYMENT_RECONCILIATION
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: PAYMENT_RECONCILIATION;
}

export class PaymentReconciliation
  extends ResourceMain
  implements ResourceMaster
{
  getFHIR(options: PAYMENT_RECONCILIATION) {
    const detailHandle = () => {
      const detail =
        options.detail &&
        options.detail?.map((el) => {
          const ret = {
            id: el.id,
            extension: el.extension,
            modifierExtension: el.modifierExtension,
            identifier: el.identifier,
            predecessor: el.predecessor,
            type: el.type,
            request: el.request && {
              reference:
                el.request.resource &&
                el.request.id &&
                `${el.request.resource}/${el.request.id}`,
              identifier: el.request.identifier,
              display: el.request.display,
              type: el.request.type,
            },
            submitter: el.submitter && {
              reference:
                el.submitter.resource &&
                el.submitter.id &&
                `${el.submitter.resource}/${el.submitter.id}`,
              identifier: el.submitter.identifier,
              display: el.submitter.display,
              type: el.submitter.type,
            },
            response: el.response && {
              reference:
                el.response.resource &&
                el.response.id &&
                `${el.response.resource}/${el.response.id}`,
              identifier: el.response.identifier,
              display: el.response.display,
              type: el.response.type,
            },
            date: el.date,
            responsible: el.responsible && {
              reference:
                el.responsible.resource &&
                el.responsible.id &&
                `${el.responsible.resource}/${el.responsible.id}`,
              identifier: el.responsible.identifier,
              display: el.responsible.display,
              type: el.responsible.type,
            },
            payee: el.payee && {
              reference:
                el.payee.resource &&
                el.payee.id &&
                `${el.payee.resource}/${el.payee.id}`,
              identifier: el.payee.identifier,
              display: el.payee.display,
              type: el.payee.type,
            },
            amount: el.amount,
          };
          return ret;
        });
      return detail;
    };
    const body = {
      resourceType: "PaymentReconciliation",
      id: options.id,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PaymentReconciliation",
        ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      extension: options.extension,
      modifierExtension: options.modifierExtension,
      identifier: options.identifier,
      status: options.status,
      period: options.period,
      created: options.createdDate,
      paymentIssuer: options.paymentIssuer && {
        reference:
          options.paymentIssuer.resource &&
          options.paymentIssuer.id &&
          `${options.paymentIssuer.resource}/${options.paymentIssuer.id}`,
        identifier: options.paymentIssuer.identifier,
        display: options.paymentIssuer.display,
        type: options.paymentIssuer.type,
      },
      requestor: options.requestor && {
        reference:
          options.requestor.resource &&
          options.requestor.id &&
          `${options.requestor.resource}/${options.requestor.id}`,
        identifier: options.requestor.identifier,
        display: options.requestor.display,
        type: options.requestor.type,
      },
      request: options.request && {
        reference:
          options.request.resource &&
          options.request.id &&
          `${options.request.resource}/${options.request.id}`,
        identifier: options.request.identifier,
        display: options.request.display,
        type: options.request.type,
      },
      outcome: options.outcome,
      disposition: options.disposition,
      paymentDate: options.paymentDate,
      paymentAmount: options.paymentAmount,
      paymentIdentifier: options.paymentIdentifier,
      implicitRules: options.implicitRules,
      formCode: options.formCode,
      detail: options.detail && detailHandle(),
      processNote: options.processNote,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const detailHandle = () => {
      const details: Detail[] = options.detail.map((el: any) => {
        const ret: Detail = {
          amount: el.amount,
          date: el.data,
          extension: el.extension,
          id: el.id,
          identifier: el.identifier,
          modifierExtension: el.modifierExtension,
          payee: el.payee && this.getFromMultResource(el.payee),
          predecessor: el.predecessor,
          request: el.request && this.getFromMultResource(el.request),
          response: el.response && this.getFromMultResource(el.response),
          responsible:
            el.responsible && this.getFromMultResource(el.responsible),
          submitter: el.submitter && this.getFromMultResource(el.submitter),
          type: el.type,
        };

        // Remove keys with null or undefined values
        Object.keys(ret).forEach((key) => {
          if (
            ret[key as keyof Detail] === null ||
            ret[key as keyof Detail] === undefined
          ) {
            delete ret[key as keyof Detail];
          }
        });
        return ret;
      });
      return details;
    };

    const processNoteHandle = () => {
      const processNote: ProcessNote[] = options.processNote.map(
        (el: ProcessNote) => {
          const ret: ProcessNote = el;
          // Remove keys with null or undefined values
          Object.keys(ret).forEach((key) => {
            if (
              ret[key as keyof ProcessNote] === null ||
              ret[key as keyof ProcessNote] === undefined
            ) {
              delete ret[key as keyof ProcessNote];
            }
          });

          return ret;
        }
      );

      return processNote;
    };

    const ret: PAYMENT_RECONCILIATION = {
      id: options.id,
      resourceType: "PaymentReconciliation",
      text: options.text && options.text.div,
      identifier: options.identifier,
      status: options.status,
      period: options.period,
      createdDate: options.created,
      extension: options.extension,
      modifierExtension: options.modifierExtension,
      paymentIssuer:
        options.paymentIssuer &&
        this.getFromMultResource(options.paymentIssuer),
      requestor:
        options.requestor && this.getFromMultResource(options.requestor),
      request: options.request && this.getFromMultResource(options.request),
      outcome: options.outcome,
      disposition: options.disposition,
      paymentDate: options.paymentDate,
      paymentAmount: options.paymentAmount,
      paymentIdentifier: options.paymentIdentifier,
      implicitRules: options.implicitRules,
      formCode: options.formCode,
      detail: options.detail && detailHandle(),
      processNote: options.processNote && processNoteHandle(),
    };

    // Remove keys with null or undefined values
    Object.keys(ret).forEach((key) => {
      if (
        ret[key as keyof PAYMENT_RECONCILIATION] === null ||
        ret[key as keyof PAYMENT_RECONCILIATION] === undefined
      ) {
        delete ret[key as keyof PAYMENT_RECONCILIATION];
      }
    });

    return ret;
  }
  async toHtml(option: TO_HTML_HCX_OPTIONS_PAYMENT_RECONCILIATION): Promise<string> {
    const text = option.body.text || "";
    return text;
  }
  statusArray(): Status[] {
    return status.map((el) => el);
  }
}
