const { Observation, OBSERVATION } = require("gcp-nrces-fhir")
require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setObservation = async () => {
   const observation = new Observation()

   const body = observation.getFHIR({
      "status": "final",
      "performer": [{ "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" }],
      "value": { "valueBoolean": true },
      "code" :{"text" :"Echocardiography"},
      "patientId" : resources.patient.id,
      "text" : "Testing",
      "orgPanel" : {"parentName" : "Echocardiography", "chileName" : "Echocardiography"}
      
   })

   // console.log(body)
   // return

   let res = (await new GcpFhirCRUD().createFhirResource(body, "Observation")).data;
   res = new Observation().convertFhirToObject(res)

   return res;
}



module.exports = { setObservation }