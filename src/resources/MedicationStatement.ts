import { CODEABLE_CONCEPT, CodeDisplay, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";

import ResourceMain, { DOSAGE_INSTRUCTION } from "./ResourceMai";

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
type medicationStatementStatus =
  (typeof MedicationStatementStatusArray)[number];

interface informationSource extends MULTI_RESOURCE {
  resource:
    | "Patient"
    | "Practitioner"
    | "PractitionerRole"
    | "RelatedPerson"
    | "Organization";
}

export interface MEDICATION_STATEMENT {
  id?: string;
  status: medicationStatementStatus;
  medicationCodeableConcept: CODEABLE_CONCEPT;
  informationSource?: informationSource;
  patientid: string;
  reasonCode?: CODEABLE_CONCEPT[];
  date: string;
  dosage?:DOSAGE_INSTRUCTION[]
}
export class MedicationStatement
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: MEDICATION_STATEMENT) {

    const dosage = options.dosage
    ? options.dosage.map((el) => {
        return this.createDosageInstrction(el);
      })
    : [];

    const getMedications = (): string => {
      let ret = "";
      ret = options.medicationCodeableConcept.text || ""
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
        div: getMedications(),
      },
      status: options.status,
      medicationCodeableConcept: options.medicationCodeableConcept,
      informationSource: options.informationSource && {
        reference: `${options.informationSource?.resource}/${options.informationSource?.id}`,
      },
      reasonCode: options.reasonCode,
      subject: { reference: `Patient/${options.patientid}` },
      dateAsserted: options.date,
      dosage : dosage
    };
    return body
  }

  convertFhirToObject(options: any): MEDICATION_STATEMENT {
    let ret: MEDICATION_STATEMENT = {
      id: options.id,
      status: options.status,
      medicationCodeableConcept: options.medicationCodeableConcept,
      patientid: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      date: options.dateAsserted,
    };

    if(options.dosage){
      ret.dosage=options.dosage.map((el: any) => {
        return this.convertDosageInstructionToObject(el);
      })
    }

    if (options.informationSource) {
      options.informationSource = this.getFromMultResource({
        reference: options.informationSource.reference,
      });
    }

    if (options.reasonCode) {
      ret.reasonCode = options.reasonCode;
    }
    return ret;
  }

  statusArray = (): medicationStatementStatus[] => {
    return MedicationStatementStatusArray.map((el) => el);
  };
}
