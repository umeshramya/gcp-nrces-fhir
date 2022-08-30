import { ResourceMaster } from "../Interfaces/index";
import { CODEABLE_CONCEPT, CodeDisplay } from "../config/index";
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
export type ProcedureStatus = typeof procedureStatusArray[number];

export interface PROCEDURE {
  id?: string;
  status: ProcedureStatus;
  text: string;
  code: CODEABLE_CONCEPT;
  outcome?: CODEABLE_CONCEPT;
  patientID: string;
  procedureDate: string;
  performer?: PRACTITIONER;
  asserter?: PRACTITIONER;
  recorder?: PRACTITIONER;
  encounterId: string;
  report?: string[];
  followUp?: string[];
  note: string[];
}
export class Procedure extends ResourceMain implements ResourceMaster {
  getFHIR(options: PROCEDURE) {
    const getText = (): string => {
      let ret: string = "";
      if (options.performer) {
        ret = `<div>Performer : ${options.performer.name}</div>`;
      }

      if (options.asserter) {
        ret = `${ret}<div>Asserted By : ${options.asserter.name}</div>`;
      }
      if (options.recorder) {
        ret = `${ret}<div>Recorded By : ${options.recorder.name}</div>`;
      }
      ret = `${ret}<div>Procedure Notes</div>`;
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

      ret = ret.trim();

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

    if (options.performer) {
      body.performer = [
        {
          actor: {
            reference: `Practitioner/${options.performer.id}`,
            display: options.performer.name,
          },
        },
      ];
    }
    if (options.recorder) {
      body.recorder = {
        reference: `Practitioner/${options.recorder.id}`,
        display: options.recorder.name,
      };
    }
    if (options.asserter) {
      body.asserter = {
        reference: `Practitioner/${options.asserter.id}`,
        display: options.asserter.name,
      };
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
      ret.performer = {
        id: this.getIdFromReference({
          ref: options.performer[0].actor.reference,
          resourceType: "DiagnosticReport",
        }),
        name: options.performer[0].actor.display,
      } as any;
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
      ret.asserter = {
        id: this.getIdFromReference({
          ref: options.asserter.reference,
          resourceType: "Practitioner",
        }),
        name: options.asserter.display,
      } as any;
    }

    if (options.recorder) {
      ret.recorder = {
        id: this.getIdFromReference({
          ref: options.recorder.reference,
          resourceType: "Practitioner",
        }),
        name: options.recorder.display,
      } as any;
    }

    return ret;
  }

  statusArray = (): ProcedureStatus[] => {
    return procedureStatusArray.map((el) => el);
  };
}
