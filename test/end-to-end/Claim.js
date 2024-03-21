const { Claim } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setClaim = async () => {
  const claim = new Claim();
  const body = claim.getFHIR({
    billablePeriod: { start: "2024-03-01", end: "2024-04-01" },
    careteam: [
      {
        sequence: 1,
        provider: { reference: `Organization/${resources.organization.id}` },
      },
    ],
    identifier: [
      { system: "https://abdm.gov.in/facilities", value: "umesh@abdm" },
    ],
    insurance: [
      {
        focal: true,
        sequence: 1,
        coverage: { reference: `Coverage/${resources.coverage.id}` },
      },
    ],
    item: [
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              code: "12344",
              display: "PTCA",
              system: "https://irdai.gov.in/package-code",
            },
          ],
        },
        unitPrice: { currency: "INR", value: 12000 },
      },
    ],
    "patientGcpId" : resources.patient.id,
    "payee" : {
        "party" : {
            "id" : resources.organization.id,
            "identifier":{system : "http://abdm.gov.in/facilities", "value" : "INV20900001"}
        },
        "type" : {
            "text" : "JJH"
        }
    },
    "payorId" : resources.organization.id,
    "priority" : {
        "text" : "Normal"
    },
    "providerId" : resources.organization.id,
    "procedure" :[{
        "sequence" : 1,
        "procedureCodeableConcept" : {
            "text" : "PTCA"
        }
    }],
    "total" : {"currency" : "INR", "value" : 12000}
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "Claim");
  console.log(res)
//   const ret = claim.convertFhirToObject(res.data);

//   resources.coverage = ret;
  return res;
};

module.exports = { setClaim };

// const body =   {

//   "resourceType": "Coverage",
//   "id": "dadde132-ad64-4d18-8c18-1d52d7e86abc",
//   "identifier": [
//     {
//       "system": "https://www.gicofIndia.in/policies",
//       "value": "policy-RVH1003"
//     }
//   ],
//   "status": "active",
//   "subscriber": {
//     "reference": `Patient/${resources.patient.id}`
//   },
//   "subscriberId": `SN-${resources.patient.id}`,
//   "beneficiary": {
//     "reference": `Patient/${resources.patient.id}`
//   },
//   "relationship": {
//     "coding": [
//       {
//         "system": "http://hl7.org/fhir/ValueSet/subscriber-relationship",
//         "code": "self"
//       }
//     ]
//   },
//   "payor": [
//     {
//       "reference": `Patient/${resources.patient.id}`
//     }
//   ]
// }
