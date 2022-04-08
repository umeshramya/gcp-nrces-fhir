const console = require("console");
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
            "code" : {
              "coding" : [      {
                "system" : "http://loinc.org",
                "code" : "82692-5",
                "display" : "CT Head and Neck WO contrast"
              }],
              "text" : "CT Head and Neck WO contrast"
            },
            // "category" :[
            //   {
            //     "coding" :  [{
            //       "system" : "http://snomed.info/sct",
            //       "code" : "310128004",
            //       "display" : "Computerized tomography service"
            //     }]
            //   }
            // ],
            "conclusion" : "<p>No RWMA<P></p>LVEF 55%</p>",
            // "conclusionCode" : [
            //   {
            //     "coding" :[        {
            //       "system" : "http://snomed.info/sct",
            //       "code" : "188340000",
            //       "display" : "Malignant tumor of craniopharyngeal duct"
            //     }],
            //     "text" : "<p>No RWMA<P></p>LVEF 55%</p>"
            //   }
            // ],
            "issuedDate" : new Date().toISOString(),
            "performer" : [{"resource" : "Practitioner", "id" : resources.practioner.id, "display" : "Mr Raju Desapande"}],
            "resultsInterpreter" : [{"resource" : "Practitioner", "id" : resources.practioner.id, "display" : resources.practioner.name}],
            "status" : "final",
            "subject" : {"resource" : "Patient", "id" : resources.patient.id, "display" : resources.patient.name},
            "mediaId" : [resources.media.id]
        })
    
        // console.log(body)
        // console.log(body.media)
        // console.log(body.category)
        // console.log(body.conclusionCode)
        // console.log(body.basedOn)
        // return
        const res = await gcpFhirCRUD.createFhirResource(body, "DiagnosticReport")
        const ret = diagnosticReport.convertFhirToObject(res.data);
        return ret;
    } catch (error) {
        console.log(error.response)
        
    }

}

module.exports={setDiagnosticReport}