declare const EncounterStatusArray: readonly ["planned", "arrived", "triaged", "in-progress", "onleave", "finished", "cancelled", "entered-in-error", "unknown"];
declare const EncounterClassArray: readonly [{
    readonly code: "AMB";
    readonly display: "ambulatory";
}, {
    readonly code: "FLD";
    readonly display: "Field";
}, {
    readonly code: "HH";
    readonly display: "Home Health";
}, {
    readonly code: "IMP";
    readonly display: "in-patient";
}, {
    readonly code: "EMER";
    readonly display: "emergency";
}, {
    readonly code: "ACUTE";
    readonly display: "inpatient acute";
}, {
    readonly code: "NONAC";
    readonly display: "inpatient non-acute";
}, {
    readonly code: "OBSENC";
    readonly display: "observation encounter";
}, {
    readonly code: "PRENC";
    readonly display: "pre-admission";
}, {
    readonly code: "VR";
    readonly display: "virtual";
}];
declare const EncounterHospitalizationDischargeDispositionArray: readonly [{
    readonly code: "home";
    readonly display: "home";
}, {
    readonly code: "alt-home";
    readonly display: "Alternative home";
}, {
    readonly code: "other-hcf";
    readonly display: "Other healthcare facility";
}, {
    readonly code: "hosp";
    readonly display: "Hospice";
}, {
    readonly code: "long";
    readonly display: "Long-term care";
}, {
    readonly code: "aadvice";
    readonly display: "Left against advice";
}, {
    readonly code: "exp";
    readonly display: "Expired";
}, {
    readonly code: "psy";
    readonly display: "Psychiatric hospital";
}, {
    readonly code: "rehab";
    readonly display: "Rehabilitation";
}, {
    readonly code: "smf";
    readonly display: "Skilled nursing facility";
}, {
    readonly code: "oth";
    readonly display: "Other";
}];
declare type EncounterStatus = typeof EncounterStatusArray[number];
declare type EncounterClass = typeof EncounterClassArray[number];
declare type EncounterHospitalizationDischargeDisposition = typeof EncounterHospitalizationDischargeDispositionArray[number];
interface ENCOUNTER {
    id?: string;
    text: string;
    status: EncounterStatus;
    identifier: string;
    class: EncounterClass;
    patientId: string;
    startDate: string;
    endDate: string;
    dischargeDisposition: EncounterHospitalizationDischargeDisposition;
}
declare const EncounterResource: (options: ENCOUNTER) => {
    resourceType: string;
    id: string | undefined;
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
    status: "planned" | "arrived" | "triaged" | "in-progress" | "onleave" | "finished" | "cancelled" | "entered-in-error" | "unknown";
    class: {
        system: string;
        code: "AMB" | "FLD" | "HH" | "IMP" | "EMER" | "ACUTE" | "NONAC" | "OBSENC" | "PRENC" | "VR";
        display: "ambulatory" | "Field" | "Home Health" | "in-patient" | "emergency" | "inpatient acute" | "inpatient non-acute" | "observation encounter" | "pre-admission" | "virtual";
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
                code: "home" | "alt-home" | "other-hcf" | "hosp" | "long" | "aadvice" | "exp" | "psy" | "rehab" | "smf" | "oth";
                display: "home" | "Alternative home" | "Other healthcare facility" | "Hospice" | "Long-term care" | "Left against advice" | "Expired" | "Psychiatric hospital" | "Rehabilitation" | "Skilled nursing facility" | "Other";
            }[];
            text: string;
        };
    };
};
export { ENCOUNTER, EncounterResource, EncounterHospitalizationDischargeDispositionArray, EncounterStatusArray, EncounterClassArray };
export type { EncounterClass, EncounterStatus, EncounterHospitalizationDischargeDisposition };
//# sourceMappingURL=Encounter.d.ts.map