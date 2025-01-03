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
    // const generateInputAndOutPut = (put: InAndOutPut): any => {
    //   const curInput: any = {
    //     type: put.type,
    //     id: put.id,
    //     modifierExtension: put.modifierExtension,
    //     extension: put.extension,
    //   };

    //   const value: any = put.value;

    //   if (value.valueBase64Binary)
    //     curInput["valueBase64Binary"] = value.valueBase64Binary;
    //   if (value.valueBoolean) curInput["valueBoolean"] = value.valueBoolean;
    //   if (value.valueCanonical)
    //     curInput["valueCanonical"] = value.valueCanonical;
    //   if (value.valueCode) curInput["valueCode"] = value.valueCode;
    //   if (value.valueDate) curInput["valueDate"] = value.valueDate;
    //   if (value.valueDateTime) curInput["valueDateTime"] = value.valueDateTime;
    //   if (value.valueDecimal) curInput["valueDecimal"] = value.valueDecimal;
    //   if (value.valueId) curInput["valueId"] = value.valueId;
    //   if (value.valueInstant) curInput["valueInstant"] = value.valueInstant;
    //   if (value.valueInteger) curInput["valueInteger"] = value.valueInteger;
    //   if (value.valueMarkdown) curInput["valueMarkdown"] = value.valueMarkdown;
    //   if (value.valueOid) curInput["valueOid"] = value.valueOid;
    //   if (value.valuePositiveInt)
    //     curInput["valuePositiveInt"] = value.valuePositiveInt;
    //   if (value.valueString) curInput["valueString"] = value.valueString;
    //   if (value.valueTime) curInput["valueTime"] = value.valueTime;
    //   if (value.valueUnsignedInt)
    //     curInput["valueUnsignedInt"] = value.valueUnsignedInt;
    //   if (value.valueUri) curInput["valueUri"] = value.valueUri;
    //   if (value.valueUrl) curInput["valueUrl"] = value.valueUrl;
    //   if (value.valueUuid) curInput["valueUuid"] = value.valueUuid;
    //   if (value.valueCodeableConcept)
    //     curInput["valueCodeableConcept"] = value.valueCodeableConcept;
    //   if (value.valueAttachment)
    //     curInput["valueAttachment"] = value.valueAttachment;
    //   if (value.valueCoding) curInput["valueCoding"] = value.valueCoding;
    //   if (value.valueCount) curInput["valueCount"] = value.valueCount;
    //   if (value.valueIdentifier)
    //     curInput["valueIdentifier"] = value.valueIdentifier;
    //   if (value.valuePeriod) curInput["valuePeriod"] = value.valuePeriod;
    //   if (value.valueMoney) curInput["valueMoney"] = value.valueMoney;
    //   if (value.valueHumanName)
    //     curInput["valueHumanName"] = value.valueHumanName;
    //   if (value.valueQuantity) curInput["valueQuantity"] = value.valueQuantity;
    //   if (value.valueRange) curInput["valueRange"] = value.valueRange;
    //   if (value.valueReference)
    //     curInput["valueReference"] = value.valueReference;
    //   if (value.valueRatio) curInput["valueRatio"] = value.valueRatio;
    //   if (value.valueContactPoint)
    //     curInput["valueContactPoint"] = value.valueContactPoint;
    //   if (value.valueContactDetail)
    //     curInput["valueContactDetail"] = value.valueContactDetail;
    //   if (value.valueAddress) curInput["valueAddress"] = value.valueAddress;
    //   if (value.valueSampledData)
    //     curInput["valueSampledData"] = value.valueSampledData;
    //   if (value.valueDuration) curInput["valueDuration"] = value.valueDuration;
    //   if (value.valueAnnotation)
    //     curInput["valueAnnotation"] = value.valueAnnotation;
    //   if (value.valueDistance) curInput["valueDistance"] = value.valueDistance;
    //   if (value.valueAge) curInput["valueAge"] = value.valueAge;
    //   if (value.valueSignature)
    //     curInput["valueSignature"] = value.valueSignature;
    //   if (value.valueTiming) curInput["valueTiming"] = value.valueTiming;
    //   if (value.valueContributor)
    //     curInput["valueContributor"] = value.valueContributor;
    //   if (value.valueDataRequirement)
    //     curInput["valueDataRequirement"] = value.valueDataRequirement;
    //   if (value.valueExpression)
    //     curInput["valueExpression"] = value.valueExpression;
    //   if (value.valueParameterDefinition)
    //     curInput["valueParameterDefinition"] = value.valueParameterDefinition;
    //   if (value.valueRelatedArtifact)
    //     curInput["valueRelatedArtifact"] = value.valueRelatedArtifact;
    //   if (value.valueTriggerDefinition)
    //     curInput["valueTriggerDefinition"] = value.valueTriggerDefinition;
    //   if (value.valueUsageContext)
    //     curInput["valueUsageContext"] = value.valueUsageContext;
    //   if (value.valueDosage) curInput["valueDosage"] = value.valueDosage;
    //   if (value.valueMeta) curInput["valueMeta"] = value.valueMeta;

    //   return curInput;
    // };

    const generateInputAndOutPut = (put: InAndOutPut): any => {
      const curInput: any = {
        type: put.type,
        id: put.id,
        modifierExtension: put.modifierExtension,
        extension: put.extension,
      };

      const value: any = put.value;

      if (value.valueBase64Binary) {
        curInput["valueBase64Binary"] = value.valueBase64Binary;
      } else if (value.valueBoolean) {
        curInput["valueBoolean"] = value.valueBoolean;
      } else if (value.valueCanonical) {
        curInput["valueCanonical"] = value.valueCanonical;
      } else if (value.valueCode) {
        curInput["valueCode"] = value.valueCode;
      } else if (value.valueDate) {
        curInput["valueDate"] = value.valueDate;
      } else if (value.valueDateTime) {
        curInput["valueDateTime"] = value.valueDateTime;
      } else if (value.valueDecimal) {
        curInput["valueDecimal"] = value.valueDecimal;
      } else if (value.valueId) {
        curInput["valueId"] = value.valueId;
      } else if (value.valueInstant) {
        curInput["valueInstant"] = value.valueInstant;
      } else if (value.valueInteger) {
        curInput["valueInteger"] = value.valueInteger;
      } else if (value.valueMarkdown) {
        curInput["valueMarkdown"] = value.valueMarkdown;
      } else if (value.valueOid) {
        curInput["valueOid"] = value.valueOid;
      } else if (value.valuePositiveInt) {
        curInput["valuePositiveInt"] = value.valuePositiveInt;
      } else if (value.valueString) {
        curInput["valueString"] = value.valueString;
      } else if (value.valueTime) {
        curInput["valueTime"] = value.valueTime;
      } else if (value.valueUnsignedInt) {
        curInput["valueUnsignedInt"] = value.valueUnsignedInt;
      } else if (value.valueUri) {
        curInput["valueUri"] = value.valueUri;
      } else if (value.valueUrl) {
        curInput["valueUrl"] = value.valueUrl;
      } else if (value.valueUuid) {
        curInput["valueUuid"] = value.valueUuid;
      } else if (value.valueCodeableConcept) {
        curInput["valueCodeableConcept"] = value.valueCodeableConcept;
      } else if (value.valueAttachment) {
        curInput["valueAttachment"] = value.valueAttachment;
      } else if (value.valueCoding) {
        curInput["valueCoding"] = value.valueCoding;
      } else if (value.valueCount) {
        curInput["valueCount"] = value.valueCount;
      } else if (value.valueIdentifier) {
        curInput["valueIdentifier"] = value.valueIdentifier;
      } else if (value.valuePeriod) {
        curInput["valuePeriod"] = value.valuePeriod;
      } else if (value.valueMoney) {
        curInput["valueMoney"] = value.valueMoney;
      } else if (value.valueHumanName) {
        curInput["valueHumanName"] = value.valueHumanName;
      } else if (value.valueQuantity) {
        curInput["valueQuantity"] = value.valueQuantity;
      } else if (value.valueRange) {
        curInput["valueRange"] = value.valueRange;
      } else if (value.valueReference) {
        curInput["valueReference"] = value.valueReference;
      } else if (value.valueRatio) {
        curInput["valueRatio"] = value.valueRatio;
      } else if (value.valueContactPoint) {
        curInput["valueContactPoint"] = value.valueContactPoint;
      } else if (value.valueContactDetail) {
        curInput["valueContactDetail"] = value.valueContactDetail;
      } else if (value.valueAddress) {
        curInput["valueAddress"] = value.valueAddress;
      } else if (value.valueSampledData) {
        curInput["valueSampledData"] = value.valueSampledData;
      } else if (value.valueDuration) {
        curInput["valueDuration"] = value.valueDuration;
      } else if (value.valueAnnotation) {
        curInput["valueAnnotation"] = value.valueAnnotation;
      } else if (value.valueDistance) {
        curInput["valueDistance"] = value.valueDistance;
      } else if (value.valueAge) {
        curInput["valueAge"] = value.valueAge;
      } else if (value.valueSignature) {
        curInput["valueSignature"] = value.valueSignature;
      } else if (value.valueTiming) {
        curInput["valueTiming"] = value.valueTiming;
      } else if (value.valueContributor) {
        curInput["valueContributor"] = value.valueContributor;
      } else if (value.valueDataRequirement) {
        curInput["valueDataRequirement"] = value.valueDataRequirement;
      } else if (value.valueExpression) {
        curInput["valueExpression"] = value.valueExpression;
      } else if (value.valueParameterDefinition) {
        curInput["valueParameterDefinition"] = value.valueParameterDefinition;
      } else if (value.valueRelatedArtifact) {
        curInput["valueRelatedArtifact"] = value.valueRelatedArtifact;
      } else if (value.valueTriggerDefinition) {
        curInput["valueTriggerDefinition"] = value.valueTriggerDefinition;
      } else if (value.valueUsageContext) {
        curInput["valueUsageContext"] = value.valueUsageContext;
      } else if (value.valueDosage) {
        curInput["valueDosage"] = value.valueDosage;
      } else if (value.valueMeta) {
        curInput["valueMeta"] = value.valueMeta;
      }

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
        if (el.valueBase64Binary) {
          value.valueBase64Binary = el.valueBase64Binary;
        } else if (el.valueBoolean) {
          value.valueBoolean = el.valueBoolean;
        } else if (el.valueCanonical) {
          value.valueCanonical = el.valueCanonical;
        } else if (el.valueCode) {
          value.valueCode = el.valueCode;
        } else if (el.valueDate) {
          value.valueDate = el.valueDate;
        } else if (el.valueDateTime) {
          value.valueDateTime = el.valueDateTime;
        } else if (el.valueDecimal) {
          value.valueDecimal = el.valueDecimal;
        } else if (el.valueId) {
          value.valueId = el.valueId;
        } else if (el.valueInstant) {
          value.valueInstant = el.valueInstant;
        } else if (el.valueInteger) {
          value.valueInteger = el.valueInteger;
        } else if (el.valueMarkdown) {
          value.valueMarkdown = el.valueMarkdown;
        } else if (el.valueOid) {
          value.valueOid = el.valueOid;
        } else if (el.valuePositiveInt) {
          value.valuePositiveInt = el.valuePositiveInt;
        } else if (el.valueString) {
          value.valueString = el.valueString;
        } else if (el.valueTime) {
          value.valueTime = el.valueTime;
        } else if (el.valueUnsignedInt) {
          value.valueUnsignedInt = el.valueUnsignedInt;
        } else if (el.valueUri) {
          value.valueUri = el.valueUri;
        } else if (el.valueUrl) {
          value.valueUrl = el.valueUrl;
        } else if (el.valueUuid) {
          value.valueUuid = el.valueUuid;
        } else if (el.valueCodeableConcept) {
          value.valueCodeableConcept = el.valueCodeableConcept;
        } else if (el.valueAttachment) {
          value.valueAttachment = el.valueAttachment;
        } else if (el.valueCoding) {
          value.valueCoding = el.valueCoding;
        } else if (el.valueCount) {
          value.valueCount = el.valueCount;
        } else if (el.valueIdentifier) {
          value.valueIdentifier = el.valueIdentifier;
        } else if (el.valuePeriod) {
          value.valuePeriod = el.valuePeriod;
        } else if (el.valueMoney) {
          value.valueMoney = el.valueMoney;
        } else if (el.valueHumanName) {
          value.valueHumanName = el.valueHumanName;
        } else if (el.valueQuantity) {
          value.valueQuantity = el.valueQuantity;
        } else if (el.valueRange) {
          value.valueRange = el.valueRange;
        } else if (el.valueReference) {
          value.valueReference = el.valueReference;
        } else if (el.valueRatio) {
          value.valueRatio = el.valueRatio;
        } else if (el.valueContactPoint) {
          value.valueContactPoint = el.valueContactPoint;
        } else if (el.valueContactDetail) {
          value.valueContactDetail = el.valueContactDetail;
        } else if (el.valueAddress) {
          value.valueAddress = el.valueAddress;
        } else if (el.valueSampledData) {
          value.valueSampledData = el.valueSampledData;
        } else if (el.valueDuration) {
          value.valueDuration = el.valueDuration;
        } else if (el.valueAnnotation) {
          value.valueAnnotation = el.valueAnnotation;
        } else if (el.valueDistance) {
          value.valueDistance = el.valueDistance;
        } else if (el.valueAge) {
          value.valueAge = el.valueAge;
        } else if (el.valueSignature) {
          value.valueSignature = el.valueSignature;
        } else if (el.valueTiming) {
          value.valueTiming = el.valueTiming;
        } else if (el.valueContributor) {
          value.valueContributor = el.valueContributor;
        } else if (el.valueDataRequirement) {
          value.valueDataRequirement = el.valueDataRequirement;
        } else if (el.valueExpression) {
          value.valueExpression = el.valueExpression;
        } else if (el.valueParameterDefinition) {
          value.valueParameterDefinition = el.valueParameterDefinition;
        } else if (el.valueRelatedArtifact) {
          value.valueRelatedArtifact = el.valueRelatedArtifact;
        } else if (el.valueTriggerDefinition) {
          value.valueTriggerDefinition = el.valueTriggerDefinition;
        } else if (el.valueUsageContext) {
          value.valueUsageContext = el.valueUsageContext;
        } else if (el.valueDosage) {
          value.valueDosage = el.valueDosage;
        } else if (el.valueMeta) {
          value.valueMeta = el.valueMeta;
        }

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
