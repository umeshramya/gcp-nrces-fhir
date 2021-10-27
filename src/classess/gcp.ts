import google from "@googleapis/healthcare"

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

const cloudRegion   =process.env.GCP_FHIR_cloudRegion
const projectId     =process.env.GCP_FHIR_projectId
const datasetId     =process.env.GCP_FHIR_datasetId
const fhirStoreId   =process.env.GCP_FHIR_fhirStoreId

const healthcare = google.healthcare({
  version: 'v1',
  auth: new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    "credentials" : credentials
  }),
  headers: {'Content-Type': 'application/fhir+json'},
});



export default class GcpFhir{
  
async  createFhirResource(body:any, resourceType:string):Promise<any> {
  try {
      const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;
  //   const parent = `projects/psychic-city-328609/locations/asia-south1/datasets/dataset1/fhirStores/fhir_store`
      const request = {parent, type: resourceType, requestBody: body};
      const resource :any = await  healthcare.projects.locations.datasets.fhirStores.fhir.create(request)
      return resource
  } catch (error) {
    console.log(error)
  }
  
  }
  

}
