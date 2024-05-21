const console = require("console");
const { ServiceRequest } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setServiceRequest = async () => {
    const serviceRequest = new ServiceRequest();
    const body = serviceRequest.getFHIR({
        // "category": { "code": "108252007", "display": "Laboratory procedure" },
        "intent": "order",
        "date": new Date().toDateString(),
        "patientId": resources.patient.id,
        "patientName": resources.patient.name,
        "extension" : [
            {"url" : "htttp://www.nicehms.com/allServices", "valueString" : "TRUE"}
        ],
        // "priority": "routine",
        // "requester": { "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" },
        "requester" : { "display": resources.practioner.name, "resource": "Practitioner", "id": "https://nicehms.com" },
        // "performer": [{ "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" }],
        "patientId": resources.patient.id,
        "patientName": resources.patient.name,
        "status": "draft",
        "date": new Date().toISOString(),
        "services": [{ "display": "Echocardiography", "system": "http://snomed.info/sct" }],
        note: [{"text" : "Referig for CAG"}],
        "performer": [{ "display": resources.practioner.name, "resource": "Practitioner", "id": "https://nicehms.com" },
    {"resource" : "Organization", "id": resources.organization.id, "display" : resources.organization.name}]
    })



    const res = await gcpFhirCRUD.createFhirResource(body, "ServiceRequest");

    const ret = serviceRequest.convertFhirToObject(res.data)
    return ret;
}





module.exports = { setServiceRequest }