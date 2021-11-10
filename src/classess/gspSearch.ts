// import google from "@googleapis/healthcare"
const google = require("@googleapis/healthcare")
import { credentials, resourceType } from "../config"


const cloudRegion = process.env.GCP_FHIR_cloudRegion
const projectId = process.env.GCP_FHIR_projectId
const datasetId = process.env.GCP_FHIR_datasetId
const fhirStoreId = process.env.GCP_FHIR_fhirStoreId

export default class GcpFhirSearch {

    private healthcare = google.healthcare({
        version: 'v1',
        auth: new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            "credentials": credentials,
        })
    });



    private url: string = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir`;

    async searchFhirResourcesPost(resourceType: resourceType) {
        try {
            const parent = this.url
            const request = { parent, resourceType };

            const response =
                await this.healthcare.projects.locations.datasets.fhirStores.fhir.search(
                    request
                );

            const resources = response.data.entry;
            console.log(`Resources found: ${resources.length}`);
            console.log(JSON.stringify(resources, null, 2));

            return resources

        } catch (error) {
            console.log(error)
        }


    }

}