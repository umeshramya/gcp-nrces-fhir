import { ACTOR, CODEABLE_CONCEPT } from "../../config";
import { FhirObjectsMethods } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { Actor } from "./Actor";

interface PARTICIPANT {
  actor: ACTOR;
  status: string;
  type: CODEABLE_CONCEPT[];
}

export class Participant extends ResourceMain implements FhirObjectsMethods {
  private participant!: PARTICIPANT;
  setActor(_paticipant: PARTICIPANT) {
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
  getObject(options: any): PARTICIPANT[] {
    const ret: PARTICIPANT[] = options.participant.map((el: any) => {
      const mapret: PARTICIPANT = {
        actor: {
          multiResource: this.getFromMultResource({
            reference: el.actor.reference,
            display: el.actor.display,
          }),
        },
        status: el.status,
        type: el.type,
      };
      return mapret;
    });
    return ret;
  }
}
