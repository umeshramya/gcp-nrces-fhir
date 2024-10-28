const {  AllergyIntolerance } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setAllergyIntorance= async () => {
  const allergyIntorance = new AllergyIntolerance();
  const body = allergyIntorance.getFHIR({
    "encounterId" : resources.encounter.id,
    "clinicalStatus" : "active",
    "text" : "Allergic pencilllin",
    "code" : {
      "text" : "Pencilllin"
    },
    "date" : new Date().toISOString(),
    "note" : [{
      "text" : "rash"
    }],
    "patientId" : resources.patient.id,
    "recorder" : {
      "id" : resources.patient.id,
      "resource" : "Patient"
    },
    "verificationStatus" : "unconfirmed",
  });

  console.log(JSON.stringify(body))

  const res = await gcpFhirCRUD.createFhirResource(body, "AllergyIntolerance");
  const ret = allergyIntorance.convertFhirToObject(res.data);
  
  resources.allergyIntorance= res.data
  return ret;
  
};

module.exports = { setAllergyIntorance };
