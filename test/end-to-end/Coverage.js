const { Coverage } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setCoverage = async () => {
  const coverage = new Coverage();
  const body = coverage.getFHIR({
    beneficiaryPatientId: resources.patient.id,
    status: "active",
    subscriber: { resource: "Patient", id: resources.patient.id },
    subscriberId: `SN-${resources.patient.id}`,
    identifier: [
      {
        system: "https://www.nicehms.com",
        value: "1",
      },
    ],
    payor: [{ resource: "Patient", id: resources.patient.id }],

    text: `<div>Cob</div>`,
    relationship: {
      coding: [
        {
          code: "self",
          system: "http://hl7.org/fhir/ValueSet/subscriber-relationship",
        },
      ],
    },
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "Coverage");
  console.log(res);
  // const ret = coverage.convertFhirToObject(res.data)
  // resources.procedure= res.data;
  // const ret = res.data
  // return res;
};

module.exports = { setCoverage };

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
