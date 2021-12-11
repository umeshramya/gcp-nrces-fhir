import { RseourceMaster } from "../../Interfaces/index";
export interface CONDITION {
    id?: string;
    text: string;
    snoemedCode?: string;
    snowmedDisplay?: string;
    patientId: string;
}
export declare class Condition implements RseourceMaster {
    getFHIR(options: CONDITION): any;
    convertFhirToObject(options: any): CONDITION;
}
//# sourceMappingURL=Condition.d.ts.map