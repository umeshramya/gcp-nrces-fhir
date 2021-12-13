export default class OPConsultationNote {
    private documentBundle;
    private composition;
    private practitioner;
    private organization;
    private patient;
    private encounter;
    private allergyIntolerance;
    private appointment;
    private chiefComplaints;
    private medicalHistory;
    private procedure;
    private serviceRequest;
    private medicationStatement;
    private medicationRequest;
    private documentReference;
    setDocumentBundle(gcpFhirId: string, resource: any): void;
    setComposition(): void;
    setPractitioner(gcpFhirId: string, resource: any): void;
    setOrganization(gcpFhirId: string, resource: any): void;
    setPatient(gcpFhirId: string, resource: any): void;
    setEncounter(gcpFhirId: string, resource: any): void;
    setAllergyIntolerance(gcpFhirId: string, resource: any): void;
    setAppointment(gcpFhirId: string, resource: any): void;
    /**
    * mapped to Condition1
    * @param gcpFhirId
    * @param resource
    */
    setChiefComplaints(gcpFhirId: string, resource: any): void;
    /**
    * mapped to Condition2
    * @param gcpFhirId
    * @param resource
    */
    setMedicalHistory(gcpFhirId: string, resource: any): void;
    setProcedure(gcpFhirId: string, resource: any): void;
    setServiceRequest(gcpFhirId: string, resource: any): void;
    setMedicationStatement(gcpFhirId: string, resource: any): void;
    setMedicationRequest(gcpFhirId: string, resource: any): void;
    setdocumentReference(gcpFhirId: string, resource: any): void;
}
//# sourceMappingURL=Bundle-OPConsultNote.d.ts.map