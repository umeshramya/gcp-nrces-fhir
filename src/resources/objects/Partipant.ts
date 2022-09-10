import { ACTOR, CODEABLE_CONCEPT } from "../../config";
import { FhirObjectsMethods } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { Actor } from "./Actor";

export interface PARTICIPANT {
  actor: ACTOR;
  status: string;
  type: CODEABLE_CONCEPT[];
}

export class Participant extends ResourceMain implements FhirObjectsMethods {
  private participant!: PARTICIPANT;
  setObject(_paticipant: PARTICIPANT) {
    this.participant = _paticipant;
  }

  getJson(): any {
    const body = {
      type: this.participant.type,
      actor: {
        reference: `${this.participant.actor.multiResource.resource}/${this.participant.actor.multiResource.id}`,
        display: this.participant.actor.multiResource.display,
      },
      status: this.participant.type,
    };
    return body;
  }
  getObject(options: any): PARTICIPANT {
      const ret: PARTICIPANT = {
        actor: {
          multiResource: this.getFromMultResource({
            reference: options.actor.reference,
            display: options.actor.display,
          }),
        },
        status: options.status,
        type: options.type,
      };
      return ret;

  }
}
