import { ACTOR, CODEABLE_CONCEPT } from "../../config";
import { FhirObjectsMethods } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { Actor } from "./Actor";

export interface PARTICIPANT {
  actor: ACTOR;
  status: 	"accepted" | "declined" | "tentative" |"needs-action",
  required? : 	"required" | "optional" | "information-only",
  type?: CODEABLE_CONCEPT[];
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
      status: this.participant.status,
      required : this.participant.required
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
        
      };
      if(options.type){
        ret.type=options.type
      }
      if(options.required){
        ret.required = options.required
      }
      return ret;

  }
}
