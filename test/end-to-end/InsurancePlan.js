const { InsurancePlan } = require("gcp-nrces-fhir");

require("dotenv").config("env");
const v4 = require("uuid").v4;

const { GcpFhirCRUD } = require("gcp-nrces-fhir");

const { resources } = require("./index");

const gcpFhirCRUD = new GcpFhirCRUD();

const setInsurancePlan = async () => {
  const insurancePlan = new InsurancePlan();

  // const body = insurancePlan.getFHIR({
  //   amount: { currency: "INR", value: 5000 },
  //   createdDate: new Date().toISOString(),
  //   extension: [
  //     {
  //       url: "https://www.nicehms.com/test",
  //       valueAddress: { district: "Dharawad", state: "Karnataka" },
  //     },
  //   ],
  //   modifierExtension: [
  //     {
  //       url: "https://www.nicehms.com/test",
  //        "valueBoolean" : true ,
  //     },
  //   ],
  //   identifier: [{
  //     "system": "https://www.nicehms.com/payment-notices",
  //     "value": "1"
  //   }],
  //   implicitRules: "https://wwww.nicehms.com",
  //   payee: { identifier: { value: "2324" } },
  //   payment: { identifier: {
  //     "system": "https://www.nicehms.com/payment-notices",
  //     "value": "1"
  //   } },
  //   paymentDate: "2024-10-12",
  //   paymentStatus:  {
  //     "coding": [
  //       {
  //         "system": "http://terminology.hl7.org/CodeSystem/paymentstatus",
  //         "code": "paid",
  //         "display": "Paid"
  //       }
  //     ],
  //     "text": "paid"
  //   },
  //   recipient: { resource: "Organization", id: resources.organization.id },
  //   request: { identifier: { value: "JJH" } },
  //   resourceType: "PaymentNotice",
  //   response: { identifier: {
  //     "system": "https://www.nicehms.com/payment-notices",
  //     "value": "1"
  //   } },
  //   status: "active",
  //   text: "<div>This test payment notice </div>",
  // });

  // console.log(JSON.stringify(body))
  // return

  const body = {
    resourceType: "InsurancePlan",
    meta: {
      tag: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v3-ObservationValue",
          code: "SUBSETTED",
          display: "Resource encoded in summary mode",
        },
      ],
    },
    extension: [
      {
        id: "NHCXProofOfIdentification",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
        extension: [
          {
            url: "category",
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                  code: "POI",
                  display: "Proof of Identity Number",
                },
              ],
            },
          },
          {
            url: "code",
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                  code: "ADN",
                  display: "Aadhaar Number",
                },
              ],
            },
          },
        ],
      },
      {
        id: "NHCXProofOfPresence",
        url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
        extension: [
          {
            url: "category",
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                  code: "POA",
                  display: "Proof of Address",
                },
              ],
            },
          },
          {
            url: "code",
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                  code: "ADN",
                  display: "Aadhaar Number",
                },
              ],
            },
          },
        ],
      },
    ],
    identifier: [
      {
        system: "https://hcx.pmjay.gov.in/v1/InsurancePlan",
        value: "100151-32722",
      },
    ],
    status: "active",
    type: [
      {
        coding: [
          {
            system:
              "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-insuranceplan-type",
            code: "07",
            display: "Universal Health Policy",
          },
        ],
      },
    ],
    name: "PMJAY - Universal Health Policy",
    period: {
      start: "2022-04-01T00:00:00+05:30",
      end: "2023-03-31T00:00:00+05:30",
    },
    ownedBy: insurancePlan.convertReferenceToUrl({ reference: "Organization/1000001", display: "SHA-Haryana" }),
    administeredBy: insurancePlan.convertReferenceToUrl({
      reference: "Organization/1000001",
      display: "SHA-Haryana",
    }),
    coverageArea: [insurancePlan.convertReferenceToUrl({ reference: "Location/1000001" })],
    coverage: [
      {
        extension: [
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0433",
                      display: "Blood Group",
                    },
                  ],
                },
              },
            ],
          },
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0339",
                      display: "Clinical notes with planned line of treatment",
                    },
                  ],
                },
              },
            ],
          },
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0432",
                      display: "Complete Hemogram",
                    },
                  ],
                },
              },
            ],
          },
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0434",
                      display: "Planned line of treatment",
                    },
                  ],
                },
              },
            ],
          },
        ],
        type: {
          coding: [
            {
              system:
                "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-benefitcategory",
              code: "MG",
              display: "General Medicine",
            },
          ],
        },
        benefit: [
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG062A",
                  display:
                    "Accelerated hypertension(MG062A-Accelerated hypertension)(MG062A-HBP1)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG062A",
                  display:
                    "Accelerated hypertension(MG062A-Accelerated hypertension)(MG062A-HBP1)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP021A",
                  display: "Acute abdomen(MP021A-Acute abdomen)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP021A",
                  display: "Acute abdomen(MP021A-Acute abdomen)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG039A",
                  display: "Acute asthmatic attack(MG039A-Asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG039A",
                  display: "Acute asthmatic attack(MG039A-Asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG028A",
                  display: "Acute bronchitis(MG028A-Acute bronchitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG028A",
                  display: "Acute bronchitis(MG028A-Acute bronchitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP014A",
                  display:
                    "Acute demyelinating myelopathy(MP014A-Acute demyelinating myelopathy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP004A",
                  display:
                    "Acute encephalitis syndrome(MP004A-Acute encephalitis syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP004A",
                  display:
                    "Acute encephalitis syndrome(MP004A-Acute encephalitis syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG029A",
                  display:
                    "Acute excaberation of COPD(MG029A-Acute excaberation of COPD)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG029A",
                  display:
                    "Acute excaberation of COPD(MG029A-Acute excaberation of COPD)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG030A",
                  display:
                    "Acute excaberation of Interstitial Lung Disease(MG030A-Acute excaberation of Interstitial Lung Disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG030A",
                  display:
                    "Acute excaberation of Interstitial Lung Disease(MG030A-Acute excaberation of Interstitial Lung Disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG001A",
                  display:
                    "Acute febrile illness(MG001A-Acute febrile illness)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG001A",
                  display:
                    "Acute febrile illness(MG001A-Acute febrile illness)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG009A",
                  display:
                    "Acute gastroenteritis with moderate dehydration(MG009A-Acute gastroenteritis with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG009A",
                  display:
                    "Acute gastroenteritis with moderate dehydration(MG009A-Acute gastroenteritis with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG009B",
                  display:
                    "Acute gastroenteritis with severe dehydration(MG009B-Acute gastroenteritis with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG009B",
                  display:
                    "Acute gastroenteritis with severe dehydration(MG009B-Acute gastroenteritis with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP025A",
                  display:
                    "Acute glomerulonephritis(MP025A-Acute glomerulonephritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP025A",
                  display:
                    "Acute glomerulonephritis(MP025A-Acute glomerulonephritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072C",
                  display: "Acute Haemodialysis(MG072C-Acute Haemodialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072C",
                      display:
                        "Acute Haemodialysis(MG072C-Acute Haemodialysis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072C",
                  display: "Acute Haemodialysis(MG072C-Acute Haemodialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072C",
                      display:
                        "Acute Haemodialysis(MG072C-Acute Haemodialysis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049D",
                  display:
                    "Acute heamorrhagic stroke(MG049D-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049D",
                  display:
                    "Acute heamorrhagic stroke(MG049D-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG091B",
                  display:
                    "Acute hemorrhagic stroke- Extra ventricular drainage(MG091B-Acute hemorrhagic stroke- Extra ventricular drainage)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG091A",
                  display:
                    "Acute hemorrhagic stroke- Hematoma evacuation(MG091A-Acute hemorrhagic stroke- Hematoma evacuation)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG086A",
                  display:
                    "Acute Ischemic Stoke (MG086A-Acute Ischemic Stoke )",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049C",
                  display:
                    "Acute ischemic stroke(MG049C-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049C",
                  display:
                    "Acute ischemic stroke(MG049C-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP017A",
                  display:
                    "Acute ischemic stroke(MP017A-Acute ischemic stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG086B",
                  display:
                    "Acute ischemic stroke- intravenous thrombolysis -Recombinant tissue plasminogen activator(MG086B-Acute ischemic stroke- intravenous thrombolysis -Recombinant tissue plasminogen activator)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG086C",
                  display:
                    "Acute ischemic stroke- Intravenous thrombolysis-Tenecteplase(MG086C-Acute ischemic stroke- Intravenous thrombolysis-Tenecteplase)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0110A",
                  display: "Acute liver failure(MG0110A-Acute liver failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0108A",
                  display:
                    "Acute liver failure/Fulminant Hepatitis (MG0108A-Acute liver failure/Fulminant Hepatitis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 50000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0108A",
                      display:
                        "Acute liver failure/Fulminant Hepatitis (MG0108A-Acute liver failure/Fulminant Hepatitis )",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006E",
                  display: "Acute meningitis(MP006E-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006E",
                  display: "Acute meningitis(MP006E-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005A",
                  display:
                    "Acute meningo encephalitis(MP005A-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005A",
                  display:
                    "Acute meningo encephalitis(MP005A-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0104A",
                  display:
                    "Acute necrotizing severe pancreatitis(MG0104A-Acute necrotizing severe pancreatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP013A",
                  display:
                    "Acute neuroregression / Acute worsening in neuro metabolic and neurodegenerative conditions(MP013A-Acute neuroregression / Acute worsening in neuro metabolic and neurodegenerative conditions)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG071A",
                  display: "Acute organophosphorus poisoning(MG071A-Poisoning)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG071A",
                  display: "Acute organophosphorus poisoning(MG071A-Poisoning)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG033A",
                  display: "Acute pancreatitis(MG033A-Pancreatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG033A",
                  display: "Acute pancreatitis(MG033A-Pancreatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0101A",
                  display:
                    "Acute severe ulcerative colitis(MG0101A-Acute severe ulcerative colitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049B",
                  display:
                    "Acute stroke(MG049B-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG035A",
                  display:
                    "Acute transverse myelitis(MG035A-Acute transverse myelitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG035A",
                  display:
                    "Acute transverse myelitis(MG035A-Acute transverse myelitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG090C",
                  display:
                    "Acute transverse myelitis/ Acute demyelinating encephalitis(MG090C-Acute transverse myelitis/ Acute demyelinating encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP020A",
                  display:
                    "Acute urticaria(MP020A-Acute urticaria / Anaphylaxis acute asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP020A",
                  display:
                    "Acute urticaria(MP020A-Acute urticaria / Anaphylaxis acute asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG012A",
                  display:
                    "Acute viral hepatitis(MG012A-Acute viral hepatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG012A",
                  display:
                    "Acute viral hepatitis(MG012A-Acute viral hepatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG043A",
                  display: "Addison’s disease (MG043A-Addison’s disease )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG043A",
                  display: "Addison’s disease (MG043A-Addison’s disease )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP008A",
                  display:
                    "After Decompressive craniotomy / After Shunt procedure / After other emergency neuro surgical procedures / For ICP monitoring(MP008A-Medical Management for Raised intracranial pressure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP008A",
                  display:
                    "After Decompressive craniotomy / After Shunt procedure / After other emergency neuro surgical procedures / For ICP monitoring(MP008A-Medical Management for Raised intracranial pressure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG045A",
                  display: "AKI / Renal failure(MG045A-AKI / Renal failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG045A",
                  display: "AKI / Renal failure(MG045A-AKI / Renal failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG078A",
                  display:
                    "Alcoholic Liver Disease(MG078A-Alcoholic Liver Disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG066A",
                  display: "Anaphylaxis (MG066A-Anaphylaxis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG066A",
                  display: "Anaphylaxis (MG066A-Anaphylaxis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP020B",
                  display:
                    "Anaphylaxis acute asthma(MP020B-Acute urticaria / Anaphylaxis acute asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP020B",
                  display:
                    "Anaphylaxis acute asthma(MP020B-Acute urticaria / Anaphylaxis acute asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG081A",
                  display: "Arrhythmia(MG081A-Arrhythmia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG034A",
                  display: "Ascites(MG034A-Ascites)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG034A",
                  display: "Ascites(MG034A-Ascites)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM016A",
                  display:
                    "Ascitis tapping with long term indwelling catheter(PM016A-Malignant Ascites drainage with long term catheter insertion in advanced cancer patients)",
                },
              ],
            },
            limit: [
              {
                value: { value: 44000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "PM016A",
                      display:
                        "Ascitis tapping with long term indwelling catheter(PM016A-Malignant Ascites drainage with long term catheter insertion in advanced cancer patients)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005B",
                  display:
                    "Aseptic meningitis(MP005B-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005B",
                  display:
                    "Aseptic meningitis(MP005B-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG036A",
                  display: "Atrial Fibrillation (MG036A-Atrial Fibrillation )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG036A",
                  display: "Atrial Fibrillation (MG036A-Atrial Fibrillation )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG090B",
                  display:
                    "Autoimmune encephalitis - Immunoglubulin (IVIG)(MG090B-Autoimmune encephalitis - Immunoglubulin (IVIG))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG090A",
                  display:
                    "Autoimmune encephalitis - Plasmapheresis(MG090A-Autoimmune encephalitis - Plasmapheresis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG031A",
                  display: "Bacterial Endocarditis(MG031A-Endocarditis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG031A",
                  display: "Bacterial Endocarditis(MG031A-Endocarditis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "4" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG074B",
                  display:
                    "Blood component including platelet transfusion (RDP, PC, SDP)(MG074B-Blood transfusion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG074B",
                      display:
                        "Blood component including platelet transfusion (RDP, PC, SDP)(MG074B-Blood transfusion)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "Y" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "4" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG074B",
                  display:
                    "Blood component including platelet transfusion (RDP, PC, SDP)(MG074B-Blood transfusion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG074B",
                      display:
                        "Blood component including platelet transfusion (RDP, PC, SDP)(MG074B-Blood transfusion)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG082A",
                  display:
                    "Bone marrow aspiration of biopsy(MG082A-Bone marrow aspiration of biopsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1200, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG082A",
                      display:
                        "Bone marrow aspiration of biopsy(MG082A-Bone marrow aspiration of biopsy)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005G",
                  display:
                    "Brain abcess(MP005G-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005G",
                  display:
                    "Brain abcess(MP005G-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG027A",
                  display: "Bronchiectasis(MG027A-Bronchiectasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG027A",
                  display: "Bronchiectasis(MG027A-Bronchiectasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG096B",
                  display: "Bronchoscopy(MG096B-Bronchoscopy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 8500, unit: "INR" },
                code: { coding: [{ code: "STRAT444b", display: "HDU" }] },
              },
              {
                value: { value: 2400, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT444a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG081B",
                  display: "CAD(MG081B-CAD)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM012A",
                  display:
                    "Cancer Pain Management(PM012A-Palliative Care Management of Pain for treating Pain crisis, analgesic titration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG037A",
                  display: "Cardiac Tamponade (MG037A-Cardiac Tamponade )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG037A",
                  display: "Cardiac Tamponade (MG037A-Cardiac Tamponade )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP022A",
                  display: "Celiac disease(MP022A-Celiac disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP022A",
                  display: "Celiac disease(MP022A-Celiac disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP012A",
                  display: "Cerebral herniation(MP012A-Cerebral herniation)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG049A",
                  display:
                    "Cerebral sino-venous thrombosis(MG049A-Cerebral sino-venous thrombosis / Stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG048A",
                  display:
                    "Cerebrovascular accident(MG048A-Cerebrovascular accident)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG005A",
                  display: "Chikungunya fever(MG005A-Chikungunya fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG005A",
                  display: "Chikungunya fever(MG005A-Chikungunya fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG095A",
                  display: "Cholangitis(MG095A-Cholangitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG010A",
                  display: "Chronic diarrohea(MG010A-Diarrohea)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG010A",
                  display: "Chronic diarrohea(MG010A-Diarrohea)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072D",
                  display:
                    "Chronic Haemodialysis(MG072D-Haemodialysis / Peritoneal Dialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072D",
                      display:
                        "Chronic Haemodialysis(MG072D-Haemodialysis / Peritoneal Dialysis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072D",
                  display:
                    "Chronic Haemodialysis(MG072D-Haemodialysis / Peritoneal Dialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072D",
                      display:
                        "Chronic Haemodialysis(MG072D-Haemodialysis / Peritoneal Dialysis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG013A",
                  display: "Chronic Hepatitis (MG013A-Chronic Hepatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG013A",
                  display: "Chronic Hepatitis (MG013A-Chronic Hepatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006A",
                  display: "Chronic meningitis(MP006A-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006A",
                  display: "Chronic meningitis(MP006A-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG033B",
                  display: "Chronic pancreatitis(MG033B-Pancreatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG033B",
                  display: "Chronic pancreatitis(MG033B-Pancreatitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0100A",
                  display:
                    "Chronic PD catheter Insertion(MG0100A-Chronic PD catheter Insertion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 4100, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0100A",
                      display:
                        "Chronic PD catheter Insertion(MG0100A-Chronic PD catheter Insertion)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006D",
                  display:
                    "Complicated bacterial meningitis(MP006D-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006D",
                  display:
                    "Complicated bacterial meningitis(MP006D-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG003B",
                  display: "Complicated malaria(MG003B-Malaria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG003B",
                  display: "Complicated malaria(MG003B-Malaria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM015A",
                  display:
                    "Complications in palliative care patients(PM015A-Conservative management of post procedural or treatment related complications in palliative medicine including electrolyte disorders (including hypercalcemia and ketoacidosis))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120B",
                  display:
                    "Comprehensive medical rehabilitation for of complication secondary to specified disanility/multiple disability including procedures; chemodenevaration with or with out orthosis(MG0120B-Comprehensive medical rehabilitation for of complication secondary to specified disanility/multiple disability including procedures; chemodenevaration with or with out orthosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 35000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120B",
                      display:
                        "Comprehensive medical rehabilitation for of complication secondary to specified disanility/multiple disability including procedures; chemodenevaration with or with out orthosis(MG0120B-Comprehensive medical rehabilitation for of complication secondary to specified disanility/multiple disability including procedures; chemodenevaration with or with out orthosis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120A",
                  display:
                    "Comprehensive medical rehabilitation for spinal injury/ traumatic brain injury  CVA;  Cerebral palsy with or without orthosis(MG0120A-Comprehensive medical rehabilitation for spinal injury/ traumatic brain injury  CVA;  Cerebral palsy with or without orthosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 25000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120A",
                      display:
                        "Comprehensive medical rehabilitation for spinal injury/ traumatic brain injury  CVA;  Cerebral palsy with or without orthosis(MG0120A-Comprehensive medical rehabilitation for spinal injury/ traumatic brain injury  CVA;  Cerebral palsy with or without orthosis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG038A",
                  display:
                    "Congestive heart failure(MG038A-Congestive heart failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG038A",
                  display:
                    "Congestive heart failure(MG038A-Congestive heart failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG077A",
                  display:
                    "CRRTCVVHDF initiation cost for disposable(MG077A-Initiation cost for disposable)",
                },
              ],
            },
            limit: [
              {
                value: { value: 33000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG077A",
                      display:
                        "CRRTCVVHDF initiation cost for disposable(MG077A-Initiation cost for disposable)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP040A",
                  display: "Cyanotic spells(MP040A-Cyanotic spells)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP040A",
                  display: "Cyanotic spells(MP040A-Cyanotic spells)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004A",
                  display: "Dengue fever(MG004A-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004A",
                  display: "Dengue fever(MG004A-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004B",
                  display: "Dengue hemorrhagic fever(MG004B-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004B",
                  display: "Dengue hemorrhagic fever(MG004B-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004C",
                  display: "Dengue shock syndrome(MG004C-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG004C",
                  display: "Dengue shock syndrome(MG004C-Dengue fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG058A",
                  display: "Diabetic Foot (MG058A-Diabetic Foot)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG058A",
                  display: "Diabetic Foot (MG058A-Diabetic Foot)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG059A",
                  display:
                    "Diabetic ketoacidosis(MG059A-Diabetic ketoacidosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG059A",
                  display:
                    "Diabetic ketoacidosis(MG059A-Diabetic ketoacidosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0106A",
                  display:
                    "Diffuse alveolar Hemorrhage Associated with SLE/Vasculitis/GP Syndrome(MG0106A-Diffuse alveolar Hemorrhage Associated with SLE/Vasculitis/GP Syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 136000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0106A",
                      display:
                        "Diffuse alveolar Hemorrhage Associated with SLE/Vasculitis/GP Syndrome(MG0106A-Diffuse alveolar Hemorrhage Associated with SLE/Vasculitis/GP Syndrome)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0119A",
                  display:
                    "Drug resistant epilepsy(MG0119A-Drug resistant epilepsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040C",
                  display:
                    "Due to any cause (pneumonia, asthma, COPD, ARDS, foreign body, poisoning, head injury etc.)(MG040C-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040C",
                  display:
                    "Due to any cause (pneumonia, asthma, COPD, ARDS, foreign body, poisoning, head injury etc.)(MG040C-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG085A",
                  display:
                    "DVT Pneumatic Compression Stockings (Add on package in ICU)(MG085A-DVT Pneumatic Compression Stockings (Add on package in ICU))",
                },
              ],
            },
            limit: [
              {
                value: { value: 900, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG085A",
                      display:
                        "DVT Pneumatic Compression Stockings (Add on package in ICU)(MG085A-DVT Pneumatic Compression Stockings (Add on package in ICU))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG011A",
                  display: "Dysentery(MG011A-Dysentery)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG011A",
                  display: "Dysentery(MG011A-Dysentery)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG018A",
                  display: "Empyema(MG018A-Empyema)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG018A",
                  display: "Empyema(MG018A-Empyema)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG097A",
                  display:
                    "Endobronchial Ultrasound guided fine needle biopsy(MG097A-Endobronchial Ultrasound guided fine needle biopsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 15700, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG097A",
                      display:
                        "Endobronchial Ultrasound guided fine needle biopsy(MG097A-Endobronchial Ultrasound guided fine needle biopsy)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG006A",
                  display: "Enteric fever(MG006A-Enteric fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG006A",
                  display: "Enteric fever(MG006A-Enteric fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP001D",
                  display: "Epilepsy(MP001D-Febrile seizures / other seizures)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP001D",
                  display: "Epilepsy(MP001D-Febrile seizures / other seizures)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP002A",
                  display:
                    "Epileptic encephalopathy(MP002A-Epileptic encephalopathy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP002A",
                  display:
                    "Epileptic encephalopathy(MP002A-Epileptic encephalopathy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0118A",
                  display:
                    "Evaluation of drug resistant epilepsy-Phase-1(MG0118A-Evaluation of drug resistant epilepsy-Phase-1)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005C",
                  display:
                    "Febrile encephalopathy(MP005C-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005C",
                  display:
                    "Febrile encephalopathy(MP005C-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG031B",
                  display: "Fungal Endocarditis(MG031B-Endocarditis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG031B",
                  display: "Fungal Endocarditis(MG031B-Endocarditis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG089A",
                  display: "Fungal Meningitis(MG089A-Fungal Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG054A",
                  display: "Gout (MG054A-Gout )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG054A",
                  display: "Gout (MG054A-Gout )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0116A",
                  display:
                    "Guillain Barre syndrome (Plasmapheresis)(MG0116A-Guillain Barre syndrome (Plasmapheresis))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG069A",
                  display:
                    "Guillian Barre Syndrome(MG069A-Guillian Barre Syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT026a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG069A",
                  display:
                    "Guillian Barre Syndrome(MG069A-Guillian Barre Syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT026a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP027A",
                  display:
                    "Haemolytic uremic syndrome(MP027A-Haemolytic uremic syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP027A",
                  display:
                    "Haemolytic uremic syndrome(MP027A-Haemolytic uremic syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG067A",
                  display: "Heat stroke(MG067A-Heat stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG067A",
                  display: "Heat stroke(MG067A-Heat stroke)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005F",
                  display:
                    "Hepatic encephalopathy(MP005F-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM014A",
                  display:
                    "Hiccups in Palliative care(PM014A-Palliative Care Package for Hiccups)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG076A",
                  display:
                    "High end histopathology (Biopsies) and advanced serology investigations(MG076A-High end histopathology (Biopsies) and advanced serology investigations)",
                },
              ],
            },
            limit: [
              {
                value: { value: 5000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG076A",
                      display:
                        "High end histopathology (Biopsies) and advanced serology investigations(MG076A-High end histopathology (Biopsies) and advanced serology investigations)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG076A",
                  display:
                    "High end histopathology (Biopsies) and advanced serology investigations(MG076A-High end histopathology (Biopsies) and advanced serology investigations)",
                },
              ],
            },
            limit: [
              {
                value: { value: 5000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG076A",
                      display:
                        "High end histopathology (Biopsies) and advanced serology investigations(MG076A-High end histopathology (Biopsies) and advanced serology investigations)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG075A",
                  display:
                    "High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging)(MG075A-High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging))",
                },
              ],
            },
            limit: [
              {
                value: { value: 5000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG075A",
                      display:
                        "High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging)(MG075A-High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG075A",
                  display:
                    "High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging)(MG075A-High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging))",
                },
              ],
            },
            limit: [
              {
                value: { value: 5000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG075A",
                      display:
                        "High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging)(MG075A-High end radiological diagnostic  (CT, MRI, Imaging including nuclear imaging))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG007A",
                  display:
                    "HIV with complications(MG007A-HIV with complications)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG007A",
                  display:
                    "HIV with complications(MG007A-HIV with complications)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0112A",
                  display: "Hyberbilirubinemia(MG0112A-Hyberbilirubinemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG051A",
                  display: "Hydrocephalus(MG051A-Hydrocephalus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG051A",
                  display: "Hydrocephalus(MG051A-Hydrocephalus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060A",
                  display: "Hypercalcemia (MG060A-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060A",
                  display: "Hypercalcemia (MG060A-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060E",
                  display: "Hyperkalaemia(MG060E-Hyperkalaemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060D",
                  display: "Hypernatremia (MG060D-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060D",
                  display: "Hypernatremia (MG060D-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG061A",
                  display:
                    "Hyperosmolar Non-Ketotic coma(MG061A-Hyperosmolar Non-Ketotic coma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG061A",
                  display:
                    "Hyperosmolar Non-Ketotic coma(MG061A-Hyperosmolar Non-Ketotic coma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG063A",
                  display:
                    "Hypertensive emergencies(MG063A-Hypertensive emergencies)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG063A",
                  display:
                    "Hypertensive emergencies(MG063A-Hypertensive emergencies)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005D",
                  display:
                    "Hypertensive encehalopathy(MP005D-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005D",
                  display:
                    "Hypertensive encehalopathy(MP005D-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060B",
                  display: "Hypocalcemia (MG060B-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060B",
                  display: "Hypocalcemia (MG060B-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG057A",
                  display: "Hypoglycemia(MG057A-Hypoglycemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG057A",
                  display: "Hypoglycemia(MG057A-Hypoglycemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060F",
                  display: "Hypokalaemia(MG060F-Hypokalaemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060C",
                  display: "Hyponatremia(MG060C-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG060C",
                  display: "Hyponatremia(MG060C-Electrolyte Imbalance)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP042A",
                  display:
                    "Idiopathic Thrombocytopenic Purpura(MP042A-Idiopathic Thrombocytopenic Purpura)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP042A",
                  display:
                    "Idiopathic Thrombocytopenic Purpura(MP042A-Idiopathic Thrombocytopenic Purpura)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG050A",
                  display:
                    "Immune mediated CNS disorders(MG050A-Immune mediated CNS disorders)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG050A",
                  display:
                    "Immune mediated CNS disorders(MG050A-Immune mediated CNS disorders)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP003B",
                  display:
                    "Immune-mediated - uncomplicated(MP003B-Acute encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP003B",
                  display:
                    "Immune-mediated - uncomplicated(MP003B-Acute encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP024A",
                  display:
                    "Infantile cholestasis(MP024A-Infantile cholestasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP024A",
                  display:
                    "Infantile cholestasis(MP024A-Infantile cholestasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP003A",
                  display:
                    "Infectious -  uncomplicated(MP003A-Acute encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP003A",
                  display:
                    "Infectious -  uncomplicated(MP003A-Acute encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0115A",
                  display:
                    "Inflammatory Myopathy/ Myaesthenic Crisis (MG0115A-Inflammatory Myopathy/ Myaesthenic Crisis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG096A",
                  display: "Intercostal drainage(MG096A-Intercostal drainage)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0103A",
                  display:
                    "Intestinal obstruction(MG0103A-Intestinal obstruction)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP011A",
                  display:
                    "Intracranial ring enhancing lesion with complication (tuberculoma)(MP011A-Intracranial ring enhancing lesion with complication (tuberculoma))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP011A",
                  display:
                    "Intracranial ring enhancing lesion with complication (tuberculoma)(MP011A-Intracranial ring enhancing lesion with complication (tuberculoma))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP010A",
                  display:
                    "Intracranial space occupying lesion(MP010A-Intracranial space occupying lesion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP010A",
                  display:
                    "Intracranial space occupying lesion(MP010A-Intracranial space occupying lesion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG084A",
                  display: "Joint Aspiration(MG084A-Joint Aspiration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 200, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG084A",
                      display: "Joint Aspiration(MG084A-Joint Aspiration)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP015A",
                  display: "Juvenile myasthenia(MP015A-Juvenile myasthenia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP015A",
                  display: "Juvenile myasthenia(MP015A-Juvenile myasthenia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP043A",
                  display: "Kawasaki Disease(MP043A-Kawasaki Disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP043A",
                  display: "Kawasaki Disease(MP043A-Kawasaki Disease)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP046A",
                  display:
                    "Ketogenic diet initiation in refractory epilepsy(MP046A-Ketogenic diet initiation in refractory epilepsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP046A",
                  display:
                    "Ketogenic diet initiation in refractory epilepsy(MP046A-Ketogenic diet initiation in refractory epilepsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG008A",
                  display: "Leptospirosis(MG008A-Leptospirosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG008A",
                  display: "Leptospirosis(MG008A-Leptospirosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG014A",
                  display: "Liver abscess(MG014A-Liver abscess)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG014A",
                  display: "Liver abscess(MG014A-Liver abscess)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG042A",
                  display: "Lower GI hemorrhage(MG042A-Lower GI hemorrhage)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG042A",
                  display: "Lower GI hemorrhage(MG042A-Lower GI hemorrhage)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG083A",
                  display: "Lumbar puncture(MG083A-Lumbar puncture)",
                },
              ],
            },
            limit: [
              {
                value: { value: 100, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG083A",
                      display: "Lumbar puncture(MG083A-Lumbar puncture)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG019A",
                  display: "Lung abscess(MG019A-Lung abscess)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG019A",
                  display: "Lung abscess(MG019A-Lung abscess)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG003A",
                  display: "Malaria(MG003A-Malaria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG003A",
                  display: "Malaria(MG003A-Malaria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120F",
                  display:
                    "Medical Rehabilitation  special learning  disability(MG0120F-Medical Rehabilitation  special learning  disability)",
                },
              ],
            },
            limit: [
              {
                value: { value: 7000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120F",
                      display:
                        "Medical Rehabilitation  special learning  disability(MG0120F-Medical Rehabilitation  special learning  disability)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120E",
                  display:
                    "Medical Rehabilitation intellectual dissability(MG0120E-Medical Rehabilitation intellectual dissability)",
                },
              ],
            },
            limit: [
              {
                value: { value: 7000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120E",
                      display:
                        "Medical Rehabilitation intellectual dissability(MG0120E-Medical Rehabilitation intellectual dissability)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120G",
                  display:
                    "Medical Rehabilitation multiple  disability(MG0120G-Medical Rehabilitation multiple  disability)",
                },
              ],
            },
            limit: [
              {
                value: { value: 7000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120G",
                      display:
                        "Medical Rehabilitation multiple  disability(MG0120G-Medical Rehabilitation multiple  disability)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120D",
                  display:
                    "Medical rehabilitation of muscular dystrophy(MG0120D-Medical rehabilitation of muscular dystrophy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 7000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120D",
                      display:
                        "Medical rehabilitation of muscular dystrophy(MG0120D-Medical rehabilitation of muscular dystrophy)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0102A",
                  display: "Mesenteric Ischemia(MG0102A-Mesenteric Ischemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005E",
                  display:
                    "Metabolic encephalopathy(MP005E-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP005E",
                  display:
                    "Metabolic encephalopathy(MP005E-Acute meningo encephalitis / aseptic meningitis / febrile encephalopathy / hypertensive encehalopathy / metabolic encephalopathy / hepatic encephalopathy / brain abcess )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0117A",
                  display:
                    "Moyamoya revascularization(MG0117A-Moyamoya revascularization)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0116B",
                  display:
                    "Myasthenic crisis (Plasmapheresis)(MG0116B-Myasthenic crisis (Plasmapheresis))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG092B",
                  display:
                    "Myasthenic crisis - Immunoglobulins (IVIG)(MG092B-Myasthenic crisis - Immunoglobulins (IVIG))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG093A",
                  display:
                    "Myasthenic crisis - Plasmapheresis(MG093A-Myasthenic crisis - Plasmapheresis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG052A",
                  display: "Myxedema coma (MG052A-Myxedema coma )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG052A",
                  display: "Myxedema coma (MG052A-Myxedema coma )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP026A",
                  display:
                    "Nephrotic syndrome with peritonitis(MP026A-Nephrotic syndrome with peritonitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP026A",
                  display:
                    "Nephrotic syndrome with peritonitis(MP026A-Nephrotic syndrome with peritonitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006C",
                  display: "Neuro tuberculosis(MP006C-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006C",
                  display: "Neuro tuberculosis(MP006C-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP001C",
                  display:
                    "Neurocysticercosis(MP001C-Febrile seizures / other seizures)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG056A",
                  display:
                    "Neuromuscular disorders(MG056A-Neuromuscular disorders)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG056A",
                  display:
                    "Neuromuscular disorders(MG056A-Neuromuscular disorders)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0114A",
                  display:
                    "Oesophageal Varices Banding(MG0114A-Oesophageal Varices Banding)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP007A",
                  display: "Optic neuritis(MP007A-Optic neuritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SE042A",
                  display: "Optic neuritis(SE042A-Optic neuritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SE042A",
                      display: "Optic neuritis(SE042A-Optic neuritis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG071B",
                  display: "Other poisonings(MG071B-Poisoning)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG071B",
                  display: "Other poisonings(MG071B-Poisoning)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM038A",
                  display:
                    "Palliative care in Diarrhoea(PM038A-Management of Diarrhea in cancer patients -Conservative management)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM010A",
                  display:
                    "Palliative Management of Breathlessnes(PM010A-Palliative Management of Breathlessnes)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM011A",
                  display:
                    "Palliative Management of Breathlessnes(PM011A-Palliative care management of Breathlessness in advanced cancers and chronic respiratory diseases -Conservative management)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006B",
                  display:
                    "Partially treated pyogenic meningitis(MP006B-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP006B",
                  display:
                    "Partially treated pyogenic meningitis(MP006B-Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG020A",
                  display:
                    "Pericardial tuberculosis(MG020A-Pericardial / Pleural tuberculosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG020A",
                  display:
                    "Pericardial tuberculosis(MG020A-Pericardial / Pleural tuberculosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG079A",
                  display:
                    "Peripheral Arterial Thrombosis(MG079A-Peripheral Arterial Thrombosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072B",
                  display:
                    "Peritoneal Dialysis(MG072B-Haemodialysis / Peritoneal Dialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072B",
                      display:
                        "Peritoneal Dialysis(MG072B-Haemodialysis / Peritoneal Dialysis)",
                    },
                  ],
                },
              },
              {
                value: { value: 15001000, unit: "INR" },
                code: { coding: [{ code: "IMP0801", display: "IMP0801" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG072B",
                  display:
                    "Peritoneal Dialysis(MG072B-Haemodialysis / Peritoneal Dialysis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG072B",
                      display:
                        "Peritoneal Dialysis(MG072B-Haemodialysis / Peritoneal Dialysis)",
                    },
                  ],
                },
              },
              {
                value: { value: 5001000, unit: "INR" },
                code: { coding: [{ code: "IMP0801", display: "IMP0801" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG010B",
                  display: "Persistent diarrohea(MG010B-Diarrohea)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG010B",
                  display: "Persistent diarrohea(MG010B-Diarrohea)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG098A",
                  display: "PET scan(MG098A-PET scan)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT555d", display: " Cardiac- " }],
                },
              },
              {
                value: { value: 14650, unit: "INR" },
                code: { coding: [{ code: "STRAT555b", display: "Brain-" }] },
              },
              {
                value: { value: 15000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT555c", display: "Gallium 68 Peptide-" },
                  ],
                },
              },
              {
                value: { value: 20500, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT555a", display: "Whole body-" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG073A",
                  display: "Plasmapheresis(MG073A-Plasmapheresis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG073A",
                      display: "Plasmapheresis(MG073A-Plasmapheresis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG073A",
                  display: "Plasmapheresis(MG073A-Plasmapheresis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG073A",
                      display: "Plasmapheresis(MG073A-Plasmapheresis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG099A",
                  display: "Platelet pheresis(MG099A-Platelet pheresis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 11000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG099A",
                      display: "Platelet pheresis(MG099A-Platelet pheresis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0111A",
                  display: "Pleural Effusion(MG0111A-Pleural Effusion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG020B",
                  display:
                    "Pleural tuberculosis(MG020B-Pericardial / Pleural tuberculosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG020B",
                  display:
                    "Pleural tuberculosis(MG020B-Pericardial / Pleural tuberculosis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG016A",
                  display: "Pneumonia(MG016A-Pneumonia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG016A",
                  display: "Pneumonia(MG016A-Pneumonia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG055A",
                  display: "Pneumothroax(MG055A-Pneumothroax)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG055A",
                  display: "Pneumothroax(MG055A-Pneumothroax)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113A",
                  display: "Polytrauma(MG0113A-Polytrauma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "PM013A",
                  display:
                    "Pressure sore-in palliative care(PM013A-Palliative Care approach to managing Pressure sore -Conservative management)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121B",
                  display: "procname(MG0121B-Severe Anemia  (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2600, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121B",
                      display: "procname(MG0121B-Severe Anemia  (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 2600900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 26001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121C",
                  display: "procname(MG0121C-Severe Anemia  (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121C",
                      display: "procname(MG0121C-Severe Anemia  (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 3000900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 30001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121D",
                  display: "procname(MG0121D-Severe Anemia  (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2900, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121D",
                      display: "procname(MG0121D-Severe Anemia  (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 2900900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 29001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121E",
                  display: "procname(MG0121E-Severe Anemia  (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2300, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121E",
                      display: "procname(MG0121E-Severe Anemia  (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 2300900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 23001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121F",
                  display: "procname(MG0121F-Severe Anemia (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121F",
                      display: "procname(MG0121F-Severe Anemia (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 2700900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 27001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0105A",
                  display:
                    "Pulmonary Thromboembolism - Add on(MG0105A-Pulmonary Thromboembolism - Add on)",
                },
              ],
            },
            limit: [
              {
                value: { value: 25000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0105A",
                      display:
                        "Pulmonary Thromboembolism - Add on(MG0105A-Pulmonary Thromboembolism - Add on)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0109A",
                  display:
                    "Pulmonary thromboembolism(MG0109A-Pulmonary thromboembolism)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG088A",
                  display: "Pyogenic Meningitis(MG088A-Pyogenic Meningitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG026A",
                  display:
                    "Pyrexia of unknown origin(MG026A-Pyrexia of unknown origin)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG026A",
                  display:
                    "Pyrexia of unknown origin(MG026A-Pyrexia of unknown origin)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG025A",
                  display:
                    "Recurrent vomiting with dehydration(MG025A-Recurrent vomiting with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG025A",
                  display:
                    "Recurrent vomiting with dehydration(MG025A-Recurrent vomiting with dehydration)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG044A",
                  display: "Renal colic(MG044A-Renal colic)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG044A",
                  display: "Renal colic(MG044A-Renal colic)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP039A",
                  display: "Rheumatic fever(MP039A-Rheumatic fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP039A",
                  display: "Rheumatic fever(MP039A-Rheumatic fever)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP038A",
                  display: "Rheumatoid arthritis(MP038A-Rheumatoid arthritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP038A",
                  display: "Rheumatoid arthritis(MP038A-Rheumatoid arthritis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ID001A",
                  display:
                    "Screening Test for COVID-19 Infection(ID001A-Laboratory Tests for COVID-19 Infection (PCR) (Reimbursement level for this package will be as per the ICMR guidelines, issued from time to time))",
                },
              ],
            },
            limit: [
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "STRAT888d",
                      display:
                        "All hospitalized patients with Severe Acute Respiratory Illness\n(Fever and cough and / or shortness of breath)",
                    },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "STRAT888b",
                      display:
                        "All symptomatic contacts of laboratory confirmed case",
                    },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "STRAT888c",
                      display: "All symptomatic healthcare workers",
                    },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "STRAT888a",
                      display:
                        "All symptomatic individuals who have undertaken international travel in the last 14 days\n",
                    },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "STRAT888e",
                      display:
                        "Asymptomatic direct and high risk contacts of a confirmed case should be tested once between day 5 and day 14 of coming in his / her contact",
                    },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: { coding: [{ code: "STRAT888f", display: "Others\n" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG046A",
                  display: "Seizures(MG046A-Seizures)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG023A",
                  display: "Septic Arthritis (MG023A-Septic Arthritis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG023A",
                  display: "Septic Arthritis (MG023A-Septic Arthritis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG002B",
                  display: "Septic shock(MG002B-Severe sepsis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG002B",
                  display: "Septic shock(MG002B-Severe sepsis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP047A",
                  display:
                    "Severe Acute Laryngitis requiring hospitalization(MP047A-Severe Acute Laryngitis requiring hospitalization)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "Y" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0121A",
                  display:
                    "Severe Anemia  (Thalassemia)(MG0121A-Severe Anemia  (Thalassemia))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3200, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0121A",
                      display:
                        "Severe Anemia  (Thalassemia)(MG0121A-Severe Anemia  (Thalassemia))",
                    },
                  ],
                },
              },
              {
                value: { value: 3200900, unit: "INR" },
                code: { coding: [{ code: "IMP516", display: "IMP516" }] },
              },
              {
                value: { value: 32001200, unit: "INR" },
                code: { coding: [{ code: "IMP517", display: "IMP517" }] },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG064A",
                  display: "Severe anemia(MG064A-Severe anemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG064A",
                  display: "Severe anemia(MG064A-Severe anemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG017A",
                  display: "Severe pneumonia(MG017A-Severe pneumonia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG017A",
                  display: "Severe pneumonia(MG017A-Severe pneumonia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG002A",
                  display: "Severe sepsis(MG002A-Severe sepsis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG002A",
                  display: "Severe sepsis(MG002A-Severe sepsis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0107A",
                  display:
                    "Severe/Refractory Vasculitis(MG0107A-Severe/Refractory Vasculitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 75000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0107A",
                      display:
                        "Severe/Refractory Vasculitis(MG0107A-Severe/Refractory Vasculitis)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG065A",
                  display: "Sickle cell Anemia(MG065A-Sickle cell Anemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG065A",
                  display: "Sickle cell Anemia(MG065A-Sickle cell Anemia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0120C",
                  display:
                    "Single event multiple level surgery for spasticity management in cerebral palsy(MG0120C-Single event multiple level surgery for spasticity management in cerebral palsy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 15000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG0120C",
                      display:
                        "Single event multiple level surgery for spasticity management in cerebral palsy(MG0120C-Single event multiple level surgery for spasticity management in cerebral palsy)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG024A",
                  display:
                    "Skin and soft tissue infections (MG024A-Skin and soft tissue infections )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG024A",
                  display:
                    "Skin and soft tissue infections (MG024A-Skin and soft tissue infections )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG070A",
                  display: "Snake bite(MG070A-Snake bite)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG070A",
                  display: "Snake bite(MG070A-Snake bite)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP050A",
                  display:
                    "Staphylococcal scalded skin syndrome(MP050A-Staphylococcal scalded skin syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG039B",
                  display: "Status asthmaticus(MG039B-Asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG039B",
                  display: "Status asthmaticus(MG039B-Asthma)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG047A",
                  display: "Status epilepticus(MG047A-Status epilepticus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG047A",
                  display: "Status epilepticus(MG047A-Status epilepticus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP026B",
                  display:
                    "Steroid dependent or resistent(MP026B-Steroid dependent or resistent)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP044A",
                  display:
                    "Steven Johnson  syndrome(MP044A-Steven Johnson  syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP044A",
                  display:
                    "Steven Johnson  syndrome(MP044A-Steven Johnson  syndrome)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SE044A",
                  display:
                    "Subtotal Colectomy- Open (SE044A-Subtotal Colectomy- Open )",
                },
              ],
            },
            limit: [
              {
                value: { value: 1000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SE044A",
                      display:
                        "Subtotal Colectomy- Open (SE044A-Subtotal Colectomy- Open )",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG068A",
                  display:
                    "Systematic lupus erythematosus(MG068A-Systematic lupus erythematosus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG068A",
                  display:
                    "Systematic lupus erythematosus(MG068A-Systematic lupus erythematosus)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ID001B",
                  display:
                    "Test for Confirmation of COVID-19 Infection(ID001B-Laboratory Tests for COVID-19 Infection (PCR) (Reimbursement level for this package will be as per the ICMR guidelines, issued from time to time))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ID001B",
                      display:
                        "Test for Confirmation of COVID-19 Infection(ID001B-Laboratory Tests for COVID-19 Infection (PCR) (Reimbursement level for this package will be as per the ICMR guidelines, issued from time to time))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP039B",
                  display: "Thalessmia(MP039B-Thalessmia)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG053A",
                  display: "Thyrotoxic crisis (MG053A-Thyrotoxic crisis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG053A",
                  display: "Thyrotoxic crisis (MG053A-Thyrotoxic crisis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SL026A",
                  display: "Tracheostomy(SL026A-Tracheostomy / Tracheotomy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 4000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT003b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 10000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT028b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT003a", display: "Local Anesthesia" }],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT028a", display: "Local Anesthesia" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SL026A",
                  display: "Tracheostomy(SL026A-Tracheostomy / Tracheotomy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 4000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT003b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 10000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT028b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT003a", display: "Local Anesthesia" }],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT028a", display: "Local Anesthesia" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SL026B",
                  display: "Tracheotomy(SL026B-Tracheostomy / Tracheotomy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 4000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT003b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 10000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT028b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT003a", display: "Local Anesthesia" }],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT028a", display: "Local Anesthesia" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SL026B",
                  display: "Tracheotomy(SL026B-Tracheostomy / Tracheotomy)",
                },
              ],
            },
            limit: [
              {
                value: { value: 4000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT003b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 10000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT028b", display: "General Anesthesia" },
                  ],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT003a", display: "Local Anesthesia" }],
                },
              },
              {
                value: { value: 0, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT028a", display: "Local Anesthesia" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113E",
                  display:
                    "Trauma Blunt injury conservative(MG0113E-Trauma Blunt injury conservative)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113F",
                  display:
                    "Trauma Contusion chest injury(MG0113F-Trauma Contusion chest injury)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113C",
                  display: "Trauma Head injury(MG0113C-Trauma Head injury)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113D",
                  display:
                    "Trauma Rib fracture conservative(MG0113D-Trauma Rib fracture conservative)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG0113B",
                  display:
                    "Trauma- FacioMaxillary(MG0113B-Trauma- FacioMaxillary)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ID003A",
                  display:
                    "Treatment of COVID-19 Infection(ID003A-Treatment of COVID-19 Infection)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3240, unit: "INR" },
                code: { coding: [{ code: "STRAT333b", display: "HDU" }] },
              },
              {
                value: { value: 5400, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333d", display: "ICU with ventilator" },
                  ],
                },
              },
              {
                value: { value: 4320, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333c", display: "ICU without ventiliator" },
                  ],
                },
              },
              {
                value: { value: 2160, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333a", display: "Routine / General Ward" },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ID003A",
                  display:
                    "Treatment of COVID-19 Infection(ID003A-Treatment of COVID-19 Infection)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3240, unit: "INR" },
                code: { coding: [{ code: "STRAT333b", display: "HDU" }] },
              },
              {
                value: { value: 5400, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333d", display: "ICU with ventilator" },
                  ],
                },
              },
              {
                value: { value: 4320, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333c", display: "ICU without ventiliator" },
                  ],
                },
              },
              {
                value: { value: 2160, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT333a", display: "Routine / General Ward" },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ID005A",
                  display:
                    "Treatment of systemic fungal infections(ID005A-Treatment of systemic fungal infections)",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG094A",
                  display:
                    "Tuberculous meningitis (Hydrocephalus B VP SHUNT/ EVD/Omaya)(MG094A-Tuberculous meningitis (Hydrocephalus вЂ“ VP SHUNT/ EVD/Omaya))",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040A",
                  display:
                    "Type 1 respiratory failure(MG040A-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040A",
                  display:
                    "Type 1 respiratory failure(MG040A-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040B",
                  display:
                    "Type 2 respiratory failure(MG040B-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG040B",
                  display:
                    "Type 2 respiratory failure(MG040B-Respiratory failure)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP023A",
                  display:
                    "Unexplained hepatosplenomegaly(MP023A-Unexplained hepatosplenomegaly)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP023A",
                  display:
                    "Unexplained hepatosplenomegaly(MP023A-Unexplained hepatosplenomegaly)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG041A",
                  display:
                    "Upper GI bleeding (conservative)(MG041A-Upper GI bleeding)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG041A",
                  display:
                    "Upper GI bleeding (conservative)(MG041A-Upper GI bleeding)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG041B",
                  display:
                    "Upper GI bleeding (endoscopic)(MG041B-Upper GI bleeding)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG041B",
                  display:
                    "Upper GI bleeding (endoscopic)(MG041B-Upper GI bleeding)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG021A",
                  display:
                    "Urinary Tract Infection(MG021A-Urinary Tract Infection)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG021A",
                  display:
                    "Urinary Tract Infection(MG021A-Urinary Tract Infection)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG032A",
                  display: "Vasculitis(MG032A-Vasculitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG032A",
                  display: "Vasculitis(MG032A-Vasculitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG087A",
                  display:
                    "Venous sinus thrombosis (MG087A-Venous sinus thrombosis )",
                },
              ],
            },
            limit: [
              {
                value: { value: 3300, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 9000, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 8500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 2100, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG022A",
                  display: "Viral encephalitis(MG022A-Viral encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG022A",
                  display: "Viral encephalitis(MG022A-Viral encephalitis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG015A",
                  display:
                    "Visceral leishmaniasis(MG015A-Visceral leishmaniasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG015A",
                  display:
                    "Visceral leishmaniasis(MG015A-Visceral leishmaniasis)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SE043B",
                  display:
                    "Vision refraction fundus photo and OCT(SE043B-Vision refraction fundus photo and OCT)",
                },
              ],
            },
            limit: [
              {
                value: { value: 1500, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SE043B",
                      display:
                        "Vision refraction fundus photo and OCT(SE043B-Vision refraction fundus photo and OCT)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SE043A",
                  display:
                    "Vision Refraction-IOP & Fundus OCT & Visual Fields(SE043A-Vision Refraction-IOP & Fundus OCT & Visual Fields)",
                },
              ],
            },
            limit: [
              {
                value: { value: 800, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SE043A",
                      display:
                        "Vision Refraction-IOP & Fundus OCT & Visual Fields(SE043A-Vision Refraction-IOP & Fundus OCT & Visual Fields)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP018A",
                  display: "Wheezing(MP018A-Wheezing)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "Y" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MP018A",
                  display: "Wheezing(MP018A-Wheezing)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: { coding: [{ code: "STRAT006b", display: "HDU" }] },
              },
              {
                value: { value: 4500, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006d", display: "ICU - With Ventilator" },
                  ],
                },
              },
              {
                value: { value: 3600, unit: "INR" },
                code: {
                  coding: [
                    { code: "STRAT006c", display: "ICU - Without Ventilator" },
                  ],
                },
              },
              {
                value: { value: 1800, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT006a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "Y" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "4" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG074A",
                  display: "Whole Blood transfusion(MG074A-Blood transfusion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG074A",
                      display:
                        "Whole Blood transfusion(MG074A-Blood transfusion)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "4" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "MG074A",
                  display: "Whole Blood transfusion(MG074A-Blood transfusion)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "MG074A",
                      display:
                        "Whole Blood transfusion(MG074A-Blood transfusion)",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        extension: [
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0339",
                      display: "Clinical notes with planned line of treatment",
                    },
                  ],
                },
              },
            ],
          },
          {
            url: "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement",
            extension: [
              {
                url: "category",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                      code: "DIA",
                      display: "Diagnostic report",
                    },
                  ],
                },
              },
              {
                url: "code",
                valueCodeableConcept: {
                  coding: [
                    {
                      system:
                        "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-supportinginfo-code",
                      code: "MAND0379",
                      display: "Pre-clinical photograph",
                    },
                  ],
                },
              },
            ],
          },
        ],
        type: {
          coding: [
            {
              system:
                "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-benefitcategory",
              code: "ER",
              display:
                "Emergency Room Packages (Care requiring less than 12 hrs stay)",
            },
          ],
        },
        benefit: [
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER003A",
                  display:
                    "Animal bites (Excluding Snake Bite)(ER003A-Animal bites (Excluding Snake Bite))",
                },
              ],
            },
            limit: [
              {
                value: { value: 1700, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER003A",
                      display:
                        "Animal bites (Excluding Snake Bite)(ER003A-Animal bites (Excluding Snake Bite))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER003A",
                  display:
                    "Animal bites (Excluding Snake Bite)(ER003A-Animal bites (Excluding Snake Bite))",
                },
              ],
            },
            limit: [
              {
                value: { value: 1700, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER003A",
                      display:
                        "Animal bites (Excluding Snake Bite)(ER003A-Animal bites (Excluding Snake Bite))",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SU073A",
                  display:
                    "Emergency management of Hematuria(SU073A-Emergency management of Hematuria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT089a", display: "bed category " }],
                },
              },
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT026a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SU073A",
                  display:
                    "Emergency management of Hematuria(SU073A-Emergency management of Hematuria)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2700, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT089a", display: "bed category " }],
                },
              },
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [{ code: "STRAT026a", display: "Routine Ward" }],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER002A",
                  display:
                    "Emergency with stable cardiopulmonary status(ER002A-Cardiopulmonary emergency)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER002A",
                      display:
                        "Emergency with stable cardiopulmonary status(ER002A-Cardiopulmonary emergency)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER002A",
                  display:
                    "Emergency with stable cardiopulmonary status(ER002A-Cardiopulmonary emergency)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER002A",
                      display:
                        "Emergency with stable cardiopulmonary status(ER002A-Cardiopulmonary emergency)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER002B",
                  display:
                    "Emergency with unstable cardiopulmonary status with resuccitation(ER002B-Cardiopulmonary emergency)",
                },
              ],
            },
            limit: [
              {
                value: { value: 10000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER002B",
                      display:
                        "Emergency with unstable cardiopulmonary status with resuccitation(ER002B-Cardiopulmonary emergency)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER002B",
                  display:
                    "Emergency with unstable cardiopulmonary status with resuccitation(ER002B-Cardiopulmonary emergency)",
                },
              ],
            },
            limit: [
              {
                value: { value: 11000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER002B",
                      display:
                        "Emergency with unstable cardiopulmonary status with resuccitation(ER002B-Cardiopulmonary emergency)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SB001A",
                  display:
                    "Fracture - Conservative Management -  Without plaster(SB001A-Fracture - Conservative Management -  Without plaster)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SB001A",
                      display:
                        "Fracture - Conservative Management -  Without plaster(SB001A-Fracture - Conservative Management -  Without plaster)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "SB001A",
                  display:
                    "Fracture - Conservative Management -  Without plaster(SB001A-Fracture - Conservative Management -  Without plaster)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2300, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "SB001A",
                      display:
                        "Fracture - Conservative Management -  Without plaster(SB001A-Fracture - Conservative Management -  Without plaster)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "1" },
              { url: "autoApproveYN", valueString: "1" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER001A",
                  display:
                    "Laceration - Suturing / Dressing(ER001A-Laceration - Suturing / Dressing)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER001A",
                      display:
                        "Laceration - Suturing / Dressing(ER001A-Laceration - Suturing / Dressing)",
                    },
                  ],
                },
              },
            ],
          },
          {
            extension: [
              { url: "CyclicProcedureYN", valueString: "N" },
              { url: "GovtReservedYN", valueString: "N" },
              { url: "quantityAllowed", valueString: "1" },
              { url: "implantApplicableYN", valueString: "N" },
              { url: "maxImplantsAllowed", valueString: "0" },
              { url: "autoApproveYN", valueString: "0" },
            ],
            type: {
              coding: [
                {
                  system:
                    "https://nrces.in/ndhm/fhir/r4/ValueSet/ndhm-productorservice",
                  code: "ER001A",
                  display:
                    "Laceration - Suturing / Dressing(ER001A-Laceration - Suturing / Dressing)",
                },
              ],
            },
            limit: [
              {
                value: { value: 2000, unit: "INR" },
                code: {
                  coding: [
                    {
                      code: "ER001A",
                      display:
                        "Laceration - Suturing / Dressing(ER001A-Laceration - Suturing / Dressing)",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await gcpFhirCRUD.createFhirResource(body, "InsurancePlan");
  console.log(res.data);

  // const ret = insurancePlan.convertFhirToObject(body);

  return ret;
};

module.exports = { setInsurancePlan };
