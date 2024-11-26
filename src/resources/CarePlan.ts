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
export type CarePlanStatus = typeof carePlanStatusArray;

export const carePlanIntentArray = [
  "proposal",
  "plan",
  "order",
  "option",
] as const;
export type CarePlanIntent = typeof carePlanIntentArray;

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
  progress?: string[];
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
    goal?: GOAL[];
  };
}

export interface CARE_PLAN {
  id?: string;
  status: CarePlanStatus;
  inetent: CarePlanIntent;
  text: string;
  category?: CODEABLE_CONCEPT[];
  title?: string;
  description?: string;
  patient: PATIENT;
  activity?: ACTIVITY[];
}
export class CarePlan extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: CARE_PLAN) {
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
      status: options.status,
      intent: options.inetent,
      category: options.category,
      title: options.title,
      description: options.description,
      subject: {
        reference: `Patient/${options.patient.id}`,
        display: options.patient.name,
      },
      activity: options.activity,
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray = (): CarePlanStatus[] => {
    return carePlanStatusArray.map((el) => el) as any;
  };
}
