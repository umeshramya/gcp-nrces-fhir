const { PaymentReconciliation } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setpaymentReconciliation= async () => {
  const paymentReconciliation = new PaymentReconciliation();

  const body = paymentReconciliation.getFHIR(
    {
      "createdDate" : new Date().toISOString(),
      "detail" : [
        {
          "amount" : {"currency" : "INR", "value":3000},
          "date" : new Date().toISOString().substring(0,10),
          "payee" : {"identifier" : {"system" : "https://www.nicehms.com/payee", "value" : "JJH"}},
          "type" : {"text" : "Phramacy"}
        }
      ],
      "disposition" : "Testing",
      "text" : "<div>This is test</div>",
      "outcome" : "complete",
      "extension" : [{"url" : "https://nicehms.com", "valueContactPoint" : {"value" : "1234567", "system" : "Phone"}}],
      "formCode" : {"text" : "dont know"},
      "identifier" : [
        {
          "use": "official",
          "system": "http://example.com/identifiers",
          "value": "123456"
        }
      ],
      "paymentAmount" : {"currency" : "INR", "value" : 5000},
      "paymentDate" : new Date().toISOString().substring(0,10),
      "paymentIdentifier" : {"value" : "123456", "system" : "https://www.nicehms.com/payee"},
      "paymentIssuer" : {"identifier" : {"value" : "1234"}},
      "period" : {"end" : "2025-12-12", "start" : "2023-12-12"},
      "processNote" : [{"type" : "display"}],
      "status" : "active",

      "outcome" : "complete",

      
    }
);



  
  // console.log(JSON.stringify(body))
  // return
  const res = await gcpFhirCRUD.createFhirResource(body, "PaymentReconciliation")
  // .then(res=>res)
  // .catch(err=>console.log(JSON.stringify(err)))

  // console.log(res.data)



  const ret = paymentReconciliation.convertFhirToObject(res.data)

  return ret;
};

module.exports = { setpaymentReconciliation };
