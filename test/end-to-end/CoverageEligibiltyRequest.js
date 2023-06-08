const console = require("console");
const { CoverageEligibilityRequest } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setCoverageEligibiltyRequest = async () => {
  const coverageEligilityRequest = new CoverageEligibilityRequest();
  const body = coverageEligilityRequest.getFHIR({
    coverageId: "272a3661-ad2f-4ad6-a239-63172f6c4c2c",
    createdDateTime: new Date().toISOString(),
    enterer: {
      display: resources.practioner.name,
      id: resources.practioner.id,
      resource: "Practitioner",
    },
    insurerOrganizationId: resources.organization.id,
    locationId: "23da242a-a44f-49c2-b302-da05ebad8325",
    patientId: resources.patient.id,
    priority: { text: "Elective" },
    provider: {
      display: resources.organization.name,
      id: resources.organization.id,
      resource: "Organization",
    },
    purpose: "discovery",
    status: "active",
    "identifier" : {
      type: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "MR",
            display: "Medical record number",
          },
        ],
      },
      system: "https://healthid.ndhm.gov.in/health-number",
      value: "123456",
    },
    // item: {
    //   category: {
    //     coding: [
    //       {
    //         code: "31291000087108",
    //         display: "Cardiac Care Unit",
    //         system: "http://snomed.info/sct",
    //       },
    //     ],
    //   },
    //   diagnosis:[ {
    //     "diagnosis" : {"text" : "IHD"},
    //     "diagnosisReference" : "Condition/83059893-22bb-4aa8-9463-45667489666a"},
    //   { "diagnosis" : "TY2 DM",
    //     "diagnosisReference" : "Condition/65afb77b-8be0-446d-a57e-66a373099e49"}
    // ],
    // },
    "text" : "send us coverage eleigiluty",

    
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "CoverageEligibilityRequest");
  const ret = coverageEligilityRequest.convertFhirToObject(res.data);
  console.log(ret);
  // resources.coverage = res.data;
  // return res;
};

module.exports = { setCoverageEligibiltyRequest };

