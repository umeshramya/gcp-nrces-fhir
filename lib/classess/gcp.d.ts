import { resourceType } from "../config";
export default class GcpFhirCRUD {
    private healthcare;
    private parent;
    createFhirResource(body: any, resourceType: resourceType): Promise<any>;
    deleteFhirResource(resourceId: string, resourceType: resourceType): Promise<any>;
    getFhirResource(resourceId: string, resourceType: resourceType): Promise<any>;
    updateFhirResource(updateOptions: any, resourceId: string, resourceType: resourceType): Promise<any>;
}
//# sourceMappingURL=gcp.d.ts.map