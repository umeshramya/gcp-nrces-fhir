const body = {
    "resourceType" : "Condition",
    "id" : "example-01",
    "meta" : {
      "profile" : [
        "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
      ]
    },
    "text" : {
      "status" : "generated",
      "div" : "<div xmlns=\"http://www.w3.org/1999/xhtml\">Abdominal pain on 09-July 2020</div>"
    },
    "code" : {
      "coding" : [
        {
          "system" : "http://snomed.info/sct",
          "code" : "21522001",
          "display" : "Abdominal pain"
        }
      ],
      "text" : "Abdominal pain"
    },
    "subject" : {
      "reference" : "Patient/1"
    }
  }