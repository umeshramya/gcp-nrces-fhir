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
    hcx: "swasth",
    enterer: {
      display: resources.practioner.name,
      id: resources.practioner.id,
      resource: "Practitioner",
      identifier : {
        "system" : "HPR",
        "value" : "umesh@hpr.ndhm",
        "use" : "official",
      }
    },
    insurerOrganizationId: "5ee777fa-2ada-4797-a87a-806c68504402",
    insurerParticipantId: "1000003547@hcx",
    insurerName: "Medi Asst",
    locationId: "23da242a-a44f-49c2-b302-da05ebad8325",
    patientId: resources.patient.id,
    priority: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/processpriority",
          code: "normal",
        },
      ],
    },
    supportingInfo: [
      {
        sequence: 1,
        information: {
          reference: "Condition/83059893-22bb-4aa8-9463-45667489666a",
        },
      },
    ],
    provider: {
      display: "Jeevan Jyoti Hospital",
      id: resources.insuranceCompany.id,
      resource: "Organization",
      identifier: {
        system: "NHCX",
        value: "1000003414@hcx",
        use: "official",
      },
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
    "CoverageEligibilityRequest",
    true
  );
  const ret = coverageEligilityRequest.convertFhirToObject(res.data);

  resources.coverageEligilityRequest = ret;
  return ret;
};

module.exports = { setCoverageEligibiltyRequest };

const test = {
  resourceType: "Bundle",
  id: "e28debc2-98a2-4e84-904f-59776b542079",
  meta: {
    lastUpdated: "2024-02-20T13:13:47.888+00:00",
    profile: [
      "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequestBundle.html",
    ],
  },
  identifier: {
    system: "https://www.tmh.in/bundle",
    value: "745c15ea-b82a-46b4-a5f0-8288ed242ad3",
  },
  type: "collection",
  timestamp: "2024-02-20T13:13:47.888+00:00",
  entry: [
    {
      fullUrl:
        "CoverageEligibilityRequest/dc82673b-8c71-48c2-8a17-16dcb3b035f6",
      resource: {
        resourceType: "CoverageEligibilityRequest",
        id: "dc82673b-8c71-48c2-8a17-16dcb3b035f6",
        meta: {
          profile: [
            "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequest.html",
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml">OPD</div>',
        },
        identifier: [{ value: "req_70e02576-f5f5-424f-b115-b5f1029704d4" }],
        status: "active",
        priority: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/processpriority",
              code: "normal",
            },
          ],
        },
        purpose: ["benefits"],
        patient: { reference: "Patient/RVH1003" },
        servicedDate: "0026-12-13",
        created: "2024-02-20T13:13:47+00:00",
        enterer: { reference: "Practitioner/PractitionerViswasKar" },
        provider: { reference: "Organization/GICOFINDIA" },
        insurer: { reference: "Organization/WeMeanWell01" },
        // facility: { reference: "http://sgh.com.sa/Location/4461281" },
        insurance: [{ coverage: { reference: "Coverage/COVERAGE1" } }],
        item: [
          {
            productOrService: {
              coding: [
                {
                  system: "https://irdai.gov.in/package-code",
                  code: "E101021",
                  display: "Twin Sharing Ac",
                },
              ],
              text: " twin sharing basis room package",
            },
            diagnosis: [
              {
                diagnosisCodeableConcept: {
                  coding: [
                    {
                      system: "https://irdai.gov.in/package-code",
                      code: "E906184",
                      display: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
                    },
                  ],
                  text: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
                },
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl: "Organization/WeMeanWell01",
      resource: {
        resourceType: "Organization",
        id: "WeMeanWell01",
        meta: {
          profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization",
          ],
        },
        identifier: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "AC",
                  display: "Narayana",
                },
              ],
            },
            system: "http://abdm.gov.in/facilities",
            value: "HFR-ID-FOR-TMH",
          },
        ],
        name: "Demo Provider OPD",
        address: [
          {
            text: " Bannerghatta Road, Bengaluru ",
            city: "Bengaluru",
            country: "India",
          },
        ],
      },
    },
    {
      fullUrl: "Organization/GICOFINDIA",
      resource: {
        resourceType: "Organization",
        id: "GICOFINDIA",
        meta: {
          profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization",
          ],
        },
        identifier: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "AC",
                  display: "GOVOFINDIA",
                },
              ],
            },
            system: "http://irdai.gov.in/insurers",
            value: "GICOFINDIA",
          },
        ],
        name: "Demo Payor",
      },
    },
    {
      fullUrl: "Patient/RVH1003",
      resource: {
        resourceType: "Patient",
        id: "RVH1003",
        meta: {
          profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient",
          ],
        },
        identifier: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "SN",
                  display: "Subscriber Number",
                },
              ],
            },
            system: "http://gicofIndia.com/beneficiaries",
            value: "BEN-101",
          },
        ],
        name: [{ text: "Test user" }],
        telecom: [{ system: "phone", value: "9620499129" }],
        gender: "male",
        birthDate: "1960-09-26",
        address: [
          {
            text: "#39 Kalena Agrahara, Kamanahalli, Bengaluru - 560056",
            city: "Bengaluru",
            state: "Karnataka",
            postalCode: "560056",
            country: "India",
          },
        ],
      },
    },
    {
      fullUrl: "Coverage/COVERAGE1",
      resource: {
        resourceType: "Coverage",
        id: "COVERAGE1",
        meta: {
          profile: [
            "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Coverage.html",
          ],
        },
        identifier: [
          {
            system: "https://www.gicofIndia.in/policies",
            value: "policy-RVH1003",
          },
        ],
        status: "active",
        subscriber: { reference: "Patient/RVH1003" },
        subscriberId: "ABCD1234",
        beneficiary: { reference: "Patient/RVH1003" },
        relationship: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
              code: "self",
            },
          ],
        },
        payor: [{ reference: "Organization/GICOFINDIA" }],
      },
    },
    {
      fullUrl: "Practitioner/PractitionerViswasKar",
      resource: {
        resourceType: "Practitioner",
        id: "PractitionerViswasKar",
        meta: {
          profile: [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner",
          ],
        },
        identifier: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "MD",
                  display: "Medical License number",
                },
              ],
            },
            system: "http://abdm.gov.in/facilities",
            value: "DOC-123/456",
          },
        ],
        name: [{ text: "Dr Viswas kar" }],
      },
    },
  ],
};
