import { ResourceMaster } from "../Interfaces/index";
import { CodeDisplay } from "../config/index";

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
  procedure: CodeDisplay[];
  complication?: CodeDisplay[];
  patientID: string;
  procedureDate: string;
}
export class Procedure implements ResourceMaster {
  getFHIR(options: PROCEDURE) {
    const getProcedure = (): string => {
      let ret = "";
      options.procedure.forEach((el) => {
        ret = ret + `${el.display}, `;
      });
      return ret;
    };
    const body = {
      resourceType: "Procedure",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Procedure",
        ],
      },
      text: {
        status: "generated",
        div: `<div><h5>${getProcedure()}</h5><div>${options.text}</div></div>`,
      },
      status: options.status,
      code: {
        coding: options.procedure,
        text: options.text,
      },
      subject: { reference: `Patient/${options.patientID}` },
      performedDateTime: options.procedureDate,
      complication: [
        {
          coding: options.complication,
        },
      ],
    };

    return body;
  }
  convertFhirToObject(options: any): PROCEDURE {
    let ret: PROCEDURE = {
      status: options.status,
      text: options.code.text,
      procedure: options.code.coding,
      patientID: `${options.subject.reference}`.substring(8),
      procedureDate: options.performedDateTime,
      id: options.id,
      complication: options.complication[0].coding,
    };

    return ret;
  }

  statusArray = (): ProcedureStatus[] => {
    return procedureStatusArray.map((el) => el);
  };
}
