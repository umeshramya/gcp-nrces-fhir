const { ServiceRequest, DiagnosticReport } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setDiagnosticReport = async ()=>{
    const diagnosticReport = new DiagnosticReport();
    const body = diagnosticReport.getFHIR({
        "basedOn" : [{"resource" : "ServiceRequest", "id" : resources.ServiceRequest.id }]
    })
}

