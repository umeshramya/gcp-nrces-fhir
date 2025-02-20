import GcpFhirCRUD from "../classess/gcp";
import ResourceFactory from "../classess/ResourceFactory";
import {
  CODEABLE_CONCEPT,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { Coverage } from "./Coverage";
import { CoverageEligibilityRequest, INSURANCE } from "./CoverageEligibilityRequest";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";
const CoverageEligibilityResponcePurpose = [
  "auth-requirements",
  "benefits",
  "discovery",
  "validation",
] as const;
type CoverageEligibilityResponcePurpose =
  (typeof CoverageEligibilityResponcePurpose)[number];

interface PRVIDER_ITEM extends MULTI_RESOURCE {
  resource: "Practitioner" | "PractitionerRole";
}

interface BENFIT {
  type?: CODEABLE_CONCEPT;
  allowedMoney?: {
    value: number;
    currency: string;
  };
  allowedUnsignedInt?: number;
  allowedString?: string;

  usedMoney?: {
    usedUnsignedInt?: number;
    value: number;
    currency: string;
  };
  usedUnsignedInt?: number;
  usedString?: string;
}

interface Patient extends MULTI_RESOURCE{
  resource : "Patient"
}

interface Requestor extends MULTI_RESOURCE{
  "resource" : "Practitioner" | "PractitionerRole" | "Organization"
}

interface Request extends MULTI_RESOURCE{
  "resource" : "CoverageEligibilityResponse"
}

interface Insurer extends MULTI_RESOURCE{
 "resource" : "Organization"
}

export interface COVERAGE_ELIGIBILITY_RESPONSE {
  id?: string;
  hcx?: "nhcx" | "swasth";
  resourceType: "CoverageEligibilityResponse",
  patient:Patient
  identifiers?: IDENTTIFIER[];
  text?: string;
  status: "active" | "cancelled" | "draft" | "entered-in-error";
  purpose: CoverageEligibilityResponcePurpose[];
  requestor:Requestor;
  createdDate: string;
  request : Request
  insurer:Insurer
  outcome: "queued" | "complete" | "error" | "partial";
  disposition?: string;

  insurance: INSURANCE[];
  error?: CODEABLE_CONCEPT[];
}

export interface TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_RESPONSE
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: any;
}
export class CoverageEligibiltyResponse
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(
    option: TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_RESPONSE
  ): Promise<string> {
    let ret = "";
    const body: COVERAGE_ELIGIBILITY_RESPONSE = this. convertFhirToObject(option.body);

    if (option.addResourceType) {
      ret += `<h1>Coverage Eligibility Response</h1>`;
    }
    // Date
    ret += `Date : ${new TimeZone().convertTZ(
      body.createdDate,
      "Asia/Kolkata",
      false
    )} <br/>`;

    // Error

    if (body.error) {
      ret +=
        body.error &&
        body.error.length > 0 &&
        `<h3><b>Error</b> : ${body.error
          .map((el) => this.codeableConceptToHtml(el))
          .toString()}</h3>`;
    }

    if (body.status) {
      ret += `<b>Satus</b> : ${body.status}<br/>`;
    }

    if (body.outcome) {
      ret += `<h3><b>Outcome</b> : ${body.outcome}</h3>`;
    }

    // Text
    if (body.text) {
      ret += `<h2>Text</h2>`;
      ret += ` ${body.text}<br/>`;
    }

    ret += `<h2> Object to Text</h2>`;
    // disposition
    if (body.disposition) {
      ret += `<b>Disposition</b> : ${body.disposition} <br/>`;
    }

    // Purpose
    if (body.purpose) {
      ret += `<h3><b>Purpose</b> : ${body.purpose.toString()}</h3>`;
    }

    if(body.insurance){
      ret += await new CoverageEligibilityRequest().insuranceToHtml({
        "val" : Array.isArray(body.insurance )  ? body.insurance : [body.insurance],
        "coverage":option.coverages || [],
        "patient" : option.patient,
        "payerCode" : option.payerCode,
        "payerName" : option.payerName
      })
    }
    return ret;
  }
  getFHIR(options: COVERAGE_ELIGIBILITY_RESPONSE) {
    const body = {
      resourceType: "CoverageEligibilityResponse",
      id: options.id || undefined,
      meta: {
        profile:
          options.hcx == "nhcx"
            ? [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/CoverageEligibilityResponse",
              ]
            : [
                "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityResponse.html",
              ],
      },
      language: "en",
      text: {
        status: "generated",
        div: options.text,
      },
      status: options.status,
      purpose: options.purpose,
      patient: options.patient && {
        "reference" : options.patient.resource && options.patient.id && `Patient/${options.patient.id}`,
        "display" : options.patient.display,
        "identifier" : options.patient.identifier,
        "type" : options.patient.type
      },
      created: options.createdDate,
      requestor: options.requestor && {
        "reference" : options.requestor.resource && options.requestor.id && `${options.requestor.resource}/${options.patient.id}`,
        "display" : options.requestor.display,
        "identifier" : options.requestor.identifier,
        "type" : options.requestor.type
      },
      request: options.request && {
        "reference" : options.request.resource && options.request.id && `CoverageEligibilityRequest/${options.patient.id}`,
        "display" : options.request.display,
        "identifier" : options.request.identifier,
        "type" : options.request.type
      },
      outcome: options.outcome,
      disposition: options.disposition,
      insurer: options.insurer && {
        "reference" : options.insurer.resource && options.insurer.id && `Organization/${options.patient.id}`,
        "display" : options.insurer.display,
        "identifier" : options.insurer.identifier,
        "type" : options.insurer.type
      },
      insurance: options.insurance,
      error: options.error,
      identifier: options.identifiers,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const ret: COVERAGE_ELIGIBILITY_RESPONSE = {
      id: options.id,
      text: (options.text && options.text.div) || "",
      status: options.status,
      purpose: options.purpose,
      patient:options.patient &&  this.getFromMultResource({
        "reference" : options.patient.reference,
        "display" :  options.patient.display,
        "type" : options.patient.type,
        "identifier" : options.patient.identifier
      }),
      createdDate: options.created,
      request: options.request &&  this.getFromMultResource({
        "reference" : options.request.reference,
        "display" :  options.request.display,
        "type" : options.request.type,
        "identifier" : options.request.identifier
      }),
      outcome: options.outcome,
      insurer: options.insurer &&  this.getFromMultResource({
        "reference" : options.insurer.reference,
        "display" :  options.insurer.display,
        "type" : options.insurer.type,
        "identifier" : options.insurer.identifier
      }),
      insurance: options.insurance,
      error: options.error,
      identifiers: options.identifier,
      requestor:options.requestor &&  this.getFromMultResource({
        "reference" : options.requestor.reference,
        "display" :  options.requestor.display,
        "type" : options.requestor.type,
        "identifier" : options.requestor.identifier
      }),
      resourceType: "CoverageEligibilityResponse"
    };
    if (options.disposition) {
      ret.disposition = options.disposition;
    }

    return ret;
  }
  statusArray?: Function | undefined;


}
