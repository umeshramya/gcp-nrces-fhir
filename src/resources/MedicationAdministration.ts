import { CODEABLE_CONCEPT, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export const MedicationAdministrationStatusArray = [
  "in-progress",
  "not-done",
  "on-hold",
  "completed",
  "entered-in-error",
  "stopped",
  "unknown",
] as const;
type MedicationAdministrationStatus =
  (typeof MedicationAdministrationStatusArray)[number];

export interface MEDICATION_ADMINISTRATION {
  id?: string;
  status: MedicationAdministrationStatus;
  medicationCodeableConcept: CODEABLE_CONCEPT;
  patientId: string;
  /** who administered (nurse) */
  performer?: MULTI_RESOURCE;
  /** MedicationRequest this administration fulfils */
  requestId?: string;
  /** Encounter during which the medication was administered (FHIR `context`) */
  encounterId?: string;
  effectiveDateTime?: string;
  effectivePeriod?: PERIOD;
  note?: string;
}

export class MedicationAdministration
  extends ResourceMain
  implements ResourceMaster
{
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getFHIR(options: MEDICATION_ADMINISTRATION) {
    const body: any = {
      resourceType: "MedicationAdministration",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationAdministration",
        ],
      },
      text: {
        status: "generated",
        div: options.medicationCodeableConcept.text || "",
      },
      status: options.status,
      medicationCodeableConcept: options.medicationCodeableConcept,
      subject: { reference: `Patient/${options.patientId}` },
    };

    if (options.performer) {
      body.performer = [
        {
          actor: {
            reference: `${options.performer.resource}/${options.performer.id}`,
            display: options.performer.display,
          },
        },
      ];
    }
    if (options.requestId) {
      body.request = { reference: `MedicationRequest/${options.requestId}` };
    }
    if (options.encounterId) {
      body.context = { reference: `Encounter/${options.encounterId}` };
    }
    if (options.effectiveDateTime) {
      body.effectiveDateTime = options.effectiveDateTime;
    } else if (options.effectivePeriod) {
      body.effectivePeriod = options.effectivePeriod;
    }
    if (options.note) {
      body.note = [{ text: options.note }];
    }

    return body;
  }

  convertFhirToObject(options: any): MEDICATION_ADMINISTRATION {
    let ret: MEDICATION_ADMINISTRATION = {
      id: options.id,
      status: options.status,
      medicationCodeableConcept: options.medicationCodeableConcept,
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
    };

    if (options.performer && options.performer[0]) {
      ret.performer = this.getFromMultResource({
        reference: options.performer[0].actor?.reference,
        display: options.performer[0].actor?.display,
      });
    }
    if (options.request) {
      ret.requestId = this.getIdFromReference({
        ref: options.request.reference,
        resourceType: "MedicationRequest",
      });
    }
    if (options.context) {
      ret.encounterId = this.getIdFromReference({
        ref: options.context.reference,
        resourceType: "Encounter",
      });
    }
    if (options.effectiveDateTime) {
      ret.effectiveDateTime = options.effectiveDateTime;
    }
    if (options.effectivePeriod) {
      ret.effectivePeriod = options.effectivePeriod;
    }
    if (options.note && options.note[0]) {
      ret.note = options.note[0].text;
    }

    return ret;
  }

  statusArray = (): MedicationAdministrationStatus[] => {
    return MedicationAdministrationStatusArray.map((el) => el);
  };
}
