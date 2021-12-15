import { ResourceMaster } from "../Interfaces";
export interface PATIENT {
    id?: string;
    name: string;
    gender: string;
    healthNumber: string;
    mobile: string;
    dob: string;
    MRN: string;
    organizationId: string;
}
export declare class Patient implements ResourceMaster {
    getFHIR(options: PATIENT): {
        resourceType: string;
        id: string;
        meta: {
            versionId: string;
            lastUpdated: string;
            profile: string[];
        };
        text: {
            status: string;
            div: string;
        };
        identifier: {
            type: {
                coding: {
                    system: string;
                    code: string;
                    display: string;
                }[];
            };
            system: string;
            value: string;
        }[];
        name: {
            text: string;
        }[];
        telecom: {
            system: string;
            value: string;
            use: string;
        }[];
        gender: string;
        birthDate: string;
        managingOrganization: {
            reference: string;
        };
    };
    convertFhirToObject(options: any): PATIENT;
}
/**
 * @deprecated
 * @param options
 * @returns
 */
export declare const PatientResource: (options: PATIENT) => {
    resourceType: string;
    id: string;
    meta: {
        versionId: string;
        lastUpdated: string;
        profile: string[];
    };
    text: {
        status: string;
        div: string;
    };
    identifier: {
        type: {
            coding: {
                system: string;
                code: string;
                display: string;
            }[];
        };
        system: string;
        value: string;
    }[];
    name: {
        text: string;
    }[];
    telecom: {
        system: string;
        value: string;
        use: string;
    }[];
    gender: string;
    birthDate: string;
    managingOrganization: {
        reference: string;
    };
};
//# sourceMappingURL=Patient.d.ts.map