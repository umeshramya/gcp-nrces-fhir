const { ServiceRequest, DiagnosticReport } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setDiagnosticReport = async ()=>{
    try {
        const diagnosticReport = new DiagnosticReport();
        const body = diagnosticReport.getFHIR({
            "basedOn" : [{"resource" : "ServiceRequest", "id" : resources.serviceRequest.id }],
            "code" : [{"display" : "Echocardiography", "system": "http://snomed.info/sct"}],
            "category" : [{"display" : "Cardiology", "system": "http://snomed.info/sct"}],
            "conclusion" : "<p>No RWMA<P></p>LVEF 55%</p>",
            "conclusionCode" : [{"display" : "<p>No RWMA<P></p>LVEF 55%</p>", "system": "http://snomed.info/sct"}],
            "issuedDate" : new Date().toISOString(),
            "performer" : [{"resource" : "Practitioner" , "id": resources.practioner.id, "display" : resources.practioner.name}],
            "resultsInterpreter" : [{"resource" : "Practitioner", "id" : resources.practioner.id, "display" : resources.practioner.name}],
            "status" : "final",
            "subject" : {"resource" : "Patient", "id" : resources.patient.id, "display" : resources.patient.name},
            "medialink" : "https:/www.nicehms.com"
        })
    
        console.log(body)
        
        const res = await gcpFhirCRUD.createFhirResource(body, "DiagnosticReport")
        return res;
    } catch (error) {
        console.log(error.response)
        
    }

}

module.exports={setDiagnosticReport}