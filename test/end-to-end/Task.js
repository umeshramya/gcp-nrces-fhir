const { CarePlan, Task } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setTask = async () => {
  const task = new Task()

  const body = task.getFHIR({
    "authoredOn" : new Date().toISOString(),
    "code" :   {
      coding: [
        {
          code: "poll",
          system: "http://terminology.hl7.org/CodeSystem/financialtaskcode",
          display: "Poll",
        },
      ],
      text: "Retrieve selected or all queued resources or messages.",
    },
    "status": "requested",
    "requester" : {
      "identifier" : {
        "value" : "My self"
      }
    },
    "text" : "<>This is  toget INsuranclemplan</>",
    "intent" : "plan",
    "description" : "Please insurance plan",
    "input" : [{
      "type" : {
        "coding" : [{
          "code" : "policyNumber",
          "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-task-input-type-code",
          "display" : "PolicyNumber",
          
        }],
        "text" : "A unique identifier for a policy or contract that covers a patient or a service or product in a claim, payment, or authorization."
      },
   
      "value" : {
        "valueCodeableConcept" : {
          "text" : "12345678"
        }
      }
      

    },
    
  ]
  })

  const res = await gcpFhirCRUD.createFhirResource(body, "Task");
  // console.log(res.data);

   const ret = task.convertFhirToObject(res.data);

  return ret;
};

module.exports = { setTask };
