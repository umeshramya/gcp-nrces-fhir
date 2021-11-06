declare const resourceTypeArray: readonly ["Patient", "Practitioner", "Organization", "Encounter"];
declare type resourceType = typeof resourceTypeArray[number];
export default class GcpFhirCRUD {
    private healthcare;
    private parent;
    createFhirResource(body: any, resourceType: resourceType): Promise<any>;
    deleteFhirResource(resourceId: string, resourceType: resourceType): Promise<any>;
    getFhirResource(resourceId: string, resourceType: resourceType): Promise<any>;
    updateFhirResource(updateOptions: any, resourceId: string, resourceType: resourceType): Promise<any>;
}
export {};
//# sourceMappingURL=gcp.d.ts.map