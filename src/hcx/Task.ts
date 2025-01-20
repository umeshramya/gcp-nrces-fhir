import { CODEABLE_CONCEPT, EXTENSION, IDENTTIFIER, MULTI_RESOURCE, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { VALUE } from "../resources/Observation";
import ResourceMain from "../resources/ResourceMai";
import { TO_HTML_HCX_OPTIONS } from "./interfaces";

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
  resourceType: "Task"
  code?: TaskCode;
  intent: TaskIntent;
  status: Status;
  authoredOn?: string;
  description?: string;
  requester?: Requester;
  owner?: Owner;
  input?: InAndOutPut[];
  output?: InAndOutPut[];
  identifier?:IDENTTIFIER[]
}

export interface TO_HTML_HCX_OPTIONS_PAYMENT_RECONCILIATION
  extends Omit<TO_HTML_HCX_OPTIONS, "body"> {
  body: TASK;
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
      this.getFhirvalueCimplexHandle(value, curInput);
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
      identifier:options.identifier,
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
        this.getConverOBjValueComplexHandle(el, value);

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
      resourceType : "Task",
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
      identifier:options.identifier
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
  async toHtml(option: TO_HTML_HCX_OPTIONS_PAYMENT_RECONCILIATION): Promise<string> {
    const body = option.body;
  
    try {
      const htmlParts: string[] = [];
  
      htmlParts.push("<div class='task'>");
  
      // Title and Resource Type
      htmlParts.push(`<h1>Task: ${body.id || "Unnamed Task"}</h1>`);
      htmlParts.push(`<p><strong>Resource Type:</strong> ${body.resourceType}</p>`);
  
      // Status and Intent
      htmlParts.push(`<p><strong>Status:</strong> ${body.status}</p>`);
      htmlParts.push(`<p><strong>Intent:</strong> ${body.intent}</p>`);
  
      // Description
      if (body.description) {
        htmlParts.push(`<p><strong>Description:</strong> ${body.description}</p>`);
      }
  
      // Authored On
      if (body.authoredOn) {
        htmlParts.push(`<p><strong>Authored On:</strong> ${new Date(body.authoredOn).toLocaleString()}</p>`);
      }
  
      // Requester
      if (body.requester) {
        htmlParts.push(`
          <div class='requester'>
            <p><strong>Requester:</strong></p>
            <ul>
              <li><strong>Resource:</strong> ${body.requester.resource}</li>
              <li><strong>Reference:</strong> ${body.requester.reference || "N/A"}</li>
              <li><strong>Display:</strong> ${body.requester.display || "N/A"}</li>
            </ul>
          </div>
        `);
      }
  
      // Owner
      if (body.owner) {
        htmlParts.push(`
          <div class='owner'>
            <p><strong>Owner:</strong></p>
            <ul>
              <li><strong>Resource:</strong> ${body.owner.resource}</li>
              <li><strong>Reference:</strong> ${body.owner.reference || "N/A"}</li>
              <li><strong>Display:</strong> ${body.owner.display || "N/A"}</li>
            </ul>
          </div>
        `);
      }
  
      // Input
      if (body.input && body.input.length > 0) {
        htmlParts.push("<div class='input'><strong>Input:</strong><ul>");
        body.input.forEach((input) => {
          htmlParts.push(`
            <li>
              <p><strong>Type:</strong> ${input.type.text || "N/A"}</p>
              <p><strong>Value:</strong> ${JSON.stringify(input.value)}</p>
            </li>
          `);
        });
        htmlParts.push("</ul></div>");
      }
  
      // Output
      if (body.output && body.output.length > 0) {
        htmlParts.push("<div class='output'><strong>Output:</strong><ul>");
        body.output.forEach((output) => {
          htmlParts.push(`
            <li>
              <p><strong>Type:</strong> ${output.type.text || "N/A"}</p>
              <p><strong>Value:</strong> ${JSON.stringify(output.value)}</p>
            </li>
          `);
        });
        htmlParts.push("</ul></div>");
      }
  
      // Identifier
      if (body.identifier && body.identifier.length > 0) {
        htmlParts.push("<div class='identifier'><strong>Identifiers:</strong><ul>");
        body.identifier.forEach((id) => {
          htmlParts.push(`
            <li>
              <p><strong>System:</strong> ${id.system || "N/A"}</p>
              <p><strong>Value:</strong> ${id.value || "N/A"}</p>
            </li>
          `);
        });
        htmlParts.push("</ul></div>");
      }
  
      htmlParts.push("</div>");
  
      return htmlParts.join("\n");
    } catch (error: any) {
      throw new Error(`Failed to generate HTML: ${error.message}`);
    }
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
