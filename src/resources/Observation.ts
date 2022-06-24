import { type } from "os";
import GcpFhirCRUD from "../classess/gcp";
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

export interface Performer extends MULTI_RESOURCE {
  resource:
    | "CareTeam"
    | "RelatedPerson"
    | "Practitioner"
    | "Organization"
    | "PractitionerRole"
    | "Patient";
}

export interface HasMember extends MULTI_RESOURCE {
  resource: "Observation" | "QuestionnaireResponse" | "MolecularSequence";
}

export interface SAMPLE_QUANTITY {
  value: number;
  unit: string;
  system: "http://unitsofmeasure.org";
  code: string;
}

export interface QUANTITY extends Partial<SAMPLE_QUANTITY> {
  comparator ?: "<" | "<=" | ">=" | ">"
}

export interface RANGE {
  low: SAMPLE_QUANTITY;
  high: SAMPLE_QUANTITY;
}

export interface RATIO {
  numerator: QUANTITY;
  denominator: QUANTITY;
}

export interface SAMPLE_DATA {
  origin: SAMPLE_QUANTITY;
  period: number;
  factor: number;
  lowerLimit: number;
  upperLimit: number;
  dimensions: number;
  data?: string;
}

export interface VALUE {
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

export interface REFERENCE_RANGE {
  low?: SAMPLE_QUANTITY;
  high?: SAMPLE_QUANTITY;
  type?: CODEABLE_CONCEPT;
  appliesTo?: CODEABLE_CONCEPT[];
  age?: RANGE;
  text?: string;
}
export interface OBSERVATION {
  id?: string;
  basedOn?: BasedOn[];
  partOf?: PartOf[];
  status: status;
  code: CODEABLE_CONCEPT;
  patientId: string;
  performer?: Performer[];
  value?: VALUE;
  dataAbsentReason?: CODEABLE_CONCEPT
  encounterId?: string;
  referenceRange?: REFERENCE_RANGE[];
  hasMember?: HasMember[];
  specimenId?: string;
  text: string;
}

export class Observation extends ResourceMain implements ResourceMaster {
  getFHIR(options: OBSERVATION) {
    const getText = (): string => {
      let ret: string = "";
      if (options.hasMember) {
        options.hasMember.forEach(async (el) => {
          const res: any = (
            await new GcpFhirCRUD().getFhirResource(el.id, el.resource)
          ).data;
          ret = `${ret}<br/>${res.text.div}`;
        });
      } else {
        ret = options.text;
      }
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
      body.encounter = { reference: `Encounter/${options.encounterId}` };
    }

    if (options.basedOn) {
      body.basedOn = options.basedOn.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      });
    }
    if (options.partOf) {
      body.partOf = options.partOf.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      });
    }

    if (options.hasMember) {
      body.hasMember = options.hasMember.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      });
    }

    if (options.performer) {
      body.performer = options.performer.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      });
    }

    if (options.referenceRange) {
      body.referenceRange = options.referenceRange;
    }
    if (options.specimenId) {
      body.specimen = { reference: `Specimen/${options.specimenId}` };
    }
    if (options.value) {
      body[Object.keys(options.value)[0]] = Object.values(options.value)[0];
    }

    return body;
  }
  convertFhirToObject(options: any) {
    let ret: OBSERVATION = {
      status: options.status,
      code: options.code,
      patientId: this.getIdFromReference({
        ref: options.subject.reference,
        resourceType: "Patient",
      }),
      id: options.id,
      value:
        options.valueQuantity ||
        options.valueCodeableConcept ||
        options.valueString ||
        options.valueBoolean ||
        options.valueInteger ||
        options.valueRange ||
        options.valueRatio ||
        options.valueSampledData ||
        options.valueTime ||
        options.valueDateTime ||
        options.valuePeriod,
      text: options.text.div,
      referenceRange: options.referenceRange,
    };

    if (ret.value == undefined) {
      delete ret.value;
    }

    if (options.hasMember) {
      ret.hasMember = options.hasMember.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }

    if (options.basedOn) {
      ret.basedOn = options.basedOn.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }

    if (options.partOf) {
      ret.partOf = options.partOf.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }

    if (options.encounterId) {
      ret.encounterId = this.getIdFromReference({
        ref: options.encounter.reference,
        resourceType: "Encounter",
      });
    }

    if (options.performer) {
      ret.performer = options.performer.map(
        (el: { reference: string; display?: string | undefined }) => {
          return this.getFromMultResource(el);
        }
      );
    }
    if (ret.referenceRange == undefined) {
      delete ret.referenceRange;
    }

    if (options.specimenId) {
      ret.specimenId = this.getIdFromReference({
        ref: options.specimen.reference,
        resourceType: "Specimen",
      });
    }

    if(options.dataAbsentReason){
      ret.dataAbsentReason = options.dataAbsentReason
    }

    return ret;
  }
  statusArray(): status[] {
    return statusArray.map((el) => el);
  }
}
