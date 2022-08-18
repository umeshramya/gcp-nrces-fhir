const test= {
  "resourceType": "Bundle",
  "id": "aca383e6-621e-4faa-88b0-78cfbf47f10b",
  "meta": {
    "lastUpdated": "2022-08-18T17:28:32.688Z"
  },
  "identifier": {
    "system": "https://www.nicehms.com/bundle",
    "value": "aca383e6-621e-4faa-88b0-78cfbf47f10b"
  },
  "type": "document",
  "timestamp": "2022-08-14T16:32:24.570Z",
  "entry": [
    {
      "fullUrl": "Composition/aca383e6-621e-4faa-88b0-78cfbf47f10b",
      "resource": {
        "author": [
          {
            "display": "Dr U R  Bilagi",
            "reference": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14"
          }
        ],
        "custodian": {
          "reference": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
        },
        "date": "2022-08-14T16:32:24.570Z",
        "encounter": {
          "reference": "Encounter/0ffdeea4-2282-4015-b551-e2672de341de"
        },
        "extension": [
          {
            "url": "https://www.nicehms.com/user",
            "valueString": "{\"date\":\"2022-08-14T16:32:49.209Z\",\"id\":1,\"orgId\":1,\"name\":\"Umesh Bilagi\",\"orgName\":\"Jeevan Jyoti Hospital\"}"
          }
        ],
        "id": "aca383e6-621e-4faa-88b0-78cfbf47f10b",
        "identifier": {
          "system": "https://ndhm.in/phr",
          "value": "3acae166-d70c-4bd3-95d9-62db2d7f1e22"
        },
        "language": "en-IN",
        "meta": {
          "lastUpdated": "2022-08-14T16:32:50.457213+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord"
          ],
          "versionId": "MTY2MDQ5NDc3MDQ1NzIxMzAwMA"
        },
        "resourceType": "Composition",
        "section": [
          {
            "code": {
              "coding": [
                {
                  "code": "440545006",
                  "display": "Prescription",
                  "system": "https://ndhm.gov.in/sct"
                }
              ]
            },
            "entry": [
              {
                "reference": "Condition/3a5cd214-fe9b-4d9c-a552-685d09978c20",
                "type": "Condition"
              },
              {
                "reference": "MedicationRequest/4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
                "type": "MedicationRequest"
              }
            ],
            "title": "Prescription"
          }
        ],
        "status": "final",
        "subject": {
          "reference": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7"
        },
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div style=\"text-align: right\">Date:-Sun Aug 14 2022</div><div style=\"text-align: right; font-size: 9px\">Docurment Status :final</div><div style=\"text-align: right; font-size: 9px\">Docurment Type :Prescription</div><table data-pdfmake=\"{'widths':['60%','40%']}\"><tr><td><div>Patient:- Umesh Ramachandra Bilagi.</div><div>MRN:- 128 </div><div>ABHA Address : ramyaumesh@sbx. ABHA Number 91-1713-2716-4272</div><div>Gender/Age: male/52 years ph: 9343403620</div></td><td><div><b>Signed By :- Dr U R  Bilagi</b></div></td></tr></table><div><p>This fir Tetsing</p><div xmlns=\"http://www.w3.org/1999/xhtml\"><table data-pdfmake=\"{'widths':['20%','20%','20%', '20%', '20%']}\">\n    <tr>\n    <th>Medcine</th>\n    <th>Frequency</th>\n    <th>Duration</th>\n    <th>Instructions</th>\n    <th>Route</th>\n  </tr><tr><td>Tab Ecosprin 150mg</td><td>0-1-0</td> <td>For 5 days</td><td>After food</td><td >Oral route</td></tr><tr><td>Tab Pantop 40mg</td><td>1-0-0</td> <td>For 5 Days</td><td>Before Food</td><td >Oral </td></tr></table></div></div</div>",
          "status": "generated"
        },
        "title": "Prescription",
        "type": {
          "coding": [
            {
              "code": "440545006",
              "display": "Prescription record",
              "system": "https://ndhm.gov.in/sct"
            }
          ],
          "text": "Prescription record"
        }
      }
    },
    {
      "fullUrl": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7",
      "resource": {
        "birthDate": "1969-09-29",
        "gender": "male",
        "id": "bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7",
        "identifier": [
          {
            "system": "https://healthid.ndhm.gov.in/health-number",
            "type": {
              "coding": [
                {
                  "code": "MR",
                  "display": "Medical record number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "91-1713-2716-4272"
          },
          {
            "system": "https://healthid.ndhm.gov.in/phr-address",
            "type": {
              "coding": [
                {
                  "code": "MR",
                  "display": "Medical record number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "ramyaumesh@sbx"
          },
          {
            "system": "https://www.nicehms.com",
            "type": {
              "coding": [
                {
                  "code": "MR",
                  "display": "Medical record number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "128"
          }
        ],
        "managingOrganization": {
          "reference": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
        },
        "meta": {
          "lastUpdated": "2022-08-17T17:32:59.099562+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
          ],
          "versionId": "MTY2MDc1NzU3OTA5OTU2MjAwMA"
        },
        "name": [
          {
            "text": "Umesh Ramachandra Bilagi"
          }
        ],
        "resourceType": "Patient",
        "telecom": [
          {
            "system": "phone",
            "use": "mobile",
            "value": "9343403620"
          }
        ],
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient name - Umesh Ramachandra Bilagi,Gender- Male</div>",
          "status": "generated"
        }
      }
    },
    {
      "fullUrl": "Encounter/0ffdeea4-2282-4015-b551-e2672de341de",
      "resource": {
        "class": {
          "code": "AMB",
          "display": "ambulatory",
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode"
        },
        "hospitalization": {
          "dischargeDisposition": {
            "coding": [
              {
                "code": "oth",
                "display": "Other",
                "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition"
              }
            ],
            "text": "Discharged to Home Care"
          }
        },
        "id": "0ffdeea4-2282-4015-b551-e2672de341de",
        "meta": {
          "lastUpdated": "2022-08-14T16:30:38.707008+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"
          ],
          "versionId": "MTY2MDQ5NDYzODcwNzAwODAwMA"
        },
        "period": {
          "end": "2022-08-14T16:30:27.550Z",
          "start": "2022-08-14T16:30:27.550Z"
        },
        "resourceType": "Encounter",
        "status": "in-progress",
        "subject": {
          "reference": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7"
        },
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">OPD visit Sun Aug 14 2022 </div>",
          "status": "generated"
        }
      }
    },
    {
      "fullUrl": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
      "resource": {
        "id": "fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
        "identifier": [
          {
            "system": "https://healthid.ndhm.gov.in",
            "type": {
              "coding": [
                {
                  "code": "PRN",
                  "display": "Provider number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "IN2910000001"
          },
          {
            "system": "https://www.nicehms.com",
            "type": {
              "coding": [
                {
                  "code": "PRN",
                  "display": "Provider number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "1"
          }
        ],
        "meta": {
          "lastUpdated": "2022-08-02T05:46:11.226113+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
          ],
          "versionId": "MTY1OTQxOTE3MTIyNjExMzAwMA"
        },
        "name": "Jeevan Jyoti Hospital",
        "resourceType": "Organization",
        "telecom": [
          {
            "system": "phone",
            "use": "work",
            "value": "09343403620"
          },
          {
            "system": "email",
            "use": "work",
            "value": "umeshbilagi@gmail.com"
          }
        ],
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Jeevan Jyoti Hospital. ph: 09343403620, email:<a href=\"mailto:umeshbilagi@gmail.com\">umeshbilagi@gmail.com</a></div>",
          "status": "generated"
        }
      }
    },
    {
      "fullUrl": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14",
      "resource": {
        "id": "cf4a6ab1-3f32-4b92-adc5-89489da6ca14",
        "identifier": [
          {
            "system": "https://www.nmc.org.in/",
            "type": {
              "coding": [
                {
                  "code": "MD",
                  "display": "Medical License number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "KMC36167"
          },
          {
            "system": "https://www.nicehms.com",
            "type": {
              "coding": [
                {
                  "code": "PRN",
                  "display": "Provider number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "1"
          },
          {
            "system": "https://www.nicehms.com/organizationId",
            "type": {
              "coding": [
                {
                  "code": "PRN",
                  "display": "Provider number",
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                }
              ]
            },
            "value": "fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
          }
        ],
        "meta": {
          "lastUpdated": "2022-04-10T15:12:54.877088+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner"
          ],
          "versionId": "MTY0OTYwMzU3NDg3NzA4ODAwMA"
        },
        "name": [
          {
            "text": "Dr U R  Bilagi MD DM "
          }
        ],
        "resourceType": "Practitioner",
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Dr U R  Bilagi, MD DM )</div>",
          "status": "generated"
        }
      }
    },
    {
      "fullUrl": "MedicationRequest/4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
      "resource": {
        "authoredOn": "2022-08-14T16:32:24.570Z",
        "dosageInstruction": [
          {
            "additionalInstruction": [
              {}
            ],
            "method": {
              "coding": [
                {
                  "display": "After food",
                  "system": "http://snomed.info/sct"
                }
              ]
            },
            "route": {
              "coding": [
                {
                  "display": "Oral route",
                  "system": "http://snomed.info/sct"
                }
              ]
            },
            "text": "For 5 days",
            "timing": {
              "code": {
                "text": "0-1-0"
              }
            }
          },
          {
            "additionalInstruction": [
              {}
            ],
            "method": {
              "coding": [
                {
                  "display": "Before Food",
                  "system": "http://snomed.info/sct"
                }
              ]
            },
            "route": {
              "coding": [
                {
                  "display": "Oral ",
                  "system": "http://snomed.info/sct"
                }
              ]
            },
            "text": "For 5 Days",
            "timing": {
              "code": {
                "text": "1-0-0"
              }
            }
          }
        ],
        "id": "4c2261fd-73fb-4a99-b178-f1ceaa8ebf91",
        "intent": "order",
        "medicationCodeableConcept": {
          "coding": [
            {
              "display": "Tab Ecosprin 150mg",
              "system": "http://snomed.info/sct"
            },
            {
              "display": "Tab Pantop 40mg",
              "system": "http://snomed.info/sct"
            }
          ]
        },
        "meta": {
          "lastUpdated": "2022-08-14T16:32:49.318633+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest"
          ],
          "versionId": "MTY2MDQ5NDc2OTMxODYzMzAwMA"
        },
        "reasonCode": [
          {}
        ],
        "reasonReference": [
          {}
        ],
        "requester": {
          "display": "Dr U R  Bilagi MD DM ",
          "reference": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14"
        },
        "resourceType": "MedicationRequest",
        "status": "active",
        "subject": {
          "display": "Umesh Ramachandra Bilagi",
          "reference": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7"
        },
        "text": {
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table data-pdfmake=\"{'widths':['20%','20%','20%', '20%', '20%']}\">\n    <tr>\n    <th>Medcine</th>\n    <th>Frequency</th>\n    <th>Duration</th>\n    <th>Instructions</th>\n    <th>Route</th>\n  </tr><tr><td>Tab Ecosprin 150mg</td><td>0-1-0</td> <td>For 5 days</td><td>After food</td><td >Oral route</td></tr><tr><td>Tab Pantop 40mg</td><td>1-0-0</td> <td>For 5 Days</td><td>Before Food</td><td >Oral </td></tr></table></div>",
          "status": "generated"
        }
      }
    },
    {
      "fullUrl": "Condition/3a5cd214-fe9b-4d9c-a552-685d09978c20",
      "resource": {
        "code": {
          "coding": [
            {
              "display": "Notes",
              "system": ""
            }
          ],
          "text": "Notes"
        },
        "id": "3a5cd214-fe9b-4d9c-a552-685d09978c20",
        "meta": {
          "lastUpdated": "2022-08-14T16:32:49.731201+00:00",
          "profile": [
            "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
          ],
          "versionId": "MTY2MDQ5NDc2OTczMTIwMTAwMA"
        },
        "resourceType": "Condition",
        "subject": {
          "reference": "Patient/bfe2059d-1e1e-4e06-bf26-3b07dc2b8fa7"
        },
        "text": {
          "div": "<p>This fir Tetsing</p>",
          "status": "generated"
        }
      }
    }
  ]
}



const test2 = {
  "resourceType": "Bundle",
  "id": "3739707e-1123-46fe-918f-b52d880e4e7f",
  "meta": {
    "lastUpdated": "2016-08-07T00:00:00.000+05:30"
  },
  "identifier": {
    "system": "https://www.max.in/bundle",
    "value": "3739707e-1123-46fe-918f-b52d880e4e7f"
  },
  "type": "document",
  "timestamp": "2016-08-07T00:00:00.000+05:30",
  "entry": [
    {
      "fullUrl": "Composition/c63d1435-b6b6-46c4-8163-33133bf0d9bf",
      "resource": {
        "resourceType": "Composition",
        "id": "c63d1435-b6b6-46c4-8163-33133bf0d9bf",
        "identifier": {
          "system": "https://www.max.in/document",
          "value": "c63d1435-b6b6-46c4-8163-33133bf0d9bf"
        },
        "status": "final",
        "type": {
          "coding": [
            {
              "system": "https://projecteka.in/sct",
              "code": "440545006",
              "display": "Prescription record"
            }
          ]
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "encounter": {
          "reference": "Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81"
        },
        "date": "2016-08-07T00:00:00.605+05:30",
        "author": [
          {
            "reference": "Practitioner/MAX5001",
            "display": "Dr Laxmikanth J"
          }
        ],
        "title": "Prescription",
        "section": [
          {
            "title": "OPD Prescription",
            "code": {
              "coding": [
                {
                  "system": "https://projecteka.in/sct",
                  "code": "440545006",
                  "display": "Prescription record"
                }
              ]
            },
            "entry": [
              {
                "reference": "MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0"
              }
            ]
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
      "fullUrl": "Patient/RVH9999",
      "resource": {
        "resourceType": "Patient",
        "id": "RVH9999",
        "name": [
          {
            "text": "Keith David"
          }
        ],
        "gender": "male"
      }
    },
    {
      "fullUrl": "Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81",
      "resource": {
        "resourceType": "Encounter",
        "id": "dab7fd2b-6a05-4adb-af35-bcffd6c85b81",
        "status": "finished",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "AMB",
          "display": "Outpatient visit"
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "period": {
          "start": "2016-08-07T00:00:00+05:30"
        }
      }
    },
    {
      "fullUrl": "Medication/54ab5657-5e79-4461-a823-20e522eb337d",
      "resource": {
        "resourceType": "Medication",
        "id": "54ab5657-5e79-4461-a823-20e522eb337d",
        "code": {
          "coding": [
            {
              "system": "https://projecteka.in/act",
              "code": "R05CB02",
              "display": "bromhexine 24 mg"
            }
          ]
        }
      }
    },
    {
      "fullUrl": "MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0",
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "68d9667c-00c3-455f-b75d-d580950498a0",
        "status": "active",
        "intent": "order",
        "medicationReference": {
          "reference": "Medication/54ab5657-5e79-4461-a823-20e522eb337d"
        },
        "subject": {
          "reference": "Patient/RVH9999"
        },
        "authoredOn": "2016-08-07T00:00:00+05:30",
        "requester": {
          "reference": "Practitioner/MAX5001"
        },
        "dosageInstruction": [
          {
            "text": "1 capsule 2 times a day"
          }
        ]
      }
    }
  ]
}