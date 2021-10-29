interface Config {
    id?: string;
    name: string;
    phone: string;
    email: string;
    providerNumber?: string;
    ndhmFacilityNumber?: string;
}
declare const OrganizationResource: (options: Config) => {
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
export { OrganizationResource };
//# sourceMappingURL=Organization.d.ts.map