interface config {
    id?: string;
    name: string;
    qualification: string;
    medicalLicenseNumber: string;
    ndhmProfessionalId: string;
}
declare const PractitionerResource: (options: config) => {
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
};
export { PractitionerResource };
//# sourceMappingURL=Practitioner.d.ts.map