import { resourceType } from "../config";
export default class GcpFhirSearch {
    private healthcare;
    private parent;
    searchFhirResourcesGet(resourceType: resourceType, args: {
        key: string;
        value: any;
    }[]): Promise<any>;
}
//# sourceMappingURL=gcpSearch.d.ts.map