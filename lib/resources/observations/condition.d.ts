interface RseourceMaster {
    getFHIR(options: any): any;
    convertFhirToObject(options: any): any;
}
export interface CONDITION {
    text: string;
    snoemedCode?: string;
    snowmedDisplay?: string;
    patientId: string;
}
export declare class Condition implements RseourceMaster {
    getFHIR(options: CONDITION): any;
    convertFhirToObject(options: any): CONDITION;
}
export {};
//# sourceMappingURL=condition.d.ts.map