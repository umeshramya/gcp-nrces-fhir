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
            
        }),
    });



    private parent: string = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

    async searchFhirResourcesGet(resourceType: resourceType, ..._args:any) {
        try {
          
            const request = { parent: this.parent, resourceType  : resourceType, _args};


            const response =
                await this.healthcare.projects.locations.datasets.fhirStores.fhir.search(
                    request
                );



            return response

        } catch (error) {
            console.log(error)
        }


    }

}