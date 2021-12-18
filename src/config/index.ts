const credentials = {
    "type": process.env.GCP_FHIR_type,
    "project_id": process.env.GCP_FHIR_project_id,
    "private_key_id": process.env.GCP_FHIR_private_key_id,
    "private_key": process.env.GCP_FHIR_private_key,
    "client_email": process.env.GCP_FHIR_client_email,
    "client_id": process.env.GCP_FHIR_client_id,
    "auth_uri": process.env.GCP_FHIR_auth_uri,
    "token_uri": process.env.GCP_FHIR_token_uri,
    "auth_provider_x509_cert_url": process.env.GCP_FHIR_auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
}


const resourceTypeArray = [
    "Patient", "Practitioner", "Organization", "Encounter", "Condition", "Procedure", "AllergyIntolerance", "Appointment", "Bundle", "Composition", "ServiceRequest", "MedicationStatement", "MedicationRequest"
] as const

type resourceType = typeof resourceTypeArray[number]

export interface CodeDisplay {
    code?: string; display: string; system: "http://snomed.info/sct"
}
export { credentials, resourceTypeArray }

export type { resourceType }