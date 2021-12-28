import { CodeDisplay } from "../../config";
import { ResourceMaster } from "../../Interfaces";
import { PATIENT } from "../Patient";
export declare const documentStatusArrey: readonly ["current", "superseded", "entered-in-error"];
declare type DocumentStatus = typeof documentStatusArrey[number];
export declare const documentDocStatusArrey: readonly ["preliminary", "final", "amended", "entered-in-error"];
declare type DocumentDocStatus = typeof documentDocStatusArrey[number];
export interface DOCUMENT_REFERENCE {
    id?: string;
    status: DocumentStatus;
    docStatus: DocumentDocStatus;
    patient: PATIENT;
    patientId: string;
    pdf: string;
    code: CodeDisplay[];
    title: string;
}
export declare class DocumentReference implements ResourceMaster {
    getFHIR(options: DOCUMENT_REFERENCE): {
        resourceType: string;
        id: string | undefined;
        meta: {
            profile: string[];
        };
        text: {
            status: string;
            div: string;
        };
        status: "entered-in-error" | "current" | "superseded";
        docStatus: "entered-in-error" | "preliminary" | "final" | "amended";
        type: {
            coding: CodeDisplay[];
            text: string;
        };
        subject: {
            reference: string;
        };
        content: {
            attachment: {
                contentType: string;
                language: string;
                data: string;
                title: string;
                creation: string;
            };
        }[];
    };
    convertFhirToObject(options: any): void;
}
export {};
//# sourceMappingURL=DocumentReference.d.ts.map