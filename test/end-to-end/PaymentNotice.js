const { PaymentNoctice } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setPaymentNotice = async () => {
  const paymentNotice = new PaymentNoctice();

  const body = paymentNotice.getFHIR({
    amount: { currency: "INR", value: 5000 },
    createdDate: new Date().toISOString(),
    extension: [
      {
        url: "https://www.nicehms.com/test",
        valueAddress: { district: "Dharawad", state: "Karnataka" },
      },
    ],
    modifierExtension: [
      {
        url: "https://www.nicehms.com/test",
         "valueBoolean" : true ,
      },
    ],
    identifier: [{
      "system": "https://www.nicehms.com/payment-notices",
      "value": "1"
    }],
    implicitRules: "https://wwww.nicehms.com",
    payee: { identifier: { value: "2324" } },
    payment: { identifier: {
      "system": "https://www.nicehms.com/payment-notices",
      "value": "1"
    } },
    paymentDate: "2024-10-12",
    paymentStatus:  {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/paymentstatus",
          "code": "paid",
          "display": "Paid"
        }
      ],
      "text": "paid"
    },
    recipient: { resource: "Organization", id: resources.organization.id },
    request: { identifier: { value: "JJH" } },
    resourceType: "PaymentNotice",
    response: { identifier: {
      "system": "https://www.nicehms.com/payment-notices",
      "value": "1"
    } },
    status: "active",
    text: "<div>This test payment notice </div>",
  });



  
  // console.log(JSON.stringify(body))
  // return
  const res = await gcpFhirCRUD.createFhirResource(body, "PaymentNotice");
  // console.log(res.data);

  const ret = paymentNotice.convertFhirToObject(res.data);

  return ret;
};

module.exports = { setPaymentNotice };
