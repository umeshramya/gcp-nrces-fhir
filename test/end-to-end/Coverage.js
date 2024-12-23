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
    hcx: "nhcx",
    status: "active",
    subscriberId: `SN-Father-Id`,
    // subscriber: {
    //   id: resources.relatedPerson.id,
    //   resource: "RelatedPerson",
    //   display: resources.relatedPerson.name,
    // },
    relationship: {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
          code: "self",
        },
      ],
    },
    identifier: [
      {
        system: "https://www.gicofIndia.in/policies",
        value: "policy-RVH1003",
      },
    ],
    payor: [
      { 
      // resource: "Organization", id: resources.insuranceCompany.id,
      "identifier" : {
        "system" : "NHCX",
        "value" : "1000003547@hcx"
      }
     }],

    text: `<div>Cob</div>`,
  });

  const res = await gcpFhirCRUD.createFhirResource(body, "Coverage");
  const ret = coverage.convertFhirToObject(res.data);

  resources.coverage = ret;
  return res;
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
