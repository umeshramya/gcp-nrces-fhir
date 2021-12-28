import { ResourceMaster } from "../../Interfaces/index";
import { CodeDisplay } from "../../config/index";
export declare const procedureStatusArray: readonly ["preparation", "in-progress", "not-done", "on-hold", "stopped", "completed", "entered-in-error", "unknown"];
export declare type procedureStatus = typeof procedureStatusArray[number];
export interface PROCEDURE {
    id?: string;
    status: procedureStatus;
    text: string;
    procedure: CodeDisplay[];
    complication?: CodeDisplay[];
    patientID: string;
    procedureDate: string;
}
export declare class Procedure implements ResourceMaster {
    getFHIR(options: PROCEDURE): {
        resourceType: string;
        id: string | undefined;
        meta: {
            profile: string[];
        };
        text: {
            status: string;
            div: string;
        };
        status: "in-progress" | "entered-in-error" | "unknown" | "preparation" | "not-done" | "on-hold" | "stopped" | "completed";
        code: {
            coding: CodeDisplay[];
            text: string;
        };
        subject: {
            reference: string;
        };
        performedDateTime: string;
        complication: {
            coding: CodeDisplay[] | undefined;
        }[];
    };
    convertFhirToObject(options: any): PROCEDURE;
}
//# sourceMappingURL=Procedure.d.ts.map