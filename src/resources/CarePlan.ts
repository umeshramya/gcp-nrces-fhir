import { CODEABLE_CONCEPT, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import { Goal } from "./Goal";
import { PATIENT } from "./Patient";
import ResourceMain from "./ResourceMai";

const carePlanStatusArray = [
  "draft",
  "active",
  "on-hold",
  "revoked",
  "completed",
  "entered-in-error",
  "unknown",
] as const;
export type CarePlanStatus = (typeof carePlanStatusArray)[number];

export const carePlanIntentArray = [
  "proposal",
  "plan",
  "order",
  "option",
] as const;
export type CarePlanIntent = (typeof carePlanIntentArray)[number];

interface ACTIVITY_REFERENCE extends MULTI_RESOURCE {
  resource:
    | "Appointment"
    | "CommunicationRequest"
    | "DeviceRequest"
    | "MedicationRequest"
    | "NutritionOrder"
    | "Task"
    | "ServiceRequest"
    | "VisionPrescription"
    | "RequestGroup";
}

interface GOAL extends MULTI_RESOURCE {
  resource: "Goal";
}

export interface ACTIVITY {
  outcomeCodeableConcept?: CODEABLE_CONCEPT[];
  outcomeReference?: MULTI_RESOURCE[];
  reference?: ACTIVITY_REFERENCE;
  detail?: {
    kind?:
      | "Appointment"
      | "CommunicationRequest"
      | "DeviceRequest"
      | "MedicationRequest"
      | "NutritionOrder"
      | "Task"
      | "ServiceRequest"
      | "VisionPrescription";
    code: CODEABLE_CONCEPT;
    status:
      | "not-started"
      | "scheduled"
      | "in-progress"
      | "on-hold"
      | "completed"
      | "cancelled"
      | "stopped"
      | "unknown"
      | "entered-in-error";
  };
}

export interface CARE_PLAN {
  id?: string;
  basedOnCarePlanId?: string[];
  replacesCarePlanId?: string[];
  partOfCarePlanId?: string[];
  status: CarePlanStatus;
  inetent: CarePlanIntent;
  text: string;
  category?: CODEABLE_CONCEPT[];
  title?: string;
  description?: string;
  patientId: string;
  goal?: GOAL[];
  activity?: ACTIVITY[];
}
export class CarePlan extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: CARE_PLAN) {
    let activity: ACTIVITY[];
    if (options.activity) {
      activity = [...options.activity];
      activity.forEach((el) => {
        el.outcomeReference =
          el.outcomeReference &&
          (el.outcomeReference?.map((out) => {
            return {
              reference: `${out.resource}/${out.id}`,
            };
          }) as any);

        if (el.reference) {
          el.reference = {
            reference: `${el.reference.resource}/${el.reference.id}`,
          } as any;
        }
      });
    }
    const body = {
      resourceType: "CarePlan",
      id: options.id || undefined,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/CarePlan"],
      },
      text: {
        status: "additional",
        div: options.text,
      },
      basedOn:
        options.basedOnCarePlanId &&
        options.basedOnCarePlanId.map((el) => {
          return { reference: `CarePlan/${el}` };
        }),
      replaces:
        options.replacesCarePlanId &&
        options.replacesCarePlanId.map((el) => {
          return { reference: `CarePlan/${el}` };
        }),
      partOf:
        options.partOfCarePlanId &&
        options.partOfCarePlanId.map((el) => {
          return { reference: `CarePlan/${el}` };
        }),
      status: options.status,
      intent: options.inetent,
      category: options.category,
      title: options.title,
      description: options.description,
      goal:
        options.goal &&
        options.goal.map((el) => {
          return { reference: `${el.resource}/${el.id}` };
        }),
      subject: {
        reference: `Patient/${options.patientId}`,
      },
      activity: options.activity,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray = (): CarePlanStatus[] => {
    return carePlanStatusArray.map((el) => el) as any;
  };
}
