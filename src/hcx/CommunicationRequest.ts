import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

export class CommunicationRequest extends ResourceMain implements ResourceMaster{
    getFHIR(options: any) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    toHtml(option: { addResourceType: boolean; }): string {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;

}