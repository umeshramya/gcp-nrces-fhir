
const first ={
    "status": "final",
    "code": {
      "coding": [
        {
          "code": "29463-7",
          "display": "Body weight",
          "system": "http://loinc.org"
        }
      ],
      "text": "Body weight"
    },
    "patientId": "bc886102-a512-4061-a0f3-1966aa8b1b29",
    "id": "09d05e91-755a-4445-8fc5-3efa51ffb10e",
    "value": {
      "code": "kg",
      "system": "http://unitsofmeasure.org",
      "unit": "Kg",
      "value": 78
    },
    "text": "Weight 78.00 Kg",
    "valueWithType": {
      "valueQuantity": {
        "code": "kg",
        "system": "http://unitsofmeasure.org",
        "unit": "Kg",
        "value": 78
      }
    },
    "category": [
      {
        "coding": [
          {
            "code": "vital-signs",
            "display": "Vital Signs",
            "system": "http://terminology.hl7.org/CodeSystem/observation-category"
          }
        ],
        "text": "Vital Signs"
      }
    ],
    "performer": [
      {
        "id": "fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
        "resource": "Organization"
      }
    ]
  }
  
  
 const second = {
        "code": {
          "text": "Body weight",
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "29463-7",
              "display": "Body weight"
            }
          ]
        },
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                "code": "vital-signs",
                "display": "Vital Signs"
              }
            ],
            "text": "Vital Signs"
          }
        ],
        "performer": [
          {
            "id": "fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
            "resource": "Organization"
          }
        ],
        "patientId": "fb8d779e-a655-4f1e-8808-b2f43453fc55",
        "encounterId": "433fd40c-f8c8-4fb0-8dbe-fda6c807c335",
        "status": "final",
        "text": "Weight 67.00 Kg",
        "value": {
          "valueQuantity": {
            "value": 67,
            "unit": "Kg",
            "system": "http://unitsofmeasure.org",
            "code": "kg"
          }
        }
      }