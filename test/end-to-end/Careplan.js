const { CarePlan } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setCarePlan = async () => {
  const careplan = new CarePlan();

  const body = careplan.getFHIR({
    category: [{ text: "Discharge CheckList" }],
    basedOnCarePlanId: ["f219a193-d44c-4d07-ba5b-44fdfff5ce1a"],
    partOfCarePlanId: ["f219a193-d44c-4d07-ba5b-44fdfff5ce1a"],
    replacesCarePlanId: ["f219a193-d44c-4d07-ba5b-44fdfff5ce1a"],
    description: "This is check of discharge",
    goal: [{ resource: "Goal", id: "8656df85-3cf9-4339-b8e3-7464d07c1210" }],
    encounterId: resources.encounter.id,
    addresses: [
      { resource: "Condition", id: "605673f0-2fac-44fd-bd62-c67b17d23222" },
    ],
    "author" : {"resource" : "Practitioner" , "id" :"7610c5b8-4b08-425c-86ef-84433238044c"},
    "contributor" : [{"resource" : "Practitioner" , "id" :"7610c5b8-4b08-425c-86ef-84433238044c"}],
    inetent: "order",
    patientId: resources.patient.id,
    status: "active",
    text: "<div>hu</div>",
    title: "Discharge Check List",
    activity: [
      {
        outcomeCodeableConcept: [{ text: "Discprtion checklist" }],
        outcomeReference: [{ resource: "Patient", id: resources.patient.id }],
        detail: {
          kind: "Task",
          code: { text: "Done" },
          status: "in-progress",
        },
      },
    ],
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "CarePlan");
  console.log(res.data);

  //  const ret = careplan.convertFhirToObject(res.data);

  return ret;
};

module.exports = { setCarePlan };
