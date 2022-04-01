const credentials = {
  type: process.env.GCP_FHIR_type,
  project_id: process.env.GCP_FHIR_project_id,
  private_key_id: process.env.GCP_FHIR_private_key_id,
  private_key: process.env.GCP_FHIR_private_key,
  client_email: process.env.GCP_FHIR_client_email,
  client_id: process.env.GCP_FHIR_client_id,
  auth_uri: process.env.GCP_FHIR_auth_uri,
  token_uri: process.env.GCP_FHIR_token_uri,
  auth_provider_x509_cert_url: process.env.GCP_FHIR_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

const databasePath = {
  cloudRegion: process.env.GCP_FHIR_cloudRegion,
  projectId: process.env.GCP_FHIR_projectId,
  datasetId: process.env.GCP_FHIR_datasetId,
  fhirStoreId: process.env.GCP_FHIR_fhirStoreId,
};

const resourceTypeArray = [
  "Patient",
  "Practitioner",
  "Organization",
  "Encounter",
  "Condition",
  "Procedure",
  "AllergyIntolerance",
  "Appointment",
  "Bundle",
  "Composition",
  "ServiceRequest",
  "MedicationStatement",
  "MedicationRequest",
  "DocumentReference",
  "Binary",
  "PractitionerRole",
  "Specimen",
] as const;

type resourceType = typeof resourceTypeArray[number];

export interface CodeDisplay {
  code?: string;
  display: string;
  system: "http://snomed.info/sct" | string;
}

export interface coding {
  system?: string;
  version?: string; // Version of the system - if relevant
  code?: string; // Symbol in syntax defined by the system
  display?: string; // Representation defined by the system
  userSelected?: boolean; // If this coding was chosen directly by the user
}

export interface CODEABLE_CONCEPT {
  coding: coding[]; // Code defined by a terminology system
  text?: string; // Plain text representation of the concept
}
export interface PERIOD {
  start: string;
  end: string;
}
export interface IDENTTIFIER {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: CODEABLE_CONCEPT; // Description of identifier
  system?: string; // The namespace for the identifier value
  value?: string; // The value that is unique
  period?: { Period: PERIOD }; // Time period when id is/was valid for use
  assigner?: { Reference: `Organization/` | string }; // Organization that issued id (may be just text)
}

export { credentials, resourceTypeArray, databasePath };

export type { resourceType };
