interface config {
    id?: string;
    name: string;
    gender: string;
    healthNumber: string;
    mobile: string;
    dob: string;
    MRN: string;
    organizationId: string;
}
declare const PatientResource: (options: config) => {
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
export { PatientResource };
//# sourceMappingURL=Patient.d.ts.map