import { ResourceMaster } from "../../Interfaces/index";
import { CodeDisplay } from "../../config";
export interface CONDITION {
    id?: string;
    text: string;
    condtion: CodeDisplay[];
    patientId: string;
}
export declare class Condition implements ResourceMaster {
    getFHIR(options: CONDITION): any;
    convertFhirToObject(options: any): CONDITION;
}
//# sourceMappingURL=Condition.d.ts.map