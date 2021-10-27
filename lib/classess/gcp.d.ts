export default class GcpFhirCRUD {
    private healthcare;
    private parent;
    createFhirResource(body: any, resourceType: string): Promise<any>;
    deleteFhirResource(resourceId: string, resourceType: string): Promise<any>;
    getFhirResource(resourceId: string, resourceType: string): Promise<any>;
    updateFhirResource(updateOptions: any, resourceId: string, resourceType: string): Promise<any>;
}
//# sourceMappingURL=gcp.d.ts.map