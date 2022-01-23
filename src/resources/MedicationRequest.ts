import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain from "./ResourceMai";

export const MedicatioRequestStatusArray = [
  "active",
  "on-hold",
  "cancelled",
  "completed",
  "entered-in-error",
  "stopped",
  "draft",
  "unknown",
] as const;
type MedicatioRequestStatus = typeof MedicatioRequestStatusArray[number];

export const MedicatioRequestIntentArray = [
  "proposal",
  "plan",
  "order",
  "original-order",
  "reflex-order",
  "filler-order",
  "instance-order",
  "option",
] as const;
type MedicatioRequestIntent = typeof MedicatioRequestIntentArray[number];

export interface MEDICATION_REQUEST {
  id?: string;
  patient: PATIENT;
  Practitioner: PRACTITIONER;
  date: string;
  reasonReferenceCondtionId?: string;
  status: MedicatioRequestStatus;
  intent: MedicatioRequestIntent;
  medicationCodeableConcept: CodeDisplay[];
  reasonCode: CodeDisplay[];
  // dosageInstruction: any[]
  DOSAGE_INSTRUCTION?: DOSAGE_INSTRUCTION[];
}

export interface DOSAGE_INSTRUCTION {
  text: string;
  additionalInstruction?: CodeDisplay[];
  timing: string;
  route: CodeDisplay[];
  method: CodeDisplay[];
}
export class MedicationRequest extends ResourceMain implements ResourceMaster {
  getFHIR(options: MEDICATION_REQUEST): any {
    const dosageInstruction = options.DOSAGE_INSTRUCTION
      ? options.DOSAGE_INSTRUCTION.map((el) => {
          return this.createDosageInstrction(el);
        })
      : [];

    let medArray: string = `<table style="width:9950px;"><tr><th style="width:20%;">Medcine</th><th style="width:20%;">Frequency</th><th style="width:20%;">Duration</th><th style="width:20%;">Instructions</th><th style="width:20%;">Route</th></tr>`;
    options.medicationCodeableConcept.forEach((el, i) => {
      medArray += `<tr><td>${el.display}</td><td>${
        options.DOSAGE_INSTRUCTION![i].timing
      }</td> <td>${options.DOSAGE_INSTRUCTION![i].text}</td><td>${
        options.DOSAGE_INSTRUCTION![i].method[0].display
      }</td><td >${options.DOSAGE_INSTRUCTION![i].route[0].display}</td></tr>`;
    });

    medArray += `</table>`;

    const body = {
      resourceType: "MedicationRequest",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${medArray}</div>`,
      },
      status: "active",
      intent: "order",
      medicationCodeableConcept: {
        coding: options.medicationCodeableConcept,
      },
      subject: {
        reference: `Patient/${options.patient.id}`,
        display: options.patient.name,
      },
      authoredOn: options.date,
      requester: {
        reference: `Practitioner/${options.Practitioner.id}`,
        display: `${options.Practitioner.name} ${options.Practitioner.qualification}`,
      },
      reasonCode: [
        {
          coding: options.reasonCode,
        },
      ],
      reasonReference: [
        {
          reference: options.reasonReferenceCondtionId
            ? `Condition/${options.reasonReferenceCondtionId}`
            : undefined,
        },
      ],
      dosageInstruction: dosageInstruction,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  createDosageInstrction(options: DOSAGE_INSTRUCTION): any {
    const body = {
      text: options.text,
      additionalInstruction: [
        {
          coding: options.additionalInstruction,
        },
      ],
      timing: {
        code: {
          text: options.timing,
        },
      },
      route: {
        coding: options.route,
      },
      method: {
        coding: options.method,
      },
    };

    return body;
  }

  convertDosageInstructionToObject(option: any): DOSAGE_INSTRUCTION {
    let ret: DOSAGE_INSTRUCTION = {
      text: option.text,
      additionalInstruction: option.additionalInstruction[0].coding,
      timing: option.timing.code.text,
      route: option.route.coding,
      method: option.method.coding,
    };

    return ret;
  }
}
