declare const credentials: {
    type: string | undefined;
    project_id: string | undefined;
    private_key_id: string | undefined;
    private_key: string | undefined;
    client_email: string | undefined;
    client_id: string | undefined;
    auth_uri: string | undefined;
    token_uri: string | undefined;
    auth_provider_x509_cert_url: string | undefined;
    client_x509_cert_url: string | undefined;
};
declare const resourceTypeArray: readonly ["Patient", "Practitioner", "Organization", "Encounter", "Condition", "Procedure", "AllergyIntolerance", "Appointment", "Bundle", "Composition", "ServiceRequest", "MedicationStatement", "MedicationRequest", "DocumentReference"];
declare type resourceType = typeof resourceTypeArray[number];
export interface CodeDisplay {
    code?: string;
    display: string;
    system: "http://snomed.info/sct";
}
export { credentials, resourceTypeArray };
export type { resourceType };
//# sourceMappingURL=index.d.ts.map