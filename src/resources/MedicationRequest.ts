import { CodeDisplay } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PATIENT } from "./Patient";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain, { DOSAGE_INSTRUCTION } from "./ResourceMai";

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
  patient: Partial<PATIENT>;
  Practitioner: Partial<PRACTITIONER>;
  date: string;
  reasonReferenceCondtionId?: string;
  status: MedicatioRequestStatus;
  intent: MedicatioRequestIntent;
  medicationCodeableConcept: CodeDisplay[];
  reasonCode?: CodeDisplay[];

  DOSAGE_INSTRUCTION?: DOSAGE_INSTRUCTION[];
}


export class MedicationRequest extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
  getFHIR(options: MEDICATION_REQUEST): any {
    const dosageInstruction = options.DOSAGE_INSTRUCTION
      ? options.DOSAGE_INSTRUCTION.map((el) => {
          return this.createDosageInstrction(el);
        })
      : [];

    let medArray: string = `<table data-pdfmake="{'widths':['20%','20%','20%', '20%', '20%']}">
    <tr>
    <th>Medcine</th>
    <th>Frequency</th>
    <th>Duration</th>
    <th>Instructions</th>
    <th>Route</th>
  </tr>`;
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
  convertFhirToObject(options: any): MEDICATION_REQUEST {
    let ret: MEDICATION_REQUEST = {
      patient: {
        id: this.getIdFromReference({
          ref: options.subject.reference,
          resourceType: "Patient",
        }),
        name: options.subject.display,
      },
      Practitioner: {
        id: this.getIdFromReference({
          ref: options.requester.reference,
          resourceType: "Practitioner",
        }),
        name: options.requester.display,
      },
      date: options.authoredOn,
      status: options.status,
      intent: options.intent,
      medicationCodeableConcept: options.medicationCodeableConcept.coding,
      DOSAGE_INSTRUCTION: options.dosageInstruction.map((el: any) => {
        return this.convertDosageInstructionToObject(el);
      }),
      reasonCode: options.reasonCode || undefined,
      id: options.id,
    };
    return ret;
  }


  bundlify(resource: any) {
    let curResource = super.bundlify(resource);
    delete curResource.reasonCode;
    delete curResource.reasonReference;
    const ret = curResource.dosageInstruction.map(
      (el: dosageInstruction, i: number) => {
        const temmplate = {
          fullUrl: i==0 ? `MedicationRequest/${curResource.id}` :`MedicationRequest/${curResource.id}-med${i}`,
          resource: {
            resourceType: "MedicationRequest",
            id: i==0 ?`${curResource.id}` : `${curResource.id}-med${i}`,
            status: curResource.status,
            intent: curResource.intent,

            subject: curResource.subject,
            authoredOn: curResource.authoredOn,
            requester: curResource.requester,
            dosageInstruction: [
              {
                text: `${el.method.coding[0].display} ${el.route.coding[0].display} ${el.timing.code.text} ${el.text}`,
              },
            ],
            medicationCodeableConcept: {
              coding: [curResource.medicationCodeableConcept.coding[i]],
            },
          },
        };
        return temmplate

      }
    );

    return ret;
  }
}









/*
  BELOW FOR  BUDLIFY
*/ 

interface dosageInstruction {
  method: Method;
  route: Route;
  text: string;
  timing: Timing;
}

interface Method {
  coding: Coding[];
}

interface Coding {
  display: string;
  system: string;
}

interface Route {
  coding: Coding2[];
}

interface Coding2 {
  display: string;
  system: string;
}

interface Timing {
  code: Code;
}

interface Code {
  text: string;
}

const demo = {
  fullUrl: "MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0",
  resource: {
    resourceType: "MedicationRequest",
    id: "68d9667c-00c3-455f-b75d-d580950498a0",
    status: "active",
    intent: "order",
    medicationReference: {
      reference: "Medication/54ab5657-5e79-4461-a823-20e522eb337d",
    },
    subject: {
      reference: "Patient/RVH9999",
    },
    authoredOn: "2016-08-07T00:00:00+05:30",
    requester: {
      reference: "Practitioner/MAX5001",
    },
    dosageInstruction: [
      {
        text: "1 capsule 2 times a day",
      },
    ],
    medicationCodeableConcept: {
      coding: [
        {
          display: "Tab Ecosprin 150mg",
          system: "http://snomed.info/sct",
        },
      ],
    },
  },
};

const actual = {
  fullUrl: "MedicationRequest/4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
  resource: {
    authoredOn: "2022-08-14T16:32:24.570Z",
    dosageInstruction: [
      {
        method: {
          coding: [
            {
              display: "After food",
              system: "http://snomed.info/sct",
            },
          ],
        },
        route: {
          coding: [
            {
              display: "Oral route",
              system: "http://snomed.info/sct",
            },
          ],
        },
        text: "For 5 days",
        timing: {
          code: {
            text: "0-1-0",
          },
        },
      },
      {
        method: {
          coding: [
            {
              display: "Before Food",
              system: "http://snomed.info/sct",
            },
          ],
        },
        route: {
          coding: [
            {
              display: "Oral ",
              system: "http://snomed.info/sct",
            },
          ],
        },
        text: "For 5 Days",
        timing: {
          code: {
            text: "1-0-0",
          },
        },
      },
    ],
    id: "4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
    intent: "order",
    medicationCodeableConcept: {
      coding: [
        {
          display: "Tab Ecosprin 150mg",
          system: "http://snomed.info/sct",
        },
        {
          display: "Tab Pantop 40mg",
          system: "http://snomed.info/sct",
        },
      ],
    },
    requester: {
      display: "Dr U R  Bilagi MD DM ",
      reference: "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14",
    },
    resourceType: "MedicationRequest",
    status: "active",
    subject: {
      display: "Umesh Ramachandra Bilagi",
      reference: "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7",
    },
  },
};
