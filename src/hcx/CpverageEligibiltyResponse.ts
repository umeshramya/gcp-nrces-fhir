import { CODEABLE_CONCEPT, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";
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
  usedMoney?: {
    value: number;
    currency: string;
  };
}

export interface COVERAGE_ELIGIBILITY_RESPONSE {
  id?: string;
  hcx?: "nhcx" | "swasth";
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
    };
  }[];
  error?: CODEABLE_CONCEPT[];
}

export class CoverageEligibiltyResponse
  extends ResourceMain
  implements ResourceMaster
{
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
        resourceType: "CommunicationRequest",
        ref: options.request.reference,
      }),
      outcome: options.outcome,
      insurerId: this.getIdFromReference({
        resourceType: "Organization",
        ref: options.insurer.reference,
      }),
      insurance: options.insurance,
      error: options.error,
      practitionerId:
        options.requestor &&
        this.getIdFromReference({
          resourceType: "Practitioner",
          ref: options.requestor.reference,
        }),
    };

    return ret;
  }
  statusArray?: Function | undefined;
}
