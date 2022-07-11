import GcpFhirCRUD from "../classess/gcp";
import {
  CODEABLE_CONCEPT,
  CodeDisplay,
  IDENTTIFIER,
  MULTI_RESOURCE,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { OBSERVATION } from "./Observation";
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
  labId?:string;
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
  performer?: Performer[];
  basedOn?: Basedon[];
  subject?: Subject;
  resultsInterpreter: ResultsInterpreter[];
  encounterId?: string;
  observations?: OBSERVATION[];
  text?: string;
}

export class DiagnosticReport extends ResourceMain implements ResourceMaster {
  getFHIR(options: DIAGNOSTIC_REPORT) {
    try {
      const getText = (): string => {
        let ret: string = "";
        if (options.observations) {
          options.observations.forEach((el) => {
            const res = el.text;
            ret = `${ret}<p>${res}</p>`;
          });
        } else if (options.text) {
          ret = `${ret}<p>${options.text}</p>`;
        }
        ret = `${ret}<p>${options.conclusion}</p>`;
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

        issued: options.issuedDate,

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
      if (options.performer) {
        body.performer = options.performer.map((el) => {
          return { reference: `${el.resource}/${el.id}`, display: el.display };
        });
      }

      if (options.subject) {
        body.subject = {
          reference: `${options.subject.resource}/${options.subject.id}`,
          display: options.subject.display,
        };
      }
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
      if(options.labId){
        identifiers.push({
          type: {
            coding: [
              {
                // system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                // code: "MR",
                display: "Lab Id",
              },
            ],
          },
          "system" :"https://www.nicehms.com/labId",
          "value" : options.labId

        })
      }


      body.identifier=identifiers
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
      text: options.text.div,
      issuedDate: options.issued,
      conclusion: options.conclusion,
      status: options.status,
      code: options.code,

      resultsInterpreter: options.resultsInterpreter.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      ),
    };
    if (options.result) {
      ret.observationResultid = options.result.map((el: any) =>
        this.getIdFromReference({
          ref: el.reference,
          resourceType: "Observation",
        })
      );
    }

    if (options.specimen) {
      ret.specimenId = options.specimen.map((el: any) =>
        this.getIdFromReference({ ref: el.reference, resourceType: "Specimen" })
      );
    }
    if (options.performer) {
      ret.performer = options.performer.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }
    if (options.subject) {
      ret.subject = this.getFromMultResource(options.subject) as any;
    }
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

    if (options.identifier) {
      const labId: any[] = options.identifier.filter(
        (el: any) => el.system == "https://www.nicehms.com/labId"
      );

      if (labId.length > 0) {
        ret.labId= labId[0].value;
      }
    }
    return ret;
  }
  statusArray(): DiagnosticReportStatus[] {
    return diagnosticReportStatus.map((el) => el);
  }
}
