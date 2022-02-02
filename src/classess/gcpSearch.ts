// import google from "@googleapis/healthcare";
const google = require("@googleapis/healthcare");
import { credentials, resourceType } from "../config";

const cloudRegion = process.env.GCP_FHIR_cloudRegion;
const projectId = process.env.GCP_FHIR_projectId;
const datasetId = process.env.GCP_FHIR_datasetId;
const fhirStoreId = process.env.GCP_FHIR_fhirStoreId;

interface LooseObject {
  [key: string]: any;
}

export default class GcpFhirSearch {
  private healthcare = google.healthcare({
    version: "v1",
    auth: new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      credentials: credentials,
    }),
  });

  private parent: string = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  async searchFhirResourcesGet(
    resourceType: resourceType,
    args: { key: string; value: any }[]
  ) {
    try {
      let request: LooseObject = {
        parent: this.parent,
        resourceType: resourceType,
      };

      args?.forEach((el) => {
        request[el.key] = el.value;
      });

      const response =
        await this.healthcare.projects.locations.datasets.fhirStores.fhir.search(
          request as any
        );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async search(resourceType: resourceType, parameters: string) {
    try {
      let request = {
        // resourceType: resourceType,
        parent: `${this.parent}/${resourceType}?${parameters}`,
      };

      const response =
        await this.healthcare.projects.locations.datasets.fhirStores.fhir.read(
          { name: `${this.parent}/fhir/${resourceType}?${parameters}` },
          { method: "GET" }
        );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
