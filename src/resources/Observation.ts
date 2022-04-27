import { type } from "os";
import { CODEABLE_CONCEPT, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

interface BasedOn extends MULTI_RESOURCE {
  resource:
    | "CarePlan"
    | "DeviceRequest"
    | "ImmunizationRecommendation"
    | "NutritionOrder"
    | "ServiceRequest"
    | "MedicationRequest";
}

interface PartOf extends MULTI_RESOURCE {
  resource:
    | "MedicationAdministration"
    | "MedicationDispense"
    | "MedicationStatement"
    | "Procedure"
    | "Immunization"
    | "ImagingStudy";
}

const statusArray = ["registered", "preliminary", "final", "amended"] as const;
type status = typeof statusArray[number];

interface Performer extends MULTI_RESOURCE {
  resource:
    | "CareTeam"
    | "RelatedPerson"
    | "Practitioner"
    | "Organization"
    | "PractitionerRole"
    | "Patient";
}

interface SAMPLE_QUANTITY {
  value: number;
  unit: string;
  system: "http://unitsofmeasure.org";
  code: string;
}

interface QUANTITY extends SAMPLE_QUANTITY {}

interface RANGE {
  low: SAMPLE_QUANTITY;
  high: SAMPLE_QUANTITY;
}

interface RATIO {
  numerator: QUANTITY;
  denominator: QUANTITY;
}

interface SAMPLE_DATA {
  origin: SAMPLE_QUANTITY;
  period: number;
  factor: number;
  lowerLimit: number;
  upperLimit: number;
  dimensions: number;
  data?: string;
}

export interface OBSERVATION {
  id?: string;
  basedOn?: BasedOn[];
  partOf?: PartOf[];
  status: status;
  code: CODEABLE_CONCEPT;
  patientId: string;
  performer: Performer[];
  value: {
    valueQuantity?: QUANTITY;
    valueCodeableConcept?: CODEABLE_CONCEPT;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: RANGE;
    valueRatio?: RATIO;
    valueSampledData?: SAMPLE_DATA;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: PERIOD;
  };
}

export class Observation extends ResourceMain implements ResourceMaster {
  getFHIR(options: OBSERVATION) {
    const getText = (): string => {
      let ret: string = "";
      return ret;
    };
    const body: any = {
      resourceType: "Observation",
      id: options.id,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ObservationBodyMeasurement",
        ],
      },
      text: {
        status: "generated",
        div: getText(),
      },
      basedOn: options.basedOn,
      partOf: options.partOf,
      status: options.status,
      code: options.code,
      subject: {
        reference: `Patient/${options.patientId}`,
      },
      performer: options.performer.map((el) => {
        return {
          reference: `${el.resource}/${el.id}`,
        };
      }),
    };

    body.value = options.value;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): status[] {
    return statusArray.map((el) => el);
  }
}
