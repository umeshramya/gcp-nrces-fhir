const { Observation, OBSERVATION } = require("gcp-nrces-fhir")
require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD} = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setObservation =async()=>{
    const observation = new Observation()

  const body =  observation.getFHIR({
        "status" : "final",
        "performer": [{ "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" }],
       "valueType" : "valueBoolean",
       "value"  : {"valueBoolean" : true}
    })

    
   let res = body;

   return res;
}



module.exports={setObservation}