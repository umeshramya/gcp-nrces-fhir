const console = require("console");
const { CoverageEligibilityRequestBundle } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setCoverageEligibiltyRequestBundle = async () => {
  const bundle = new CoverageEligibilityRequestBundle();

  const body = bundle.getFHIR({
    indentfier: undefined,
    dateTime: new Date().toISOString(),
    CoverageEligibilityRequest: resources.coverageEligilityRequest,
    coverage: resources.coverage,
    patient: resources.patient,
    practitioner: resources.practioner,
    organization: resources.organization,
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

module.exports = { setCoverageEligibiltyRequestBundle };
