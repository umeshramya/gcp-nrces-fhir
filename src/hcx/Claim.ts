import { ResourceMaster } from "../Interfaces";
import { CODEABLE_CONCEPT, IDENTTIFIER, PERIOD } from "../config";
import ResourceMain from "../resources/ResourceMai";

export interface CLAIM{
    id?:string,
    text : string
    identifier:IDENTTIFIER[]
    status : "active" | "cancelled" | "draft" | "entered-in-error",
    patientGcpId:string
    providerId:string
    payorId : string
    billablePeriod:PERIOD
    priority:CODEABLE_CONCEPT
    total:{
      "value": number,
      "currency": "INR" | "USD"
    }
    careteam : { sequence: number, provider: { reference: `Organization/${string}` } }[];
    item :      {
      sequence: number,
      productOrService: {
        coding: [
          {
            system: "https://irdai.gov.in/package-code",
            code: string,
            display: string,
          },
        ],
      },
      unitPrice: { value: number, currency: "INR" | "USD" },
    }[];
    diagnosis : {
      sequence: number,
      diagnosisCodeableConcept: CODEABLE_CONCEPT,
      type: CODEABLE_CONCEPT[]
    }[]
   insurance :  {
      "sequence": number,
      "focal": boolean,
      "identifier"?: IDENTTIFIER
      "coverage": { reference: `Coverage/${string}` }
    }[]
    type:CODEABLE_CONCEPT
    createdDate :string
    use : "claim" | "preauthorization" | "predetermination",
    hcx : "nhcx" | "swastha"
}

export class Claim extends ResourceMain implements ResourceMaster {
    getFHIR(options: CLAIM) {
        const body={
          resourceType: "Claim",
          id: options.id ? options.id : undefined,
          meta: {
            lastUpdated: "2023-02-20T14:03:14.918+05:30",
            profile: options.hcx == "nhcx" ? 
            [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim"
           ] :[
              "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Claim.html",
            ]   ,
          },
          identifier:options.identifier,
          status: options.status,
          type: options.type,
          patient: { reference: `Patient/${options.patientGcpId}` },
          created: options.createdDate,
          insurer: { reference: `Organization/${options.payorId}` },
          provider: { reference: `Organization/${options.providerId}` },
          priority: options.priority,
          careTeam: options.careteam,
          diagnosis:options.diagnosis,
          insurance: options.insurance,
          item: options.item,
          total: options.total,
          use : options.use
        }
        return body;
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;

}





const test = {
    resourceType: "Claim",
    id: "bb1eea08-8739-4f14-b541-04622f18450c",
    meta: {
      lastUpdated: "2023-02-20T14:03:14.918+05:30",
      profile: [
        "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Claim.html",
      ],
    },
    identifier: [
      { system: "http://identifiersystem.com", value: "IdentifierValue" },
    ],
    status: "active",
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/claim-type",
          code: "institutional",
        },
      ],
    },
    use: "claim",
    patient: { reference: "Patient/RVH1003" },
    created: "2023-02-20T14:03:14+05:30",
    insurer: { reference: "Organization/GICOFINDIA" },
    provider: { reference: "Organization/WeMeanWell01" },
    priority: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/processpriority",
          code: "normal",
        },
      ],
    },
    payee: {
      type: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/payeetype",
            code: "provider",
          },
        ],
      },
      party: { reference: "Organization/WeMeanWell01" },
    },
    careTeam: [
      { sequence: 4, provider: { reference: "Organization/WeMeanWell01" } },
    ],
    diagnosis: [
      {
        sequence: 1,
        diagnosisCodeableConcept: {
          coding: [
            {
              system: "http://irdai.com",
              code: "E906184",
              display: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
            },
          ],
          text: "SINGLE INCISION LAPAROSCOPIC APPENDECTOMY",
        },
        type: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/ex-diagnosistype",
                code: "admitting",
                display: "Admitting Diagnosis",
              },
            ],
          },
        ],
      },
    ],
    insurance: [
      {
        sequence: 1,
        focal: true,
        coverage: { reference: "Coverage/COVERAGE1" },
      },
    ],
    item: [
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E101021",
              display: "Twin Sharing Ac",
            },
          ],
        },
        unitPrice: { value: 100000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E924260",
              display: "CLINICAL TOXICOLOGY SCREEN, BLOOD",
            },
          ],
        },
        unitPrice: { value: 2000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E924261",
              display: "CLINICAL TOXICOLOGY SCREEN,URINE",
            },
          ],
        },
        unitPrice: { value: 1000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E507029",
              display: "ECG",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E6080377",
              display: "UltraSound Abdomen",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "502001",
              display: "Surgeons Charges",
            },
          ],
        },
        unitPrice: { value: 1000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "5020021",
              display: "Anesthesiologist charges",
            },
          ],
        },
        unitPrice: { value: 1000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E6080373",
              display: "Physician charges",
            },
          ],
        },
        unitPrice: { value: 1000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "201008",
              display: "Recovery Room",
            },
          ],
        },
        unitPrice: { value: 10000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "406003",
              display: "intra -venous (iv) set",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E507353",
              display: "Oral Medication",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "E925171",
              display: "Hospital charges",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: "https://irdai.gov.in/package-code",
              code: "501001",
              display: "Consultation Charges",
            },
          ],
        },
        unitPrice: { value: 5000, currency: "INR" },
      },
    ],
    total: { value: 146000.0, currency: "INR" },
  }