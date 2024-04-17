import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export const MedicationStatementStatusArray = [
  "active",
  "completed",
  "entered-in-error",
  "intended",
  "stopped",
  "on-hold",
  "unknown",
  "not-taken",
] as const;
type medicationStatementStatus = typeof MedicationStatementStatusArray[number];

export interface MEDICATION_STATEMENT {
  id?: string;
  status: medicationStatementStatus;
  medicationCodeableConcept: CodeDisplay[];
  patientid: string;
  date: string;
}
export class MedicationStatement
  extends ResourceMain
  implements ResourceMaster
{
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: MEDICATION_STATEMENT) {
    const getMedications = (): string => {
      let ret =
        options.medicationCodeableConcept.length > 0
          ? options.medicationCodeableConcept.length > 1
            ? "Patient is on Following medications"
            : "Patient is on Following medication"
          : "";

      options.medicationCodeableConcept.forEach((el) => {
        ret = ret + `${el.display}, `;
      });
      return ret;
    };
    const body = {
      resourceType: "MedicationStatement",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationStatement",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${getMedications()}</div>`,
      },
      status: options.status,
      medicationCodeableConcept: {
        coding: options.medicationCodeableConcept,
      },
      subject: { reference: `Patient/${options.patientid}` },
      dateAsserted: options.date,
    };
  }

  convertFhirToObject(options: any): MEDICATION_STATEMENT {
    let ret: MEDICATION_STATEMENT = {
      id: options.id,
      status: options.status,
      medicationCodeableConcept: options.medicationCodeableConcept.code,
      patientid: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      date: options.dateAsserted,
    };

    return ret;
  }

  statusArray = (): medicationStatementStatus[] => {
    return MedicationStatementStatusArray.map((el) => el);
  };
}
