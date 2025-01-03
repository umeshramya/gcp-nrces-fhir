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
    "text" : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example1</p><p><b>contained</b>: </p><p><b>identifier</b>: 20170201-001 (OFFICIAL)</p><p><b>basedOn</b>: General Wellness Careplan</p><p><b>groupIdentifier</b>: G20170201-001 (OFFICIAL)</p><p><b>status</b>: in-progress</p><p><b>businessStatus</b>: waiting for specimen <span>(Details )</span></p><p><b>intent</b>: order</p><p><b>priority</b>: routine</p><p><b>code</b>: Lipid Panel <span>(Details )</span></p><p><b>description</b>: Create order for getting specimen, Set up inhouse testing,  generate order for any sendouts and submit with specimen</p><p><b>focus</b>: <a>Lipid Panel Request</a></p><p><b>for</b>: <a>Peter James Chalmers</a></p><p><b>encounter</b>: <a>Example In-Patient Encounter</a></p><p><b>executionPeriod</b>: 31/10/2016 8:25:05 AM --&gt; (ongoing)</p><p><b>authoredOn</b>: 31/10/2016 8:25:05 AM</p><p><b>lastModified</b>: 31/10/2016 9:45:05 AM</p><p><b>requester</b>: <a>Dr Adam Careful</a></p><p><b>performerType</b>: Performer <span>(Details : {http://terminology.hl7.org/CodeSystem/task-performer-type code 'performer' = 'performer', given as 'Performer'})</span></p><p><b>owner</b>: <a>Clinical Laboratory @ Acme Hospital</a></p><p><b>reasonCode</b>: The Task.reason should only be included if there is no Task.focus or if it differs from the reason indicated on the focus <span>(Details )</span></p><p><b>note</b>: This is an example to demonstrate using task for actioning a servicerequest and to illustrate how to populate many of the task elements - this is the parent task that will be broken into subtask to grab the specimen and a sendout lab test </p><p><b>relevantHistory</b>: Author's Signature. Generated Summary: id: signature; recorded: 31/10/2016 8:25:05 AM; </p><h3>Restrictions</h3><table><tr><td>-</td><td><b>Repetitions</b></td><td><b>Period</b></td></tr><tr><td>*</td><td>1</td><td>?? --&gt; 02/11/2016 9:45:05 AM</td></tr></table></div>",
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
        "valueString" : "100151"
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
