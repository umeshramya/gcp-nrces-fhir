import GcpFhirCRUD from "../classess/gcp";
import {
  CODEABLE_CONCEPT,
  CodeDisplay,
  IDENTTIFIER,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const diagnosticReportStatus = [
  "registered",
  "partial",
  "preliminary",
  "final",
] as const;
export type DiagnosticReportStatus = typeof diagnosticReportStatus[number];

interface Performer extends MULTI_RESOURCE {
  resource: "CareTeam" | "Organization" | "Practitioner" | "PractitionerRole";
}

interface ResultsInterpreter extends MULTI_RESOURCE {
  resource: "CareTeam" | "Practitioner" | "Organization" | "PractitionerRole";
}

interface Basedon extends MULTI_RESOURCE {
  resource:
    | "CarePlan"
    | "ImmunizationRecommendation"
    | "NutritionOrder"
    | "MedicationRequest"
    | "ServiceRequest";
}

interface Subject extends MULTI_RESOURCE {
  resource: "Group" | "Device" | "Location" | "Patient";
}

export interface DIAGNOSTIC_REPORT {
  id?: string;
  mediaId: string[];
  issuedDate: string;
  /**
   * conclusoin drawn from full diagnositic report
   */
  conclusion: string;
  /**
   * conclusoin drawn from full diagnositic report
   */
  conclusionCode?: CODEABLE_CONCEPT[];
  status: DiagnosticReportStatus;
  /**
   * Name of the test or group of tests like lipid panel, CBC RFT LFT
   */
  code: CODEABLE_CONCEPT;
  /**
   * Hematlogy, biochemestry, micrbiology, radilogy
   */
  category?: CODEABLE_CONCEPT[];
  base64Data?: string;
  specimenId?: string[];
  observationResultid?: string[];
  performer: Performer[];
  basedOn?: Basedon[];
  subject: Subject;
  resultsInterpreter: ResultsInterpreter[];
  encounterId?: string;
}

export class DiagnosticReport extends ResourceMain implements ResourceMaster {
  getFHIR(options: DIAGNOSTIC_REPORT) {
    try {
      const getText = (): string => {
        let ret: string = options.conclusion;

        if (options.observationResultid) {
          options.observationResultid.forEach(async (el) => {
            const res = (
              await new GcpFhirCRUD().getFhirResource(el, "Observation")
            ).data;
            ret = `${ret}<p>${res.text.div}</P>`;
          });
        }
        return ret;
      };
      const identifiers: IDENTTIFIER[] = [];
      const body: any = {
        resourceType: "DiagnosticReport",
        id: options.id || undefined,
        meta: {
          versionId: "1",
          lastUpdated: "2020-07-09T15:32:26.605+05:30",
          profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportImaging",
          ],
        },
        text: {
          status: "generated",
          div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${getText()}</div>`,
        },

        status: options.status,
        code: options.code,
        subject: {
          reference: `${options.subject.resource}/${options.subject.id}`,
          display: options.subject.display,
        },
        issued: options.issuedDate,
        performer: options.performer.map((el) => {
          return { reference: `${el.resource}/${el.id}`, display: el.display };
        }),
        resultsInterpreter: options.resultsInterpreter.map((el) => {
          return { reference: `${el.resource}/${el.id}`, display: el.display };
        }),
        conclusion: options.conclusion,
        media: options.mediaId.map((el) => {
          return { link: { reference: `Media/${el}` } };
        }),
        presentedForm: [
          {
            contentType: "application/pdf",
            language: "en-IN",
            data: options.base64Data || "",
            title: "Report",
          },
        ],
      };
      if (options.basedOn) {
        body.basedOn = options.basedOn.map((el) => {
          return { reference: `${el.resource}/${el.id}` };
        });
      }
      if (options.category) {
        body.category = options.category;
      }

      if (options.conclusionCode) {
        body.conclusionCode = options.conclusionCode;
      }

      if (options.specimenId) {
        body.specimen = options.specimenId.map((el) => {
          return { reference: `Specimen/${el}` };
        });
      }
      if (options.observationResultid) {
        body.result = options.observationResultid.map((el) => {
          return { reference: `Observation/${el}` };
        });
      }
      if (options.encounterId) {
        body.encounter = { reference: `Encounter/${options.encounterId}` };
      }

      return body;
    } catch (error) {
      console.log(error);
    }
  }
  convertFhirToObject(options: any) {
    let ret: DIAGNOSTIC_REPORT = {
      id: options.id,
      mediaId: options.media.map((el: { link: { reference: any } }) => {
        return this.getIdFromReference({
          ref: el.link.reference,
          resourceType: "Media",
        });
      }),
      issuedDate: options.issued,
      conclusion: options.conclusion,
      status: "registered",
      code: options.code,

      performer: options.performer.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      ),

      subject: this.getFromMultResource(options.subject) as any,
      resultsInterpreter: options.resultsInterpreter.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      ),
    };

    if (options.basedOn) {
      ret.basedOn = options.basedOn.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }

    if (options.conclusionCode) {
      ret.conclusionCode = options.conclusionCode;
    }
    if (options.category) {
      ret.category = options.category;
    }
    if (options.encounter) {
      ret.encounterId = this.getIdFromReference({
        ref: options.encounter.reference,
        resourceType: "Encounter",
      });
    }
    return ret;
  }
  statusArray(): DiagnosticReportStatus[] {
    return diagnosticReportStatus.map((el) => el);
  }
}
