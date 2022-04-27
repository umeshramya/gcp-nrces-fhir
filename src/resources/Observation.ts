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

interface QUANTITY extends SAMPLE_QUANTITY { }

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

interface VALUE {
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
}

export interface OBSERVATION {
  id?: string;
  basedOn?: BasedOn[];
  partOf?: PartOf[];
  status: status;
  code: CODEABLE_CONCEPT;
  patientId: string;
  performer?: Performer[];
  value: VALUE;
  encounterId?: string
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


      status: options.status,
      code: options.code,
      subject: {
        reference: `Patient/${options.patientId}`,
      },

    };
    if (options.encounterId) {
      body.encounter = { "reference": `Encounter/${options.encounterId}` }
    }

    if (options.basedOn) {
      body.basedOn = options.basedOn.map(el => { return { "reference": `${el.resource}/${el.id}` } })
    }
    if (options.partOf) {
      body.partOf = options.partOf.map(el => { return { "reference": `${el.resource}/${el.id}` } })
    }

    if (options.performer) {
      body.performer = options.performer.map((el) => { return { reference: `${el.resource}/${el.id}` } })
    }
    body[Object.keys(options.value)[0]] = Object.values(options.value)[0];

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): status[] {
    return statusArray.map((el) => el);
  }
}
