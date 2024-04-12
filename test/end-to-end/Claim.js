const { Claim } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setClaim = async () => {
  const claim = new Claim();
  const body = claim.getFHIR({
    billablePeriod: { start: "2024-02-24", end: "2024-03-23" },
    careteam: [
      {
        sequence: 4,
        provider: { reference: `Organization/${resources.organization.id}` },
      },
    ],
    createdDate: new Date().toISOString(),
    diagnosis: [
      {
        sequence: 1,
        diagnosisCodeableConcept: {
          text: "Fever and Chills",
        },
        type: [
          {
            text: "Admission",
          },
        ],
      },
    ],
    identifier: [
      {
        system: "https://www.nocehms.com",
        value: "1",
      },
    ],
    insurance: [
      {
        coverage: { reference: `Coverage/${resources.coverage.id}` },
        focal: true,
        sequence: 1,
      },
    ],
    "payee" : {
      "party" : {
        "id" : "INV291000012",
        "identifier" : {
          "system" : "http://abdm.gov.in/facilities",
          "value" : "HFR-ID-FOR-TMH"
        }
      }, 
    "type" : {"coding" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/payeetype",
      "code" : "provider",
      "display" : "Provider"
    }],
    // "text" : "Any benefit payable will be paid to the provider (Assignment of Benefit)."
  
  }
},
    item: [
      {
        productOrService: {
          coding: [
            {
              code: "E001",
              display: "addmission",
              system: "https://irdai.gov.in/package-code",
            },
          ],
        },
        sequence: 1,
        unitPrice: { currency: "INR", value: 12000 },
        quantity: {"system" : "http://unitsofmeasure.org", "code": undefined, "unit" : "Total", value : 12000 },
        encounter : [{"reference" : `Encounter/${resources.encounter.id}`}]
      },
    ],
    patientGcpId: resources.patient.id,
    payorId: resources.insuranceCompany.id,
    priority:  {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/processpriority",
          code: "normal",
        },
      ],
    },
    providerId: resources.organization.id,
    status: "active",
    text: "Testing",
    total: { currency: "INR", value: 12000 },
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/claim-type",
          code: "institutional",
        },
      ],
    },
    use: "claim",
    hcx: "nhcx",
  });




  const res = await gcpFhirCRUD.createFhirResource(body, "Claim", true);

  const ret = claim.convertFhirToObject(res.data);
  resources.claim = ret;
  return ret;
};

module.exports = { setClaim };
