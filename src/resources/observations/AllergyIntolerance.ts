import { RseourceMaster } from "../../Interfaces";
import { CodeDisplay } from "../../config/index";

export const clinicalStatusArray = ["active", "inactive", "resolved"] as const;
type clinicalStatus = typeof clinicalStatusArray[number];

export const verificationStatusArray = [
  "unconfirmed",
  "confirmed",
  "refuted",
  "entered-in-error",
] as const;
type verificationStatus = typeof verificationStatusArray[number];

export interface ALLERGY_INTOLERANCE {
  id?: string;
  clinicalStatus: clinicalStatus;
  verificationStatus: verificationStatus;
  allergyIntolerance: CodeDisplay[];
  text: string;
  patientId: string;
  date: string;
  practitionerId: string;
  note: { text: string }[];
}

export class AllergyIntolerance implements RseourceMaster {
  getFHIR(options: ALLERGY_INTOLERANCE) {
    const body = {
      resourceType: "AllergyIntolerance",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/AllergyIntolerance",
        ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      clinicalStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
            code: options.clinicalStatus,
            display: options.clinicalStatus,
          },
        ],
      },
      verificationStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
            code: options.verificationStatus,
            display: options.verificationStatus,
          },
        ],
      },
      code: {
        coding: options.allergyIntolerance,
        text: options.text,
      },
      patient: { reference: `Patient/${options.patientId}` },
      recordedDate: options.date,
      recorder: { reference: `Practitioner/${options.practitionerId}` },
      note: options.note,
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
}
