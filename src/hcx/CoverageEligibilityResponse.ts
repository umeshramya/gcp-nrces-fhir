import GcpFhirCRUD from "../classess/gcp";
import ResourceFactory from "../classess/ResourceFactory";
import {
  CODEABLE_CONCEPT,
  IDENTTIFIER,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { Organization, ORGANIZATION } from "../resources/Organization";
import { Patient, PATIENT } from "../resources/Patient";
import ResourceMain from "../resources/ResourceMai";
import { TimeZone } from "../TimeZone";
import { COVERAGE, Coverage } from "./Coverage";
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

export interface COVERAGE_ELIGIBILITY_RESPONSE {
  id?: string;
  hcx?: "nhcx" | "swasth";
  resourceType: "CoverageEligibilityResponse",
  identifiers?: IDENTTIFIER[];
  text?: string;
  status: "active" | "cancelled" | "draft" | "entered-in-error";
  purpose: CoverageEligibilityResponcePurpose[];
  patientId: string;
  createdDate: string;
  practitionerId?: string;
  coverageEligibilityRequestId: string;
  outcome: "queued" | "complete" | "error" | "partial";
  disposition?: string;
  insurerId: string;
  insurance: {
    coverage: {
      reference: `Coverage/${string}`;
    };
    inforce?: boolean;
    benefitPeriod: PERIOD;
    item: {
      category?: CODEABLE_CONCEPT;
      productOrService?: CODEABLE_CONCEPT;
      modifier?: CODEABLE_CONCEPT[];
      provider?: PRVIDER_ITEM;
      excluded?: boolean;
      name?: string;
      description?: string;
      network: CODEABLE_CONCEPT;
      unit?: CODEABLE_CONCEPT;
      term?: CODEABLE_CONCEPT;
      benefit?: BENFIT[];
    }[];
  }[];
  error?: CODEABLE_CONCEPT[];
}

export interface TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_RESPONSE
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: COVERAGE_ELIGIBILITY_RESPONSE;
}
export class CoverageEligibiltyResponse
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(
    option: TO_HTML_HCX_OPTIONS_COVERAGE_ELIGIBILITY_RESPONSE
  ): Promise<string> {
    let ret = "";
    const body: COVERAGE_ELIGIBILITY_RESPONSE = option.body;

    if (option.addResourceType) {
      ret += `<h1>Coverage Eligibility Response</h1>`;
    }
    // Date
    ret += `Date : ${new TimeZone().convertTZ(
      body.createdDate,
      "Asia/Kolkata",
      false
    )} <br/>`;



    ret += `<h3>Patient</h3>`;
    ret += `<p>UHID ${option.patient.MRN} Name ${option.patient.name} ${option.patient.mobile || ""}</p>`

    ret += `<h3>Insurance</h3>`;
    ret +=  `<p>${option.payerName}  ${option.payerCode}</p>`
    ret += `<hr/>`;
    // Error

    if (body.error) {
      ret +=
        body.error &&
        body.error.length > 0 &&
        `<h3><b>Error</b> : ${body.error
          .map((el) => this.codebleConceptToHtml(el))
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

    if (body.insurance && body.insurance.length > 0) {
      ret += `<h4>Insurances</h4>`;
      for (let index = 0; index < body.insurance.length; index++) {
        const el = body.insurance[index]

        ret += `<br/><hr/>`;

        if (el.benefitPeriod) {
          ret += `<h4>Benefit Period</h4>`;
          ret +=
            el.benefitPeriod.start &&
            `Start : ${new TimeZone().convertTZ(
              el.benefitPeriod.start,
              "Asia/Kolkata",
              false
            )}<br/>`;

          ret +=
            el.benefitPeriod.end &&
            `End : ${new TimeZone().convertTZ(
              el.benefitPeriod.end,
              "Asia/Kolkata",
              false
            )} <br/>`;
        }

        if (el.inforce) {
          ret += `<b>Inforce</b> ${el.inforce}<br/>`;
        }

        // ret += el.coverage

        if (
          el.coverage &&
          el.coverage.reference &&
          option.coverages &&
          option.coverages.length > 0
        ) {
          try {
            const coverage = new Coverage();
            const id = coverage.getIdFromReference({
              resourceType: 'Coverage',
              ref: el.coverage.reference,
            });
            const filCoverage = option.coverages.filter((cl) => cl.id == id);
            if (filCoverage && filCoverage.length > 0) {
              ret += '<h3>Coverage</h3>';
              ret += await coverage.toHtml({
                addResourceType: false,
                patient:option.patient,
                payerCode : option.payerCode,
                payerName : option.payerName,
                body: filCoverage[0],
                showInsuranceCompany: false,
                "showPatient": false, 
              });
            }
          } catch (error) {
            console.error('Error in coverage if block:', error);
          }
        }
        

        if (el.item && el.item.length > 0) {
          try {
            el.item.forEach((it, i) => {
              ret += `<h4>Item No ${i + 1}</h4>`;
              if (it.name) {
                ret += `Name :  ${it.name}<br/>`;
              }
  
              if (it.network) {
                ret += `<b>Network</b> : ${this.codebleConceptToHtml(
                  it.network
                )}<br/>`;
              }
              if (it.productOrService) {
                ret += `Product Or Service : ${this.codebleConceptToHtml(
                  it.productOrService
                )}`;
              }
              if (it.description) {
                ret += `<b>Description</b> : ${it.description}<br/>`;
              }
  
              if (it.category) {
                ret += `<b>Category</b> ${this.codebleConceptToHtml(
                  it.category
                )}`;
              }
  
              if (it.excluded) {
                ret += `<b>Excluded</b> : ${it.excluded}<br/>`;
              }
  
              if (it.modifier) {
                ret += `<b>Modifier</b> : ${it.modifier}<br/>`;
              }
  
              if (it.term) {
                ret += `<b>Term</b> : ${this.codebleConceptToHtml(it.term)}<br/>`;
              }
              if (it.unit) {
                ret += `<b>Unit</b> : ${this.codebleConceptToHtml(it.unit)}<br/>`;
              }
  
              if (it.benefit) {
                ret += `<h5>Benfits</h5>`;
  
                it.benefit.forEach((be) => {
                  if (be.type) {
                    ret += `<b>Type</b> : ${this.codebleConceptToHtml(be.type)}`;
                  }
                  if (be.allowedMoney && be.allowedMoney.value) {
                    ret += `<b>Allowed Money</b> : ${be.allowedMoney?.currency} ${be.allowedMoney?.value}<br/> `;
                  }
                  if (be.allowedUnsignedInt) {
                    ret += `<b>Allowed UnsignedInt</b> : ${be.allowedUnsignedInt}<br/>`;
                  }
  
                  if (be.allowedString) {
                    ret += `<b>Allowed String</b> : ${be.allowedString}<br/>`;
                  }
                  if (be.usedMoney && be.usedMoney.value) {
                    ret += `<b>Used Money</b> : ${be.usedMoney?.currency} ${be.usedMoney?.value}<br/> `;
                  }
                  if (be.usedUnsignedInt) {
                    ret += `<b>Used UnsignedInt</b> : ${be.usedUnsignedInt}<br/>`;
                  }
                  if (be.usedString) {
                    ret += `<b>Used String</b> : ${be.usedString}<br/>`;
                  }
                });
              }
            });
          } catch (error) {
            console.log(`CoverageEligibiltyResponse.toHtml.item ${error}`)
          }

        }
      };
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
      patient: {
        reference: `Patient/${options.patientId}`,
      },
      created: options.createdDate,
      requestor: options.practitionerId && {
        reference: `Practitioner/${options.practitionerId}`,
      },
      request: {
        reference: `CoverageEligibilityRequest/${options.coverageEligibilityRequestId}`,
      },
      outcome: options.outcome,
      disposition: options.disposition,
      insurer: {
        reference: `Organization/${options.insurerId}`,
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
      patientId: this.getIdFromReference({
        resourceType: "Patient",
        ref: options.patient.reference,
      }),
      createdDate: options.created,
      coverageEligibilityRequestId: this.getIdFromReference({
        resourceType: "CoverageEligibilityRequest",
        ref: options.request.reference,
      }),
      outcome: options.outcome,
      insurerId: this.getIdFromReference({
        resourceType: "Organization",
        ref: options.insurer.reference,
      }),
      insurance: options.insurance,
      error: options.error,
      identifiers: options.identifier,
      practitionerId: options.requestor &&
        this.getIdFromReference({
          resourceType: "Practitioner",
          ref: options.requestor.reference,
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
