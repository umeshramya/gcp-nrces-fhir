import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import ResourceFactory from "../../classess/ResourceFactory";
import { MedicationRequest } from "../MedicationRequest";

export class DischargeSummaryBundle extends BundelMain implements ResourceMaster {
  async toHtml():Promise<string>{
    throw new Error("Method not implemented.");
  }
  
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }
    options.composition.title = "Discharge Summary Document";

    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData);

    this.entry = bundlemain.entry;

    const sectionEntries = options.composition.section;

    await this.getAllSectionAndAllEntries(0, sectionEntries);
    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
      },
      identifier: {
        system: "https://www.nicehms.com/bundle",
        value: options.id,
      },
      type: "document",
      timestamp: options.composition.date,
      entry: this.entry,
    };
    const medicationRef = body.entry
      .filter((el) => el.resource.resourceType == "MedicationRequest")
      .map((el) => {
        return {
          reference: `MedicationRequest/${el.resource.id}`,
        };
      });
    body.entry[0].resource.section.find(
      (m: any) => m.code.coding[0].display == "Medication summary document"
    ).entry = medicationRef;
    
    // const  filteredEntry =body.entry.filter(el =>el.resource.resourceType !== "DocumentReference")
    // body.entry=filteredEntry;
    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }


  statusArray?: Function | undefined;
}

const demo = {
  "resourceType": "Bundle",
  "id": "e24d0d35-a976-4eec-9598-c0f061a56b8b",
  "meta": {
    "lastUpdated": "2019-04-19T00:00:00.000+05:30"
  },
  "identifier": {
    "system": "https://www.max.in/bundle",
    "value": "e24d0d35-a976-4eec-9598-c0f061a56b8b"
  },
  "type": "document",
  "timestamp": "2019-04-19T00:00:00.000+05:30",
  "entry": [
    {
      "fullUrl": "Composition/fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
      "resource": {
        "resourceType": "Composition",
        "id": "fb8c668f-8e53-47dd-802b-aa2ff4763e8c",
        "identifier": {
          "system": "https://www.max.in/document",
          "value": "fb8c668f-8e53-47dd-802b-aa2ff4763e8c"
        },
        "status": "final",
        "type": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "373942005",
              "display": "Discharge Summary Record"
            }
          ]
        },
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "encounter": {
          "reference": "Encounter/ece47f53-28dc-48bf-9232-79efa964defd"
        },
        "date": "2019-04-19T00:00:00.605+05:30",
        "author": [
          {
            "reference": "Practitioner/MAX191101",
            "display": "Dr Akshatha M K"
          }
        ],
        "title": "Discharge Summary Document",
        "custodian": {
          "reference": "Organization/MaxSaket01"
        },
        "section": [
          {
            "title": "Presenting Problems",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "422843007",
                  "display": "Chief Complaint Section"
                }
              ]
            },
            "entry": [
              {
                "reference": "Condition/194208f1-a058-4b21-88bd-7ca38bbfe68f"
              }
            ]
          },
          {
            "title": "Allergy Section",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "722446000",
                  "display": "Allergy Record"
                }
              ]
            },
            "entry": [
              {
                "reference": "AllergyIntolerance/example"
              },
              {
                "reference": "AllergyIntolerance/medication"
              }
            ]
          },
          {
            "title": "Physical Examination",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "425044008",
                  "display": "Physical exam section"
                }
              ]
            },
            "entry": [
              {
                "reference": "Observation/5d4cf222-76d0-4da1-9beb-c44d676db85c"
              },
              {
                "reference": "Observation/3e1db0b3-46bb-4f23-a5ea-6ed3b3a34cf2"
              }
            ]
          },
          {
            "title": "Prescribed medications during Admission",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "440545006",
                  "display": "Prescription"
                }
              ]
            },
            "entry": [
              {
                "reference": "MedicationRequest/b07e48bc-1554-4eaa-bee3-0370982eb8f0"
              },
              {
                "reference": "MedicationRequest/27e444a7-379d-44b8-9e4b-24a52a29ff8e"
              }
            ]
          },
          {
            "title": "Clinical consultation",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "371530004",
                  "display": "Clinical consultation report"
                }
              ]
            },
            "entry": [
              {
                "reference": "DocumentReference/4c641e52-0d59-4835-8752-e380e89c694c"
              }
            ]
          },
          {
            "title": "Procedures",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "371525003",
                  "display": "Clinical procedure report"
                }
              ]
            },
            "entry": [
              {
                "reference": "Procedure/e6c5e7fd-c22a-4d5a-a568-270753e51249"
              }
            ]
          },
          {
            "title": "Care Plan",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "734163000",
                  "display": "Care Plan"
                }
              ]
            },
            "entry": [
              {
                "reference": "CarePlan/00bc7230-101b-4339-bbed-89be3918663c"
              }
            ]
          },
          {
            "title": "Follow up",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "736271009",
                  "display": "Follow up"
                }
              ]
            },
            "entry": [
              {
                "reference": "Appointment/4976fe22-7475-4545-a11b-5160b4950878"
              }
            ]
          }
        ],
        "attester": [
          {
            "mode": "official",
            "time": "2019-01-04T09:10:14Z",
            "party": {
              "reference": "Organization/MaxSaket01",
              "display": "Max Super Speciality Hospital, Saket"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "Practitioner/MAX191101",
      "resource": {
        "resourceType": "Practitioner",
        "id": "MAX191101",
        "identifier": [
          {
            "system": "https://www.mciindia.in/doctor",
            "value": "MAX191101"
          }
        ],
        "name": [
          {
            "text": "Akshatha M K",
            "prefix": [
              "Dr"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "Organization/MaxSaket01",
      "resource": {
        "resourceType": "Organization",
        "id": "MaxSaket01",
        "name": "Max Super Speciality Hospital, Saket",
        "alias": [
          "Max"
        ],
        "identifier": [
          {
            "system": "https://facilitysbx.ndhm.gov.in",
            "value": "IN0410000183"
          }
        ],
        "telecom": [
          {
            "system": "phone",
            "value": "(+91) 011-2651-5050"
          },
          {
            "system": "fax",
            "value": "(+91) 011-2651-5051"
          }
        ],
        "address": [
          {
            "line": [
              "1, 2, Press Enclave Marg, Saket Institutional Area, Saket"
            ],
            "city": "New Delhi",
            "state": "New Delhi",
            "postalCode": "110017",
            "country": "INDIA"
          }
        ],
        "endpoint": [
          {
            "reference": "https://www.max.in/hospital-network/max-super-speciality-hospital-saket",
            "display": "Website"
          }
        ]
      }
    },
    {
      "fullUrl": "Patient/NCC1543",
      "resource": {
        "resourceType": "Patient",
        "id": "NCC1543",
        "name": [
          {
            "text": "Keith David"
          }
        ],
        "gender": "male"
      }
    },
    {
      "fullUrl": "Condition/3a55eee8-8ed2-496b-8492-a2ee82fae9ab",
      "resource": {
        "resourceType": "Condition",
        "id": "3a55eee8-8ed2-496b-8492-a2ee82fae9ab",
        "clinicalStatus": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
              "code": "recurrence",
              "display": "recurrence"
            }
          ],
          "text": "recurrence"
        },
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                "code": "encounter-diagnosis",
                "display": "Encounter Diagnosis"
              }
            ],
            "text": "Encounter Diagnosis"
          }
        ],
        "severity": {
          "text": "Mild"
        },
        "code": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "128944008",
              "display": "Bacterial infection due to Bacillus"
            }
          ],
          "text": "Bacterial infection due to Bacillus"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        }
      }
    },
    {
      "fullUrl": "Encounter/ece47f53-28dc-48bf-9232-79efa964defd",
      "resource": {
        "resourceType": "Encounter",
        "id": "ece47f53-28dc-48bf-9232-79efa964defd",
        "status": "finished",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "Inpatient visit"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "period": {
          "start": "2019-04-15T00:00:00+05:30",
          "end": "2019-04-19T00:00:00+05:30"
        },
        "diagnosis": [
          {
            "condition": {
              "reference": "Condition/3a55eee8-8ed2-496b-8492-a2ee82fae9ab"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "Condition/194208f1-a058-4b21-88bd-7ca38bbfe68f",
      "resource": {
        "resourceType": "Condition",
        "id": "194208f1-a058-4b21-88bd-7ca38bbfe68f",
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                "code": "problem-list-item",
                "display": "problem list"
              }
            ],
            "text": "problem list"
          }
        ],
        "severity": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "24484000",
              "display": "Severe"
            }
          ],
          "text": "Severe"
        },
        "code": {
          "text": "Toothache"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        }
      }
    },
    {
      "fullUrl": "AllergyIntolerance/example",
      "resource": {
        "resourceType": "AllergyIntolerance",
        "id": "example",
        "clinicalStatus": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              "code": "active",
              "display": "Active"
            }
          ]
        },
        "verificationStatus": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
              "code": "confirmed",
              "display": "Confirmed"
            }
          ]
        },
        "type": "allergy",
        "category": [
          "food"
        ],
        "criticality": "high",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "227493005",
              "display": "Cashew nuts"
            }
          ]
        },
        "patient": {
          "reference": "Patient/NCC1543"
        },
        "onsetString": "Past 1 year",
        "asserter": {
          "reference": "Practitioner/MAX191101",
          "display": "Dr Akshatha M K"
        },
        "note": [
          {
            "text": "The criticality is high becasue of the observed anaphylactic reaction when challenged with cashew extract."
          }
        ]
      }
    },
    {
      "fullUrl": "AllergyIntolerance/medication",
      "resource": {
        "resourceType": "AllergyIntolerance",
        "id": "medication",
        "clinicalStatus": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              "code": "active",
              "display": "Active"
            }
          ]
        },
        "category": [
          "medication"
        ],
        "criticality": "high",
        "code": {
          "coding": [
            {
              "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
              "code": "7980",
              "display": "Penicillin G"
            }
          ]
        },
        "patient": {
          "reference": "Patient/NCC1543"
        },
        "onsetString": "Past 2 year",
        "asserter": {
          "reference": "Practitioner/MAX191101",
          "display": "Dr Akshatha M K"
        }
      }
    },
    {
      "fullUrl": "Observation/5d4cf222-76d0-4da1-9beb-c44d676db85c",
      "resource": {
        "resourceType": "Observation",
        "id": "5d4cf222-76d0-4da1-9beb-c44d676db85c",
        "status": "final",
        "code": {
          "text": "Temperature"
        },
        "effectiveDateTime": "2019-04-15T00:00:00+05:30",
        "valueQuantity": {
          "value": 99.5,
          "unit": "C"
        }
      }
    },
    {
      "fullUrl": "Observation/3e1db0b3-46bb-4f23-a5ea-6ed3b3a34cf2",
      "resource": {
        "resourceType": "Observation",
        "id": "3e1db0b3-46bb-4f23-a5ea-6ed3b3a34cf2",
        "status": "final",
        "code": {
          "text": "pulse"
        },
        "effectiveDateTime": "2019-04-16T00:00:00+05:30",
        "valueString": "72 bpm"
      }
    },
    {
      "fullUrl": "Condition/c34917cd-616b-43de-8f2b-5a755bef6bca",
      "resource": {
        "resourceType": "Condition",
        "id": "c34917cd-616b-43de-8f2b-5a755bef6bca",
        "code": {
          "text": "inflammation"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        }
      }
    },
    {
      "fullUrl": "MedicationRequest/b07e48bc-1554-4eaa-bee3-0370982eb8f0",
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "b07e48bc-1554-4eaa-bee3-0370982eb8f0",
        "status": "active",
        "intent": "order",
        "medicationCodeableConcept": {
          "text": "ibuprofen 500 mg"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "authoredOn": "2019-04-18T00:00:00+05:30",
        "requester": {
          "reference": "Practitioner/MAX191101"
        },
        "reasonReference": [
          {
            "reference": "Condition/c34917cd-616b-43de-8f2b-5a755bef6bca"
          }
        ],
        "dosageInstruction": [
          {
            "text": "1 tablet 3 times a day"
          }
        ]
      }
    },
    {
      "fullUrl": "Medication/bacc4303-b5d7-4c2d-b6d6-84d4c8559b22",
      "resource": {
        "resourceType": "Medication",
        "id": "bacc4303-b5d7-4c2d-b6d6-84d4c8559b22",
        "code": {
          "text": "albendazole 400 mg"
        }
      }
    },
    {
      "fullUrl": "MedicationRequest/27e444a7-379d-44b8-9e4b-24a52a29ff8e",
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "27e444a7-379d-44b8-9e4b-24a52a29ff8e",
        "status": "active",
        "intent": "order",
        "medicationReference": {
          "reference": "Medication/bacc4303-b5d7-4c2d-b6d6-84d4c8559b22"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "authoredOn": "2019-04-18T00:00:00+05:30",
        "requester": {
          "reference": "Practitioner/MAX191101"
        },
        "dosageInstruction": [
          {
            "text": "1 time only"
          }
        ]
      }
    },
    {
      "fullUrl": "Practitioner/MAX1234",
      "resource": {
        "resourceType": "Practitioner",
        "id": "MAX1234",
        "identifier": [
          {
            "system": "https://www.mciindia.in/doctor",
            "value": "MAX1234"
          }
        ],
        "name": [
          {
            "text": "Manju Sengar",
            "prefix": [
              "Dr"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "DocumentReference/4c641e52-0d59-4835-8752-e380e89c694c",
      "resource": {
        "resourceType": "DocumentReference",
        "id": "4c641e52-0d59-4835-8752-e380e89c694c",
        "status": "current",
        "type": {
          "coding": [
            {
              "system": "https://projecteka.in/loinc",
              "code": "30954-2",
              "display": "Surgical Pathology Report"
            }
          ]
        },
        "author": [
          {
            "reference": "Practitioner/MAX1234"
          }
        ],
        "content": [
          {
            "attachment": {
              "contentType": "application/pdf",
              "data": "SlZCRVJpMHhMak1LSmNUbDh1WHJwL09nME1UR0NqUWdNQ0J2WW1vS1BEd2dMMHhsYm1kMGFDQTFJREFnVWlBdgpSbWxzZEdWeUlDOUdiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFHdFdkdFMyMVlVZmZkWG5MNjB3SlNECnprMDZ5aHNFT2swblVBaWVhVHFsRDhJSVVHdGJZTXZUcEpuK2U5ZlcvVWFuT2lUTTJDYkcrN0wyMmxjL3N5djIKekR6dVNlVXJvUVBtTVJNYUxxVlZ6R3JCclEwdDI4VHNGN2JHMzlWdmVmaTcrdTMycDJlTEZUdDZ0eExzTklYawpvN2Rid1JaYnlGZlM0RkVHK1NORWJoY1FwejNGbGVmaC8vQ2pmTTIxOEN3VFduTVBtdkIyeUFNclJTbFQxakpsCklWT0VmaWxIZXR4WWJYTTV4dm93M3hmTWV0eTNLbEJNUUxMMHZKQXRWalBZcGdvNXp5eVVYRmdaa3M4ZUUvREMKU2lPWUNqVStKMWtnRExlUWlrK1JSN3JXWG5va1F6dnp1QWg4K0NWTVVGZ3lTYVNwUmNwWkRsTHRrTzl4SFJxdgpzRXdhSGtwZis0MUQybGdlR0sxSzAveGFEcGtHb3pSUUJOaEtrR20rS1V5YkpqT0F6TmtWUHE4OFNZODZ4S00yCm9Zc3NXOGdDR2ZxQkU0SGhnVlJGNEh6QnBURGdTUjA0Y0pLSGl1SkdFUWdiTnd1NHBDRHNsY3hOdyt1Y1U1TkUKQ20rVzgxU3grUVo4Rk56elBFbXVFaUhxWDlySkFWTk81aUJMeVJrbUxlVUlDM3h5WkRhSG9mTzVZSUxONzluZQphYnJJVXY3ZGx1MnorUi9zYko2bldpUDJ2M1hNUWw3a0JUMHJDUzI2MU1LNldpNmlWVHhOQWVWVDF3a2p1ZkpaCm9Ja3VQZkZYdTJpWjNDZUxLRXZTOVVSUFNrVUZuaUZUQXM3REM1UVZaRzdYaTV1OStJR2ZuNXhjZisrbW80bUkKUW5JZ2U2RkU2cDZTODlPYmZTZW8yckZBSlNHVS9GQncwL2ZpaDkxeTZXWi9SNE1JeWZaUkRjZDNkNXQ0dTMwMQpTdEtFcUNyak90Nm02eXhhWk5zM2JxNmdraGJNelY4b3owZG1RSkhrZmo4ZU4zdFp2TXdEZ3F5UlJkYjh4dmErCjJaOEo1TlR2YlA1VE81MmU3c0hBMk0ybU5yd0tsUkJzSjNpQlFKZUdGeWwzVTlCek9yQXZxamc3WEVXSkkwc0UKS2pxVkRjRTBjZ2tOYjlTSk9GdndBdGIvWFhQcWt0QU9uVFRvUEQ0ek5rUkQ3QUgxMTFqWUdNSTI2NGN0ZVhqTQpEaWFDU2hYL1pENXJrbHFHaXFQVEdqd05XSFRnbE5LTmJJRkdMNWxSZG9RT3FLMFRUYStRckNNbHRNRmtNUzQvCnZYZVVYdmNmVEI0VW5GSHJ6K083WkpHNHBrelJsQzJqZW9kc05GcHkwMCtYcVhFdHdXbEUreFJPRWcwTjNVeDAKRk4yRVZRckpYNUw5YXNab2FzZEdnSlI5U0s2elRieCt5QjRkSzNTN1VBblVhQUZtanFtNVM3ZlJneXMzRy9aUQpQaUcyWXhxUzlUYmI3QmJVOWgxOWFjVkNGeXdkMDNPMzI3eGl0bWpwc0JpS0NTMXNEMzB5ZmV1YVpwMXlHRnIrCkFsWlpta1d1SmIzYkxTV3lESFVPVHZSOWVONUY2eXpKUGp1NkFybEY3NkFYMlBWb3dqREMwa0RXUzd3RHQ0SmEKVFhsQysxUW9BdUVqL2JxaVA4UVBhOWYrMnRUVEFQdFpMaDROb1N2Ly9rdkszempsZGp2dFZPam4wN0FJcU1OMgpOZkRxbjFzVUtveTB6Q3NIclppRHp2cmwrUDM3bnkrUDV6LysrcytyWGRIb0RwaTlzSndNdXVacGxNVnVXRFVwClp4Vk53alFmcUg0WlBINklIWlBPbGtTbFo0RXBoM2c2cHVFNi91U0dUNTRHSVN1TngyMEFOYlliNVE5dWtqdkEKNUMwVCswNmZRY0p4TWl0NnByRE1vbGt5alNSQUIrcWFMVjFMa0twcUE3MG94aUdOelh3d0hSL2VwWWRPbU1QcwpmRzdOcmRlYWFZemdmV0RVemI1YlVqV3dDeXFiSkIycldUK21oNjdDSzJ5b1RndnM0YUQ2bVBuTzBOVE5XSU9LCnFNWmE0ZzdXRDIxK1NqaWFla21vOXUvU0JTcHl4c3NiektpU2JmS3dqckxkeHUyYzBDNmhHcjBZbFFIblBKcmEKdXl5OXpxTFZreHVMT3ExU1NOUm5qWE5kWDhIcHUrdkxzNHZyczFNbkpkVnNpalNEZE5vN2hoM1NqVXB0Z0lDUAp4TzBvSEViNk10MStwVmxDb0x0amZJZVNRUkdLaWl2Q1ViR0xMcy9UMjJSWlJSMVh2MG1Yc0haK2xLQmh1c2puCitWbnJHSGF4VzkzR200bklGWHNnMHE0Y1hmQUtMUWZJK1FFU3ZYZHVPemk0VDEwVjFFa29ETTZjUUMxM29hZmcKTXNKQ0ZXV2JaREhkalZubjRDWXdTbUpXeFZWM2VLUzZ4RFNjTTdkM0U2SGxPcitKdEZGZFoxTnJRZzFwRlRlYQpCNlVDRTJFT1dObnorV0RxTkZqSzc1QmRFZ05KaDllUFdUTDFwRmlaM3lrRnVDMEJHOXlSTVUzMTdGOUVUOG4wCmZDcTA0UDVRZ1ZRVS8veVNWYWpwRmJWbG5HWHhabW9zcWx0QlZ3MGQ5LzNTbTU2YWRMMzg3RlRWdXA0Z1RSRVEKWWMxZ1FqOVAxc2xxdDVySTcycXRMOUhLSnplSlI1ejBvR05RUDdmSjM0NmJhNXRWK0xLS2ttZk1pNjl4VnJIQQpaa3gyOXVob2UydE13V3lGc1YvZ2k2ckI2UG1FNis1aWt6eTk0dHBlUm9Hd3dsZEFOQkNSSDRNK2ZMdU0xbis2CkJib2RCZ202dnFSaSs1anVsbmR1T2hxNFpKZ2ZvTWFkY0F4RzJ3UGw1ZXNSaFdPdzc5M3NSYTVqYWJYcktYdzUKQ2ZCSG95MjBHempWa0tKVWZ1d1lsZjNSVFhTRHU5S1V2eU1jbFFMbldhY3kxSUU5UUtjbGJ1cmg5dmpsMkxncAo2Tlk1aFRIcmhUeWpHblN6NzdpaWRyVm9MQVZZbGNpUjRUSi82MHFmOWhxczBkbFFLVVlaK3RGeDZhc29wSFYrCjl4NlYvY2t0Q0IzVDhSMUN5ZjVCY3JtYTNtYVI5bkZ0S3JKcklOK1ZwUjM3MFN0ZnNwODR4SnM4dVBvWENqY04KbFFwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2pVZ01DQnZZbW9LTVRjNU5RcGxibVJ2WW1vS01pQXdJRzlpYWdvOApQQ0F2Vkhsd1pTQXZVR0ZuWlNBdlVHRnlaVzUwSURNZ01DQlNJQzlTWlhOdmRYSmpaWE1nTmlBd0lGSWdMME52CmJuUmxiblJ6SURRZ01DQlNJQzlOWldScFlVSnZlQ0JiTUNBd0lEVTVOUzR5TnpVMklEZzBNUzQ0T0RrNFhRbysKUGdwbGJtUnZZbW9LTmlBd0lHOWlhZ284UENBdlVISnZZMU5sZENCYklDOVFSRVlnTDFSbGVIUWdMMGx0WVdkbApRaUF2U1cxaFoyVkRJQzlKYldGblpVa2dYU0F2UTI5c2IzSlRjR0ZqWlNBOFBDQXZRM014SURFeElEQWdVZ292ClEzTXlJREUwSURBZ1VpQStQaUF2Um05dWRDQThQQ0F2VkZReElESTVJREFnVWlBdlZGUXlJRE13SURBZ1VpQSsKUGlBdldFOWlhbVZqZENBOFBDQXZTVzB4TUNBeU55QXdJRklLTDBsdE1pQTVJREFnVWlBdlNXMDNJREl4SURBZwpVaUF2U1cwNElESXpJREFnVWlBdlNXMDFJREUzSURBZ1VpQXZTVzB4SURjZ01DQlNJQzlKYlRRZ01UVWdNQ0JTCklDOUpiVE1LTVRJZ01DQlNJQzlKYlRrZ01qVWdNQ0JTSUM5SmJUWWdNVGtnTUNCU0lENCtJRDQrQ21WdVpHOWkKYWdveU55QXdJRzlpYWdvOFBDQXZUR1Z1WjNSb0lESTRJREFnVWlBdlZIbHdaU0F2V0U5aWFtVmpkQ0F2VTNWaQpkSGx3WlNBdlNXMWhaMlVnTDFkcFpIUm9JRFE0T0NBdlNHVnBaMmgwSURFM01DQXZTVzFoWjJWTllYTnJDblJ5CmRXVWdMMGx1ZEdWeWNHOXNZWFJsSUhSeWRXVWdMMEpwZEhOUVpYSkRiMjF3YjI1bGJuUWdNU0F2Um1sc2RHVnkKSUM5R2JHRjBaVVJsWTI5a1pTQStQZ3B6ZEhKbFlXMEtlQUh0MExFSkFBQUlBMEgzSDFwZHdDNWdkZW1md00wWQpBUUovQWwzQlZ4UUh2MUlDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDCkJBZ2NBZ3ZuWjFuWENtVnVaSE4wY21WaGJRcGxibVJ2WW1vS01qZ2dNQ0J2WW1vS09ERUtaVzVrYjJKcUNqa2cKTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F4TUNBd0lGSWdMMVI1Y0dVZ0wxaFBZbXBsWTNRZ0wxTjFZblI1Y0dVZwpMMGx0WVdkbElDOVhhV1IwYUNBeE1USXdJQzlJWldsbmFIUWdNVEF4TWdvdlNXMWhaMlZOWVhOcklIUnlkV1VnCkwwbHVkR1Z5Y0c5c1lYUmxJSFJ5ZFdVZ0wwSnBkSE5RWlhKRGIyMXdiMjVsYm5RZ01TQXZSbWxzZEdWeUlDOUcKYkdGMFpVUmxZMjlrWlFvK1BncHpkSEpsWVcwS2VBSHQzYzl1MjhnZHdIRXFCSlo3Q0RUWTJ4NE1FZnNHN1UwRgpETStyTk9nTDdONWNJRmdwRUJCZWl2QVIvQ295Q0lTMzloVklETEM1RlVPNGgzRTc1ZlJIS3Y1VHV6NjB5WEttCndKZUFETXB5Tk45OCtFK1I0RWtJTEY5WHdPKys3dk45eWJNNWFhbUdMM21HTC8yem1iNTdocWtsajl1aXBwWmEKYms1dVVWdkdzcnBybVVoVy9YUXYwaktXelRUeTVISnE4WHE4ME5QbVduNFp5OTRydjg2c3NyblB3N2Q5Vnh3egoxWlhMbDRRd2x0Ym05bFhXRlYzcDhsRmE4bjFXTlBOT3RIU1B0UFRYL2FlNmFicGdnMy85SmpTSHc4ZGkzb2tpCnRCd0c0K3ZXOU5MeTl6TnBxZHBHdFV0M3pPT1Z0ckw1cUtxaGtaWng4MFBjbHRZV29aNWEzRzdjZk9mem9tMnkKSXBKTGE2dFExOUxpVlZEZjJYZ3RzdS9ldDRRaXFGVi9LTnBEbE1OSWp1bSt1bk1KVFZEdm1xWm84emd0UVZxRwpnK3d2dlp4L3pkd2l4OUYwR2w1KzhXVlQ5ZVlYVlpsVHkzVXpIZE5SVGkvQmwxVmpwS1U1dFpTOU9VakxmSTFhCkhrWXVQbm4zemFvclRKQmp1NVJyUU51YUxzNHhuV2xYdU9MbzFFMXdLbHdOVG9kUDAxcWtwWnoyV2hZRUVFQUEKQVFRUVFBQUJCQkJBQUFFRUVFQUFBUVFRUUFDQi8xZUJxQi9aUDBGTHFlWDJTVnZNdS8rTU9UaGpJNEFBQWdnZwpnQUFDQ0NDQUFBSUlJSUFBQWdnZzhPc0szUHk2VC85ZlBUc3QvNWtycGJkdXAxLy9TbVh4cVlSSVIwb3Q0eTRkCm1GR24weEpTYXJsS3lDV2xsb1JZU0VFQUFRUVFRQUFCQkJCQUFBRUVFRWhGb0V6bnQraEhGV21haFlkdGNkU2YKMTMwUnZXVi9ON2RDQWkzdjcrYWM4SGxzRjYvdUpnWnhlU096eTBSZFZPVjBwMlNhTVdteHVVd0NGSEZSbFMyUAo2NmxsMVhUUlc0NHEyM3hUQnZkRDAvVHp6RjdSWkZSUlZadXpzZ3oyTjNrVmM2b3pFVmdyMVc3T3RKcGJvdTR0CklXUWI5WEZ1OGR1OGlOMXl0bjYxT1JjWGZ4NjlaWDJXNWFtMEtGV0U3TzNrY3BFWFhiUkRhQjVZMVdyTXZMUTQKYVlsOEhLbEtqWHB1MGE4T2ZZajYyeENxVldQcDlWcHV1Wnpzb2g1SnFxbkc3SHh1T1hSRjdKWmpsbTNtbHNhcQpQdXBIc01wMHIwdDVyYUJsVC9hN2VYZU8rTVdkNnpyaThQOCt0RStveGNuWkpaVmx6TXBVVXVSYXJkTnBpWHdaClNnZUNFZ1FRUUFBQkJCQkFBQUVFRUVBQUFRUVFRQUFCQkJCQUFBRUVFRUFBQVFRUVFBQUJCQkJBQUFFRUVFQUEKQVFRUVFBQUJCQkJBQUFFRUVFQUFBUVFRUUFBQkJCQkFBQUVFRUVBQUFRUyt2c0NZN2I3K2svNlB6NWpTM0F2KwpRdWFrU0dTNkRxOWw3ak5hbnUxVlhqZmR6NWt2bnowUTRSdGVtK01tczBVSzh5cEtTNnZ5TG9rV3AwMm9hMk5TCmNEbTF0Q21rQktkN2NVbW14Y3NNZGJHbmVKeVAybEdPSTZXT2VZUkQrTm1RbzI3MjBsSStleURDTjZSRnlUYUsKTVBMeklVZGR5YXh3dER5VmtabnBhbFYvQ2luOGQxdyswM3UxLzF1VHdrRXRyekdQNnVqeUpFNjhRYVlON0dOUApJUHQweitFK0FnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJCklJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUEKQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZwpnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDCkNDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0EKQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSQpJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBCkFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2cKZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQwpDQ0NBQUFJSUlJQUFBZ2k4S0dCZWZHVDVCK2FXY3ZseEgwYmMzNC8rcUNVUzBWNU5YVnB1N2QxS0NNMjB1dnhTCkgyVE1VY3VYdWVVVUVLdGwyaDV6eTE5T0hkUFhxZVdxZnJpLzBKb2FaS0JSdXhDVURiNE1tWDduaXYxdm5kMnMKRmlwNEdFWU5Ucm52ODY3YzYwN2I5VVcyeld3K3RaeDkvL0JEQzYzVnp1YmR0L2xlN1hmdmRmL244MHUzdmVuTgo0RHIzZHJkUXd2MHd0VE9tK1pOV2RSWHFZTVp6N3k1M2c3VDB6aS9lb2x6YlY2TXVXeFZLYWRuNndjOHRKazdMClVMdnpzaTJmdHRnWUxsT0xscFlxZE9QV0RlNXRMdHZJMkN4Q1N6WFVkbTY1RHU1aWV6bTR5MVBML1M2MTJJcXkKOVZEN2VSdlozYmplcmdiL3hrd3VickdFKzRIVUlDM2p4YlMvZUIwK2JQUEIvNkZ2Qmh1blJiYlJxV1hVNGVNMgp4R3pwcDJONmRqbTEzSXFMR1RyamR2ZDJTNjNVVFdQYXY4cTU3bXE2UW43WXJtNzltK3Z1TWpQK2JQR1lmZEczCnpZZnlmWGtWc2wyMzNtWi85RCt1N1BiMU1HWkxjZHlQc3k5dDBhblZVVnIyb1N1My9uZkJhWGNoSmpmM1A3UFUKeW5IbmxkT0g2U1JyZ3Q5WjJWQ3BMQ20xUkxnaXZyZ1ozTzkzTHo2MjlBTisrYVBuNWIvaXA1Y2ZpdnJJOHY4UwppUHJYWlhBRUVFQUFnUlFFRXJvbyt1WGZobnB4QzdqVjhxKzFYNHJwNUtWM0trdWZVTXNnYjBxcFVMZmhFRi9ICmh1TTIvNlZZMmMvNzhQUldhNnhGV2k3ZmRGbG1mNHhWOERDdTArWWZRMjh2Ty9md3ZWaHJvekxoZG40dmRSY3IKNFdIYzRwQk95N1VKNzhSRjN0NTk2SXUxMWh1L2FoSnBrWGN1ZjJxVGFSbUdhdm9jSUlGdDVNek42VE9KV0R2SgpvM0UvdHd3Sm5GK0NOY1AwdVpIOTZWRmZwRlhiOS9aNmFrbmdOWlhON1habGJ2MVFSTUo0Tk94WStKKzEzSTk1CmZYNlVNNitlV2xMWWdlOWNicDhtUnJtZjNqYjZ6UEF2ZUEwMnVncGxibVJ6ZEhKbFlXMEtaVzVrYjJKcUNqRXcKSURBZ2IySnFDakl4TVRrS1pXNWtiMkpxQ2pJeElEQWdiMkpxQ2p3OElDOU1aVzVuZEdnZ01qSWdNQ0JTSUM5VQplWEJsSUM5WVQySnFaV04wSUM5VGRXSjBlWEJsSUM5SmJXRm5aU0F2VjJsa2RHZ2dNVFk0SUM5SVpXbG5hSFFnCk56SWdMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbElDOUNhWFJ6VUdWeVEyOXQKY0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5WldGdENuZ0IrLzkvRk5BbwpCUDR4UXd3K1lJOWtBZkdDU0pwR21hTWhNQm9Db3lGQVFRZ0FBQ3ZYM0hBS1pXNWtjM1J5WldGdENtVnVaRzlpCmFnb3lNaUF3SUc5aWFnbzBNQXBsYm1Sdlltb0tNak1nTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F5TkNBd0lGSWcKTDFSNWNHVWdMMWhQWW1wbFkzUWdMMU4xWW5SNWNHVWdMMGx0WVdkbElDOVhhV1IwYUNBeE5qZ2dMMGhsYVdkbwpkQ0EzTWlBdlNXMWhaMlZOWVhOckNuUnlkV1VnTDBsdWRHVnljRzlzWVhSbElIUnlkV1VnTDBKcGRITlFaWEpECmIyMXdiMjVsYm5RZ01TQXZSbWxzZEdWeUlDOUdiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFINy8zOFUKakliQWFBaU1oc0JnQ0lFL3pHQlhQSkJIZGd4VThBQ0s0RCtJeXMvMnlDcEgyVGhEQUFCRUFOeC9DbVZ1WkhOMApjbVZoYlFwbGJtUnZZbW9LTWpRZ01DQnZZbW9LTkRnS1pXNWtiMkpxQ2pFM0lEQWdiMkpxQ2p3OElDOU1aVzVuCmRHZ2dNVGdnTUNCU0lDOVVlWEJsSUM5WVQySnFaV04wSUM5VGRXSjBlWEJsSUM5SmJXRm5aU0F2VjJsa2RHZ2cKTWpVMklDOUlaV2xuYUhRZ01qZ2dMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbApJQzlDYVhSelVHVnlRMjl0Y0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5ClpXRnRDbmdCKy85L0ZJeUdBQVVoOFBQL256OS8vdFhWMWVNdzQ4T1Bpb3FLR2hzYmV6TGxmL3dBR2xCVGc5TjgKSE1ZT0ZXRUFJb2x2Q2dwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2pFNElEQWdiMkpxQ2pVMENtVnVaRzlpYWdvMwpJREFnYjJKcUNqdzhJQzlNWlc1bmRHZ2dPQ0F3SUZJZ0wxUjVjR1VnTDFoUFltcGxZM1FnTDFOMVluUjVjR1VnCkwwbHRZV2RsSUM5WGFXUjBhQ0E0TWpZZ0wwaGxhV2RvZENBeE1UWTVJQzlKYm5SbGNuQnZiR0YwWlFwMGNuVmwKSUM5RGIyeHZjbE53WVdObElERXhJREFnVWlBdlFtbDBjMUJsY2tOdmJYQnZibVZ1ZENBNElDOUdhV3gwWlhJZwpMMFJEVkVSbFkyOWtaU0ErUGdwemRISmxZVzBLLzlqLzRBQVFTa1pKUmdBQkFRRUFaTGEwQUFELzJ3Q0VBQnNTCkZCY1VFUnNYRmhjZUhCc2dLRUlyS0NVbEtGRTZQVEJDWUZWbFpGOVZYVnRxZUptQmFuR1FjMXRkaGJXR2tKNmoKcTYyclo0Qzh5YnFteDVtb3E2UUJIQjRlS0NNb1Rpc3JUcVJ1WFc2a3BLU2twS1NrcEtTa3BLU2twS1NrcEtTawpwS1NrcEtTa3BLU2twS1NrcEtTa3BLU2twS1NrcEtTa3BLU2twS1NrcFAvRUFhSUFBQUVGQVFFQkFRRUJBQUFBCkFBQUFBQUFCQWdNRUJRWUhDQWtLQ3dFQUF3RUJBUUVCQVFFQkFRQUFBQUFBQUFFQ0F3UUZCZ2NJQ1FvTEVBQUMKQVFNREFnUURCUVVFQkFBQUFYMEJBZ01BQkJFRkVpRXhRUVlUVVdFSEluRVVNb0dSb1FnalFySEJGVkxSOENRegpZbktDQ1FvV0Z4Z1pHaVVtSnlncEtqUTFOamM0T1RwRFJFVkdSMGhKU2xOVVZWWlhXRmxhWTJSbFptZG9hV3B6CmRIVjJkM2g1ZW9PRWhZYUhpSW1La3BPVWxaYVhtSm1hb3FPa3BhYW5xS21xc3JPMHRiYTN1TG02d3NQRXhjYkgKeU1uSzB0UFUxZGJYMk5uYTRlTGo1T1htNStqcDZ2SHk4L1QxOXZmNCtmb1JBQUlCQWdRRUF3UUhCUVFFQUFFQwpkd0FCQWdNUkJBVWhNUVlTUVZFSFlYRVRJaktCQ0JSQ2thR3h3UWtqTTFMd0ZXSnkwUW9XSkRUaEpmRVhHQmthCkppY29LU28xTmpjNE9UcERSRVZHUjBoSlNsTlVWVlpYV0ZsYVkyUmxabWRvYVdwemRIVjJkM2g1ZW9LRGhJV0cKaDRpSmlwS1RsSldXbDVpWm1xS2pwS1dtcDZpcHFyS3p0TFcydDdpNXVzTER4TVhHeDhqSnl0TFQxTlhXMTlqWgoydUxqNU9YbTUranA2dkx6OVBYMjkvajUrdi9BQUJFSUJKRURPZ01CSVFBQ0VRRURFUUgvMmdBTUF3RUFBaEVECkVRQS9BTnYrMHJiL0FLYmY5K0gvQU1LVkwrM2Rnb01tVDZ3dVA1aWdDZnpGOWYwcDI0VUFHNFViaFFBYmhTYmgKNjBBRzRVYmg2MEFHOWZYOUtUekY5ZjBvQWR1Rkc0VUFHNFViaFFBYmhSa1VBR1JSa1VBRzRVYmhRQWJoUnVGQQpCdUZHNFVBRzRVYmhRQWJoUnVGQUJ1Rkc0VUFHNFViaFFBbTRVYjE5YUFEY1BXamNLQURjS053OWFBRGNQV2pjClBXZ0EzRDFvM0Qxb0FOdzlhTnc5YUFEY0tOd29BTndvM0NnQmR3bzNDZ0F5S01pZ0F5S053b0FOd28zQ2dBM0MKamNLQURjS1RjS0FEY0tYY0tBRGNLTndvQU53b3lLQURjS1RjS0FGM0NrM0NnQTNDamNLQURjS053b0FYY0tOdwpvQVRldnIrbEc5Zlg5S0FEY1BXbDNDZ0JDNmpxZjBwUE1YMS9TZ0JkNit2NlViMTlhQURjS053b0FOd28zQ2dCCmR3bzNDZ0JOd28zRC9Jb0FOdy95S053L3lLQURjUDhBSW8zRDMvS2dBM2ozL0tqZXZ2OEFsUUFiMTkveU5KNWkKKy84QTN5YUxBSG1yNy84QWZKbzgxZjhBYS83NU5Pd0RzRDBwQ0Jpa0EzYUtkVEdGSlFBVVVBRkdLQUNrQTVvQQpXaWdBcGFBQ2lnQW9vQVNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vR0ZGQUJSaWdRWW9vR0ZGQUJSUUlLS0FDCmlnQXBhQUNpZ0FwS0FDaWdBb29BS0tBQ2lnQW9vQVdpZ0JLS0FDaWdBb29HRkZBQlMwQ0dsYUtCaFMwQUxTYlIKNlVDRTIwWW9HRkxRQVVVQUZGQWdvb0dGRkFCUlFBVVVBRkZBZ29vQWZTSHBTRUpSVEdGRkFCU1VBRkZBQ1VvbwpHTFJRSUtLQUNrb0FLS0JoUlFBVVVBRkZBZ29vQUtLQUNsb0FLU2dBb29HRkZBQzBVQ0Vvb0dGRkFDMFVDRW9vCkFLS0JoUzBDQ2lnQktLQUNsb0FLS0FFb29BS0tBQ2lnQUdlOUxRQWxGQUJSUUFVVUFGRkFDMFVBRklSUUFZeFIKUU1LS0JDMFVBSlJRQVVVRENpZ0Fvb0VGRkFCUlFBVVVEQ2lnQW9vQWZTR2tTSlJRTUtLWUJTVUFGRkF3cGFCQwpVVUFMUlFBbWFLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQUNpZ1lVVUFGTFFJU2lnQW9vR0ZMUUlLU2dBCm83MERDbG9FRkpRQVVVQUZMUUFVbEFCUlFNS0tCQlJRQXRKUUF0SlFBVVVBRkZBQlJRQVV0QUJSUUFVaDZab0EKS0tCaFJRQVVVQ0NpZ0Fvb0dGRkFnb29BS0tBQ2lnQW9vR0ZGQUQ2UTlLUklsRk1ZVVVBRkZBQ1VBVUFGRkFCUwowQUlUU1VEQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BUTV6MEJGTFFBVVVDQ2lnWVVVQUZGQWhycXhLN1hLNFBQCkFPZmFuVUFGRkF3b29BS0tCQlJRTVdpZ1FsRkF3b29BS1dnUVVsQUJSUU1LS0FDbG9FRkZBQlNVQUZGQUJSUUEKVVVBRkZBQzBsQUJTSGs0N1lvR0xSUUlLS0JoUlFBVXRBaEtLQUNpZ0Fvb0FLV2dCS0tBQ2lnWVVVQVBwRDBwRQpqS1dtVUdhVE5BQzVvelFBbWZtQXdmcjJweHBDRUZGTUJhYVRRTVFjODB0QUMwVUFGRkFCUlFBVVVBRkZBQlJRCklLS0JoUlFBVVVDQ2lnWVVVQUZGQWdwYUFFTkZBd29vQUtLQUNsb0VGSlFNS0tBQ2lnUVV0QUNVVUFGRkF3b28KQUtXZ1FVVUFGSlFBVVVBRkZBQlJRQVV0QUJSUUFsSXVTeDlLUXgxRk1RWW94UUFZb29BU2lnQW9vQUtLQUNpZwpBb29BRFJRQVVVQUZGQXg5SWVsSWthYVNtVUZGQUJqRkFIT2FRaFNhTzFNQUZMMDYwQU5Kb29HTFJRQUdpZ0FvCm9FRkZBQlJRQVVVQUxSUUFsRkFDMFVBSlJRQVVVQUZGQUJSUUF0RkFCUlFBVWxBQlJRTVNselFBbExRQVVVQUYKRkFCUzBDQ2tvQUtLQmhSUUF0RkFoS1dnQktXZ0Fvb0FTaWdBb29BV2lnQXBLQUNnSHRRTVdpZ1Fab29BS0tBQwppZ0JLVExiOGJSdHgxelFBdEZBQlMwQUpSUUFVVURDaWdBb29FUHBEU0VKU1lwakRGSndPdEFBQWM1UDVVdElBCm83NHBnTG1tOVRrMGdDbHBqQ2lnUVVVQUZMUUFVbEFCUlFBdEZBQlJRQVVtTUg2MEFMU1VBRkZBd3BhQkNVdEEKQ1V0QUJSUUFVVUFGSlFBVVVERUhORkFCUzBBRkZBQlJRQVVVQ0Zvb0FTaWdZVXRBZ29vQVNpZ0Fvb0FLS0FDaQpnQW9vQVdrb0FLS0JobWtJNUJvQVdpZ0Fvb0FLS0JDMGxBQlJRQVVVQUZGQUJSUU1LS0FDaWdCS0tBSktTa1NKClJUR0dLYUFSeXhCUHJpa0E2a3BnRkE1b0dGRkFCUzBDQ2lnQW9vQVNsb0FTaWdCYUtBQ2tvQUtLQUNpZ0Fvb0EKS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDa29BS0tBQ2lnWVVVQUZGQUJSUUFVVUFMUlFJU2lnWVV0QWdwS0FDaWdBbwpvR0ZGQWdvb0FLS0FDaWdZVVVBRkpRQXRGQUJSUUFVVUFGRkFnb29HRkZBZ29vQUtLQmhSUUFVVUFGSmlnQ1NrCk5Ja1NpbU1DYVNnQXpSUUFocFJ4UU1XaWdRbExRQVVVQUZGQUJTVUFMUlFBVVVBRkZBQ1VVQUxSUUFsRkFCUlEKQVVVRENpZ1F0RkFDVXRBQ1VVQUxSUUFVVUFGSlFBVVVEQ2lnQW9vQUtLQUNpZ0FwYUJCUlFBVWxBQlJRTUtLQQpDaWdRVVVBRkZBQlJRTUtLQUNrTkFDMFVBRkZBQlJRQVVVQUZIZWdRVVVBRkZBQlJRTUtLQUNpZ0FvelFBK2tQClNrU0pRVFRHTnpTMERDaWdCS1dnQXBhQkNVSGlnWVVVQ0Zvb0FNMFVBRkpRQXRGQUJSUUFVVUFGRkFDVUQ2MEEKRkZBQlJRQVVVQUxSUUFVVUFGRkFCUlFBVVVBRkZBQ1VVQUZGQXdvb0FLS0FDa29BVUdsb0VKbWlnQW9vR0ZGQQpCUlFBVVVBRkxRSUtTZ0Fvb0FLS0JoU04wb0FCMHBhQUNpZ0Fvb0FLS0FDaWdBb29BS0tCQlJRTUtLQUNpZ1FVCllvQWZTSHBTRU16U0UweWhSUzBBRkZBQ0Nsb0FLS0JCUWVsQUJSUU1NMFVBRkZBaGFLQUNpZ0Fvb0FLS0FDaWcKQktLQUNpZ0Fvb0FLV2dBb29BU2lnQW9vQVdrb0FLS0FDaWdBb29HSlJRQVVVQUdhTTBBRkZBQlJRQVVVQUZMUQpBVVVBRkZBQlJRSUtLQUNsb0FLU2dBb29HRkI2VUFJdlNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvCm9BS0tCRDZhM1NrSVpRQlRLSFVVQUZKUUFDZzVQVEg1VUFJZC9xdEppVDFYOHFBRVF5TXVTZHB6Z2dpbXpTaUMKSnBKWkFGWHFjVWhHWmJ4ejZsSzl5dHpKQ2dJVlZVNVBIcnppdFNEZUF5U1B2Sy94WXhuNis5QUV0Rk1ZVXRBaApLS0FDbG9BS0tBQ2lnQktLQUNpZ0Fvb0dGRkFCUlFJS0tCaFJRQVVVQVEzSmsyalpUb0N4VDV1dFQxRG9TVVZRCmhEUlFNS0tBRHZSUUFVaG9BV2lnQTc5S0tBQ2lnQmFLQUVvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQkJSUU1LQ00KakZBaU9KV1VuSkpIdlVsSkRDaW1BVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBK2tha1NOeFJUR0ZGQQpCU0dnWXRGQUJTVUFJUWM1QnJGMW1XU2VZVzhhT1VRZ3VRcDZucFNFelZzb1d0N1pZbklZcjNBeFVvUUJ5d3prCjhIbW1BNmlnWVVVQUZGQUJSUUlXaWdBcEtBQ2lnQW9vR0ZGQUJSUUFVVUFMU1VDQ2lnWVVVQUZGQUJTMENFWUgKQjI0QjdacUxiUDhBODlZLysvWi8rS29BWFpQL0FNOUkvd0R2MmY4QUdnclAya2ovQU8vWi93QWFBRTJ6L3dEUApXUDhBNzluL0FCbzJUZDVWL3dDK1AvcjBCcUd5Yi9ucW4vZkgvd0JlalpNVC9yVi83NC8rdlFHb2JKZitlby83CjVvMlMvd0RQWWY4QWZGQXhDa282emZrbEtFbDd6ZjhBamxBdFI2QmdQbWJjZnBpblVEQ2lnQW9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNqTkFCbWpOQWdvb0dGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFENlEwaQpSS0tCaFNVd0NrRkF4YzBVQUZKUUF0R0tBRTZDaWdCYVNnQmFLQUNpZ1F0RkFCUlFBbEZBQlJRQVVVRENpZ1FVClVEQ2lnQXpSUUFVVUFGRkFCUlFBVXRBaEtLQUNpZ0JhU2dBb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlEKQVVkNkFDaWdBcEtBRm9vQVNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCOUlhUklVbApBeEtLWXhwTktLUUMwVXdDaWdBcE0wQUZGQUJSUUFacGFBQ2xvRUZGQUJTVUFGRkFCbWlnWVVVQUZGQUJSUUFVClVBRklUUUFVVUFGTFFBWm9vQUtNMEFHYUtBQ2lnQW9vQUtLQUVvb0FLTTBBR2FNMEFHYU0wQUdhV2dBb29BS0sKQUNpZ0Fvb0FLS0FDaWdCS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQkR4UzBBRkZBQlJRQStrTgpJa1NpbU1Ta29HSlNpZ0JhS0FDaWdBcERRQVVVQUZGQUJSUUFDbG9BS0tCQlJRQVVVRENpZ0Fvb0FLS0FDaWdBCm9vQVNpZ0Fvb0FLRFFBbEdhQUNpZ0FvelFBWnBhQUROSWFBQ2xvQVNpZ0Fvb0FLS0FEdFJRQVVvb0FXaWdBb28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtEUUFVVUFKUzBBRkZBQlJRQVlvb0FLS0FDa29Ba3BEMApwRWlVbE1ZVWxBd3BhQUNpZ0Fvb0FLU2dBb29BS1dnQXhSaWdBb29FRkZBd29vRUZKUU1XaWdBb29BS09jKzFBCkJSUUFsRkFCUlFBVXRBQlNVQUF3UmtIZzBZb0FNVVlvQU1VWW9BTVVZb0FNVVlvQU1VWW9BTVVZb0FNVVlvQU0KVVlvQU1VWW9BTVVZb0FXaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBRW9vQWtwRFNKRzBVeGhTVURDbG9BS0tBQ2lnQktLQUNpZ0Fvb0FXaWdBb29BS0tBQ2lnQXBPCnRBQzBVQUZGQWdvb0FLS0JpVVVBRkZBQmlsb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUFJSXlEbWlnWVVVQ0NpZ1kKVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRgpGQUJSUUFVbEFFbEllbElrYlJUR0ZKUU1Xa3BBRkZNQW9vQUtLQUNsb0FLU2dBb29BS0tBQ2lnQW9KUGFnQW9vCkFXaWdRdEZBQ1VVQUZGQXhLWEZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaFJRQVVVQ0NpZ1lVVUFGRkEKQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkpRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQQpCUlFBNmc5S1JJbEpUR0lhU2tNV2lnQW9vQUtLQUNpbUF0RkFCU1VBRkZBQlNVQUZMUUFsQTVvQVdsb0FLS0FDCmlnQktLQUROR2FBRm9vRUZGQUJSUU1TaWdBcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBcEtBQ2lnQk04WnBhQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VGRkF3b29BSwpLQUgwaDZVaVJLUTB4aUdrRklZdEZNQmFTa0FVVXdDaWdBb29BS1dnQW9vQUtRaWdBb29BTVV0QUJSUUFVVUFKClJRQVVVQVJzSnZuMitYMjI1eitPYVZoTjgrM3l4MDJaQi9ITkFnYnp2bjJtUHRzeUQrT2FHRTN6N1dqSFRaa0gKOGM4MEFEaWI1OWpJT0J0eXA0OWM4ME9Kdm4yTWc2YmNxZVBYUE5BQXdtK2ZhMGZVYmNxZVBYUE5EQ2I1dHJSagprYmNxVHgzenpRTVFpYkp3NmZlR01xZnU5eDE2KzlHMmIrK24zcy9kUDNmVHIxOTZBQUxOa1pkUHZIUHluN3ZwCjE2KzlDck44dTUwUEozWVhxTzJPZnBRQUtKaHMzT2g2N3NMalBwam5pbFZaaHQzT2g0TzdDbms5c2MwQUNpYjUKZHpvZVBtd3BHVDdjOUtGRTN5N25RL0w4MkZQSjl1YUJBcXpmTHVkRGdmTmhjWlB0elFxemZKdWREZ2ZOaFR5ZgpibmlnWUtzdzI3blE0SHpZVWpKOXVhRldVYk56b2NBN3NMMVB0enhRSUZXWWJOem9jWjNZWEdmVEhQRkNyTjhtCjUwT003c0xqUHBqbmlnQVZadmwzT2h3RHV3dlgweHp4UXF6RFp1a1U0QjNZVEdUMjc4VURCVm1HM2RJcHdwM2YKSmpKOWV0QVdZQVprVW5iZy9KMWIxNi9wUUlUYk5qL1dKOXpIM1A0dlhyMDlxQ3MyRGlSYzdjRDVQNHZYcjA5cQpCZ3l5bmR0a1VaWEMvSm5COWV2TkRKTWQrMlZWeUJ0K1RPRDM3ODBBREpNZCsyVlZ6amI4bWNldmZtbFpKVHUyCnlnWkkyL0xuQTc5K2FCQXlTbmRpVlJramI4bWNEdjM1b1pKVHZ4S0JuRzM1TTdmWHZ6UU1jb2NNeExBcWVneDAKL3dBYWRRQWxMUUFVWW9BVEZHS0FERkdLQUNqRkFCaWpGQUJpaWdCYUtBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaQpnQW9vRUZGQXgxRGRLUkkyaW1NUTBDZ1lVVUFMUlFBbEZBQlJRQVVVQUZMUUFVVUNDaWdZVVVBRkZBQm1qTkFCClJRSUtLQmhSUUFVVUFMUlFJU2lnWVVVQUZGQUJTVUFLQlJRSUtLQUNpZ0Fvb0FLS0FDaWdBb29HRkZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0FDaQpnWTZodWxJa2JRYVpRMm5VQUpSUUF0SlFBVVVBRkZBQlJRQVV0QUJSUUFVVUFGRkFBYVNnQW9vQUtXZ0Fvb0FLCktBQ2lnQW9vQUtLQUNpZ0Fvb0FUSHZTMEFGRkFnb29HRkZBQlJRSUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBQlIKUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZKUUEraHVsSQprYlNHbVVBcGFBRW9vQUtLQUVwYUFDaWdBb29BS0tBQ2lnQXBhQUNpZ0FwS0FDaWdBb29BV2lnQW9vQU0wbEFCClJRQURPT2V0R2FBRXp6UzVvQUtLQUNqTkFCbWlnQW9vQU0wdEFCU1pvQUtLQUV6UzVvQVEwWm9BWE5HYUFDaWcKQW96UUFVVUFHYU0wQUZGQUJSUUFVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tBQ2lnWQpVVUFGRkFEcUc2VWlSbEJwbENqcFJRQVVVQUpSUUFVVUFGRkFCUlFBVVVBRkZBQlMwQUZGQUNVVUFGRkFCUlFBClV0QUJSUUFtT2FPOUFCUWFBQ2owb0FLS0FDaWdBbzdVQUZGQUJSUUFVVUFGRkFCUlFBVVVBSGVpZ0Fvb0FCeFIKUUFVQVlOQUJSUUFVVUFGQW9BS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvbwpBS0tBQ2lnQjFCcEVqRFJUS0Zvb0FLS0FFb29BS0tRQlJUQUtLQUNpa0FVVXdDbG9BS0tBRW9vQUtLQUNpZ0FvCm9BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNrb0FLS0FGcEtBRm9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCMUJwRQpqVFNVeWhhS0FDaWdCS1NnQmFLQUNpa0FVVXdDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLTTBBRkxRQVVVCkFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBbExRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVUKQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBNmcwaVJwb0ZNb0tTZ0JhUwpnQW9vQUtLUUJSVEFLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUVCQjZITktBQU1DZ0Fvb0EKS0tBRW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUZGQXdvb0FLS0FIVUdrU01OTFRLQ2tvQUtLUUJSVApBS0tBQ2lnQmFLQUVvb0FLU2dBb29BV2lrQVVVd0NpZ0JhU2dBb29BS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FTaWdCYUtBRW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQkFBQmdEQXBhQUNpZ0FwQWMKMEFGRkFCUlFBdEZBQ1V0QUJSUUFVVUFGRkFCUlFJS0tBQ2lnWVVVQUZGQURxRzZVaVJuZW5VeWhLU2dBb29BSwpXZ0Fvb0FLS0FDak5BQmtVMG1nQW9vQUtLQUNpZ0JhS0FGb29BS1NnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBCkNrb0FXaWdBb29BU2lnQmFRODBBRkZBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTWW8KQU1VWW9BS0tBRnBLQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0IxSTNTa1NJS1dtTVNpZ1lsSlFBdApBcEFMUlRBS0tBRW9vQVNpZ0Fvb0FLS0FDbG9BS0tBQ2xvQVNsb0FLS0FDaWdBb29BUHhvb0FLS0FFcGFBQ2lnCkFvb0FTaWdCYUtBQ2pGQUNVVUFMUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBNmtha1NKMm9wakNpZ1lsRklBb29BS1dtQQpVbEFCUlFBbEZBQlJTQVdpZ0Fvb0FLS1lCUzBBRkZBQlJRQVVVQUZGQUJSUUFsRkFCUzBBRkZBZ29vQUtLQUNpCmdCYUtBQ2lnQktLQUNpZ0Fvb0dGRkFCUlFBbEZBQlMwQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUYKRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFPcERTSkVvcGxDVVVnQ2lnQW9wZ0ZGSUFvb0FaSk5IR3lLNwpoUzV3dWU1b0VpczdLRGxseGtlbEFEcUtBRU9lMUxUQWJKSXNVYk8yY0tNbWs4d0NNdTRNWUF5ZHhIRklCVElvCmtXUCtKZ1NQb01mNDA2Z0F6VVVWMUZLUUVZL01NcmxTTnc5UmtjMEFTa2dESjdVMVpGYllWeVE0eUNCeFFBK2oKTk1CSTNXUkE2SEtzTWcrdE9vQUtLQUNpZ0FwS0FDaWdCYUtBQ2lnUVVVQUZGQUJSUUFVdEFDVXRBQlNVQUZGQQp3b29BS0tBQ2lnQktLQUNpZ0FwYUFDaWdBb29BS0tBQ2tvQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQjFJYVJJbEZNb1NpZ0FveFFBVVVBRkZJQW9vQXEzVVlrdUlVYk9DcjgrbkFxdWtyQVgKTFNxZHdLS3dCS2pQVE9mVHY5S0JDaG1LU0tqL0FDK2RHQVVZbkFKWE9EUk5FVVc2S21RYkZESjh4NE9PMzVVVwpBV1lFelRCNVZqUEhsczJSampxT2ZYTlQzbTRSTGpkdDNydjI5ZHVlYUFLMHFxME4wSS9tZzJncmpwdTV6ajlLCnMzc2ViS1pFWFB5SEFGQUVYbHh5WEVPdzdvL0xiQlVuSFZlOVJndmlFU05pSUdRWmNuR1EyRnlmcDYwQVhMZFMKTGNBeUNUcmhoemtaNHF2YVJNTFdDVnp1OHVMNVVWY0hwL1B0UUJIRVBNa1lLbzJ0Q1NWWEpHZU9DVDFOT2lEZQpYYkNFRVlpWUhqR0d3T3RGZ0MzajRWbFlCeEdRNmlNaGljZnhIUFdpR0RZMXNWakkzeEVTRWpyd09EUUJMWWxJCnJGTW9WS2dCd0VPYy9URldES3E3c2h2bElCK1U5LzUwQUJsVWJzN3ZsSUIrVTkvNTBHWkJ1enUrVWdIQ2s5ZjUKMHhnMHlMdXp1K1VnSDVUMy9uUTB5SnZ6dStUR2NLVDEvblFBTk1pNzhrL0pqZGhTZi8xME5LaTc4N3ZreG41VAovazBBRFNvdS9PNzVNWitVbi84QVhRMHFydXp1K1hHZmxKNi96b0FVeXFOMmQzeWtBL0tlOUJsVUU1RDhFTDl3Cjk2QkI1bzU0ZmhndjNUL25IdlI1b3pqYS93QjdiOXcvNXg3MEFBbEJ4OHI4c1Y1VTl1LzBvV1VOdCtWL21KSEsKa1l4NitsQUFKUWR2eXVOMmNaVThmWDBvV1VOdCtWeHVHZVZJeDlmU2dBV1VIYjhyamN1N2xUeDlmZjJvV1VOdAp3ci9NdTRaVWpIMTlEUUFMS0dDL0s0M0RQS2tZK3RDeUJ0dnl1Tnd6eXBHUHI2VUFBa0JLamE0M0RQS25qNitsCkN5aHRueXVOd3p5cEdQcjZVQUN5QnR2eXVOMmVxa1krdnBRSkEyMzVYRzdQVmNZK3RBQXNvTzM1WEc0RThyMCsKdEN5YnR2eXVOd3p5dlQ2MERFRW9PMzVIRzVkM0s5UFkrOUFsQng4ajhydTVVOGUzMTlxQkI1by91UDhBZDNmZApQNWZYMm9Nb0FQeU9jTHU0VS9sOWZhZ1lOS0YzZks1MnJ1NFVuUDA5NkdsQzdzbzUyZ0hoU2M1OVBXZ0FhVUx1CitWenR4MFVuT2ZUMW9hVUx1K1J6dHgwVTgvVDFvQURJRjNmSzUya0RoU2M1OVBXZ3lBYnZsZjVjZEZKejlQV2cKQWFRTHUrVnp0OUZQUDA5YVV5QWIvbGM3Um5oU2MvVDFvQUdrQTNmSzUyalBDbm42ZTlCa0FKRzErRjNmZFA1ZgpYMm9BUE1IOTF2dTd2dS81NW9FZ3lQbGZsZDMzZjArdEFDQ1FIYjhyamN1N2xUeDlmZWhaUTIzNVhHNWQzS25qCjYrOUFBSlFRRHRmbGQzM0QrWDE5cVBOWDBmN3U3N2g2ZjQrMUFBWlJnbmEvQzd2dUg4dnI3VUdVTHUrVnp0WGQKd3A1K25xYUFCcFF1N0t2OG9CNFVuUDA5YUdsQzdzcTUyNDZLVG5QcDYwQUtaUU4zeXY4QUtRT0ZQZW4wQUZGQQpCUlFBVVVBRkZBQlJRQVVVQUZGQWdvb0FLS0JoUlFBNmtJK2JOSWtTa3BsQlJTQUtXbUFVbEFCUzBnRW9wZ0ZHCk9sSUFwYVlDVVVBRkZBQlJRQVVVQUZMUUFVVUFGRkFDVVVBTFJRQWxMUUFVVUNDaWdBb29HRkZBQlJRQVVVQ0MKaWdBb29HRkZBQlJRQVVVQUZGQUJSUUFVbEFCUzBBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVWxBQzBVQQpGRkFCUlFBVVVBRkZBZ29vQUtLQmhSUUFVVUFPb1BXa1NOcERUS0VvcEFMUzBBRkpUQUtNMGdETkxRQWxGTUFwCmFBQ2tvQUtLQUNpZ0Fvb0FLV2dBb29BU2lnQW9vQU0wVUFGTFFBVXRBZ3BLQUNqTkF3b29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FTbG9BU2xvQUtLQQpDaWdBb29BS0tCQlJRQVVVRENpZ0Fvb0FkUWV0SWthYVNtVUpSU0FUTk9Cb0FXaW1BbEpRQVVvTklCYUtBRW9vCkFLV21BbEZBQlJRQVVVQUxSUUFVbEFCUlFBbEZBQlM0b0FVQ2lnQmFLQkNVVUFGRkF3b29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0E1ejdVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVQpVQUZGQUJSUUFVVUNDaWdZVVVBRkZBQlJRQTZnMGlScHBLWlFsRkFCaWtwQU9CcGMwQUZCcGdJUlNVZ0s5MDUrClNJU2VXWFAzczRJQTYvNTk2U082Wm9JaUFHa2M3T3ZHUm5QOGpRQXlPZDFhUUZRWkhtMmdidUI4b1A4QUxtbFcKYVJHbHlnWmpLcWdidU9RS0FIUGNzcnNnVlN5S0dQSjVKendPUGFuL0FHaHZOVmRvVUVBZ3VjWnoySHVLQUZpbQpNa2pxUXFsYy9LVDgzWHJqME5OdFlwbzJrTXNtOEU4ZmtLQUxGRk1Bb29BS0tBQ2lnQXBLQUZvb0FLV2dBb29FCkZGQUJSUU1LS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLU2dBb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0EKQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVRENpZ0Fvb0FLU2dCOUJwRWpEUlRLRW9vQUtLUQpDVW9OQURzMFV3Q2t4UUJHWWxNbThqSnhpb3piSnlSbFR2M2dqc2NZb0VIMlpOcEc1c2x0KzdQSWIxcHkyNkRPClN4SmNPU1QxSS84QTFVQU9hRUdRdXJzakVZTzNIUDVpaVNFU0VibllxQ0R0NHdTT2ZUTkFBSVI1b2taMllqSVUKSEdCbjhLa0l5TWRLQmpSSGpIenR3dU92WDMrdElFd1I4N0hDNDYvcjlhQUFSNHg4NzhMdDY5ZmY2MGVYeGplMwozZHZYOWZyUUF2bDlmbmZsZHZYOWZyU0dNSFB6UHlBUHZkUGY2MEFEUmh0M3pNTnd4dzJNZlNneGc3dm1jYnNkCkdQR1BTZ0FNWU83NW5HNGc4TjArbEJqem41bkdTRHdlbjBvQURIblB6dU1rSGc5S0RIbmQ4NzhrSHIwK2xBQVkKODd2bWNiaUR3ZW4wcFRIbmQ4ekRkam9lbjBvQUNtZDN6TU4yT2g2ZlNncG5kOHpqZGpvZW4wb0FER0R1K1p2bQo5RzZmU2d4Zzd2bWNic2RHNlk5S0FBeGc1K1p4a2c4TWFER0RuNW01WUg3eC93QTRvQVBMSFBMY3R1KzhmODQ5CnFQTEdRY3Q5N2Q5NC93Q2NlMUFBSWxHT1dPQ1R5eDcwTEdxaGNGdmx6akxFL242MEFJc1NydHdYK1VFRExFL24KNjBxeHF1M0JiNVJnWlluOC9XZ0FFWUdPVzRYYjk0OVA4ZmVnUmdiZVc0WGJ5eC96bjNvQUJHRjI0TGZLTURMRQovd0Q2L3JRSTFHM2x2bEdCbGovay9XZ0FXTlYyNExmS01ETEUvd0Q2NkZqVmR2TGZLTURMRS9uNjBBS3NhcnR4CnUrVVlHV1ArVFNDTlYyNExmS01ETEUvbjYwQUFqVmR1QzN5Z2dmTWY4bWhZMVhiamQ4b3dQbU5BQUlsVURHNzUKVjJqNWowL3ozb0VTakgzdUYyL2VQVC9QZWdBOHBmOEFhKzd0KzhlbitlOUJqVWc1M2NqYWZtUFNnQkdpVnQyZAozekRCd3hIL0FPcWhva2JkbmQ4Mk00WWpwL0tnQlRFcDNaM2ZNUVRoaU9uOHFERXAzWjNmTVFUaGoyL2xRQUdKClR1Kzk4eEJPR0k2Zi9xb01hbmRuZDh4QlB6SHQvS2dBTWFuZHkzemRmbVA2ZWxLMGF0dXpuNXVEeWFBRWFOVzMKWno4d3dmbUk0b01hbmRuUHpEYWZtUFNnQTh0ZXZQM2R2M2owL3dBOTZQTFhqcnd1Mzd4NlVBQWpVWXhuZ2JSeQplbEFpVUVZM2NMdEh6SHAvbnZRQWVVbkgzdUYyL2VQVC9QZnJSNVMvN1gzZHYzajAvd0E5K3RBQVlsSUkrYmxkCnYzajAvd0E5NkRFcmJzbHZtR0RoaVA4QTlWQUEwU3R1enUrWVlPR0lvTVNuZG5kOHhCT0dQYitWQUFZMU9jN3UKU0Q5NDlxREV2UExjc0crOGV2OEFoN1VDSDBVRENpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVNpZ0I5STFJawphYUtaUVVsQUJSUUFVbElCUWFVR21BdEZBQ0drTkFDVVpvQVVHbG9BV2lnQXBLQUNpZ0Fvb0FLS0FDaWdBb29BCktLQUNpZ0FwYUFDaWdBcEtBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQmFTZ0FwYUFDaWdBb29BS0tBQ2kKZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQVNpZ0I5STFJa2JSVApLQ2lnQW9vQUtTZ0JLS1FEZ2FXbUFVaG9BU2t4UUFVb05BQ2cwdEFCU1VBRkZBQlJRQVVVQUZGQUJSUUFVbEFCClJRQXRGQUJTMEFGSlFBVXRBQ1V0QUJSUUFVVUFGRkFCUlFBVVVBSlJRQVVVQUZMUUFVVUFGRkFDVVVBRkZBQlMKMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlNVQUZGQUQ2UnFSSTJscGxDVQpVQUZGQUJSUUFsSlNBS1VHZ0JjMFpwZ0ZKUUFob3BBS0tYTk1BelJRQVVsQUJTMEFGSlFBdEZBQlJRQVVZb0FTCmlnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQVNpZ0JhS0FFb29BS1dnQW9vQUtLQUNpZ0JLS0FDaWdBcGEKQUNpZ0Fvb0FLS0FDa29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2tvQUtLQUgwaDYwaVJLS1pRbApGQUJSUUF0SlFBVW1LQURGSmlnQmFLUUMwWXBnSmlqRkFCUlFBSE9PT1RUUTBuR1l4OTNQM3UvcC93RFhvQVVOCkp4KzdIM2NuNXVoOVAvcjBtWk1mNnY4QWh6OTd2NmYvQUY2UUFXa0djUmcvTGtmTjFQcC85ZWd0SUEySXdTQUMKUG02bjBwZ0RHUWJ0cUE0QTIvTmpQK0ZETklOMjJNSEdOdnpZejYvU2dBTFNBdGlNRUFqSHpkZlg2VUZwQnV4RwpEZ2dENXVvN21nQUxTZk5pTWNFQWZOMUhyUVdrK2JFWU9DQVBtNmp1YUFBdEo4Mkl3Y0ViZm02ajE5cUMwZzNZCmpCd1J0K2JyNi9TZ0FacEJ1eEdEakczNXZ2ZjRVTVpCdTJ4ZzR4dCtiR2Y4S0FCaklOMjJNSEdOdnpZei9oUVQKSU4yRUJ4amI4M1gvQUFvQUNaT2NJRGdnRDV1bzllbEJhVEp3aTQzQUQ1dTNjOVAwb0FDWmNIQ0w5N0ErYnQ2OQpPdnQrdE9YY2M3bEE1NHdjNUZBQzB0QUNVVUNDakZBeGFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQXBLQUNsb0FTbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQjlIZWsKU0ppakZBd3hTWXBnRkZBQzBZb0FNVW1LQURGSmlnWW1LV2dBcHdvQU1VbUtCQ1lvb0dHS1hGQUJTMENDaWdBbwpvQU1VWW9BS01VQUdLTVVBR0tNVUFHS01VQUJGSmlnQmFNVUFHS01VQUdLTVVBR0tNVUFHS0tBQ2lnQXhTWW9BCk1VVURDaWdRdUtNVUFKUmlnQmNVbEFCUlFBWW9vR0ZGQWdvb0FLS0JoUlFJS0tCaGlpZ0Fvb0FLS0JCUlFNS0sKQUNpZ0Fvb0VGRkF3b29BS0tCQlJRTUtLQUhVRWdkYVJJbTRVYmhRTVRkN0dqUHNhQURQc2FUZDdHbUFieDcwdQphUUJ1eDFvM1o2VUFHZlkwYnZVR21BWnpTRWdVRERjS0NjYzBBS0NLV2tJVE5IRk1BSlVkNk53OWFRQnVGSnVwCmdMdUZKdTlqUUFieFM3eDYwQUc0VWJ4U0N3dTRldEc0ZXRBV0RjS053b0FOd28zQ2dMQm1rM2lnQmR3bzNEMW8KQU1pakk5YUFETkdSUUFaRkxrVUFKa1V1UjYwQUp1SHJSa1VBTFNaSHJRQVpGR2FBRGlqaWdBcGVLQUV5UFdqYwp2clFBbVJTN2g2MHdESTlhT0tRQmtVWkZNQXlQV2pJb0FNaWpJOWFBRE5HUlFBY1VaRkFCa1VaSHJRQWNVVUFHClJSa1VBSEZHYUFESW96UUFtYU9LQUZ5S1ROQUJSa1VBR1I2MFpGQUJrVVVBTFJRQW1hTWlnQXlLTWlnWWNVbVIKNjBBUHBzaFBha0lZQ1RTN2pUR0c0MGJqU0FOeG9ER21BdTQwbTQwZ0ZGR1RUQU54cE54cEFHNDlxVEo3MHdFcApjbnRRQWJqUzdqU0FUY2ZXa3kzcWFBRkdSM3BhWUJ1eFNaYWdCUWFYSm9BTnhwUHdvQVRtakpvQU9hUHdINVVBCkdhTnhvQU54cGR4b0FUY2FNbWdBeWFYTkFCazBtVDFvQVhjYU56VUFHVFJ1TkFCdk5HNzJGQUJ1TkdXTkFCa2kKbDNHZ0JNMHU0MEFHVFNaTkFCazBialFBWnpSbkhZVUFMbWs0OUJRQWZnS00wQUx1UGFqZFFBWm9vQU4xSm42VQpBTG1pZ0FvNDlLQUQ4QlNZSG9LQURHS1dnQXpSbjJGQUIrRkdmYWdBK2dGTGoxNW9FR0I2Q2pBb0FUQTlLWDhLCkJoZ1VjZWxBZzQ5QlJ4NkNnQXo3VVpvQU0wY2VsQXd6N1VaSHBRSU1qMEZHUjZVQUdSNlVaSG9LQUhVamRhUUQKY1VtS1l4TVVVQUdLWEZBQlFCUUF0SWFBRW9Bb0FVQ2lnQXhtbHhRQWhGSUJRQXVLWEZBQlNZb0FOdExpZ0FwSwpBQ2pGQUM0b3hRQVlwTVVBR0tNVUFHS1hGQUJpakZBQmlqRkFCaWpGQUJpakZBQmlqRkFDWXBjVUFHS1dnQk1VCllvQU1VWW9BTVV1S0FFeFJpZ0FBb3hRQVlveFFBWW94UUFZb3hRQVlveFFBWW94UUFZb3hRQXRGQUJSUUFVVUEKSlJRQXRGQUJSUUlLS0JoUlFBVVVBRkZBQlJRQVVVQUZKUUFVVUFGSmlnQ1NrUFdrU0pSaW1NVEZGQXd4UlFBVQp0QUNFMGxBQlMwQUZHS0FGb29BS01VQUZKUUF0R0tBQ2lnQW9vQUtLQUNqRkFCUlFBVVVBRkZBaGFTZ0Fvb0FLCktBQ2xvQUtTZ0JhS0FDa29BS0tCaFJRSUtLQUNpZ0Fvb0dGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUEKRkZBQlJRQVVVQUZGQUJSUUFVVUFHYUtBQ2lnUVVVQUZGQUJSUU1LS0FIVUhyU0pFb3BqRW9vQUtLQmhRYUFHMApVQUxpZ0NnQmFLQUNrb0FLS0FDbG9BV2lnUVVsQUJSUU1LS0FDaWdBb29FTFJRQVVVQUZGQUJSUUFVVUFGRkFCClJRQVVVQUZKUUFVVUFGTFFBVVVBRkZBQ1VVQUZGQUJSUUFVVUFGRkF3b29BS0tBQ2lnUVVVQUZMUUFsRkFDMFUKQUpSUUFVVURDaWdRVVVBRkZBQlMwQUZGQUJSUUFVbEFCUlFBNmc5YVFoS0tZd3BLQUNpZ1lVaG9BS0tBRnhSUQpBVWxBQlJRQVVZb0FXaWdBb29FRkZBQlJRTUtLQUNpZ0Fvb0FLS0JCUlFBdEpRQVV0QUJSUUFVVUFGRkFCUlFBClVsQUJSUU1LV2dRVVVBRkZBQ1VVQUZGQUJSUUFVVURDaWdBb29BS0tBRm9vRUZKUUF0RkFCUlFBVVVBSlJRTUsKS0FDaWdRVVVBRkZBd3BhQkJSUUFVbEFDMGxBQlJRTWRRYVJJbEZNWWxGQXdvb0FRbWt6UUFDbkFVQUZGQUNVbApBQlM0b0FYRkJvQVNpZ0Fvb0FXa29BS0tBQ2lnQW9vQUtLQUNsb0FLS0FDZ1o3MEFMUlFJS1RyUUFEZ1V0QUJSClFBVVVBSlJRQVVVRENpZ1FVdEFDVVVBTFJRQWxGQXdvb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUZGQUJTMEFKUlEKQVVVRENpZ0Fvb0VGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0IxSTFJa0tLWXhLU2dZWnBLUUJRQlRBY0JSUUlNMApsQXhLS0FGQXBhQkJSUU1LS0FFb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tCQlJRQVVVQUZGQUMwCmxBQlJRTUtLQUNpZ1FVVUFGTFFBVWxBQlJRQVVVRENpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0EKb29BS0tCQlJRTUtLQUNpZ0Fvb0FLS0FDaWdBb29BZFNOMXBFaVVVeGlVbWFRd29vQUFLY0tZQlJRQTAwVUFLQgpTNG9BV2tvRUZGQXdvb0FLS0FFcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQW9vRUZGQUJSUUFVVUFGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0sKQkMwVUFKUlFBVXRBQlNVRENpZ0Fvb0FLS0FIVWpVaVJLUTB5aEtTZ0JRS1VDZ0JhS0JDRTBoTkF3cFFLQUZvbwpBS0tBQ2lnQXBLQUNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vCkFLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VMU1UKQUZGQUJSUUFVVUFGRkFCUlFNS0tBSFVqVWlSS1EweWhLQlFBdExRQVVsQUJSaWdCYUtBQ2lnQW9vQUtUTkFCUgpRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUm1nQW9vQUtLQUNpZ0FvCm9BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29FRkZBd28Kb0VGRkF3b29BS0tBSFVqVWlSS1NtVUpTMEFMUlFBVVVBRkpRQVV0QUJSUUFVVUFGSlFBVWV0QUJSUUFVVUFGRgpBQlJRQVV0QUJTVUFGRkFCUlFBVVVBRkZBQzBVQUZGQUNVdEFDVVk0b0FLTWMwQUZGQUJSUUFVVUFMU1VBRkxRCkFVVUFGRkFnb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkEKQlJRQVVVQU9wR3BFamFLWlFoQUl3UmtlbE9vQUtLQUNrb0FNMEFab0FYRkZBZ29vR0ZGQUJSUUFVVUFGRkFCUwpVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQWdvb0dGRkFnb29BS0tBQ2lnWVVVQUFvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVURDaWdBb29BS0tBQ2lnQW9vQUtLQUMKaWdBcEtBSDBqVWhEYUtZeGFLQkJSUU1TaWdCS2NLQUZwS0JCUlFNS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGcEtBRgpvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VGRkFCUlFNS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDCmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVRENpZ0Fvb0FLS0JDMGxBQlJRTUtLQUNrb0FmU04KU0VOcGNVeGhSUUlLU2dZVWxBQ2dVdEFCUlFBVVVBRkZBQlJRQVVVQUpTMEFGRkFDVVVBRkZBQlJRQVV0QUNVdApBQ1V0QUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVDQ2xvQUtTZ0JhU2dBb29HSUtLQUgwamRhUWhLV20KQWxGQXhLS0FDaWdCYUtBQ2lnQW9vQUtTZ0Fvb0FLS0FDaWdBb29BV2tvQUtLQUNpZ0Fvb0FLS0FDaWdCYUtBQwppZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvCm9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JDMFVBRkpRQVVVQUZGQXdvb0FkUWV0SWtTa3BqQ2tvR0pTNG9BVVUKVUFGRkFCUlFBbEZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVQpVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBQlJRSVdpZ0FwS0FDaWdBb29HRkpRQStnMGlSdEpUS0Nrb0FYRkxpZ0Fvb0VGRkF3b29BU2kKZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLSwpBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vCkFLS0JCUzBBSlJRQVVVQUZGQXdvb0FkU0drU0lhU21VRkdLQUZvb0VGRkFCUlFNS0tBRW9vQUtLQUNpZ0Fvb0EKS0tBQ2lnQW9vQUtXZ0FwS0FDaWdBb29BS0tBQ2lnQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ1FVVUFGRkFDMGxBCkJSUU1LS0FDaWdCMUlhUWhwcEtZeFJTMEFGRkFCUlFJS0tCaFNVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRgpBZ29vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVVQU9wCkc2MGhEVFFCVEdMUlFJS0tBQ2lnWVVVQUpSUUFVVUFGRkFDMGxBQlJRQVV0QUJTMENFcGFBQ2lnQXBLQUNpZ0EKb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlIzelFBVVVBRkZBQlJRQVVVQUZGQWdvb0FLSwpCaFJRQVVVQ0NpZ0Fvb0dGRkFCUlFBVVVBRkZBQWVLS0JCUzBBSlJRQVVVQUZGQUJSUU1LS0FDaWdCMU5iclNFCkppbEZNWVVVQ0NpZ1lVVUNDa29HRkxRQVVsQUMwVUFGRkFCUlFBVVVDRm9vQUtLQUNpZ0Fvb0FLU2dBb29HRkYKQUJSUUFVVUFGRkFnb29HRkZBQlJRQVVVQUZGQWdvb0dGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0FDaQpnQW9vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBZ29vR0ZGQWdvb0FLS0JoUlFBVWxBRDZROWFRaEtCVEFLS0JoClJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVDRm9vQUtLQUNpZ0Fvb0FTaWdBb29BS0tBQ2lnWVVVQUZGQWdvb0cKRkZBQlJRQVVVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaFJRQVVVQQpGRkFCUlFBVVVBRkZBZ29vR0ZGQUJSUUlLS0FDaWdZVVVBRkZBRHFROWFRaEtCMHBqQ2lnQW9vQUtTZ0FwYUFDCmlnQW9vQUtLQUNpZ0Fvb0VGRkFCUlFBVVVBRkZBQlJRQVVVRENpZ0Fvb0VGTFFBbEZBQlMwQUpSUUFVVURDaWcKQW9vQUtLQkJSUUFVVURDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW94UUF0SgpRSUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBZ3BLQmo2UTlhUWhLQjBwakNpZ0FwS0FDaWdBb29BV2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JDMFVBRkZBQlJRQVVVQUZKUUFVVUFGRkF3b29FRkZBQlIKUU1LS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBhQkNVVUFGRkF3QnlNMApVQUZGQUJSUUlLS0FDbHpRQWxGQXdvb0FkU0drSVE5S0IwcGdGRkF4S0tBQ2lnQXBhQUNpZ0Fvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnUVVVQUZGQUJSUUFVVUFGRkFDVXRBQ1VVQUZGQUJSUUFVVUFGRkEKd29vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FNMFVBRkZBQlJRQVVVQUZGQUJSUQpBVVVDQ2lnWVVVQUZGQUR1OUlhUWhEMHBNQWpCRk1ZdEZBQlNVQUZGQUJTMEFGRkFCUlFBVVVBRkZBZ29vR0ZGCkFCUlFBVVVBRkZBQlJRQVVVQUZMUUlLU2dCYUtBRXBhQUNpZ0Fvb0FLS0FDaWdCS0tBRm9vQVNpZ0Fvb0dGRkEKQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQzBVQUZGQQpCUlFBVVVBRkpRQS92U0hyU0VOTktLWXdvb0FLS0FDa29BV2lnQktLQUZvb0FLS0FDaWdBb29BS1NnQmFLQUNpCmdBb29BS0tBQ2lnQW9vQUtLQkMwVUFKUzBBRkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVXRBQ1VVQUZGQXdvb0EKS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUVvb0FXaWdBb29BS0tBQ2lnQW9vQUtLQQpDa29BZlNIclNFTlBTbHBqQ2lnQW9vQUtLQUNrb0FXaWdBb29BS0tCQlJRTUtLQUNrb0FLS0FGb29BS0tBQ2lnCkFvb0FLS0FDaWdBb29FRkZBd29vQVdpZ1FVVUFGRkFCUlFBVVVBRkpRQXRGQUNVVURDaWdRVVVEQ2lnQW9vRUYKRkF3b29BS0tBQ2lnQW9vQUJSUUFVVUFGRkFCU1VBRkZBQlJRQUVaR1A1VXRBQlJRQVVVQUZGQUJSUUFVVUFGSgpRQStrTklRMDBVeGkwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFKUlFBdEZBQ1VVQUZGQUJSUUF0CkZBQlJRQVVVQUZGQUJSUUFVVUNGb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0JoUlFBVVVBRkZBQlJRQVVVQUZGQUIKUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsRkFDMFVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0JpVVVBUHBEU1FocDZVVQp4aTBVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVsQUJtak5BQm1pZ0F6UlFBVVVBRkZBQlJRQVV0QUJSUUFVClVBRkZBQlJRQVVVQUZMUUlLS0FFcGFBRW9vR0ZGQWdvb0FLS0JoUlFBVVVBSFdpZ0Fvb0FLS0FDaWdBb29BS0sKQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ1FVVUFGRkFCUlFBbEZBeDlJYVFoRFNkcVl3RkxRQQpVVUFGRkFoYVNnQW9vR0ZGQUJSUUFVVUFGSlFBbEZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBdEZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBZ29vQUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUNEdlJRTUtLQUMKaWdBb29FRkZBd29vQUtLQkJSUUFVVUFGRkFCUlFBVWRLQUNpZ1lVVUFPcERTRU5QU2p0VEdBcGFBQ2lnQW9vQQpLS0FDaWdBb29BU2xvQUtLQUNpZ0JNVVlvQU1VVUFGR0tBREZHS0FERkdLQURGTFFBVWxBQlJRQXRKUUFVVUFMClJRQVVVQUZGQUJSUUFVVUNDaWdBb29HRkZBQlJRQVVVQUZGQUJSUUlLS0JoUlFBVVVBRkZBQlJRSUtLQmhSUUEKVVVBRkZBQlJRQVVVQ0Zvb0FRNXdjY0dpZ0Fvb0FLS0FDaWdZWm96UUFVVUFGRkFEcWFhUWtKU1V4aTBjNVBIRgpBQzBVQUZGQUJSUUFVbEFDMFVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkpRQVVVQUZGQUJTMEFGCkZBQlJRQVVVQUZGQUJSUUFVdEFoS0tBQ2lnWVVVQUZGQUJSUUFVVUNDaWdZVVVBRkZBQlJRQVVVQUZGQUJSUUEKVVVBRkZBQlJRQVVVQ0Zvb0FLS0FDa29BS0tCaFJRQUdrb0FXaWdBb29FT3BwcEFoRFNDbU1YR2NjNHBhQUNpZwpCS0tBQ2lnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLU2dCYUtBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUU1LS0FDaWdBb29BS0tCQlJRTUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0sKQUNpZ0Fvb0VGRkFCUmtaeG5uMG9BV2lnQktLQmhSUUFVVUFGRkFCUm1nQjFOTklTQ2dDbU1LS0FDaWdCS0tBQwppZ0Fvb0FqTXdFdmxoR1pzYnVNZEtkSEtzbWRwT1ZPQ0NNRVVnSEVnZFRTMHdDaWdBb29BS0tBQ2lnQW9vQWprCm1XTmtVZ2xuT0ZBK21hWUxxTWhjYmlTL2xrWTVVKzlJQ2JORk1Bb29BS1JtS3FTRkxZSFFkVFFBdEFJT2NFY2QKYUFGb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BSwpLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVUFGRkF3b29BU2lnQjVwdElRVVV3Q2lnQXBLCkJoUlFBVVVBRkZBRmJJR29FRWovQUZYOWFpZGdacDV3eEVlMVk5eW5HVGs5L3dBZXYxcENHT3daSmtMZ2haWXoKZ01UZ1pYUFA1MUtXM1N1aG44c2dxVTU2akE2Yzg4NW9BdEp0M3Zoc3R4a2JzNC9EdFR0dzNiY2pkak9NODRwagpFOHlQWVgzcnRCeG5QSHBTN2xEQmNqY1JrRFBOQUNHUk5yTVhYYXZVNTRGS1dVTUZMREo2RFBXZ0JONllZN2x3CnYzdWVuMW8zcjh2ekQ1dnU4OWZwUUFiMXl3M0Q1ZXZQVDYwb0lJQkJCQjZFVUFWYnZQMm0wQUlCM3QxLzNUVEoKb0ZoOHI1aVM4NFptUFVrZzBoRFJJRkx4bVI4Q2ZhdVgvd0JrSEJQWEhXbXh5R1JZRU16Y3p1cDJ2MUEzWUg2QwpnWXN4S3gzbUpaTXhLQ3Z6bmo1Zjg5YWtsZnlwWnYzamhmSjNuRFpJT1R5TTlQNVVDR05LNkdmeTMzWWpWZ3FzCldJNU9jZStLZE84WXRMaVNDY245M2tZZklVK3VhQmo3ZzdaR2NOdVVBWlZYSVplZW85YytudFJDSXdic08yd2UKWWR4M1l3Tm81ejJvRVcrM3RUQkxHVlZnNmtQOTA1Kzk5S1l4d2RTektHQlplb3p5S2FKWXlpc0hVcS9DblBCKwpsQWgyOVN4WGNOeWpKR2VsTjg2UGFqZVl1MXpoVG5nL1NnWW9kQ3pLR0JaZnZEUElwQk5HVVJ3NmxYNFU1Ni9TCmdCUTZseWdZYmdBU1BTa0VzWlJYRHJ0WWdLYzhIUFNnQmQ2N3ltNGJnTWtaNXhTTExHMjNhNm5lTXJnOWZwUUEKQ1dNN2NPUG1PRjU2MCtnUVVVREZwS0JCUlFBVVVEQ2lnQW9vQUtLQUNpZ1FVVURDaWdBb29BS0tBQ2lnQW9vQQpLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUZvb0VGSlFBVVVBRkZBeEtLQUhIbWtwQ0NpbUF0RkFDVVVEQ2lnQXBLCkFDaWdCQ3FucW9QMUZMaWdBd1BRVVlIV2dCYU9PdEFCZ1l4amlqSE5BZzJqQkdCZzlhTURJT09SMG9BTURuZ2MKOWZlamFPT0J4MDlxQURBNTQ2OWFBTURBNG9BUXFEaklCeFFRRDFBT1BXZ0FLcWM1VWM5ZUtOcW5zUFdnQmNEMAo2MFlIcFFBQlFPZ0F4UmdlZ29BUXFwSUpVRWpvY1V1QjZEbWdCYVRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRCk1LS0JCUlFNS0tBQ2lnQW9vQUtLQkJSUUFVVUFGSnprWXhqdlFBdEZBd29vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQVNpZ0JhS0FDZ1VBTFJRSUtLQUVvb0FLS0JoUlFBNmtOSVFsRk1ZWm96bWdRVVVEQ2lnUVVVRENrb0FLS0FDbApvQUtLQUNpZ1F0RkFCUlFBVVVBRkpRQVVVQUxSUUFVVUFGRkFCUlFBVWxBQlJRQVVVQUZGQXdvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVBTFNVQUZGQXdvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0EKS0tBQ2lnUXRGQUJTVUFGRkF3b29BZFNHa0lhd0JHQ0FSNzBVeGdhS0FDbG9BV2tvRUZGQXdvb0FTaWdBb29BVwpnVUFMU1VDQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0Fvb0dGRkFCUlFBVVVBRkZBQlJRCkFVVUFGRkFCUlFBVVVDQ2lnQW9vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlEKQVVVQUxTVUNDaWdBb29BS0tCanFRMGhEVFJUR0ZGQUMwb29FQnBLQUNpZ1lVVUFRRzQyWFBsT01LUU5yZTV6dwpmeXB3aytkdzJBcWdITklCd2tRZ01IVWduR1FhUVN4a0FpUmNFNEhJNitsQURpNmdnRmdDZWdKNjBwT0JrOFVBCk1rblNPQjVjaGxRRThIMHBZeTVCSktFSG9WcGdRSmR0NWNVam9Oc2o3T0R5RG5INDFKRE9KTWhpb2JjeWdaNjQKT0tRRXU5ZDIzY00rbWVhVHpFempldjUwQUhteDlkNjRKeDE3K2xCZFF3VXNvWTlBVHlhTGdMdlhkdDNEZDZaNQpvRHFSa01wR2NaejNvQVVNRG5CQnh3YVdtSUtTZ0FwYUFDa29BV2tvQUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBCkJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFncGFBQ2lnQW9vQUtLQUNrb0FLS0JoUlEKSUtNVUFGRkF3b29BS0tCQlJRQVVVREhVaHBDR21nVXhoUlFBdEpRQUEwdEFCUlFBVVVBVjJqRWswcXVwS01pagpweDFQZjhxaUtUTEZJSkZFaERLQWNaM0RqbkhxUFQyb0VNYU5tRXVZM2JkTkcyV1VjZ2Jjbmo2R25UeHN5M2UyCk01WUFENWZ2Y1VBT2VQTXNxeVJ1NnlFRlNwSUhRY0huamtaL0dwYmxXWkZLamR0ZFdJOVFEUUJEUEc3TGRNaXQKaDR3b0dPV09Eemo4UVB3cTRPZ29BcldjSUVFWmtRNzFKSURaNE9UemcxR0ltQ0ErV2QzMmdzVHQ1eHU2L2xRQQpBT1pvajVicUZsWWtBY0FFTno3NXlLUVFmNkVvOHI1dk1CSTI4NDM1L2xRQXMwSmI3YnRpNVpBRitYcWNIcFJjCmgzTWdXTi92STNDL2VBSUpKK25wMW9BZkVwRHRISkN6SHpDNnZqajJPZlVEaWxTRmx1bVVZOG9rUzQvMnZUOU0KL1dnQ3hHVk83Q0ZmbTV5TVpQclNoc3NWMm5qdmpnMEFOOHo1RmJZL3pFREdPUjlhZHUrZmJ0UFRPZTFBeHBrKwpSbTJQeG5qSEorbE9MWUtqYVRudjZVQUlHeVcrVnZsL1g2VWJ1Rk8xdm03ZW4xb0FVTjh4RzBqSGZzYVRlZHF0CnNibkhIR1I5YUJDN2p1SzdUd001N0dtN3pzVnZMZkpPTWNaSDYwREhaTzRydFBUT2UxTjN0c1Z2TGZKSUJYakkKK3ZOQUNoaVhLN1NBQU9lTUdrRG5ZcmVXK1RqNWVNajY4MEFMdU84cnRPQU03dU1VZ2NsQTNsdUNjZkx4a2ZyUQpBN2NkKzNhY1l6dTdmU2hHTERKVXJ5Umc0L3BRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQ0NpZ0JhTTBBRkZBQ1VVQUxSUUFVVUFKUlFBVVVEQ2lnQW9vQUtLQUNpZ0IxSWFRaHAKb0ZNWVV0QUJTVUFMUlFBVVVBRkZBQlJRQWxMUUFVVUFGRkFDTXlvcFppQUIzTk5XV05tMmh4dXhuSGZIMG9BVgpIVjFES2NxUmtHblVBRkZBQlRZNGtpQkNBakp5Y2trL3JRSWZTVUFGRkF3b29BS0tBQ2lnUVVVRENpZ0Fvb0FLCktBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBLQUZvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUsKS0FDaWdRdEZBQ1VVQUZGQXhLS0FGb29BS0tBQ2lnQktLQUgwaHBDR21pbU1XaWdBcEtBRm9vQUtLQUNpZ0FvbwpBU2xvQUtLQUNpZ0NyY0UvYkxZTjl3bHYrK3NjZjFxd1ZCSVA4UTZHZ0NwSEpKS2JOMmNqZWhaZ09oT0Ivd0RYCnFTT1Z6S1lXYjUxZko0L2c3SCtsSUN6UlRBS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FGb29BS0tBQ2lnQW9vQVNsb0FLS0FDa29BS0tBQ2xvQQpLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUVvb0FmU0drSVEwZ3BqRm9vQVNpZ0JhS0FDaWdBb29BS0tBRW9vQVdrCm9BV2tvQVIwV1JkcmpJNjBpeHFweU1rOU1saWY1MEFORnZFRmpVS1FJL3U0WThVUkkyOXBKQW9ZOFlVNTRHZjgKYUJFdEpRTUtXZ0Fvb0FTaWdCYUtBQ2lnQXBLQUZvb0FLS0JCUlFNS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaQpnQW9vQUtTZ0FwYUFDaWdBb29BS0tBQ2lnQXBLQUNpZ0JhS0FDaWdCRFJRQXRKUUF0RkFCUlFBVVVBRkZBQlJRCkFVVUFGRkFCU1VBUHBEMXBDRVBTZ1V4aFJRQVVVQUZKUUFVdEFCUlFBVVVBSlJRQXRGQUNVVUFGRkFDMFVBSlIKUUFVVUFGRkFCUlFBVVVBRkZBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsRkFCUgpRQVV0QUJTVUFMU1VBTFJRQVVVQUZKUUFVdEFCUlFBVVVBRkZBQlJRQWxGQUJSelFBdEZBQlJRQVVVQ0NpZ1lVClVBSlJRQSttbnJTRWhEMHBhWXdvb0FLU2dBcGFBQ2tvQVdpZ0JLS0FDaWdCYVROQUJSUUFVVUFHYUtBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBRE5GQUJTMEFGRkFCU1VBTFJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVVVBSm1rM0QxRks2Q3doZFIvR0IrTkhtSi9mWDg2CkxnSG14OTNYODZWV0RES2tFZXhvdUE2aW1BVVVDQ2lnWVVVQUpSUUErbW1rSkNIcFNpbU1LS0JCUlFNU2lnQW8Kb0FLS0FJakFDU2ZNbEdmUnpSOW5IL1BTWC92czBySUEremovQUo2Uy93RGZabyt6ai9uckwvMzJhTElCREFELwpBTXRaZisrNlBzNC81NnkvOTltaXlEVVg3T1ArZWt2L0FIMmFQSS82YXkvOTlVV0RVUTIvL1RhWWY4RG8removCkFKNnkvd0RmZEZrR29mWi8rbXN2L2ZkSDJjZjg5WmYrK3pSWkJxSDJjZjhBUFdiL0FMN05BdHgvejFsLzc3b3MKR29mWmgvejFtLzc3TkgyWWY4OVp2Kyt6UUdvZlovOEFwck4vMzNSOW1IL1BXYi92NGFka0dvZlpsLzU2emY4QQpmdzBmWlYvNTZUZjkvRy94b0FQc3EvOEFQU2IvQUwrdC9qUjltWC9ucE4vMzliL0dqUVFuMlZQK2VrMy9BSDliCi9HbCt5cC9mbS83L0FEZjQwcklZRzFUKy9OLzMrZjhBeHBQc2tmOEFmbS83L3Y4QTQwV0FYN0pIL2ZtLzcvUC8KQUkwZlpZeC9GTi8zK2Y4QXhvQVBzMGY5NmIvdjgvOEFqUjlrai92VGY5LzMvd0FhQUQ3SkgvZm4vd0MvNy80MApmWlkvNzAzL0FIL2YvR21BZlpJLzcwMy9BSC9mL0dqN0pIL2ZtLzcvQUwvNDBBSDJXUEgzcHY4QXY4LytOSDJXClArOU4vd0IvMy94b0FQc2tmOTZiL3Y4QVAvalI5a2ovQUwwMy9mOEFmL0dnUWZaSS93QzlOLzMvQUgveG8reXgKbitLYi92OEFQL2pRQWZaWS93QzlMLzMrZi9HbCt5eC8zcGYrL3dBLytOQVdEN0xIenpMejZ5dC9qUjlsaS82YQpmOS9HL3dBYUFEN0xGL3QvOS9HL3hvK3l4LzhBVFQvdjQzK05Bdyt5eGY3Zi9meHY4YVQ3TEYvMDAvNytOL2pRCkFmWkl2Ui8rL2pmNDBmWll2UnYrKzIveG9BUHNzWCszL3dCL0cveG8reXhmN2Y4QTM4Yi9BQm9BWDdORjZOLzMKMmY4QUdqN05GNk4vMzJmOGFCQUxhTCs2ZisralI5bWgvdWZxYUFEN05EL2MvVTBmWm9lZjNZNXBXUXcreXdmOAo4MW8reXcvODh4UlpBSDJXRHI1U242MG4yUzMvQU9lS2ZsVEFYN0piL3dEUEpmeW8reVc1NndvZndvQVQ3SmIvCkFQUEZQeW8reDIvL0FEeFQ4cUFEN0piL0FQUENQL3ZrVWZaTGIvbmhILzN5S0JXRDdKYi9BUFBDUC92a1VmWTcKYi9uM2kvNzRGS3lHSDJPMi93Q2ZlSC92Z1VmWTdYL24yaDQvNlppaXlBUHNkci96N1EvOSt4Uy9ZN1hwOW1oLwo3OWltQWZaTGIvbjNpLzc0Rkw5bXR4MGdpLzc0RkYyS3lGRUVJNlJSai9nSW84aUwvbmtuL2ZJb3V3c2hSRkdPCmthRC9BSUNLY0FBTUFBRDJvQ3d0RkF3b29BS0tBQ2tvQUtLQUgwaHBDRUk0b0ZNQmFLQUVwYUFFeFJRQVVVREQKRkZBQlJRQVVHZ0JLV2dBb29BS0tBQ2tvQUtXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDbG9FSgpSUU1LS0JCUlFBVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0FwYUFDaWdBb29BCktLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQWRTVWhBYVFkS1lDMFVBRkxTQUtURkFCaWpGTUFvb0FUTkcKYUFDaWdBb3pRQVVVQUZGQUMwVUFKUlFNV2tvRUZGQUJSUU1LS0JCUlFBVXVPbEFCaWpGQUJpakZBQmlqRkFCUgpRQVlvb0FLS0FDaWdBeFJpZ0Fvb0FLTVVBR0tNVUFHS01VQUZGQUJpaWdBeFJpZ0F4UmlnQXhSUUFsRkF3b3hRCklXa3hRQVlvb0dGRkFCUlFBVVVDQ2xvQUtLQUVKd01uOUJTMEFGR0tBQ2lnQXhSUUFVVUFGRkFDMDBnazhVZ0cKa1BqdCtkQURZN2ZuVEFYbjJwUnU5cUFEbWpuMm9BT2FXa0FtVFNnMHdEbjFGSjgxSUE1OXFUbW1BYzBVRENqdgpRQUFtaWdBelJRQVpvNW9BS09mU2dCZWFTZ0F6UlFBVWMrbEFoZWFLQURuMHBQd29BV2pKOUtBRnlmU2szSDBwCkFMazBaOXFBRFB0UmsrbEFCejZVblBwUUF1VDZVbVQ2VUFHVDZVWlBwVEFNbjBveWZTZ0JlZlNrSlBvYVFCdVAKOTAwYnY5azBBSnU5alM3ajZHbUFaUHBSdVBvYVFCdVBvYU4zc2FBRGQ3R2pKOURUQU1uMHBOM3NhQUYzZTFHZgphZ0EzSDBwTi9zYUFGMzU3VWJqL0FIVFFBWlBwUm1nQTU5S1RkanNhQURmN0g4cVhQdFFBYzBaOXFBRFBzYUtBCkNqbjBvQU9mU2pkN1VBR2UrS1RmN0dnQTNmN0ovS2pKL3VtZ0F5MzkwMHVUL2ROQUJrK2xKdVA5MDBBRzQvM1QKK1ZMbHV5bWdBeTM5MmtKUDkwMEFHVy91bWt5MzkwMEFHNC8zVFNibS91bWdaTlREU0VocE5KbmltTUJrMHRBQgprMFpvQU1taWdBcE9hQUROTG1nQXpTNW9BTTBab0FTaWdBb29BS01VQUZGQUJSelFBYzBjMEFGRkFCUzVvQUtNCjBBSlJRQVVVQUZGQUJSbWdBeWFYTkFCbWpOQUNabzVvQVdpZ0JPYU0wQUxSUUFab3pRQVVtVFFBWk5MbWdBelIKbWdBelJRQVVVQUpTMEFKUzBBRkZBQlJRQVVVQUZGQUNVdWFBRE5MUUFacEtBRG1qSm9BVVVab0FNMFpvQU0wWgpvQU0wWm9GWU0wYnFBc0c2amRRQWJxTjFBdzNVYnFCRHFhZWFRSVEwZ0ZNWXVLS0FFb29BWEZHS0FDakZBQmlqCkZBQ1VZb0FLV2dBeFJRQVVZb0FLS0FDaWdBb29BS01VQUdLS0FDaWdBb29BU2xvQUtNVUFGRkFCUmlnQk1VWW8KQUtYRkFCUzBBSlJRQVVVQUZGQUJSUUF0SVJRQVlveFFBbEdLQUZvb0FLS0FGb29BU2lnQW9vQUtXZ0JLS0FDaQpnQW9vQVdpZ0Fvb0FLS0FDakZBQmlreFFBWW94UUFVVUFGR0tBREZHS0FERkdLQUV4UmlnQ1NtbmlrSkNVaTlLCll4MUZBQ1VVQUZMUUFVVUFGRkFDVVVBRkZBQlJRQXRGQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUEKVVVBTFNVQUZGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCU1VBTFJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVsQUQ2WVR6U0Vnb0hTbU1XaWdBb29BCktLQUNpZ1FVVUFKUlFNS0tBQ2lnQXBhQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwYUFERkdLQUQKRkZBQlJRQVVVQ0NpZ0Fvb0FLS0JoUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCUlFBVVVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0FDaWdBb29HT3BtS1FrRkM5S1l4YUtBQ2lnQW9vRUZGQUJSClFBVVVEQ2lnQW9vQUtLQUV6bWlnQmFTZ0JhU2dCYUtBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JCUzBBRkZBQlJRQWwKRkFCUlFBVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVQpVREVwY1VBRkZBQlJRSUtLQUZwS0FDaWdZVVVBRkZBRHFiU0VnTk5YcFRHT29vQUtLQUNpZ0Fvb0VGRkF3b29BCktLQUNpZ0FwS0FDbG9BS0tBQ2tvQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vRUZGQUMwbEFDMFVBRkZBQ1UKVUFGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQW96UUFVVUFMUlFBVVVBRkZBQlJRQQpVVUFGRkFCUlFJS0tCaFJRQVVVQUpSUUErbTBoSVNrRk1ZNmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnCkFvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29FRkZBQlJRQVVVQUZMUUFsRkFCUlFNS0sKQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQktXZ0JLTVVBRkZBQlJRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQgpSUUFVVUFGRkFDVVVBU1V3MGhJU2tYcFRHT29vQUtXZ1FsSlFNS0tBRm9vQVNpZ0Fvb0FLS0FDaWdBb29BS0tBCkNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BQlJRQVVVQUZGQUJSUUFVVUFGRkEKQlJRQVVsQUJSUUFVdEFCUlFBVVVBRkZBQlNVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRQVVVQUZGQUJSUUFVVQpBRkpRQkpURFNFaEtGcGpGb29BS1dnUWxGQXhLS0FGb29BVEZHS0FDaWdBb29BS01VQUZHS0FDaWdBb29BS0tBCkNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLVE9hQUZvb0FLTTBBRkZBQlJRQVVVQUZGQUJSUUEKVVVBRkZBQlNVQUxSUUFVVUFGRkFCUlFBVVVBRkppZ0JjVW1LQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9QSXhRSQpLS0JpVVVBUHBwcENRVWdwakZwYUJDR2t6UU1NMHRBQlNVQUxSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFDVVVBRkZBQlJRQVVVQUxSUUFsRkFDMFVBRkZBQlJRQVVVQUZOWlEzV2dBQ2tmeFordEtBZTlBQzBVQUZGQUIKUlFBVVVBRkZBQlJRQVVVQUZGQUJTVUFMUlFBVVVBRkZBQlJRQVVVQUZGQUJtbG9FSlJRTUtLQUNpZ0Fvb0FLSwpBQ2lnUVVVQUZGQXhLS0FIMDJrSkJTQ21NV2xvRUpTVURDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBCm9vQUtTZ0E1ejE0b29BS0tBQ2lnQXBhQUNpZ0JLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVQpBRkZBd29vQWRUVFNFaEtLWXd6UmttZ0Fvb0FXaWdBb29FRkZBd29vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnCkFvb0FLS0FDaWdBb29BV2tvQUtXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQUtLQUNpZ0Fvb0FTaWdCYUtBQ2lnQktXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FIVQowMGhJS1NtTURSaWdCYUtBQ2lnUVVVQUxTVURDaWdBb29BS0tBQ2tvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBCkNpZ0Fvb0FLS0FDaWdBb29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnQXBhQUNpZ0Fvb0FLS0FDa28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BVGNDY2Q2S0FIMDJrSkJSVApHRkZBZ29vQUtLQmhSUUFVbEFFZm5ISi9kU2ZrUDhhVHpqL3p4bC9JZjQwdFFEenovd0E4WmZ5SCtOSG5IL25qCkwrUS94bzFBUE9QL0FEeWsvSWY0MGVjZitlTXY1RC9HalVBODQvOEFQS1gvQUw1bzg3L3BsTC8zelFGdzg4ZjgKODVmKytEU2VlUDhBbm5ML0FOOEducUYwSG5qL0FKNXkvd0RmQm84OGY4ODVmKy9abzFDNkR6eC96emwvNzROSApuLzhBVEtYL0FMNW8xQzZGODcvcGxMLzN6U2VlZitlTXY1RC9BQnBBTDV4LzU0eS9rUDhBR2p6ai93QThKZnlICitOR29CNTdmODhKZnlIK05JWm0vNTk1Zi9IZjhhZW9BWm4vNTk1Zi9BQjMvQUJvODUvOEFuM2wvOGQveHBDdUgKblA4QTgrMHY1ci84VlI1ei93RFB0TCthZi9GVURGODEvd0RuMmwvTlAvaXFUenBQK2ZXYjgwLytLb0FQT2svNQo5cGZ6VC80cWw4NlQvbjJsL05QL0FJcWdBODZUL24ybC9OUC9BSXFrODUvK2ZhWDgwLzhBaXFBRHpuLzU5cGZ6ClgvNHFnVFNmOCtzdjVwLzhWUUF2blNmOCswdjVwLzhBRlVlZEpuL2oybC9OUC9pcUFEenBQK2ZXYjgwLytLbzgKNlQvbjFsL05QL2lxWUI1MG4vUHRMK2FmL0ZVZWRKL3o3Uy9tbi94VkFyaDUwbi9QckwrYWYvRlVlZEovejdTLwptbi94VkFCNTBuL1B0SithL3dDTkhteWY4KzBuNXIvalFGdzgyWC9uM2IvdnBmOEFHanpaZitmZC93RHZwZjhBCkdnTGkrWkwvQU04Ry93QytoU2ViTC96N3QvMzBQOGFBdUhteS93RFB1My9mUy80MHZtU2Y4OEcvNzZIK05BN2kKZVpML0FNOEQvd0I5Q2p6WmYrZmR2KytoUUs0ZVpMbi9BRkRmOTlDanpKcy82ai94OFVEdUhtVGY4KzUvNzZGSAptUzUvMUIvRmhRSzR1K1gvQUo0LytQMG0rYi9uaVA4QXZ1bHFNTjgzL1BFZjk5Ly9BRnFOOC84QXp4VC9BTCtmCi9XbzFBTjAvL1BKUCsvaC93bzNYSC9QS1AvdjRmOEtBRGRjZjg4WS8rL2gvK0pwTjl4L3p4ai83K0gvNG1nUWIKN2ovbmpILzM4UDhBOFRTbHJqL25sSC8zOFA4QThUUUFtKzQvNTR4LzkvRC9BSVViN2ovbmpILzM4UDhBOFRRRgp4ZDF4L3dBOG92OEF2NmYvQUltamRjZjg4b3YrL2gvK0pvR0c2NS81NVJmOS9ULzhUUnV1UCtlVVgvZncvd0R4Ck5NUVp1UDdrZi9mWi93QUtYOS82Ui9tZjhLQUFlZjM4djlhTVQrc2Y1SC9HZ1ltTGorL0Yvd0I4SC9HbDIzSC8KQUQwai93QytEL2pTQU1UL0FOK1AvdmcvNDBZbi92eC85OEgvQUJvQU1ULzM0LzhBdmcvNDB1MmJqRWtmL2ZzLwo0MHdGUVNBbmV5dDZiVkkvcWFmUUFVVUFGRkFCUlFCRVl3cmJsNis5Tjh5WCs0T25yM3BBV3FaUUpDMGxNQW9vCkFLS0FDaWdZVVVBSlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlEKQVVVQUZGQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUNVVUFGRkFCUlFBVVVBTFJRQWxGQUJSUUFVVUFGRgpBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBZ29vR0ZGQUNVbUJRQkxVWjYwaElXZ1V4aFJRQVVVQUZGQUJTClVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkYKQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVdEFCUgpRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaVVVQVBwcHBDUWxGTVl0RkFCUlFBVVVBSlJRQVVVQUZGQUJSUUFVClVBRkZBQlJRQVVVQUZGQUJTVWdGcEtBQ2ltQVVVZ0NpZ0Fvb0FLS0FDbHBnSlMwQUZGQUJSUUFVVUFGRkFCUlEKQVVVQUZGQUJSUUFVVUFHYU8xQUJSUUFVVUFGRkFCU2RxQUZORkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRgpBQlJRQVVVQUZGQUJSUUFVVUFKUlFCSlREU0VoS0tZeGFLQUNpZ0Fvb0FLU2dBb29BS0tBQ2lnQW9vQUtLQUR0ClJRQVVVQUZKNjBBTFJRQWc3MHRBQlJRQWQ2QlFBVVVBSHJTZXRBQU9sTFFBVUNnQW9vQU8xRkFCUlFBZDZLQUEKMFVBRkZBQlJRQVVVQUdLS0FDaWdBb29BS0tBQ2lnQW9vQUtURkFDMFVBRkZBQlJRQVVZNW9BS0tBQ2lnQXBhQQpDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FIMDAwaElLU21NV2lnQW9vQUtLQkJSUU1LS0FDa29BS0tBQ2lnCkFwYUFFb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FFcGFBQ2lnQW9vQUtLQUZvb0FLS0FDaWdBb29BS0tBQ2kKZ0Fvb0FLS0FDa29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2dVQUxSUUFVVUFGRkFCUlFBVQpVQUZGQUJSUUFVbEFCUlFCSlREU0VncEtZeGFLQUNpZ0Fvb0VGRkFCUlFNS0tBRW9vQUtLQUNpZ0Fvb0FLS0FDCmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVMKaWdCYUtBQ2tvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQURBeFMwQUpTMEFGSlFBdEZBQlJRQVVVQUZGQUJSUQpBbExRQWxGQUQ2YWFRa0ZKVEdGRkFCUzBBRkZBQlJRQVVVQUZGQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsTFFBVWxBQzBVQUYKRkFDVVVBRkZBQlJRQVVVQUZGQUJSUUFVdEFDVXRBQlJRQWxMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQWxGQUQ2YgpTRWdwS1l4YUtBRXBhQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnQW9vQUtUblBRWW9BV2lnQW9vQUtLQUNpZ0Fvb0FLCktBQ2lnQW9vQUtLQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNrb0FXa29BS1dnQW9vQUtLQUNpZ0FwS0EKQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCS0tBSDAwMGhJS0tZdwpvb0FTbG9BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLV2dBcEtBQ2lnCkFwYUFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGcEtBQ2lnQmFLQUNrb0FLTTBBTFJRQWxGQUJSUUFVVUEKRkZBQlJRQVVVQUZGQUJTMEFKUlFBdEZBQlJRQVVVQUZGQUJSUUFVVUFKUlFBK20waElLS1l3cEtBRnBLQUZvbwpBS1NnQW9vQVdpZ0Fvb0FLS0FHazQ2MHRBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUxSClFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVbEFDMFVBSlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVUKVUFGRkFCUlFBVVVBTFJRQVVVQUZGQUJSUUFVVUFGRkFDVVVBUE5OcENRVVV3Q2lnWVVsQUMwbEFCUlFBVVVBTApSUUFVVUFGSlFBaktHR0NBUjcwdEFCUlFBVVVBSlMwQUZGQUJSUUFVVUFGRkFDMFVBRkZBQ1VVQUZGQUMwVUFGCkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0SlFBVVVBRkZBQlJRQVVVQUZGQUIKUlFBVVVBRkxRQVVVQUZGQUJSUUFVVUFGRkFCUlFBbEZBRDZiM3BDUVVVeGhSUUFVbEFDMGxBQlJRQXRGQUJSUQpBVWxBQlJRQVVVQUZKUUF0RkFCUlFBVVVBRkZBQlJRQVVVQUZMUUFVVUFKUlFBVXRBQlJRQVVVQUZGQUJSUUFVCmg0b0FXa29BS1dnQW9vQUtTZ0Fvb0FLS0FDbG9BU2lnQW9vQUtLQUZvb0FTaWdBb29BS0tBQ2lnQW9vQVdrb0EKS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCS0tBSDAya0pCU0NtTVdpZ0Fvb0FLS0FFb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDaWdBb29BS0tBQ2lnQXBhQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnCkFvb0FLU2dBb29BS0tBRnBLQUNpZ0Fvb0FLS0FFcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BU2lnQjlNNzBoSVdpbU1LS0FDaWdBb29BS1NnQXBHWUtDU1FBTzVvQXFTNnBaeEhhWmd4LwoyUm4rVlYyMXkyejhxU3QrQS94cHFMQUJya0I2eFM1N1l4L2pVMFdyV2toQUxsRC9BTFF4UTRzQzVISWtpN2tkCldIcURtblVnQ2lnQW9vQUtLQUNpZ0Fvb0FTaWdBb29BV2lnQW9vQUtLUUJSVEFLS0FGb29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBRW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVdrb0FLS0FDaWdBb29BV2lnQQpvb0FLS0FDaWdBb29BS0tBQ2lnQktTZ0NRMHp2U0VoYUtZd29vQUtLQUNrb0FLUm1DZ3N4QUE1Sk5BR2ROcWhrCmZ5cktQenBPNTdDcWswVFNReXpYMXl6bUxyRW5HMDloNmZwVnBXQXRXTmhzTzZhQzNDRVpBNVpnZmNtb3JHOFAKbVNvRlJtY3MwUUJHZVA0VDZkS053TEdsSjVsbHVtUUVzN0hrWnp6VU1zQzNFMHFXMXRiZ1IvS1daU01uMEdLTAo2Z1ZMaTJXejJ5cGNDQ2JHVEdDU1FmcU8zMXFlMTFpUkF2MnBDeUhvNmpHZjZVTlgxQTFvWm81NHc4YkJsUGNWCkpVQUZGQUJSUUFVVUFGRklCS0tZQzBsSUJhS1lCUlFBVVVBRkZBQlJRQVV0QUJSUUFVVUFGRkFCUlFBVVVBRkYKQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCbWlnQW9vQUtXZ0FwS0FGb29BS0tBQ2lnQQpvb0FLS0FDaWdBcEtBQ2t4UUJJYWFldElTRW9GTVl0RkFCUlFBVWxBRFpaRWlqWjVHQ3FPcE5ZTjllU1hRM1kyCjI0YkNxZURKVFhjQ2V6UVhETWlUdkFWNWpXTTRCWDFQY25QV2tXSjd2YklmbVdYTVUyenBrZEcvUVZWd0VudTUKb1VFVDNjVGJlUDNReXpmWHNLSVpveEZFc05oTzNsa0VPb3dTZnJpaTNZUFVkYlR0YURtMXZBdU9qSElIMDRGSgpEZHFKNVd0cm1KUkkyU2t5a1lQdFJZQ1ZaNExXOHVmdEp3emtNckZjNVhIUVZFTnd0amJMQWMzRGxrWHI1YWNjCmtkcUFJbDh6VExsdkprTTBTNDh3QWRQcjcxdFc4OGR6RUpJbXlwL1NsSmRRSmFLa0Fvb0FLS0FDa29BV2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQktLQUNpZ0Fvb0FLS0FDaWdBbwpvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtXZ0Fvb0FLS0FDaWdBb29BU2lnQW9vQWZUVFNFaEtCClRHTFJRQVVVQUpSUUJsVEZ0VHUydHdTTGVJL01SL0VhaXVqRkxFWWl2MldhTStXRC9DUjZaOUQ3MWZrQlZaNFUKVlBNamRWWHNHK1luR0dIc01qOWF1V3RsY1R4NGxZd1d4NlJLZVNQZWpaQWFOdloyOXZqeW9sQi92ZFQrZFRWRApkd0NvYml6dDduL1d4aGo2OUQrZENkZ0tNbHBjMlRCN1JqSkVPVEUzT1BwVEVubGtsbXVMVlVMTW9FZ2tQTVpICjh4VjZNQmdadHNkdkZsbG1rL2VUa2Y2dzl3UGFtSk9OTnZXV053OXV6WVpRYzdUL0FJMGVRRzZyQmdDRGtFWkYKTFVBRkZBQlJRQVVsQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVsQQpCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRkFCUlFBVVVBCkZKUUF0SlFBVVpvQWZUYVFrQnBLWXdwYUFDaWdBcWpxMXdZYmJZbWZNbCtWY1UxcXdFWFRrK3dMYms3V0h6RmwKL3ZldFJIYmJSeVN6TkkzV014djh3YzlzSEhJLyt2VHZjQ3Q5bVlMTlBPb1NjeCtiSHQ0QzRQUEh0eCtkYUMzTApYS3hKRWRoZFNYT09WeHdSOWMxTGVvaDd4bTNYekkyZHR2TEt6RnR3NzllOVdBUXdCQnlEeURTR0ZGTUNwTmZvCmo3SWthWnM4aEtaZldyWk56YmNUcjFBL2pIb2FhQXJYRW91b0liaEhNTU1ZTy9iMVU4REFxcmNUdDlrTUNXb2oKajRiT2NrZTUrdFVCYjBTN1p3WUdiTzBaWDJGYTFTOXdGb3BBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVQpVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVsQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVClVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVVVBSlMwQUZKUUFVVUFQcHRJU0EwbE1ZVVVBTFJRQVZsT0RkNncKd1U4UUp3U01nTi8rditWTkFXRWE1M2VWSklGa3huY0kvbHgwNE9mY1ZDZ04xcVcyUnQ2V3FqdGpMbnYvQUo5SwplaUFzYWpFWHRtWkJsMEJ3UFVFWUkvS3FheUMwdVlyaHN0SE5GOHhYbkRjWlA2VkFqVlZsZFF5a01wNkVjMVh0CkhDcEpHU0FJbktqNmRSK2hvR0xMZTIwU2t0TXVCL2RPZjVWVUUwMS9KdFJOc0tzVmRXNElHT3Z2OUthMUF0MjEKcXNIT1M3N1F1OXV1S2ZES3N5Rmt6d1NDRDFCRkRBeEx6WUpISzdsaHVGTEJjZEhCL3dBZjUwMmFWNXJYWkFtZAo1M1NrREFMZlUxYTFBcjJVZ3RyNk4zNkszT0RuK1ZkUW1jYzBwQU9vcVFFb29BS1dnQW9vQUtLQUNpZ0Fvb0FLCktBQ2lnQW9vQVdrb0FXaWdBb29BS0tBQ2lnQW9vQUtLQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNpZ0FwYUFFb29BV2lnQW9vQUtLQUNpZ0Fvb0FRMGxBRWxKU0VoS1FVeGkwbEFCUgpRQUU0R1RXTFpNNXQ1Wm8wbU1ra2hPNUJrREhQSXozeWFwQVRwY3RjU3I5b0tSaU1lWjVXeHM4RFBKT0JVbWpwCi9vaGxJK2FWaXhQNDBQUkFYNnB4VzVXUXhNQ0VqY1NSTU8yYzVYK2Y0R3BBU1hUWW1rTWtXSTJQVWJjZzFCT3QKcnAwV1NxeXprOGJoa24vQ2dRa0ZuSmVNSnJ2aGVSNVdPQi9oV29BRkFBR0FCZ0NteGhWYTMrUzh1WStnSldRZgppTUg5UlVnWitwUmhZNStCbUtRU3JuMGJyK29OSkZieG1SVGRDVm9HMitUeVNPUjA0NmYvQUZxdE95RUpyRm5ECkJFa2tLQkNXd2NHdGUyZnpMZUp5Y2xsQkovQ2h1NkdObHVWUmlpQXlTRCtGZTMxOUtoRU0xMDI2NWJiRjJpWGoKUDFxQUx0Rk1Bb29BS0tBQ2lnQW9vQVR2UlFBdEZBQlJRQVVVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlNVQUZGQQpCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVXRBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRCkFVVUFGSlFBVWxBRWg2VTJrSkJSVEdGRkFDVVVBTmtPSTJKT01BOCtsWk9tdmNSNmNEQkVyNVk1SlBJNmRCMy8KQURwb0JmT01zTnlaWlg4OVVZTEd3MmZManJ0cTlwd3hZUVkvdUNtd0o5Nmxpb1liaDFHZVJWUk5UdG5tRVlMRApjY0t4WDVTZlkxTnJnUjNlbzRETGI4NDRhWEdWUTArS3hqYUIyWnZNa21URFBuSUp4MUZBRTFxNi9aRmxQR1YzCk1mZkhOSkJjUGNXclNJZ0Q4N1ZKejlLUUJETzVNaTNBUkdqQUpLbmpCK3YwcUM0dWtqdjQvTC9lT3k3R1ZlU08KUVFmNTAwQlcxRzFtK3ptYVpnOGdCVmluQUF6a2Y1OTZZYnA3YTN0WlpFUnNMaU5NKzMzcXJjQ3JjMzh0M0NFbAoyNEJ5TURGYTluSExKWnhLejdJOW8rNTFJK3ZiOEtKSldzQmJqalNKZHNhaFI3VStwQUtXZ0Fvb0FLS0FDaWdBCm9vQVNsb0FLS0FDaWdBb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FFb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0EKQ2lnQW9vQUtNVUFHS1RwUUF0RkFCUlFBVVVBRkZBQlJRQVVVQUZMUUFsTFFBbExRQVVVQUpSUUFVVUFQcGxJUwpGcEFjMHhpMFVBRkpRQWhHUmc5NnhkTVdjb2doZmJzZDFiSXlBQ0FRY2ZVVlNBbmFPUjdqeVh1RE8vbHNHQWpBCkM1QjZuK2xKYXl6blIxTnRneW9TQ0NNOUQwL0tnQ3JMZHlpV082YUFvWEd4eXA0Y2Vuc2FkYVc4bDNISEMwMFoKZ2pja0E0M2tmU2gyUUdqUERISDVFY2NhcXJUQWtLTWRBVC9Tck1TYkl3dkhGU0JUS243RGR3anFoY0FleEdSLwpPbEVzY000ZE5xbzhXOStRQm5qYWZxZWFRRkNPTzQxRzRkeXBTTm13K2Y0Y2NESHFhdnkyNlcwY2NxamMwVEFzCjUrOHc2SEoraHFub3JDRzZ6SnNzR1h1NUFIOC82VlhEMjExSEhhcDVZSVhZSkdYSjRIT0tGZTJneXBmMnR2YnEKdmxUZVk1YkJHUndLM3JkUEx0NDB4amFvSDZVM3NCSlJVZ0xSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUxSUQpBVWxBQzBVQUZGQUJSUUFVVUFGSlFBdEpRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQUZMUUFsRkFCUlFBdEpRQXRKUUFVVUFGRkFEelRhUWtKU0wzcGpIVVVBRkZBQ1ZrVzgKUml2N3EzVjJqOHo1bFplby93QTVwb0NDWW5TNUI1RTZTU0ViV2oyZnFjSHJWeXljd1gwc0RjQ1ZSS294akI3agovUHBWUFZBVHBwMEMzRHpFWjNIT3c5QWZXcWtFR3l4bWtJQ3lJN01ISDNoai93RFVhaGlMMTF3OXUzWVNqOVFSCi9XbU04OEVZbmQ5eTV5NkVBYlFmVDZlOUlZMmU0VzJ1eUc1ODVRRkgrME9QNmlvYmJUL01CZTRUWXJqbURKd0MKRHdjNS93QTVxbHBxQnBBWUdCMHF2SzZ6bzhLTDVnSUtzYzRVZmovaFNBemJtVld2bE1raGtTQWIzSXhqUG9COQpjVlVqTWJPWlZ1akF5TmxRNDNkZmNmNFZhMFFFZ2hqZTh0b1kyODNvOGpmM2llVCtncm9hVWdDbHFRQ2lnQW9vCkFLS0FDaWdBb3BBRkZNQW9vQUtLQUNsb0FLU2dCYUtBQ2lnQW9vQUtLQUNrb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQUtLQUNrb0FLS0FDaWdCOQpOcENRaHBCVEdPb29BS0tBRXJMMWxURkxCZHJuS0hhZnAvbk5OYmdSNGprbGdXeXR5MFNIZVQwQmJ0a24wcDF4CkhOTXpEY3B1b01PQ2d3Qm4rSDM5YXIxQXUyVjBsMUNHQnc0NGRmUTFUdTUvSTg2MVZDMGt6SFlQWmh6K3VhaXcKRlc4bnVwbkFjZVRKQ04vbDlpTTlSNi8vQUZxdUpkTnFRV0pJbVdJLzYxajdjNC9HcWFBbmF5U081VzVoVExsOAp2azlqL25OV0pKbGpPM0JaejBWZXRTMkF6eW5sNW1PRi93Q2Vhbmo4VDNxRFVieU96dHlpOE93d2lqdDcwSURNCnM0WjU0WmxYWUFlWkhrR1NUMUdLZ3NGWkxqelE0Vll1WGJqcDA0OWEwQTA5SFJwWGx2SkI4MGpZWDJIK2VQd3IKVXFKYmdMUlNBV2lnQktLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnQktXZ0Fvb0FLS0FDaWdBb29BS0tBRW9vQUtLQQpDaWdCYVNnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2xGQUJSUUFVVWdDaW1BVVVBRkZBQlJRQVVVQUZGQUJSClFBdEZBQlJRQWxGQUJSUUE4MDJrSkNVQ21NV2lnQW9vQUtqbmlFMEx4TjBjRVVBWUdicTJjV0RnTWhiTzNPTjQKOU0raHExUGFmWklDeS9OTzUrUlYrNm5IVWZRZDZ2UUJDMGJ6Q2JUNXYzNUEzS3d3SDl2clQybWh2MUh6Zlo3dQpJL0tHNE9mVDNwV0FmQkZjWFYzSGMzRVFoV01FQk81UCtGWGdJYldJa0JJa0hKeHdLVGZRQ05aWkxnL3VsTWNmCi9QUmh5Zm9QNm1wWTRraUIyanJ5U2VTZnFhUUZLODFOWTNNTnVwbG1QQXh5Qi9qVkQ3SlBkcTl3OHFUU0tlWXMKOVBiMnExcHF3SVpwVWpRQzBta0htRDk0cmRRUjcxREJCSmNUTENuSlBVamtBVlFIVXhSckZFc2EvZFVZRk9ySQpCYUtBQ2lnQW9vQUtLQUNpZ0FvcEFGRk1Bb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDa29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGb29BS0tRQlNVd0Zvb0FLS0FDaWdBb29BS0tBQ2lnQXBhQUMKaWdCS0tBQ2lnQjVwdElTQ2twakZvb0FLS0FDa29BcTZoWnJlUlk0V1JlVmIrbFo5dk1rbHlJTlNUOTZnMnF6bgpnL1gzOSs5VW5vQkxmWFNZaFczaGMrWEtOdnlGVko1NEZTeldrSDJWUHR6N25KLzFuUWdudG4wK3RHd0ZLRjc4CnlFV2p5UEdHeCs4S2tBK21hRWx1M3VDU2tOekltY0R6QjhwOWhuK2xGa3d1V0d1OVIyc1RieFJnZFdadW42MUIKY3dUc0ZlK3VmM2J0Z0NQb09QeUg2MDBrZ0lZV210bzF1NDFDeEZ0dUFBV0k3NU5MWnhpK3U1WERtSGt1TnZYbgozcCtZRlY0NUh1VEd2N3lRbkdWNzF2NmZZclp4K3NqZmViK2xFbm9CY29yTUFvb0FLS0FDaWdBb29BS0tBQ2lnCkFvb0FLS0FDaWdCYUtBQ2lnQW9vQUtLQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWcKQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCOU5wQ1FVbE1ZdEZBQgpSUUFVVUFKVmE5c29yeVBEakRqN3JqcUtFN0FaVFBkYWJKSDU4WW1qVGhHUGI2SC9BQnExY3pXK3B3Q09PNUViCmRkamNaUHAvK3FyOHdKZEx0NWJXM3hJK1FSdTJiZnVuNjk2enJHWlVlS1JpWEVhT3pBTGpaOVQzei9XamU5Z0oKSTF1Rlp6Y1JNcVhRS2s3Z1FHUFRqdDZVTmFTUzZhclJ5T3VGQmVKK21SNmVsQUZhK2hTQkVTTzQzbzN6R1BkawpxZndwYkcxdXJoU2taTWNML2VmSFdxMHNCdVdsbERhSmlOZm03c2VwcXhXVGR3Q2lnQW9vQUtLQUNpZ0FvelFBClVVQUZGQUJSUUFVVUFGRkFDMFVBRkZBQlJRQWxGQUJRYzVHTVk3MEFGRkFCUlFBVVVBRkZBQlJRQVVVQUxTVUEKTFJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUzBBRkpRQVVVQUZGQUJSUQpBODlLYlNFZ29wakNpZ0Fvb0FLS0JCU1VEQWdFWUl6Vkc1MHEybkpZS1kyUGRmOEFDbW5ZQ3VOTHVZTWZacnZHCk94eUIvV212RHE1eHUyU0ZUd2ZseVA1VldqQzRQSHJFcTdYQ0FmOEFBYWJIbzF3MjR5enFtN3FFSFgrVkYwZ3UKWGJiU2JXQWhpcGtZZDIvd3E4QUFNQ3BidUlLU2tNS0tBQ2lnQW9vQUtLQUVvb0FLS0FDbG9BS0tBQ2lnQW9vQQpXaWdBb29BU2daeHllYUFDbHhRQWxMUUFsRkFDMFVBRkZBQlJpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS1NnQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FlYWJTRWdvcGpDaWdBcEsKQUZvb0FNMGxBQlJRQWxITkFDaHFNMEFGQk9CbkJQMG9BV2lnQW9vQUtLQUNrb0FLU2dBb29BS0tBRm9vQVNpZwpCYUtBQ2xvQUtLQUNpZ0Fvb0FLS0JCUlFNS0tBQ2lnQW9vQUtLQUNrb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQWVlbE1wQ1F0Rk1ZVVVBRkYKQUNVYzBBR0RTNG9BTVVZb0VHS0RRQWhGSjBvR0xSUUF0RkFCUlFBVVVBSlNVQUZGQUMwVUFGRkFCUlFBVVVBRgpGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0JoUlFBbEZBQlJRQVpwS0FDbG9BS0tBQ2lnQmFTCmdBb29BS0tBRnBLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQUtTZ0Fvb0FLS0FDaWdCNTZVMmtKQlJUR0ZGQUIKUlFBWW9vRUxtaWdBb29BU2lnWVVsQUJSUUFVdEFCUlFBRTBtYUFFb29BS1dnQW9vQUtLQUVvRkFCUzBBRkZBQgpSUUFVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFDVVVBRklhQUNsQW9BWEFwTVVBRkpRQXRGQUJSClFBVUNnQmFLQUNpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUZwS0FDaWdBb29BS0tBSG1tMGhJUmxKeGhpdjAKcHV4LytlamZrUDhBQ2dBS1AvejBiOVA4S05qL0FQUFJ2MC93cGdHeC93RG5vMzZmNFViWlArZWgvVC9Da0FiWgpQNy82VVlrL3ZqOHFZQ1lsL3ZMK1ZHSmY3eWZsL3dEWHBEREV1UHZML3dCOC93RDE2WEV2OTVmKytmOEE2OU1BCnhML2VYL3ZuL3dDdlNZbC92TC8zei84QVhvQU1TLzNsL3dDK2YvcjBmdmZWZisrZi9yMGdFL2UvN1A1VW1aZjcKby9PbUF1NlgrNHYvQUgxUzdwZitlWS83Nm9BTjB2OEF6elgvQUw2Lyt0UVdreDl4Zisrdi9yVWdHN3BQN2cvTQovd0NGRzkvN2cvTS80VXdEZS84QWRINW4vQ2wzUC9jSDVuL0NrQWIzL3dDZVovT2plMy9QTTB3RHpEL3p6ZjhBClNqekQvd0E4bi9UL0FCcEFIbU4venlmOVA4YVh6Ry81NXQrbitOQUFaQ1ArV2JmbVA4YVBNUDhBenpiOHgvalQKRUhtSCs0MzVqL0dneUgrNDM1ai9BQnBERTgwZWgvU2p6VjlEK1ZQVU5BODVPK1IrQm84NVBmOEE3NU5JQmZPVAovYS83NU5IbXIvdGY5OG1nQTgxZjlyL3ZrMGVZUFIvKytEUUF2bUw2UC8zd2Y4S1BNWC9hL3dDK1RUQVBNWDMvCkFDTkhtcDNiRkFCNXFmM2grZEFsai92citkQUNlZEgvQU05Ri9PanpvLzhBbm92NWlnQTgyUDhBNTZMK1lvODYKTC9ub3Y1MEFMNTBmL1BSZnpvODZQL25vbi9mUW9BUE5qLzU2TC8zMEtQTVQrK3Y1MHJoWVhldjk0Zm5SdVU5eApSZERzeGNqMW9vRUpSUUFVdE1BelMwQUZKaWdCS0tBRE5HYUFGNjB0QUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVCkFGRkFCUzBBRkpRQVVDZ0JCbnZTMEFGSlFCSWFiU0VoYUtZQlJRQWxMUUFVbEFCUlFNS0tBQ2lnUXRKUUFVVUQKRzRvelFBdWFRbWdCUXVldExnRHRRSUtLQmlVVUFGTFFBVVVBRkZBQlJRQVVtS0FDaWdBb3hRQVlIb0tUYXZvUAp5b0FOaS8zUitWRzFmN28vS2dBMkwvZEg1VXUxZjdvL0tnQk5xLzNSK1ZHMWY3by9LZ0JkcStnbzJqcmdVQUp0CkZHQVAvd0JkQUJnZS93Q2RHUGMvblFBYlI3L25SNWErbEFySVR5ay91MEdHUHVvb3V3c2hQSWlQOEFwUHM4UC8KQUR6V2dMQjVFWDl4ZnlvTUVSL2dYOHFCaStSSDJSZnlGSjVDZjNSK1FvRUw1S2YzVi83NUZIa3AvZEgvQUh5SwpCaDVLZWcvSVVwaVgwSDVDZ0JQSlgzRkJoVTkyL09nQlBJSDk1djhBdnFqeUIzZC8rK2pRSVh5Ui9mZi9BTDZOCko1STdNLzhBMzBmOGFRdzhvZjNtL3dDK2ovalNtSUh1My9mUi93QWFZQ2VWL3RIL0FMNmIvR2w4ci9hUC9mUi8KeHBBSGxIKyszNW1qeTIvdnRURFVQTGIvQUo2SDhxTmpmODlXL0lVZ0U4dC8rZXAvSVVlWEovejJiOGhURUhseQpmODltL3dDK1JTTXJxcFl6TmdEUDNSL2hRTUZTUWdFeU1ENllGTDVjbi9QVnZ5SCtGSUEyU2Y4QVBWdjAvd0FLCk5rbi9BRDBiOVA4QUNtSU5rbi9QUnZ6SCtGR3lUKytmekgrRkF4ZHIvd0I4L3AvaFJ0ay92LzUvS2dBeEovZUgKNVVtSmZWUHlvQU1UZXFma2FGRW9iNWlwSHNLQUgwVUFTR20waElLV21BVVVBSlJRQXRGQUNVVUFGSlFNV2lnQgphS0JDVVVBTFNGYUFFMm1sQzRvQVhORkFDVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDa29BS1dnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQnVhV2dBcGFBQ2lnQW9vQVNpZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FDaWcKQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBRW9OQUNVdEFEejBwS1FrRkpUQUtLQmhSUUlNMFpvQUtLQUNpZ1lsTApRQVVvb0VGRkFCUlFBVWhPS0FFelNpZ1l0SlFJS0tCaFJRQVVVQUpSUUF0RkFCUlFBVVVBSlJRQVVVQUxSUUFVClVBRkZBQlJRSVdpZ0JwRkZBd3BhQUNpZ0Fvb0FTaWdCYVNnQmFTZ0JhS0FDaWdCS1dnQW9vQUtLQUVvb0FLS0EKQTB0QUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVuZWdBb29BZlNiZmVrU0cyamJRTzRiYU50QVhEYlJ0b0M0dQpLTVVCY01VbTJnTGh0bzIrOUFYRGJSdG9DNGJmZWpiNzBCY1hGR0tBREZHS0F1SnQ5NlRZUFdnTGk3QjYwYmZlCmdMaTRveFFGd3hSaWdMaGlrMjBCY050RzJnTGh0bzIwQmNOdEcyZ0xodG8yMEJjTnRHMmdMaHRvMis5QVhEYlIKdDk2QXVHMzNvMis5QVhEYjcwYmZlZ0xodDk2TnRBWERiUnRvQzR1S01VQUdLVGI3MEJjTnZ2UnRvQzRiYU50QQpYRGJSdG9DNGJhTnRBWERiNzBiZmVnTGh0OTZOdnZRRncyMGJhQXVHMmpiUUZ3MjBiYUF1RzJqYlFGdzIwYmZlCmdMaHRvMjBCY050RzJnTGh0bzIwQmNOdEcyZ0xodG8yMEJjTnRHMmdMaHRvMjBCY050RzJnTGh0bzIwQmNOdEcKMzNvQzRiYU5uT2MwQmNOdnZSdDk2QXVPb29FRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQQpVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGCkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlIKUUFVVUFmL1pBQUFBQ21WdVpITjBjbVZoYlFwbGJtUnZZbW9LT0NBd0lHOWlhZ296TVRFNE9BcGxibVJ2WW1vSwpNVFVnTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F4TmlBd0lGSWdMMVI1Y0dVZ0wxaFBZbXBsWTNRZ0wxTjFZblI1CmNHVWdMMGx0WVdkbElDOVhhV1IwYUNBeU5UWWdMMGhsYVdkb2RDQXlPQ0F2U1cxaFoyVk5ZWE5yQ25SeWRXVWcKTDBsdWRHVnljRzlzWVhSbElIUnlkV1VnTDBKcGRITlFaWEpEYjIxd2IyNWxiblFnTVNBdlJtbHNkR1Z5SUM5RwpiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFHRjByMXV3eUFRQU9DTE1tUXJhd2ZMOXliaGxUcDJDdTVTCmozNmxxSmFhVitnWXhKQVZOaXJSdXg2SkhiQlRxVjc0K1RnNHpqRFBINW01VjFwWHVweXl5Nkl0ai9mWjJxT3gKUENRVGdVRDdBMnhVT0VWN1g4a2MrY2hETkI0T2dPSmJGVWIvaDU5VDIrTFpSRmJCaFZERmgxdThwUmJWVVl0YgpaMnUzM0JuWmY4eitrVDFZNTZ2NDdFcWNXeHcrOVpmRWg1VTNSaVhUODVNNEhnbURQeTNqR3oyNWVrZi9JOTQvCmVNenhjZ0I2aGsxVTNwUUViR3BRemhlWFZtVlBNaXp1MG41eTJLdmg2aGdMODdZNDRlQWxQMXI0V3dLVSsrZjgKQ1hhUjBJcFgrOXNFS2p2ZFhPNi84Z2hLRXNyMUkreHpmZGR1ZHJQcmNmSXFQeHU1RjdlU1p0Sk8vSnBmcVpEMQpQTUt6OFM4SFRFWVdyOTBISHJzR1hvR0tCeTd4L3B0ZDF3SnRXRHhFSGdMcit2L1h0WnJUV25oVmk5bnI5M2Q5CjN6Tk1iZjIrLzNQU3EyQVpYaDZuRmpNWC9nVU0rY3d2Q21WdVpITjBjbVZoYlFwbGJtUnZZbW9LTVRZZ01DQnYKWW1vS016TTVDbVZ1Wkc5aWFnb3hNaUF3SUc5aWFnbzhQQ0F2VEdWdVozUm9JREV6SURBZ1VpQXZWSGx3WlNBdgpXRTlpYW1WamRDQXZVM1ZpZEhsd1pTQXZTVzFoWjJVZ0wxZHBaSFJvSURFeE5qZ2dMMGhsYVdkb2RDQXhOakk0CkNpOUpiV0ZuWlUxaGMyc2dkSEoxWlNBdlNXNTBaWEp3YjJ4aGRHVWdkSEoxWlNBdlFtbDBjMUJsY2tOdmJYQnYKYm1WdWRDQXhJQzlHYVd4MFpYSWdMMFpzWVhSbFJHVmpiMlJsQ2o0K0NuTjBjbVZoYlFwNEFlMmRUVy9rU0hybgptZWFpMkRBRVJYdm5VZ01rTWp6d1lzNDE4RVVEQ0JsakxHQmY5eU5VWTREZHF4bytyQXdJWXRibW91aERvM2lkCkFRYk93MzRRVTAyamVGbFkvZ1pEZGdBajN5WTRPa3dJeStHei95QlRMMTFTVlpmZVV0ckZQOVRLNUd2RWo3OTQKSW9JRnNZTWlUSTl2d0lpNlVvaTlzbnk1bUYwdVB2NVNiN3JrU2lubCtYSXJkZXBUclBVbWxrMFIxUVlGZGp2NworNkhnZGFsRDJiMlNwTkNGV2lqeHVwdEZwZ29IYkNCRkdvV0FhRkJ4UEhvWVBydWtUeFpxZ1YveDJzOGlkV0h1CmNhbjZGeUdBT3VPR1l2S3hzQXVpTE11V1dQSGFUWFd5SWFKT2grSS9JQnJBdXFSTHdGT0MyQ3NRTFpjajdtTi8KZWhNSzZrdzlGQlI4SWFrT0gxM2NKVW01SnFwbnVyVER2a2YvOENrcW81N1BhOVdyWWo2UjJuUmFsTk4xMHYyVgpUNUpxSkRxdS8rUEdpRndLRFl1WE84VVhQb2xtVVJWaVdSUmFXTkw5eEw5TkVFZ2hqcXJ2WHVxeWVYUTlRd0ZPCmpySnllN3BUZUJmUHRuV1ZKVytXb3BlWjB0MVBYSmE5UUdpTEZOVzNNOTFzaktqSlNvbDJuR3ZrVCs5MEJxYXkKMStxOUJsR2JMV1lMVmFmaXlrRFVic3BSa3dlaVBWZEt0NjFBbE50K3ByNEYwU3VYUk9nZm5aR2lmRC9kTU5IVwp6cDR2cFZmcXJTNlY3YWVxREVSTmxzVFpFcEZlTis4MjZlZ29MK3RBRkl0VDZzVkFwS01ZY2JSanM5RDZNWnI0CjVwdE54bEZvYTZPamhkSXY5QktPZEpTOE1OM09MN09zeVJxTWRkNXRvVC9hVkdTblpWSysyTnJ4cUxWRTZmY2oKa1pMSWRMdG8rMnVpdmRrR2lRNUxCTTFBaENhbUtsMGlzclhxdjVRclJHNlRSUDV3aVliMTV4ajdBOGc1VWQ1cgo2ZVlYanR6K2ZLWlJmeHRKblVtUy93RkgrNzRKUkpuS2N2UkhHY0o1ZDY2eURFRW1TbnNQb21SVFJGb3Q0KzJCCjZIUUdvaVFCa2Fva21rMUJ0SWdYOGZhMjl0MGM5MGNiSXVvalZjVFJOaHk1R1AxaFZhamNpcXF4YVdaVVZTUVkKNFdiYTl5QXlHeHI3WlJIWGNiRzl1OTkxeWVMNHFLck44U25HL2tRbk03T3FhbDNyNGxCM1lpU1NUUkU1M0JtZApoWkR0MDR2QXphVFgxY1ZhYjhaRjNMWnNKcm4wV2puZkorck1lTUFsNDdVVEhuWkRsMTdMcjRLamNMTTdwdk1ECjFqZmg1NXMzK28ySUdmNUJzQ1phbC8zRVJBdDl6Y0h4dFMwYjNURCthMm1qUmJJd0dxQUJHcUFCR3FBQkdxQUIKR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQgpHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUNCUnpTd1d1ZTlxZi9CL3J5OGoxK1NmbEFpCk84ejM0TlB6cVEydWx4dktHNlpndUp3SFlUaklSK3RqVlRnaXBBZHd0QlFCRVdaYzhlTmNkRU8raTNUNE92L0EKM3ZWVWNSZEVwUTg3M2ZlSUFzM0ZBV0gzblpLYkRFU1kwdWdxVWFSRFppWjhoTlNaMWJxc0N3VnZoZ2tJd3RsRAplcWZ4cGZCYkRhdjMrVmdUZVJDQmFaMVR2NjJ4MUp2emo4NWdmYmo2RDRsd3hKQUdpeHFMRDBDRVhGQnJIcE1zClhSSU5Ua2FpWVNJUGQ0akN2azhVRFk0S25EMmtDNkw3VDBHQzJVNEdvdndxMFNocmdQbGhvdGFuUlFxaTRpRHkKV3U1UGhNbHdXamh5V1IvMTBUOWtpOE5KalZteVVwbjByL2ZqMnRUN2NZR1p4UTRtWG1mTy9HYTJwWng2aituaQo1SXYvMHNlWUJBMHhGcjNXQzQxcWpuYWpPbm1BaVdNYUtkdGxLVzNtSXgvdEpkRkJJSExTUndmUlRyelF4VTVjCjdKcC94OVlYU2EwakZTVkZza2hROGhlLzhJanFvMEFVcVcyMXJmdnRtVHJLSG9hb1djYnlwbktSaS9aZVRGLysKdkZ6SlF2ek9iclJqTWhXOVZOR3VxUTkwdVV5d0JwcmxjaEZqaXNFdmZ1RXdtUXhrZHBpUlNFRFVHYVZEVHpMRwoxVDArV3ltYk55V0lhbGU3dllQNXl4U3RCVVFITzdPWFp2Vk8vY1lvVElPNHB6T2JZQ3FrNWJKTWpwWVdrekp0Ci9XV05hS3NubURoS3I0bTJOSUwvL2tRdUhvanc2YjRxWG5kbUlIS0luR2orMHNqYmNPbm9DQkZGOXExNmk5bjkKU2xVa05yT3kvYXJ4bUNndXJxY0RFYVpHTXdNUjR2S2VDVVJ2NENnUS9VMzBsVGN2VFFrQ3FRK2puYW1SRjdxYgpCNkpPNTgxYi9SWThwYXBIb2k4SElxbTM1anF2RllpaUxRVkhEMFBVbExJOGF0emtWMS81YUtyUWZwd1UvWmZ6Cm1YbjFRdmRodGtqWDY4WGtiWlFNUkpqK2JJRkpUNzlvMERFVVVuOEJvc1ZBaEJuM0hvSUljZFNXcFdUTnhCLzkKMjU2TE5KcTh1TFRvWHg3T1RQUWZRRFFRNm1na3lrc0ZvZ2hFVVNDcU1TK2owZm1MN1ZCci9jTVFoZFlQb3NYawp5Qi9WZTZCNTQ4TVE5MjhEVWZ3L1VSQ2FGR3BOeVFMelZwYjV0MmppRFNveVc2eUpNTUs4MHc5TTFBU2lxUEdOCjJ3dVhIV2J0UzkxQXBBWWlPUHNUaU42QzZGdjhYQkFoc2pHVWdHZ0xrNlFCWFlLais3ZTFHcTBmUk1vTlJFTWgKSURMdWNJcGFVKzlRRUlyeWgyallHUnA1bWVNSEUrbkJVZEdnOVFlaStTWFI4bytZbHV5K3lZSElCcUtROXRaRQpuZm5WN200Z1V1aU1jQXR3VHBRRW5ySWFpWnpmVDBlaWQrZ2tkYTlYNmszMUFGUFl0bUtQUUtUOVh1MWU3L1c2CmE0L1IvODZtTHc4T1oxb2xtUEdzM3pVK1JVbVlYalRHOUhYTHBHcktFOGxxL3dxVk8vU1FlYVEweGpXOXFKTUgKSWFvbmFQM2F2d3JqbWtUVFNUSFRQV1k4UFVoMXZFZ1dzemc2QU5Ha0tERlZYS1R5c2dBUnhyVzg5aFBjNDAyawpSMXRicUpWRzVCZGU1ZFY5SzAxYWNaUEdpdTUydDdwb1h4YTdjVEUzc2tpakx0WExRdFVtamhCSzZSc1hWMDU5Cm9ZOXRyU3ZyUU9UN3VKTU9ST21hWVp4MEZDRjJ6M1FtblRrZGJtQjF5S2xGUklWUWxoT3NuSnhnb1RvSzdjbUcKV3pxem5ZWmp3dnJ3ZGRQSC9ZbHV5TFZMUDl4NFRvQis2SWRTL2tNSDNHWC94ZTMyeGNsUFRuUkJjcjR3M0VWago1VE1jcmM3UGVlUnZQZWIvS0ZWeU4vVGZqcWV0N25ZMno2SUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCCkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUIKR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQgpHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCCkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUIKR3JpRmdUL2U0dGpIUDlTaWlCUDhQR2h5NnE3WmVaRUhKa0tPU0VVaTNlUk9VRGkvbExNK092eFA2WjNPdjM2UwpHektxS3ZIUjlaMmZ0NldVdG8vU2FNam84ODc0NUZIMWtCR0kzR2pya3dmZnZCTkVzc1RQQTZYYWhJeEExTjQ1CncwRDBCajhQbEw0MUlhTXFDMFREWWxqOXZOUWZwbnJTZGRHM1NUR0xEaCtzMXQ0YkZ6dFQ1ZUtrUyt6cDU3R00KUjNXSDgxbmtYVlRFeGV5bmh6OU5iM1B1SjQ1OWI1Q2hMaldJZkd6TFR4eDViVmUzTzkvZDMyL0w0cWg5eVA2bwowbFdlSzBTVFMxM2JWdGVLL2NTR2JuZTYwKzFiZTlRMEQwbVVLd0JWdFloWGpiOWRSOW52VEY5MXI2d3QyK1lUCjNMZmVGWWgwVlhScG41VGUzNnJyN25lKzNCdUlqaDZVQ0VBZ1doeWs4cVowbmI3TkZmVXZwM3ZSSzFzdUg5WlIKSUlxU3JkMVU2anJxekcySTVPWFdYclRYbFBIREVtMGxtWTZVbmlLUTZza3RpWDc4ajc4UVZ5Y1BHMGQ5bEN5TQpGbzFCelZ1NVhhM0pYL3hqQVNKZHRuZnY3Ni9YU2EvTFJRcWlvNEhvZHBFdGJ3b25yaFQ3b0VTZHNTdTVJR3J6CjY4eWYyTEk4OHVsakVPV2lSQlVpcnBYbVZqMmtnR2krWHllMmRaL0F2dTJ1TG0wTG5mMCtpOUsyY1dmbDdZaksKcG8vMjZ3bUk5RzNML2ZqeGdTZ3BWREhWTHZhVEt0eWdmbjQ2T1pWSXJKT3pXN2FJSHlqaExDK2Rkc2I0cEl2bApWbVAvbUhINWtGVTJacWx2TmVCZnU3NW5TUFNRbmRGNHZlcDI0ZnlocERyK2NNdTkxeGUzR3ZDdkZlZVNhNXZ1CnU2SFE5ODJCNTlNQURkQUFEZEFBRGRBQURkQUFEZEFBRGRBQURkQUFEZEFBRGRBQURkQUFEZEFBRGZ6L1lhQzQKMzkreUhrRUNuanQ4WmltNzMxOXBIK0ZxOG1kSHBKNGgwZXArZnpsKzhIcFRaZjdNWWx0bG1YN3d5N3hYaGtxLwpOL2ZLNE1GUGpzeS9QRHNpUEhyMHJOTE0xTStLUi9yNXN5TXkrcG5WV20vMDRwblZtdEhmcE04S0NZNm16NHVvCk05dTc1bGs1NnRKdkRwOFhrY2h2K3VkRzlLeXFqREEwUUFNMFFBTTBRQU0wUUFNMFFBTTBRQU0wUUFNMFFBTTAKUUFNMFFBTTBRQU0wUUFNMDhNd04zUHdIdi83ODhUWjlqcitTbGR4dUVwbnpNMi83ZlROUmQwNTAvaTJZM0dZegpSSzYvc0pENXk2dnhhV2VHbVZhMnRReHpVcDM5R0QrL3Zqemc4WllLWFBvNkxhL01ydUxGYTY5RlpHWkdJdjhYCmZ1SW4yUERvS2Jva2ltOGkwbXNDSC9zWTA4aHNJRjBobW54QU5NelljMDdVcTE1ZEJOZWpjcldYNFhxVkNEUFkKNVlISXJvbFVCME9iY2VRdWliN3dYU0xKVW1MTThGZHJuOWQ0eUdXaHplTHNGQ3doaWpZVFI5OGp3cVNEY2RSRgo0aWNncXI3VDBUeWFtZWpyR2l4bnZ6Nzd0ZDlJVzd0Q3RMV0hlYUpldi9MNzRqQjlKWWhtczlsMHRydjdkZDA0Cmh3YXd3dlJXRzBoT0xoN1EzTnFUdHZVSEh2TkdEVVR2cDJZNm4rMGFjTForSU5wSW4zMlY2SlcwamUvMnU3VHgKY0ZRR0lqUGJUVnZyckllaERhVXJSTnNqMGRkZGFsRnozcjZkenFmcGJDZHR5MEMwc1hSSjFLc3ZaV0o5dHhlTgpSTTI3YVJTSUJFUkZ0REVnVEoxNXZDNE1SQjVFSGtSbGNOU0M2R1U2ZXlXTjljVkd4bzhSNUpKSTFCZXVCZEhYCm1CTjNUV1Q4bXNodVRoR21ZRDEzSkdweDJwNzZEa1RnRXU5bTAwQ0VPTEtZaEhCejZjb29vb3FCYUU5a2FHdUIKcURNajBYQkRzaUdvYTBTb01CbjZJejhIRWZxaitkZldQL3dNWngrL3ZLdEVkWHQwNnYxK2lra0hVV3VnMGZPWApzOTBwaU80K0JmSEhTLzdZbmtoZmRNUzU4eFBFMFFIR3RUZ1FHUjJaYURhUEVFY1k2emFXSXFYT3k4b3hoK1lwCnVzSUlZNzlJMTZlbVNKY3I4d2I3KzQzY3E1MkQ2UE9GWi9QOS9Jak1zM0d6QnVsSjlOeXFoRHcwUUFNMFFBTTAKUUFNMFFBTTBRQU0wUUFNMFFBTTBRQU0wUUFNMFFBTTBRQVAvanhvNHhmdHJUKzdQUHJ6UjZ3ZGU2M1h4dkVrbwp6dU52aEdPNjhtZnY0UWo3TUVSRHRsZnl2dmdMUEVvOTM1eU5CT1h3NWVKeDdYSTMxZ2VpSDVuZkhmN1g5SHp2CjdiNFg1dUw0b2RUem9yRjF5SHU5OTN6eitQZmQzNWZEWnJ6SU02U1RxMFFydkdNV2YyTTFkMzh2YXpRM0lWZWsKOGMxdzUwV0hEZmp0VTN5Yzc4UENTSlFEQXNtMkV2NVFoK011ejhxSDB4WnBoTC84M2luMSt1TkVJY011SGJJTgpjRU5hRTQwck54TmwyUGxHRm5kOXYyOW53bFVPNlpxanNIWDkrc29Mb2xEY3VTbXg5cm9qSmVFUVBBdDMxL2Y3CjRpRlIwNFgzK1BacE5xaTNuUW5QdVdqOG9EaDNnTDJDaDB2Q2V5eVZTSjNobmJaT1QwNjh4a080VFNrK2RucXgKbjFoeDhiRXQ4S1JBVkVWLzE4cWZ6ZThjUjUzeGNiU3ZmcGU0U2ZUTEdHOWpSQW4xN3FTTERoS3BmcVhxbldUeAo5M2dhTUxKTzFVbDRvYlhPbzBKRnRsYVlZN0xKUUZTcmFDKzJVc2Q1dWREUmJGSkZWU00vTWo4OS9Oc1UxM0w3CjFHdWZSSHRKRWRkeDlCclBHK0hkdnNsaU4vSW9SYkpGOHY1bEVuM2w4Q3lneFE0QXYxVmFUYW9zSzh1c0tBVnYKdHUxTTlyWnFHeXZMWlY2dDhnU3Z2YzFSL1MxaXZibzlUVGdEejRTbWliVkZXUjVYTlJwenVjeXl2UFBPb21WbgpTeXlhQk0vOC9TR3h5L0lJdGFwQWhFakp5Nnhjb3FZTWlCVGVKOWxheWNxOEVyejNWbFZaRmQ0VGZXY2lXWGFICnFteExXMVZWZzRkcGtIR3B4SC9kb2gxbFNabDNxV3BjMHl1Yk5TV0FkYTd4WEhLRlk4cXNBWkhwZHZWQTFJOUUKT2dPUnZhT2R0ZE9pTzlSVld6VWdzbmpFTnJQS0RrUmxLeFVtYlJ5SWJDRENNZExyZHlNUmRtV3QxRmVJMUxkNApXZUgyUXhEVnUrbFZvdHlxRUs5ZnR6Q0NZcGVvRll2M21pWTJING5lZ3NnbmVhWWF0S2hxaG1lVnRLMjZpUlVGCmJmV1dEclZteDA3cmJtR0VEZ2RFeFFTV1JrZUJxSkRvYTF0TVF1VVVheUtVY2tsVUova1MzQWkwYmVOQjlIZDQKTmc5RU9Ib2t1dVhMWEQ4azcwRzBpS3UyVUVPdGdjaTZBN1Mwa2NqdGpvNHkxQnJxc2RmQlVaa2hqZ0pSL3Q1NApvMjJHWi9Na3QzbUpseWVIT0xvbmtVeU56Z1JFT2dsUFpBYWk3dVhPWHBKaHZNckxMaEQ1RXVFMUVJbk9RSlJoCmg3SVZpT29VVDFCaGFVMmtScUt6KzlWYUlLcWthaGJvczBlaXN2L1N2OWJMZ2FpZkdyUTF0RzBRVldpS1ExdkwKTDRoY0lDb3JpLzRvZEFqWVc4R1IxeDlXeEszV1VlWkFoREY3Sk1vRDBTK2xERVIySkVMRVFFUWdnZ1dsYzlSYQpWc0pSNXRMZXFLb01SRm1aTGNNcnIvUDdFKzNpS2xGcnkwQ0VQZ2hsZ2VpcmNIOFJpRkJyVGQyY1ZyWXNTNVNyCjFEYUlFdlNQR1lqSzJ2UTZ5Mnh6WktWRW4vNU9hZlNQUjdkOHVmUUhBdkZpZDZOUklpSzdERVRMdUV5bU8zdDcKY1hNV2lLYlk2d3BYRmhidm84YkF1bEFMcFJmSm9rUkRhS1NPVkI4WHF0NmJXQXcvZFl4OTFhS3FEOHdIaGR4cQp0WThPWTd6SkYwUng4VXNRMVgrTmtSTnRMWEtoOWR2RlBOWSs4a21Oa2Zha0xRVXYvbFdtVHVvVHA5RkRPcFZMClhCdTMvK05UY2YvTlNYMjhPa1pQZmo5SHVOTkw4SlRmeVdsbTNkOWpPUEwvM1ptaVR4cC9FR09vUENra1crRVcKU3JuaHJkcmwrTHJmTXh6WHBlc0xyODdPRnk1TVhPeTcySEtuaFR6Y015TjR4bVI5ZXI1NDVmdVQ0OVhsem9jawpRZ01iVTNrajBTZjdtWWNuQ240dWNyMzVQY2FmSkxxNEdybnhhczZ2OWZPL0YvRlZvaG8zYjlmVFAxL2ZkTGtsClhOR1kwTkUrUktyVjFWeDg0SHRXcVRmUENvY3dORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQUQKTkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRApORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFECk5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQUQKTkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRApORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETlBBc0RTd1NlZFA5cUlza21oekprWSs2ClNCWHhrNUl1SW5uajNVRmtva2toMWhWZGxCVFJreEtWM3BTdFA1enJ2SE5pcmUvTUNUWTlKVkxabWZLME96UUsKUktrdFFmVEhzdGRQU2lTNnRDREtNL0hHbGwxbnBCVDF0RVNxdFAyaHlTcnhldms4aUxLeWtUNFFuYW5sVVQ4NAp5cDdXVVZhNWthak5sNDJBeU1vVEUxV1ZTM3VUVjZkdFpldDBJRm8rcmFPcThybzNDa1NsZGJveks0dllmc0pVClNsYjFTVC9YUmRJMnRsTmRwSjhCa2NSOVpFRFUyajUrRGtSVkpVWC9FOGxPVzJkbDBhV3JVcDQ4anNRZEdyU3YKdHZ1bDFNK2o5WXRmRS8yVnVJUFFaejl4Njg5TDZlYkIwVmtmaTM4T1JLbzg2VWNpaVgvZmdjaEsvb1NOUHd5cgpJeEZHRWNsT1JxSW5IV21yWGxkaHBKV3Evd2VwS2hDZDJxZTlHNms2VTRXN0VjbTZNNm5DL1pHMWFHOVBtRW9uClplTTdMWmx2eGRZdEFMSHBLVk14a2FYL0d4QXRKazVPM1gvR2ZmWmk4cFJBQWhhUkNyOHU2ZkdaUzVIMlR4clkKZ0dDaUFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScDRYQU5kK3JqNTN6NTNaMjUvenVPZThReUowc2U5NHR2bjdtOS9DcytnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnA0UWdPckp5ejdlMFVmUzVlSUhLL2tCaUw5dlNNZlpPVU1aZDJRCjBXK3ZiS3ZFeHlLNWxsemtKR3pQejRhdnNMZ0tIeDlOUHYzb0xqRzl3VTZMMzlQaG9GUHhZKzZ0U0NXOTZWV2YKNW4xOFFhZTkxRXBreUxLU0JrZnBRS1FyVUVuV1ZFTW1QL2poMHFISUs4Y1pMR2RoSFVXRzVVQVVmZ1BYbWdpQQpKK0pOcjN1VGR4TUJ4WkMwVDR0QUZGWk9BbEVQb2twMEhvZ3ErMzBpSjM0L0hZOGRUaGJSNHpmS0t0ZGJydXo0CkdOSFo2QWduV2FtTjE1RGcyejVabjJsY2VsR3F2U1RLVlNBcXk0dDl3K0YxNmc1dUpNSmgxNG5NY1RqcEJrZG4KdUdRa2ZGaDViN3lXbVJFZlFqaWsvdnRFN2JtalhBY2lXdzJuaHNQa3JGTUNvalNjZFMxVmN2d0JFUTdSdzJIWAppS3kwVjRoNjA2N2tIWWpHYmFHbzc4eTYxRURjV215Wm1oT2dCNkkyUDVGQ2xvWDQ1SjhpSDBOeG5RN0ZmUGhSClNmNXhvczdnY0ZUUjhEdVVNa2JZNEtnM0RZaUMrRW82NDdwMFRWU25QbkVhUkdIelN5eDhpMkE3U052VmlTeDIKSmd0eEo2c0l0TmI4UzRxY3I2ZnNCcUplaTBzN0xYOTVrQ1lTMnhPWjJBU2U1ZFJQNUVYaWxWUk9vVXFNMVZLawo0a0RrdHFQSWRLYlNZRjBjdUtUR2ZwL0FRNlFRY0tucTlzVmpuM3ExUDAzYlhwL1pkaVE2UWlQQ3J4dzFnb1liCkN2RjZJVkdwVUVobi9Eenh1a2l6K2V1RCtMaldDeVhGN3Y3RVRXelZSM1hzRXV0UDNVVHF4Q1dTMit5Y1NFQ1UKU2ZNdWluU1hCcUplZThtcUNrUzRMcE5rSUJMVi94eE5zK3ExODVBbHVzVnVxLy8zZ1l1OGl5TGY3VU9kVDZZUgpzcTdWSW8wS0ZDY0x0ZGlMYXhYdEpQTm9WK1daV3ViOTluVEh1YTl0M3BuNnE4WmFiNXRHbXFhMGFPN0lzamVaCmxnWUJnaTRuNjJjS1JNZTZRSmZnNVoyQ0JHOSsyeDNxYWlDU24rR1NxOTZjK1Q0UTJZSG9tNFA5SGUvMmRrQzAKc3hVMk8xUm1oUWFnQ3BRbXkyVFp0cVdvSFROWFU1UG5XWVpMbWhybnZFVlJUVnUydHJWbEsyVzRQaVhsR1lqVQpRTlFNUkVhdnVqUlhUZ21JOGh4RXpxeTZnM09pR0VSWmIvNEVJZytpWWlJMi8yWi92OXRyM2NGK3Q5L05UU3UvCmRUZ3JSN2VWMitHeXE4ejZDblhYN3hobGN2U3p1S1F0NHh2L25lbFNlMVlGb2d4dGJVM2twVGQ2SUxJZ3lyR3kKQWhGc1NZNGlGZGhycmRkRXFjWm1yMEgwZitwREJLak9GakdJdHZaZkJ5THc3THRERUsxdzJhSkFsSjIwVUt1cQp2QnlKZGsxdTNxMkpVaERWS1dMWUI2SW1FTG5qd1pFYmlZclFPYTJKWEtwenJGVytOMUY4MWllaEhnZEg2V29nCndpV2UrY08wVnpyUDBIQ1Bwd2RIM2Y3cHYzZDczYjQvTkc2c1ROVG9RTlNJTGtIVUJFZUI2QnRUNXRVZnpGYTYKYUJ5SUZJajhPZEZpQWcxSmlDTTRRbHZMTWE3bC9WeXZmQ0JDMkFRaWZTYjVlek02K3Rhc0pKSDJHRVF0YWswcQpTQUpSTlJDSkMwVGRvY0haRlNvekVDRUt3MUtaRjVFYmEyMU5WSnV0Z3lnUXlYSWtDZ0ZaT1JqUDZ5VEVVUlRMCk45OGppaElRK2YwTzFZU0krTTcwdThIUlc1TUxhZ21CT1JLZHpEUzZRRnZ0SG56ZDdhUFdSaUpVNXBxb1Y4c1cKV1lPb252Z3BITDA2ZCtUTjFzNSs0MzlucExFK1E5Z0Zvc1NoQTg0ckc0akFOak9pUTczMVJ1ZGRpbnhLNlhZOApPclJXTXBkaUs0aHlyWEdEVUY0aE11aDE3WGNEMGFsZkUwbWljL1JtY05RakNpRVJSRXZwRWNyeUtsVmpIQVdpCkVObGF2RVUxRFVSOTRvNEhvbEJyZ0prWjlPdVo0UEoxM3Fjb0NSMFNpQlNJcW9Fb3M3TGFWdjNQcEVKUHExdkUKa1p4TTAwYXMvY1BCUVlzNDhoMU1kWWRHU2tnQ1IyaHJhTkFpQ25FazhnMklka0gwcnlHeXZabit6RFhlNW9GbwphR3VoMXNMQmNOVEtINHlzQU5JaE1BYWlWWCtZamtTaGgwSS80VXh2a3R3SzdrYTZmYW1hRThsL0RxSTIrNmZJCnhkYTZENGpzVFA4dmNGd1NWVGdYQXllSWpOYkhnYWk3UXVSQTFBejlVWVBEa2dydEZISUNrUSt0cmZ4WHRINUIKdndWZjNVNkRMYTAwdFVLb3FSTXhXZDc1OUxqRnVQYno3akIxYWhocHJldUNvOWFqcFEyTzdDeFVwa0lQaWR4TApMR1U1K3Q5M0tHQStBNUhLMFI5dHozZnExZ01hanF4dGowNmJJMmxLM0s1Vk5yYmlZaENsdVk4T29yVGVIb25hCmhjYTQ5anF1RSt4UGNqR0xVQk1uOGljMHNiTS9Zc0JCNnNJSDRnaEVvQWxFNkNsUmE5WFVnQU05Y3lBQ1c1emwKN1ptODI5NlIrYlpSeDVrQ1VUVGZpVUJrKzhtcHgzZzJXWTlyTVVMa3I5SEtZOXlBcE1jRGtkTm10VUl4WjRVUgpERkd4eHdDTDhKWi83bElRM1pnUVFHdWlnejhMUkM3NVRlU3NGS3FTb214eHVaSEsvUVRqSzRpaTlNMXhiWEE3CkUzb2k1SGFLdGl1ZHdzMEEvdXNWYnRCT2NJazNGR091YkJ2MkI2aVBFdUZ5OE44cE92OFhLUnJGdWpKcmd6dUoKa3pQY09QektTQmM3VStPNlg2RUpmK1QrYmwwa2lydUpDT1ZmSkVBam9hZEEwL3lzaExBVVdWMGVHcTVtblhwegp2dlRSYitEY2RPbjZ5Z25qZmhEaHZ6dWwyeEdGNEw2aG1LdUZqMnB3MU5XTk41eno4VTNxWXRkbk9Ccit2WFp4CndzWENTSEd4ZXMrRld4R2QzYk93enpyOVZrU2ZsU01Qb2dFYW9BRWFvQUVhb0FFYW9BRWFvQUVhb0FFYW9BRWEKb0FFYW9BRWFvQUVhb0FFYW9BRWFvQUVhb0FFYXVLZUIvd3RVL0RMVUNtVnVaSE4wY21WaGJRcGxibVJ2WW1vSwpNVE1nTUNCdlltb0tOemMyT0FwbGJtUnZZbW9LTWpVZ01DQnZZbW9LUER3Z0wweGxibWQwYUNBeU5pQXdJRklnCkwxUjVjR1VnTDFoUFltcGxZM1FnTDFOMVluUjVjR1VnTDBsdFlXZGxJQzlYYVdSMGFDQTBPRGdnTDBobGFXZG8KZENBeE56QWdMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbElDOUNhWFJ6VUdWeQpRMjl0Y0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5WldGdENuZ0I3WnBCCmkrUElGY2RsZE5DbDZXTEpLZENvUXZhUTY0UWMwZ0hqT3M3WFNFaENqcGtoaHpTa3NUUTByQzdMVkk2N0VPS3YKa0c4UTlZaHNIWDNNM2lLbFlIeE1DUjFTRFlWZS9sV1NiYm5YN1oxSkUwaUl5OWdxVmRWUDcrbGZWY2J2V1VULwprZkl3dWFxYzFLZlYxZlRFMTd1eG9kMTFhQnBnOU9oZFk2aXNkcWVoWTdQcjd4NUdlNTBtTG1qdHllWVFmdmpTCnhpUCtDTllsR3pwYVRTa2pqUG9HYkQ4eDkzN01ablJwYjFubk83aFBrejRKQXc0dHU3ZzFIbFlqckhadWIwYXYKMGRFdmpzUEVXcHNkaGRVVS9rSC84cmhsbHhYRUZYRk56bnVnU2VCaUR4VGdjQUhsbHArNmw1YnJvdE4ydkJjTQpJVEtmdEc0WnV5UzZTVFRWd2lUbTB6cU5iVkptRXVEN0JOVU84SS9jUzVQOFBXNjF3YjN2eXNOM1czY1QyVTF1CktrMGxLNU15THE4aXEzTGg0VHFhMlZnRC9xRlZ1cXBmdDFvZlNNWmJhKzFyVXYvRWRQNU5Ga1YxZDI5dFM0d0MKWExla3RiSTlZTlUwcHRXYkEzalZtdFlCSmt3bnJhV1N1ckk0WjhSelRycTFhQWY4a3djbEcyMVIzeTdBd2ZlMgphZDJyS2F6TURxNjI4SFdyWkhzRU5uSGpyak5GY0p2a0NwWUIzMUJCQXZmczRVYXJ0ci91UmppUGQzTDVpa21hCmZzNFRGMnN5akc4OEhOM3krOTdEY052TlBEei8rWEc0cGNhSkpMRXpxSjB3N2VHNForWjJnQTNhS3l5eExhd08KREpPaDFvbXFhQ0ZZb1FhWXFIRHp3VzNUdEFIK1ZUWGU4eEZZMzJuQWNnZnJmb0FiZy9hcWNvdWtHdFYrREpmdQpsNEN4VitXYTZUWGM5c3Q0bm5uQkJsaDV1QmptK1JCdXlkamZ4VldBcGJ4VGxiSlpWOUYxZ0xGR0dsMHBKMWhWCjNkVS9iZjJvYVduSlJROS9yVjlCc005WUhsZXhjbk9UL09HYXNKOHhWUWFDUldrVXhXVlN6N0MyRDZlcXBUNjIKekZ3SHRldmZtQityUGpJOHQ5Q2VkT2ZWZmlkN1FYLzVFNmVrSXp2ZEdNRUgxZ3ZyTjZMQnkvNldhRVowRDRlRQovMzdCSjYzQ3FJLzQySDk1RXZHUDRNTFFaOEhUM2ZQUmxqL1cwL1A0c3dML2h3cjAyVE51K25ud013eWYwYk1DClp3WE9DcHdWT0N2d1A2a0Fmb3dmbGpWUnp5Wk5xMGw5V2tYc2dRaHlXOGJhbXFTYndrejRBUTNlWllhUEN1OVEKQnRoa3EzQzJoME1XZ0VvZW1pL0R3Y09ScndWNGc4cnZlYlNJTWlOOFkwZzQ0Tk4rN2I2MDRYeE1WUUJHY09KLwp1RE00SkVPWEQ0NXlFUzBqT29UZHpNMEdXQTZ1OENGQzhYQXhoVXQ2UTNlUFlFb29tY0p1RDNOY2JXKzVwSHVrClhWcU9mcFRCVUI4anhncm5Fa0ZoUXpYM2xpMDUzbk5WTGlOdCtYdFd6dG5vZHN0WHEvVVhWK3dyWnBubExuS3oKbXVYQVpGV0tQTXZUUldUaTZMVkpBQ091MHpWU0V2bDFRdC9oMzEvK0ltdmxpc3M4U3NyRUpEVzNYOXN2YWhZdApaNEJ6SG9rb25VYzNMUHBaZ3pUS21uUGtFMVJaYlJBMURWUFZyZ0hmdlZIMzkxcGpSaVN0YkQ5ZklGZWhWcGNwCnl2ejJOa3MwcG9oTFlnak1FVXhQWU1YNUdpRnExYW8yd05LNkxPVWtDM29yVXJ6Y2JjWTBGTUZVTVZrQjcvUXUKWG1zckR5dmtCWlRQZGFCWW02WENaMG5laXFzQjVoNk9PUGpIc0FZc0J4ak9vUmhMVjRKeVRwKy91TUpsN0cwMgp3S0ptVE9jeExGc1JCdUxPTVZjRFhNNE9ZRkZmUkJlQW94SEc5QVFZeVNVLys2Rk1ZT1E2ZkxIQnNxVHlJc2JkCno3Y3d2SlpNTXdLTXBUU1VQYnhOb3dIMjkwenljK0hoK2UzZ05wYUpaTzhZd2UzZFptd3RwbSs0WjJ4UlgwYkIKaUFNVzZmWHREaFpRdXppRTNUZGd0d3lXK2RzOUREVjQ3MkgxR0dZTWxpc2t1amFEWmJkWWVMZjVKZThYc0x3VQozR2ZCZUoreUFrZmwzMkVnMUhiOHJZZkxTbmNqakJYbTRVdkdPSmJucXlYakhmSnZqQ0tXSXhHbmRQMXFKeGp4Ck1zQ0ppYmR3dFBSd3puSSsrK01pV3NhckRway95TCt1dFUwMm5YbUI3NFZRSG1oVi8yTkZoRjJWRExDakhCSEYKR2p1cnpDb1MyT0YvRGltTEVUZ2Z6Z3FjRlRncmNGYmdyTUJaZ2JNQ1p3WE9DcHdWK0s5UVFKMzBZdjgvbnNBNApHUjRUbUFDbjRTR1c4c001M3Y4K0REckFBbGZabHRPV3Q2Tnc1QVBjaXdreHFVNUdIcWw2dUJmMDBiQ1B4WHZ1CkRtRThhU0dLSTBiMlRkMzdoQ3pMc3hjaW5kVWNsbk1YUjh1a1l6RVpoR3VmOFZPT2QzVk1kWEt4aUhnYUk3VHIKRVd6SDBVMXNMbUk4YVpFbkJSOFNLM3RyMDVxdUc5SktMQzU1S3RZU2NEb1hoV25xbTR5SzRrNnAwekJ5RC9Bcwo1VExGUXpheVh5RExvSnEyUVc1S3FrSXJ2bzBicHhhM2RUM0NZb1RuV1NvVUhnOXdHYkVLc09UYmtVZU9Ib2FrCnFaQUxnZnhHdjRNRllHUkZUc1BLdzJXQURRU2JSN0JjejN4R2dudDRmZEp5NVdFUWttTm1HT0NGS0VyODg1OE0KOEZmaWlMdmJKaDFnSG1DMVp2MTExb3VpUXU3aC9nTmhoUW55bGlYVTNzR3RoNnZpWGJZMWMrUVkxSjdBODhGeQpoNlFWVTREcmI0TXJXcVNjd2JKWFc4RHRCaWxEU0NFaFdIaWM2WWpSME9RdE4rb3FCWXNNakY4a3hERUJHckR5CithK1RzTTl1R2VRbHZpZjRHNnh0RXBHSXk1dVp0bGp5eUx5ZGh2MkRUWTVYOUNLanl2d2FtN0RNN21vWGR5NGgKazYzOTR4WWZVTVFUWTNaWnR5ZjZmWE12bnVoOEZ1elR2TjlXbnJTOC8ybytjUW54Uk44SHdVK3dwNXYvQlZMRwpDaFlLWlc1a2MzUnlaV0Z0Q21WdVpHOWlhZ295TmlBd0lHOWlhZ294T0RNeENtVnVaRzlpYWdveE9TQXdJRzlpCmFnbzhQQ0F2VEdWdVozUm9JREl3SURBZ1VpQXZWSGx3WlNBdldFOWlhbVZqZENBdlUzVmlkSGx3WlNBdlNXMWgKWjJVZ0wxZHBaSFJvSURFMk9DQXZTR1ZwWjJoMElEY3lJQzlKYldGblpVMWhjMnNLZEhKMVpTQXZTVzUwWlhKdwpiMnhoZEdVZ2RISjFaU0F2UW1sMGMxQmxja052YlhCdmJtVnVkQ0F4SUM5R2FXeDBaWElnTDBac1lYUmxSR1ZqCmIyUmxJRDQrQ25OMGNtVmhiUXA0QWRXVU8yN0VJQkNHaVZ4czZTTlE1QWhwSTNHWUhDRnRKQ2ZhZ3RKWFNqUUYKMS9ES0Z5QWRrUkFFQnRiN3MwYUpWcWxDZ1VmZnZNd3dRNHczckxGbjI0RWk3cUVYMHd6dUs4ditVZWs5RE5McwpZSXlTL2dJRHV2c25yM0t3b01wdmNPQmxzSWNzZUlUdnd6SXduTUNTaUU0Wk9vUjZOWjhaMmdpV2V0VU1Ud2puCmRiYlprbnBRWDBGMkh4R2VZOG9XY3ZhZ0drZ00wMWtwNXl0TEgra2pTVTZNQU9zeEU0VEtMdysyWGlOQU42VWMKdkFBV2tIZTg0bzEyb2R6VUlIUWg2UCtmMkRuUlcyYzZndWlVemdtRnBTdDk1VjhVVnI0Mlc3Z0JWaGV1NWViZQpnYzBnMkh2SHpkRDAvSGxrQkhZZEhZbFM3SENIMEpEaGtYbFZrR2l1STlNa1N0UEJQUjlrWTFsZ0hBR08xZkozCk9OY3h2SXJKcy9uVnZBeWFUTTVnQmRhem5paTlZRkQ1WlZnT3VZUkRCT2llbmN3d1JsMCs3WTYzdVdtNlVHN3EKaXhCNjhLTCtXZm9HVjRWN0l3cGxibVJ6ZEhKbFlXMEtaVzVrYjJKcUNqSXdJREFnYjJKcUNqTXpOUXBsYm1SdgpZbW9LTXpFZ01DQnZZbW9LUER3Z0wweGxibWQwYUNBek1pQXdJRklnTDA0Z015QXZRV3gwWlhKdVlYUmxJQzlFClpYWnBZMlZTUjBJZ0wwWnBiSFJsY2lBdlJteGhkR1ZFWldOdlpHVWdQajRLYzNSeVpXRnRDbmdCblpaM1ZGUFoKRm9mUHZUZTkwQklpSUNYMEdub0pJTkk3U0JVRVVZbEpnRkFDaG9RbWRrUUZSaFFSS1Zaa1ZNQUJSNGNpWTBVVQpDNE9DWXRjSjhoQlF4c0ZSUkVYbDNZeHJDZSt0TmZQZW12M0hXZC9aNTdmWDJXZnZmZGU2QUZEOGdnVENkRmdCCmdEU2hXQlR1NjhGY0VoUEx4UGNDR0JBQkRsZ0J3T0ZtWmdSSCtFUUMxUHk5UFptWnFFakdzL2J1TG9Ca3U5c3MKdjFBbWM5Yi9mNUVpTjBNa0JnQUtSZFUyUEg0bUYrVUNsRk96eFJreS93VEs5SlVwTW9ZeE1oYWhDYUtzSXVQRQpyMnoycCtZcnU4bVlseWJrb1JwWnpobThOSjZNdTFEZW1pWGhvNHdFb1Z5WUplQm5vM3dIWmIxVVNab0E1ZmNvCjA5UDRuRXdBTUJTWlg4em5KcUZzaVRKRkZCbnVpZklDQUFpVXhEbThjZzZMK1Rsb25nQjRwbWZraWdTSlNXS20KRWRlWWFlWG95R2I2OGJOVCtXSXhLNVREVGVHSWVFelA5TFFNampBWGdLOXZsa1VCSlZsdG1XaVI3YTBjN2UxWgoxdVpvK2IvWjN4NStVLzA5eUhyN1ZmRW03TStlUVl5ZVdkOXM3S3d2dlJZQTlpUmFteDJ6dnBWVkFMUnRCa0RsCjRheFA3eUFBOGdVQXRONmM4eDZHYkY2U3hPSU1Kd3VMN094c2N3R2ZheTRyNkRmN240SnZ5citHT2ZlWnkrNzcKVmp1bUZ6K0JJMGtWTTJWRjVhYW5wa3RFek13TURwZlBaUDMzRVAvandEbHB6Y25ETEp5ZndCZnhoZWhWVWVpVQpDWVNKYUx1RlBJRllrQzVrQ29SLzFlRi9HRFluQnhsK25Xc1VhSFZmQUgyRk9WQzRTUWZJYnowQVF5TURKRzQvCmVnSjk2MXNRTVFySXZyeG9yWkd2YzQ4eWV2N24raDhMWElwdTRVeEJJbFBtOWd5UFpISWxvaXdabzkrRWJNRUMKRXBBSGRLQUtOSUV1TUFJc1lBMGNnRE53QTk0Z0FJU0FTQkFEbGdNdVNBSnBRQVN5UVQ3WUFBcEJNZGdCZG9OcQpjQURVZ1hyUUJFNkNObkFHWEFSWHdBMXdDd3lBUjBBS2hzRkxNQUhlZ1drSWd2QVFGYUpCcXBBV3BBK1pRdFlRCkcxb0llVU5CVURnVUE4VkRpWkFRa2tENTBDYW9HQ3FEcXFGRFVEMzBJM1FhdWdoZGcvcWdCOUFnTkFiOUFYMkUKRVpnQzAyRU4yQUMyZ05td094d0lSOExMNEVSNEZad0hGOERiNFVxNEZqNE90OElYNFJ2d0FDeUZYOEtUQ0VESQpDQVBSUmxnSUcvRkVRcEJZSkFFUklXdVJJcVFDcVVXYWtBNmtHN21OU0pGeDVBTUdoNkZobUJnV3hobmpoMW1NCjRXSldZZFppU2pEVm1HT1lWa3dYNWpabUVET0IrWUtsWXRXeHBsZ25yRDkyQ1RZUm00MHR4RlpnajJCYnNKZXgKQTloaDdEc2NEc2ZBR2VJY2NINjRHRnd5YmpXdUJMY1AxNHk3Z092RERlRW04WGk4S3Q0VTc0SVB3WFB3WW53aAp2Z3AvSEg4ZTM0OGZ4cjhua0FsYUJHdUNEeUdXSUNSc0pGUVFHZ2puQ1AyRUVjSTBVWUdvVDNRaWhoQjV4RnhpCktiR08yRUc4U1J3bVRwTVVTWVlrRjFJa0tabTBnVlJKYWlKZEpqMG12U0dUeVRwa1IzSVlXVUJlVDY0a255QmYKSlErU1AxQ1VLQ1lVVDBvY1JVTFpUamxLdVVCNVFIbERwVklOcUc3VVdLcVl1cDFhVDcxRWZVcDlMMGVUTTVmegpsK1BKclpPcmtXdVY2NWQ3SlUrVTE1ZDNsMTh1bnlkZklYOUsvcWI4dUFKUndVREJVNEdqc0ZhaFJ1RzB3ajJGClNVV2FvcFZpaUdLYVlvbGlnK0kxeFZFbHZKS0JrcmNTVDZsQTZiRFNKYVVoR2tMVHBYblN1TFJOdERyYVpkb3cKSFVjM3BQdlRrK25GOUIvb3ZmUUpaU1ZsVytVbzVSemxHdVd6eWxJR3dqQmcrRE5TR2FXTWs0eTdqSS96Tk9hNQp6K1BQMnphdmFWNy92Q21WK1NwdUtueVZJcFZtbFFHVmo2cE1WVy9WRk5XZHFtMnFUOVF3YWlacVlXclphdnZWCkxxdU56NmZQZDU3UG5WODAvK1Q4aCtxd3VvbDZ1UHBxOWNQcVBlcVRHcG9hdmhvWkdsVWFselRHTlJtYWJwckoKbXVXYTV6VEh0R2hhQzdVRVd1VmE1N1ZlTUpXWjdzeFVaaVd6aXptaHJhN3RweTNSUHFUZHF6MnRZNml6V0dlagpUclBPRTEyU0xsczNRYmRjdDFOM1FrOUxMMWd2WDY5Ujc2RStVWit0bjZTL1I3OWJmOHJBMENEYVlJdEJtOEdvCm9ZcWh2MkdlWWFQaFl5T3FrYXZSS3FOYW96dkdPR08yY1lyeFB1TmJKckNKblVtU1NZM0pUVlBZMU41VVlMclAKdE04TWErWm9KalNyTmJ2SG9yRGNXVm1zUnRhZ09jTTh5SHlqZVp2NUt3czlpMWlMblJiZEZsOHM3U3hUTGVzcwpIMWtwV1FWWWJiVHFzUHJEMnNTYWExMWpmY2VHYXVOanM4Nm0zZWExcmFrdDMzYS83WDA3bWwydzNSYTdUcnZQCjlnNzJJdnNtK3pFSFBZZDRoNzBPOTloMGRpaTdoSDNWRWV2bzRiak84WXpqQnlkN0o3SFRTYWZmblZuT0tjNE4KenFNTERCZndGOVF0R0hMUmNlRzRISEtSTG1RdWpGOTRjS0hVVmR1VjQxcnIrc3hOMTQzbmRzUnR4TjNZUGRuOQp1UHNyRDBzUGtVZUx4NVNuaytjYXp3dGVpSmV2VjVGWHI3ZVM5Mkx2YXUrblBqbytpVDZOUGhPK2RyNnJmUy80CllmMEMvWGI2M2ZQWDhPZjYxL3RQQkRnRXJBbm9DcVFFUmdSV0J6NExNZ2tTQlhVRXc4RUJ3YnVDSHkvU1h5UmMKMUJZQ1F2eERkb1U4Q1RVTVhSWDZjeGd1TERTc0p1eDV1RlY0Zm5oM0JDMWlSVVJEeEx0SWo4alN5RWVMalJaTApGbmRHeVVmRlJkVkhUVVY3UlpkRlM1ZFlMRm16NUVhTVdvd2dwajBXSHhzVmV5UjJjcW4zMHQxTGgrUHM0Z3JqCjdpNHpYSmF6N05weXRlV3B5OCt1a0YvQldYRXFIaHNmSGQ4US80a1R3cW5sVEs3MFg3bDM1UVRYazd1SCs1TG4KeGl2bmpmRmQrR1g4a1FTWGhMS0UwVVNYeEYySlkwbXVTUlZKNHdKUFFiWGdkYkpmOG9Ia3FaU1FsS01wTTZuUgpxYzFwaExUNHROTkNKV0dLc0N0ZE16MG52Uy9ETktNd1E3ckthZFh1VlJPaVFOR1JUQ2h6V1dhN21JNytUUFZJCmpDU2JKWU5aQzdOcXN0NW5SMldmeWxITUVlYjA1SnJrYnNzZHlmUEorMzQxWmpWM2RXZStkdjZHL01FMTdtc08KcllYV3JsemJ1VTUzWGNHNjRmVys2NDl0SUcxSTJmRExSc3VOWlJ2ZmJvcmUxRkdnVWJDK1lHaXo3K2JHUXJsQwpVZUc5TGM1YkRtekZiQlZzN2QxbXM2MXEyNWNpWHRIMVlzdmlpdUpQSmR5UzY5OVpmVmY1M2N6MmhPMjlwZmFsCiszZmdkZ2gzM04zcHV2TlltV0paWHRuUXJ1QmRyZVhNOHFMeXQ3dFg3TDVXWVZ0eFlBOXBqMlNQdERLb3NyMUsKcjJwSDFhZnFwT3FCR28rYTVyM3FlN2Z0bmRySDI5ZS8zMjEvMHdHTkE4VUhQaDRVSEx4L3lQZFFhNjFCYmNWaAozT0dzdzgvcm91cTZ2MmQvWDM5RTdVanhrYzlIaFVlbHg4S1BkZFU3MU5jM3FEZVVOc0tOa3NheDQzSEhiLzNnCjlVTjdFNnZwVURPanVmZ0VPQ0U1OGVMSCtCL3ZuZ3c4MlhtS2ZhcnBKLzJmOXJiUVdvcGFvZGJjMW9tMnBEWnAKZTB4NzMrbUEwNTBkemgwdFA1di9mUFNNOXBtYXM4cG5TOCtSemhXY216bWZkMzd5UXNhRjhZdUpGNGM2VjNRKwp1clRrMHAydXNLN2V5NEdYcjE3eHVYS3AyNzM3L0ZXWHEyZXVPVjA3ZloxOXZlMkcvWTNXSHJ1ZWxsL3NmbW5wCnRlOXR2ZWx3cy8yVzQ2Mk92Z1Y5NS9wZCt5L2U5cnA5NVk3L25Sc0Rpd2I2N2k2K2UvOWUzRDNwZmQ3OTBRZXAKRDE0L3pIbzQvV2o5WSt6am9pY0tUeXFlcWordC9kWDQxMmFwdmZUc29OZGd6N09JWjQrR3VFTXYvNVg1cjAvRApCYytwenl0R3RFYnFSNjFIejR6NWpOMTZzZlRGOE11TWw5UGpoYjhwL3JiM2xkR3JuMzUzKzcxbllzbkU4R3ZSCjY1ay9TdDZvdmpuNjF2WnQ1MlRvNU5OM2FlK21wNHJlcTc0LzlvSDlvZnRqOU1lUjZleFArRStWbjQwL2Qzd0oKL1BKNEptMW01dC8zaFBQN0NtVnVaSE4wY21WaGJRcGxibVJ2WW1vS016SWdNQ0J2WW1vS01qWXhNZ3BsYm1SdgpZbW9LTVRFZ01DQnZZbW9LV3lBdlNVTkRRbUZ6WldRZ016RWdNQ0JTSUYwS1pXNWtiMkpxQ2pNeklEQWdiMkpxCkNqdzhJQzlNWlc1bmRHZ2dNelFnTUNCU0lDOU9JREVnTDBGc2RHVnlibUYwWlNBdlJHVjJhV05sUjNKaGVTQXYKUm1sc2RHVnlJQzlHYkdGMFpVUmxZMjlrWlNBK1BncHpkSEpsWVcwS2VBR2xWd2RZazljYVB2OUl3a3JZVTBiWQp5REtnN0JtWkFXUVBRVlJpRWtnWUlRYUNnTGdveFFyV0xRNGNGUzJLVXJSYUVTZ3UxT0tnYmxEcnVGQkxCYVVXCnE3aXdlczhKb05EMnVmYyt6ODMvSFA3M2ZHZDg2ejNmZndCQVhjaVZTTEp4QUVDT09GOGFFc3RPbnBtY3dxVGQKQXdwQUY2Z0NSNkRLNWVWSjJOSFJFWEFLRU9lS0JlZzk4ZmV5QzJCSWNzTUI3VFZ4N0wvMktIeEJIZy9PT2dWYgpFVCtQbHdNQTVnMEFyWThua2VZRG9HZ0I1ZVlMOGlVSWgwS3NsUlVmR3dCeEtnQUtLcU5yb1JpWWhBakVBcW1JCnh3eVJjb3VZSWR5Y0hDN1QyZEdaR1MzTlRSZGwvNFBWYU5ILzg4dkpsaUc3MGM4RU5wVzhyTGh3K0hhRTlwZngKdVlFSXUwTjhtTWNOaWh2Rmp3dEVpWkVRK3dPQW0wbnlwOGRDSEFieFBGbFdBaHRpZTRqcjA2WEJDUkQ3UW54YgpLQXRGZUJvQWhFNnhNRDRKWW1PSXc4VHpJcU1nOW9SWXlNc0xTSUhZQnVJYW9ZQ0Q4Z1JqUmx3VTVYUGlJWWI2CmlLZlMzRmcwM3hZQTBwc3ZDQXdha1pQcFdibmh5QVl6S1A4dXJ5QU95ZVUyRndzRGtKMVFGOW1WeVEyTGh0Z0sKNGhlQzdCQTBIKzVETVpEa1I2TTlZWjhTS002T1JIcjlJYTRTNU1uOWhYMUtWNzR3SHVYTUdRQ3FXYjQwSHEyRgp0bEhqMDBYQkhJaURJUzRVU2tPUkhQcExQU0hKbHZNTXhvVDZUaXFMUmI1REgybkJBbkVDaWlIaXhWS3VOQ2dFClloZ3JXaXRJeExoQUFITEJQUGlYQjhTZ0J6QkJIaENCQWpuS0FGeVFBeHNUV21BUFd3aWNKWVpOQ21ma2dTd28KejRDNDkrTTQ2cU1WYUkwRWp1U0NkRGd6RzY0Ymt6SUJINjRmV1lmMnlJVU45ZEMrZmZKOWVhUDZIS0crQU9PdgpnUXlPQzhFQUhCZENOQU4weXlXRjBMNGMyQStBVWhrY3k0QjR2QlpueUNObkVDMjNkY1FHTkk2MDlJOXF5WVVyCitISmRJK3VRbHlPMkJVQ2J4YUFZamlIYjVKNlR1aVNMbkFxYkZ4bEIrcEFzdVRZcG5GRUVIT1J5Yjdsc1RPc24KejVGdi9SKzF6b2UyanZkK2ZMekdZbndheGlzZjdwd05QUlNQeGljUFd2TU8ycDAxdXZwVE5PVWExeGpJYkNTUwpxbFV4bkRtMWNvdVI3OHhTNlZ3Ujc4cnF3ZitRdFUvWkd0UHVNQ0Z2VWVONUlXY0svMis4Z0xvbzF5bFhLUThvCk53RVR2bitoZEZMNklMcEx1UWVmT3gvdGlSN0hCeFI3eEJ3Ui9DdUNQbzR4WUlSWlBMa0U1U0liUGlndmY3ZnoKVTg1Rzl2bkxEaGdoMTRzNHk1YnZnaGlXQXh2S3JFQ2UxeENvbnd2emtRZWpMWU04UmR4d2dJd1puN3NSTGVOTwpRSHRKcXg1Z2RxMDhkUUV3NjlXYXo4dTF5S1BkU1RhbDNsQnBMMGtYcnpHUVNPYlVsZ3dMSko5R1VSNEV5eU5mClJvSlNlOVloMWdCckQ2dWU5WnoxNE5NTTFpM1diNnhPMWk0NDhvUllUeHdsamhQTlJBdlJBWml3MTBLY0pwcmwKcUo1b2hjKzNIOWROWlBqSU9ackljTVEzM2lpamtZLzVvNXdhei8xeEhzcmpOUll0Tkg4c1U1bWpKM1U4OTFCOAp4ek1HWmV4L3MyaDhSaWRXaEpIc3lFOGR3NXpoeEtBeGJCa3VERFlEWTVqQ3g1bmhENUU1dzR3UndkQ0ZvNkVNCmEwWWdZOUxIZUl5Y2NXUUhPdStJWVdOMTRWTVZTNGFqWTB4QS9na2hENlR5bXNVZDlmZXZQakluZUlrcW1tajgKcWNMbzhHU09hQnFwQ1dNNngrSXFaOGlFazVVQU5ZbkFBbWlIRk1ZVm5YWXhyQ1hNQ1hOUUpVWlZDRElTbXlYUAo0VCtjQk5LWWRDSTVzREpGQVNiSkpsMUkvMUdNcXBVM2ZGQ3RHcW5lRHFRZkhQVWxBMGwzVk1mR2V3QjNINGtYCnFtai9iUDM0a3lHZ2VsS3RxVUZVYS9uZWN1K29nZFJRYWpCZ1VwMlFuRHFGR2dheEI1cVZMeWlFZHc4QUFuSWwKUlZKUmhqQ2Z5WWEzSEFHVEkrWTUyak9kV1U3dzY0YnVUR2dPQU05ajVIY2hUS2VESjVNV2pNaEk5S0lBSlhpZgowZ0w2OEt0cURyL1dEdEFyTitBRnY1bEI4QTRRQmVKQk1wZ0QvUkRDVEVwaFpFdkFNbEFPS3NFYXNCRnNCVHZCCkhsQUhHc0JoY0F5MGd0UGdCM0FKWEFXZDRDNzhudlNDSjJBUXZBVERHSWJSTURxbWllbGpKcGdsWm9jNVkrNlkKTHhhRVJXQ3hXREtXaG1WZ1lreUdsV0NmWVpYWU9td3J0Z3Vydzc3Rm1ySFQyQVhzR25ZSDY4SDZzVCt3dHppQgpxK0JhdUJGdWhVL0IzWEUySG83SDQ3UHhESHcrWG95WDRhdnd6WGdOWG84MzRxZnhTM2duM28wL3dZY0lRQ2dUCk9vUXA0VUM0RXdGRUZKRkNwQk5TWWpGUlFWUVJOVVFEckFIdHhBMmlteGdnM3BCVVVwTmtrZzR3aTZGa0Fza2oKNTVPTHlaWGtWbklmMlVpZUpXK1FQZVFnK1o1Q3B4aFM3Q2llRkE1bEppV0Rzb0JTVHFtaTFGS09VczdCQ3QxTAplVW1sVW5WZ2Z0eGczcEtwbWRTRjFKWFU3ZFNEMUZQVWE5U0gxQ0VhamFaUHM2UDUwS0pvWEZvK3JaeTJoVlpQCk8wbTdUdXVsdlZaUVZqQlJjRllJVmtoUkVDdVVLbFFwN0ZjNG9YQmQ0WkhDc0tLYW9xV2lwMktVSWwreFNIRzEKNGg3RkZzVXJpcjJLdzBycVN0WktQa3J4U3BsS3k1UTJLelVvblZPNnAvUmNXVm5aVE5sRE9VWlpwTHhVZWJQeQpJZVh6eWozS2IxUTBWR3hWQWxSU1ZXUXFxMVQycXB4U3VhUHluRTZuVzlIOTZTbjBmUG9xZWgzOURQMEIvVFZECmsrSEk0REQ0akNXTWFrWWo0enJqcWFxaXFxVXFXM1dPYXJGcWxlb1IxU3VxQTJxS2FsWnFBV3BjdGNWcTFXck4KYXJmVWh0UTExWjNVbzlSejFGZXE3MWUvb042blFkT3cwZ2pTNEd1VWFleldPS1B4VUpQUU5OY00wT1JwZnFhNQpSL09jWnE4V1ZjdGFpNk9WcVZXcDlZM1daYTFCYlEzdGFkcUoyb1hhMWRySHRidDFDQjBySFk1T3RzNXFuY002ClhUcHZkWTEwMmJvQzNSVzZEYnJYZFYvcFRkTHoxeFBvVmVnZDFPdlVlNnZQMUEvU3o5SmZxMzlNLzc0QmFXQnIKRUdPd3dHQ0h3VG1EZ1VsYWs3d204U1pWVERvODZTZEQzTkRXTU5ad29lRnV3dzdESVNOam94QWppZEVXb3pORwpBOFk2eHY3R21jWWJqRThZOTV0b212aWFpRXcybUp3MGVjelVacktaMmN6TnpMUE1RVk5EMDFCVG1la3UwOHVtCncyYldaZ2xtcFdZSHplNmJLNW03bTZlYmJ6QnZNeCswTUxHWVlWRmljY0RpSjB0RlMzZExvZVVteTNiTFYxYlcKVmtsV3k2Mk9XZlZaNjFsenJJdXREMWpmczZIYitObk10Nm14dVRtWk90bDljdGJrN1pPdjJ1SzJMclpDMjJyYgpLM2E0bmF1ZHlHNjczVFY3aXIySHZkaSt4djZXZzRvRDI2SEE0WUJEajZPT1k0UmpxZU14eDZkVExLYWtURms3CnBYM0tlNVlMS3h0KzNlNDZhVGlGT1pVNnRUajk0V3pyekhPdWRyNDVsVDQxZU9xU3FVMVRuMDJ6bXlhWXRtUGEKYlJkTmx4a3V5MTNhWFA1MGRYT1Z1amE0OXJ0WnVLVzViWE83NWE3bEh1MiswdjI4QjhWanVzY1NqMWFQTjU2dQpudm1laHoxLzkzTHd5dkxhNzlYbmJlMHQ4TjdqL2RESHpJZnJzOHVuMjVmcG0rYjdsVyszbjZrZjE2L0c3MmQvCmMzKytmNjMvSS9aa2RpYTdudjEwT211NmRQclI2YThDUEFNV0Jad0tKQUpEQWlzQ0x3ZHBCQ1VFYlExNkVHd1cKbkJGOElIZ3d4Q1ZrWWNpcFVFcG9lT2phMEZzY0l3NlBVOGNaREhNTFd4UjJObHdsUEM1OGEvalBFYllSMG9pVwpHZmlNc0Juclo5eUx0SXdVUng2TEFsR2NxUFZSOTZPdG8rZEhmeDlEalltT3FZNzVOZFlwdGlTMlBVNHpibTdjCi9yaVg4ZFBqVjhmZlRiQkprQ1cwSmFvbXBpYldKYjVLQ2t4YWw5UTljOHJNUlRNdkpSc2tpNUtiVW1ncGlTbTEKS1VPemdtWnRuTldiNnBKYW50bzEyM3AyNGV3TGN3em1aTTg1UGxkMUxuZnVrVFJLV2xMYS9yUjMzQ2h1RFhkbwpIbWZldG5tRHZBRGVKdDRUdmo5L0E3OWY0Q05ZSjNpVTdwTytMcjB2d3lkamZVYS8wRTlZSlJ3UUJZaTJpcDVsCmhtYnV6SHlWRlpXMU4rdERkbEwyd1J5Rm5MU2NackdHT0V0OE50YzR0ekQzbXNST1VpN3BudTg1ZitQOFFXbTQKdERZUHk1dWQxNVN2QmYvQjdKRFp5RDZYOVJUNEZsUVh2RjZRdU9CSW9YcWh1TENqeUxab1JkR2o0dURpcnhlUwpDM2tMMjBwTVM1YVY5Q3hpTDlxMUdGczhiM0hiRXZNbFpVdDZsNFlzM2JkTWFWbldzaDlMV2FYclNsOThsdlJaClM1bFIyZEt5aDUrSGZINmduRkV1TGIrMTNHdjV6aS9JTDBSZlhGNHhkY1dXRmU4citCVVhLMW1WVlpYdlZ2SlcKWHZ6UzZjdk5YMzVZbGI3cThtclgxVHZXVU5lSTEzU3Q5VnU3YjUzNnV1SjFEOWZQV04rNGdibWhZc09MalhNMwpYcWlhVnJWems5SW0yYWJ1elJHYm03WlliRm16NWQxVzRkYk82dW5WQjdjWmJsdXg3ZFYyL3Zick8veDNOT3cwCjJsbTU4KzFYb3E5dTd3cloxVmhqVlZPMW03cTdZUGV2ZXhMM3RIL3QvblZkclVGdFplMmZlOFY3dS9mRjdqdGIKNTFaWHQ5OXcvK29EK0FIWmdmNzYxUHFyM3dSKzA5VGcwTERyb003QnlrUGdrT3pRNDIvVHZ1MDZISDY0N1lqNwprWWJ2TEwvYmRsVHphRVVqMWxqVU9IaE1lS3k3S2JucFduTlljMXVMVjh2Ujd4Mi8zOXRxMmxwOVhQdjQ2aE5LCko4cE9mRGhaZkhMb2xPVFV3T21NMHcvYjVyYmRQVFB6ek0yek1XY3Zud3MvZC82SDRCL090TFBiVDU3M09kOTYKd2ZOQzgwWDNpOGN1dVY1cTdIRHBPUHFqeTQ5SEw3dGVicnppZHFYcHFzZlZsbXZlMTA1Yzk3dCsra2JnalI5dQpjbTVlNm96c3ZOYVYwSFg3VnVxdDd0djgyMzEzc3U4OCs2bmdwK0c3UytFbHZ1SysydjJxQjRZUGF2NDErVjhICnUxMjdqL2NFOW5UOEhQZnozWWU4aDA5K3lmdmxYVy9aci9SZnF4NlpQS3JyYys1cjdRL3V2L3A0MXVQZUo1SW4Kd3dQbHY2bi90dTJwemRQdmZ2Zi92V053NW1Edk0rbXpEMytzZks3L2ZPK0xhUy9haHFLSEhyek1lVG44cXVLMQovdXQ5Yjl6ZnRMOU5ldnRvZU1FNzJydk5mMDcrcytWOStQdDdIM0krZlBnM0xWM3dIQXBsYm1SemRISmxZVzBLClpXNWtiMkpxQ2pNMElEQWdiMkpxQ2pNek5qY0taVzVrYjJKcUNqRTBJREFnYjJKcUNsc2dMMGxEUTBKaGMyVmsKSURNeklEQWdVaUJkQ21WdVpHOWlhZ296SURBZ2IySnFDanc4SUM5VWVYQmxJQzlRWVdkbGN5QXZUV1ZrYVdGQwpiM2dnV3pBZ01DQTFPVFV1TWpjMU5pQTROREV1T0RnNU9GMGdMME52ZFc1MElERWdMMHRwWkhNZ1d5QXlJREFnClVpQmRDajQrQ21WdVpHOWlhZ296TlNBd0lHOWlhZ284UENBdlZIbHdaU0F2UTJGMFlXeHZaeUF2VUdGblpYTWcKTXlBd0lGSWdQajRLWlc1a2IySnFDakk1SURBZ2IySnFDanc4SUM5VWVYQmxJQzlHYjI1MElDOVRkV0owZVhCbApJQzlVY25WbFZIbHdaU0F2UW1GelpVWnZiblFnTDFOSVFrdFBRaXRJWld4MlpYUnBZMkVnTDBadmJuUkVaWE5qCmNtbHdkRzl5Q2pNMklEQWdVaUF2Ulc1amIyUnBibWNnTDAxaFkxSnZiV0Z1Ulc1amIyUnBibWNnTDBacGNuTjAKUTJoaGNpQXpNaUF2VEdGemRFTm9ZWElnTVRJMUlDOVhhV1IwYUhNZ1d5QXlOemdLTUNBd0lEQWdNQ0F3SURZMgpOeUF4T1RFZ016TXpJRE16TXlBek9Ea2dNQ0F5TnpnZ016TXpJREkzT0NBeU56Z2dNQ0ExTlRZZ05UVTJJRFUxCk5pQTFOVFlnTlRVMklEQWdNQW93SURBZ01qYzRJREFnTUNBd0lEQWdNQ0F3SURZMk55QTJOamNnTnpJeUlEY3kKTWlBMk5qY2dOakV4SURBZ056SXlJREkzT0NBd0lEQWdOVFUySURnek15QTNNaklnTnpjNENqWTJOeUEzTnpnZwpOekl5SURZMk55QTJNVEVnTUNBd0lEQWdOalkzSURZMk55QXdJREFnTUNBd0lEQWdNQ0F3SURVMU5pQTFOVFlnCk5UQXdJRFUxTmlBMU5UWWdNamM0SURVMU5nbzFOVFlnTWpJeUlEQWdOVEF3SURJeU1pQTRNek1nTlRVMklEVTEKTmlBMU5UWWdOVFUySURNek15QTFNREFnTWpjNElEVTFOaUF3SURjeU1pQTFNREFnTlRBd0lEVXdNQ0F6TXpRSwpNQ0F6TXpRZ1hTQStQZ3BsYm1Sdlltb0tNellnTUNCdlltb0tQRHdnTDFSNWNHVWdMMFp2Ym5SRVpYTmpjbWx3CmRHOXlJQzlHYjI1MFRtRnRaU0F2VTBoQ1MwOUNLMGhsYkhabGRHbGpZU0F2Um14aFozTWdNeklnTDBadmJuUkMKUW05NElGc3RPVFV4SUMwME9ERWdNVFEwTlNBeE1USXlYUW92U1hSaGJHbGpRVzVuYkdVZ01DQXZRWE5qWlc1MApJRGMzTUNBdlJHVnpZMlZ1ZENBdE1qTXdJQzlEWVhCSVpXbG5hSFFnTnpFM0lDOVRkR1Z0VmlBNU9DQXZXRWhsCmFXZG9kQW8xTWpNZ0wxTjBaVzFJSURnMUlDOUJkbWRYYVdSMGFDQTBOREVnTDAxaGVGZHBaSFJvSURFMU1EQWcKTDBadmJuUkdhV3hsTWlBek55QXdJRklnUGo0S1pXNWtiMkpxQ2pNM0lEQWdiMkpxQ2p3OElDOU1aVzVuZEdnZwpNemdnTUNCU0lDOU1aVzVuZEdneElERTVOemc0SUM5R2FXeDBaWElnTDBac1lYUmxSR1ZqYjJSbElENCtDbk4wCmNtVmhiUXA0QWNWOGVYeFVSYlp3VmQyMTEvUytyK2wwZHpyN1FqWVNralprWXdteXFDUklNRURDaml4Q1dBUW0KS29nc29vSXNBbzdpd3E2RUVDV0FNQXlpaU9Nb091S0M2SXdqT3M2TWVjN013MldBdnZsTzNRNFI4dWJOenovbQo5Nzd1UHJYZVcvZlVxVk9uempsVnQrZk5uZCtNTktnVk1XajRtUEd6SnlINVV6TWJJZmJpeEpuaklhWWY4MFVJCjNwL1lNczlIY3doeGJ5REVySjAwZS9MTWVGNXhHMEtxUnlmUFdOUnp2elVMb2F3bFU1ckhOOFhyMFRXSTg2ZEEKUVR5UCswR2NOR1htdklYeHZPa1N4RC9PbURXeHA5N1NCdmxsTThjdjdIaytvcy8zM1QxK1puUDgrcHFoRUNmTgpublhQdkhpK2VqL0VUOCtlMjl4elBhNEQvTzlHR0VwTDBTeWtRTk9SZ0FqU3dYY3lRc0xYcWtjUkM3VzBIajZUCmQzZS9kVmRDeVhkSUw4cjV1Mm9ma2VPUGpqeXo3Y2ZtYTJIVlkrSS9vVUJ4L1hvYTh4RXBncEFhUTMyWDZySGUKR3ZrK0NFbzdVVU1xUG9vNGZBVGRsWXAvaFk4Qkl2MVFCTG1SQWFxYlUzK0ZYMEhsZlVxT28vNDNsYUJmNGNPbwpGZzFBQlNpNTk3Wk8xSWh1bFV1Y1BRMGRRZFZ3elkxTkgrM1RORHFLVDBDSG0xSTc4Y3UreXFWVGJSV2RhRlJxCkp4b0VVQWFRQjVDYWVvc050ZUtkNkZHQXB3RVlOQld2UVlzQVZnRThBY0QycHZaQTdnaGUwODZLMGFONEVYTGcKd1ZFVjY3M05aUGZhbENydmU1Mlk3L2lsOTJQYkY4ZXdIWmpyYzJ4djF5REZMVXI4Tkg0S05TRXZmaDRGOFdKVQpnNUx4MWtPUkdkNUdxTnFEWmdPMEFqQnlpUEdlZGsrTzl3Uk9RMEVXd3owaDVHSHh5OTQvWmFkN3Y4enVKTGpkCmV5cmN5VUwwYXcva29nbmVrKzVmZW4vbG51dzlBYkF2WHJVM0FsZTg3TjNqbnVIZDRPbkVXOXU5NjkyZEdPNTUKTEI3TmQ4T3RMM3RuUmpaNW03TGwrcUdiT3NtK2RtOFIxTjhSVlhuekMvM2VQUGNsYjJhNFU4U1FUM2NQOWFaawovOWFiQkRmQ1pUNW9OQmpWZTEzdURkNytVT1Z4VjRiN0F4ekRlL0UybElLM3RRY0hlNDlDRXJwN2FGQ2tjRk1uCnZ2ZFFUWEoyc0JNdmp1YlhKRytLMUlTRGthSGVZS1FxSEliMEhXOEl5NFU3aFZ1RUhDRlZTQlpDZ2w5d0NpYlIKSU9wRXJhZ1dsYUlvQ3AxNGYzdVpseitHOTZFeUlNdStReUl2Y3AzNFJTaGtqK0VYNU1JWERvdXNTRVFrbWpxNwovOUNCZ0QxTm5YaGZoNDZtSVBFeUw2ZjRUdnpDb1hqUkMxRXZTMU9zWEtFak5BMEJoSWhna2FEQnFBMC8zTW1qCkZaYVdNbHVab1ZSZlZGWHh2d1dOY3MzMU1QVi8vOWl3dTIzVGtGRjFiWHZkOVcwNU5OSHRycjkrdWUxNjRuK04KNTgySHF1YnkxTlFoSXhjZGFwazliVkpsYzZDeU1WRFpETkRZdHFabGlxMnRkWUxQZDNEYWJGcmhhMk5DalJNbQpUcUh4K09hMjJZSG1pclpwZ1FyZndSYjV2ajdWazJoMVM2RGlJSnBVZVZ2ZHdVblI1b3IybG1oTFpXQjhSZjJoCkNlVnpHMjU2MXFyZVo4MHQveGZQS3FlTnphWFBtaURmMStkWkRiUjZBbjFXQTMxV0EzM1doT2dFK1ZtMDg1VlQKUjVYZk13KzQwMWM1ZFlpdkxYbFUyNkFSWStyYWZPUHJLenJ4VGlpc21BOFMrU1RTY2NkUk10ZUtIR3dtOGlMVQovVEhBQlJwTHQzZC94WjFCT21sbTk5K1pZaGpWSXhTSVZGYUNUcUtIMFRaMEFQRm9ONlNUMFRpMEJaM0YwMkJ5CmowVWQ2QVBzUVJtd05yQ29FdzFGYitIdTduZlJKUFFjWEQ4UG5VSWIwVUdraG50bUlqUFVyc1BCN3NXUWowSjYKQWxyZS9ReEtRb1hvUVhRY0ZVR3I2MUJYOTU3dVExQTdFdDJPOXFKOWNQOXZjSUFjWkkzZEwzWmZRaUlhQVcwdQpoNXAzdTRkMkh3QnBsd1l5YkRpVUxrY25jSkM1MEQwRjJWQXhZTGNkUFlWMm9GK2piL0Q5dUtON1NuZEw5N251Cno0RlhiY2lGUnNGM0tlN0Fuek1IMkFlN3QzZi9wVnNDU2lTakZIaHFJOXFBbm9YMkQ4RDNKSWorU2p3ZHo4TWIKOEVZU0pmZVREbllGWjVWaVFJY0lTTk5xRUUyejBFTkFnU1BvTlBvSCtpZitsdGdZSFRPUGVhMDdyL3Uva1FvTgpnVjdTbmpTakZ2aXVoTzg2Nk5NeHpPTXNQQkFQeDB2eDQzZ2ovaDFKSWJlVE9yS0FMQ1JmTWNPWXNjd2k1bmZzClBXdzd0NWJid3F1azc3cVBkWi9wUG8rc3NDemNpZWFpWmRDN1UrZ2N1b3l1WUFiYWN1RWdMc2JsZUJ4OFcvRTIKY2dUdndFZkljSHdTbnlONzhlL3hGL2hiZkpWd1JFM01KSlhNSXh2SVBuS0t2TTFNWlRZeVR6Qy9aNzVqU3puQwo3ZUMrNUlQQ0o5SUVhWlgwZG5keDkrZmRQNEtNRlpFZlJxWWNEVU4zb2ZIUTI5bXc5UHdDZXZFQ2ZBL0FxSjFHCnI2R3o4dmNMN0VKZDZFZWdBc0lHN01BNXVCYSt3L0N0ZUJLZWluK0pqOEwzaEl6TDl3UUdnaWlJbmxpSmk0d2kKRThoTTBrck9rMWJHeWFRd2c1a3h6QUg0dnNGOHdGeGxyckljYTJUTmJEVTdDSzFsWjdKYjRidVQzYzIycys5dwpSVndwTjR5N2cydmxWbkZybVluY3U5d0gvREorSGQvT2Y4di9EZVRpVUdHV3NCWkc1eXp3N0srQmwzLzZzRGdKCnNNOUJkNk9KdUFKUFFKdGdOSGJnOFdnMWNGY1RmZ2pvTlJzbGR6Y3d5NWhxa2dYY2NBTGRDOXk2RlMxRnE1aXgKYUVmM1I4eGU5Q0Z3eWd4b3NoWHRZc3VSbTlzTW8zTS95Z0l1K3VtN0FVYjlhYlFmNXNVK29CTkNxZEx0OHJ6egpjeWRRT0JwSmlTU0hROEdrUUtMZkIydUN5K213MjZ3V3M4bG8wT3MwYXBWU0lRbzh4eklFbzdUS1FGV2pyeTNVCjJNYUdBalUxNlRRZkdBOEY0MjhvYUlTNTdtdXJ1dm1hTmgrOWJ6eFUzWFJsRks2YzFPZkthUHpLYU8rVldPY3IKUVNYcGFiN0tnSy90dHhVQlh5Y2VNNklPMGc5WEJPcDliVjF5dWxaT1B5cW5OWkQyKytFR1g2VnRTb1d2RFRmNgpLdHVxV3Fhc3JteXNTRS9EUjZKQUFtVjZHaFVzVWFTaURiZWhnZU9YZ2dSR0Era1ZsVzJPUUVWbG16MEFhYWhqCmdwWGptOXFHajZpcnJIRDYvZlZRQmtVajYrQVo2V2xUMndCUHRFYmRGR2hhMHhsRkV4cHBhdnpZdWpabWZIMGIKYWFSdDZWUGJySUdLTnV2aUwyMC9aYStuS3RmZVVObEdnbFhqbTFkWHRVVWIxd0J4YWJhUjVzYXZoZHlRVVQ1bwpscXlvcjJ2REszcVFvRGhPQTB3cHV2RkZJOWc0emRlbUNKUUhwcXllMWdqRVJTUHIyaDFSaHl5ZDI5RHd1blo3CjFDNW4wdE9PMkpZVis2SDNSOUp2U2IrRnhzVisyN0o0L0tjSDR1WHZuYVN4YmRucFAwQThaR1F2QVRDbFFHQVEKNE5ubW15Zy9KQURJRnRLZ3VSQ3RubGdJZElKUFBZWnVUZ1Y4QnJZUjRCa20yTVlGQjQxdmF4MTFIWTBwRlhIawpHcWRWdEN2c0RubVZLcStINnh0WDYvckRTTUgxdW9CdjlYZXduRGNHdXI2NXVXUjhUd2tmMUgySGFDVWQ2RjVlCmFjUGpyNmRiNkdvYWhGNVBzUVdtMFBGdGtjY1U4Z0ZiNVEwRmtLZWtvVGkzbVdDRkgxN25iL1BWUXdHb20ybEQKT3BGaWVOMUJqTmZWZCtMdUZaMm93bjBFZEd6bXJuRlFuVVpaYldvRlBCOHk2V2xRa09LSFZFYWFyd3FlWEVWNQp4YmZhdDNwUTAycGZsVzhLTUJNYmxHT29hRjVkbndrVUhGVUhkRUszd1JPajljN2VaSE45Zlg5b0o1TzJBN2ZBCjVhdnJvWVZwUFMxQUxCZGx4dUNpckRSWWJablE4TG9SZFcydEZjNjJhRVU5akFLdzc4bmhkVzBuZ1hQcjYrR3EKN0Y1TUFXT3FXc2R4emdHY3MxT2dQamZlQ2lnM3JkQkUvZXJWdE0xUmRRRi8yOG5WcTUycjZYeUw1enN4NmxzUQo3U25vUlBRU1N2Sk8zRG9jN29VbzRIZktZK0FQK0FHdGVrclRmc0RTMXprS2xQcC9UK0g4WHJ6aHpnTEFObCttCmNPRi9pTUpGUDRmQy9YOFdoWXQ3TWIySndpV0FjekdsOElEL093cVgza1Roc245UDRXZ3Yzb0RrTFlCdFZLWncKK1grSXdnTi9Eb1VyZmhhRkszc3h2WW5DVllCekphVnc5ZjhkaFd0dW92Q2dmMC9od2IxNEE1SkRBTnZCTW9XSAovb2NvWFB0ektEenNaMUg0MWw1TWI2THdjTUQ1VmtyaEVmOTNGQjU1RTRWSC9Yc0szOWFMTnlCNU8yQjdtMHpoCk8vNURGQjc5Y3loYzk3TW9YTitMNlUwVUhnTTQxMU1LMzlsTDRhaXpEZDBvaDF2N2lGMzBIeGZNWTI4aWVjTy8KSi9tNDNvNEExbmNCK3VOa2tqZitoMGcrL3VlUWZNTFBJdm5FWGt4dklua1Q0RHlSa3J6NS95UEpKOTFBY3M2QQp5a2tSMk1oM29IcThFbTBuZTlFNmdBckdqWVpCK1Y1STN3N3hBWG9OZXc4NkRSQUZ5QWJvQjBEdi9RTHU5UUJzCkJqdDZETUR6a0Q3QWZvRU9RSG9IMUorRjY3YnplK1g2N1h3UkdrN3I1ZmdNNm9CMEkxenJoemlGQWx3N0VxQUYKUEM3RkVCY0MxRUFiTG9nSEFDekhaOUJ5cUd1RmVCVzB1WnlXQWRCcld3QktBTjlWVUUveHNrSytGWEF3UUY0RgpZQWJvUi9aM255Zjd3VnFoL2h2dzRNQkhEWmJ0NnhEN3dCYVBsOGpGWUs0eFlOMXpVQXR1VWJBSkZVZ0pLUlZjCnIwRmFsQkMvQ0VKd0M5M3cwWU45YmtRbXNQc3RVR29GMjV0KzdNaUJuR0NGdTVFSHJHNGYySmZ4VHlJSzlLU3UKUjBrb2lFSW9ESlo1QkxCTUJWc2ZvWFR3TkdTQ2xaVU4xbHN1MktKNUtCKzhuQWg4Q0VYZ0ZpMUdKWkFlSURlUQpEelVTOXVFcGVDOUpKTGVSdVdROWVabGNaS2F3Sm5ZQyt6Mlh5RFZ5bC9oNS9BZUNBeXpGNWNKMjRiUTRYTnlwClNGSXNWdlpUbmxDdFZuV3ErNmszYVJvMWIycUhhanNUN2s5NFc5ZWllMTEzV2Qra2Y5QkFET01NSHhocmpLK1kKaU9tUDVoenpXa3QveXpRcnNnNjNuclNWd3ZNSjJNeUlQUWUrRmdZb05qRHVTQlV6T3hFTElPbzZFVG9IUVBPUQpaaTVDR21JQllnWml4VVYwRk81QzZJN1VvOUFTQjNGV2RxN2VydzhEbExQck9xLzlrVHQrWldBblczc1ZISFB3CmhQcnV6N2hrN2hpTUJ2VituSSt1REtXRjBndlNDdElYYVRoclRxVzZKcWN1cHdsTk0wNnlMR1RuYXhicUYrWXMKekZQZnFtbld6TWZNWUExT3owclAwR2hRU0JjS0J2TU5lbjFRcnd1SElycFFlbFltbDZMUkJ4bEdHUXJyMHRLegplRnNLelJkenZJMVA4cUJNcFMycG40ckoxL3F4djFpWjcvUTdDeklpK1NuUkRNY0FjMzZCdldSQUoyNCs1RCthCkMwNjZZWmRydTRicHZxKzkzS1UzRkJWbHhvb3lHN3BRV1ZkWkdlU3RSWmtBMktDM0Z0R2ZvV2lsbUpHcUUwK0sKSnptQUJ0U1FuZFdBRzFCQmZsNi9VQ0JSNE0wbWk5V1FYNEI1T1psTFFubjk4bk56d0hBV2VBR1g0b0pjbnVUaApRQmlxQTRsUVY1QmZRSFluRmQ4eGFGYXFaZUN3VzU1T2xUb2VUaTNmTi81M1pTZDNQTEcvdnQ5aXJIYWFWZnYwCmt6RDM5ZXFSRlF1MmZYbXV1WFFQODFwS3hhaGJ4ZzBPcFErWVhYL3R5cVF5dkhGY3pwQVo4NWN4dnZVVjY0NjkKdU9qaGFhVWpwSlBEYjYxK1dJclpwVmQzMTBkcWZ0aTJhM2JGSkpnNTI1azVlS1E4OXFHb2tUekpJTTVxZGFBSQpZMmU1WC91UDFjVHBFUnRXMlZ6eEZTcXI3Y3JPd2t5QXdTUDk4L3pjOFZnSGdXMExqTlpKNDhoNDdqek1uOUtvCndxUlhHQzNRaHVJWTNnN3p6NFMzUjdWUjFNb08xZG5ObGgvOE0wYmFPb1djRlhFeU96NTFkTDNmMWRONEdiUk4KQkY2dnMxcU1nUXdjRG9WRGVicUNmQ01aOTJSbTlZaWNEWXZXVjBVS0xhcUc0bVBjZWVtZFJ6K1JQcGMrKzl2agowbDh1TFp2eCtPN1J0K0xrUDIzQVFlQXhqQ29BSHl2Z1kwVDVVYldvUjBZejRNTU9UVEJTbEdEYkExQlNpSGFUCitRZC8yYjA5QS81KzE2YzM0R0UwRk9SVHhtSnlQZGpxd1dhZHdEUFZUMlZVVVN5MjNoTEtpb3dyUGlxTncvbnIKUHNUQVQzOTdIRnUrdjZkNTZlVTUwa2RmYjVRK2szRVl4c3docDRHdVduUW9PbWtsdjVrbG85a0Y3Qm1SMGFqVgpCUWFWU3FsV0NlQTBFUXNNQ29WU1ZBQS9pSHlCZ2VOWW5pT1lNTGpBd0xLTUdod3JyRVlGcmhYQ01wZzZXc0RGCkltalpXa0dMQkY0SHZXSTJZNjFtczhxZVVBWkROVXgzdVRaVzh1bjEwU3F6MStxK0FUYkZsRzhwc0NzemJLbmkKVXQxcjRyOU9zRkFGZ3dCc2pNMEZWc0VxaElWd1FiakFtb2RQWFVpK3NITGlBOHNucmJxWS9CRjMvUGREWjFXLwpVdjNxcXhETUd2YTUzTis5MGpuY2lpNUFmOU9qRmhUUUtwdEVKVVZRNktkc1FxSTlZV0p6SEwrUzJIVTYxOExRCloyZFo4K1hKRWc3azVacE52TEMzMHBXQXljd1BHbHZlVmQrZW5pS29oQXR2THVnd3d5TmdYRy9IbjVFaFpETkkKRVY5VWlUSVo3T0FROEdrbkxvZXBLN1BxSmQxWEtKTnlxZEZ2OXQrT3Y1ZVVaRFAxRFdQd29TRVpQd1lCbitNVQpSa241SERmUis1djhGRGs2NzY5VGpyWlFrR3NPSEhqMzNRdmdjS2IzdzRkTWsrZEphdFFxWUN2ZURBNU5RbHdHCmhrR0VVZExOQmNhZWFYc2ZsWldVbFhBck0xS1g2azdqQnB5TEEvaTlMVkxHRmlvRmFUdW5vWjN6M0hxWUdZR0QKSXU3RXVWRTF5d3BxVnRqRUlXVzFRdGR5Mm5iNmZLd0lsWlZkL2kxMEk0OEtDWDFBZi9yVnJhRjFKNW52Vnh2cgpkMTY1bS9sZXhpa0tjdHZEUFlrUzBjN29zSHkyaWgzTlRYZmY3Vm5zV1k1WEVqRkZIR09mYmw5aVgrSjZ5YzZoClJKekF1clIyditDeXcrWVQ1MDFJU0RRcTg0eWN6enZmbjZqMi8wSW90TXhLMUlZVDd2TVdKaVpWQnlnZTczZGQKN3RKOTEzVUp1aFFyb2RJdkx2d2dCcm1vaDRDS3U0R0xvaTdXcmc3cVF5cUROaGtwVEVJeXRyTWFuVElaaTJZSQpZQnRPcDhQVTYzOGZhc2czbE9INGVGUGhLQVFnN2M4eFVHbVlRRVdrQUlNMmVNV3ZUOTdYYitTbXBVZXFRK3hoCnBudytUdjcraTBWVkw2MmFVTmprWUxUWElrZXdZZmFzSVhtanBpL2RzSGJJaW1NdDU2VHZuOTIvdUxwNWFINzIKNkdsN1picGtkMy9NT3JpdHNQS2Vqbm9IcVVlbE4wY21wcytQekUvbk40WHdFREZWYVVzMWFaaC9acHZ5Tk9BbwpERVJOK2p6ZEx6U2FiR2RlRWlma1pXdHNtOElWK2s3WUFreFFGbWJNSXQ2STd6NG1USEtyYzI2Z0N0Q0dMZ3BkClFKVExzYTkwWFRwS0g1aHBSVEpKOGpPejdDR2s0RUx1WUdLSVIwd3lZaGt4QzhqaENuaVRrU05vUzhZc0ZvQmMKbVJCNC9FNmdXUWdDSUZacUtpV1dyb1NtN3JzUGFJWWJXSktYYTdGYWNuUGlxd292NUhsd2JrN3ZHaU1FWU4zdwo5eXdxSUt4TUtJQXRYNzZpVHE0NnZHNy9TenNNUWFNclpHbStaZTZXNW83S0VOY2V2UnViUC9sYmRWclZuRjlJCi8vZ3hqSzF2ckNtYnMyWGg0eTBZUDhVUVgrR2owK2N0TEYvODlPdzNYajJ5ZkdTdTIzdXc5YmVTQkdRRkJvYzkKYmphVDJ3NHBEUm9iVFZRUXBhaUJPWERDd1BNQzRURW5pT0RqRjVSa3ZvcjdsbEVMTE5PSnJTL2hUUnB4djdJVAoxeDNpRXFxMU1nVy91MXdTQTY0cWc2aEVYeVJURFFoWEJKT0dTcUFFRUVGNkJkYjc4M0N1SGlhaG5qd3Y1ZUczClkydkpvMXQrOXp2WUhsZ1ZXeUJ4ZUZ3YnMrN2FYVTlLejFEY01DcnZ2c2k2dUZia1E4ZWlxVFdHaDd5a1NGMWwKSEcyY2JHVDdpMnFOZ05US0JLMTJ2c0ZvTkdnVGZBYWpnSXhXcFRVUEVFdU1PalMvMEdyZGh2NEpMSnZuTytQVwo2SVZDeHl4VTZFdXM5c2RIL0x1dTB6RFlYV1V4R08xTHNsNUFSNXBPQTNtaXY0YmlRdzlqYjRQNWtHenpZZ1VKCk1SNVFCMkdmMThlNVlFNG9iQkJnTDV1TWVDY0VvajArTitobzYwcm9jTk94Ym9DVjg0WnhEbE1weHNBa3ljMWgKelNiaVQwd0t4d3hMbzdjOXZmVndhOE9Lek8wenlkZXhwd2JrcEErZitobzJYSlc2RGtqL3JjTXp0eFo3M2xxeQo2Ym1hcUlKaFhwVG1ob3grNmRYZlNHKys5cFk4aGw4QXNUcFl2NnpyNVVRZFhJckFwQ0FZTkFXSVF3NDNzY2d1CktwcjhDNWZFQlNJTTBQWFZ1UlpZSEFRU0hSQ0FMOTZGRCt1L0VOc2d5MGNDR2pMaUJvQjhKS0J2VjlDekFyQXQKKzNKbEhXaUptYzRqaU1HblM4RXBLaGR3dElEREozb0xGTFJBUVF1T0FYSkhRSjBjRDBva1ZtRWpTRS9HRC9yRwp1dDkzcmZpY21DOXNqQjE3NmkweWhuSUFNL0hLUU53cDFWQ2Rjak04bTRWbkswRi9UMGIzUnd2SGFNYm9wNUZwCm1tbjZ4V1NCWHhpa3FkRVR0K2hOWUwxR3dETXNlcXhFNVFtTGJMWnpha0oyd0pHaU1BZVRMZlpJU2llKzY1Qy8KWlpMYzl4SllTcWthS0UvMG1EelJZejlOY0lQTndZbjJJQjhTYkd3cTVoeGlLa3hlT25QdnV3ODNOR0I1ZG9aRApBYi8raGlUajk5RTlFNUJ6TU1vMGptQnllbG5WM2ZQTDc1ZWV4QzhjSHBiOXlOQ2wwdnhYeVFKWUFhTzNSbXJuCkZFNnNYeUY5RnR2QURBOFVQUEpvamtzcWlvMlpOdkN1cC90N1kxYzU0OVk3RjZ5cHp3eW41amZ1V1hmUGZxRDgKbU80TDNCenVTMFR0bFlQUllpZTNHVy9pR0M5dzNmMTRKYmZLeUkwU21RZmRlcjJaNys5bTFQM05DZy94ZU94TQpOaW5XWmVzZFBrVzIzZTcxN2ZCUGl4TWdyZ1ZEOTRIcFliTEdaUjNsQVdEeC9zaGxEUnBEMnFBenBMSW9jcERHCnBNc0JyVGhCSjdnZ3h5RW1CMk5RV1pRMmRRNUtNRUFnT3ZnY0VIa1FVTUdHNHl3ZkQybkJmU0RtUkd3RnRTK1EKaVBRNkF4VnZvQndMdk44WER1bEJDL1FIV0EvdXB6L2xmNjM5WSttN3YzOTc4WjRCbmxPTzlRZWtEN3ZSaTEvdQpQNHFyazdrdnBRdkgxdTJVM3BGZWt5VHBWM3ZxSC92NnllUGJmb3YzNDhwemY1UjUvM25nazRuQUo5VDJtQnoxCnJ0UnZNcEFjVWVWSkFQYTFpbUsyMGVIUUJMVjJ1K01EZjh1cTZ4b0JaUUZVRml1THlSMFBZWXMrYUE3eEFpZXcKQWlNUWdlT1ZPaEY2YTRGQVlWRGxZTUVFOXA0c3hWTm92NEswSjNUTjB4SGdCcGtGOUNhQndOQ2ZhNzVsM3VCaQpSOExIZjVlZWVvT013cG03TnRadGt4Nk1IZGhyRHMrcVh6T3FHdXR4eHRVdG5QSERVOUs3ZnprdXRjdDlBRDJHCjdZSStVSXQyV0RSSjhMQ3NpdkdBK3FFUVBVcVZxQ1pxTlVIOFZGS3NjR2daTVlqc0dtMG5WaDN5Yjd6ZUlabXAKTDE4QytVVkhsYTdzSlhTRW9YdFUydWg3QUI5Z002OXRZRkt2bldlV1hEMUZ2Tnp4RHFsOHI2UTlBSStHajZ4UApzWHNobzBCRlVSdkZRdEdEQlQ4ZE8xVHlrNVdxVGp3YW5ueXhoNVR5azZuYy94OFBEQnhncmw1N2k3d2J5endqClAraEFySWsrWXdlTVY2YmMxN0tvWDFSNEdFSllUSlNDeUFwQm5uTm9zREtvUW5hMVd2TzB2MlUyUEVRMzdITFAKcktXUnJJa1ZaVUlQcWRnQ2M1VHFVWDU5WU1kWmN1M3MyUmg3Rmd5WUhlU3VLd1BKZ2RnSXVVOW40YUhyNFhrTQpzdExqUTBjQkJZUXlRSkxKNWkvSnpNcUdkZ0puejhLZG9NeUI3UVJqTVFTdTUxQjIxQWhhSVBHd25NZzRCRXlDCm9KanljTEJsRklpVGNUZUlFN0NoS0dwZzZsQ016UDd0WjhqWDEwWkFjLzg0QU8yQkhPT3QwSjRSL1NaYVg0R0gKTUxDb0toZ0x0ak1mWXM2SVhZeEo1VlNQeG5YTSsvZ1Q1bjNWSjJvbHEyUTFsZVJCd280Z213bUpLSk0xaGNwQwpUVFVaVFZxSUVHelNLQWxqQURWVnBUWXd2Q2hiUVZSZDNoYlZLTDJNaW8rcE1ZbHB2QVlvZWRtSTdDWktSTEFoCkFNTkw5c3RGUmZDelhhSkNNRzc4V1lGVHdJaUFzeWtITmVwT3ZMY0Q3QlE2eEh2YkNXRldjclVaaTJQczB0TXIKdVhpY25ZVWE1czdCY3h2bUdQMEtER1RYOThzSFV4ZlVFNHRaSDlpTTNYZ25maFk3anJOU3cydlNHTzRFZC94cQppTDF3WlNBek1mM2NncXNSOXNQMC9FLzdYWHNTQm9CUU9uTXBRQmZxeTJtSm1ncHdJVStvQ2g3RzFiaU9jRUJ2ClFqdGxsZlVRcW9RUU9FR2taSlJLeklzd0tsRDNFc2M2MUlKSXIxSXFrRjJsN3VHWW14aUdMdW54U1FFZExhTFcKVXVyS3BXQVFVUjBNbGlMS1B4aCsyLzlLdmpyKysxakNDZElma0I3RDdyd3lrSDMrNnAyQUgxMkxobmVmNTc0RwpHWnlBcU9kb2RUUnRKVGl6enVCWHlSdmlXU1UvVURUM1QyQ2MvUVdGaTdoY0trTTI0L0RZc2xWMnQrZWpQbUszClYraktZaWNIT1RRaEhGUUV1WkJGYThzQlM5dVFneDBpcEhROHBLeHFjdzQyRWdqc1NtY08wck1ReUhLV0J2UUQKdWdXeVd2UTZnZlFJVklNZkdmSjBpRXBiazhIUHNOdU9yZDkxV3Rvb3ZYRHFoY2RQd0RFUzUxK2x2Ly8xa3ZTSApIN0JaeTMxNTVWWHBuSFQ0UWpmNncwZDRNRTU1SCt1dVBJTVhmUWNXVUlsMFJucm5zblNRR3dmalJHWFRqMEFICkplQTNQcG8zVlQzVnNFaTkyTURXbU9wTVUweUxUYXdnZXZRNm5SSnJFNmpFVW9xRU42aFpoY21VelRvc0NRb1EKVm1iTHZ4QldNV3E3eG1XVkRzZ0NFeHBUUDR0UjFubDVrS29CSkMrMWZsQ1FENUNOcC8vMndXZFN6aG1tZFdINQpQZEk4dlBiQlhkenhUOS9ZM3gzYndCN3A3NVdZdVk5U25ocmV2VVllSnpONDdTNUZwMDlscHBrWE1TdU1tNXhuCm5QeGdWNzF6akt2SlBOKzgwSFhZL29aRExCUnRUdUswMjdIWjRYUTRIQWpiTWJKN0RKQ3lPK3dPcDgxTStDU0UKOVI0eklweUdGckQrc0wrL2hnbjN4NXpDQTJ0ckpDbGJZVStPOUIxa1ZKWUx5MnJjUEFmZWl5dVYxaUl3ejJVegpIYS9VcFpha2xrQjRPaFdFbUt4YmVrTzhUaFZLQ0FyQlJIVlNEdkpwUFRrNHhFTXFvUFRuWUs4T2dxQVl6b0VECkhIRkxnZzQrcUNTb0lTaUV0VGdRWDA0TlZCT0JaWWdYMkh4cTRPZGY1d1VkK0hRdk5uMHg4bGR6cEwybjlzbWMKc09MWStrRGVNbW4wak9RZFRTZnZ2QVhZNHIra3Y0QnlSdGhGTDZUbi8rRUNyb2t6QkxESXVnZmVXT2JRMjVmZAp1M0VLSmkweWQ3d0xpL0VQRW5YVUFzM2gzQjYzVUo3SFlmUjQxQ0JvQnVFYXJoN1hjVk81SnROQ1RyUWNnOE5HCmR1VEVybWg1d084TE5Scm1HT2FiR0lQSGEzS1pHYi9IWW1KRGhxU2dCeWtVVHNHaklpR1hVL1FGemQ2Z2hjbE8KbU9wMFJNUlFNS3dFT24vZzMzaXpFbmNaZkEzdnd6SmVVaUxyOE1CQzFIOTNYWWx2Z0ptZlNoMGZtSnBZTWk4eAovaHlxby9HQ0Izc3hxR3RXTStnbW1SaDhVcFRmbU9xMXo4NGRNRWx5bkNHN2Q4OThaK2FFTzBaekFxTXlaRnhXCnFsbTEwRlMwV0NvK3c3aG1yMyt5eUFNdWlCM1o0MkxMZCtjRzVyYStkbHVreXVRM2x0engzYVBaenRocW9FbGoKOTNudzhINHBlNHFsNkxoSVFqZ1FDdVZyOC96Vm9RbWh4ZG9GU1lycG9rMXJEWko2N1JUdDNrUkdxZTJmbUpTbwpaRmlYN1VGVFptYXFxNytKWWZ1bktyS0lVaXZxa3hLOXlWbFplbHZRT2tnTUpqdHl2RUg5SUJUTXRHZm5QTzJmCjFxTUJnRWJYbzlmQ1pES0EvVVhoQmdXUHNtTkdMTGRoaml4NWFwTXo5RjRra2hBSnBRZjVvQ1BFcElGL096MUQKanJnVTBIdmRSbThxY3BwdHFkaHV3K2xzS2xLRVZhazRxTUlaa0JZaUVIZ01McWkwUUNCTEpaMU8xZ0NwWElyYgp1WlJGcWFVckd6L1VyZzJIWkZMbjlVdWlsaytBVWowUmZLbFdpendXWmhOTCtiZ0FZNC9RYitLVjJXUGJod3g5CjVzeXJJOWFDRWZRblBQQllRdmFkRjlxMmppays5L2JHRVd1bEovOHEvZGUyYlF5cHhSZVdEbHZ2SzMxNllXNU8KTUQwdGIremgxNlhmZjlkU2RzL2pFMmJrK0xJeUU0c25uNzc4M3RvMS84V3FxTzdoQjFrRzZ6d1lJLzJpRHN4NwprRUJZa1JwSjZDcGhnaHg3bGJlTGEyRnBwejQzYXNkZXZtNG4wZlVkZUFsVUtkQTI4dGl6a3Y1TlNjOGRQM0RsCkg1d1dCQ1J0Ry9ZeHVIN1F0Z3E5RXAyZGpQTUpMTmpNYUhZeU01bHRJUXZGaC9DRHJDcXNLaUFGWEtFNGhlTmcKQ2NOTUVQeUJuQ2lBcHpCbzREa2VZbEVSTkNoVlN0bGJHSVF6MkNyQ2lTcHdFd284UFlpbFVNS0pPQ1hQZ2tRUwpWYUlDQ3dxSGhzRjJ0YVlUcXcvNTExR2x4QTRlTDl0cDNURDc5eERGWlN4ZDQwdEthQnF2ckFVaHBEdEpYVmx5CnBMc2hpcStKL29BQzU4cS9BTWFPdnhHdFpQd25Yb0RuZFVsR3d2MGd6U04vSjIvRjNpWTVzWDZ4QkRJV2VKMzIKdXhyNlRYZGxIb21tUE1SaVV6SWJORENFUVVFREdBd2NuUEFWTU1PQ1J3MTZ4eWdVTEZJQnhSa1dUcEpFRlR3aApIQi9FOUx3d2VnblpsYlFQOWpqNWkyd3dvUWRrNmtCcmtZY0I1ck9OYXJkbFZycVFaNEEvRGpwRGZaNmd2QndHClp5b2pJcEJmSzhGRkp3ZDA2aHRwVDJCNTF4dFR2Z2JWWk9lZlkrZlBUQUlOc1pTY3VyWWgxa2FHTS9UTkFBYU4KQkQ4RFBlR1hJTy9nZkJvdFRNbkNTaDNvWmE1d2JvMXVxbUthVGlnU0RXb0Y0OHdSa2hSdW5kcGRuRW95SXNXSAppMGx4VGtyUW9CTTQwUlZPdExvNjhlcG93T3IyQ21GM2hvcTQ4MVFsUWttSnl5UkVVblluT1VxZEVkZmdoSENoCmZVRHBLM2d6TU9NUnZBbkYxZWllNlhzcGRycFhSUURYaEVGMjhGSkJsdEdWMFVVRkc4ZzNlUUluNXhlWUUySEYKQ3VMOEJEK3llWngrWlBHWndHMmRpQXFJSHpuY1ZqOHdLd1R5aW5HVDR5a0pmQkVGK1FPd0ZzdnVPZk5OdnJ0Uwo4RUdCaU5TYnFNT2l3QXhyU3lLNDdHbEVOemtLakZnN2Q5aGQ5WnY4VTNKbVRzZ2VoVHRLemVvSEZqOWM3RmZ1CjVuNTQ5bmpMZkd0UTdkR25wSVVhVWl5S2dyZVhiRHgrZFBQcWQ4YWtEZHI1bU5uRmF6V3V6TWw0aHBobVN4ODcKYW1qS3FOZTMxZFJzaVcxMkpUTE1DalZmSG9qV1RIdnBvWTNQR2ZFbHVxNjBkSC9HQnJsVFNBOTI3K3hveGs1aApsK3RERjVNb0puZ0lCN3Q1Yms3UUt6MXVsY29VRmgwK1I0WXVBMGVRSGt6ZGxmN2pEZGVWODB1WFpLRVkzK2dwCjA0Ti9VNmFleldEaGxSYmVGTUlHSlFSbXdSckNSb1VuQk1RQ1M1WktMVkRrS1NrTWVoT1JLV0FPSlBYNDZhakEKeW0wNVVQeGM0eHYvL1A3QzR0dHlpbmFTU1k4OTl2QzlSMExWcDdoVHNiL1dqcEM2cE11UzFGWWNxRjIxOU9zVAplejU3K2QzTjR3N0theVdjYW1YT3NjUGtIY2hkMGN4ZGRyekZ0bHZjYTJNR2kvcHRKb1l4OFc2SG9IR0RSU0E0Cm5WWmQySURCUmFsM3VKVmhxOTBGWi8yRlEvNjVTM3M0Qm5wV1V0dFZWUFN2TFBsKzRQQUpxczNLRU5JYWRkQkwKYXNQYklRYzJ2RisyNFZVV1RRaHNlQWdVTmo1RWJYai92N0RocWZodVFKYTRCUi9mN0FLdXlLWHNRRURQekJYSQpCMTlZRCtqbUx0cy9PT3VoOWJNZnNCL3cvTzNZZTFldzRYMFhPNnp0dzRrUDdKNzU5STZMcXhhY2Z3M25mZ1ZICmN2dHpNSzZGM1JlWUxoaFhGWEtqQmRHY0FtMjFkclIyRjd2SHlRVkZFMGx3NjVEb2RndEdKWEZiVlZ5R01VTVgKMFJzY1hsWFlZZmQ0Vi9ybmx0L1kvZGdsc0R6cEp0NVBZK3V3dVJSS2hMRk5CWDF6UVlEc0pJU1VUakVFSFpSSApGM3BsK01rZlp3WVYya3F0Z0R6YUxaVFh6NUQ3L2ZvZFMzZnNYUHpRSHJ4NlZOYUFGNTRwMnovcmtIVGwyOC93ClhWOS9lUFkzcjU1N2t4VDA4d3doN2l1bEd5Zlc0ZlFyZjhHalFZYlVkRjlnSFNCRFhIQ2lQSWpWMFVXYnhTY2MKdTd3TXB5VUpuTW1zTlNTWVRWRjExQ1JHSEhpSTZtWG1ESDZkT2VQOFNQeFk4WUgzbzhEWDFxOERxalA2TXdZeQpWdVQ4U1FsYkxlNmtJbDRRTEg2M1MxQzZMYXFnc05tMXkzVVk1Z0FidENRRVhaeGRxUmIwNE50M2h6bEhPQ2xECkNOdnRvZkQ3L3AxeDVnZHJUMmI5OTJPeVh4OEVKZ2lXaGw2RkFOWTIyYmN0VDRjcUZHQTVCbzVnWTlpbzhvSm4KeHFBejZrdzZsbGNIRTUxSklmQyt1a1BZNDFaWWhSQlNtYlVock5FR0hING80aUFRYmNCWHNETUFoS1pyUHppQgplaFNBbE5TVSsvQ2NCalNuZ2JJUWRZNzU0eDV1eWtDZ3BNTG1LRGlGVUs2c2ZpWEN6aW5wK0tBdzM2Qzc5aTMzCjZPYUhiOHN5SFJSdXpSNjU2SmFSYjRCbWF2c2o5cXFTQjcrd1pEZUhBMnoxOU50SHpCajh6TE92TmVSWEZ6K1cKTWR5bEF4dVV4d1NYUzZINVZmY2ZXbzB2eHRka0Z3Z1NLL2NlN1AzWFJsTUZONjkwTXpqQlZHVFI4QWFsSFJZaApyVVlmc1JvRVE0TFdxeVhhYXlhN3pYN05QM2xabk1WaURVV25xVjJpdTFFSktKUDN0d3pVZXd2cVl3YXdERyttCjNsUDQ1dVhtdlJRbzY5QW5XVjEyMVVoZmUwZjd4bzFjZWIreGhEeEg4TzB2cnJ2V3hHeGZ0MXRlYndaSXhjelgKd0N0ZStUekI0V2h0dm1tUU9FaFJKOVlySGxMdmNlNTI3d252VEQzaVZFVkZ4cElZMFo1V0pzS1N3dklSdDExcApjQ3NUTW9TTURNN0ZaRmd5MGlPY0kwdXREV3RLUTJHWFBUUHJoZ2x5dWF1SWNrRHMwbmV3YnZUNCttQ215TU1lCkY0TnBnV1NIUjZWUEN1cENBVThvaEpJZEVPaFZXajlLMEtvMVFYZGlDSWVkRVpBVGFqQXNleGFTSHQxT1Z1M28Kek1uTHBSYUhQekVVanU5bUZPVExxMFVTSFZsMGZiZGMzdGZBWk1tNDNMeWRKYk9sc3k5OG96MnNDUTk0NEoxbwppTW5mc3ZSRjZTb1dqdUtLNTM1eG9pcTRZY21wVzlPa2Q5bnkwc0RBbGRkeTNtcTVzTzM1bW5ESitqcytIVG44CkIzQXdhSENHdE9OaysxMWJYenArWU9KeWtnNzB4UEQyQlpKbGlnV05pcWJCckJGaG4xTU1zMkhqZkdHK0tCbzEKeEFpYmpYbzNMNWpWU2sxRTZiQmhjd1JaN0ZZYnZBSjJ5RDhoTGxPb2p0ZXpYTURHR0VnVU9CSUFoSklYQTlsZApUeGRHOEhqRTlWWjlZSGxITkhmMC9YOGVsWDdFazcxeTlzc2RJUHd2anZBWFBWdi95OWdJOG14TFFkM1dEMkx3CkFpSmR5d0EvWEF3NkVqMkxrUjkxQ1YreWdEVFB5UDU1NE51SXdGQVAvZDZmTURrZEt6bmR5M2J5RGoxMVVsRWYKL2ZMRDhHRlRybjdBSGFlK2Y0eGFvZS9VUGxlaFhkR21lb0w3aTlnTys4bThsUi9OVGVZVzhRdUZsZHdSNWl4egpBWFpIUWNVVUJRVkRscFBIZ1NrWlVnVDcxQ3dITzlIOFRBTlFUUlRndUQvSEswU091bmxCVjJaNHBjQXJlWWNHCmRvVWlTQVdLWnJ0L3doRnNpV3N0bEdBbG9LeDlaWk50c0pJeVdjVUVOVlBXTXBmcWZpMXZUVGR3UzNVbmRXS0oKU0JWb0tnN21RbGVvaWhuQWdqN1ErZ0orK3l0cEVqNzRsZFMrK1FYdStMVjkrSXcwS3phQnVGWkxkOHY5V3dXZApwSHNRRElwRVlSUjc5bmhKQkhabVdlNEdrdjIwcVNINzRRS3JPanJpMjdOeC91Q0RiRFdjNWxrUkxZWWRlaTJmCllCV3RXbXRDV0F5RENLMngzNkdhckZJSGdrcUhPMkJYRXRZYTlMdXRiZzB2d0w2T0s4Z1lsY2tnTFBRUmVEc04KdHpzaTlLVzhLS3d4R1VHWUhQWndjaWZXM01oRWwzU1h1eTVmMzNRRzNSdWNnMTJ5TzRBcWNOYzVDczZuZ0FpQgpDWFJkNHdMR2t1MmhtemlzUGRxdmZrN3JzTFNra21lYVB4cVdjbXg2N2JRbkRqc2lzeWZ0Nm1BenQ5eWFOS0FzCnFlcU9VZHR2V3hjcklGOVBINzV1Wit3eGNteG16cEJmdmtNNVQrWTdwZ3ZrREQzek5DNmFmWmcvd3hPV04vRmgKVXdzL1QrQk1hbUt5NlVDVFFyeE5wWFFJNFBwUVJ4UU9GODZ3UmV6STdnUjE5cWJwRVY5UzR0SUUrdFgxMHhTaApxcmI1aHE3UU9RSXlYb3RoeHVEbCs0YnVuWEpwZU5waGQ5YXlhR1J3WWJxekErOEMvTWVOZkdyME0zU3VUQ2hwCjBsaks4K1pNamIwRHlNSklGOE5lcngvMEpEWDQ5TzNvMFdqdUZuR1Q3Z25MOCt4dWNhZHVqNlZUZkVQOGtQMVMKKzJlVHVyL0l1MjJDMm0xUTJRVzczVXpDQ1E2bkltd0dkMDBuVm9DMjFMTWF4bzNqWGprb0wzdHBjQ3d0cERJcQpZT1hTa3hBV3JKRGlOSkJTbXRRaGhIVVFpQlpRamhndEJQTGFSZ1BxZFVzeXlBNEZhcjFhY2cyd2lzRXVIb29yClJIOVlrVFgwNlBPYk5qMExMNlZkazM3NFZMcUdEWC9pNStHRW5adkdQWDZ0ZmQ4bDVvTDBEYWlITWVsRm5Ib04KbFBBbzFZbGFwTnZaSUhSZEM3dis4NkpwZThSZFZwSXMrbHg2TGU4MkN3bTgxdTFTSldwSjJPWklVb0ttNjQ4awpKdGdEU2Y5UzA1WFZJYnFQTC9mUlpYRWl6aEZpUThnSkhlTXNFR0M3Tm9RWXE5d251VnRVMzZYYWJYek1aUDBXCjU4YjVFMTRFb3VzMG1BRDZBSGw5VjdEcTZMSEtJSVJTeG9IODZKMzN2aXdkbnJkMTBjaXM0bzVGdjN1dmRlekIKWTAxYmw0emV5UnhjTnlpNVJQb3o5UEdaVFhmbGVRYkZQcVc4V0NMZERyeFlEWDMwb2NYUjNFSmJqYTNPdGh2dgo0bmE3K0dUUllHVlVicDlnNUJtM1EyWFJDcUQ0V1NKbWt3Tk9MN2p0L3NRYjFqVlo3NVVWdjU2dTl2VFU2VlZyCjRDM1FFSEZDLzlSZUNKQ0xBZFhFbytyUi9PTCtDQVBkaTQyN0kramEzYk9HQmZTeTlrYzNxWDRNVjdhL1VoMU8KSGRRNWZ4ZCs1TTZjakgwdnBUKzFZSi8wajloWnZHemNycmJ4bTljMFBQV2I5MG5wd0tTcWpWZkFnMUp6TzFiRApHMmNZRDc0dXI4aDY2S2NlM1JvTmhabVFwb0NwWmxtdHFDTmFoVjZoRG90MHV1bVZvc09JcVc2TDdBWmpKNjRFCkFSSlhPNmlmSGtRcWFHcTFaYWRqWU1ISFBZanhkVWllWXIxNmh6NndhcC81dWVtY3phMXo2aDVhRHlMaFNQNDIKd3B4Z3lJRzVzUzJVNXVYZEh6SXZzMFBvbVVXY0VYMmtVTEdGMjJSNHdyVEZ2Q1dGVDA0S2h2UDlWZjdxcE9ydwpIVW1qdzVPU0pvY1dxUmRwRm1sYkF2T1M1Z1huaFhaNmRxY1pHVkQ1dUhRMnc0Z2NacWZWWlRPbm16S1NFMVJUCndTdVhIeVRCUkkyU1RUWGFYbmU1alFMcnp0aWFxc29VRkZvZEVWQ21QOVBodFZsc1lXdHBja2dJSnp1eXRkNncKcmhTRk0reFoyZTI5ZWlxSXlyaWVVcVNERk8xdVVTYUVQZDRyY0tUS29qUHV0aHFLMDBuSURPNHF2OWJyUndwNAo3eGlEeDhvUCt3aVFjaHVnekdteStiRXZJZEdQL0lsYWpSaFcrbkVvcUZDQ0I4c1A3OEpENE5HNy9OUnJGYmVNCjQ3djA4bzZsUEJXdVQzQzZOeUQ3clc1MFc4bnlXdmlmZml1WUlLRXcvbFlNVnV4dTJqSWdmTThqcTI2Wjk4bVIKZjB3ZlNQWnlvZEluSmsydFRCNjI0RlQ1MUk4LysvYU1nQS9qNFdPeVJvKytzeklKTlB6RWxFSDNiWGxsM1pncApBM0txaDBXclV1eEdkMlphNWVPUG5QdjRhZkpQV0xlczNkOFNCVGNHcE9ESWx6UVp5cE5hT0Z0VUZnMnlsaUlyCncydVZlZ2QxcEdBK2dzeGFjd0xqQlovTE5RdnNkSUlPMjJNbDl0RmhNK2xpRkN2cDBzVXV5WXNrMVZ5cFBYdmQKMWcvbFVUVjI5OHY3OW9YTTJScVB5VHN3dkd6TVk0OXhZNlR6RzJLVmhVWndFSzlUaVBkTkpxOXRBRjRucUxYNwpDK1l6a0Z2MGJPMjRhUDlPMHhzbW9qQ0tKcnZSYmtybUZ6QWZnbEtCT0swUzhSb2xCekxhSnRoc1lIcG1LQ05xCmxjT0JJeFRaOTY1clBmTFdOR1YvR1A2NHZsb0dEdDM0Z2dsZTNEaWlNSE9wc1ZZZzJ3OXdsbEFmeElXT3JBZGUKcVFoMjdDV0JmcE0zZkRrcW5XNXp4b3BHOW12Y1BlWkpvcjM2N2k4SHBOejJ4TWhWNUNNSDFaZkFxY2J0WURQaApUeEY4MFdYVjdGNEZkQWxYQ1lOVUs1blY0Z3JsbStRMDg3cHdWbnhkZVZhbG1pUk1FNXVWVTFVdHdpS3hSYmxJCnRVSllyVkxTYTBrMXN3QXQ1SmpSeVpaa3NDclpZbHpNUG9JZllYa0ZpeGtWQVNWS0RhZVZSYVdLRVpSYUdDVFkKVWQ0bU11eHBKVkdjVmlHOFRXM1hVRE1EbEtmTHR0cFlVVkh2enk1cmZhQlFnZUlBZmk1clVjT1FFWXVpYWk1aQpnQjZqaUVHdFZuR3dkUUEvOEhwMUtPQW9JUngyV1JNMVVrOGIrQWc1ZWlFdktFUTRma2pMdGZUQW9Vb04zWlp2CmxmMS9LM1ZMVDl2QUF4Zy9OU2ducU5Pc3Q0U3FhWFBtekFGTnpVbHluZlN3bXdwMHRRL2ZmdmZOOXo3cGtNNGUKdS9DN1k5SnZZQ081Z3hsNjdRaFRmZlZkWnNDMVY0R2c4QkJ3c2pLZlExSUZaNmtQS3NXeU5qNzNJT0xMMnBoYwozS2JPYk5OOEFPOWlLL1dHZzBRc0txTDdyazVzQlQyUXFvS2VQMy8vejAra3pYalJWOUwza25RSkwySXpwWlY0CkVSZTdHdnNFcjVmdUprSEtiMlpwa0d3M1VhM2d6ZWpkcTgwUDJYYlpHS3JyRmhwcURIV0d5Y0lDWm9HdzFyUUYKVHJodk1XKzJiTGJ1UnJzdHVobzB4Rnh0UFd0bUs3alhPYktTMjRsMjBuWEh5aVVsY3phejFRSzZ1Rm10U25DTApXcXBFV0p3d1lCekNCNnhtMndIMUl4YlFKZDZQRzRYVXQzckpGaCtybm9HS3N5b01ZUTZjRTZSdVZpcXZZV2lpCkJqTWNPN2ZNTkZpdE5nN2ptY0IxTm5DNlV0TFRTSVFZcUp5ZE5VYyttSm5MTXdRT1cxRkJJaDhEeXkrQUU0SkEKZVlieG53azlNS0Y4ZSt2MlVNU1RtYUxMeWRSeHBWcHAzbHV3Z2NGbVRwWWVrNzU1VVpyVXdZdlBhWGkvVFh3OAppUjEyYlF0elA2VVZuT3RpT21CdTB2M1ZHZEh5QXI0R2pVWjFlRFEvR1UzQmsva0ZuQUp6UEI4QnhERGRVd1VICkFDWkZvUEhER2RRaVlCK2x3SlVLRGpVem1HNnN0dmNxVXJJS0tHLzNnM09XSGpTSTc3Y1VaVUt2NUgxVjNGQ0EKL1hsK000YU5jTnlQM0J2cllFcGpxOGpxYTYzNG5YVU0yckVoQnJOdkVNTGQ1K0U4Ynl2M0lYREszR2pwRm42TApjUSsveDdUTHp3bEdxekZzaEIxdjd5WVQ3eldvbzVwYWRhM1A2MlVzNldZbW5RVkxMa2lsbnVWRlIrQXgwZkNxCjJwNFU3TVRNSWYrblBjZThaYi85VHdlY1lqbzQzMlhQZEhSMTJSeFVBWTk3dVRrNHdnM1crd0FNV2s4NEQzUngKU0lHL0UrYVlHMTgveTROWGJtOW8vM05pYWR2QkFZblAvcmlqeUJzYytPdVRGVUZ1NndPcStZWVhYbjk3WnRrOQp4cm5tdXdmTWZmYVZpK2E1MnRhcUpiTTNEWC9Nb044ODZoRTZGMUtnZitlaGYwbXdYenhzazNLVGFwTjlsM0tuCmFxZDlkNkpRbEFUT0UzRG9jNzRrUzRKV3d4bHNQRkVuc0FiUjc3RmJXS01yYXF3MTFQcVNrbHhpdXNLVjdqUXEKa09GVnJlMHgxdmVpQzg0bmhlVCtsanpYNCtXTWIxUlFoZUhHdmxKYlRMYkhhQUMvZUw5aFQ3V256NnpWQWwwRgpBNlNuMDNBQXNaVFNBNDYxNERVRGc5N0NaekFaVzVKWWVyQ3RMUEhQQjZldkMxYjhpbVE4T256ejdPVVZpN1Z6CnpXdnFPNTZkWFRySE9OY3dQenI5N1RkM0crZHJIMW16K2RHUm0vV1U5K1JQZHpQODc4Qy8rcFJDSVNQelpmd04KamdSNGI0TytxeEYvVTRPdUpXN3FRK3Q5OTRLK2VmRS8zN21nNzFwVW9FcFVKZjhQd2lENDd3LzZid2ZENEY5bgo2UDh4aklUL1dMZ04vdm5nRHNyMGFBejhiOEZZMkMwZmh4cGxoT2dxZ09VVVQ5OFpHVlZUUHVUVzh0U2E1aGt0CnpmT21UaHdQTmZIYW5nUldRd0g0a25BYVFBbkFVSUN4QURNQWxnQ3NCZGdPc0IvZ0ZZQzNBQzRDZkFOd0RRaWkKQm5BQnBBR1VBQXdGR0Fzd0EyQUp3RnFBN1FEN0FWNEJlQXZnSXNBM0FOZUFXR29BRjBBYVFBbkFVSUN4QURNQQpsZ0NzQmRnT3NCL2dGWUMzQUM0Q2ZBTndEZXg0TllBTElBMmdCR0Fvd0ZpQUdRQkxBTllDYkFmWUQvQUt3RnZkClBSOUtvOTQwUnI0K2VkQ3hiNm9QOThrbjk4bkRmeEhkZEQzc0hkMlVUK3VUcDk2ZEc1K2YwU2NQaTg1TjlkbDkKOGpsOThybDk4aUFqYjdvL3IwKytmNS84TFgzeTVYM3ljQmo4cHZZcSt1UXIrK1NyK3VScit1VEJHTDZwdmFGOQo4clY5OHNQNjVHL3RreC9lSjA5UFNOMUkzNUY5OHFQNjVHL3JrNi9yazYvdms2Y3o2Y2IySi9USlQreVRiK3FUCmwrWEhEZnczcVU4OS9FdldUZTFQNlpPZjJpYy92VTkrUnA4ODNRMjhFVi9xZ2JveFA2dFBmbmFmL0p3KytibDkKOHZmMHljL3JrNS9mSjcrZ1QzNWhuL3lpUHZuRmZmTDM5c2t2cGZuL0IzanVSbmdLWlc1a2MzUnlaV0Z0Q21WdQpaRzlpYWdvek9DQXdJRzlpYWdveE16TXlOZ3BsYm1Sdlltb0tNekFnTUNCdlltb0tQRHdnTDFSNWNHVWdMMFp2CmJuUWdMMU4xWW5SNWNHVWdMMVJ5ZFdWVWVYQmxJQzlDWVhObFJtOXVkQ0F2V1V4WFYwTk5LMGhsYkhabGRHbGoKWVNBdlJtOXVkRVJsYzJOeWFYQjBiM0lLTXprZ01DQlNJQzlVYjFWdWFXTnZaR1VnTkRBZ01DQlNJQzlHYVhKegpkRU5vWVhJZ016TWdMMHhoYzNSRGFHRnlJRE16SUM5WGFXUjBhSE1nV3lBM05EUWdYU0ErUGdwbGJtUnZZbW9LCk5EQWdNQ0J2WW1vS1BEd2dMMHhsYm1kMGFDQTBNU0F3SUZJZ0wwWnBiSFJsY2lBdlJteGhkR1ZFWldOdlpHVWcKUGo0S2MzUnlaV0Z0Q25nQlhaREJic01nRUVUdmZNVWUwME9FblROQ3FsSkY4cUZKVlRjZmdHRnRJZFVMV3VPRAovNzVBblZUcVlRL016SU5oNWJsNzY4Z25rQjhjYkk4SlJrK09jUWtyVzRRQkowK2lQWUh6TnUybnF0blpSQ0V6CjNHOUx3cm1qTVlCU0FrQitabVJKdk1IaDFZVUJYNHAyWTRmc2FZTEQvZHhYcFY5ai9NWVpLVUVqdEFhSFk3N3UKM2NTcm1SRmtSWStkeTc1UDJ6RlRmNG12TFNMa1JwbG9meXZaNEhDSnhpSWJtbENvcHRIcWN0RUN5ZjJ6ZG1BWQo5K1NwMWFwT1kyek5QNXlDbGk4K0s5bVZPYmVwZTZoRlN3RlArRnhWRExFOFdPY0hqQmx3ZGdwbGJtUnpkSEpsCllXMEtaVzVrYjJKcUNqUXhJREFnYjJKcUNqSXlNZ3BsYm1Sdlltb0tNemtnTUNCdlltb0tQRHdnTDFSNWNHVWcKTDBadmJuUkVaWE5qY21sd2RHOXlJQzlHYjI1MFRtRnRaU0F2V1V4WFYwTk5LMGhsYkhabGRHbGpZU0F2Um14aApaM01nTkNBdlJtOXVkRUpDYjNnZ1d5MDVOVEVnTFRRNE1TQXhORFExSURFeE1qSmRDaTlKZEdGc2FXTkJibWRzClpTQXdJQzlCYzJObGJuUWdOemN3SUM5RVpYTmpaVzUwSUMweU16QWdMME5oY0VobGFXZG9kQ0EzTVRjZ0wxTjAKWlcxV0lEazRJQzlZU0dWcFoyaDBDalV5TXlBdlUzUmxiVWdnT0RVZ0wwRjJaMWRwWkhSb0lEUTBNU0F2VFdGNApWMmxrZEdnZ01UVXdNQ0F2Um05dWRFWnBiR1V5SURReUlEQWdVaUErUGdwbGJtUnZZbW9LTkRJZ01DQnZZbW9LClBEd2dMMHhsYm1kMGFDQTBNeUF3SUZJZ0wweGxibWQwYURFZ05UazRPQ0F2Um1sc2RHVnlJQzlHYkdGMFpVUmwKWTI5a1pTQStQZ3B6ZEhKbFlXMEtlQUhGV0h0d0ZFVWEvM29ldXhzU05JRkFOZ25MekRwc1hwc1lRalE4aFNYcwpoamNHQXJpTEJIYVRiRWdpa1JTR25HakJwVlE4V1RDbmNuQUtub0xlY1FJaVE2QndFZzZNbHA1YXB4N3ErVHlyCmZLS1dKZWM5NU1wbjVuNDltNnlFVWlwL1VONTBmZk05Kyt1dmY5M1RzenV0YTlkRmFTaTFrMGlWeXlJdDlXUmQKR1JQQUNtdWJJeTF4UGYxejhLemF0bFkxcnN2UEVZbGI2MXRXTmNmMXBNVkV5WGV0V3IyK3IvK0lWQ0wyWmtNMApVaGYzMDNmZ1pRMHd4SFYyQmZpWWh1YldHK042K2tmZ2p0VnJhdnY4SXh6UWJjMlJHL3ZHcDNlZ3E5ZEhtcVB4CitJeDA4REV0YTI1b2plc2pQd1V2YkZrYjdZdG5RU0xwZW1Ld0NyU0drdWc2c2tOS1JWdEZaUDgwK1M2UzRPVisKWEtzZU1WOVllZW1VczVUR2h5VmFPZi9YRm4rejY2RmRYMFcveTAyKzIvRTFERW45OFp6YjhudnppVklZL0dlUwo3MDU0ckg2NENRWlZlMWszeWF5TFZuclpFK3c0VGFVcktKOWNOQXp1cVBjSjlpY3FQODl5Z2lZTnNOQVQ3SEdhClQxZlJlTXBMZERNb1RGZGJsdXkrUkYwMEV6SG5wdTQrTHpWMXM1T1ljSjNYWU1mVXdJWkdwOStnS3E5QnMwSFQKUUZlQ3ZON3BUbXBuZStrdTBHNlFTSTFzQzYwSGJRYmRCNUlTMGo1b1hXeExwK1R3ZGJQMWxNWG0rSklsWlhGNgpwdUlja3F5OFlqRGIwUWVVdDV3ZkhtZVoyRnp2czh6T29aUTBmUWpielI2a09sTFlIOGpEYnFKWmxNZDJIc2xmCnJZVGgya2N0b0hhUWFOMFoyOWM1ZXB4eWtoV1NSMkxvazBPakpYWk0rYVNrU0RsZFlnaXNVM2txMTVEQW5od04KelhlcDB1TjZRSG5DdFVvNUNUb1FkKzNQUjhReFpaOXJ0Ykp0dE1GMmRpcjN1QXlHUG5mSDJUb1h1aDVUbXZOMwpLSFVsbG4vZURrTTQwS2xNaEgrcEwxa3BtK0JXcm5SOXBCVG5HZzRHdmNnMVR5a29lVkVaZzQ0SVU1SFU0MHRUClJybTJLWlBnR3UwSzVFNENIV2Y3MlM0cVlMczZQWE9VYm9pWTdwSForUk4yR096bUk3UHlTandHdThsWE5pdHYKUi82c1hFLytQTVdUWDVHYkMzbnBjL2JiN05mYXA5dkgyYjMyUEh1TzNXM1B0cWM3aGpsU0haYzRVaHhESEE2SAozV0NQZGs1VGJNZlpBWm9HV0E0Y2NkZ2Nzc0VlZzFFNnpnNWF4b09QT3lTSDRDQkh1bUcrZHhUUElxVWI3TUJSCi9sUVNoR00yUzdJWjdPQ1J1T21nVDVHNEpGbU9WSUhMdU9GT0FuTUlOSWQwZHFkaG8wMGoyNlk1cHcyYm1qYXgKd3Y5VHQ3RGw2Yjk3Zi9weU1wZStZMjVWVU4vdkN1bmp1R0M2UXYzaHpuN2hKM25yT3JpaTVWN3YzRVhyajdTMQpOTlVIb2xvZ3JBV2lvTEMrcGEzQnFiZlhxT3JocGhidVVIVXhKMXhUMjhCNUpLcTNhRkcvM3FUNTFjTnRWci96CjNQWGMzYWI1RDFOOVlISHdjTDB2NnU5czg3VUZ0SWcvZEtTbWZHMzFnTEUySjhaYVcvNGpZNVh6Wkd2NVdEVlcKdi9QR3F1YnVHajVXTlIrcm1vOVY0NnV4eHVLVER6UldsZC9RaXQycEJocm5xbnBlbFQ1NzRiS2dya1pDZm9QdApoZEcvamtqdW9WVDVCT1hKN1pRbEZaTkNaTDRGZXB2ejNpWG14L0t6bE5yYmJQNUxuSXhWN2VJazlFNmJRajEwCkorMmlRMlNqUnlEbjBRcTZsNTVuVFhpNGw5TlJlcDJOcHN2eGJwRElvSG4wQWpQTmw2bWVmby80Vm5xS3R0TmgKU2tHZlpob0Jid2Z6bURkQjkwR3VvZHZNaDJnTVRhRGI2UVJOUk5ZT09tUHVNNC9BdTRpVzBINDZnUDUvWVpwdwpXQnB1UG1aK1JBNWFpSnkzd2ZPeU9jODhoTk91RUdkWUpheTMwVW5tRWQ4Mkc4aEprMUhkL2ZRZzdhRW42WE4yCkN6dHFOcGh0NWluemZleFZKNDJpS3JRTjdDaDdYendrM1c3ZWIzNW05Z0tKUENyQXFHSGFSZzhqL3lHMEhoejkKQVhZZGEyWGIySGJCSjl3aUhKVTJ5Um05M3dPSGZKeW1NM0UwcmFFN2dFQVhQVTMvcHEvWkY0SlRUQlZieFdmTQpLODMvVURMTnhTejVUS0xVaHZZcnRBN002VGl6c2JGc0JxdGtHOWh2MkhiMnFsQWdMQkdDd2krRUc0V1B4UVhpCmNuRzkrS3AwZzlRcGI1WHZ0U1gzbmpXUG04K2FyMUVHWGd2WDBscmFpTms5UmFmb1MvcUdpY2cxaW5uWVpGYk8KVnFDMXMxMUNGOXZEdW9SSzFzTk9DZnZadSt4RDlnWDdWcENGRkdHRTRCVmFoVzNDQWVFcDRTV3hVZHd1M2llKwpLNTZWcHNxQ3ZFYytiZlBZLzk1YjA3dTU5eVZ6c3ZtKytSWE9XQWU1c1RMbHRJQldVZ1N6YmNHcjU1ZVl4VUcwClExaTFwK2taZXQ1cUg3SlJkSWErQWdyRWhyRXNObzdOUjF2QXJtYjFySkU5d0xyUlRscTEvRmZBUWdoSlFwcVEKSVl3U3FvUWFvVmxvRjE0VDJzVnNzVUNjSXk0VEQ2RTlKNzR1Zml0K0s4blNjR21FTkZPYVRWdWxabWtuMmw3cApFYWxUK3FzOFVaNHFMNUNYeXUzeVpubXJXQ3UvTEw5dTIyanJzSFhhdnJEOUUrZmlQUHNhKzFhc3p2UFlzMDlpCkwvOXdTV3dNcWg5SDExTXQ4N01hMm9IVjJNTWlGTVB1cW1OM0FLOFd5ak9yeFkzaVRHRXNkc05KdWhtN2RTZHQKb00zaWN0cGp2aW51cHpld1UxWWpaVHY5VVNvbmwveGJyTTR0TkJhNzZJZTJEYXUrbXg3RmMzRUFPQkY1ZTVkWQp6NTFiUGttNXZ2eUMvTHpjSE04WTdUSzNpbmZDcU95c1RHZkd5QkhwdzRlbHBRNU5TUjZTNUxEYlpFa1VHQlVHCnRJcXdxdWVFZFNsSG16V3JpT3RhQkliSU9ZWXdublZWcnhnWW82dThYd1N1QVpFK1JOYWZGK21MUi9vU2tTeFYKblVKVGlnclZnS2JxTC9vMTFXRExGZ1loMytuWFFxcCt4cExuVy9KZGxqd1VzdHVORG1yQTJlQlhkUlpXQTNwRgpXME1zRVBZWEZiSXVIeUFZVWxUSUR4WWZKZlBFT3MySWJNQUpURE40UkVEUDB2d0JQVk9EREovb0NVVHE5TXFGCndZQS8yKzBPd1FiVG9pREdLQ3BzMUZFbmJVbXAwK3EyR0Q2cUNYTXBzanlvaTVHUUxvUjVyalN2bnFINTlZeWIKVGp0L1VQdWx3Tlp6bkxyZ3FZaEVZeFc2TDd3RjRISTF6TFhJVm1oenExU2tGVGFGZ2pyYjFGY0VyN0VKbGZKeQo0eThOVDdoSjFaTzBjcTBoMWhRR3VMUW8ySm5seTdKT1o1MHFnNTJadmt4TEtTcnNjbTZjN01ic3U0cW1GMDNuCmZMTGJ1VEhPUDdrMWJuK2xoM1BueHFmZkE1KzdLQUVBNHdob3MxR25ydFphZzJnb2RnSy9SU2RRckhZQ2NNSVYKWXBobUkrcVpvUXZZTTZKSGx6MnpJM3A3Vlg4WkRmNTRjZUVtZjJkU1pwYjFsaW9QSVQ0Y1M1MkVsVUo4cXFiRwp6dUoxSHRiT2ZEN1FFdW16MkR5cFo0azcrVUluOW9yT0l2MXlHMytiZWpEckJxZld3TmUzelZwVDZKb3pjSTRCCk9vZUcxNnluNHcxZkdYVHJhZ2dHL053c25HdFFVbVh3TUdNZElZT1ptd3p5dTdyd0cxdGN1UUx1UXI3Vkd2MFkKSDBwUklRd0Zia2lYRjZvVkdMbUM3eFUxcHNabTE4WFVDclVCbTBueVdCeU9hQ3hVREFTcmdzQ0pGbU5FWHlnNwpJVVpEb1VuSVU4enpvQXZDWXlGa2FPckxBRzZaaXI5SDBOaEN2RzNGbk1yZ3dxRGU3cy9XZmY0UVZnSGJ0NmN5CnFQZGc1NFpDaUNwSlZJcUsrVS9yZU0zalVITkpBZnlsOFN6NGNkT09GS0ZZak9lc0NtcHV2U2NXeTQ3eDV5MnUKRzR6T04vajZEQWJ4RUE2NXdkb3IwUmRNYzJkYmErRFczQ2dyeERHOUFsdTZmMGZoUi8yRkVTNUwxSTJlNDFGdAptWVh3aEl1RThNVEJJRHhwVUFoUFRsUTZBT0VwcUhreVIvaXFudy9ocVFNUW5uWmhoSDJKdWxIa2RGVHJzeEF1CnYwZ0l6eGdNd3Y1QklSeElWRG9BNFFyVUhPQUl6L3o1RUo0MUFPSFpGMFo0VHFKdUZEa1gxYzZ4RUo1M2tSQ2UKUHhpRUZ3d0s0YXNUbFE1QXVCSTFYODBSWHZqeklieG9BTUpWRjBaNGNhSnVGTGtFMVM2MkVGNTZrUkMrWmpBSQpCd2VGY0NoUjZRQ0VsNkhtRUVmNDJnVEN2bXlkemoySDI4ODdkdW1pSDh6TEIwQmVmV0hJVnlRbWdxcFhvdndWCkZ1VGhpd1I1WkRDUTF3d0s4dHBFcFFNZ3IwUE50Unp5NlA4Ujh2cHpJSmVIVWJuOEpZWHhJN1gvbTE4Sy91bWwKUUhjbkxQZytTZndycDREL1JDU2R3bjlwRWQ4TVo4US9sRG1LRFpKQWpsU0Q2QlNJNjVERmR5Q0QyOEZGOEtSMwpxQnU5aUpaNnU1RkpCaDliVXBybVRzc0ZsVXNkeG5jZnlDZSttV0ZJODcvRmh4ZU1IVGJmbHJmSnA2bVVYdVFqCmRlT3Zob1JPOGV3Q1JoTDZSckpCdGhWUHowYmRMaG9KeWdHVmdTcEFTMEgxb0RiUTdhQWRvTDJnWTZBL2c0WlcKVDVmcE5RaW5RVUsxUVM3VW1vMk0yY2pPWlFXeVVvemFjNmpZcW4wb3BWc2MzMzhzbm9SeGVWbERFWnlHeVNhQgpPOUhKQnA0RnpzQjVFZzZHKzlUWWt1SGpTM091dkdLOE5yNjBiSHlaZXh4bGFKY3o3VEs3RFIrMDNMWVI2UmxnCkl6TkdsbzRiWHphKzFHYTNhWmZsNW9qaGdxY0Y0UjhGZjd1cytuNDIvRE1tWHZKdzl0N3RqN2RNelJZdUwvaisKVTVFSi9vTHZ6enF2aWo3ZkZTbk5mSGpremR1K2Z1T2VXSzZRMHBIdjlYZzZIci85Zzk2M2ozZnN2Vy94cG83UwppVm5Pamx2RHUvZUY3djcwZHlkMjNjTmt2cTdXWlVieG4vM0hMdmlaSUFYV3JWM0R2UXhmSVBqYzhhRVgzNHdwCk5PK2FhMmJNOTg2S3JtNkx0amJXUnF3SXk0MGIvRFRLN0x1NE1TRXo5Vkd1L3cvNVAxdHpDbVZ1WkhOMGNtVmgKYlFwbGJtUnZZbW9LTkRNZ01DQnZZbW9LTXpFME5BcGxibVJ2WW1vS01TQXdJRzlpYWdvOFBDQXZWR2wwYkdVZwpLSE5oYlhCc1pTMWtiMk4wYjNJdGNISmxjMk55YVhCMGFXOXVMV1p2Y20wdWNHUm1LU0F2VUhKdlpIVmpaWElnCktHMWhZMDlUSUZabGNuTnBiMjRnTVRBdU1UVXVNaUJjS0VKMWFXeGtJREU1UXpVM1hDa2dVWFZoY25SNklGQkUKUmtOdmJuUmxlSFFwQ2k5RGNtVmhkRzl5SUNoUWNtVjJhV1YzS1NBdlEzSmxZWFJwYjI1RVlYUmxJQ2hFT2pJdwpNakF3TnpJM01EYzFPVFF5V2pBd0p6QXdKeWtnTDAxdlpFUmhkR1VnS0VRNk1qQXlNREEzTWpjd056VTVOREphCk1EQW5NREFuS1FvK1BncGxibVJ2WW1vS2VISmxaZ293SURRMENqQXdNREF3TURBd01EQWdOalUxTXpVZ1ppQUsKTURBd01EQTNNamMxTUNBd01EQXdNQ0J1SUFvd01EQXdNREF4T1RFeElEQXdNREF3SUc0Z0NqQXdNREF3TlRRMApORGtnTURBd01EQWdiaUFLTURBd01EQXdNREF5TWlBd01EQXdNQ0J1SUFvd01EQXdNREF4T0RreElEQXdNREF3CklHNGdDakF3TURBd01ESXdNalVnTURBd01EQWdiaUFLTURBd01EQXdOVFkyTXlBd01EQXdNQ0J1SUFvd01EQXcKTURNM01ETTFJREF3TURBd0lHNGdDakF3TURBd01ESTFPVEFnTURBd01EQWdiaUFLTURBd01EQXdORGc1TkNBdwpNREF3TUNCdUlBb3dNREF3TURVd09EZ3pJREF3TURBd0lHNGdDakF3TURBd016YzFPVGdnTURBd01EQWdiaUFLCk1EQXdNREEwTlRVMU1pQXdNREF3TUNCdUlBb3dNREF3TURVME5ERXlJREF3TURBd0lHNGdDakF3TURBd016Y3cKTlRZZ01EQXdNREFnYmlBS01EQXdNREF6TnpVM09DQXdNREF3TUNCdUlBb3dNREF3TURBMU5EQTNJREF3TURBdwpJRzRnQ2pBd01EQXdNRFUyTkRRZ01EQXdNREFnYmlBS01EQXdNREEwTnpZd09TQXdNREF3TUNCdUlBb3dNREF3Ck1EUTRNVEkzSURBd01EQXdJRzRnQ2pBd01EQXdNRFE1TVRVZ01EQXdNREFnYmlBS01EQXdNREF3TlRFek9DQXcKTURBd01DQnVJQW93TURBd01EQTFNVFUzSURBd01EQXdJRzRnQ2pBd01EQXdNRFV6T0RnZ01EQXdNREFnYmlBSwpNREF3TURBME5UVTNNeUF3TURBd01DQnVJQW93TURBd01EUTNOVGc0SURBd01EQXdJRzRnQ2pBd01EQXdNREl6Ck1EWWdNREF3TURBZ2JpQUtNREF3TURBd01qVTNNU0F3TURBd01DQnVJQW93TURBd01EVTBOVGt5SURBd01EQXcKSUc0Z0NqQXdNREF3TmpnM05qTWdNREF3TURBZ2JpQUtNREF3TURBME9ERTBOeUF3TURBd01DQnVJQW93TURBdwpNRFV3T0RZeUlEQXdNREF3SUc0Z0NqQXdNREF3TlRBNU1qQWdNREF3TURBZ2JpQUtNREF3TURBMU5ETTVNU0F3Ck1EQXdNQ0J1SUFvd01EQXdNRFUwTlRReUlEQXdNREF3SUc0Z0NqQXdNREF3TlRVd056UWdNREF3TURBZ2JpQUsKTURBd01EQTFOVE15TkNBd01EQXdNQ0J1SUFvd01EQXdNRFk0TnpReElEQXdNREF3SUc0Z0NqQXdNREF3TmpreQpORFlnTURBd01EQWdiaUFLTURBd01EQTJPRGt5T0NBd01EQXdNQ0J1SUFvd01EQXdNRFk1TWpJMklEQXdNREF3CklHNGdDakF3TURBd05qazBPVFVnTURBd01EQWdiaUFLTURBd01EQTNNamN5T1NBd01EQXdNQ0J1SUFwMGNtRnAKYkdWeUNqdzhJQzlUYVhwbElEUTBJQzlTYjI5MElETTFJREFnVWlBdlNXNW1ieUF4SURBZ1VpQXZTVVFnV3lBOApOR1ZtTXpReVpqY3daV1F6WTJGak9UVXdNbU15TVRBelkyRTJNRGc1TVRNK0NqdzBaV1l6TkRKbU56QmxaRE5qCllXTTVOVEF5WXpJeE1ETmpZVFl3T0RreE16NGdYU0ErUGdwemRHRnlkSGh5WldZS056STVOemdLSlNWRlQwWUsK",
              "title": "Surgical Pathology Report"
            }
          }
        ]
      }
    },
    {
      "fullUrl": "Practitioner/MAX5001",
      "resource": {
        "resourceType": "Practitioner",
        "id": "MAX5001",
        "identifier": [
          {
            "system": "https://www.mciindia.in/doctor",
            "value": "MAX5001"
          }
        ],
        "name": [
          {
            "text": "Laxmikanth J",
            "prefix": [
              "Dr"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "Procedure/e6c5e7fd-c22a-4d5a-a568-270753e51249",
      "resource": {
        "resourceType": "Procedure",
        "id": "e6c5e7fd-c22a-4d5a-a568-270753e51249",
        "status": "completed",
        "code": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "90105005",
              "display": "Biopsy of soft tissue of forearm (Procedure)"
            }
          ],
          "text": "Biopsy of suspected melanoma L) arm"
        },
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "performedDateTime": "2019-04-17T00:00:00+05:30",
        "asserter": {
          "reference": "Practitioner/MAX191101",
          "display": "Dr Akshatha M K"
        },
        "performer": [
          {
            "actor": {
              "reference": "Practitioner/MAX5001"
            }
          }
        ],
        "complication": [
          {
            "coding": [
              {
                "system": "https://projecteka.in/sct",
                "code": "131148009",
                "display": "Bleeding"
              }
            ]
          }
        ]
      }
    },
    {
      "fullUrl": "CarePlan/00bc7230-101b-4339-bbed-89be3918663c",
      "resource": {
        "resourceType": "CarePlan",
        "id": "00bc7230-101b-4339-bbed-89be3918663c",
        "status": "draft",
        "intent": "proposal",
        "title": "Tentative Plan for next 2 months",
        "description": "Actively monitor progress. Review every week to start with. Medications to be revised after 2 weeks.",
        "subject": {
          "reference": "Patient/NCC1543"
        },
        "period": {
          "start": "2019-04-19T00:00:00+05:30",
          "end": "2019-06-18T00:00:00+05:30"
        },
        "author": {
          "reference": "Practitioner/MAX191101",
          "display": "Dr Akshatha M K"
        },
        "note": [
          {
            "text": "Actively monitor progress."
          },
          {
            "text": "Review every week to start with. Medications to be revised after 2 weeks."
          }
        ]
      }
    },
    {
      "fullUrl": "Appointment/4976fe22-7475-4545-a11b-5160b4950878",
      "resource": {
        "resourceType": "Appointment",
        "id": "4976fe22-7475-4545-a11b-5160b4950878",
        "status": "booked",
        "description": "Review progress in 7 days",
        "start": "2019-04-22T00:00:00.000+05:30",
        "end": "2019-04-22T00:30:00.000+05:30",
        "participant": [
          {
            "actor": {
              "reference": "Practitioner/MAX191101",
              "display": "Dr Akshatha M K"
            },
            "status": "accepted"
          }
        ]
      }
    }
  ]
}
