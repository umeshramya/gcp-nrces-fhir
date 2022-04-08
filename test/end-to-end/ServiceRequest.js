const { ServiceRequest } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setServiceRequest = async () => {
    const serviceRequest = new ServiceRequest();
    const body = serviceRequest.getFHIR({
        "category": { "code": "108252007", "display": "Laboratory procedure" },
        "intent": "order",
        "date": new Date().toDateString(),
        "patientId": resources.patient.id,
        "patientName": resources.patient.name,
        "priority": "routine",
        "requester": { "display": resources.patient.name, "id": resources.patient.id, "resource": "Patient" },
        "performer": [{ "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" }],
        "patientId": resources.patient.id,
        "patientName": resources.patient.name,
        "status": "draft",
        "date": new Date().toISOString(),
        "services": [{ "display": "Echocardiography", "system": "http://snomed.info/sct" }],
        // "performer": [{ "display": resources.practioner.name, "resource": "Practitioner" }]
    })

    const res = await gcpFhirCRUD.createFhirResource(body, "ServiceRequest");

    const ret = serviceRequest.convertFhirToObject(res.data)
    return ret;
}

module.exports = { setServiceRequest }