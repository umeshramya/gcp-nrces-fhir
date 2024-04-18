import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

export class ClaimResponse extends ResourceMain implements ResourceMaster{
    getFHIR(options: any) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    async toHtml(option: { addResourceType: boolean; }):Promise<string> {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}