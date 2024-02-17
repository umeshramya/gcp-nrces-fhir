
const { CoverageEligibilityRequest } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setCoverageEligibiltyRequest = async () => {
  const coverageEligilityRequest = new CoverageEligibilityRequest();
  const body = coverageEligilityRequest.getFHIR({
    insurance: [
      {
        coverage: {
          reference: `Coverage/${resources.coverage.id}`,
        },
        focal: true,
        extension: [{ url: "https://nicehms.com/ex", valueString: "umesh" }],
      },
    ],
    createdDateTime: new Date().toISOString(),
    enterer: {
      display: resources.practioner.name,
      id: resources.practioner.id,
      resource: "Practitioner",
    },
    insurerOrganizationId: "5ee777fa-2ada-4797-a87a-806c68504402",
    locationId: "23da242a-a44f-49c2-b302-da05ebad8325",
    patientId: resources.patient.id,
    priority: { text: "Elective" },
    supportingInfo: [
      {
        "sequence": 1,
        information: {
          reference: "Condition/83059893-22bb-4aa8-9463-45667489666a",
        },
      },
    ],
    provider: {
      display: resources.organization.name,
      id: resources.organization.id,
      resource: "Organization",
    },
    purpose: ["validation"],
    status: "active",
    identifier: [
      {
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
    ],
    priority: {
      coding: [{ code: "normal" }],
    },
    servicedDate: new Date().toISOString().substring(0, 10),
    servicedPeriod: { start: new Date().toISOString() },
    item: [
      {
        category: {
          coding: [
            {
              code: "31291000087108",
              display: "Cardiac Care Unit",
              system: "http://snomed.info/sct",
            },
          ],
          text: "Cardiac Care Unit",
        },
        productOrService: { text: "ICCU Admission" },
        diagnosis: [
          { diagnosisCodeableConcept: { text: "IHD" } },
          {
            diagnosisReference: {
              reference: "Condition/83059893-22bb-4aa8-9463-45667489666a",
            },
          },

          { diagnosisCodeableConcept: { text: "Type 2 DM" } },
          {
            diagnosisReference: {
              reference: "Condition/65afb77b-8be0-446d-a57e-66a373099e49",
            },
          },

          { diagnosisCodeableConcept: { text: "Vomiting" } },
        ],
      },
    ],

    text: "send us coverage eleigiluty",
  });

  const res = await gcpFhirCRUD.createFhirResource(
    body,
    "CoverageEligibilityRequest"
  );
  const ret = coverageEligilityRequest.convertFhirToObject(res.data);

  resources.coverageEligilityRequest = ret;
  return ret;
};

module.exports = { setCoverageEligibiltyRequest };
