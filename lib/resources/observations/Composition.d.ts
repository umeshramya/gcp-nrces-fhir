import { ResourceMaster } from "../../Interfaces";
import { ENCOUNTER } from "../Encounter";
import { PATIENT } from "../Patient";
import { ORGANIZATION } from "../Organization";
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
declare const onlyType: ("OPConsultRecord" | "DischargeSummaryRecord")[];
declare type compositionType = typeof onlyType[number];
export declare const compositionStatusArrey: readonly ["preliminary", "final", "amended", "entered-in-error"];
declare type compositionStatus = typeof compositionStatusArrey[number];
export interface compositionAuthor {
    reference: `Practitioner/${string}`;
    display: string;
}
export interface COMPOSITOIN {
    id?: string;
    identifier?: string;
    patient: PATIENT;
    patientId: string;
    encounter: ENCOUNTER;
    encounterId: string;
    date: string;
    author: compositionAuthor[];
    organization: ORGANIZATION;
    organizationId: string;
    status: compositionStatus;
    type: compositionType;
    section: [];
}
export declare class Composition implements ResourceMaster {
    private compType;
    mapCompositionType(type: compositionType): void;
    getFHIR(options: COMPOSITOIN): {
        resourceType: string;
        id: string | undefined;
        meta: {
            versionId: string;
            lastUpdated: string;
            profile: string[];
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
                code: string;
                display: string;
            }[];
            text: string;
        };
        subject: {
            reference: string;
            display: string;
        };
        encounter: {
            reference: string;
        };
        date: string;
        author: compositionAuthor[];
        title: "OPConsultRecord" | "DischargeSummaryRecord";
        custodian: {
            reference: string;
            display: string;
        };
        section: {
            title: string;
            code: {
                coding: {
                    system: string;
                    code: string;
                    display: "OPConsultRecord" | "DischargeSummaryRecord";
                }[];
            };
            entry: [];
        }[];
    };
    convertFhirToObject(options: any): Partial<COMPOSITOIN>;
}
export {};
//# sourceMappingURL=Composition.d.ts.map