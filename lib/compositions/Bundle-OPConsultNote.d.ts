interface SECTION {
    chiefComplints: any;
    allergyIntolerance: any;
    medicalHistroy: any;
    serviceRequest: any;
    medicationStatement: any;
    medicationRequest: any;
    procedure: any;
    appointment: any;
    documentReference: any;
}
export declare class OPConsultationNote {
    private nonSection;
    private _section;
    private _bundleEntry;
    get section(): any[];
    set section(value: any[]);
    get bundleEntry(): any[];
    set bundleEntry(value: any[]);
    private createBundleEntry;
    private createSectionEntry;
    setEntries(options: Partial<SECTION>): void;
}
export {};
//# sourceMappingURL=Bundle-OPConsultNote.d.ts.map