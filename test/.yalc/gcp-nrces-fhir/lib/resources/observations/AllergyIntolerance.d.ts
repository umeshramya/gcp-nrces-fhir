import { RseourceMaster } from "../../Interfaces";
import { CodeDisplay } from "../../config/index";
export declare const clinicalStatusArray: readonly ["active", "inactive", "resolved"];
declare type clinicalStatus = typeof clinicalStatusArray[number];
export declare const verificationStatusArray: readonly ["unconfirmed", "confirmed", "refuted", "entered-in-error"];
declare type verificationStatus = typeof verificationStatusArray[number];
export interface ALLERGY_INTOLERANCE {
    id?: string;
    clinicalStatus: clinicalStatus;
    verificationStatus: verificationStatus;
    allergyIntolerance: CodeDisplay[];
    text: string;
    patientId: string;
    date: string;
    practitionerId: string;
    note: {
        text: string;
    }[];
}
export declare class AllergyIntolerance implements RseourceMaster {
    getFHIR(options: ALLERGY_INTOLERANCE): any;
    convertFhirToObject(options: any): ALLERGY_INTOLERANCE;
}
export {};
//# sourceMappingURL=AllergyIntolerance.d.ts.map