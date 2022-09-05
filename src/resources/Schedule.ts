import { CODEABLE_CONCEPT, IDENTTIFIER, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export interface SCHEDULE{
    id?:string
    readonly text:string;
    identifiers?:IDENTTIFIER[]
    active:boolean
    serviceCategory?:CODEABLE_CONCEPT[]
    serviceType?:CODEABLE_CONCEPT[]
    specialty?:CODEABLE_CONCEPT[]
    planningHorizon:PERIOD
    comment : String
}

export class Schedule extends ResourceMain implements ResourceMaster{
    getFHIR(options: SCHEDULE) {
        const getText=():string=>{
            const ret:string=""
            return ret;
        }

        const body = {
            "resourceType": "Schedule",
            "id": options.id || undefined,
            "text": {
              "status": "generated",
              "div": getText()
            },
            "identifier": options.identifiers,
            "active": options.active,
            "serviceCategory":options.serviceCategory,
            "serviceType": options.serviceType,
            "specialty": options.specialty,
            "actor": [
              {
                "reference": "Location/1",
                "display": "Burgers UMC, South Wing, second floor"
              }
            ],
            "planningHorizon": options.planningHorizon,
            "comment": options.comment
          }
    }
    convertFhirToObject(options: any):SCHEDULE {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}