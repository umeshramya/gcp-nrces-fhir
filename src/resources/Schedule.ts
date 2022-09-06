import { CODEABLE_CONCEPT, IDENTTIFIER, PERIOD, ACTOR } from "../config";
import { ResourceMaster } from "../Interfaces";
import { Actor} from "./objects/Actor";
import ResourceMain from "./ResourceMai";

export interface SCHEDULE{
    id?:string
    readonly text:string;
    // identifiers?:IDENTTIFIER[]
    active:boolean
    serviceCategory?:CODEABLE_CONCEPT[]
    serviceType?:CODEABLE_CONCEPT[]
    specialty?:CODEABLE_CONCEPT[]
    planningHorizon:PERIOD,
    comment : string
    actors:ACTOR[]
}

export class Schedule extends ResourceMain implements ResourceMaster{
    getFHIR(options: SCHEDULE):any {
        const getText=():string=>{
            let ret:string=""
            ret= options.comment
            return ret;
        }

        const getActors=():any[]=>{
            const ret:any[]=[]
            const actor=new Actor();
            options.actors.forEach(el=>{
                actor.setActor(el)
                ret.push(actor.getJson)
            })
            return ret;
        }

        const body = {
            "resourceType": "Schedule",
            "id": options.id || undefined,
            "text": {
              "status": "generated",
              "div": getText()
            },
            // "identifier": options.identifiers,
            "active": options.active,
            "serviceCategory":options.serviceCategory,
            "serviceType": options.serviceType,
            "specialty": options.specialty,
            "actor": getActors(),
            "planningHorizon": options.planningHorizon,
            "comment": options.comment
          }
          return body;
    }
    convertFhirToObject(options: any):SCHEDULE {
       const ret:SCHEDULE={
           id:options.id,
           text: options.text,
           planningHorizon:   options.planningHorizon ,
           comment: options.comment,
           active:options.active,
           serviceCategory:options.serviceCategory,
           serviceType:options.serviceType,
           specialty:options.specialty,
           actors:options.actor.map((el: any)=> new Actor().getObject(el))
       }

       return ret;
    }
    statusArray?: Function | undefined;
    
}


