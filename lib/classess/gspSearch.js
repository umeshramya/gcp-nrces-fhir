"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import google from "@googleapis/healthcare"
const google = require("@googleapis/healthcare");
const config_1 = require("../config");
const cloudRegion = process.env.GCP_FHIR_cloudRegion;
const projectId = process.env.GCP_FHIR_projectId;
const datasetId = process.env.GCP_FHIR_datasetId;
const fhirStoreId = process.env.GCP_FHIR_fhirStoreId;
class GcpFhirSearch {
    constructor() {
        this.healthcare = google.healthcare({
            version: 'v1',
            auth: new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                "credentials": config_1.credentials,
            })
        });
        this.url = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir`;
    }
    searchFhirResourcesPost(resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent = this.url;
                const request = { parent, resourceType };
                const response = yield this.healthcare.projects.locations.datasets.fhirStores.fhir.search(request);
                const resources = response.data.entry;
                console.log(`Resources found: ${resources.length}`);
                console.log(JSON.stringify(resources, null, 2));
                return resources;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = GcpFhirSearch;
//# sourceMappingURL=gspSearch.js.map