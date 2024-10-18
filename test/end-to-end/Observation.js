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
      "component":[
         {
            "code" : {
               "text" : "Systolic",
               
            },
            "valueQuantity": {
               "value" : 130,
               "unit" : "mmHg",
               "system" : "http://unitsofmeasure.org",
               "code" : "mm[Hg]"
            }
         },
         {
            "code" : {
               "text" : "Diastolic Blood Presuure"
            },

            "valueQuantity": {
               "value" : 80,
               "unit" : "mmHg",
               "system" : "http://unitsofmeasure.org",
               "code" : "mm[Hg]"
            }
         }
      ],
      effectiveDateTime : new Date().toISOString(),
      category : [
         {
            "text" : "Vitals Sign"
         }
      ],
      "performer": [{ "display": resources.practioner.name, "id": resources.practioner.id, "resource": "Practitioner" }],
      "value": { "valueQuantity" : {
         "code" : "weight",
         "system" : "http://unitsofmeasure.org",
         "unit": "Kg",
      }},
      "code" :{"text" :"Hb"},
      "patientId" : resources.patient.id,
      "text" : "Testing",
      "orgPanel" : {"parentName" : "HB", "chileName" : "Hb"},
      "referenceRange": [
         {
            "appliesTo" : [{"text" : "Male"}],
            "high" : {"value" : 15, "system" : "http://unitsofmeasure.org", "unit" : "yrs"},
            "low" : {"value" : 10, "system" : "http://unitsofmeasure.org", "unit" : "yrs"},
            "age" : {"high" : {"code" : "hb", "system" : "http://unitsofmeasure.org", "unit" : "yrs", "value" : 1},
                  "low" : {"code": "low", "system": "http://unitsofmeasure.org", "unit" : "yrs","value" : 5}},
            "text" : "Negetive"
            
         }         

]
      
   })

   // console.log(body)
   // return

   let res = (await new GcpFhirCRUD().createFhirResource(body, "Observation")).data;
   res = new Observation().convertFhirToObject(res)

   return res;
}



module.exports = { setObservation }