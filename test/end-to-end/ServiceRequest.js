const { ServiceRequest } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setServiceRequest=async()=>{
    const serviceRequest = new ServiceRequest();
    const body = serviceRequest.getFHIR({
        "category" : {"code" : "108252007", "display" : "Laboratory procedure"},
        "intent" : "order",
        "date" : new Date().toDateString(),
        "" : resources.patient.id,


    })
}