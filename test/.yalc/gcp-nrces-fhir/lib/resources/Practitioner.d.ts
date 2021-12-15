import { ResourceMaster } from "../Interfaces";
export interface PRACTITIONER {
    id?: string;
    name: string;
    qualification?: string;
    medicalLicenseNumber: string;
    ndhmProfessionalId: string;
}
export declare class Practitioner implements ResourceMaster {
    getFHIR(options: PRACTITIONER): {
        resourceType: string;
        id: string | undefined;
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
    };
    convertFhirToObject(options: any): PRACTITIONER;
}
/**
* @deprecated
 * @param options
 * @returns
 */
export declare const PractitionerResource: (options: PRACTITIONER) => {
    resourceType: string;
    id: string | undefined;
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
};
//# sourceMappingURL=Practitioner.d.ts.map