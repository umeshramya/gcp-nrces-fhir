import {
  CODEABLE_CONCEPT,
  EXTENSION,
  IDENTTIFIER,
  MONEY,
  MULTI_RESOURCE,
  PERIOD,
} from "../config";
import { ResourceMaster } from "../Interfaces";
import { QUANTITY } from "../resources/Observation";
import ResourceMain from "../resources/ResourceMai";

interface OwnedBy extends MULTI_RESOURCE {
  resource: "Organization";
}

interface AdministeredBy extends MULTI_RESOURCE {
  resource: "Organization";
}

interface Network extends MULTI_RESOURCE {
  resource: "Organization";
}

interface CoverageArea extends MULTI_RESOURCE {
  resource: "Location";
}
interface Coverage {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?: EXTENSION[];
  type: CODEABLE_CONCEPT;
  requirement?: string;
  limit?: {
    id?: string;
    extension?: EXTENSION[];
    modifierExtension?: EXTENSION[];
    value?: QUANTITY;
    code?: CODEABLE_CONCEPT;
  }[];
  network?: Network[];
}

interface Plan {
  id?: string;
  extension?: EXTENSION[];
  modifierExtension?:EXTENSION[]
  identifier?:IDENTTIFIER[]
  coverageArea?:CoverageArea[]
  type: CODEABLE_CONCEPT;
  generalCost?:{
    id?:string;
    extension?:EXTENSION[];
    modifierExtension?: EXTENSION[];
    type?:CODEABLE_CONCEPT;
    groupSize?:number
    cost?:MONEY;
    comment?:string
  }[];
  network?: Network[];
}

export interface INSURANCE_PLAN {
  id?: string;
  text: string;
  resourceType: "InsurancePlan";
  identifier: IDENTTIFIER[];
  extension: EXTENSION[];
  status: "draft" | "active" | "retired" | "unknown";
  type: CODEABLE_CONCEPT;
  period: PERIOD;
  name: string;
  ownedBy: OwnedBy;
  administeredBy?: AdministeredBy;
  alias?: string[];
  coverage: Coverage[];
  plan: Plan[];
}

export class InsurancePlan extends ResourceMain implements ResourceMaster {
  getFHIR(options: INSURANCE_PLAN) {
    const body = {
      resourceType: "InsurancePlan",
      id: options.id,
      meta: {
        versionId: "1",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/InsurancePlan",
        ],
      },
      text: {
        status: "extensions",
        div: options.text,
      },
      alias: options.alias,
      extension: options.extension,
      identifier: options.identifier,
      status: options.status,
      type: options.type,
      name: options.name,
      period: options.period,
      ownedBy: options.ownedBy && {
        reference:
          options.ownedBy.resource &&
          options.ownedBy.id &&
          `${options.ownedBy.resource}/${options.ownedBy.id}`,
        identifier: options.ownedBy.identifier,
        display: options.ownedBy.display,
        type: options.ownedBy.type,
      },
      administeredBy: options.administeredBy && {
        reference:
          options.administeredBy.resource &&
          options.administeredBy.id &&
          `${options.administeredBy.resource}/${options.administeredBy.id}`,
        identifier: options.administeredBy.identifier,
        display: options.administeredBy.display,
        type: options.administeredBy.type,
      },
      coverage: options.coverage,
      plan: [
        {
          identifier: [
            {
              use: "official",
              value: "Active Assure Silver",
            },
          ],
          type: {
            coding: [
              {
                system:
                  "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                code: "01",
                display: "Individual",
              },
            ],
          },
          generalCost: [
            {
              cost: {
                value: 200000,
                currency: "INR",
              },
            },
          ],
          specificCost: [
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "49122002",
                    display: "Ambulance, device (physical object)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "49122002",
                        display: "Ambulance, device (physical object)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "224663004",
                    display: "Single room (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "224663004",
                        display: "Single room (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "309904001",
                    display: "Intensive care unit (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "309904001",
                        display: "Intensive care unit (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 4000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "60689008",
                    display: "Home care of patient",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "60689008",
                        display: "Home care of patient",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 20000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          identifier: [
            {
              use: "official",
              value: "Active Assure Silver",
            },
          ],
          type: {
            coding: [
              {
                system:
                  "https://nrces.in/ndhm/fhir/r4/CodeSystem/ndhm-plan-type",
                code: "01",
                display: "Individual",
              },
            ],
          },
          generalCost: [
            {
              cost: {
                value: 700000,
                currency: "INR",
              },
            },
          ],
          specificCost: [
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "49122002",
                    display: "Ambulance, device (physical object)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "49122002",
                        display: "Ambulance, device (physical object)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 2000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "224663004",
                    display: "Single room (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "224663004",
                        display: "Single room (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 7000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "309904001",
                    display: "Intensive care unit (environment)",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "309904001",
                        display: "Intensive care unit (environment)",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 14000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
            {
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "60689008",
                    display: "Home care of patient",
                  },
                ],
              },
              benefit: [
                {
                  type: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "60689008",
                        display: "Home care of patient",
                      },
                    ],
                  },
                  cost: [
                    {
                      type: {
                        coding: [
                          {
                            code: "fullcoverage",
                          },
                        ],
                      },
                      value: {
                        value: 70000,
                        unit: "INR",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    return body;
  }
  convertFhirToObject(options: any): INSURANCE_PLAN {
    const ret: INSURANCE_PLAN = {
      id: options.id,
      text: options.text && options.text.div,
      resourceType: "InsurancePlan",
      identifier: options.identifier,
      extension: options.extension,
      status: options.status,
      type: options.type,
      period: options.period,
      name: options.name,
      ownedBy:
        options.oownedBy &&
        ((options.ownedBy.reference &&
          this.getFromMultResource(options.ownedBy)) ||
          options.ownedBy),
      administeredBy:
        options.administeredBy &&
        ((options.administeredBy.reference &&
          this.getFromMultResource(options.administeredBy)) ||
          options.administeredBy),
      alias: options.alias,
      coverage: options.coverage,
      plan: options.plan,
    };


        // Remove keys with null or undefined values
        Object.keys(ret).forEach((key) => {
          if (
            ret[key as keyof INSURANCE_PLAN] === null ||
            ret[key as keyof INSURANCE_PLAN] === undefined
          ) {
            delete ret[key as keyof INSURANCE_PLAN];
          }
        });

    return ret;
  }
  async toHtml(option: any): Promise<string> {
    const ret = "";

    return ret;
  }
  statusArray?: Function | undefined;
}
