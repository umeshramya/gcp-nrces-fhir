import { CODEABLE_CONCEPT, IDENTTIFIER, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import { QUANTITY, RANGE, RATIO } from "./Observation";
import ResourceMain from "./ResourceMai";

interface SUBJECT extends MULTI_RESOURCE {
  resource: "Patient" | "Group" | "Organization";
}

const DURRATION = [
  {
    code: "s",
    display: "seconds",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "min",
    display: "minutes",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "h",
    display: "hours",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "d",
    display: "days",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "wk",
    display: "weeks",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "mo",
    display: "months",
    system: "http://unitsofmeasure.org",
  },
  {
    code: "a",
    display: "years",
    system: "http://unitsofmeasure.org",
  },
] as const;

type Duration = (typeof DURRATION)[number] & { value: number };

interface TARGET {
  measure: CODEABLE_CONCEPT;
  dueDate?: string;
  dueDuration?: Duration;
//   detail?: {
//     detailQuantity?: QUANTITY;
//     detailRange?: RANGE;
//     detailCodeableConcept?: CODEABLE_CONCEPT;
//     detailString?: string;
//     detailBoolean?: boolean;
//     detailInteger?: number;
//     detailRatio: RATIO;
//   };
}

interface EXPTRESSED_BY extends MULTI_RESOURCE {
  resource: "Patient" | "Practitioner" | "PractitionerRole" | "RelatedPerson";
}

interface Addresses extends MULTI_RESOURCE {
  resource:
    | "Condition"
    | "Observation"
    | "MedicationStatement"
    | "NutritionOrder"
    | "ServiceRequest"
    | "RiskAssessment";
}

interface outcomeReference extends MULTI_RESOURCE {
  resource: "Observation";
}

export interface GOAL {
  id?: string;
  text?: string;
  identifier?: IDENTTIFIER[];
  lifecycleStatus:
    | "proposed"
    | "planned"
    | "accepted"
    | "active"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "entered-in-error"
    | "rejected";
  achievementStatus?: CODEABLE_CONCEPT;
  category?: CODEABLE_CONCEPT[];
  priority?: CODEABLE_CONCEPT;
  description: CODEABLE_CONCEPT;
  subject: SUBJECT;
  startDate: string;
  statusDate?: string;
  statusReason?: string;
  expressedBy?: EXPTRESSED_BY;
  addresses?: Addresses[];
  target?: TARGET[];
  outcomeReference?: outcomeReference[];
  note?: {"text" : string}[];
}

export class Goal extends ResourceMain implements ResourceMaster {
  getFHIR(options: GOAL) {
    const body: any = {
      resourceType: "Goal",
      id: options.id,
      text: {
        status: "additional",
        div: options.text,
      },
      identifier: options.identifier,
      lifecycleStatus: options.lifecycleStatus,
      achievementStatus: options.achievementStatus,
      category: options.category,
      priority: options.priority,
      description: options.description,
      subject: options.subject && {"reference" : `${options.subject.resource}/${options.subject.id}`},
      startDate: options.startDate,
      target: options.target,
      statusDate: options.statusDate,
      statusReason: options.statusReason,

      expressedBy: options.expressedBy && {"reference" : `${options.expressedBy.resource}/${options.expressedBy.id}`},
      addresses: options.addresses && options.addresses.map(el=>{
        return {"reference" : `${el.resource}/${el.id}`}
      }),
      outcomeReference: options.outcomeReference && options.outcomeReference.map(el=>{
        return{"reference" : `${el.resource}/${el.id}`}
      }),
      note: options.note,
    };

    return body;
  }
  convertFhirToObject(options: any): GOAL {
    const ret: GOAL = {
      id:options.id,
      lifecycleStatus: options.lifecycleStatus,
      description: options.description,
      subject: this.getFromMultResource({
        reference: options.subject.reference,
      }) as any,
      startDate: options.startDate,

    };

    if (options.achievementStatus) {
      ret.achievementStatus = options.achievementStatus;
    }

    if (options.identifier) {
      ret.identifier = options.identifier;
    }
    if (options.category) {
      ret.category = options.category;
    }
    if (options.priority) {
      ret.priority = options.priority;
    }

    if (options.statusDate) {
      ret.statusDate = options.statusDate;
    }
    if (options.statusReason) {
      ret.statusReason = options.statusReason;
    }
    if (options.expressedBy) {
      ret.expressedBy = this.getFromMultResource({
        reference: options.expressedBy.reference,
      }) as any;
    }

    if (options.addresses) {
      ret.addresses =
        options.addresses &&
        options.addresses.map((el: { reference: any }) =>
          this.getFromMultResource({ reference: el.reference })
        );
    }

    if (options.target) {
      ret.target = options.target;
    }

    if (options.outcomeReference) {
      ret.outcomeReference =
        options.outcomeReference &&
        options.outcomeReference.map((el: any) =>
          this.getFromMultResource({
            reference: options.outcomeReference.reference,
          })
        );
    }
    if (options.note) {
      ret.note = options.note;
    }

    return ret;
  }

  toHtml(option: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}
