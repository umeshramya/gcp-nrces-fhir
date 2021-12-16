import { COMPOSITOIN, DOCUMENT_BUNDLE } from "..";
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
interface NON_SECTION {
    patient: any;
    composition: any;
    practitioner: any;
    encounter: any;
    documentReference: any;
}
export declare class OPConsultationNote {
    private _section;
    get section(): any[];
    private nonSection;
    createBundle(_bundle: DOCUMENT_BUNDLE, _comoosition: COMPOSITOIN): Promise<void>;
    setNonSection(option: NON_SECTION): void;
    setSection(options: Partial<SECTION>): void;
}
export {};
//# sourceMappingURL=Bundle-OPConsultNote.d.ts.map