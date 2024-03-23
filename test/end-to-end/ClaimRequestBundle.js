const console = require("console");
const {  Coverage, Patient, Practitioner, Organization, Condition, ClaimRequestBundle, Claim, } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setClaimRequestBundle = async () => {
  const bundle = new ClaimRequestBundle();
 

  const body = bundle.getFHIR({
    indentfier: {
      system: "https://www.tmh.in/bundle",
      value: "745c15ea-b82a-46b4-a5f0-8288ed242ad3",
    },
    dateTime: new Date().toISOString(),
    claim: new Claim().getFHIR(resources.claim),
    coverage: new Coverage().getFHIR(resources.coverage),
    patient: new Patient().getFHIR(resources.patient),
    organization: [new Organization().getFHIR(resources.organization), new Organization().getFHIR(resources.insuranceCompany)],
    "hcx" : "swasth"
  });

  // console.log(body.entry.forEach(element => {
  //   console.log(element)
  // }))

  console.log(body)

  const res = await gcpFhirCRUD.createFhirResource(body, "Bundle");

  return res;
  // const ret = coverageEligilityRequest.convertFhirToObject(res.data);
  // console.log(ret);
  // resources.coverage = res.data;
  // return res;
};

module.exports = { setClaimRequestBundle };



