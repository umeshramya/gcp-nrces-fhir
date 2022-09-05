import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export class Slot extends ResourceMain implements ResourceMaster{
    getFHIR(options: any) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}