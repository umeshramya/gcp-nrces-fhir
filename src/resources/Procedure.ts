import { ResourceMaster } from "../Interfaces/index";
import { CODEABLE_CONCEPT, CodeDisplay, REFERENCE } from "../config/index";
import ResourceMain from "./ResourceMai";
import { PRACTITIONER } from "./Practitioner";
import { htmlToText } from "html-to-text";

export const procedureStatusArray = [
  "preparation",
  "in-progress",
  "not-done",
  "on-hold",
  "stopped",
  "completed",
  "entered-in-error",
  "unknown",
] as const;
export type ProcedureStatus = (typeof procedureStatusArray)[number];

export interface PROCEDURE {
  id?: string;
  status: ProcedureStatus;
  text: string;
  code: CODEABLE_CONCEPT;
  outcome?: CODEABLE_CONCEPT;
  patientID: string;
  procedureDate: string;
  primaryOperator?: REFERENCE;
  assistants?: REFERENCE[];
  anesthetists?: REFERENCE[];
  technicians?: REFERENCE[];
  asserter?: REFERENCE;
  recorder?: REFERENCE;
  encounterId: string;
  report?: string[];
  followUp?: string[];
  note: string[];
}
export class Procedure extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: PROCEDURE) {
    const getText = (): string => {
      let ret: string = "";
      if (options.text == "" || options.text == undefined) {
        return "";
      }

      ret += `
      <table data-pdfmake="{'widths':['33%%','33%','33%%']}"> 
        <tr>
          <td>
            Primary Operator : ${
              (options.primaryOperator && options.primaryOperator.display) || ""
            }
          </td>
          <td>
            Assistants : ${
              (options.assistants &&
                options.assistants.length > 0 &&
                options.assistants.map((el) => el.display).join(", ")) ||
              ""
            }
          </td>
          <td>
            Technicians : ${
              (options.technicians &&
                options.technicians.length > 0 &&
                options.technicians.map((el) => el.display).join(", ")) ||
              ""
            }
          </td>

        </tr>
        <tr>
            <td>
             Anesthetists : ${
              (options.anesthetists &&
                options.anesthetists.length > 0 &&
                options.anesthetists.map((el) => el.display).join(", ")) ||
              ""
            }
          </td>
          <td>
            Asserter : ${(options.asserter && options.asserter.display) || ""}
          </td>
          <td>
             Recorder : ${(options.recorder && options.recorder.display) || ""}
          </td>

        </tr>
      </table>
      `;
      ret = `${ret}${options.text}`;

      if (options.outcome) {
        ret = `${ret}<div>Outcome</div>`;
        ret = `${ret}<div>${options.outcome.text}</div>`;
      }

      if (options.followUp) {
        ret = `${ret}<div>Follow Up</div>`;
        options.followUp.forEach((el) => {
          ret = `${ret} <div>${el}</div>`;
        });
      }

      ret = ret.trim().replace(/\n/g, "");

      return ret;
    };

    options.code = {
      coding: options.code.coding,
      text: htmlToText(options.text),
    };
    const body: any = {
      resourceType: "Procedure",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Procedure",
        ],
      },
      text: {
        status: "generated",
        div: getText(),
      },
      status: options.status,
      code: options.code,
      subject: { reference: `Patient/${options.patientID}` },
      performedDateTime: options.procedureDate,
      encounter: {
        reference: `Encounter/${options.encounterId}`,
      },
      note: [{ text: options.text }],

      outcome: options.outcome,
    };

    let performers = [];
    if (options.primaryOperator) {
      performers.push({
        function: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/performer-role",
              code: "primary-Operator",
              display: "Primary-Operator",
            },
          ],
        },
        actor: options.primaryOperator,
      });
    }

    if (options.assistants && options.assistants.length > 0) {
      options.assistants.forEach((el) => {
        performers.push({
          function: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/performer-role",
                code: "assistant",
                display: "Assistant",
              },
            ],
          },
          actor: el,
        });
      });
    }

    if (options.anesthetists && options.anesthetists.length > 0) {
      options.anesthetists.forEach((el) => {
        performers.push({
          function: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/performer-role",
                code: "anesthetists",
                display: "Anesthetists",
              },
            ],
          },
          actor: el,
        });
      });
    }

    if (options.technicians && options.technicians.length > 0) {
      options.technicians.forEach((el) => {
        performers.push({
          function: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/performer-role",
                code: "technicians",
                display: "Technicians",
              },
            ],
          },
          actor: el,
        });
      });
    }

    if (performers.length > 0) {
      body.performer = performers;
    }
    if (options.recorder) {
      body.recorder = options.recorder;
    }
    if (options.asserter) {
      body.asserter = options.asserter;
    }
    if (options.report && options.report.length > 0) {
      body.report = options.report.map((el) => {
        return { reference: `DiagnosticReport/${el}` };
      });
    }

    if (options.followUp) {
      body.followUp = options.followUp.map((el) => {
        return {
          text: el,
        };
      });
    }
    return body;
  }
  convertFhirToObject(options: any): PROCEDURE {
    let ret: PROCEDURE = {
      status: options.status,
      text: options.text.div,
      code: options.code,
      patientID: `${options.subject.reference}`.substring(8),
      procedureDate: options.performedDateTime,
      id: options.id,

      encounterId: this.getIdFromReference({
        ref: options.encounter.reference,
        resourceType: "Encounter",
      }),
      note: options.note.map((el: any) => {
        return el.text;
      }),
    };

    if (options.performer) {
      ret.primaryOperator = options.performer.find(
        (el: any) => el.function.coding[0].code == "primary-Operator"
      ).actor;
      ret.anesthetists = options.performer.filter(
        (el: any) => el.function.coding[0].code == "anesthetists"
      ).map((el:any)=>el.actor);
      ret.technicians = options.performer.filter(
        (el: any) => el.function.coding[0].code == "technicians"
      ).map((el:any)=>el.actor);
      ret.assistants = options.performer.filter(
        (el: any) => el.function.coding[0].code == "assistant"
      ).map((el:any)=>el.actor);
    }
    if (options.followUp) {
      ret.followUp = options.followUp.map((el: any) => el.text);
    }
    if (options.outcome) {
      ret.outcome = options.outcome;
    }

    if (options.report) {
      ret.report = options.report.map((el: any) => {
        return this.getIdFromReference({
          ref: el.reference,
          resourceType: "DiagnosticReport",
        });
      });
    }

    if (options.asserter) {
      ret.asserter = options.asserter.actor;
    }

    if (options.recorder) {
      ret.recorder = options.recorder.actor;
    }

    return ret;
  }

  statusArray = (): ProcedureStatus[] => {
    return procedureStatusArray.map((el) => el);
  };
}
