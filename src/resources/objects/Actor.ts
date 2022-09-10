import { ACTOR} from "../../config";
import { FhirObjectsMethods } from "../../Interfaces";
import ResourceMain from "../ResourceMai";


export class Actor extends ResourceMain implements FhirObjectsMethods{
  private actor!: ACTOR;
  setActor(_actor: ACTOR) {
    this.actor = _actor;
  }

  getJson(): any {
    const body = {
      reference: `${this.actor.multiResource.resource}/${this.actor.multiResource.id}`,
      display: this.actor.multiResource.display,
    };
    return body;
  }
  getObject(options: any): ACTOR {
    const ret: ACTOR = {
      multiResource: this.getFromMultResource({
        display: options.display,
        reference: options.reference,
      }),
    };

    return ret;
  }
}
