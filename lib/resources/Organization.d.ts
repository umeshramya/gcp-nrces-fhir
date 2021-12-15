import { ResourceMaster } from "../Interfaces";
export interface ORGANIZATION {
    id?: string;
    name: string;
    phone: string;
    email: string;
    providerNumber?: string;
    ndhmFacilityNumber?: string;
}
export declare class Organization implements ResourceMaster {
    getFHIR(options: ORGANIZATION): {
        resourceType: string;
        id: string;
        meta: {
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
        name: string;
        telecom: {
            system: string;
            value: string;
            use: string;
        }[];
    };
    convertFhirToObject(options: any): ORGANIZATION;
}
/**
 * @deprecated
 * @param options
 * @returns
 */
export declare const OrganizationResource: (options: ORGANIZATION) => {
    resourceType: string;
    id: string;
    meta: {
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
    name: string;
    telecom: {
        system: string;
        value: string;
        use: string;
    }[];
};
//# sourceMappingURL=Organization.d.ts.map