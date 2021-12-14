import { ResourceMaster } from "../Interfaces";
export interface DOCUMENT_BUNDLE {
    date: string;
    id?: string;
    practitionerId: string;
    signJpegbase64?: string;
    identifier?: string;
    entry: any[];
}
export declare class DocumentBundle implements ResourceMaster {
    getFHIR(options: DOCUMENT_BUNDLE): any;
    convertFhirToObject(options: any): DOCUMENT_BUNDLE;
}
//# sourceMappingURL=DocumentBundle.d.ts.map