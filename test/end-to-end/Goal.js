const {  Goal } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setGoal= async () => {
 const goal = new Goal()

 const body = goal.getFHIR({
  "achievementStatus" : {
    "coding" : [{"code" : "in-progress"}],
  },
  "text" :"testing food",
  "addresses" : [{"resource" : "Condition" ,  "id" : resources.conditon.id}],
  "category" : [
    {
      "coding" : [{"code" : "Treatment"}]
    }
  ],
  "description" : {"text" : "test Goal"},
  "expressedBy" : {"resource" : "Patient" , "id" : resources.patient.id},
  "lifecycleStatus" : "accepted",
  "note" : [{"text" : "testioioia"}],
  "outcomeReference" : [{"resource" : "Observation" , "id": resources.observation.id}],
  "priority" : {"text" : "First"},
  "startDate" : new Date().toISOString().split("T")[0],
  "statusDate" : new Date().toISOString().split("T")[0],
  "statusReason" : "Nothisg",
  "subject" : {"resource" : "Patient", "id" : resources.patient.id},
  "target" : [
    {
      "measure" : {
        "text" : "Measure wirght",
        
      },
      "dueDate" : "2024-12-12"
    }
  ]
  

 })




 const res = await gcpFhirCRUD.createFhirResource(body, "Goal");
 const ret = goal.convertFhirToObject(res.data);


  return ret;
  
};

module.exports = { setGoal };
