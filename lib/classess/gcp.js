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
};
const cloudRegion = process.env.GCP_FHIR_cloudRegion;
const projectId = process.env.GCP_FHIR_projectId;
const datasetId = process.env.GCP_FHIR_datasetId;
const fhirStoreId = process.env.GCP_FHIR_fhirStoreId;
class GcpFhirCRUD {
    constructor() {
        this.healthcare = google.healthcare({
            version: 'v1',
            auth: new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                "credentials": credentials
            }),
            headers: { 'Content-Type': 'application/fhir+json' },
        });
        this.parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;
    }
    createFhirResource(body, resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = { parent: this.parent, type: resourceType, requestBody: body };
                const resource = yield this.healthcare.projects.locations.datasets.fhirStores.fhir.create(request);
                return resource.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteFhirResource(resourceId, resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = `${this.parent}/fhir/${resourceType}/${resourceId}`;
                const request = { name };
                const resource = yield this.healthcare.projects.locations.datasets.fhirStores.fhir.delete(request);
                return resource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getFhirResource(resourceId, resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = `${this.parent}/fhir/${resourceType}/${resourceId}`;
                const request = { name };
                const resource = yield this.healthcare.projects.locations.datasets.fhirStores.fhir.read(request);
                return resource.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateFhirResource(updateOptions, resourceId, resourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = `${this.parent}/fhir/${resourceType}/${resourceId}`;
                // const name = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir/${resourceType}/${resourceId}`;
                const request = { name, requestBody: updateOptions };
                const resource = yield this.healthcare.projects.locations.datasets.fhirStores.fhir.update(request);
                return resource;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = GcpFhirCRUD;
//# sourceMappingURL=gcp.js.map