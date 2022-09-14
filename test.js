const pres={
  "author": [
    {
      "display": "Dr U R  Bilagi",
      "reference": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14"
    }
  ],
  "custodian": {
    "reference": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
  },
  "date": "2022-08-27T12:23:55.096Z",
  "encounter": {
    "reference": "Encounter/3c45a6bf-980b-4af1-975e-873de581e83c"
  },
  "extension": [
    {
      "url": "https://www.nicehms.com/user",
      "valueString": "{\"date\":\"2022-08-27T12:24:33.383Z\",\"id\":1,\"orgId\":1,\"name\":\"Umesh Bilagi\",\"orgName\":\"Jeevan Jyoti Hospital\"}"
    }
  ],
  "id": "64500c47-8c11-4c46-a789-7a9ee5874d68",
  "identifier": {
    "system": "https://ndhm.in/phr",
    "value": "736682e7-3d8b-4d84-b1ae-9e5b6d48f8ef"
  },
  "language": "en-IN",
  "meta": {
    "lastUpdated": "2022-08-27T12:24:33.928262+00:00",
    "profile": [
      "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord"
    ],
    "versionId": "MTY2MTYwMzA3MzkyODI2MjAwMA"
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
          "reference": "Condition/f291749e-b4fd-40b6-9560-c8cbb478cf92",
          "type": "Condition"
        },
        {
          "reference": "MedicationRequest/064b7745-870f-4dec-873e-0c5639372a29",
          "type": "MedicationRequest"
        }
      ],
      "title": "Prescription"
    }
  ],
  "status": "final",
  "subject": {
    "reference": "Patient/c88fe52f-5c84-43ef-aeb5-b5f1ee460963"
  },
  "text": {
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div style=\"text-align: right\">Date:-Sat Aug 27 2022</div><div style=\"text-align: right; font-size: 9px\">Docurment Status :final</div><div style=\"text-align: right; font-size: 9px\">Docurment Type :Prescription</div><table data-pdfmake=\"{'widths':['60%','40%']}\"><tr><td><div>Patient:- Umesh Ramachandra Bilagi.</div><div>MRN:- 132 </div><div>ABHA Address : umeshpradyu@sbx. ABHA Number 91-5347-0684-8874</div><div>Gender/Age: male/52 years ph: 9343403620</div></td><td><div><b>Signed By :- Dr U R  Bilagi</b></div></td></tr></table><div><p>New prescription</p>\n<p>BP 300</p><div xmlns=\"http://www.w3.org/1999/xhtml\"><table data-pdfmake=\"{'widths':['20%','20%','20%', '20%', '20%']}\">\n    <tr>\n    <th>Medcine</th>\n    <th>Frequency</th>\n    <th>Duration</th>\n    <th>Instructions</th>\n    <th>Route</th>\n  </tr><tr><td>Tab Telma 40</td><td>1-0-0</td> <td>Continue</td><td>After Food</td><td >Oral</td></tr><tr><td>Tab Ecosprin 150mg</td><td>0-1-0</td> <td>For 5 days</td><td>After food</td><td >Oral route</td></tr><tr><td>Tab Pantop 40mg</td><td>1-0-0</td> <td>For 5 Days</td><td>Before Food</td><td >Oral </td></tr></table></div></div</div>",
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

const Op={
  "author": [
    {
      "display": "Dr U R Bilagi",
      "reference": "Practitioner/cf4a6ab1-3f32-4b92-adc5-89489da6ca14"
    }
  ],
  "custodian": {
    "reference": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
  },
  "date": "2022-09-14T03:03:02.124Z",
  "encounter": {
    "reference": "Encounter/3c45a6bf-980b-4af1-975e-873de581e83c"
  },
  "extension": [
    {
      "url": "https://www.nicehms.com/user",
      "valueString": "{\"date\":\"2022-09-14T03:16:38.250Z\",\"id\":1,\"orgId\":1,\"name\":\"Umesh Bilagi\",\"orgName\":\"Jeevan Jyoti Hospital\"}"
    }
  ],
  "id": "4bf1efb2-fd71-49da-9732-4a3d8f0ef394",
  "identifier": {
    "system": "https://ndhm.in/phr",
    "value": "e4a30d3c-0505-4141-a9a3-5537a431b191"
  },
  "language": "en-IN",
  "meta": {
    "lastUpdated": "2022-09-14T03:16:37.142945+00:00",
    "profile": [
      "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord"
    ],
    "versionId": "MTY2MzEyNTM5NzE0Mjk0NTAwMA"
  },
  "resourceType": "Composition",
  "section": [
    {
      "code": {
        "coding": [
          {
            "code": "422843007",
            "display": "Chief complaint section",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/a4c86f1e-6c34-41bf-8b0a-cd76fbc4860e"
        }
      ],
      "title": "Chief complaints"
    },
    {
      "code": {
        "coding": [
          {
            "code": "371529009",
            "display": "History and physical report",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/e5498345-1f6d-415c-85ef-381738aae06d"
        }
      ],
      "title": "Medical History"
    },
    {
      "code": {
        "coding": [
          {
            "code": "371529009",
            "display": "physical report",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/91c1af2b-df04-4727-a2cd-f81414a657cb"
        }
      ],
      "title": "Physical Examination"
    },
    {
      "code": {
        "coding": [
          {
            "code": "371525003",
            "display": "Clinical procedure report",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "Procedure/b935fbc9-a440-40f4-a59c-317ddf77113f"
        }
      ],
      "title": "Procedure"
    },
    {
      "code": {
        "coding": [
          {
            "code": "736271009",
            "display": "Outpatient care plan",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "Appointment/399b03c5-5065-469a-905d-e0101f5a7a4f"
        }
      ],
      "title": "Follow Up"
    },
    {
      "code": {
        "coding": [
          {
            "code": "721912009",
            "display": "Medication summary document",
            "system": "http://snomed.info/sct"
          }
        ]
      },
      "entry": [
        {
          "reference": "MedicationRequest/9b3d0403-3bce-4bc7-ab12-44d9d75fa95d"
        }
      ],
      "title": "Medications"
    }
  ],
  "status": "preliminary",
  "subject": {
    "reference": "Patient/c88fe52f-5c84-43ef-aeb5-b5f1ee460963"
  },
  "text": {
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div style=\"text-align: right\">Date:-Wed Sep 14 2022</div><div style=\"text-align: right; font-size: 9px\">Docurment Status :preliminary</div><div style=\"text-align: right; font-size: 9px\">Docurment Type :OPConsultation</div><table data-pdfmake=\"{'widths':['60%','40%']}\"><tr><td><div>Patient:- Umesh Ramachandra Bilagi.</div><div>MRN:- 132 </div><div>ABHA Address : umeshpradyu@sbx. ABHA Number 91-5347-0684-8874</div><div>Gender/Age: male/52 years ph: 9343403620</div></td><td><div><b>Signed By :- Dr U R Bilagi</b></div></td></tr><tr><td></td><td>Internal Id : THS 123456</td></tr></table><div><table  style=\"border-collapse: collapse; width: 99.9739%;\" border=\"0\"><tbody style=\"display: table-header-group\"><tr><td style=\"width: 50%;\"  border=\"0\" ><b>Chief complaints</b><p>Chest pain since last 1 day</p><br/><b>Medical History</b><p>Chest pain pricking in nature associeted with sweating and breathlessnness</p><br/><b>Physical Examination</b><p>BP 120/80</p></br><b>Procedure</b><div>Asserted By : Dr U R Bilagi MD DM </div><p>ECG Normal</p></br></td><td style=\"width: 50%;\"  border=\"0\" ><div\"><span><b>Follow up:-</b>Mon Dec 12 2022 <div></div></br></td></tr></thead><tbody></table><b>Prescription</b><div xmlns=\"http://www.w3.org/1999/xhtml\"><table data-pdfmake=\"{'widths':['20%','20%','20%', '20%', '20%']}\">\n    <tr>\n    <th>Medcine</th>\n    <th>Frequency</th>\n    <th>Duration</th>\n    <th>Instructions</th>\n    <th>Route</th>\n  </tr><tr><td>Tab Pantop 40mg</td><td>1-0-0</td> <td>For 5 Days</td><td>Before Food</td><td >Oral </td></tr><tr><td>Tab Telma 40</td><td>1-0-0</td> <td>Continue</td><td>After Food</td><td >Oral</td></tr></table></div></div</div>",
    "status": "generated"
  },
  "title": "OPConsultation",
  "type": {
    "coding": [
      {
        "code": "371530004",
        "display": "Clinical consultation report",
        "system": "https://ndhm.gov.in/sct"
      }
    ],
    "text": "Clinical consultation report"
  }
}