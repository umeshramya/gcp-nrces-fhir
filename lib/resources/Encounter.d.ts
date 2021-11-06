interface Config {
}
declare const EncounterResource: (options: Config) => {
    resourceType: string;
    meta: {
        lastUpdated: string;
        profile: string[];
    };
    text: {
        status: string;
        div: string;
    };
    identifier: {
        system: string;
        value: string;
    }[];
    status: string;
    class: {
        system: string;
        code: string;
        display: string;
    };
    subject: {
        reference: string;
    };
    period: {
        start: string;
        end: string;
    };
    hospitalization: {
        dischargeDisposition: {
            coding: {
                system: string;
                code: string;
                display: string;
            }[];
            text: string;
        };
    };
};
//# sourceMappingURL=Encounter.d.ts.map