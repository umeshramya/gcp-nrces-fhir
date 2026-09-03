import { CODEABLE_CONCEPT, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface PROVENANCE_AGENT {
  who: MULTI_RESOURCE;
  /**
   * participant type: author / attester / performer / verifier etc.
   * system: http://terminology.hl7.org/CodeSystem/provenance-participant-type
   */
  type?: CODEABLE_CONCEPT;
}

export interface PROVENANCE {
  id?: string;
  /** resource(s) being attested (Composition / Task / MedicationAdministration / ...) */
  target: MULTI_RESOURCE[];
  /** when the activity was recorded (ISO instant) */
  recorded: string;
  /** sign / amend / supersede / create / update */
  activity: CODEABLE_CONCEPT;
  agent: PROVENANCE_AGENT[];
  reason?: CODEABLE_CONCEPT[];
  policy?: string[];
}

export class Provenance extends ResourceMain implements ResourceMaster {
  async toHtml(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getFHIR(options: PROVENANCE) {
    const body: any = {
      resourceType: "Provenance",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Provenance",
        ],
      },
      text: {
        status: "generated",
        div: options.activity.text || "",
      },
      target: options.target.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      }),
      recorded: options.recorded,
      activity: options.activity,
      agent: options.agent.map((el) => {
        const agent: any = {
          who: {
            reference: `${el.who.resource}/${el.who.id}`,
            display: el.who.display,
          },
        };
        if (el.type) {
          agent.type = el.type;
        }
        return agent;
      }),
    };

    if (options.reason) {
      body.reason = options.reason;
    }
    if (options.policy && options.policy.length > 0) {
      body.policy = options.policy;
    }

    return body;
  }

  convertFhirToObject(options: any): PROVENANCE {
    let ret: PROVENANCE = {
      id: options.id,
      target: (options.target || []).map((el: any) => {
        return this.getFromMultResource({ reference: el.reference });
      }),
      recorded: options.recorded,
      activity: options.activity,
      agent: (options.agent || []).map((el: any) => {
        const agent: PROVENANCE_AGENT = {
          who: this.getFromMultResource({
            reference: el.who?.reference,
            display: el.who?.display,
          }),
        };
        if (el.type) {
          agent.type = el.type;
        }
        return agent;
      }),
    };

    if (options.reason) {
      ret.reason = options.reason;
    }
    if (options.policy) {
      ret.policy = options.policy;
    }

    return ret;
  }

  statusArray?: Function | undefined;
}
