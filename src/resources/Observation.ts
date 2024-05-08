import { htmlToText } from "html-to-text";
import { type } from "os";
import GcpFhirCRUD from "../classess/gcp";
import { ATTACHMENT, CODEABLE_CONCEPT, MULTI_RESOURCE, PERIOD } from "../config";
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
  unit?: string;
  system?: "http://unitsofmeasure.org";
  code?: string;
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
  // type?: CODEABLE_CONCEPT;
  // normalValue?:CODEABLE_CONCEPT;
  appliesTo?: CODEABLE_CONCEPT[];
  age?: RANGE;
  text?: string;
}

export interface SUPPORTING_INFO{
  sequence:number,
  category:CODEABLE_CONCEPT;
  code : CODEABLE_CONCEPT;
  "valueAttachment"?: ATTACHMENT;
  "valueReference" ?: {
    "reference" : `DocumentReference/${string}`
  }
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
  orgPanel ?:any
}



export class Observation extends ResourceMain implements ResourceMaster {
 async toHtml():Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: OBSERVATION) {

  const extensions: any[] = [];
  if (options.orgPanel) {
    extensions.push({
      url: "https://www.nicehms.com/orgPanel",
      valueString: JSON.stringify(options.orgPanel),
    });
}
    
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
      extension : extensions,
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

    if (options.extension) {
      const orgPanel = options.extension.filter((el: any) => {
        if ((el.url = "https://www.nicehms.com/orgPanel")) {
          return el;
        }
      });

      ret.orgPanel = JSON.parse(orgPanel[0].valueString);
    }

    return ret;
  }
  statusArray(): status[] {
    return statusArray.map((el) => el);
  }

  bundlify(resource:any):any{
    const copy = super.bundlify(resource)

    if(copy.valueString){
      copy.valueString = htmlToText(copy.valueString)
      return copy
    }else if(copy.valueQuantity){
      if(!copy.valueQuantity.value){
        delete copy.valueQuantity
        delete copy.referenceRange
        copy.valueString = "Not Done"
        return copy
      }
      let valueString= `${copy.valueQuantity.value} ${copy.valueQuantity.unit} `;
      if(copy.referenceRange){
        const lessThan:string=  copy.referenceRange.filter((el:any)=>el.high).length > 0 ? copy.referenceRange.filter((el:any)=>el.high)[0].high.value : ""
        const morethan:string = copy.referenceRange.filter((el:any)=>el.low).length > 0 ? copy.referenceRange.filter((el:any)=>el.low)[0].low.value : "";
        if (lessThan == "" && morethan == ""){
        }else if(lessThan != "" && morethan != ""){
          valueString = `${valueString} Reference Range ${morethan}-${lessThan}`;
        }else if(lessThan == ""){
          valueString = `${valueString} Reference Range more than ${morethan}`
        }else if(morethan == ""){
          valueString = `${valueString} Reference Range less than ${lessThan}`
        }

        delete copy.referenceRange
      }
    
      delete copy.valueQuantity

 
      // if (!copy.valueString && valueString){
      //   valueString="Panel"
      // }
      copy.valueString = valueString;
    }else{
      copy.valueString="Panel"
    }
    return copy
  }
}
