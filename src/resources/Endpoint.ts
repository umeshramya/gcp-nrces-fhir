import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export class EndPoint extends ResourceMain implements ResourceMaster{
   async toHtml():Promise<string> {
        throw new Error("Method not implemented.");
    }
    getFHIR(options: any) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}