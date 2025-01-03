import {
  ADDRESS,
  ATTACHMENT,
  CODEABLE_CONCEPT,
  CODING,
  CONTACT_DETAIL,
  CONTACT_POINT,
  DURATION,
  EXTENSION,
  HUMAN_NAME,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import {
  QUANTITY,
  RANGE,
  RATIO,
  SAMPLE_DATA,
  VALUE,
} from "../resources/Observation";
import ResourceMain from "../resources/ResourceMai";

const taskCodeArray: CODEABLE_CONCEPT[] = [
  {
    coding: [
      {
        code: "nullify",
        system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-task-codes",
        display: "nullify",
      },
    ],
    text: "A formal request to halt or reverse a prior action, ensuring complete purging of all original submissions, with Task updates on acceptance, success, or identified errors",
  },
  {
    coding: [
      {
        code: "deliver",
        system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-task-codes",
        display: "deliver",
      },
    ],
    text: "It specifies the FHIR resource shared as part of the Task resource.",
  },
  {
    coding: [
      {
        code: "search",
        system: "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-task-codes",
        display: "Search",
      },
    ],
    text: "It specifies that the that task is created for search of any claim.",
  },
  {
    coding: [
      {
        code: "cancel",
        system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
        display: "Cancel",
      },
    ],
    text: "Cancel or reverse a resource, such as a claim or preauthorization, which is in-process or complete.",
  },
  {
    coding: [
      {
        code: "poll",
        system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
        display: "Poll",
      },
    ],
    text: "Retrieve selected or all queued resources or messages.",
  },
  {
    coding: [
      {
        code: "release",
        system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
        display: "Release",
      },
    ],
    text: "Release any reserved funds or material obligations associated with a resource. For example, any unused but reserved funds or treatment allowance associated with a preauthorization once treatment is complete.",
  },
  {
    coding: [
      {
        code: "reprocess",
        system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
        display: "Reprocess",
      },
    ],
    text: "Indication that the processing of a resource, such as a claim, for some or all of the required work is now being requested.",
  },
  {
    coding: [
      {
        code: "status",
        system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
        display: "Status check",
      },
    ],
    text: "Check on the processing status of a resource such as the adjudication of a claim.",
  },
  {
    coding: [
      {
        code: "approve",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Activate/approve the focal resource",
      },
    ],
    text: "Take what actions are needed to transition the focus resource from 'draft' to 'active' or 'in-progress', as appropriate for the resource type. This may involve adding additional content, approval, validation, etc.",
  },
  {
    coding: [
      {
        code: "fulfill",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Fulfill the focal request",
      },
    ],
    text: "Act to perform the actions defined in the focus request. This might result in a 'more assertive' request (order for a plan or proposal, filler order for a placer order), but is intend to eventually result in events. The degree of fulfillment requested might be limited by Task.restriction.",
  },
  {
    coding: [
      {
        code: "abort",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Mark the focal resource as no longer active",
      },
    ],
    text: "Abort, cancel or withdraw the focal resource, as appropriate for the type of resource.",
  },
  {
    coding: [
      {
        code: "replace",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Replace the focal resource with the input resource",
      },
    ],
    text: "Replace the focal resource with the specified input resource.",
  },
  {
    coding: [
      {
        code: "change",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Change the focal resource",
      },
    ],
    text: "Update the focal resource of the owning system to reflect the content specified as the Task.focus.",
  },
  {
    coding: [
      {
        code: "suspend",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Suspend the focal resource",
      },
    ],
    text: "Transition the focal resource from 'active' or 'in-progress' to 'suspended'.",
  },
  {
    coding: [
      {
        code: "resume",
        system: "http://hl7.org/fhir/CodeSystem/task-code",
        display: "Re-activate the focal resource",
      },
    ],
    text: "Transition the focal resource from 'suspended' to 'active' or 'in-progress' as appropriate for the resource type.",
  },
];

Object.freeze(taskCodeArray);

const taskIntentArray = [
  "unknown",
  "proposal",
  "plan",
  "order",
  "original-order",
  "reflex-order",
  "filler-order ",
  "instance-order",
  "option",
] as const;

const statusArray = ["draft", "requested", "received", "accepted"] as const;

type TaskIntent = (typeof taskIntentArray)[number];

type TaskCode = (typeof taskCodeArray)[number];

type Status = (typeof statusArray)[number];

interface Requester extends MULTI_RESOURCE {
  resource:
    | "Device"
    | "RelatedPerson"
    | "Organization"
    | "Patient"
    | "Practitioner"
    | "PractitionerRole";
}

interface Owner extends MULTI_RESOURCE {
  resource:
    | "CareTeam"
    | "HealthcareService"
    | "Device"
    | "RelatedPerson"
    | "Practitioner"
    | "PractitionerRole"
    | "Organization"
    | "Patient";
}

interface InAndOutPut {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  type: CODEABLE_CONCEPT;
  value: VALUE;
}

export interface TASK {
  id?: string;
  text?: string;
  code?: TaskCode;
  intent: TaskIntent;
  status: Status;
  authoredOn?: string;
  description?: string;
  requester: Requester;
  owner: Owner;
  input?: InAndOutPut[];
  output?: InAndOutPut[];
}

export class Task extends ResourceMain implements ResourceMaster {
  getFHIR(options: TASK) {
    

    const generateInputAndOutPut = (put: InAndOutPut): any => {
      const curInput: any = {
        type: put.type,
        id: put.id,
        modifierExtension: put.modifierExtension,
        extension: put.extension,
      };

      const value: any = put.value;
      this.getFhirvalueCimplexHandle(value, curInput)
      return curInput;
    };

    let input, output;
    if (options.input) {
      input = options.input.map((el) => {
        return generateInputAndOutPut(el);
      });
    }
    if (options.output) {
      output = options.output.map((el) => {
        return generateInputAndOutPut(el);
      });
    }

    const body: any = {
      resourceType: "Task",
      id: options.id,
      meta: {
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Task"],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      status: options.status,
      intent: options.intent,
      code: options.code,
      description: options.description,
      authoredOn: options.authoredOn,
      requester: options.requester && {
        reference:
          options.requester.resource &&
          options.requester.id &&
          `${options.requester.resource}/${options.requester.id}`,
        type: options.requester.type,
        identifier: options.requester.identifier,
        display: options.requester.display,
      },
      owner: options.owner && {
        reference:
          options.owner.resource &&
          options.owner.id &&
          `${options.owner.resource}/${options.owner.id}`,
        type: options.owner.type,
        identifier: options.owner.identifier,
        display: options.owner.display,
      },
      input: input,
      output: output,
    };

    return body;
  }
  convertFhirToObject(options: any) {
    const getInputAndOutPut = (put: any[]): InAndOutPut[] => {
      return put.map((el) => {
        let value: any = {};

        // Reconstruct the `value` object based on the input
       this.getConverOBjValueComplexHandle(el,value)

        // Return the mapped object
        return {
          extension: el.extension,
          id: el.id,
          modifierExtension: el.modifierExtension,
          type: el.type,
          value: value,
        };
      });
    };

    const ret: TASK = {
      intent: options.intent,
      status: options.status,
      requester:
        options.requester && this.getFromMultResource(options.requester),
      owner: options.owner && this.getFromMultResource(options.owner),
      text: options.text && options.text.div,
      description: options.description,
      input: options.input && getInputAndOutPut(options.input),
      output: options.output && getInputAndOutPut(options.output),
      authoredOn: options.authoredOn,
      code: options.code,
      id: options.id,
    };

    // Remove keys with null or undefined values
    Object.keys(ret).forEach((key) => {
      if (
        ret[key as keyof TASK] === null ||
        ret[key as keyof TASK] === undefined
      ) {
        delete ret[key as keyof TASK];
      }
    });

    return ret;
  }
  toHtml(option: any): Promise<string> {
    throw new Error("Method not implemented.");
  }

  intentArray(): TaskIntent[] {
    return taskIntentArray.map((el) => el);
  }

  taskCodeArray(): TaskCode[] {
    return taskCodeArray.map((el) => el);
  }
  statusArray(): Status[] {
    return statusArray.map((el) => el);
  }
}

interface Values {
  valueBase64Binary?: string;
  valueBoolean?: boolean;
  valueCanonical?: string; // Canonical URL to a resource
  valueCode?: string; // A coded value from a predefined set
  valueDate?: string; // Date (YYYY-MM-DD)
  valueDateTime?: string; // Date and time (ISO 8601)
  valueDecimal?: number; // Decimal number
  valueId?: string; // Unique identifier
  valueInstant?: string; // Instant in time (ISO 8601)
  valueInteger?: number; // Integer value
  valueMarkdown?: string; // Markdown text
  valueOid?: string; // Object Identifier (OID)
  valuePositiveInt?: number; // Positive integer
  valueString?: string; // String value
  valueTime?: string; // Time (HH:MM:SS)
  valueUnsignedInt?: number; // Unsigned integer
  valueUri?: string; // URI
  valueUrl?: string; // URL
  valueUuid?: string; // UUID
  valueCodeableConcept?: CODEABLE_CONCEPT;
  valueAttachment?: ATTACHMENT;
  valueCoding?: CODING;
  valueCount?: number;
  valueIdentifier: IDENTTIFIER;
  valuePeriod?: PERIOD;
  valueMoney?: MONEY;
  valueHumanName?: HUMAN_NAME;
  valueQuantity?: QUANTITY;
  valueRange?: RANGE;
  valueReference?: MULTI_RESOURCE;
  valueRatio?: RATIO;
  valueContactPoint?: CONTACT_POINT;
  valueContactDetail?: CONTACT_DETAIL;
  valueAddress?: ADDRESS;
  valueSampledData?: SAMPLE_DATA;
  valueDuration?: DURATION;

  // // Complex data types

  // valueAnnotation?: Annotation;
  // valueDistance?: Distance;

  // valueAge?: Age;

  // valueSignature?: Signature;
  // valueTiming?: Timing;

  // // Metadata and additional complex types

  // valueContributor?: Contributor;
  // valueDataRequirement?: DataRequirement;
  // valueExpression?: Expression;
  // valueParameterDefinition?: ParameterDefinition;
  // valueRelatedArtifact?: RelatedArtifact;
  // valueTriggerDefinition?: TriggerDefinition;
  // valueUsageContext?: UsageContext;
  // valueDosage?: Dosage;
  // valueMeta?: Meta;
}
