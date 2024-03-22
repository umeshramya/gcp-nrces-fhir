const { Claim } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setClaim = async () => {
  const claim = new Claim();
  const body = claim.getFHIR({
    "billablePeriod" : {"start" : "2024-02-24", end : "2024-03-23"},
    "careteam" : [{"sequence" : 1,
  "provider" : {"reference" : `Organization/${resources.organization.id}`}}],
  "createdDate" : new Date().toISOString(),
  "diagnosis" : [
    {
      "sequence" :1,
      "diagnosisCodeableConcept" : {
        "text" : "Fever and Chills"
      },
      "type" : [
        {
          "text" : "Admission"
        }
      ],
    }
  ],
  "identifier" : [
    {
      "system" : "https://www.nocehms.com", "value" : "1"
    }
  ],
  "insurance" : [
    {
      "coverage" : {"reference" : `Coverage/${resources.coverage.id}`},
      "focal" : true,
      "sequence" : 1
    }
  ],
  "item" : [{
    "productOrService" : {
      "coding" : [{
        "code" : "E001",
        "display" : "addmission",
        "system" : "https://irdai.gov.in/package-code"
      }]
    },
    "sequence" : 1,
    "unitPrice" : {"currency" : "INR", "value" : 12000}
  }],
  "patientGcpId" : resources.patient.id,
  "payee" : {
    "party" :{
      "id" : resources.organization.id,
      "identifier" : {
        "system" : "http://abdm.gov.in/facilities",
        "value" : "INV123233"
      }
    }
  },
  "payorId" : resources.insuranceCompany.id,
  "priority" : {
    "text" : "normal"
  },
  "providerId" : resources.organization.id,
  "status" : "active",
  "text" : "Testing",
  "total" : {"currency" : "INR", "value" : 12000},
  "type" : {
    "text" : "Normal"
  },
  "use" : "claim"
  });


  

  
  const res = await gcpFhirCRUD.createFhirResource(body, "Claim", true);
  // console.log(res)
//   const ret = claim.convertFhirToObject(res.data);
// resources.claim = ret
  return res;
};


module.exports = { setClaim };

