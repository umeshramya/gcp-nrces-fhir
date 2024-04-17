import { CODEABLE_CONCEPT, IDENTTIFIER, PERIOD, ACTOR } from "../config";
import { ResourceMaster } from "../Interfaces";
import { Actor } from "./objects/Actor";
import ResourceMain from "./ResourceMai";

export interface SCHEDULE {
  id?: string;
  readonly text: string;
  organizationId: string;
  active: boolean;
  serviceCategory?: CODEABLE_CONCEPT[];
  serviceType?: CODEABLE_CONCEPT[];
  specialty?: CODEABLE_CONCEPT[];
  planningHorizon?: PERIOD;
  comment: string;
  actors: ACTOR[];
}

export class Schedule extends ResourceMain implements ResourceMaster {
  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  getFHIR(options: SCHEDULE): any {
    const getText = (): string => {
      let ret: string = "";
      ret = options.comment;
      return ret;
    };

    const getActors = (): any[] => {
      const ret: any[] = [];
      const actor = new Actor();
      options.actors.forEach((el) => {
        actor.setObject(el);
        ret.push(actor.getJson());
      });
      return ret;
    };
    const identifiers: IDENTTIFIER[] = [];

    identifiers.push({
      value: options.organizationId,
      system: "https://www.nicehms.com/orgnization",
    });

    const body = {
      resourceType: "Schedule",
      id: options.id || undefined,
      text: {
        status: "generated",
        div: getText(),
      },
      identifier: identifiers,
      active: options.active,
      serviceCategory: options.serviceCategory,
      serviceType: options.serviceType,
      specialty: options.specialty,
      actor: getActors(),
      planningHorizon: options.planningHorizon,
      comment: options.comment,
    };
    return body;
  }
  convertFhirToObject(options: any): SCHEDULE {
    let orgIdentifierArray: IDENTTIFIER[] =
      (options.identifier &&
        options.identifier.filter(
          (el: IDENTTIFIER) =>
            el.system == "https://www.nicehms.com/orgnization"
        )) ||
      [];
    let organizationId = "";
    if (orgIdentifierArray.length > 0) {
      organizationId = orgIdentifierArray[0].value || "";
    }
    const ret: SCHEDULE = {
      id: options.id,
      text: options.text,
      planningHorizon: options.planningHorizon,
      comment: options.comment,
      active: options.active,
      actors: options.actor.map((el: any) => new Actor().getObject(el)),
      organizationId: organizationId,
    };

    if (options.serviceCategory) {
      ret.serviceCategory = options.serviceCategory;
    }
    if (options.serviceType) {
      ret.serviceType = options.serviceType;
    }
    if (options.specialty) {
      ret.specialty = options.specialty;
    }
    if (options.planningHorizon) {
      ret.planningHorizon = options.planningHorizon;
    }

    return ret;
  }
  statusArray?: Function | undefined;
}
