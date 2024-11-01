const {  AllergyIntolerance } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setAllergyIntorance= async () => {
  const allergyIntorance = new AllergyIntolerance();

 let obj = {
    clinicalStatus: 'active',
    verificationStatus: 'unconfirmed',
    code: { text: 'Pencillinn' },
    patientId: '9a620c2f-2bcb-4c87-b208-e2ded136572e',
    date: '2024-11-01T05:00:58.934Z',
    encounterId: 'b57d6917-20ce-4a27-adf0-fbcd08459d6d',
    
  }

  // obj ={
  //   "encounterId" : resources.encounter.id,
  //   "clinicalStatus" : "active",
  //   "text" : "Allergic pencilllin",
  //   "code" : {
  //     "text" : "Pencilllin"
  //   },
  //   "date" : new Date().toISOString(),
  //   "note" : [{
  //     "text" : "rash"
  //   }],
  //   "patientId" : resources.patient.id,
  //   "recorder" : {
  //     "id" : resources.patient.id,
  //     "resource" : "Patient"
  //   },
  //   "verificationStatus" : "unconfirmed",
  // }
  const body = allergyIntorance.getFHIR(obj);

  console.log(JSON.stringify(body))

  const res = await gcpFhirCRUD.createFhirResource(body, "AllergyIntolerance");
  const ret = allergyIntorance.convertFhirToObject(res.data);
  
  resources.allergyIntorance= res.data
  return ret;
  
};

module.exports = { setAllergyIntorance };
