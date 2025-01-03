import { EXTENSION, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "../resources/ResourceMai";

interface INSURANCE_PLAN{
    id?:string
    text : string
    identifier:IDENTTIFIER[]
    extension:EXTENSION[]
}

export class InsurancePlan extends ResourceMain implements ResourceMaster{
    getFHIR(options: INSURANCE_PLAN) {
        const body={
            "resourceType" : "InsurancePlan",
            "id" : options.id,
            "meta" : {
              "versionId" : "1",
              "profile" : ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/InsurancePlan"]
            },
            "text" : {
              "status" : "extensions",
              "div" : options.text
            },
            "extension" : [{
              "extension" : [{
                "url" : "category",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                    "code" : "POI",
                    "display" : "Proof of identity"
                  }]
                }
              },
              {
                "url" : "code",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-identifier-type-code",
                    "code" : "ADN",
                    "display" : "Adhaar number"
                  }]
                }
              }],
              "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement"
            },
            {
              "extension" : [{
                "url" : "category",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-supportinginfo-category",
                    "code" : "POA",
                    "display" : "Proof of address"
                  }]
                }
              },
              {
                "url" : "code",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
                    "code" : "PPN",
                    "display" : "Passport number"
                  }]
                }
              }],
              "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-SupportingInfoRequirement"
            },
            {
              "extension" : [{
                "url" : "category",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "277011002",
                    "display" : "Pre-existing disease in renal transplant"
                  }]
                }
              },
              {
                "url" : "statement",
                "valueString" : "Expenses related to the treatment of a pre-existing Disease (PED) and its direct complications shall be excluded untit the expiry of 48 months"
              }],
              "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Exclusion"
            },
            {
              "extension" : [{
                "url" : "category",
                "valueCodeableConcept" : {
                  "text" : "Specified disease"
                }
              },
              {
                "url" : "statement",
                "valueString" : "Expenses related to the treatment of a listed conditions, surgeries/treatments shall be excluded until the expiry of 24 months of continuous coverage after the date of inception of the first policy with us."
              },
              {
                "url" : "item",
                "valueCodeableConcept" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "86077009",
                    "display" : "Operation for glaucoma"
                  }]
                }
              }],
              "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Exclusion"
            }],
            "identifier" : [{
              "system" : "https://irdai.gov.in",
              "value" : "761234556546"
            }],
            "status" : "active",
            "type" : [{
              "coding" : [{
                "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-insuranceplan-type",
                "code" : "01",
                "display" : "Hospitalisation Indemnity Policy"
              }]
            }],
            "name" : "Active Assure Silver",
            "period" : {
              "start" : "2023-09-10",
              "end" : "2024-09-10"
            },
            "ownedBy" : {
              "reference" : "Organization/example-02"
            },
            "administeredBy" : {
              "reference" : "Organization/example-02"
            },
            "coverage" : [{
              "extension" : [{
                "extension" : [{
                  "url" : "claim-condition",
                  "valueString" : "The Hospitalization is medically necessary and follows the written advice of a Medical Practitioner"
                }],
                "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
              }],
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "737481003",
                  "display" : "Inpatient care management (procedure)"
                }]
              },
              "benefit" : [{
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "309904001",
                    "display" : "Intensive care unit (environment)"
                  }]
                }
              },
              {
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "87612001",
                    "display" : "Blood"
                  }]
                }
              },
              {
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "24099007",
                    "display" : "Oxygen (substance)"
                  }]
                }
              }]
            },
            {
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "710967003",
                  "display" : "Management of health status after discharge from hospital (procedure)"
                }]
              },
              "benefit" : [{
                "extension" : [{
                  "extension" : [{
                    "url" : "claim-condition",
                    "valueString" : "Medical Expenses incurred up to 90 days after discharge from the hospital"
                  }],
                  "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
                }],
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "710967003",
                    "display" : "Management of health status after discharge from hospital (procedure)"
                  }]
                },
                "limit" : [{
                  "value" : {
                    "value" : 90,
                    "comparator" : "<=",
                    "unit" : "day"
                  }
                }]
              }]
            },
            {
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "409972000",
                  "display" : "Pre-hospital care (situation)"
                }]
              },
              "benefit" : [{
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "409972000",
                    "display" : "Pre-hospital care (situation)"
                  }]
                },
                "limit" : [{
                  "value" : {
                    "value" : 60,
                    "comparator" : "<=",
                    "unit" : "day"
                  }
                }]
              }]
            },
            {
              "extension" : [{
                "extension" : [{
                  "url" : "claim-condition",
                  "valueString" : "We have accepted a claim for In-patient Hospitalization under Section C.I.(a) above for the same Illness/ Injur"
                }],
                "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
              }],
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "49122002",
                  "display" : "Ambulance, device (physical object)"
                }]
              },
              "benefit" : [{
                "extension" : [{
                  "extension" : [{
                    "url" : "claim-condition",
                    "valueString" : "Per policy limits is up to 10% of the Sum Insured."
                  }],
                  "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
                }],
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "49122002",
                    "display" : "Ambulance, device (physical object)"
                  }]
                }
              }]
            },
            {
              "extension" : [{
                "extension" : [{
                  "url" : "claim-condition",
                  "valueString" : "The Medical Expenses are incurred, including for any procedure which requires a period of specialized observation or care after completion of the procedure undertaken by an Insured Person as Day Care Treatment"
                }],
                "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
              }],
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "737850002",
                  "display" : "Day care case management"
                }]
              },
              "benefit" : [{
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "737850002",
                    "display" : "Day care case management"
                  }]
                }
              }]
            },
            {
              "extension" : [{
                "extension" : [{
                  "url" : "claim-condition",
                  "valueString" : "The donation conforms to The Transplantation of Human Organs Act 1994 and the organ is for the use of the Insured Person"
                }],
                "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
              }],
              "type" : {
                "coding" : [{
                  "system" : "http://snomed.info/sct",
                  "code" : "105461009",
                  "display" : "Organ donor"
                }]
              },
              "benefit" : [{
                "extension" : [{
                  "extension" : [{
                    "url" : "claim-condition",
                    "valueString" : "This coverage is subject to a limit of 10% of the Sum Insured or Rupees One Lakh whichever is less."
                  }],
                  "url" : "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Claim-Condition"
                }],
                "type" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "105461009",
                    "display" : "Organ donor"
                  }]
                }
              }]
            }],
            "plan" : [{
              "identifier" : [{
                "use" : "official",
                "value" : "Active Assure Silver"
              }],
              "type" : {
                "coding" : [{
                  "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                  "code" : "01",
                  "display" : "Individual"
                }]
              },
              "generalCost" : [{
                "cost" : {
                  "value" : 200000,
                  "currency" : "INR"
                }
              }],
              "specificCost" : [{
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "49122002",
                    "display" : "Ambulance, device (physical object)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "49122002",
                      "display" : "Ambulance, device (physical object)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 2000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "224663004",
                    "display" : "Single room (environment)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "224663004",
                      "display" : "Single room (environment)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 2000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "309904001",
                    "display" : "Intensive care unit (environment)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "309904001",
                      "display" : "Intensive care unit (environment)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 4000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "60689008",
                    "display" : "Home care of patient"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "60689008",
                      "display" : "Home care of patient"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 20000,
                      "unit" : "INR"
                    }
                  }]
                }]
              }]
            },
            {
              "identifier" : [{
                "use" : "official",
                "value" : "Active Assure Silver"
              }],
              "type" : {
                "coding" : [{
                  "system" : "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                  "code" : "01",
                  "display" : "Individual"
                }]
              },
              "generalCost" : [{
                "cost" : {
                  "value" : 700000,
                  "currency" : "INR"
                }
              }],
              "specificCost" : [{
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "49122002",
                    "display" : "Ambulance, device (physical object)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "49122002",
                      "display" : "Ambulance, device (physical object)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 2000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "224663004",
                    "display" : "Single room (environment)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "224663004",
                      "display" : "Single room (environment)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 7000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "309904001",
                    "display" : "Intensive care unit (environment)"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "309904001",
                      "display" : "Intensive care unit (environment)"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 14000,
                      "unit" : "INR"
                    }
                  }]
                }]
              },
              {
                "category" : {
                  "coding" : [{
                    "system" : "http://snomed.info/sct",
                    "code" : "60689008",
                    "display" : "Home care of patient"
                  }]
                },
                "benefit" : [{
                  "type" : {
                    "coding" : [{
                      "system" : "http://snomed.info/sct",
                      "code" : "60689008",
                      "display" : "Home care of patient"
                    }]
                  },
                  "cost" : [{
                    "type" : {
                      "coding" : [{
                        "code" : "fullcoverage"
                      }]
                    },
                    "value" : {
                      "value" : 70000,
                      "unit" : "INR"
                    }
                  }]
                }]
              }]
            }]
          }

        return body
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    toHtml(option: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}