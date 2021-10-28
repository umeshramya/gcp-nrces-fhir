// import google from "@googleapis/healthcare"
const google = require("@googleapis/healthcare")

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

const cloudRegion = process.env.GCP_FHIR_cloudRegion
const projectId = process.env.GCP_FHIR_projectId
const datasetId = process.env.GCP_FHIR_datasetId
const fhirStoreId = process.env.GCP_FHIR_fhirStoreId





export default class GcpFhirCRUD {


  private healthcare = google.healthcare({
    version: 'v1',
    auth: new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      "credentials": credentials
    }),
    headers: { 'Content-Type': 'application/fhir+json' },
  });

  private parent: string = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  async createFhirResource(body: any, resourceType: string) {

    try {
      const request = { parent: this.parent, type: resourceType, requestBody: body };
      const resource: any = await this.healthcare.projects.locations.datasets.fhirStores.fhir.create(request)
      return resource
    } catch (error) {
      console.log(error)
    }

  }




  async deleteFhirResource(resourceId: string, resourceType: string) {

    try {
      const name = `${this.parent}/fhir/${resourceType}/${resourceId}`
      const request = { name };
      const resource: any = await this.healthcare.projects.locations.datasets.fhirStores.fhir.delete(
        request
      );

      return resource
    } catch (error) {
      console.log(error)
    }

  }


  async getFhirResource(resourceId: string, resourceType: string) {

    try {
      const name = `${this.parent}/fhir/${resourceType}/${resourceId}`
      const request = { name };
      const resource: any = await this.healthcare.projects.locations.datasets.fhirStores.fhir.read(
        request
      );

      return resource
    } catch (error) {
      console.log(error)
    }

  }


  async updateFhirResource (updateOptions:any ,resourceId: string, resourceType: string) {

    try {
      const name = `${this.parent}/fhir/${resourceType}/${resourceId}`
      // const name = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir/${resourceType}/${resourceId}`;
    
      const request = { name , requestBody: updateOptions};
      const resource: any = await this.healthcare.projects.locations.datasets.fhirStores.fhir.update(
        request
      );

      return resource
    } catch (error) {
      console.log(error)
    }

  }


}
