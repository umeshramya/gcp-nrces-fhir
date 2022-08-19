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

    if (ret.additionalInstruction == undefined) {
      delete ret.additionalInstruction;
    }

    return ret;
  }

  bundlify(resource:any){
   const curResource = super.bundlify(resource);
   delete curResource.reasonCode
   delete curResource.reasonReference
   return curResource;
  }
}

const test =  {"resource": {
  "authoredOn": "2022-08-14T16:32:24.570Z",
  "dosageInstruction": [
    {
      "additionalInstruction": [
        {}
      ],
      "method": {
        "coding": [
          {
            "display": "After food",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "route": {
        "coding": [
          {
            "display": "Oral route",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "text": "For 5 days",
      "timing": {
        "code": {
          "text": "0-1-0"
        }
      }
    },
    {
      "additionalInstruction": [
        {}
      ],
      "method": {
        "coding": [
          {
            "display": "Before Food",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "route": {
        "coding": [
          {
            "display": "Oral ",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "text": "For 5 Days",
      "timing": {
        "code": {
          "text": "1-0-0"
        }
      }
    }
  ],
  "id": "4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
  "intent": "order",
  "medicationCodeableConcept": {
    "coding": [
      {
        "display": "Tab Ecosprin 150mg",
        "system": "http://snomed.info/sct"
      },
      {
        "display": "Tab Pantop 40mg",
        "system": "http://snomed.info/sct"
      }
    ]
  },
  "meta": {
    "lastUpdated": "2022-08-14T16:32:49.318633+00:00",
    "profile": [
      "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest"
    ],
    "versionId": "MTY2MDQ5NDc2OTMxODYzMzAwMA"
  },
  "reasonCode": [
    {}
  ],
  "reasonReference": [
    {}
  ],
  "requester": {
    "display": "Dr U R  Bilagi MD DM ",
    "reference": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14"
  },
  "resourceType": "MedicationRequest",
  "status": "active",
  "subject": {
    "display": "Umesh Ramachandra Bilagi",
    "reference": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7"
  },
  "text": {
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table data-pdfmake=\"{'widths':['20%','20%','20%', '20%', '20%']}\">\n    <tr>\n    <th>Medcine</th>\n    <th>Frequency</th>\n    <th>Duration</th>\n    <th>Instructions</th>\n    <th>Route</th>\n  </tr><tr><td>Tab Ecosprin 150mg</td><td>0-1-0</td> <td>For 5 days</td><td>After food</td><td >Oral route</td></tr><tr><td>Tab Pantop 40mg</td><td>1-0-0</td> <td>For 5 Days</td><td>Before Food</td><td >Oral </td></tr></table></div>",
    "status": "generated"
  }
}
}