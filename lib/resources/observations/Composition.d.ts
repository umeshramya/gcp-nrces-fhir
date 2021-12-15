import { ResourceMaster } from "../../Interfaces";
import { ENCOUNTER } from "../Encounter";
export declare const compositionTypeArrey: readonly [{
    readonly type: "OPConsultRecord";
    readonly url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord";
    readonly code: "371530004";
    readonly text: "Clinical consultation report";
}, {
    readonly type: "DischargeSummaryRecord";
    readonly url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord";
    readonly code: "373942005";
    readonly text: "Discharge summary";
}];
declare type compositionType = typeof compositionTypeArrey[number];
export declare const compositionStatusArrey: readonly ["preliminary", "final", "amended", "entered-in-error"];
declare type compositionStatus = typeof compositionStatusArrey[number];
export interface COMPOSITOIN {
    id?: string;
    identifier?: string;
    patientId: string;
    patientName: string;
    encounter: ENCOUNTER;
    date: string;
    practitionerId: string;
    practitionerName: string;
    organizationId: string;
    organizationName: string;
    status: compositionStatus;
    type: compositionType;
    patientBirthDate?: string;
    patientPhone?: string;
    patientGender?: string;
    patientHealthId?: string;
}
export declare class Composition implements ResourceMaster {
    getFHIR(options: COMPOSITOIN): {
        resourceType: string;
        id: string | undefined;
        meta: {
            versionId: string;
            lastUpdated: string;
            profile: ("https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord" | "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DischargeSummaryRecord")[];
        };
        language: string;
        text: {
            status: string;
            div: string;
        };
        identifier: {
            system: string;
            value: string;
        };
        status: "entered-in-error" | "preliminary" | "final" | "amended";
        type: {
            coding: {
                system: string;
                code: "371530004" | "373942005";
                display: "Clinical consultation report" | "Discharge summary";
            }[];
            text: "Clinical consultation report" | "Discharge summary";
        };
        subject: {
            reference: string;
            display: string;
        };
        encounter: {
            reference: string;
        };
        date: string;
        author: {
            reference: string;
            display: string;
        }[];
        title: "OPConsultRecord" | "DischargeSummaryRecord";
        custodian: {
            reference: string;
            display: string;
        };
    };
    convertFhirToObject(options: any): void;
}
export {};
//# sourceMappingURL=Composition.d.ts.map