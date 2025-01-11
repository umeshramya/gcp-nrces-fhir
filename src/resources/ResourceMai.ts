import { resourceType } from "..";
import ResourceToHTML from "../classess/ReseorcetToHtml";
import {
  CODEABLE_CONCEPT,
  CodeDisplay,
  IDENTTIFIER,
  MULTI_RESOURCE,
  REFERENCE,
} from "../config";

export interface DOSAGE_INSTRUCTION {
  text: string;
  additionalInstruction?: CodeDisplay[];
  timing: string;
  route: CodeDisplay[];
  method: CodeDisplay[];
}

export default class ResourceMain extends ResourceToHTML {
  /**
   * this return the tex div by subcratig first 42 charceters and last 6 s=charecters
   * @param divtext
   * @returns
   */
  protected getDivText = (divtext: string) => {
    const len = divtext.length;
    return divtext.substring(42, len - 6);
  };

  /**
   * this retuen the id of the reference in a resource
   * @param options
   * @returns
   */
  public getIdFromReference = (options: {
    ref: string;
    resourceType: resourceType;
  }) => {
    return `${options.ref}`.substring(options.resourceType.length + 1);
  };

  /**
   * This returns the identifers from identeries by flters the systems
   * @param system
   * @param identifiers
   * @returns
   */
  public getIdentifers = (system: string, options: any): any => {
    let ret: any;
    const mrn: any[] = options.identifier.filter(
      (el: any) => el.system == system
    );

    if (mrn.length > 0) {
      ret = mrn[0].value;
    }
    return ret;
  };

  /**
   * This is when more than one type resource is under reference
   * @param multiResource
   * @returns
   */
  public getFromMultResource = (multiResource: {
    reference: string;
    display?: string;
    identifier?: IDENTTIFIER;
    type?: string;
  }): MULTI_RESOURCE => {
    const resource =
      multiResource.reference &&
      (`${multiResource.reference}`.substring(
        0,
        `${multiResource.reference}`.indexOf("/")
      ) as any);

    const id =
      (multiResource.reference &&
        this.getIdFromReference({
          ref: multiResource.reference,
          resourceType: resource,
        })) ||
      null;

    let ret: MULTI_RESOURCE = {
      id: id as any,
      resource: resource || null,
    };

    if (multiResource.display) {
      ret.display = multiResource.display;
    }

    if (multiResource.identifier) {
      ret.identifier = multiResource.identifier;
    }

    if (multiResource.type) {
      ret.type = multiResource.type;
    }

    return ret;
  };

  /**
   * this will return copy of resource modified
   * @param resource
   */
  public bundlify(resource: any): any {
    const copyComposoition = Object.assign({}, resource);
    delete copyComposoition.extension;
    delete copyComposoition.language;
    delete copyComposoition.meta;
    delete copyComposoition.text;

    let codedisplay = copyComposoition.code as any;

    if (codedisplay) {
      if (codedisplay.length > 0) {
        codedisplay = codedisplay.map((el: CodeDisplay) => {
          if (el.system == "" || el.system == null) {
            el.system = "https://www.nicehms.com/system";
          }
          return el;
        });
      } else if (codedisplay.coding && codedisplay.coding.length > 0) {
        codedisplay.coding = codedisplay.coding.map((el: CodeDisplay) => {
          if (el.system == "" || el.system == null) {
            el.system = "https://www.nicehms.com/system";
          }
          return el;
        });
      }
    }

    copyComposoition.code = codedisplay;
    return copyComposoition;
  }

  public removeUndefinedKeys<T>(obj: T): T {
    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
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

  getFhirvalueCimplexHandle(value: any, curInput: any) {
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
  }

  getConverOBjValueComplexHandle(el: any, value: any) {
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
  }

  /**
   * Converts the `reference` property of a FHIR resource to a full URL using the specified base URL.
   *
   * @param reference - A FHIR resource object that may contain a `reference` property.
   * @param url - The base URL to prepend to the `reference` property. Defaults to "https://www.nicehms.com/query=".
   * @returns The updated FHIR resource object with its `reference` property transformed into a full URL.
   *
   * @example
   * const resource = { reference: "Patient/123" };
   * const updatedResource = convertReferenceToUrl(resource, "https://example.com/");
   * console.log(updatedResource);
   * // Output: { reference: "https://example.com/Patient/123" }
   *
   * @remarks
   * - This function modifies the input `reference` object in-place.
   * - If the `reference` property is not present, the function returns the resource unchanged.
   * - Ensure the `url` parameter ends with a slash or appropriate delimiter for the resulting URL to be valid.
   */
  convertReferenceToUrl = (
    reference: MULTI_RESOURCE,
    url = "https://www.nicehms.com/query="
  ): MULTI_RESOURCE => {
    if (reference.reference) {
      const curReference = `${url}${reference.reference}`;
      reference.reference = curReference;
    }

    return reference;
  };
}
